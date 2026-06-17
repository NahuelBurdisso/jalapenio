import { useMemo, useRef } from 'react'
import { Canvas, useFrame, type ThreeElements } from '@react-three/fiber'
import { Environment, Float, Lightformer } from '@react-three/drei'
import * as THREE from 'three'

const reducedMotion =
  typeof window !== 'undefined' &&
  window.matchMedia('(prefers-reduced-motion: reduce)').matches

/** 4-point chrome sparkle — the brand object as an extruded 3D mesh. */
function StarMesh(props: ThreeElements['group']) {
  const group = useRef<THREE.Group>(null)
  const mesh = useRef<THREE.Mesh>(null)

  const geometry = useMemo(() => {
    const shape = new THREE.Shape()
    const outer = 1
    const inner = 0.17
    for (let i = 0; i < 8; i++) {
      const a = Math.PI / 2 - (i * Math.PI) / 4
      const r = i % 2 === 0 ? outer : inner
      const x = Math.cos(a) * r
      const y = Math.sin(a) * r
      if (i === 0) shape.moveTo(x, y)
      else shape.lineTo(x, y)
    }
    shape.closePath()
    const geo = new THREE.ExtrudeGeometry(shape, {
      depth: 0.32,
      bevelEnabled: true,
      bevelThickness: 0.14,
      bevelSize: 0.1,
      bevelSegments: 8,
      steps: 1,
    })
    geo.center()
    geo.computeVertexNormals()
    return geo
  }, [])

  useFrame((state, dt) => {
    if (reducedMotion) return
    // spin in-plane (Z) so the sparkle always faces the camera — never edge-on
    if (mesh.current) mesh.current.rotation.z += dt * 0.25
    if (group.current) {
      group.current.rotation.x = THREE.MathUtils.lerp(
        group.current.rotation.x,
        0.12 - state.pointer.y * 0.35,
        0.05,
      )
      group.current.rotation.y = THREE.MathUtils.lerp(
        group.current.rotation.y,
        state.pointer.x * 0.45,
        0.05,
      )
    }
  })

  return (
    <group ref={group} rotation={[0.12, 0, 0]} {...props}>
      <Float
        speed={reducedMotion ? 0 : 1.2}
        rotationIntensity={0.15}
        floatIntensity={0.5}
      >
        <mesh ref={mesh} geometry={geometry}>
          <meshStandardMaterial
            color="#d6d6dc"
            metalness={1}
            roughness={0.22}
            envMapIntensity={2}
          />
        </mesh>
      </Float>
    </group>
  )
}

export default function StarScene() {
  return (
    <Canvas
      dpr={[1, 2]}
      camera={{ position: [0, 0, 5], fov: 35 }}
      gl={{ antialias: true, alpha: true }}
      style={{ background: 'transparent' }}
    >
      <ambientLight intensity={0.7} />
      <directionalLight position={[3, 4, 5]} intensity={1.4} />
      <directionalLight position={[-4, -2, 3]} intensity={0.8} color="#e23b3b" />
      <StarMesh scale={1.25} />

      {/* Studio reflections built from light shapes — no external HDR, fully offline */}
      <Environment resolution={256}>
        <Lightformer
          form="rect"
          intensity={3.6}
          position={[0, 1, 5]}
          scale={[9, 9, 1]}
          color="#ffffff"
        />
        <Lightformer
          form="rect"
          intensity={3}
          position={[-4, -1, 2]}
          scale={[5, 5, 1]}
          color="#e23b3b"
        />
        <Lightformer
          form="circle"
          intensity={1.8}
          position={[4, 1, 3]}
          scale={[3, 3, 1]}
          color="#ffd9a0"
        />
        <Lightformer
          form="rect"
          intensity={1.4}
          position={[0, -3, -2]}
          scale={[6, 6, 1]}
          color="#9a9aa0"
        />
      </Environment>
    </Canvas>
  )
}
