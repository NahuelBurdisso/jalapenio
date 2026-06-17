import { useMemo, useRef } from 'react'
import { Canvas, useFrame, type ThreeElements } from '@react-three/fiber'
import { Environment, Float, Lightformer } from '@react-three/drei'
import * as THREE from 'three'

const reducedMotion =
  typeof window !== 'undefined' &&
  window.matchMedia('(prefers-reduced-motion: reduce)').matches

/** 4-point chrome sparkle — the brand object as an extruded 3D mesh. */
function PepperMesh(props: ThreeElements['group']) {
  const group = useRef<THREE.Group>(null)
  const spin = useRef<THREE.Group>(null)

  const chrome = useMemo(
    () =>
      new THREE.MeshStandardMaterial({
        color: '#d6d6dc',
        metalness: 1,
        roughness: 0.22,
        envMapIntensity: 2,
      }),
    [],
  )

  // jalapeño body: revolve a profile, then bend into a chili curve
  const bodyGeo = useMemo(() => {
    const profile = (
      [
        [0.001, -1.0],
        [0.1, -0.85],
        [0.19, -0.62],
        [0.27, -0.32],
        [0.33, 0.0],
        [0.37, 0.32],
        [0.39, 0.58],
        [0.34, 0.78],
        [0.25, 0.9],
        [0.14, 0.98],
        [0.09, 1.04],
      ] as const
    ).map(([x, y]) => new THREE.Vector2(x, y))

    const geo = new THREE.LatheGeometry(profile, 56)
    const pos = geo.attributes.position
    const v = new THREE.Vector3()
    for (let i = 0; i < pos.count; i++) {
      v.fromBufferAttribute(pos, i)
      const t = (v.y + 1) / 2 // 0 = tip, 1 = top
      v.x += 0.45 * Math.pow(1 - t, 2) // tip curls sideways → chili curve
      pos.setXYZ(i, v.x, v.y, v.z)
    }
    geo.computeVertexNormals()
    return geo
  }, [])

  // little stem at the top
  const stemGeo = useMemo(
    () => new THREE.CylinderGeometry(0.028, 0.075, 0.4, 14),
    [],
  )

  useFrame((state, dt) => {
    if (reducedMotion) return
    if (spin.current) spin.current.rotation.y += dt * 0.4
    if (group.current) {
      group.current.rotation.x = THREE.MathUtils.lerp(
        group.current.rotation.x,
        0.1 - state.pointer.y * 0.3,
        0.05,
      )
      group.current.rotation.z = THREE.MathUtils.lerp(
        group.current.rotation.z,
        0.45 + state.pointer.x * 0.25,
        0.05,
      )
    }
  })

  return (
    <group ref={group} rotation={[0.1, 0, 0.45]} {...props}>
      <Float
        speed={reducedMotion ? 0 : 1.2}
        rotationIntensity={0.15}
        floatIntensity={0.5}
      >
        <group ref={spin}>
          <mesh geometry={bodyGeo} material={chrome} />
          <mesh
            geometry={stemGeo}
            material={chrome}
            position={[0.02, 1.2, 0]}
            rotation={[0, 0, -0.35]}
          />
        </group>
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
      <directionalLight
        position={[-4, -2, 3]}
        intensity={0.8}
        color="#e23b3b"
      />

      <PepperMesh scale={1.15} />

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
