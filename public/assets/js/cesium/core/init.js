/**
 * Cesium Lazy Loader v3 — Enhanced Visuals + Theme Support
 * Loads Cesium from CDN only when needed
 */

let cesiumViewer = null;
let isLoading = false;
let loadPromise = null;

export async function loadCesium3D() {
  if (cesiumViewer) return cesiumViewer;
  if (isLoading && loadPromise) return loadPromise;

  isLoading = true;
  loadPromise = loadCesiumInternal();

  try {
    cesiumViewer = await loadPromise;
    return cesiumViewer;
  } finally {
    isLoading = false;
    loadPromise = null;
  }
}

async function loadCesiumInternal() {
  showLoadingState();

  try {
    // Load Cesium CSS
    await loadStyle('https://cesium.com/downloads/cesiumjs/releases/1.140/Build/Cesium/Widgets/widgets.css');

    // Load Cesium JS
    await loadScript('https://cesium.com/downloads/cesiumjs/releases/1.140/Build/Cesium/Cesium.js');

    // Fetch config
    const config = await fetch('/api/config')
      .then(r => { if (!r.ok) throw new Error('Failed to load Cesium config'); return r.json(); })
      .catch(() => ({ cesiumToken: '' })); // Fallback for local dev

    window.Cesium.Ion.defaultAccessToken = config.cesiumToken || '';

    const viewer = await initViewer();
    applyWorldIntelligenceTheme(viewer);
    setupMarkerClustering(viewer);
    hideLoadingState();
    return viewer;

  } catch (error) {
    hideLoadingState();
    console.error('[Cesium] Failed to load:', error);
    throw error;
  }
}

function loadScript(src) {
  return new Promise((resolve, reject) => {
    if (document.querySelector(`script[src="${src}"]`)) { resolve(); return; }
    const script = document.createElement('script');
    script.src = src;
    script.async = true;
    script.onload = resolve;
    script.onerror = () => reject(new Error(`Failed to load ${src}`));
    document.head.appendChild(script);
  });
}

function loadStyle(href) {
  return new Promise((resolve, reject) => {
    if (document.querySelector(`link[href="${href}"]`)) { resolve(); return; }
    const link = document.createElement('link');
    link.rel = 'stylesheet';
    link.href = href;
    link.onload = resolve;
    link.onerror = () => reject(new Error(`Failed to load ${href}`));
    document.head.appendChild(link);
  });
}

async function initViewer() {
  const C = window.Cesium;

  // Base imagery: Google Hybrid (avoids Ion getDerivedResource errors)
  const googleHybridProvider = new C.UrlTemplateImageryProvider({
    url: 'https://mt0.google.com/vt/lyrs=y&x={x}&y={y}&z={z}',
    maximumLevel: 22,
    credit: new C.Credit('Google Maps')
  });

  const viewer = new C.Viewer('cesiumContainer', {
    baseLayer: new C.ImageryLayer(googleHybridProvider),
    terrainProvider: new C.EllipsoidTerrainProvider(),
    geocoder: false,
    homeButton: false,
    sceneModePicker: false,
    navigationHelpButton: false,
    animation: false,
    timeline: false,
    fullscreenButton: false,
    vrButton: false,

    // Atmospheric effects
    skyAtmosphere: new C.SkyAtmosphere(),
    skyBox: new C.SkyBox({
      sources: { positiveX: '', negativeX: '', positiveY: '', negativeY: '', positiveZ: '', negativeZ: '' }
    }), // Will fallback to default Cesium starfield

    // Performance
    requestRenderMode: true,
    maximumRenderTimeChange: 0.5,
    targetFrameRate: 60,

    contextOptions: {
      webgl: {
        alpha: false,
        antialias: true,
        preserveDrawingBuffer: false
      }
    }
  });

  return viewer;
}

function applyWorldIntelligenceTheme(viewer) {
  const C = window.Cesium;
  const isLight = document.body && document.body.classList.contains('wi-theme-light');

  // Background
  viewer.scene.backgroundColor = C.Color.fromCssColorString(isLight ? '#f5f7fa' : '#04050a');
  viewer.scene.globe.baseColor = C.Color.fromCssColorString(isLight ? '#e8ecf2' : '#080b14');

  // Atmosphere
  if (viewer.scene.skyAtmosphere) {
    viewer.scene.skyAtmosphere.brightnessShift = isLight ? 0.1 : -0.5;
  }

  // Lighting
  viewer.scene.globe.enableLighting = false;
  viewer.scene.globe.atmosphereLightIntensity = 0;

  // Fog
  viewer.scene.fog.enabled = !isLight;
  viewer.scene.fog.density = 0.0005;
  viewer.scene.fog.minimumBrightness = isLight ? 0.8 : 0.1;

  // Globe atmosphere ring (halo)
  viewer.scene.globe.atmosphereLightIntensity = isLight ? 10 : 5;
  viewer.scene.globe.atmosphereLightColor = C.Color.fromCssColorString(isLight ? '#85b3d9' : '#3b82f6');
  viewer.scene.globe.atmosphereMieAnisotropy = 0.9;

  // Imagery adjustments
  const layers = viewer.scene.globe.imageryLayers;
  if (layers.length > 0) {
    layers.get(0).brightness = isLight ? 0.95 : 0.8;
    layers.get(0).contrast = isLight ? 1.0 : 1.1;
    layers.get(0).saturation = isLight ? 1.3 : 0.95;
  }

  // Stars
  if (viewer.scene.skyBox) {
    viewer.scene.skyBox.show = !isLight;
  }
}

function setupMarkerClustering(viewer) {
  viewer.markerClusteringEnabled = true;
}

function showLoadingState() {
  const container = document.getElementById('cesiumContainer');
  if (container) {
    container.innerHTML = `
      <div id="cesium-loading" style="position:absolute;inset:0;display:flex;align-items:center;justify-content:center;background:var(--ink);z-index:10;">
        <div style="text-align:center">
          <div class="cesium-loading-spinner" style="width:48px;height:48px;border:3px solid rgba(255,255,255,0.15);border-top-color:#ffffff;border-radius:50%;animation:spin 1s linear infinite;margin:0 auto 16px"></div>
          <div style="color:var(--mt);font-size:14px;font-family:Inter,sans-serif">Loading 3D Globe...</div>
        </div>
      </div>
    `;
  }
}
function hideLoadingState() {
  const el = document.querySelector('#cesium-loading');
  if (el) { el.style.opacity = '0'; setTimeout(() => el.remove(), 500); }
}

export function getCesiumViewer() { return cesiumViewer; }

export function destroyCesium() {
  if (cesiumViewer) { cesiumViewer.destroy(); cesiumViewer = null; }
}
