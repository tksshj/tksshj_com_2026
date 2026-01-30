import Box from '@mui/material/Box'
import { useEffect, useRef } from 'react'
import * as THREE from 'three'

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
