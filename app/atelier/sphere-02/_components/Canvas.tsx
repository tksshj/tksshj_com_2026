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

    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true })
    renderer.setSize(WIDTH, HEIGHT, false)
    renderer.setPixelRatio(window.devicePixelRatio)
    renderer.setClearColor(0x000000, 0)
    mount.appendChild(renderer.domElement)

    const camera = new THREE.PerspectiveCamera(
      45, // fov
      1, // aspect = 1024 / 1024
      0.1, // near
      1000, // far
    )
    camera.position.set(0, 0, 8)

    const scene = new THREE.Scene()

    // Sphere
    const geometry = new THREE.SphereGeometry(
      1, // radius
      64, // widthSegments
      64, // heightSegments
    )

    const material = new THREE.MeshStandardMaterial({
      color: 0xffffff,
      roughness: 0.4,
      metalness: 0.1,
    })

    // const sphere = new THREE.Mesh(geometry, material)
    // scene.add(sphere)
    const spheres = new THREE.InstancedMesh(geometry, material, 100)
    scene.add(spheres)

    const dummy = new THREE.Object3D()
    for (let i = 0; i < 100; i++) {
      // dummy.position.set(Math.random() * 100 - 50, Math.random() * 100 - 50, Math.random() * 100 - 50)
      dummy.position.set(i * 2.0 - 50, i * 0.01, -100)
      dummy.updateMatrix()
      spheres.setMatrixAt(i, dummy.matrix)
    }
    spheres.instanceMatrix.needsUpdate = true

    // Light
    const ambientLight = new THREE.AmbientLight(0xffffff, 1.5)
    scene.add(ambientLight)

    const directionalLight = new THREE.DirectionalLight(0xffffff, 3)
    directionalLight.position.set(3, 4, 5)
    scene.add(directionalLight)

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
        width: '100%',
        canvas: {
          width: '100%',
        },
      }}
      ref={mountRef}
    />
  )
}
