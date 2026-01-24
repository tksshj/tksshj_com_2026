'use client'
import Box from '@mui/material/Box'
import TWEEN from '@tweenjs/tween.js'
import { useEffect, useRef } from 'react'
import * as THREE from 'three'
import fragmentShader from './frag.glsl'

const WIDTH = 1024
const HEIGHT = 1024
const DURATION = 4000

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
      uniforms: {
        uTime: { value: 0 },
        uVelocity: { value: 0 },
      },
      vertexShader: `
        varying vec2 vUv;

        void main() {
          vUv = uv;
          gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
        }
      `,
      fragmentShader: fragmentShader,
    })

    const geometry = new THREE.PlaneGeometry(2, 2)

    const mesh = new THREE.Mesh(geometry, material)
    scene.add(mesh)

    let startTime = 0
    let direction = 1
    let completed = true
    let rafNow = 0

    const state = { value: 0 }
    const tween = new TWEEN.Tween(state)
      .to({ value: 1 }, DURATION)
      .easing(TWEEN.Easing.Bounce.InOut)
      .onUpdate(() => {
        material.uniforms.uTime.value = rafNow
        material.uniforms.uVelocity.value = direction == 1 ? state.value : 1.0 - state.value
        renderer.render(scene, camera)
      })
      .onComplete(() => {
        completed = true
      })
      .start(0)

    let rafId = 0
    let running = true
    const animate = (now: number) => {
      if (!running) {
        return
      }
      rafNow = now
      if (completed) {
        direction = direction * -1
        startTime = now
        tween.start(0)
        completed = false
      } else {
        tween.update(now - startTime)
      }
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
