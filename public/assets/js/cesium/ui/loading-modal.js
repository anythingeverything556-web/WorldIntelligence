/** ═════════════════════════════════════════════════════════════════
 * Cesium Layer Loading Modal
 * Shows progress when switching imagery layers
 * ═════════════════════════════════════════════════════════════════
 */

export class LoadingModal {
  constructor() {
    this.element = null;
    this.progressBar = null;
    this.statusText = null;
    this.isVisible = false;
  }
  
  create() {
    if (this.element) return;
    
    // Create modal container
    this.element = document.createElement('div');
    this.element.id = 'cesium-loading-modal';
    this.element.className = 'cesium-loading-modal';
    this.element.style.cssText = `
      position: fixed;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      background: rgba(4, 5, 10, 0.85);
      backdrop-filter: blur(20px);
      z-index: 10000;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      opacity: 0;
      visibility: hidden;
      transition: opacity 0.3s ease, visibility 0.3s ease;
    `;
    
    // Modal content
    const content = document.createElement('div');
    content.className = 'loading-content';
    content.style.cssText = `
      background: rgba(20, 22, 30, 0.95);
      border: 1px solid rgba(255, 255, 255, 0.3);
      border-radius: 16px;
      padding: 32px 48px;
      min-width: 320px;
      text-align: center;
      box-shadow: 0 25px 50px rgba(0, 0, 0, 0.5);
    `;
    
    // Spinner
    const spinner = document.createElement('div');
    spinner.className = 'loading-spinner';
    spinner.style.cssText = `
      width: 48px;
      height: 48px;
      border: 3px solid rgba(255, 255, 255, 0.2);
      border-top-color: #ffffff;
      border-radius: 50%;
      margin: 0 auto 20px;
      animation: cesium-spin 1s linear infinite;
    `;
    
    // Add spinner animation
    const style = document.createElement('style');
    style.textContent = `
      @keyframes cesium-spin {
        to { transform: rotate(360deg); }
      }
    `;
    document.head.appendChild(style);
    
    // Title
    const title = document.createElement('h3');
    title.textContent = 'Loading Imagery';
    title.style.cssText = `
      color: #ffffff;
      font-family: 'Inter', sans-serif;
      font-size: 18px;
      font-weight: 600;
      margin: 0 0 8px;
    `;
    
    // Status text
    this.statusText = document.createElement('p');
    this.statusText.className = 'loading-status';
    this.statusText.textContent = 'Loading base layer...';
    this.statusText.style.cssText = `
      color: #94a3b8;
      font-family: 'Inter', sans-serif;
      font-size: 14px;
      margin: 0 0 20px;
    `;
    
    // Progress container
    const progressContainer = document.createElement('div');
    progressContainer.className = 'progress-container';
    progressContainer.style.cssText = `
      width: 100%;
      height: 4px;
      background: rgba(255, 255, 255, 0.1);
      border-radius: 2px;
      overflow: hidden;
      margin-top: 16px;
    `;
    
    // Progress bar
    this.progressBar = document.createElement('div');
    this.progressBar.className = 'progress-bar';
    this.progressBar.style.cssText = `
      width: 0%;
      height: 100%;
      background: linear-gradient(90deg, #ffffff, #ffd700);
      border-radius: 2px;
      transition: width 0.3s ease;
    `;
    
    // Assemble
    progressContainer.appendChild(this.progressBar);
    content.appendChild(spinner);
    content.appendChild(title);
    content.appendChild(this.statusText);
    content.appendChild(progressContainer);
    this.element.appendChild(content);
    
    // Add to body
    document.body.appendChild(this.element);
  }
  
  show(title = 'Loading Imagery', status = 'Loading base layer...') {
    this.create();
    
    // Update text
    this.element.querySelector('h3').textContent = title;
    this.statusText.textContent = status;
    this.progressBar.style.width = '0%';
    
    // Show
    this.element.style.opacity = '1';
    this.element.style.visibility = 'visible';
    this.isVisible = true;
  }
  
  updateProgress(percent, status) {
    if (!this.isVisible) return;
    
    this.progressBar.style.width = `${percent}%`;
    if (status) {
      this.statusText.textContent = status;
    }
  }
  
  updateStatus(status) {
    if (!this.isVisible) return;
    this.statusText.textContent = status;
  }
  
  hide() {
    if (!this.element || !this.isVisible) return;
    
    this.element.style.opacity = '0';
    this.element.style.visibility = 'hidden';
    this.isVisible = false;
    
    // Reset progress
    setTimeout(() => {
      this.progressBar.style.width = '0%';
    }, 300);
  }
  
  // Complete with success message
  complete(message = 'Complete!') {
    this.updateProgress(100, message);
    setTimeout(() => this.hide(), 500);
  }
  
  // Error state
  error(message) {
    if (!this.isVisible) return;
    
    this.statusText.textContent = `Error: ${message}`;
    this.statusText.style.color = '#ff4d6d';
    
    setTimeout(() => {
      this.statusText.style.color = '#94a3b8';
      this.hide();
    }, 2000);
  }
  
  destroy() {
    if (this.element) {
      this.element.remove();
      this.element = null;
      this.progressBar = null;
      this.statusText = null;
    }
  }
}

// Singleton instance
let instance = null;

export function getLoadingModal() {
  if (!instance) {
    instance = new LoadingModal();
  }
  return instance;
}
