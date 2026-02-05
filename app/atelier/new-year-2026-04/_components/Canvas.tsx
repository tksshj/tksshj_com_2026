import Box from '@mui/material/Box'
import TWEEN from '@tweenjs/tween.js'
import { useEffect, useRef } from 'react'
import * as THREE from 'three'
import useTextToPoints from './useTextToPoints'
import VertexShader from './vert.glsl'

const WIDTH = 1024
const HEIGHT = 1024
const DURATION = 3000

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

export default function Canvas({ w, h, nPoints }: { w: number; h: number; nPoints: number }) {
  const mountRef = useRef<HTMLDivElement | null>(null)
  const { canvas, points: targetPoints } = useTextToPoints({ text: '2026', nPoints: nPoints })

  useEffect(() => {
    if (!canvas) {
      return
    }
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
    console.log(targetPoints.length)

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

    const positions = new Float32Array(cols * rows * 3)
    let idx = 0
    for (let y = 0; y < rows; y++) {
      for (let x = 0; x < cols; x++) {
        const px = ((x + 0.5) * w) / cols
        const py = ((y + 0.5) * h) / rows
        let worldX,
          worldY = 0
        if (aspect >= 1.0) {
          worldX = (px / w) * aspect * 2.0 - aspect
          worldY = (py / h) * 2.0 - 1.0
        } else {
          worldX = (px / w) * 2.0 - 1.0
          worldY = (py / h) * (2.0 / aspect) - 1.0 / aspect
        }
        positions[idx++] = worldX
        positions[idx++] = worldY
        positions[idx++] = 0.0
      }
    }

    const targetPositions = new Float32Array(positions.length)
    const indices = shuffleIndices(positions.length / 3)
    for (let i = 0; i < positions.length / 3; i++) {
      const index = indices[i % targetPoints.length]
      const p = targetPoints[index]
      targetPositions[i * 3 + 0] = p.x
      targetPositions[i * 3 + 1] = p.y
      targetPositions[i * 3 + 2] = p.z
    }

    const pointsGeometry = new THREE.BufferGeometry()
    pointsGeometry.setAttribute('position', new THREE.BufferAttribute(positions, 3))
    pointsGeometry.setAttribute('targetPosition', new THREE.BufferAttribute(targetPositions, 3))

    const pointsMaterial = new THREE.ShaderMaterial({
      transparent: true,
      depthTest: false,
      depthWrite: false,
      uniforms: {
        uPos: { value: 0 },
        uTime: { value: 0 },
        uResolution: {
          value: new THREE.Vector2(w, h),
        },
      },
      vertexShader: VertexShader,
      fragmentShader: `
        uniform float uTime;
        uniform vec2 uResolution;

        void main() {
          float aspect = uResolution.x / uResolution.y;
          vec2 uv = gl_PointCoord - 0.5;
          vec2 scale = (aspect >= 1.0)
            ? vec2(aspect, 1.0)
            : vec2(1.0, 1.0 / aspect);
          uv *= scale;

          if (length(uv) > 0.5) {
             discard;
          }
          float shape = smoothstep(0.5, 0.0, length(uv));
          gl_FragColor = vec4(1.0, 0.0, 0.0, shape);
        }
      `,
    })
    const pointsMesh = new THREE.Points(pointsGeometry, pointsMaterial)
    scene.add(pointsMesh)

    const texture = new THREE.CanvasTexture(canvas)
    const textureMaterial = new THREE.ShaderMaterial({
      uniforms: {
        uTexture: { value: texture },
      },
      vertexShader: `
        varying vec2 vUv;

        void main() {
          vUv = position.xy * 0.5 + 0.5;
          gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
        }
      `,
      fragmentShader: `
        uniform sampler2D uTexture;
        varying vec2 vUv;

        void main() {
          vec4 color = texture2D(uTexture, vUv);
          gl_FragColor = vec4(color.xyz, 1.0);
        }
      `,
    })
    const textureGeometry = new THREE.PlaneGeometry(aspect * 20.0, aspect * 20.0)
    const textureMesh = new THREE.Mesh(textureGeometry, textureMaterial)
    scene.add(textureMesh)

    let startTime = 0
    let direction = 1
    let completed = true
    let rafNow = 0

    const state = { value: 0 }
    const tween = new TWEEN.Tween(state)
      .to({ value: 1 }, DURATION)
      .easing(TWEEN.Easing.Quartic.InOut)
      .onUpdate(() => {
        pointsMaterial.uniforms.uTime.value = rafNow
        pointsMaterial.uniforms.uPos.value = direction == 1 ? state.value : 1.0 - state.value
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
      textureGeometry.dispose()
      textureMaterial.dispose()
      mount.removeChild(renderer.domElement)
    }
  }, [w, h, nPoints, canvas])

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
