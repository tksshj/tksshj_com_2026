import Box from '@mui/material/Box'
import { useEffect, useRef } from 'react'
import * as THREE from 'three'
import useTextToPoints from './useTextToPoints'

const WIDTH = 1024
const HEIGHT = 1024

export default function Canvas() {
  const mountRef = useRef<HTMLDivElement | null>(null)
  const { points } = useTextToPoints('dev')

  useEffect(() => {
    const mount = mountRef.current
    if (!mount) {
      return
    }
    if (points.length <= 0) {
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
      vertexShader: `
        void main() {
          gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
          gl_PointSize = 5.0;
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

    const positions = new Float32Array(points.length * 3)
    for (let i = 0; i < points.length; i++) {
      const p = points[i]
      positions[i * 3 + 0] = p.x
      positions[i * 3 + 1] = p.y
      positions[i * 3 + 2] = p.z
    }
    geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3))

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
  }, [points])

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
