'use client';

import { Suspense, useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float, MeshDistortMaterial, Stars, Sparkles } from '@react-three/drei';
import * as THREE from 'three';

export interface HeroSceneProps {
  ring3Color?: string;
  ring3Emissive?: string;
  isRotating?: boolean;
  showParticles?: boolean;
}

function KnowledgeCore({
  ring3Color = '#c084fc',
  ring3Emissive = '#9333ea',
  isRotating = true,
}: {
  ring3Color?: string;
  ring3Emissive?: string;
  isRotating?: boolean;
}) {
  const coreRef = useRef<THREE.Mesh>(null);
  const ring1Ref = useRef<THREE.Mesh>(null);
  const ring2Ref = useRef<THREE.Mesh>(null);
  const ring3Ref = useRef<THREE.Mesh>(null);
  
  useFrame((state) => {
    const t = state.clock.elapsedTime;
    if (coreRef.current && isRotating) {
      const scale = 1 + Math.sin(t * 2) * 0.05;
      coreRef.current.scale.setScalar(scale);
      coreRef.current.rotation.y += 0.005;
    }
    if (isRotating) {
      if (ring1Ref.current) ring1Ref.current.rotation.z += 0.01;
      if (ring2Ref.current) ring2Ref.current.rotation.x += 0.008;
      if (ring3Ref.current) ring3Ref.current.rotation.y += 0.007;
    }
  });

  return (
    <group>
      <mesh ref={coreRef}>
        <sphereGeometry args={[1, 64, 64]} />
        <MeshDistortMaterial
          color="#0099e6"
          emissive="#00334d"
          emissiveIntensity={0.6}
          roughness={0.15}
          metalness={0.9}
          distort={0.4}
          speed={isRotating ? 3 : 0}
        />
      </mesh>
      
      {/* Ring 1 - Emerald / Teal */}
      <mesh ref={ring1Ref}>
        <torusGeometry args={[2.2, 0.018, 16, 120]} />
        <meshStandardMaterial 
          color="#4cb48c" 
          emissive="#286c54" 
          emissiveIntensity={0.8} 
          metalness={0.9} 
          roughness={0.1} 
        />
      </mesh>
      
      {/* Ring 2 - Radiant Cyan / Sky Blue */}
      <mesh ref={ring2Ref} rotation={[Math.PI / 2.5, Math.PI / 4, 0]}>
        <torusGeometry args={[2.8, 0.016, 16, 120]} />
        <meshStandardMaterial 
          color="#38bdf8" 
          emissive="#0284c7" 
          emissiveIntensity={0.7} 
          metalness={0.9} 
          roughness={0.1} 
        />
      </mesh>
      
      {/* Ring 3 - Vivid, glowing and distinct (replaces old dark/black ring) */}
      <mesh ref={ring3Ref} rotation={[Math.PI / 4, Math.PI / 3, 0]}>
        <torusGeometry args={[3.4, 0.018, 16, 120]} />
        <meshStandardMaterial 
          color={ring3Color} 
          emissive={ring3Emissive} 
          emissiveIntensity={0.9} 
          metalness={0.9} 
          roughness={0.1} 
        />
      </mesh>
    </group>
  );
}

function FloatingNode({ position, color }: { position: [number, number, number]; color: string }) {
  return (
    <Float speed={2} rotationIntensity={0.3} floatIntensity={0.5} floatingRange={[-0.2, 0.2]}>
      <mesh position={position}>
        <icosahedronGeometry args={[0.12, 0]} />
        <meshStandardMaterial color={color} emissive={color} emissiveIntensity={0.7} metalness={0.8} roughness={0.2} />
      </mesh>
    </Float>
  );
}

function ParticleField({ active = true }: { active?: boolean }) {
  const ref = useRef<THREE.Points>(null);
  const count = 300;
  const positions = new Float32Array(count * 3);
  
  for (let i = 0; i < count * 3; i += 3) {
    positions[i] = (Math.random() - 0.5) * 25;
    positions[i + 1] = (Math.random() - 0.5) * 25;
    positions[i + 2] = (Math.random() - 0.5) * 20 - 8;
  }

  useFrame((state) => {
    if (ref.current && active) ref.current.rotation.y = state.clock.elapsedTime * 0.015;
  });

  if (!active) return null;

  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" count={count} array={positions} itemSize={3} />
      </bufferGeometry>
      <pointsMaterial size={0.04} color="#0099e6" transparent opacity={0.5} sizeAttenuation />
    </points>
  );
}

function Scene({
  ring3Color = '#c084fc',
  ring3Emissive = '#9333ea',
  isRotating = true,
  showParticles = true,
}: HeroSceneProps) {
  const colors = ['#4cb48c', '#0099e6', '#80d4ff', '#c084fc'];
  const nodes = Array.from({ length: 12 }, (_, i) => ({
    position: [
      Math.cos(i * 0.5) * (2.5 + Math.random()),
      Math.sin(i * 0.7) * 1.5,
      Math.sin(i * 0.5) * (2.5 + Math.random()) - 2
    ] as [number, number, number],
    color: colors[i % colors.length],
  }));

  return (
    <>
      <ambientLight intensity={0.2} />
      <pointLight position={[8, 8, 8]} intensity={1.2} color="#0099e6" />
      <pointLight position={[-8, -5, -5]} intensity={0.6} color="#c084fc" />
      <pointLight position={[0, -6, 6]} intensity={0.5} color="#4cb48c" />
      
      <KnowledgeCore 
        ring3Color={ring3Color} 
        ring3Emissive={ring3Emissive} 
        isRotating={isRotating} 
      />
      {nodes.map((node, i) => (
        <FloatingNode key={i} position={node.position} color={node.color} />
      ))}
      <ParticleField active={showParticles} />
      
      {showParticles && (
        <>
          <Stars radius={80} depth={40} count={1500} factor={3} saturation={0} fade speed={0.3} />
          <Sparkles count={80} scale={12} size={1.5} speed={0.3} color="#80d4ff" />
        </>
      )}
      
      <fog attach="fog" args={['#0a0c0e', 6, 22]} />
    </>
  );
}

export default function HeroScene({
  ring3Color = '#c084fc',
  ring3Emissive = '#9333ea',
  isRotating = true,
  showParticles = true,
}: HeroSceneProps) {
  return (
    <div className="absolute inset-0 z-0">
      <Canvas camera={{ position: [0, 0, 7], fov: 55 }} gl={{ antialias: true, alpha: true }} dpr={[1, 1.5]}>
        <Suspense fallback={null}>
          <Scene 
            ring3Color={ring3Color}
            ring3Emissive={ring3Emissive}
            isRotating={isRotating}
            showParticles={showParticles}
          />
        </Suspense>
      </Canvas>
      <div className="absolute inset-0 bg-gradient-to-t from-dark-900 via-transparent to-dark-900/40 pointer-events-none" />
    </div>
  );
}