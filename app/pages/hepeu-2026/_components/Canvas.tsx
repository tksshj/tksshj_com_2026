'use client'
import { isMobile } from '@/app/_common/utils'
import Box from '@mui/material/Box'
import { useEffect, useRef, useState } from 'react'
import * as THREE from 'three'
import fragmentShader from './frag.glsl'
import vertexShader from './vert.glsl'

export function isMobileByUserAgent() {
  if (typeof navigator === 'undefined') {
    return false
  }
  return /iPhone|iPad|iPod|Android/i.test(navigator.userAgent)
}

export default function Canvas() {
  const mobile = isMobile()
  const canvasRef = useRef<HTMLCanvasElement | null>(null)

  useEffect(() => {
    if (!canvasRef.current) {
      return
    }
    const canvas = canvasRef.current
    if (!canvas) {
      return
    }
    const ww = window.innerWidth
    const wh = window.innerHeight

    const scene = new THREE.Scene()
    const camera = new THREE.PerspectiveCamera(75, ww / wh, 0.1, 100)
    camera.position.z = 5

    const renderer = new THREE.WebGLRenderer({
      canvas,
      alpha: true,
      antialias: true,
    })

    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
    renderer.setSize(ww, wh)

    const particleCount = 4000

    const positions = new Float32Array(particleCount * 3)
    const speeds = new Float32Array(particleCount)
    const sizes = new Float32Array(particleCount)
    const offsets = new Float32Array(particleCount)

    for (let i = 0; i < particleCount; i++) {
      const i3 = i * 3
      positions[i3 + 0] = Math.random() * 12.0 - 6.0
      positions[i3 + 1] = Math.random() * 12.0 - 6.0
      positions[i3 + 2] = Math.random() * 10.0 - 5.0

      speeds[i] = Math.random() * 0.4
      sizes[i] = (Math.random() * 3.75 + 1.5) * Math.min(window.devicePixelRatio, 2) * (mobile ? 0.5 : 1.0)
      offsets[i] = Math.random() * Math.PI * 2
    }

    const geometry = new THREE.BufferGeometry()

    geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3))
    geometry.setAttribute('aSpeed', new THREE.BufferAttribute(speeds, 1))
    geometry.setAttribute('aSize', new THREE.BufferAttribute(sizes, 1))
    geometry.setAttribute('aOffset', new THREE.BufferAttribute(offsets, 1))

    const material = new THREE.ShaderMaterial({
      vertexShader,
      fragmentShader,
      uniforms: {
        uTime: { value: 0 },
        uRotation: { value: new THREE.Vector2(0, 0) },
      },
      transparent: true,
      depthWrite: false,
      blending: THREE.AdditiveBlending,
    })

    const points = new THREE.Points(geometry, material)
    scene.add(points)

    const timer = new THREE.Timer()
    let animationFrameId = 0

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate)

      const rotateX = (window.scrollY / (wh * 4)) * Math.PI * 2.0
      material.uniforms.uRotation.value = new THREE.Vector2(rotateX, 0)

      timer.update()
      const elapsed = timer.getElapsed()
      material.uniforms.uTime.value = elapsed
      renderer.render(scene, camera)
    }
    animate()

    return () => {
      cancelAnimationFrame(animationFrameId)
      scene.remove(points)
      geometry.dispose()
      material.dispose()
      renderer.dispose()
    }
  }, [mobile, canvasRef.current])

  return (
    <Box
      ref={canvasRef}
      component='canvas'
      sx={{
        position: 'fixed',
        inset: 0,
        width: '100vw',
        height: '100svh',
        display: 'block',
        pointerEvents: 'none',
      }}
    />
  )
}
