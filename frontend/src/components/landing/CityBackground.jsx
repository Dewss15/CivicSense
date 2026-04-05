import React, { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Stars } from '@react-three/drei';
import { useTheme } from '../../hooks/useTheme';

// City building component — shadow support for light mode depth
function Building({ position, height, color }) {
  const meshRef = useRef();
  
  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.position.y = position[1] + Math.sin(state.clock.elapsedTime * 0.5 + position[0]) * 0.1;
    }
  });

  return (
    <mesh ref={meshRef} position={position} castShadow receiveShadow>
      <boxGeometry args={[0.5, height, 0.5]} />
      <meshStandardMaterial 
        color={color} 
        emissive={color}
        emissiveIntensity={0.15}
        roughness={0.4}
        metalness={0.7}
      />
    </mesh>
  );
}

// City grid — uses different palettes for light vs dark
function CityGrid({ isDark }) {
  const darkColors = ['#667eea', '#764ba2', '#14b8a6', '#5eead4'];
  const lightColors = ['#4c51bf', '#6d28d9', '#0d9488', '#0891b2'];
  const colors = isDark ? darkColors : lightColors;

  const buildings = useMemo(() => {
    const result = [];
    for (let x = -5; x < 5; x += 1.2) {
      for (let z = -3; z < 3; z += 1.2) {
        const height = Math.random() * 2 + 0.5;
        const color = colors[Math.floor(Math.random() * colors.length)];
        result.push(
          <Building 
            key={`${x}-${z}`} 
            position={[x, height / 2, z]} 
            height={height} 
            color={color}
          />
        );
      }
    }
    return result;
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isDark]);
  
  return <group>{buildings}</group>;
}

// Ground plane — adds soft shadow catch in light mode
function Ground({ isDark }) {
  return (
    <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.05, 0]} receiveShadow>
      <planeGeometry args={[30, 20]} />
      <shadowMaterial transparent opacity={isDark ? 0.2 : 0.12} />
    </mesh>
  );
}

// Floating particles
function Particles({ isDark }) {
  const count = 100;
  const positions = useMemo(() => {
    const arr = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      arr[i * 3] = (Math.random() - 0.5) * 20;
      arr[i * 3 + 1] = Math.random() * 10;
      arr[i * 3 + 2] = (Math.random() - 0.5) * 20;
    }
    return arr;
  }, []);

  return (
    <points>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={count}
          array={positions}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial size={0.05} color={isDark ? '#667eea' : '#4c51bf'} transparent opacity={isDark ? 0.6 : 0.4} />
    </points>
  );
}

// Main 3D Scene
function Scene({ isDark }) {
  return (
    <>
      <ambientLight intensity={isDark ? 0.5 : 0.8} />
      <directionalLight
        position={[10, 10, 5]}
        intensity={isDark ? 1 : 1.4}
        castShadow
        shadow-mapSize-width={1024}
        shadow-mapSize-height={1024}
        shadow-camera-far={50}
        shadow-camera-left={-10}
        shadow-camera-right={10}
        shadow-camera-top={10}
        shadow-camera-bottom={-10}
      />
      <pointLight position={[-10, -10, -5]} intensity={0.5} color={isDark ? '#764ba2' : '#6d28d9'} />
      
      <CityGrid isDark={isDark} />
      <Ground isDark={isDark} />
      <Particles isDark={isDark} />
      {isDark && <Stars radius={100} depth={50} count={5000} factor={4} saturation={0} fade speed={1} />}
      
      <OrbitControls 
        enableZoom={false} 
        enablePan={false}
        autoRotate
        autoRotateSpeed={0.5}
        maxPolarAngle={Math.PI / 2}
        minPolarAngle={Math.PI / 3}
      />
    </>
  );
}

// Background component
export default function CityBackground() {
  const { theme } = useTheme();
  const isDark = theme === 'dark';

  return (
    <div className="fixed inset-0 z-0" style={{ pointerEvents: 'none' }}>
      <Canvas
        shadows
        camera={{ position: [0, 3, 8], fov: 60 }}
        style={{ 
          background: isDark 
            ? 'linear-gradient(to bottom, #0f172a, #1e293b, #334155)'
            : 'linear-gradient(to bottom, #e0f2fe, #f0f9ff, #ffffff)',
          pointerEvents: 'none',
          opacity: isDark ? 1 : 0.65,
        }}
        gl={{ alpha: true }}
      >
        <Scene isDark={isDark} />
      </Canvas>
    </div>
  );
}
