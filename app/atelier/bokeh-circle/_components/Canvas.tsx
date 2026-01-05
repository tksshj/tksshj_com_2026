import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
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
    mount.appendChild(renderer.domElement)

    const camera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0.01, 10)
    camera.position.z = 1

    const scene = new THREE.Scene()

    const material = new THREE.ShaderMaterial({
      uniforms: {
        uResolution: {
          value: new THREE.Vector2(WIDTH, HEIGHT),
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
          if (0.5 < length(uv)) {
            discard;
          }
          float shape = smoothstep(0.5, 0.0, length(uv));

          // vec3 targetColor = vec3(0.2627, 0.3098, 0.4000);
          // gl_FragColor = vec4(targetColor, shape);

          // mix使うといい感じなんだけど、複数重ねたときどうなるんだろうか
          // bgColorをどうやってもってくるのか
          vec3 bgColor = vec3(0.8941, 0.9059, 0.9255);
          vec3 targetColor = vec3(0.2627, 0.3098, 0.4000);
          vec3 mixed = mix(bgColor, targetColor, shape * 2.0);
          gl_FragColor = vec4(mixed, shape);
        }
      `,
      transparent: true,
    })

    const geometry = new THREE.PlaneGeometry(2, 2)

    const mesh = new THREE.Mesh(geometry, material)
    scene.add(mesh)

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
    <Box>
      <Box
        sx={{
          width: '100%',
          canvas: {
            width: '100%',
          },
        }}
        ref={mountRef}
      />
      <Typography component='p' variant='body1'></Typography>
    </Box>
  )
}
