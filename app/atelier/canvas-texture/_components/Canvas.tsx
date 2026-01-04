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

    const canvas = document.createElement('canvas')
    const context = canvas.getContext('2d')
    if (!context) {
      return
    }
    canvas.width = WIDTH
    canvas.height = HEIGHT
    context.clearRect(0, 0, WIDTH, HEIGHT)

    context.fillStyle = '#1e2636'
    context.font = `256px serif`
    context.textAlign = 'center'
    context.textBaseline = 'middle'
    context.fillText('ABC', WIDTH * 0.5, HEIGHT * 0.5)

    const renderer = new THREE.WebGLRenderer({ alpha: false, antialias: true })
    renderer.setSize(WIDTH, HEIGHT, false)
    // renderer.setPixelRatio(window.devicePixelRatio)
    renderer.setClearColor(0xe4e7ec, 1)
    mount.appendChild(renderer.domElement)

    const camera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0.01, 10)
    camera.position.z = 1

    const scene = new THREE.Scene()

    const texture = new THREE.CanvasTexture(canvas)
    texture.minFilter = THREE.LinearFilter
    texture.magFilter = THREE.LinearFilter
    texture.needsUpdate = true

    const material = new THREE.ShaderMaterial({
      uniforms: {
        uTexture: { value: texture },
        uPos: { value: 0 },
      },
      vertexShader: `
        precision mediump float;

        varying vec2 vUv;

        void main() {
          vUv = position.xy * 0.5 + 0.5;
          gl_Position = vec4(position, 1.0);
        }
      `,
      fragmentShader: `
        precision mediump float;

        uniform sampler2D uTexture;
        varying vec2 vUv;

        void main() {
          vec4 color = texture2D(uTexture, vUv);
          gl_FragColor = color;
        }
      `,
    })

    const geometry = new THREE.BufferGeometry()
    geometry.setAttribute('position', new THREE.Float32BufferAttribute([-1, -1, 0, 1, -1, 0, 1, 1, 0, -1, 1, 0], 3))
    geometry.setIndex([0, 1, 2, 0, 2, 3])

    const mesh = new THREE.Mesh(geometry, material)
    scene.add(mesh)

    let rafId = 0
    const animate = () => {
      renderer.render(scene, camera)
      rafId = requestAnimationFrame(animate)
    }
    rafId = requestAnimationFrame(animate)

    return () => {
      cancelAnimationFrame(rafId)
      renderer.dispose()
      geometry.dispose()
      material.dispose()
      mount.removeChild(renderer.domElement)
    }
  }, [mountRef.current])

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
