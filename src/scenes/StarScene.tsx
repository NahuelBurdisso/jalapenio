import { useMemo, useRef } from 'react'
import { Canvas, useFrame, type ThreeElements } from '@react-three/fiber'
import { Environment, Float, Lightformer } from '@react-three/drei'
import * as THREE from 'three'

const reducedMotion =
  typeof window !== 'undefined' &&
  window.matchMedia('(prefers-reduced-motion: reduce)').matches

/** Chrome jalapeño — brand object as a real 3D mesh, shape copied from the
 *  reference photo: fat curved body, pointed curling tip, prominent bent stem. */
function PepperMesh(props: ThreeElements['group']) {
  const group = useRef<THREE.Group>(null)
  const spin = useRef<THREE.Group>(null)

  const chrome = useMemo(
    () =>
      new THREE.MeshStandardMaterial({
        color: '#d6d6dc',
        metalness: 1,
        roughness: 0.18,
        envMapIntensity: 2.2,
      }),
    [],
  )

  // jalapeño body: revolve a profile, add lengthwise ridges, then bend
  const bodyGeo = useMemo(() => {
    // radius (x) vs height (y): pointed tip at -1, fat shoulder near +1
    const profile = (
      [
        [0.005, -1.0],
        [0.1, -0.85],
        [0.21, -0.65],
        [0.31, -0.45],
        [0.39, -0.25],
        [0.44, -0.05],
        [0.47, 0.18],
        [0.46, 0.4],
        [0.42, 0.6],
        [0.35, 0.76],
        [0.26, 0.88],
        [0.15, 0.97],
        [0.08, 1.03],
      ] as const
    ).map(([x, y]) => new THREE.Vector2(x, y))

    const geo = new THREE.LatheGeometry(profile, 80)
    const pos = geo.attributes.position
    const v = new THREE.Vector3()
    for (let i = 0; i < pos.count; i++) {
      v.fromBufferAttribute(pos, i)
      const t = (v.y + 1) / 2 // 0 = tip, 1 = top
      // jalapeño ridges: gentle 5-lobe ripple, fading out at the tip
      const theta = Math.atan2(v.z, v.x)
      const r = Math.hypot(v.x, v.z)
      const ridged = r * (1 + 0.045 * Math.cos(5 * theta) * t)
      v.x = Math.cos(theta) * ridged
      v.z = Math.sin(theta) * ridged
      // C-curve: tip curls sideways (clamp base so pow never sees a negative)
      v.x += 0.5 * Math.pow(Math.max(0, 1 - t), 1.9)
      pos.setXYZ(i, v.x, v.y, v.z)
    }
    geo.computeVertexNormals()
    return geo
  }, [])

  // curved, slightly knobby stem swept along a bent path
  const stemGeo = useMemo(() => {
    const curve = new THREE.CatmullRomCurve3([
      new THREE.Vector3(0.05, 0.0, 0),
      new THREE.Vector3(0.05, 0.16, 0.01),
      new THREE.Vector3(-0.02, 0.3, 0.02),
      new THREE.Vector3(-0.13, 0.4, 0.0),
      new THREE.Vector3(-0.22, 0.44, -0.02),
    ])
    return new THREE.TubeGeometry(curve, 40, 0.08, 16, false)
  }, [])

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
          {/* knobby cap where stem meets the body */}
          <mesh material={chrome} position={[0.06, 1.0, 0]}>
            <sphereGeometry args={[0.1, 20, 20]} />
          </mesh>
          {/* curved stem sweeping up from the shoulder */}
          <mesh geometry={stemGeo} material={chrome} position={[0.04, 1.02, 0]} />
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
