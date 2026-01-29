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

    const camera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0.01, 10)
    camera.position.z = 1

    const scene = new THREE.Scene()

    const material = new THREE.ShaderMaterial({
      transparent: true,
      depthTest: false,
      depthWrite: false,
      uniforms: {
        uResolution: {
          value: new THREE.Vector2(w, h),
        },
      },
      vertexShader: `
        varying vec2 vUv;

        void main() {
          vUv = uv;
          gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
        }
      `,
      fragmentShader: `
        uniform vec2 uResolution;
        varying vec2 vUv;

        void main() {
          vec2 uv = vUv - 0.5;
          float aspect = uResolution.x / uResolution.y;
          uv *= vec2(aspect, 1.0);
          uv /= min(aspect, 1.0);
          gl_FragColor = vec4(step(0.5, length(uv)));
        }
      `,
    })
    const geometry = new THREE.PlaneGeometry(2, 2)
    const mesh = new THREE.Mesh(geometry, material)
    scene.add(mesh)

    const positions = new Float32Array(cols * rows * 3)
    let idx = 0
    for (let y = 0; y < rows; y++) {
      for (let x = 0; x < cols; x++) {
        const px = ((x + 0.5) * w) / cols
        const py = ((y + 0.5) * h) / rows
        const worldX = px / w
        const worldY = py / h
        positions[idx++] = worldX
        positions[idx++] = worldY
        positions[idx++] = 0.0 // z
      }
    }
    const pointsGeometry = new THREE.BufferGeometry()
    pointsGeometry.setAttribute('position', new THREE.BufferAttribute(positions, 3))

    const pointsMaterial = new THREE.ShaderMaterial({
      transparent: true,
      depthTest: false,
      depthWrite: false,
      uniforms: {
        uResolution: {
          value: new THREE.Vector2(w, h),
        },
      },
      vertexShader: `
        void main() {
          vec3 pos = (position - 0.5) * 2.0;
          gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
          gl_PointSize = 20.0;
        }
      `,
      fragmentShader: `
        void main() {
          vec2 uv = gl_PointCoord - 0.5;
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
