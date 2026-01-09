import Box from '@mui/material/Box'
import { useEffect, useRef } from 'react'
import * as THREE from 'three'
import vertexShader from './vert.glsl'

const WIDTH = 1024
const HEIGHT = 1024
const N_POINTS = 72 * 72
const N_GRIDSIZE = 72

export default function Canvas() {
  const mountRef = useRef<HTMLDivElement | null>(null)

  useEffect(() => {
    const mount = mountRef.current
    if (!mount) {
      return
    }

    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true })
    renderer.setSize(WIDTH, HEIGHT, false)
    mount.appendChild(renderer.domElement)

    const camera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0.01, 10)
    camera.position.z = 1

    const scene = new THREE.Scene()

    const material = new THREE.ShaderMaterial({
      transparent: true,
      depthTest: false,
      depthWrite: false,
      uniforms: {
        uTime: { value: 0 },
        uGridW: { value: N_GRIDSIZE },
        uGridH: { value: N_GRIDSIZE },
      },
      vertexShader: vertexShader,
      fragmentShader: `
        void main() {
          vec2 uv = gl_PointCoord - 0.5;
          if (length(uv) > 0.5) {
             discard;
          }
          float shape = length(uv);
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
    const animate = (timestamp: number) => {
      if (!running) {
        return
      }
      material.uniforms.uTime.value = timestamp + 1000000
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
        width: '100%',
        canvas: {
          width: '100%',
        },
      }}
      ref={mountRef}
    />
  )
}
