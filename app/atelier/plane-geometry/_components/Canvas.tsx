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
          gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
        }
      `,
      fragmentShader: `
        void main() {
          gl_FragColor = vec4(0.2627, 0.3098, 0.4000, 1.0);
        }
      `,
    })

    const geometry = new THREE.PlaneGeometry(2, 2)

    const mesh = new THREE.Mesh(geometry, material)
    scene.add(mesh)

    const material2 = new THREE.ShaderMaterial({
      vertexShader: `
        varying vec2 vUv;

        void main() {
          vUv = uv;
          gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
        }
      `,
      fragmentShader: `
        varying vec2 vUv;

      void main() {
  vec2 p = vUv - 0.5;
  float d = length(p);

  float r = 0.25;
  float edge = 0.002;

  float c = smoothstep(0.1, 0.3, d);

  gl_FragColor = vec4(vec3(c), d);

  // vec2 p = vUv - 0.5;          // 中心を (0,0) に
  // float d = length(p);         // 中心からの距離

  // float r = 0.25;              // 半径
  // float c = step(d, r);        // 円の内側 = 1

  // gl_FragColor = vec4(vec3(c), 1.0);
      // gl_FragColor = vec4(0.1627, 0.3098, 0.4000, 1.0) * length(vUv);
      //      gl_FragColor = vec4(vUv, 0.0, 1.0);
        }
      `,
    })

    const geometry2 = new THREE.PlaneGeometry(0.5, 0.5)

    const mesh2 = new THREE.Mesh(geometry2, material2)
    scene.add(mesh2)

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
