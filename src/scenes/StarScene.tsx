import { useMemo, useRef } from 'react'
import { Canvas, useFrame, type ThreeElements } from '@react-three/fiber'
import {
  Environment,
  Float,
  Lightformer,
  SpotLight as VolumeSpot,
} from '@react-three/drei'
import * as THREE from 'three'

const reducedMotion =
  typeof window !== 'undefined' &&
  window.matchMedia('(prefers-reduced-motion: reduce)').matches

/** 4-point chrome sparkle — the brand object as an extruded 3D mesh. */
function StarMesh(props: ThreeElements['group']) {
  const group = useRef<THREE.Group>(null)
  const mesh = useRef<THREE.Mesh>(null)

  const geometry = useMemo(() => {
    // 5-point star, hollow frame (outline) — matches the Jalapeño isologo
    const starPts = (outerR: number, innerR: number) => {
      const pts: THREE.Vector2[] = []
      for (let i = 0; i < 10; i++) {
        const a = (i * Math.PI) / 5 - Math.PI / 2
        const r = i % 2 === 0 ? outerR : innerR
        pts.push(new THREE.Vector2(Math.cos(a) * r, Math.sin(a) * r))
      }
      return pts
    }
    const shape = new THREE.Shape(starPts(1, 0.42))
    const hole = new THREE.Path(starPts(0.64, 0.27).reverse())
    shape.holes.push(hole)

    const geo = new THREE.ExtrudeGeometry(shape, {
      depth: 0.16,
      bevelEnabled: true,
      bevelThickness: 0.07,
      bevelSize: 0.05,
      bevelSegments: 5,
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

/** A spotlight below the star aimed at the center, swaying gently. */
function MovingSpot({ side, color }: { side: number; color: string }) {
  const light = useRef<THREE.SpotLight>(null)
  const target = useMemo(() => new THREE.Object3D(), [])
  const baseX = side * 2.8

  useFrame((state) => {
    if (reducedMotion || !light.current) return
    const t = state.clock.elapsedTime
    light.current.position.x = baseX + Math.sin(t * 0.7 + side) * 1.1
    light.current.position.z = 2.4 + Math.cos(t * 0.5 + side) * 0.7
  })

  return (
    <>
      <primitive object={target} position={[0, 0, 0]} />
      <VolumeSpot
        ref={light}
        position={[baseX, -3.4, 2.4]}
        target={target}
        angle={0.5}
        penumbra={1}
        intensity={18}
        distance={16}
        attenuation={7}
        anglePower={4}
        radiusTop={0.06}
        radiusBottom={1.1}
        opacity={0.45}
        color={color}
      />
    </>
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

      {/* two reflectors below, aimed at the star, swaying */}
      <MovingSpot side={-1} color="#ffffff" />
      <MovingSpot side={1} color="#e23b3b" />

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
