import Box from '@mui/material/Box'
import { useEffect, useRef } from 'react'
import * as THREE from 'three'
import VertexShader from './vert.glsl'

const WIDTH = 1024
const HEIGHT = 1024

export default function Canvas({ w, h, nPoints }: { w: number; h: number; nPoints: number }) {
  const mountRef = useRef<HTMLDivElement | null>(null)

  useEffect(() => {
    const mount = mountRef.current
    if (!mount) {
      return
    }

    const aspect = w / h
    const cols = Math.floor(Math.sqrt(nPoints * aspect))
    const rows = Math.floor(nPoints / cols)

    console.log(w)
    console.log(h)
    console.log(nPoints)
    console.log(aspect)
    console.log(cols)
    console.log(rows)

    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true })
    renderer.setSize(WIDTH, HEIGHT, false)
    mount.appendChild(renderer.domElement)

    let left,
      right,
      top,
      bottom = 0
    if (aspect >= 1) {
      left = -aspect
      right = aspect
      top = 1
      bottom = -1
    } else {
      left = -1
      right = 1
      top = 1 / aspect
      bottom = -1 / aspect
    }
    const camera = new THREE.OrthographicCamera(left, right, top, bottom, 0.01, 10)
    camera.position.z = 1

    const scene = new THREE.Scene()

    const material = new THREE.ShaderMaterial({
      transparent: true,
      vertexShader: `
        varying vec2 vUv;

        void main() {
          vUv = position.xy;
          gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
        }
      `,
      fragmentShader: `
        varying vec2 vUv;

        void main() {
          gl_FragColor = vec4(vec3(step(1.0, length(vUv))), 1.0);
        }
      `,
    })
    const geometry = new THREE.PlaneGeometry(aspect * 20.0, aspect * 20.0)
    const mesh = new THREE.Mesh(geometry, material)
    scene.add(mesh)

    const positions = new Float32Array(cols * rows * 3)
    let idx = 0
    for (let y = 0; y < rows; y++) {
      for (let x = 0; x < cols; x++) {
        const px = ((x + 0.5) * w) / cols
        const py = ((y + 0.5) * h) / rows
        let worldX,
          worldY = 0
        if (aspect >= 1.0) {
          worldX = (px / w) * aspect * 2.0 - aspect
          worldY = (py / h) * 2.0 - 1.0
        } else {
          worldX = (px / w) * 2.0 - 1.0
          worldY = (py / h) * (2.0 / aspect) - 1.0 / aspect
        }
        positions[idx++] = worldX
        positions[idx++] = worldY
        positions[idx++] = 0.0 // z
      }
    }
    const pointsGeometry = new THREE.BufferGeometry()
    pointsGeometry.setAttribute('position', new THREE.BufferAttribute(positions, 3))

    const pointsMaterial = new THREE.ShaderMaterial({
      transparent: true,
      depthTest: false,
      depthWrite: false,
      uniforms: {
        uTime: { value: 0 },
        uResolution: {
          value: new THREE.Vector2(w, h),
        },
      },
      vertexShader: VertexShader,

      //  `
      // void main() {

      //     gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
      //     gl_PointSize = 16.0;
      //   }
      // `,
      fragmentShader: `
        uniform float uTime;
        uniform vec2 uResolution;

        void main() {
          //  vec2 uv = vec2(0.0);
          //  float aspect = uResolution.x / uResolution.y;
          //  if (aspect >= 1.0) {
          //    uv.x = (gl_PointCoord.x - 0.5) * aspect;
          //    uv.y = gl_PointCoord.y - 0.5;
          //  } else {
          //   uv.x = gl_PointCoord.x - 0.5;
          //   uv.y = (gl_PointCoord.y - 0.5) / aspect;
          // }

          float aspect = uResolution.x / uResolution.y;
          vec2 uv = gl_PointCoord - 0.5;
          vec2 scale = (aspect >= 1.0)
            ? vec2(aspect, 1.0)
            : vec2(1.0, 1.0 / aspect);
          uv *= scale;

          if (length(uv) > 0.5) {
             discard;
          }
          float shape = smoothstep(0.5, 0.0, length(uv));
          gl_FragColor = vec4(1.0, 0.0, 0.0, shape);
        }
      `,
    })

    const pointsMesh = new THREE.Points(pointsGeometry, pointsMaterial)
    scene.add(pointsMesh)

    let rafId = 0
    let running = true
    const animate = (timestamp: number) => {
      if (!running) {
        return
      }
      pointsMaterial.uniforms.uTime.value = timestamp + 1000000
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
  }, [w, h, nPoints])

  return (
    <Box
      sx={{
        width: '100%',
        aspectRatio: `${w / h}`,
        canvas: {
          width: '100%',
          height: '100%',
        },
      }}
      ref={mountRef}
    />
  )
}
