import Box from '@mui/material/Box'
import { useEffect, useRef } from 'react'
import * as THREE from 'three'

const WIDTH = 1024
const HEIGHT = 1024

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
    renderer.setClearColor(0xffffff, 1)
    mount.appendChild(renderer.domElement)

    const camera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0.01, 10)
    camera.position.z = 1

    const scene = new THREE.Scene()

    const material = new THREE.ShaderMaterial({
      vertexShader: `
        void main() {
          gl_Position = vec4(position, 1.0);
        }
      `,
      fragmentShader: `
        void main() {
          gl_FragColor = vec4(0.2627, 0.3098, 0.4000, 1.0);
        }
      `,
    })

    const geometry = new THREE.BufferGeometry()
    geometry.setAttribute('position', new THREE.Float32BufferAttribute([-1, -1, 0, 1, -1, 0, 1, 1, 0, -1, 1, 0], 3))
    geometry.setIndex([0, 1, 2, 0, 2, 3])

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
