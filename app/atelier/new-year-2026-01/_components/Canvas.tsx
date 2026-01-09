import Box from '@mui/material/Box'
import { RefObject, useEffect, useRef } from 'react'
import * as THREE from 'three'
import fragmentShader from './kakyo.frag'
import vertexShader from './kakyo.vert'
import useKakyoPoints from './useKakyoPoints'

export default function Canvas() {
  const mountRef = useRef<HTMLDivElement | null>(null)
  const { points } = useKakyoPoints()

  useEffect(() => {
    if (points.length <= 0) {
      return
    }
    const mount = mountRef.current
    if (!mount) {
      return
    }
    const width = mount.clientHeight
    const height = width

    const renderer = new THREE.WebGLRenderer({ alpha: false, antialias: true })
    renderer.setSize(width, height)
    renderer.setPixelRatio(window.devicePixelRatio)
    renderer.setClearColor(0xffffff, 1)
    mount.appendChild(renderer.domElement)

    const camera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0.01, 10)
    camera.position.z = 1

    const scene = new THREE.Scene()

    const total = points.length
    const gridSize = Math.floor(Math.sqrt(total))
    const usable = gridSize * gridSize

    const pointsGeometry = new THREE.BufferGeometry()

    const pointsPositions = new Float32Array(points.flatMap((p) => [p.x, p.y, p.z]))
    pointsGeometry.setAttribute('position', new THREE.BufferAttribute(pointsPositions, 3))

    const positions = new Float32Array(usable * 3)
    for (let i = 0; i < usable; i++) {
      const p = points[i]
      positions[i * 3 + 0] = p.x
      positions[i * 3 + 1] = p.y
      positions[i * 3 + 2] = p.z
    }

    pointsGeometry.setAttribute('position', new THREE.BufferAttribute(positions, 3))

    const indices = new Float32Array(usable)
    for (let i = 0; i < usable; i++) indices[i] = i
    pointsGeometry.setAttribute('aIndex', new THREE.BufferAttribute(indices, 1))

    const pointsMaterial = new THREE.ShaderMaterial({
      transparent: true,
      depthTest: false,
      depthWrite: false,
      uniforms: {
        uTime: { value: 0 },
        uStrength: { value: 1.0 },
        uPos: { value: 0 },
        uGridW: { value: gridSize },
        uGridH: { value: gridSize },
      },
      vertexShader: vertexShader,
      fragmentShader: fragmentShader,
    })

    const pointsMesh = new THREE.Points(pointsGeometry, pointsMaterial)
    scene.add(pointsMesh)

    let rafId = 0
    let running = true
    let last = performance.now()
    const animate = (now: number) => {
      if (!running) {
        return
      }
      const dt = (now - last) * 0.001
      last = now

      pointsMaterial.uniforms.uTime.value += dt

      // const pointsPos = posRef.current < 0.5 ? posRef.current / 0.5 : 1.0 - (posRef.current - 0.5) / 0.5
      // pointsMaterial.uniforms.uPos.value = Math.min(1.0, pointsPos)

      renderer.render(scene, camera)
      rafId = requestAnimationFrame(animate)
    }
    rafId = requestAnimationFrame(animate)

    return () => {
      running = false
      cancelAnimationFrame(rafId)
      renderer.dispose()
      pointsGeometry.dispose()
      pointsMaterial.dispose()
      mount.removeChild(renderer.domElement)
    }
  }, [points])

  return (
    <Box
      sx={{
        position: 'relative',
        width: '100%',
        height: '100%',
      }}
    >
      <Box
        sx={{
          position: 'absolute',
          left: '0',
          top: '0',
          width: '100%',
          height: '100%',
          display: 'flex',
          justifyContent: 'center',
        }}
      >
        <Box sx={{ aspectRatio: 1, height: '100%', canvas: { width: '100%' } }} ref={mountRef} />
      </Box>
    </Box>
  )
}
