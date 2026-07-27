'use client';

import React, { useEffect, useRef, useState, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Html } from '@react-three/drei';
import { createNoise3D } from 'simplex-noise';
import * as THREE from 'three';
import { connectors } from '@/data/connectors';
import ConnectorIcon from '@/components/ConnectorIcon';

interface NodeData {
  id: string;
  name: string;
  slug: string;
  position: [number, number, number];
  speed: number;
}

function BrainScene({
  pointer,
  isReducedMotion,
  hoveredNodeId,
  setHoveredNodeId,
}: {
  pointer: { x: number; y: number };
  isReducedMotion: boolean;
  hoveredNodeId: string | null;
  setHoveredNodeId: (id: string | null) => void;
}) {
  const brainRef = useRef<THREE.Group>(null);
  const dotsRef = useRef<{ [key: string]: THREE.Mesh }>({});
  const dotProgressRef = useRef<{ [key: string]: number }>({});

  const selectedConnectors = useMemo(() => connectors.slice(0, 6), []);

  const nodes: NodeData[] = useMemo(() => {
    return selectedConnectors.map((c, i) => {
      const angle = (i * (2 * Math.PI)) / selectedConnectors.length;
      const radius = 2.7 + (i % 2 === 0 ? 0.3 : -0.2);
      const height = (i % 2 === 0 ? 0.6 : -0.6) + (i % 3 === 0 ? 0.3 : -0.3);
      return {
        id: c.slug,
        name: c.name,
        slug: c.slug,
        position: [
          Math.cos(angle) * radius,
          height,
          Math.sin(angle) * radius,
        ],
        speed: 0.25 + (i % 3) * 0.08,
      };
    });
  }, [selectedConnectors]);

  // Geometry computation with organic noise displacement & hemisphere groove
  const brainGeo = useMemo(() => {
    const geo = new THREE.IcosahedronGeometry(1.4, 5);
    const pos = geo.attributes.position;
    const noise3D = createNoise3D();
    const v = new THREE.Vector3();

    for (let i = 0; i < pos.count; i++) {
      v.fromBufferAttribute(pos, i);
      const dir = v.clone().normalize();
      const n = noise3D(dir.x * 1.5, dir.y * 1.5, dir.z * 1.5);
      
      const fissureDist = Math.abs(dir.x);
      let groove = 1;
      if (fissureDist < 0.38) {
        groove = 0.72 + 0.28 * (fissureDist / 0.38);
      }

      const radius = (1.4 + n * 0.26) * groove;
      v.copy(dir).multiplyScalar(radius);
      pos.setXYZ(i, v.x, v.y, v.z);
    }
    geo.computeVertexNormals();
    return geo;
  }, []);

  // Initialize progress tracking
  useEffect(() => {
    nodes.forEach((n, idx) => {
      if (dotProgressRef.current[n.id] === undefined) {
        dotProgressRef.current[n.id] = (idx * 0.2) % 1;
      }
    });
  }, [nodes]);

  useFrame((_, delta) => {
    if (!brainRef.current) return;

    if (!isReducedMotion) {
      // Delta-time Y-axis spin
      brainRef.current.rotation.y += delta * 0.35;
    }

    // Parallax tilt lerp
    const targetRotX = pointer.y * 0.25;
    const targetRotZ = -pointer.x * 0.25;
    brainRef.current.rotation.x = THREE.MathUtils.lerp(
      brainRef.current.rotation.x,
      targetRotX,
      0.08
    );
    brainRef.current.rotation.z = THREE.MathUtils.lerp(
      brainRef.current.rotation.z,
      targetRotZ,
      0.08
    );

    // Traveling dots animation along lines from node -> center
    nodes.forEach((node) => {
      const dotMesh = dotsRef.current[node.id];
      if (!dotMesh) return;

      if (!isReducedMotion) {
        const isHovered = hoveredNodeId === node.id;
        const currentSpeed = isHovered ? node.speed * 2.5 : node.speed;
        let p = (dotProgressRef.current[node.id] || 0) + delta * currentSpeed;
        if (p > 1) p -= 1;
        dotProgressRef.current[node.id] = p;

        // Lerp from node position to origin [0, 0, 0]
        const [nx, ny, nz] = node.position;
        dotMesh.position.set(
          nx * (1 - p),
          ny * (1 - p),
          nz * (1 - p)
        );
      } else {
        // Static mid-point for reduced motion
        const [nx, ny, nz] = node.position;
        dotMesh.position.set(nx * 0.5, ny * 0.5, nz * 0.5);
      }
    });
  });

  return (
    <group ref={brainRef}>
      {/* 3D Brain Wireframe Mesh */}
      <mesh geometry={brainGeo}>
        <meshBasicMaterial
          wireframe
          color="#f1e9d8"
          transparent
          opacity={0.35}
        />
      </mesh>

      {/* Lines and Connector Nodes */}
      {nodes.map((node) => {
        const isHovered = hoveredNodeId === node.id;
        const linePoints = [
          new THREE.Vector3(...node.position),
          new THREE.Vector3(0, 0, 0),
        ];
        const lineGeo = new THREE.BufferGeometry().setFromPoints(linePoints);

        return (
          <group key={node.id}>
            {/* Connection Line */}
            <primitive object={new THREE.Line(lineGeo, new THREE.LineBasicMaterial({
              color: '#f1e9d8',
              transparent: true,
              opacity: isHovered ? 0.85 : 0.18,
            }))} />

            {/* Traveling Data Dot */}
            <mesh
              ref={(el) => {
                if (el) dotsRef.current[node.id] = el;
              }}
            >
              <sphereGeometry args={[0.06, 8, 8]} />
              <meshBasicMaterial
                color="#ffffff"
                transparent
                opacity={isHovered ? 1 : 0.8}
              />
            </mesh>

            {/* Drei Html Overlay Node */}
            <Html position={node.position} center transform occlude distanceFactor={6}>
              <div
                className="relative cursor-pointer group select-none"
                onPointerOver={(e) => {
                  e.stopPropagation();
                  setHoveredNodeId(node.id);
                }}
                onPointerOut={() => setHoveredNodeId(null)}
              >
                <div
                  className={`flex items-center justify-center w-10 h-10 rounded-full border transition-all duration-200 ${
                    isHovered
                      ? 'bg-white text-black border-white scale-110 shadow-[0_0_15px_rgba(255,255,255,0.4)]'
                      : 'bg-black/90 text-white/80 border-line-on-dark-strong hover:border-white'
                  }`}
                >
                  <ConnectorIcon slug={node.slug} className="w-5 h-5" />
                </div>

                {/* Hover Label */}
                {isHovered && (
                  <div className="absolute top-12 left-1/2 -translate-x-1/2 px-2.5 py-1 bg-black/95 border border-line-on-dark-strong rounded text-[10px] font-mono text-white whitespace-nowrap shadow-lg">
                    {node.name}
                  </div>
                )}
              </div>
            </Html>
          </group>
        );
      })}
    </group>
  );
}

export default function KnowledgeGraphVisual() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(false);
  const [pointer, setPointer] = useState({ x: 0, y: 0 });
  const [hoveredNodeId, setHoveredNodeId] = useState<string | null>(null);
  const [isReducedMotion, setIsReducedMotion] = useState(false);

  useEffect(() => {
    setIsReducedMotion(window.matchMedia('(prefers-reduced-motion: reduce)').matches);
  }, []);

  // Lazy mount when scrolled into view
  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
        }
      },
      { threshold: 0.1 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const handlePointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
    const y = -(((e.clientY - rect.top) / rect.height) * 2 - 1);
    setPointer({ x, y });
  };

  const handlePointerLeave = () => {
    setPointer({ x: 0, y: 0 });
    setHoveredNodeId(null);
  };

  return (
    <div
      ref={containerRef}
      className="relative w-[360px] h-[360px] md:w-[420px] md:h-[420px] flex items-center justify-center"
      data-cursor-label="EXPLORE"
      onPointerMove={handlePointerMove}
      onPointerLeave={handlePointerLeave}
    >
      {inView ? (
        <Canvas
          dpr={[1, 1.5]}
          camera={{ position: [0, 0, 5.5], fov: 45 }}
          style={{ width: '100%', height: '100%', background: 'transparent' }}
        >
          <BrainScene
            pointer={pointer}
            isReducedMotion={isReducedMotion}
            hoveredNodeId={hoveredNodeId}
            setHoveredNodeId={setHoveredNodeId}
          />
        </Canvas>
      ) : (
        <div className="w-full h-full" />
      )}
    </div>
  );
}
