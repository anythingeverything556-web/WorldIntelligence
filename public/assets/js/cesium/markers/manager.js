/** ═════════════════════════════════════════════════════════════════
 * Cesium Marker Manager - Optimized for 300k+ markers
 * Uses BillboardCollection, spatial indexing, and viewport culling
 * ═════════════════════════════════════════════════════════════════
 */

import { getLoadingModal } from '../ui/loading-modal.js';

export class MarkerManager {
  constructor(viewer) {
    this.viewer = viewer;
    this.Cesium = window.Cesium;
    
    // All markers data (stored, not rendered)
    this.allMarkers = [];
    this.spatialIndex = null; // Will be RBush or custom grid
    
    // Currently visible markers
    this.visibleMarkers = new Map();
    this.billboardCollection = null;
    this.labelCollection = null;
    
    // Texture atlas for all icons
    this.iconAtlas = null;
    this.iconCoordinates = new Map();
    
    // Performance settings
    this.settings = {
      maxVisibleMarkers: 5000,        // Max markers to render at once
      clusterThreshold: 100,            // Min pixels between markers before clustering
      lodLevels: {
        0: { density: 0.001, showLabels: false },    // Zoom 0: 0.1% of markers
        5: { density: 0.01, showLabels: false },    // Zoom 5: 1% of markers
        10: { density: 0.1, showLabels: false },    // Zoom 10: 10% of markers
        15: { density: 1.0, showLabels: true }       // Zoom 15+: 100% markers, show labels
      },
      batchSize: 1000,                // Markers per batch
      frameDelay: 16                  // ms between batches (60fps)
    };
    
    // Camera tracking
    this.lastCameraPosition = null;
    this.updateThrottle = null;
    this.isLoading = false;
    this.isUpdating = false; // Prevent concurrent updates
    
    // Color mapping
    this.colors = {
      'military': '#ffffff',
      'conflict': '#ff4d6d',
      'nuclear': '#4ade80',
      'us-base': '#60a5fa',
      'cable': '#38bdf8',
      'pipeline': '#a3e635',
      'default': '#94a3b8'
    };
    
    // Initialize
    this.init();
  }
  
  init() {
    // Create billboard collection (efficient for many markers)
    this.billboardCollection = new this.Cesium.BillboardCollection({
      scene: this.viewer.scene
    });
    this.viewer.scene.primitives.add(this.billboardCollection);
    
    // Create label collection
    this.labelCollection = new this.Cesium.LabelCollection({
      scene: this.viewer.scene
    });
    this.viewer.scene.primitives.add(this.labelCollection);
    
    // Setup camera change listener
    this.setupCameraTracking();
    
    // Create texture atlas
    this.createIconAtlas();
  }
  
  // Create a single texture atlas for all marker types
  createIconAtlas() {
    const size = 128; // Atlas size 128x128 per icon
    const types = Object.keys(this.colors);
    const canvas = document.createElement('canvas');
    canvas.width = size * types.length;
    canvas.height = size;
    const ctx = canvas.getContext('2d');
    
    types.forEach((type, index) => {
      const color = this.colors[type];
      const x = index * size;
      
      // Draw marker icon — glow ring + white border ring + colored fill + highlight
      // Outer glow
      ctx.beginPath();
      ctx.arc(x + size/2, size/2, size * 0.42, 0, 2 * Math.PI);
      ctx.fillStyle = color;
      ctx.globalAlpha = 0.18;
      ctx.fill();
      ctx.globalAlpha = 1.0;
      // White border ring
      ctx.beginPath();
      ctx.arc(x + size/2, size/2, size * 0.36, 0, 2 * Math.PI);
      ctx.fillStyle = '#ffffff';
      ctx.fill();
      // Colored fill
      ctx.beginPath();
      ctx.arc(x + size/2, size/2, size * 0.27, 0, 2 * Math.PI);
      ctx.fillStyle = color;
      ctx.fill();
      // Specular highlight
      ctx.beginPath();
      ctx.arc(x + size/2 - size*0.08, size/2 - size*0.08, size * 0.065, 0, 2 * Math.PI);
      ctx.fillStyle = 'rgba(255,255,255,0.55)';
      ctx.fill();
      
      // Store UV coordinates
      this.iconCoordinates.set(type, {
        x: x / canvas.width,
        y: 0,
        width: size / canvas.width,
        height: 1
      });
    });
    
    this.iconAtlas = canvas.toDataURL();
  }
  
  // Calculate initial LOD level based on camera height
  calculateInitialLOD() {
    const height = this.viewer.camera.positionCartographic.height;
    
    // Map height to zoom level (approximate)
    let zoom = 0;
    if (height < 1000) zoom = 20;
    else if (height < 5000) zoom = 15;
    else if (height < 20000) zoom = 10;
    else if (height < 100000) zoom = 5;
    else zoom = 0;
    
    // Find appropriate LOD
    const levels = Object.keys(this.settings.lodLevels).map(Number).sort((a, b) => b - a);
    for (const level of levels) {
      if (zoom >= level) {
        return this.settings.lodLevels[level];
      }
    }
    
    return this.settings.lodLevels[0];
  }
  
  // Build spatial index for fast queries (async with frame budget management)
  async buildSpatialIndex(markers, progressCallback = null, lodLevel = null) {
    // Simple grid-based spatial index
    const gridSize = 1.0; // 1 degree cells
    const CHUNK_SIZE = 1000; // Process 1000 markers per chunk (reduced from 5000 for better frame budget control)
    const FRAME_BUDGET_MS = 12; // 12ms budget per frame (leaving 4ms buffer for 60fps)
    
    this.spatialIndex = new Map();
    
    // Apply LOD sampling only for large datasets (>50k markers)
    let markersToIndex = markers;
    const originalMarkerCount = markers.length;
    
    if (lodLevel && lodLevel.density < 1.0 && markers.length > 50000) {
      const sampleRate = Math.max(1, Math.floor(1 / lodLevel.density));
      markersToIndex = markers.filter((_, index) => index % sampleRate === 0);
      console.log(`[MarkerManager] LOD sampling: ${markersToIndex.length}/${markers.length} markers (density: ${lodLevel.density})`);
    }
    
    const totalMarkers = markersToIndex.length;
    let processedCount = 0;
    
    // For small datasets (<50k original markers), use synchronous processing to avoid overhead
    // Use async processing if original dataset is large, even if sampled down
    if (originalMarkerCount < 50000) {
      markersToIndex.forEach(marker => {
        const cellX = Math.floor(marker.lon / gridSize);
        const cellY = Math.floor(marker.lat / gridSize);
        const key = `${cellX},${cellY}`;
        
        if (!this.spatialIndex.has(key)) {
          this.spatialIndex.set(key, []);
        }
        this.spatialIndex.get(key).push(marker);
      });
      
      console.log(`[MarkerManager] Spatial index built: ${this.spatialIndex.size} cells`);
      if (progressCallback) progressCallback(50, 'Spatial index complete');
      return;
    }
    
    // Async processing for large datasets
    return new Promise((resolve) => {
      const processChunk = (startIndex) => {
        const frameStartTime = performance.now();
        const endIndex = Math.min(startIndex + CHUNK_SIZE, totalMarkers);
        
        for (let i = startIndex; i < endIndex; i++) {
          const marker = markersToIndex[i];
          const cellX = Math.floor(marker.lon / gridSize);
          const cellY = Math.floor(marker.lat / gridSize);
          const key = `${cellX},${cellY}`;
          
          if (!this.spatialIndex.has(key)) {
            this.spatialIndex.set(key, []);
          }
          this.spatialIndex.get(key).push(marker);
          processedCount++;
          
          // Check frame budget every 50 markers (more frequent checking)
          if ((i - startIndex) % 50 === 0 && i > startIndex) {
            const elapsed = performance.now() - frameStartTime;
            if (elapsed > FRAME_BUDGET_MS) {
              // Yield to next frame
              const progress = (processedCount / totalMarkers) * 50; // 0-50% range
              if (progressCallback) {
                progressCallback(progress, `Building spatial index: ${processedCount}/${totalMarkers}`);
              }
              
              requestAnimationFrame(() => processChunk(i + 1));
              return;
            }
          }
        }
        
        // Chunk complete
        if (endIndex < totalMarkers) {
          const progress = (processedCount / totalMarkers) * 50; // 0-50% range
          if (progressCallback) {
            progressCallback(progress, `Building spatial index: ${processedCount}/${totalMarkers}`);
          }
          requestAnimationFrame(() => processChunk(endIndex));
        } else {
          // All markers processed
          console.log(`[MarkerManager] Spatial index built: ${this.spatialIndex.size} cells`);
          if (progressCallback) progressCallback(50, 'Spatial index complete');
          resolve();
        }
      };
      
      // Start processing
      requestAnimationFrame(() => processChunk(0));
    });
  }
  
  // Get initial viewport bounds from camera
  getInitialViewport() {
    const rect = this.viewer.camera.computeViewRectangle();
    if (!rect) return null;
    
    return {
      west: this.Cesium.Math.toDegrees(rect.west),
      south: this.Cesium.Math.toDegrees(rect.south),
      east: this.Cesium.Math.toDegrees(rect.east),
      north: this.Cesium.Math.toDegrees(rect.north)
    };
  }
  
  // Filter markers to only those within viewport bounds
  filterMarkersInViewport(markers, viewport) {
    if (!viewport) return markers;
    
    return markers.filter(marker => {
      return marker.lon >= viewport.west &&
             marker.lon <= viewport.east &&
             marker.lat >= viewport.south &&
             marker.lat <= viewport.north;
    });
  }
  
  // Load all markers (called once on init)
  async loadMarkers(markers, options = {}) {
    if (this.isLoading) return;
    this.isLoading = true;
    
    const { initialViewportOnly = false, progressCallback = null } = options;
    
    console.log(`[MarkerManager] Loading ${markers.length} markers...`);
    
    // Get loading modal instance
    const loadingModal = getLoadingModal();
    
    try {
      // Show loading modal with initial status
      loadingModal.show('Loading Markers', 'Building spatial index...');
      
      // Store all markers
      this.allMarkers = markers;
      
      // Calculate initial LOD level based on camera height
      const lodLevel = this.calculateInitialLOD();
      console.log(`[MarkerManager] Initial LOD: density=${lodLevel.density}, showLabels=${lodLevel.showLabels}`);
      
      let markersToIndex = markers;
      let outOfViewportMarkers = [];
      
      // Apply initial viewport culling if requested
      if (initialViewportOnly) {
        const viewport = this.getInitialViewport();
        if (viewport) {
          const inViewportMarkers = this.filterMarkersInViewport(markers, viewport);
          outOfViewportMarkers = markers.filter(m => !inViewportMarkers.includes(m));
          markersToIndex = inViewportMarkers;
          
          console.log(`[MarkerManager] Initial viewport culling: ${inViewportMarkers.length} visible, ${outOfViewportMarkers.length} queued for background loading`);
        }
      }
      
      // Create progress callback wrapper that updates modal
      const modalProgressCallback = (percent, status) => {
        loadingModal.updateProgress(percent, status);
        
        // Also call user-provided callback if present
        if (progressCallback) {
          progressCallback(percent, status);
        }
      };
      
      // Build spatial index with LOD sampling (async for large datasets)
      await this.buildSpatialIndex(markersToIndex, modalProgressCallback, lodLevel);
      
      // Initial render (await to prevent modal from closing too early)
      await this.updateVisibleMarkers();
      
      // Queue out-of-viewport markers for background loading
      if (outOfViewportMarkers.length > 0) {
        this.queueBackgroundLoading(outOfViewportMarkers);
      }
      
      this.isLoading = false;
      console.log('[MarkerManager] Markers loaded successfully');
      
      // Complete and hide modal
      loadingModal.complete('Markers loaded!');
      
    } catch (error) {
      this.isLoading = false;
      console.error('[MarkerManager] Error loading markers:', error);
      
      // Show error in modal
      loadingModal.error(error.message || 'Failed to load markers');
      
      // Re-throw to allow caller to handle
      throw error;
    }
  }
  
  // Queue out-of-viewport markers for background loading
  queueBackgroundLoading(markers) {
    console.log(`[MarkerManager] Queuing ${markers.length} markers for background loading`);
    
    // Use requestIdleCallback if available, otherwise setTimeout
    const scheduleWork = window.requestIdleCallback || ((cb) => setTimeout(cb, 100));
    
    scheduleWork(async () => {
      console.log('[MarkerManager] Starting background marker loading...');
      
      // Add markers to allMarkers if not already present
      const existingIds = new Set(this.allMarkers.map(m => m.id || `${m.lat}-${m.lon}`));
      const newMarkers = markers.filter(m => {
        const id = m.id || `${m.lat}-${m.lon}`;
        return !existingIds.has(id);
      });
      
      if (newMarkers.length > 0) {
        // Rebuild spatial index with all markers
        const allMarkers = [...this.allMarkers, ...newMarkers];
        await this.buildSpatialIndex(allMarkers, null);
        this.allMarkers = allMarkers;
        
        console.log(`[MarkerManager] Background loading complete: ${newMarkers.length} markers added`);
      }
    });
  }
  
  // Setup camera tracking for viewport culling
  setupCameraTracking() {
    const handler = new this.Cesium.ScreenSpaceEventHandler(this.viewer.scene.canvas);
    
    // Throttle camera change updates - increased to 500ms to reduce lag
    this.viewer.camera.changed.addEventListener(() => {
      if (this.updateThrottle) return;
      
      this.updateThrottle = setTimeout(() => {
        this.updateVisibleMarkers();
        this.updateThrottle = null;
      }, 500); // Update at most 2 times per second (reduced from 100ms)
    });
  }
  
  // Get current LOD level based on camera height
  getCurrentLOD() {
    const height = this.viewer.camera.positionCartographic.height;
    
    // Map height to zoom level (approximate)
    let zoom = 0;
    if (height < 1000) zoom = 20;
    else if (height < 5000) zoom = 15;
    else if (height < 20000) zoom = 10;
    else if (height < 100000) zoom = 5;
    else zoom = 0;
    
    // Find appropriate LOD
    const levels = Object.keys(this.settings.lodLevels).map(Number).sort((a, b) => b - a);
    for (const level of levels) {
      if (zoom >= level) {
        return this.settings.lodLevels[level];
      }
    }
    
    return this.settings.lodLevels[0];
  }
  
  // Get visible region from camera
  getVisibleRegion() {
    const rect = this.viewer.camera.computeViewRectangle();
    if (!rect) return null;
    
    return {
      west: this.Cesium.Math.toDegrees(rect.west),
      south: this.Cesium.Math.toDegrees(rect.south),
      east: this.Cesium.Math.toDegrees(rect.east),
      north: this.Cesium.Math.toDegrees(rect.north)
    };
  }
  
  // Query markers in viewport using spatial index
  queryMarkersInViewport(viewport, lod) {
    const gridSize = 1.0;
    const markers = [];
    const targetCount = Math.floor(this.allMarkers.length * lod.density);
    
    // Sample rate based on density
    const sampleRate = Math.max(1, Math.floor(this.allMarkers.length / targetCount));
    
    // Get cells in viewport
    const startX = Math.floor(viewport.west / gridSize);
    const endX = Math.ceil(viewport.east / gridSize);
    const startY = Math.floor(viewport.south / gridSize);
    const endY = Math.ceil(viewport.north / gridSize);
    
    let count = 0;
    
    for (let x = startX; x <= endX; x++) {
      for (let y = startY; y <= endY; y++) {
        const key = `${x},${y}`;
        const cellMarkers = this.spatialIndex.get(key);
        
        if (cellMarkers) {
          // Sample markers based on LOD
          for (let i = 0; i < cellMarkers.length; i += sampleRate) {
            markers.push(cellMarkers[i]);
            count++;
            
            // Hard limit
            if (count >= this.settings.maxVisibleMarkers) {
              return markers;
            }
          }
        }
      }
    }
    
    return markers;
  }
  
  // Update visible markers based on camera
  async updateVisibleMarkers() {
    // Prevent concurrent updates
    if (this.isUpdating) return;
    this.isUpdating = true;
    
    try {
      const viewport = this.getVisibleRegion();
      if (!viewport) {
        this.isUpdating = false;
        return;
      }
      
      const lod = this.getCurrentLOD();
      const markersToShow = this.queryMarkersInViewport(viewport, lod);
      
      // Clear current
      this.clearVisible();
      
      // Add new markers in batches (await the Promise)
      await this.addMarkersBatched(markersToShow, lod.showLabels);
    } finally {
      this.isUpdating = false;
    }
  }
  
  // Clear currently visible markers
  clearVisible() {
    this.billboardCollection.removeAll();
    this.labelCollection.removeAll();
    this.visibleMarkers.clear();
  }
  
  // Add markers in batches to prevent frame drops
  addMarkersBatched(markers, showLabels, progressCallback = null) {
    const INITIAL_BATCH_SIZE = 1000;
    const FRAME_BUDGET_MS = 12; // 12ms budget per frame (leaving 4ms buffer for 60fps)
    const MIN_BATCH_SIZE = 100;
    const C = this.Cesium;
    
    // For small datasets, use synchronous processing to avoid overhead
    if (markers.length < 1000) {
      for (let i = 0; i < markers.length; i++) {
        const m = markers[i];
        const color = this.colors[m.type] || this.colors.default;
        const coords = this.iconCoordinates.get(m.type) || this.iconCoordinates.get('default');
        
        // Add billboard
        const billboard = this.billboardCollection.add({
          position: C.Cartesian3.fromDegrees(m.lon, m.lat, 0),
          image: this.iconAtlas,
          width: 36,
          height: 36,
          verticalOrigin: C.VerticalOrigin.CENTER,
          horizontalOrigin: C.HorizontalOrigin.CENTER,
          pixelOffset: new C.Cartesian2(0, 0),
          scale: 1.0,
          color: C.Color.fromCssColorString(color),
          // Use texture atlas coordinates
          imageSubRegion: coords ? new C.BoundingRectangle(
            coords.x * 128 * Object.keys(this.colors).length,
            0,
            128,
            128
          ) : undefined
        });
        
        // Add label if zoomed in
        if (showLabels && m.data && m.data.name) {
          this.labelCollection.add({
            position: C.Cartesian3.fromDegrees(m.lon, m.lat, 100),
            text: m.data.name,
            font: 'bold 12px Inter, sans-serif',
            fillColor: C.Color.fromCssColorString('#ffffff'),
            outlineColor: C.Color.BLACK,
            outlineWidth: 3,
            style: C.LabelStyle.FILL_AND_OUTLINE,
            verticalOrigin: C.VerticalOrigin.BOTTOM,
            horizontalOrigin: C.HorizontalOrigin.CENTER,
            pixelOffset: new C.Cartesian2(0, -15),
            translucencyByDistance: new C.NearFarScalar(1000, 1.0, 5000, 0.0)
          });
        }
        
        this.visibleMarkers.set(m.id || `${m.lat}-${m.lon}`, { billboard, marker: m });
      }
      
      if (progressCallback) progressCallback(100, 'Markers loaded');
      return Promise.resolve();
    }
    
    // Async processing for large datasets
    const totalMarkers = markers.length;
    let processedCount = 0;
    let currentBatchSize = INITIAL_BATCH_SIZE;
    
    return new Promise((resolve) => {
      const processBatch = (startIndex, batchSize) => {
        const frameStartTime = performance.now();
        const endIndex = Math.min(startIndex + batchSize, totalMarkers);
        let markersAdded = 0;
        
        for (let i = startIndex; i < endIndex; i++) {
          const m = markers[i];
          const color = this.colors[m.type] || this.colors.default;
          const coords = this.iconCoordinates.get(m.type) || this.iconCoordinates.get('default');
          
          // Add billboard
          const billboard = this.billboardCollection.add({
            position: C.Cartesian3.fromDegrees(m.lon, m.lat, 0),
            image: this.iconAtlas,
            width: 36,
            height: 36,
            verticalOrigin: C.VerticalOrigin.CENTER,
            horizontalOrigin: C.HorizontalOrigin.CENTER,
            pixelOffset: new C.Cartesian2(0, 0),
            scale: 1.0,
            color: C.Color.fromCssColorString(color),
            // Use texture atlas coordinates
            imageSubRegion: coords ? new C.BoundingRectangle(
              coords.x * 128 * Object.keys(this.colors).length,
              0,
              128,
              128
            ) : undefined
          });
          
          // Add label if zoomed in
          if (showLabels && m.data && m.data.name) {
            this.labelCollection.add({
              position: C.Cartesian3.fromDegrees(m.lon, m.lat, 100),
              text: m.data.name,
              font: 'bold 12px Inter, sans-serif',
              fillColor: C.Color.fromCssColorString('#ffffff'),
              outlineColor: C.Color.BLACK,
              outlineWidth: 3,
              style: C.LabelStyle.FILL_AND_OUTLINE,
              verticalOrigin: C.VerticalOrigin.BOTTOM,
              horizontalOrigin: C.HorizontalOrigin.CENTER,
              pixelOffset: new C.Cartesian2(0, -15),
              translucencyByDistance: new C.NearFarScalar(1000, 1.0, 5000, 0.0)
            });
          }
          
          this.visibleMarkers.set(m.id || `${m.lat}-${m.lon}`, { billboard, marker: m });
          markersAdded++;
          processedCount++;
          
          // Check frame budget every 50 markers
          if (markersAdded % 50 === 0) {
            const elapsed = performance.now() - frameStartTime;
            if (elapsed > FRAME_BUDGET_MS) {
              // Adjust batch size for next frame (reduce by 20% if we exceeded budget)
              currentBatchSize = Math.max(MIN_BATCH_SIZE, Math.floor(markersAdded * 0.8));
              
              const progress = 50 + ((processedCount / totalMarkers) * 50);
              if (progressCallback) {
                progressCallback(progress, `Loading markers: ${processedCount}/${totalMarkers}`);
              }
              
              requestAnimationFrame(() => processBatch(i + 1, currentBatchSize));
              return;
            }
          }
        }
        
        // Batch complete
        if (endIndex < totalMarkers) {
          const progress = 50 + ((processedCount / totalMarkers) * 50);
          if (progressCallback) {
            progressCallback(progress, `Loading markers: ${processedCount}/${totalMarkers}`);
          }
          requestAnimationFrame(() => processBatch(endIndex, currentBatchSize));
        } else {
          // All markers rendered
          if (progressCallback) progressCallback(100, 'Markers loaded');
          resolve();
        }
      };
      
      // Start processing
      requestAnimationFrame(() => processBatch(0, currentBatchSize));
    });
  }
  
  // Public API: Add single marker
  addMarker(lat, lon, type, data) {
    const marker = {
      lat, lon, type, data,
      id: data.id || `${lat}-${lon}`
    };
    
    this.allMarkers.push(marker);
    
    // Rebuild spatial index if needed
    if (this.allMarkers.length % 10000 === 0) {
      this.buildSpatialIndex(this.allMarkers);
    }
    
    // Update view
    this.updateVisibleMarkers();
  }
  
  // Public API: Remove marker
  removeMarker(id) {
    const index = this.allMarkers.findIndex(m => m.id === id);
    if (index !== -1) {
      this.allMarkers.splice(index, 1);
      this.buildSpatialIndex(this.allMarkers);
      this.updateVisibleMarkers();
    }
  }
  
  // Public API: Clear all
  clear() {
    this.allMarkers = [];
    this.spatialIndex.clear();
    this.clearVisible();
  }
  
  // Public API: Fly to marker
  flyTo(id, duration = 1.5) {
    const marker = this.allMarkers.find(m => m.id === id);
    if (!marker) return;
    
    this.viewer.camera.flyTo({
      destination: this.Cesium.Cartesian3.fromDegrees(
        marker.lon,
        marker.lat,
        5000
      ),
      duration: duration
    });
  }
  
  // Public API: Get marker count
  getCount() {
    return this.allMarkers.length;
  }
  
  // Public API: Get visible count
  getVisibleCount() {
    return this.visibleMarkers.size;
  }
  
  // Public API: Show loading state
  showLoading() {
    // Dispatch event for UI
    window.dispatchEvent(new CustomEvent('markersLoading', {
      detail: { total: this.allMarkers.length }
    }));
  }
  
  // Public API: Hide loading
  hideLoading() {
    window.dispatchEvent(new CustomEvent('markersLoaded'));
  }
  
  // Cleanup
  destroy() {
    this.clear();
    if (this.billboardCollection) {
      this.viewer.scene.primitives.remove(this.billboardCollection);
    }
    if (this.labelCollection) {
      this.viewer.scene.primitives.remove(this.labelCollection);
    }
  }
}
