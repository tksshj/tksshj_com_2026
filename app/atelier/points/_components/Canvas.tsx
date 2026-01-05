import Box from '@mui/material/Box'
import { useEffect, useRef } from 'react'
import * as THREE from 'three'

const WIDTH = 1024
const HEIGHT = 1024
const N_POINTS = 1024
const N_GRIDSIZE = 32

export default function Canvas() {
  const mountRef = useRef<HTMLDivElement | null>(null)

  useEffect(() => {
    const mount = mountRef.current
    if (!mount) {
      return
    }
    const width = mount.clientHeight
    const height = width

    const renderer = new THREE.WebGLRenderer({ alpha: false, antialias: true })
    renderer.setSize(WIDTH, HEIGHT)
    // renderer.setPixelRatio(window.devicePixelRatio)
    renderer.setClearColor(0xe4e7ec, 1)
    mount.appendChild(renderer.domElement)

    const camera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0.01, 10)
    camera.position.z = 1

    const scene = new THREE.Scene()

    const material = new THREE.ShaderMaterial({
      transparent: true,
      depthTest: false,
      depthWrite: false,
      uniforms: {
        uGridW: { value: N_GRIDSIZE },
        uGridH: { value: N_GRIDSIZE },
      },
      vertexShader: `
        attribute float aIndex;
        uniform float uGridW;
        uniform float uGridH;

        vec3 gridFromIndex(float i) {
          float x = mod(i, uGridW);
          float y = floor(i / uGridW);
          vec2 uv = vec2(
            x / (uGridW - 1.0),
            y / (uGridH - 1.0)
          );
          return vec3(uv * 2.0 - 1.0, 0.0);
        }

        void main() {
          vec3 gridPos = gridFromIndex(aIndex) * 0.95;
          gl_Position = projectionMatrix * modelViewMatrix * vec4(gridPos, 1.0);
          gl_PointSize = 32.0;
        }
      `,
      fragmentShader: `
        void main() {
          vec2 uv = gl_PointCoord - 0.5;
          if (length(uv) > 0.5) {
             discard;
          }
      float shape = smoothstep(0.5, 0.0, length(uv));
          vec3 targetColor = vec3(0.2627, 0.3098, 0.4000);
          gl_FragColor = vec4(targetColor, shape);
        }
      `,
    })

    const geometry = new THREE.BufferGeometry()

    const positions = new Float32Array(N_POINTS * 3)
    for (let i = 0; i < N_POINTS * 3; i++) {
      positions[i] = 0
    }

    geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3))

    const indices = new Float32Array(N_POINTS)
    for (let i = 0; i < N_POINTS; i++) {
      indices[i] = i
    }
    geometry.setAttribute('aIndex', new THREE.BufferAttribute(indices, 1))

    const mesh = new THREE.Points(geometry, material)
    scene.add(mesh)

    let rafId = 0
    let running = true
    const animate = () => {
      if (!running) {
        return
      }
      renderer.render(scene, camera)
      rafId = requestAnimationFrame(animate)
    }
    rafId = requestAnimationFrame(animate)

    return () => {
      running = false
      cancelAnimationFrame(rafId)
      renderer.dispose()
      geometry.dispose()
      material.dispose()
      mount.removeChild(renderer.domElement)
    }
  }, [])

  return (
    <Box
      sx={{
        aspectRatio: 1,
        width: '100%',
        canvas: {
          width: '100%',
        },
      }}
      ref={mountRef}
    />
  )
}
