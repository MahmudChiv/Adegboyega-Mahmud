"use client";

import { useEffect, useRef, useState } from "react";
import * as THREE from "three";

interface PhotoConfig {
  url: string;
  focalX?: number; // 0 = left, 0.5 = center, 1 = right
  focalY?: number; // 0 = top, 0.5 = center, 1 = bottom
}

const PHOTOS: PhotoConfig[] = [
  { url: "/images/MyPhotos/me1.png", focalX: 0.5, focalY: 0.35 },
  { url: "/images/MyPhotos/Me3-optimized.jpg", focalX: 0.5, focalY: 0.35 },
  { url: "/images/MyPhotos/me2.png", focalX: 0.5, focalY: 0.35 },
  { url: "/images/MyPhotos/Mahmud.jpeg", focalX: 0.82, focalY: 0.35 }, // Right-aligned anchor so Mahmud is centered
];

export default function KernelMonolithCanvas() {
  const mountRef = useRef<HTMLDivElement>(null);
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let isMobile = window.innerWidth < 768;

    // 1. Scene setup
    const scene = new THREE.Scene();

    // 2. Camera
    const camera = new THREE.PerspectiveCamera(
      36,
      container.clientWidth / container.clientHeight,
      0.1,
      100
    );
    camera.position.set(0, 0, 5.0);

    // 3. Renderer
    const renderer = new THREE.WebGLRenderer({
      alpha: true,
      antialias: true,
      powerPreference: "high-performance",
    });
    renderer.setSize(container.clientWidth, container.clientHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5));
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.25;
    container.appendChild(renderer.domElement);

    // 4. Lighting for outer frame
    const ambientLight = new THREE.AmbientLight(0x222630, 2.5);
    scene.add(ambientLight);

    const keyLight = new THREE.DirectionalLight(0xfff6ea, 3.5);
    keyLight.position.set(4, 5, 4);
    scene.add(keyLight);

    const rimLight = new THREE.DirectionalLight(0x8b7bf7, 4.0);
    rimLight.position.set(-5, -2, -2);
    scene.add(rimLight);

    // 5. Monolith Hierarchy Group
    const monolithGroup = new THREE.Group();
    scene.add(monolithGroup);

    // Frame Dimensions
    const width = 1.7;
    const height = 2.45;
    const depth = 0.28;

    // Outer Obsidian Frame Mesh
    const outerGeo = new THREE.BoxGeometry(width, height, depth);
    const outerMat = new THREE.MeshPhysicalMaterial({
      color: 0x0a0c10,
      metalness: 0.9,
      roughness: 0.2,
      clearcoat: 0.7,
      clearcoatRoughness: 0.1,
    });
    const outerMesh = new THREE.Mesh(outerGeo, outerMat);
    monolithGroup.add(outerMesh);

    // Precision Architectural Beveled Edges
    const edgeGeo = new THREE.EdgesGeometry(outerGeo);
    const edgeMat = new THREE.LineBasicMaterial({
      color: 0x8b7bf7,
      transparent: true,
      opacity: 0.6,
    });
    const wireframe = new THREE.LineSegments(edgeGeo, edgeMat);
    monolithGroup.add(wireframe);

    // Inner bevel rim line
    const innerRimGeo = new THREE.EdgesGeometry(new THREE.BoxGeometry(width * 0.94, height * 0.94, depth * 1.02));
    const innerRimMat = new THREE.LineBasicMaterial({
      color: 0x4f46e5,
      transparent: true,
      opacity: 0.35,
    });
    const innerWireframe = new THREE.LineSegments(innerRimGeo, innerRimMat);
    monolithGroup.add(innerWireframe);

    // 6. Photo Slideshow CanvasTexture Setup
    const canvas = document.createElement("canvas");
    canvas.width = 1024;
    canvas.height = 1480;
    const ctx = canvas.getContext("2d");

    const canvasTexture = new THREE.CanvasTexture(canvas);
    canvasTexture.colorSpace = THREE.SRGBColorSpace;
    canvasTexture.minFilter = THREE.LinearFilter;
    canvasTexture.magFilter = THREE.LinearFilter;

    // Use MeshBasicMaterial for 100% full brightness and true color without light falloff/dimming
    const photoMat = new THREE.MeshBasicMaterial({
      map: canvasTexture,
    });

    const photoGeo = new THREE.PlaneGeometry(width * 0.91, height * 0.92);

    // Front Photo Plane
    const photoMesh = new THREE.Mesh(photoGeo, photoMat);
    photoMesh.position.z = depth / 2 + 0.002;
    monolithGroup.add(photoMesh);

    // Back Photo Plane (Render slideshow on both front and back)
    const backPhotoMesh = new THREE.Mesh(photoGeo, photoMat);
    backPhotoMesh.position.z = -(depth / 2 + 0.002);
    backPhotoMesh.rotation.y = Math.PI;
    monolithGroup.add(backPhotoMesh);

    // Preload Images
    const loadedImages: HTMLImageElement[] = [];
    let imagesReady = 0;
    let initialDrawn = false;

    PHOTOS.forEach((photo, i) => {
      const img = new Image();
      img.crossOrigin = "anonymous";
      img.src = photo.url;
      img.onload = () => {
        loadedImages[i] = img;
        imagesReady++;
        if (!initialDrawn) {
          if (i === 0 || loadedImages[0]) {
            drawSlideshow(0, 0, 1);
            initialDrawn = true;
          } else if (imagesReady === 1) {
            // Draw whatever loaded first until index 0 is ready
            drawSlideshow(i, i, 1);
          }
        }
      };
      // fallback in case optimized image fails to load
      img.onerror = () => {
        if (photo.url.includes("-optimized")) {
          img.src = "/images/MyPhotos/Me3.jpg";
        }
      };
    });

    // Slideshow state
    let activeIdx = 0;
    let nextIdx = 1;
    let transitionProgress = 1;
    const SLIDE_DURATION = 4.2; // seconds per photo
    const FADE_DURATION = 0.9; // seconds crossfade
    let slideTimer = 0;

    function drawCoverImage(targetImg: HTMLImageElement, alpha: number, focalX = 0.5, focalY = 0.5) {
      if (!ctx) return;
      ctx.globalAlpha = alpha;
      const hRatio = canvas.width / targetImg.width;
      const vRatio = canvas.height / targetImg.height;
      const ratio = Math.max(hRatio, vRatio);

      const scaledW = targetImg.width * ratio;
      const scaledH = targetImg.height * ratio;

      // Use focal points to place the subject accurately
      const shiftX = (canvas.width - scaledW) * focalX;
      const shiftY = (canvas.height - scaledH) * focalY;

      ctx.drawImage(
        targetImg,
        0,
        0,
        targetImg.width,
        targetImg.height,
        shiftX,
        shiftY,
        scaledW,
        scaledH
      );
    }

    function drawSlideshow(fromI: number, toI: number, progress: number) {
      if (!ctx || loadedImages.length === 0) return;

      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.fillStyle = "#0c0e14";
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      const fromImg = loadedImages[fromI];
      const toImg = loadedImages[toI];
      const fromConf = PHOTOS[fromI] || { focalX: 0.5, focalY: 0.5 };
      const toConf = PHOTOS[toI] || { focalX: 0.5, focalY: 0.5 };

      if (fromImg) {
        drawCoverImage(fromImg, 1.0, fromConf.focalX ?? 0.5, fromConf.focalY ?? 0.5);
      }

      if (toImg && progress > 0) {
        drawCoverImage(toImg, Math.min(1, Math.max(0, progress)), toConf.focalX ?? 0.5, toConf.focalY ?? 0.5);
      }

      // Keep photos vivid, punchy and 100% bright
      ctx.globalAlpha = 1.0;
      canvasTexture.needsUpdate = true;
    }

    // 7. Initial Pose (Slanted for both mobile and desktop)
    let targetRotX = 0.16;
    let targetRotY = -0.32;
    let currentRotX = targetRotX;
    let currentRotY = targetRotY;

    monolithGroup.rotation.x = currentRotX;
    monolithGroup.rotation.y = currentRotY;
    monolithGroup.rotation.z = 0.04;

    // 8. Mouse Tracking Physics (Desktop only)
    const handlePointerMove = (e: MouseEvent) => {
      if (prefersReducedMotion || isMobile) return;
      const rect = container.getBoundingClientRect();
      const x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
      const y = -(((e.clientY - rect.top) / rect.height) * 2 - 1);
      targetRotY = -0.32 + x * 0.40;
      targetRotX = 0.16 - y * 0.30;
    };

    window.addEventListener("mousemove", handlePointerMove, { passive: true });

    // Click/tap on monolith to advance photo manually
    const handleMonolithClick = () => {
      if (loadedImages.length <= 1) return;
      activeIdx = (activeIdx + 1) % loadedImages.length;
      nextIdx = (activeIdx + 1) % loadedImages.length;
      transitionProgress = 1;
      slideTimer = 0;
      setCurrentSlide(activeIdx);
      drawSlideshow(activeIdx, activeIdx, 1);
    };
    container.addEventListener("click", handleMonolithClick);

    // 9. Animation Loop
    let animationFrameId: number;
    let clock = new THREE.Clock();

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);
      const delta = clock.getDelta();
      const elapsedTime = clock.getElapsedTime();

      // Handle slideshow timing
      if (loadedImages.length > 1) {
        slideTimer += delta;

        if (transitionProgress < 1) {
          transitionProgress += delta / FADE_DURATION;
          drawSlideshow(activeIdx, nextIdx, transitionProgress);
          if (transitionProgress >= 1) {
            activeIdx = nextIdx;
            setCurrentSlide(activeIdx);
            drawSlideshow(activeIdx, activeIdx, 1);
          }
        } else if (slideTimer >= SLIDE_DURATION) {
          slideTimer = 0;
          nextIdx = (activeIdx + 1) % loadedImages.length;
          transitionProgress = 0;
        }
      }

      if (!prefersReducedMotion) {
        if (isMobile) {
          // Mobile: slanted pose as requested, dancing gently up and down
          monolithGroup.position.y = Math.sin(elapsedTime * 1.6) * 0.07;
          monolithGroup.rotation.x = 0.16;
          monolithGroup.rotation.y = -0.32;
          monolithGroup.rotation.z = 0.04;
        } else {
          // Desktop: subtle idle buoyancy + mouse tracking
          monolithGroup.position.y = Math.sin(elapsedTime * 1.2) * 0.05;
          monolithGroup.rotation.z = 0.03 + Math.cos(elapsedTime * 0.8) * 0.01;

          currentRotX += (targetRotX - currentRotX) * 0.06;
          currentRotY += (targetRotY - currentRotY) * 0.06;
          monolithGroup.rotation.x = currentRotX;
          monolithGroup.rotation.y = currentRotY;
        }
      }

      renderer.render(scene, camera);
    };

    animate();

    // 10. Resize
    const handleResize = () => {
      if (!container) return;
      const prevMobile = isMobile;
      isMobile = window.innerWidth < 768;
      targetRotX = 0.16;
      targetRotY = -0.32;
      if (prevMobile !== isMobile) {
        drawSlideshow(activeIdx, activeIdx, 1);
      }
      const w = container.clientWidth;
      const h = container.clientHeight;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("mousemove", handlePointerMove);
      window.removeEventListener("resize", handleResize);
      container.removeEventListener("click", handleMonolithClick);
      cancelAnimationFrame(animationFrameId);

      renderer.dispose();
      outerGeo.dispose();
      edgeGeo.dispose();
      innerRimGeo.dispose();
      photoGeo.dispose();
      outerMat.dispose();
      edgeMat.dispose();
      innerRimMat.dispose();
      photoMat.dispose();
      canvasTexture.dispose();

      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
    };
  }, []);

  return (
    <div className="relative w-full h-full flex flex-col items-center justify-center">
      <div
        ref={mountRef}
        className="w-full h-full min-h-[360px] sm:min-h-[480px] lg:min-h-[580px] cursor-pointer pointer-events-auto"
        aria-label="Interactive 3D Monolith Photo Frame"
      />

      {/* Floating Micro Slide Indicator */}
      <div className="absolute bottom-2 sm:bottom-4 left-1/2 -translate-x-1/2 flex items-center gap-2 px-3 py-1 rounded-full bg-[#0d0f11]/85 backdrop-blur-md border border-white/10 font-mono text-[10px] text-white/50 pointer-events-none select-none whitespace-nowrap">
        <span>PHOTO</span>
        <span className="text-accent font-semibold">0{currentSlide + 1}</span>
        <span>/</span>
        <span>0{PHOTOS.length}</span>
        <span className="text-white/20">•</span>
        <span className="text-[9px] text-white/40">TAP TO CYCLE</span>
      </div>
    </div>
  );
}
