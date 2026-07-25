import Box from '@mui/material/Box'
import { RefObject, useEffect, useRef } from 'react'
import * as THREE from 'three'
import fragmentShader from './kakyo.frag'
import vertexShader from './kakyo.vert'
import useKakyoPoints from './useKakyoPoints'

function shuffleIndices(n: number) {
  const arr = new Uint32Array(n)
  for (let i = 0; i < n; i++) arr[i] = i

  for (let i = n - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    const tmp = arr[i]
    arr[i] = arr[j]
    arr[j] = tmp
  }

  return arr
}

export default function Canvas({ posRef }: { posRef: RefObject<number> }) {
  const mountRef = useRef<HTMLDivElement | null>(null)
  const { canvas, points } = useKakyoPoints()

  useEffect(() => {
    if (!canvas || points.length <= 0) {
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

    const texture = new THREE.CanvasTexture(canvas)
    texture.minFilter = THREE.LinearFilter
    texture.magFilter = THREE.LinearFilter
    texture.needsUpdate = true

    const textureMaterial = new THREE.ShaderMaterial({
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
        uniform float uPos;
        varying vec2 vUv;

        void main() {
          vec4 color = texture2D(uTexture, vUv);
          if (uPos < 0.5) {
            discard;
          }
          gl_FragColor = color;
        }
      `,
    })

    const textureGeometry = new THREE.BufferGeometry()
    textureGeometry.setAttribute(
      'position',
      new THREE.Float32BufferAttribute([-1, -1, 0, 1, -1, 0, 1, 1, 0, -1, 1, 0], 3),
    )
    textureGeometry.setIndex([0, 1, 2, 0, 2, 3])

    const textureMesh = new THREE.Mesh(textureGeometry, textureMaterial)
    scene.add(textureMesh)

    const total = points.length
    const gridSize = Math.floor(Math.sqrt(total))
    const usable = gridSize * gridSize

    const pointsGeometry = new THREE.BufferGeometry()

    const pointsPositions = new Float32Array(points.flatMap((p) => [p.x, p.y, p.z]))
    pointsGeometry.setAttribute('position', new THREE.BufferAttribute(pointsPositions, 3))

    const shuffle = shuffleIndices(usable)

    const positions = new Float32Array(usable * 3)
    for (let i = 0; i < usable; i++) {
      const p = points[shuffle[i]]
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

      textureMaterial.uniforms.uPos.value = posRef.current

      pointsMaterial.uniforms.uTime.value += dt

      const pointsPos = posRef.current < 0.5 ? posRef.current / 0.5 : 1.0 - (posRef.current - 0.5) / 0.5
      pointsMaterial.uniforms.uPos.value = Math.min(1.0, pointsPos)

      renderer.render(scene, camera)
      rafId = requestAnimationFrame(animate)
    }
    rafId = requestAnimationFrame(animate)

    return () => {
      running = false
      cancelAnimationFrame(rafId)
      renderer.dispose()
      textureGeometry.dispose()
      textureMaterial.dispose()
      pointsGeometry.dispose()
      pointsMaterial.dispose()
      mount.removeChild(renderer.domElement)
    }
  }, [canvas, points, posRef])

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
