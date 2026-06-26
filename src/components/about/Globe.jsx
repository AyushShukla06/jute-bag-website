/**
 * @file Globe.jsx
 * @path src/components/about/Globe.jsx
 * @description Highly customized Three.js WebGL interactive 3D Globe with 2D Canvas fallback.
 * Features:
 *  - Flat monochromatic styling
 *  - Sand-gold ocean base color (#E9CB7A)
 *  - Very light cream continent shapes (#F7F0DD)
 *  - Thin country boundary outlines (#E5C46E)
 *  - Soft cream container background (#F3E8D4)
 *  - Pulsing red pins localized in Asia & Middle East
 *  - Smooth pointer drag rotation & auto-rotation
 *  - Resilient to headless/testing environment WebGL constraints (auto fallbacks to 2D Canvas)
 */

/* ==========================================================================
   1. IMPORTS
   ========================================================================== */
import { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';

/* ==========================================================================
   2. CONFIGURATION CONSTANTS
   ========================================================================== */
// Styles & Palette Options
const COLORS = {
  ocean: '#E9CB7A',       // Sand-gold ocean color
  continent: '#F7F0DD',   // Very light cream continent fill
  boundary: '#E5C46E',    // Thin boundary stroke color
  bg: '#F3E8D4',          // Container soft cream background
  pin: '#a3243c',         // Crimson/red color for pins
  ring: '#a3243c'         // Pulsing ring color
};

// Auto rotation speeds (rad/frame for 3D, mapped to pixel increments in 2D)
const ROTATION_SPEED = 0.0018;

// Pin locations: [lat, lon, name] representing jute production hubs, weavers, and mills in India
const LOCATIONS = [
  { lat: 22.5726, lon: 88.3639, name: 'Kolkata, West Bengal' },
  { lat: 25.7771, lon: 87.4752, name: 'Purnia, Bihar' },
  { lat: 26.3481, lon: 92.6838, name: 'Nagaon, Assam' },
  { lat: 20.4625, lon: 85.8830, name: 'Cuttack, Odisha' },
  { lat: 18.1162, lon: 83.3979, name: 'Vizianagaram, Andhra Pradesh' },
  { lat: 28.6139, lon: 77.2090, name: 'Delhi NCR' },
  { lat: 19.0760, lon: 72.8777, name: 'Mumbai, Maharashtra' },
  { lat: 12.9716, lon: 77.5946, name: 'Bengaluru, Karnataka' },
  { lat: 13.0827, lon: 80.2707, name: 'Chennai, Tamil Nadu' },
  { lat: 17.3850, lon: 78.4867, name: 'Hyderabad, Telangana' },
  { lat: 26.1445, lon: 91.7362, name: 'Guwahati, Assam' },
  { lat: 26.3248, lon: 89.4510, name: 'Cooch Behar, West Bengal' },
  { lat: 25.6264, lon: 88.1235, name: 'Raiganj, West Bengal' },
  { lat: 16.7107, lon: 81.1028, name: 'Eluru, Andhra Pradesh' },
  { lat: 26.4499, lon: 80.3319, name: 'Kanpur, Uttar Pradesh' },
  { lat: 26.9124, lon: 75.7873, name: 'Jaipur, Rajasthan' },
  { lat: 23.0225, lon: 72.5714, name: 'Ahmedabad, Gujarat' },
  { lat: 25.5941, lon: 85.1376, name: 'Patna, Bihar' },
  { lat: 23.8315, lon: 91.2868, name: 'Agartala, Tripura' },
  { lat: 17.6868, lon: 83.2185, name: 'Visakhapatnam, Andhra Pradesh' }
];

/* ==========================================================================
   3. GEOMETRIC CONTINENT FALLBACKS (For offline / loading states)
   ========================================================================== */
const FALLBACK_CONTINENTS = [
  // Eurasia
  [[10, 80], [30, 75], [60, 75], [90, 75], [120, 75], [150, 70], [170, 60], [140, 50], [120, 30], [100, 10], [80, 5], [70, 15], [80, 20], [60, 30], [40, 15], [30, 35], [40, 45], [30, 60], [10, 70]],
  // Africa
  [[-15, 15], [15, 30], [30, 30], [50, 10], [40, -15], [30, -30], [20, -35], [10, -15], [-10, 5]],
  // North America
  [[-160, 70], [-100, 75], [-60, 60], [-80, 45], [-120, 45], [-120, 30], [-100, 25], [-85, 25], [-80, 28], [-85, 15], [-100, 15], [-110, 20]],
  // South America
  [[-80, 10], [-50, -5], [-40, -10], [-60, -45], [-70, -50], [-75, -40], [-70, -20]],
  // Australia
  [[115, -20], [145, -15], [150, -35], [115, -35]]
];

/* ==========================================================================
   4. DATA SHARING & CACHING FOR GEOJSON
   ========================================================================== */
let cachedGeoJson = null;
let geoJsonPromise = null;

const fetchGeoJson = () => {
  if (cachedGeoJson) return Promise.resolve(cachedGeoJson);
  if (geoJsonPromise) return geoJsonPromise;

  geoJsonPromise = fetch('https://raw.githubusercontent.com/datasets/geo-boundaries-world-110m/master/countries.geojson')
    .then(response => {
      if (!response.ok) throw new Error(`HTTP error ${response.status}`);
      return response.json();
    })
    .then(data => {
      cachedGeoJson = data;
      return data;
    })
    .catch(err => {
      console.warn("Could not fetch detailed boundaries. Using offline continents fallback.", err);
      return null;
    });

  return geoJsonPromise;
};

/* ==========================================================================
   5. SHAPES DRAWING HELPERS
   ========================================================================== */
const drawPolygonHelper = (context, polygon, w, h) => {
  polygon.forEach((ring, ringIndex) => {
    context.beginPath();
    ring.forEach((pt, ptIndex) => {
      const x = ((pt[0] + 180) / 360) * w;
      const y = ((90 - pt[1]) / 180) * h;
      if (ptIndex === 0) {
        context.moveTo(x, y);
      } else {
        context.lineTo(x, y);
      }
    });
    context.closePath();
    
    if (ringIndex === 0) {
      context.fill();
    } else {
      context.fillStyle = COLORS.ocean;
      context.fill();
      context.fillStyle = COLORS.continent;
    }
    context.stroke();
  });
};

const createMapCanvas = (geojson, width = 2048, height = 1024) => {
  const canvas = document.createElement('canvas');
  canvas.width = width;
  canvas.height = height;
  const ctx = canvas.getContext('2d');

  ctx.fillStyle = COLORS.ocean;
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  ctx.fillStyle = COLORS.continent;
  ctx.strokeStyle = COLORS.boundary;
  ctx.lineWidth = 1.2;

  if (geojson && geojson.features) {
    geojson.features.forEach(feature => {
      if (!feature || !feature.geometry) return;
      const { type, coordinates } = feature.geometry;
      if (type === 'Polygon') {
        drawPolygonHelper(ctx, coordinates, canvas.width, canvas.height);
      } else if (type === 'MultiPolygon') {
        coordinates.forEach(poly => {
          drawPolygonHelper(ctx, poly, canvas.width, canvas.height);
        });
      }
    });
  } else {
    FALLBACK_CONTINENTS.forEach(land => {
      ctx.beginPath();
      land.forEach((pt, idx) => {
        const x = ((pt[0] + 180) / 360) * canvas.width;
        const y = ((90 - pt[1]) / 180) * canvas.height;
        if (idx === 0) ctx.moveTo(x, y);
        else ctx.lineTo(x, y);
      });
      ctx.closePath();
      ctx.fill();
      ctx.stroke();
    });
  }
  return canvas;
};

/* ==========================================================================
   6. 2D CANVAS GLOBE FALLBACK COMPONENT
   ========================================================================== */
function CanvasGlobeFallback() {
  const containerRef = useRef(null);
  const canvasRef = useRef(null);

  useEffect(() => {
    const container = containerRef.current;
    const canvas = canvasRef.current;
    if (!container || !canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let mapCanvas = createMapCanvas(cachedGeoJson);
    
    fetchGeoJson().then(geojson => {
      if (geojson) {
        mapCanvas = createMapCanvas(geojson);
      }
    });

    let animationFrameId = null;
    let resizeObserver = null;
    const rotationRef = { val: -1 };
    const isDraggingRef = { val: false };
    const startXRef = { val: 0 };
    const startRotationRef = { val: 0 };

    const startTime = Date.now();

    const render = () => {
      const rect = container.getBoundingClientRect();
      const S = Math.max(250, Math.min(640, rect.width));
      
      if (canvas.width !== S || canvas.height !== S) {
        canvas.width = S;
        canvas.height = S;
      }

      ctx.clearRect(0, 0, S, S);

      const R = (S - 12) / 2;
      const H_draw = 2 * R;
      const W_draw = 4 * R;

      if (rotationRef.val === -1) {
        rotationRef.val = 1.9 * R; // Center on India initially
      }

      if (!isDraggingRef.val) {
        rotationRef.val += (ROTATION_SPEED * W_draw) / (2 * Math.PI);
      }

      rotationRef.val = (rotationRef.val + W_draw) % W_draw;

      ctx.save();
      ctx.beginPath();
      ctx.arc(S / 2, S / 2, R, 0, Math.PI * 2);
      ctx.fillStyle = COLORS.ocean;
      ctx.fill();

      ctx.clip();

      const x_draw = (S / 2 - R) - rotationRef.val;
      ctx.drawImage(mapCanvas, x_draw, S / 2 - R, W_draw, H_draw);
      ctx.drawImage(mapCanvas, x_draw + W_draw, S / 2 - R, W_draw, H_draw);

      const elapsed = (Date.now() - startTime) / 1000;
      const pulsePeriod = 2.5;
      const progress = (elapsed % pulsePeriod) / pulsePeriod;
      const pulseScale = 1.0 + progress * 0.8;
      const opacity = Math.max(0, 0.5 * (1.0 - progress));

      LOCATIONS.forEach(loc => {
        const lonFraction = (loc.lon + 180) / 360;
        const latFraction = (90 - loc.lat) / 180;

        const x_map = lonFraction * W_draw;
        const y_map = latFraction * H_draw;

        let screenX = (S / 2 - R) + x_map - rotationRef.val;
        screenX = ((screenX - (S / 2 - R)) % W_draw);
        if (screenX < 0) screenX += W_draw;
        screenX += S / 2 - R;

        const screenY = S / 2 - R + y_map;

        const dx = screenX - S / 2;
        const dy = screenY - S / 2;
        if (dx * dx + dy * dy <= R * R) {
          ctx.save();
          ctx.beginPath();
          ctx.arc(screenX, screenY, 12 * pulseScale, 0, Math.PI * 2);
          ctx.strokeStyle = COLORS.ring;
          ctx.globalAlpha = opacity;
          ctx.lineWidth = 1.5;
          ctx.stroke();
          ctx.restore();

          ctx.beginPath();
          ctx.arc(screenX, screenY, 4, 0, Math.PI * 2);
          ctx.fillStyle = COLORS.pin;
          ctx.fill();
        }
      });

      ctx.restore();

      animationFrameId = requestAnimationFrame(render);
    };

    const onPointerDown = (e) => {
      isDraggingRef.val = true;
      startXRef.val = e.clientX;
      startRotationRef.val = rotationRef.val;
      canvas.style.cursor = 'grabbing';
    };

    const onPointerMove = (e) => {
      if (!isDraggingRef.val) return;
      const deltaX = e.clientX - startXRef.val;
      const rect = container.getBoundingClientRect();
      const S = Math.max(250, Math.min(640, rect.width));
      const R = (S - 12) / 2;
      const W_draw = 4 * R;

      rotationRef.val = (startRotationRef.val - deltaX * 1.2 + W_draw) % W_draw;
    };

    const onPointerUp = () => {
      isDraggingRef.val = false;
      canvas.style.cursor = 'grab';
    };

    canvas.addEventListener('pointerdown', onPointerDown);
    window.addEventListener('pointermove', onPointerMove);
    window.addEventListener('pointerup', onPointerUp);
    canvas.style.cursor = 'grab';

    render();

    resizeObserver = new ResizeObserver(() => {});
    resizeObserver.observe(container);

    return () => {
      if (animationFrameId) cancelAnimationFrame(animationFrameId);
      if (resizeObserver) resizeObserver.disconnect();
      canvas.removeEventListener('pointerdown', onPointerDown);
      window.removeEventListener('pointermove', onPointerMove);
      window.removeEventListener('pointerup', onPointerUp);
    };
  }, []);

  return (
    <div 
      ref={containerRef}
      className="relative w-full max-w-[640px] aspect-square flex items-center justify-center mx-auto overflow-visible select-none transition-colors duration-300"
    >
      <div 
        style={{ backgroundColor: COLORS.bg }}
        className="absolute inset-1.5 rounded-full border border-earth-olive/10 shadow-inner -z-10 animate-pulse-subtle"
      />
      <canvas 
        ref={canvasRef}
        className="w-full h-full block animate-fade-in"
      />
    </div>
  );
}

/* ==========================================================================
   7. MAIN THREE.JS 3D GLOBE COMPONENT
   ========================================================================== */
export default function Globe() {
  const containerRef = useRef(null);
  const [webGlError, setWebGlError] = useState(false);

  useEffect(() => {
    if (webGlError) return;

    const container = containerRef.current;
    if (!container) return;

    let globeTexture = null;
    let renderer = null;
    let globeGeometry = null;
    let globeMaterial = null;
    let globeGroup = null;
    let animationFrameId = null;
    let resizeObserver = null;
    let pulsingRings = [];
    let pins = [];

    // Create the map texture canvas (initial fallback)
    const mapCanvas = createMapCanvas(cachedGeoJson);

    // Fetch live GeoJSON if needed and draw it
    fetchGeoJson().then(geojson => {
      if (geojson) {
        const tempCanvas = createMapCanvas(geojson);
        const ctx = mapCanvas.getContext('2d');
        ctx.drawImage(tempCanvas, 0, 0);
        if (globeTexture) globeTexture.needsUpdate = true;
      }
    });

    let isDragging = false;
    const previousPointerPosition = { x: 0, y: 0 };
    const dampingFactor = 0.0035;

    const onPointerDown = (e) => {
      isDragging = true;
      previousPointerPosition.x = e.clientX;
      previousPointerPosition.y = e.clientY;
    };

    const onPointerMove = (e) => {
      if (!isDragging || !globeGroup) return;
      const deltaX = e.clientX - previousPointerPosition.x;
      const deltaY = e.clientY - previousPointerPosition.y;

      globeGroup.rotation.y += deltaX * dampingFactor;
      globeGroup.rotation.x += deltaY * dampingFactor;

      previousPointerPosition.x = e.clientX;
      previousPointerPosition.y = e.clientY;
    };

    const onPointerUp = () => {
      isDragging = false;
    };

    try {
      /* --- THREE.JS SCENE SETUP --- */
      const scene = new THREE.Scene();
      const camera = new THREE.PerspectiveCamera(45, 1, 0.1, 100);
      camera.position.z = 5.1;

      // WebGL Renderer creation
      renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
      
      const rect = container.getBoundingClientRect();
      const size = Math.max(250, Math.min(640, rect.width));
      renderer.setSize(size, size);
      container.appendChild(renderer.domElement);

      // Create texture
      globeTexture = new THREE.CanvasTexture(mapCanvas);
      globeTexture.colorSpace = THREE.SRGBColorSpace;
      
      const maxAnisotropy = renderer.capabilities ? renderer.capabilities.getMaxAnisotropy() : 1;
      globeTexture.anisotropy = maxAnisotropy || 1;

      // Globe Mesh
      globeGroup = new THREE.Group();
      globeGroup.rotation.y = -3.0; // Pre-align camera to face India on load
      scene.add(globeGroup);

      globeGeometry = new THREE.SphereGeometry(2, 64, 64);
      globeMaterial = new THREE.MeshBasicMaterial({
        map: globeTexture,
      });
      const globeMesh = new THREE.Mesh(globeGeometry, globeMaterial);
      globeGroup.add(globeMesh);

      /* --- PIN POSITIONING --- */
      const get3DPositionFromUV = (geometry, targetU, targetV, radius) => {
        const uvAttr = geometry.attributes.uv;
        const posAttr = geometry.attributes.position;
        
        let minDistance = Infinity;
        let closestIndex = 0;
        
        for (let i = 0; i < uvAttr.count; i++) {
          const su = uvAttr.getX(i);
          const sv = uvAttr.getY(i);
          
          let du = Math.abs(su - targetU);
          if (du > 0.5) du = 1.0 - du;
          
          const dv = Math.abs(sv - targetV);
          const dist = du * du + dv * dv;
          
          if (dist < minDistance) {
            minDistance = dist;
            closestIndex = i;
          }
        }
        
        const x = posAttr.getX(closestIndex);
        const y = posAttr.getY(closestIndex);
        const z = posAttr.getZ(closestIndex);
        
        return new THREE.Vector3(x, y, z).normalize().multiplyScalar(radius);
      };

      LOCATIONS.forEach(loc => {
        const u = (loc.lon + 180) / 360;
        const v = (loc.lat + 90) / 180;
        const pinPos = get3DPositionFromUV(globeGeometry, u, v, 2.0);
        const pinGroup = new THREE.Group();
        pinGroup.position.copy(pinPos);
        pinGroup.lookAt(pinPos.clone().multiplyScalar(2));
        globeGroup.add(pinGroup);

        const dotGeo = new THREE.SphereGeometry(0.04, 16, 16);
        const dotMat = new THREE.MeshBasicMaterial({ color: COLORS.pin });
        const dotMesh = new THREE.Mesh(dotGeo, dotMat);
        dotMesh.position.z = 0.02;
        pinGroup.add(dotMesh);

        const ringGeo = new THREE.RingGeometry(0.01, 0.12, 32);
        const ringMat = new THREE.MeshBasicMaterial({
          color: COLORS.ring,
          transparent: true,
          opacity: 0.8,
          side: THREE.DoubleSide
        });
        const ringMesh = new THREE.Mesh(ringGeo, ringMat);
        ringMesh.position.z = 0.005;
        pinGroup.add(ringMesh);

        pulsingRings.push(ringMesh);
        pins.push(pinGroup);
      });

      // Bind events
      const domElement = renderer.domElement;
      domElement.addEventListener('pointerdown', onPointerDown);
      window.addEventListener('pointermove', onPointerMove);
      window.addEventListener('pointerup', onPointerUp);

      domElement.style.cursor = 'grab';
      domElement.addEventListener('pointerdown', () => { domElement.style.cursor = 'grabbing'; });
      domElement.addEventListener('pointerup', () => { domElement.style.cursor = 'grab'; });

      const clock = new THREE.Clock();

      const animate = () => {
        animationFrameId = requestAnimationFrame(animate);

        if (!isDragging) {
          globeGroup.rotation.y += ROTATION_SPEED;
        }

        const elapsed = clock.getElapsedTime();
        const pulsePeriod = 2.5;
        const progress = (elapsed % pulsePeriod) / pulsePeriod;
        const scaleVal = 1.0 + progress * 0.8;
        const opacityVal = Math.max(0, 0.5 * (1.0 - progress));

        pulsingRings.forEach(ring => {
          if (ring.scale) ring.scale.set(scaleVal, scaleVal, 1);
          if (ring.material) ring.material.opacity = opacityVal;
        });

        renderer.render(scene, camera);
      };

      animate();

      resizeObserver = new ResizeObserver((entries) => {
        for (let entry of entries) {
          const { width } = entry.contentRect;
          const boundedSize = Math.max(250, Math.min(640, width));
          renderer.setSize(boundedSize, boundedSize);
          camera.aspect = 1;
          camera.updateProjectionMatrix();
        }
      });
      resizeObserver.observe(container);

    } catch (err) {
      console.warn("WebGL Initialization failed, falling back to 2D canvas:", err);
      setWebGlError(true);
    }

    /* --- CLEANUP SEQUENCE --- */
    return () => {
      if (animationFrameId) cancelAnimationFrame(animationFrameId);
      if (resizeObserver) resizeObserver.disconnect();

      if (renderer && renderer.domElement) {
        const el = renderer.domElement;
        el.removeEventListener('pointerdown', onPointerDown);
        window.removeEventListener('pointermove', onPointerMove);
        window.removeEventListener('pointerup', onPointerUp);
        if (container.contains(el)) {
          container.removeChild(el);
        }
      }

      if (globeGeometry) globeGeometry.dispose();
      if (globeMaterial) globeMaterial.dispose();
      if (globeTexture) globeTexture.dispose();
      
      pulsingRings.forEach(ring => {
        if (ring.geometry) ring.geometry.dispose();
        if (ring.material) ring.material.dispose();
      });
      pins.forEach(pin => {
        pin.children.forEach(child => {
          if (child.geometry) child.geometry.dispose();
          if (child.material) child.material.dispose();
        });
      });

      if (renderer) renderer.dispose();
    };
  }, [webGlError]);

  /* ==========================================================================
     8. RENDER LOGIC
     ========================================================================== */
  if (webGlError) {
    return <CanvasGlobeFallback />;
  }

  return (
    <div className="relative w-full max-w-[640px] aspect-square flex items-center justify-center mx-auto overflow-visible select-none transition-colors duration-300">
      
      {/* Container background and shadow rings */}
      <div 
        style={{ backgroundColor: COLORS.bg }}
        className="absolute inset-1.5 rounded-full border border-earth-olive/10 shadow-inner -z-10 animate-pulse-subtle"
      />
      
      {/* Three.js canvas mount target container */}
      <div 
        ref={containerRef} 
        className="w-full h-full flex items-center justify-center"
      />

    </div>
  );
}
