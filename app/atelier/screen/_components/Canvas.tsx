import Box from '@mui/material/Box'
import { useEffect, useRef } from 'react'
import * as THREE from 'three'

const WIDTH = 1024
const HEIGHT = 1024

export default function Canvas({ w, h }: { w: number; h: number }) {
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
        uResolution: {
          value: new THREE.Vector2(w, h),
        },
      },
      vertexShader: `
        varying vec2 vUv;

        void main() {
          vUv = uv;
          gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
        }
      `,
      fragmentShader: `
        uniform vec2 uResolution;
        varying vec2 vUv;

        void main() {
          vec2 uv = vUv - 0.5;
          float aspect = uResolution.x / uResolution.y;
          uv *= vec2(aspect, 1.0);
          uv /= min(aspect, 1.0);
          gl_FragColor = vec4(step(0.5, length(uv)));
        }
      `,
    })

    const geometry = new THREE.PlaneGeometry(2, 2)

    const mesh = new THREE.Mesh(geometry, material)
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
  }, [w, h])

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
