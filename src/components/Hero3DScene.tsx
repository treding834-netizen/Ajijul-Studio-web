import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { RoomEnvironment } from 'three/addons/environments/RoomEnvironment.js';
import { Sparkles, Download, ArrowRight, ShieldCheck, Cpu } from 'lucide-react';
import { ApkInfo } from '../types';

interface Hero3DSceneProps {
  apkInfo: ApkInfo;
  onNavigateToDownload: () => void;
  onNavigateToFeatures: () => void;
  onRecordDownload: () => void;
}

export const Hero3DScene: React.FC<Hero3DSceneProps> = ({
  apkInfo,
  onNavigateToDownload,
  onNavigateToFeatures,
  onRecordDownload,
}) => {
  const mountRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    // Software WebGL guard
    const isSoftwareGl = (() => {
      try {
        const canvas = document.createElement('canvas');
        const gl = canvas.getContext('webgl2') || canvas.getContext('webgl');
        if (!gl) return true;
        const ext = gl.getExtension('WEBGL_debug_renderer_info');
        const param = ext ? ext.UNMASKED_RENDERER_WEBGL : gl.RENDERER;
        const gpu = String(gl.getParameter(param));
        return /SwiftShader|llvmpipe|softpipe|Software|Basic Render/i.test(gpu);
      } catch {
        return true;
      }
    })();

    // Scene, Camera, Renderer
    const scene = new THREE.Scene();
    scene.fog = new THREE.FogExp2(0x020617, 0.035);

    const camera = new THREE.PerspectiveCamera(
      45,
      container.clientWidth / container.clientHeight,
      0.1,
      100
    );
    camera.position.set(0, 1.5, 6);

    const renderer = new THREE.WebGLRenderer({
      antialias: !isSoftwareGl,
      alpha: true,
      powerPreference: 'high-performance',
    });
    renderer.setSize(container.clientWidth, container.clientHeight);
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.2;
    renderer.setPixelRatio(isSoftwareGl ? 1 : Math.min(window.devicePixelRatio, 2));
    
    if (!isSoftwareGl) {
      renderer.shadowMap.enabled = true;
      renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    }

    container.appendChild(renderer.domElement);

    // Studio Environment
    try {
      const pmremGenerator = new THREE.PMREMGenerator(renderer);
      scene.environment = pmremGenerator.fromScene(new RoomEnvironment(), 0.04).texture;
      pmremGenerator.dispose();
    } catch {
      // fallback if RoomEnvironment fails
    }

    // Lighting
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.8);
    scene.add(ambientLight);

    const dirLight = new THREE.DirectionalLight(0x38bdf8, 2.5);
    dirLight.position.set(5, 8, 5);
    if (!isSoftwareGl) {
      dirLight.castShadow = true;
      dirLight.shadow.mapSize.width = 1024;
      dirLight.shadow.mapSize.height = 1024;
      dirLight.shadow.bias = -0.0005;
    }
    scene.add(dirLight);

    const purpleLight = new THREE.PointLight(0x818cf8, 3, 10);
    purpleLight.position.set(-4, -2, 2);
    scene.add(purpleLight);

    // Create Composite 3D AI Core / Floating Crystal Group
    const coreGroup = new THREE.Group();

    // 1. Central Icosahedron Crystal
    const crystalGeo = new THREE.IcosahedronGeometry(1.2, 0);
    const crystalMat = new THREE.MeshPhysicalMaterial({
      color: 0x06b6d4,
      metalness: 0.2,
      roughness: 0.1,
      transmission: isSoftwareGl ? 0.3 : 0.9,
      ior: 2.33,
      thickness: 1.2,
      transparent: true,
      opacity: 0.9,
    });
    const crystal = new THREE.Mesh(crystalGeo, crystalMat);
    coreGroup.add(crystal);

    // 2. Outer Wireframe Gyro Rings
    const ringMat = new THREE.MeshStandardMaterial({
      color: 0x818cf8,
      wireframe: true,
      emissive: 0x4f46e5,
      emissiveIntensity: 0.4,
    });

    const ring1 = new THREE.Mesh(new THREE.TorusGeometry(1.8, 0.03, 16, 64), ringMat);
    coreGroup.add(ring1);

    const ring2 = new THREE.Mesh(new THREE.TorusGeometry(2.3, 0.03, 16, 64), ringMat);
    ring2.rotation.x = Math.PI / 3;
    coreGroup.add(ring2);

    const ring3 = new THREE.Mesh(new THREE.TorusGeometry(2.8, 0.02, 16, 64), ringMat);
    ring3.rotation.y = Math.PI / 4;
    coreGroup.add(ring3);

    // 3. Floating particle ring
    const particleCount = 200;
    const particleGeo = new THREE.BufferGeometry();
    const positions = new Float32Array(particleCount * 3);
    for (let i = 0; i < particleCount * 3; i += 3) {
      const radius = 3 + Math.random() * 1.5;
      const theta = Math.random() * Math.PI * 2;
      const phi = (Math.random() - 0.5) * Math.PI;
      positions[i] = radius * Math.cos(phi) * Math.cos(theta);
      positions[i + 1] = radius * Math.sin(phi);
      positions[i + 2] = radius * Math.cos(phi) * Math.sin(theta);
    }
    particleGeo.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    const particleMat = new THREE.PointsMaterial({
      color: 0x38bdf8,
      size: 0.05,
      transparent: true,
      opacity: 0.7,
    });
    const particles = new THREE.Points(particleGeo, particleMat);
    coreGroup.add(particles);

    scene.add(coreGroup);

    // Mouse interaction parallax
    let mouseX = 0;
    let mouseY = 0;
    const handleMouseMove = (e: MouseEvent) => {
      mouseX = (e.clientX / window.innerWidth - 0.5) * 0.5;
      mouseY = (e.clientY / window.innerHeight - 0.5) * 0.5;
    };
    window.addEventListener('mousemove', handleMouseMove);

    // Resize handler
    const handleResize = () => {
      if (!container) return;
      camera.aspect = container.clientWidth / container.clientHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(container.clientWidth, container.clientHeight);
    };
    window.addEventListener('resize', handleResize);

    // Animation Loop
    let frameId = 0;
    let clock = new THREE.Clock();

    const animate = () => {
      const delta = clock.getDelta();
      const time = clock.getElapsedTime();

      // Rotate core group gracefully
      coreGroup.rotation.y = time * 0.2 + mouseX * 0.8;
      coreGroup.rotation.x = Math.sin(time * 0.15) * 0.2 + mouseY * 0.8;

      ring1.rotation.z = time * 0.4;
      ring2.rotation.y = time * -0.3;
      ring3.rotation.x = time * 0.25;

      crystal.position.y = Math.sin(time * 2) * 0.1;

      renderer.render(scene, camera);

      if (isSoftwareGl) {
        frameId = window.setTimeout(animate, 50);
      } else {
        frameId = requestAnimationFrame(animate);
      }
    };

    animate();

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('resize', handleResize);
      if (isSoftwareGl) {
        clearTimeout(frameId);
      } else {
        cancelAnimationFrame(frameId);
      }
      renderer.dispose();
      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
    };
  }, []);

  return (
    <div className="relative overflow-hidden bg-slate-950 py-16 lg:py-24">
      {/* Background glow effects */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-cyan-500/10 rounded-full blur-[120px] pointer-events-none animate-pulse-glow" />
      <div className="absolute bottom-10 right-10 w-[400px] h-[400px] bg-indigo-600/10 rounded-full blur-[100px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Text Column */}
          <div className="lg:col-span-7 text-left space-y-8">
            
            {/* Version Badge */}
            <div className="inline-flex items-center gap-2.5 px-3.5 py-1.5 rounded-full bg-cyan-500/10 border border-cyan-500/35 text-cyan-300 text-xs font-medium">
              <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
              <span>Ajijul AI v{apkInfo.version} Available</span>
              <span className="w-1.5 h-1.5 rounded-full bg-cyan-400"></span>
              <span className="font-mono text-cyan-200">{apkInfo.fileSize}</span>
            </div>

            {/* Main Headline */}
            <h1 className="text-4xl sm:text-6xl font-extrabold tracking-tight text-white leading-[1.1] text-wrap balance">
              Experience Next-Gen <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-indigo-400 to-purple-500">Ajijul AI</span> on Android
            </h1>

            {/* Subtitle */}
            <p className="text-lg text-slate-300 max-w-xl leading-relaxed">
              Unlock superhuman intelligence directly on your Android device. Lightning fast neural processing, smart voice assistance, and offline capabilities crafted by <strong className="text-white font-semibold">Md Ajijul Haque</strong>.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-wrap items-center gap-4 pt-2">
              <a
                href={apkInfo.downloadUrl}
                target="_blank"
                rel="noopener noreferrer"
                onClick={onRecordDownload}
                className="inline-flex items-center gap-3 px-8 py-4 rounded-2xl bg-gradient-to-r from-cyan-500 to-indigo-600 hover:from-cyan-400 hover:to-indigo-500 text-white font-semibold shadow-xl shadow-cyan-500/25 transition-all transform hover:-translate-y-0.5"
              >
                <Download className="w-5 h-5" />
                Download APK Now
                <ArrowRight className="w-4 h-4" />
              </a>

              <button
                onClick={onNavigateToFeatures}
                className="inline-flex items-center gap-2 px-7 py-4 rounded-2xl bg-slate-900/80 hover:bg-slate-800 text-slate-200 font-medium border border-slate-800 hover:border-slate-700 transition-all"
              >
                <Cpu className="w-4 h-4 text-cyan-400" />
                Explore Features
              </button>
            </div>

            {/* Trust Badges / Stats */}
            <div className="grid grid-cols-3 gap-6 pt-6 border-t border-slate-800/80">
              <div>
                <div className="text-2xl font-bold font-mono text-white">
                  {(apkInfo.downloadsCount).toLocaleString()}+
                </div>
                <div className="text-xs text-slate-400">Total Downloads</div>
              </div>
              <div>
                <div className="text-2xl font-bold font-mono text-white">4.9★</div>
                <div className="text-xs text-slate-400">User Rating</div>
              </div>
              <div>
                <div className="text-2xl font-bold font-mono text-cyan-400">100%</div>
                <div className="text-xs text-slate-400">Secure & Verified</div>
              </div>
            </div>

          </div>

          {/* Right 3D Viewport Column */}
          <div className="lg:col-span-5 relative">
            <div className="relative w-full aspect-square max-w-[480px] mx-auto rounded-3xl bg-gradient-to-b from-slate-900/80 to-slate-950/80 border border-slate-800/80 shadow-2xl overflow-hidden backdrop-blur-xl">
              
              {/* Three.js Canvas container */}
              <div ref={mountRef} className="absolute inset-0 w-full h-full cursor-grab active:cursor-grabbing" />

              {/* Floating overlay badge */}
              <div className="absolute bottom-6 left-6 right-6 p-4 rounded-2xl bg-slate-900/90 border border-slate-800/80 backdrop-blur-md flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center">
                    <ShieldCheck className="w-5 h-5 text-cyan-400" />
                  </div>
                  <div>
                    <div className="text-xs font-semibold text-white">Android Verified APK</div>
                    <div className="text-[11px] text-slate-400 font-mono">Min: Android {apkInfo.minAndroid}</div>
                  </div>
                </div>
                <a
                  href={apkInfo.downloadUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={onRecordDownload}
                  className="px-4 py-2 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 text-xs font-bold transition-all shadow-md shadow-cyan-500/20"
                >
                  Get APK
                </a>
              </div>

            </div>
          </div>

        </div>
      </div>
    </div>
  );
};
