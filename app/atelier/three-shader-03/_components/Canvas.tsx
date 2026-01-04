import Box from '@mui/material/Box'
import { useEffect, useRef } from 'react'
import * as THREE from 'three'
import fragmentShader from './frag.glsl'
import vertexShader from './vert.glsl'

const WIDTH = 1024
const HEIGHT = 1024

export default function Canvas() {
  const mountRef = useRef<HTMLDivElement | null>(null)

  useEffect(() => {
    const mount = mountRef.current
    if (!mount) {
      return
    }

    const renderer = new THREE.WebGLRenderer({ alpha: false, antialias: true })
    renderer.setSize(WIDTH, HEIGHT, false)
    //    renderer.setPixelRatio(window.devicePixelRatio)

    renderer.setClearColor(0xe4e7ec, 1)
    mount.appendChild(renderer.domElement)

    const camera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0.01, 10)
    camera.position.z = 1

    const scene = new THREE.Scene()

    const material = new THREE.ShaderMaterial({
      uniforms: {
        uResolution: { value: new THREE.Vector2(WIDTH, HEIGHT) },
        uTime: { value: 0 },
      },
      vertexShader,
      fragmentShader,
    })

    const geometry = new THREE.BufferGeometry()
    geometry.setAttribute('position', new THREE.Float32BufferAttribute([-1, -1, 0, 1, -1, 0, 1, 1, 0, -1, 1, 0], 3))
    geometry.setIndex([0, 1, 2, 0, 2, 3])

    const mesh = new THREE.Mesh(geometry, material)
    scene.add(mesh)

    let rafId = 0
    let running = true
    const animate = (timestamp: number) => {
      if (!running) {
        return
      }
      material.uniforms.uTime.value = timestamp
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
          objectFit: 'contain',
        },
      }}
      ref={mountRef}
    />
  )
}
