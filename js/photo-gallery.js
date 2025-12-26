/* ==============================================
   Photo Gallery - Mobile-First Photo Gallery Component
   Touch-Optimized Photo Gallery with Panda Theme
   ============================================== */

class PhotoGallery {
  constructor(galleryElement, photos = []) {
    this.galleryElement = galleryElement;
    this.photos = photos;
    this.currentPhotoIndex = 0;
    this.isLightboxOpen = false;
    this.touchStartX = 0;
    this.touchStartY = 0;
    this.isZoomed = false;
    this.zoomLevel = 1;
    this.maxZoom = 3;
    this.minZoom = 1;
    
    // Bind methods
    this.handleTouchStart = this.handleTouchStart.bind(this);
    this.handleTouchMove = this.handleTouchMove.bind(this);
    this.handleTouchEnd = this.handleTouchEnd.bind(this);
    this.handleKeydown = this.handleKeydown.bind(this);
    this.handleResize = this.handleResize.bind(this);
    
    this.init();
  }
  
  // Initialize the photo gallery
  init() {
    if (!this.galleryElement) {
      console.warn('⚠️ Photo gallery element not found');
      return;
    }
    
    console.log('🐼 Initializing Photo Gallery with', this.photos.length, 'photos');
    
    // Render gallery
    this.renderGallery();
    
    // Initialize event listeners
    this.initializeEventListeners();
    
    // Initialize mobile optimizations
    this.initializeMobileOptimizations();
    
    console.log('📸 Photo Gallery initialized successfully!');
  }
  
  // Render the photo gallery
  renderGallery() {
    if (this.photos.length === 0) {
      this.showEmptyState();
      return;
    }
    
    // Clear existing content
    this.galleryElement.innerHTML = '';
    
    // Create photo items
    this.photos.forEach((photo, index) => {
      const photoItem = this.createPhotoItem(photo, index);
      this.galleryElement.appendChild(photoItem);
    });
  }
  
  // Create a photo item element
  createPhotoItem(photo, index) {
    const photoItem = document.createElement('div');
    photoItem.className = 'photo-item';
    photoItem.setAttribute('data-photo-index', index);
    
    // Create photo element
    const img = document.createElement('img');
    img.src = photo.url || photo.src;
    img.alt = photo.caption || photo.alt || `Photo ${index + 1}`;
    img.className = 'gallery-photo';
    img.loading = 'lazy';
    
    // Handle image load errors
    img.onerror = () => {
      img.style.display = 'none';
      const placeholder = document.createElement('div');
      placeholder.className = 'photo-placeholder';
      placeholder.innerHTML = `
        <span class="placeholder-icon">🐼</span>
        <p>Photo not available</p>
      `;
      placeholder.style.cssText = `
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        height: 250px;
        background: linear-gradient(135deg, var(--sage-green), var(--mint-cream));
        color: var(--text-soft);
        font-family: 'Dancing Script', cursive;
        font-size: 1rem;
      `;
      photoItem.appendChild(placeholder);
    };
    
    // Create caption element
    const caption = document.createElement('div');
    caption.className = 'photo-caption';
    caption.textContent = photo.caption || photo.alt || '';
    
    // Add click handler for lightbox
    photoItem.addEventListener('click', () => {
      this.openLightbox(index);
    });
    
    // Add touch feedback
    this.addTouchFeedback(photoItem);
    
    // Append elements
    photoItem.appendChild(img);
    if (caption.textContent) {
      photoItem.appendChild(caption);
    }
    
    return photoItem;
  }
  
  // Add touch feedback to photo items
  addTouchFeedback(element) {
    if ('ontouchstart' in window) {
      element.addEventListener('touchstart', (e) => {
        element.style.transform = 'scale(0.98)';
        element.style.transition = 'transform 0.1s ease';
      });
      
      element.addEventListener('touchend', (e) => {
        element.style.transform = '';
        element.style.transition = 'transform 0.3s ease';
      });
      
      element.addEventListener('touchcancel', (e) => {
        element.style.transform = '';
        element.style.transition = 'transform 0.3s ease';
      });
    }
  }
  
  // Show empty state when no photos
  showEmptyState() {
    this.galleryElement.innerHTML = `
      <div class="gallery-empty-state">
        <span class="empty-panda">🐼</span>
        <p>No photos to display yet</p>
        <p class="empty-subtitle">More beautiful memories coming soon!</p>
      </div>
    `;
    
    // Add styles for empty state
    const emptyState = this.galleryElement.querySelector('.gallery-empty-state');
    if (emptyState) {
      emptyState.style.cssText = `
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        padding: 3rem 2rem;
        text-align: center;
        color: var(--text-soft);
        font-family: 'Dancing Script', cursive;
      `;
      
      const panda = emptyState.querySelector('.empty-panda');
      if (panda) {
        panda.style.cssText = `
          font-size: 3rem;
          margin-bottom: 1rem;
          animation: gentlePulse 3s ease-in-out infinite;
        `;
      }
      
      const subtitle = emptyState.querySelector('.empty-subtitle');
      if (subtitle) {
        subtitle.style.cssText = `
          font-size: 0.9rem;
          opacity: 0.7;
          font-style: italic;
        `;
      }
    }
  }
  
  // Open lightbox for photo viewing
  openLightbox(photoIndex) {
    this.currentPhotoIndex = photoIndex;
    this.isLightboxOpen = true;
    this.zoomLevel = 1;
    this.isZoomed = false;
    
    // Create lightbox overlay
    const lightbox = document.createElement('div');
    lightbox.className = 'photo-lightbox';
    lightbox.innerHTML = `
      <div class="lightbox-overlay"></div>
      <div class="lightbox-content">
        <button class="lightbox-close" title="Close">
          <span class="close-icon">✕</span>
        </button>
        <button class="lightbox-prev" title="Previous Photo">
          <span class="nav-icon">🐼</span>
        </button>
        <button class="lightbox-next" title="Next Photo">
          <span class="nav-icon">🐼</span>
        </button>
        <div class="lightbox-photo-container">
          <img class="lightbox-photo" src="" alt="" />
          <div class="lightbox-loading">
            <span class="loading-panda">🐼</span>
            <p>Loading photo...</p>
          </div>
        </div>
        <div class="lightbox-caption"></div>
        <div class="lightbox-counter">
          <span class="current-photo">1</span> / <span class="total-photos">${this.photos.length}</span>
        </div>
        <div class="lightbox-controls">
          <button class="zoom-in-btn" title="Zoom In">🔍+</button>
          <button class="zoom-out-btn" title="Zoom Out">🔍-</button>
          <button class="zoom-reset-btn" title="Reset Zoom">↻</button>
        </div>
      </div>
    `;
    
    // Add lightbox styles
    this.addLightboxStyles(lightbox);
    
    // Append to body
    document.body.appendChild(lightbox);
    
    // Initialize lightbox
    this.initializeLightbox(lightbox);
    
    // Load current photo
    this.loadLightboxPhoto();
    
    // Prevent body scroll
    document.body.style.overflow = 'hidden';
    
    console.log('📸 Lightbox opened for photo:', photoIndex);
  }
  
  // Add lightbox styles
  addLightboxStyles(lightbox) {
    lightbox.style.cssText = `
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      z-index: 10000;
      display: flex;
      align-items: center;
      justify-content: center;
      animation: lightboxFadeIn 0.3s ease-out;
    `;
    
    // Add CSS for lightbox components
    const lightboxStyles = document.createElement('style');
    lightboxStyles.textContent = `
      .lightbox-overlay {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(0, 0, 0, 0.9);
        backdrop-filter: blur(10px);
        -webkit-backdrop-filter: blur(10px);
      }
      
      .lightbox-content {
        position: relative;
        width: 90%;
        height: 90%;
        max-width: 1200px;
        max-height: 800px;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
      }
      
      .lightbox-close {
        position: absolute;
        top: 1rem;
        right: 1rem;
        background: rgba(232, 240, 228, 0.9);
        border: 2px solid var(--bamboo-green);
        border-radius: 50%;
        width: 50px;
        height: 50px;
        cursor: pointer;
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 1.5rem;
        color: var(--text-accent);
        transition: all 0.3s ease;
        z-index: 10001;
      }
      
      .lightbox-close:hover {
        background: rgba(240, 248, 240, 1);
        transform: scale(1.1);
      }
      
      .lightbox-prev,
      .lightbox-next {
        position: absolute;
        top: 50%;
        transform: translateY(-50%);
        background: rgba(232, 240, 228, 0.9);
        border: 2px solid var(--bamboo-green);
        border-radius: 50%;
        width: 60px;
        height: 60px;
        cursor: pointer;
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 1.5rem;
        transition: all 0.3s ease;
        z-index: 10001;
      }
      
      .lightbox-prev {
        left: 2rem;
      }
      
      .lightbox-next {
        right: 2rem;
      }
      
      .lightbox-prev:hover,
      .lightbox-next:hover {
        background: rgba(240, 248, 240, 1);
        transform: translateY(-50%) scale(1.1);
      }
      
      .lightbox-photo-container {
        position: relative;
        width: 100%;
        height: 70%;
        display: flex;
        align-items: center;
        justify-content: center;
        overflow: hidden;
        border-radius: 15px;
        background: var(--whisper-pink);
      }
      
      .lightbox-photo {
        max-width: 100%;
        max-height: 100%;
        object-fit: contain;
        transition: transform 0.3s ease;
        cursor: grab;
      }
      
      .lightbox-photo:active {
        cursor: grabbing;
      }
      
      .lightbox-photo.zoomed {
        cursor: move;
      }
      
      .lightbox-loading {
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        text-align: center;
        color: var(--text-soft);
        font-family: 'Dancing Script', cursive;
        font-size: 1.2rem;
      }
      
      .lightbox-loading .loading-panda {
        font-size: 3rem;
        display: block;
        margin-bottom: 1rem;
        animation: gentlePulse 2s ease-in-out infinite;
      }
      
      .lightbox-caption {
        margin-top: 1rem;
        text-align: center;
        color: white;
        font-family: 'Dancing Script', cursive;
        font-size: 1.2rem;
        font-weight: 600;
        max-width: 80%;
      }
      
      .lightbox-counter {
        margin-top: 0.5rem;
        color: rgba(255, 255, 255, 0.8);
        font-family: 'Playfair Display', serif;
        font-size: 1rem;
      }
      
      .lightbox-controls {
        position: absolute;
        bottom: 2rem;
        left: 50%;
        transform: translateX(-50%);
        display: flex;
        gap: 1rem;
        background: rgba(232, 240, 228, 0.9);
        padding: 0.5rem 1rem;
        border-radius: 25px;
        border: 2px solid var(--bamboo-green);
      }
      
      .lightbox-controls button {
        background: transparent;
        border: none;
        font-size: 1.2rem;
        cursor: pointer;
        padding: 0.5rem;
        border-radius: 10px;
        transition: all 0.3s ease;
        color: var(--text-accent);
      }
      
      .lightbox-controls button:hover {
        background: rgba(240, 248, 240, 0.8);
        transform: scale(1.1);
      }
      
      @keyframes lightboxFadeIn {
        from {
          opacity: 0;
        }
        to {
          opacity: 1;
        }
      }
      
      @keyframes lightboxFadeOut {
        from {
          opacity: 1;
        }
        to {
          opacity: 0;
        }
      }
      
      /* Mobile responsive lightbox */
      @media (max-width: 768px) {
        .lightbox-content {
          width: 95%;
          height: 95%;
        }
        
        .lightbox-prev,
        .lightbox-next {
          width: 50px;
          height: 50px;
          font-size: 1.2rem;
        }
        
        .lightbox-prev {
          left: 1rem;
        }
        
        .lightbox-next {
          right: 1rem;
        }
        
        .lightbox-close {
          width: 40px;
          height: 40px;
          font-size: 1.2rem;
        }
        
        .lightbox-controls {
          bottom: 1rem;
          padding: 0.25rem 0.75rem;
        }
        
        .lightbox-controls button {
          font-size: 1rem;
          padding: 0.25rem;
        }
      }
    `;
    
    document.head.appendChild(lightboxStyles);
  }
  
  // Initialize lightbox event listeners
  initializeLightbox(lightbox) {
    // Close button
    const closeBtn = lightbox.querySelector('.lightbox-close');
    closeBtn.addEventListener('click', () => this.closeLightbox());
    
    // Navigation buttons
    const prevBtn = lightbox.querySelector('.lightbox-prev');
    const nextBtn = lightbox.querySelector('.lightbox-next');
    
    prevBtn.addEventListener('click', () => this.previousPhoto());
    nextBtn.addEventListener('click', () => this.nextPhoto());
    
    // Zoom controls
    const zoomInBtn = lightbox.querySelector('.zoom-in-btn');
    const zoomOutBtn = lightbox.querySelector('.zoom-out-btn');
    const zoomResetBtn = lightbox.querySelector('.zoom-reset-btn');
    
    zoomInBtn.addEventListener('click', () => this.zoomIn());
    zoomOutBtn.addEventListener('click', () => this.zoomOut());
    zoomResetBtn.addEventListener('click', () => this.resetZoom());
    
    // Overlay click to close
    const overlay = lightbox.querySelector('.lightbox-overlay');
    overlay.addEventListener('click', () => this.closeLightbox());
    
    // Photo container for touch/mouse events
    const photoContainer = lightbox.querySelector('.lightbox-photo-container');
    
    // Touch events for mobile
    photoContainer.addEventListener('touchstart', this.handleTouchStart, { passive: false });
    photoContainer.addEventListener('touchmove', this.handleTouchMove, { passive: false });
    photoContainer.addEventListener('touchend', this.handleTouchEnd, { passive: false });
    
    // Double tap to zoom
    let lastTap = 0;
    photoContainer.addEventListener('touchend', (e) => {
      const currentTime = new Date().getTime();
      const tapLength = currentTime - lastTap;
      if (tapLength < 500 && tapLength > 0) {
        e.preventDefault();
        this.toggleZoom();
      }
      lastTap = currentTime;
    });
    
    // Keyboard events
    document.addEventListener('keydown', this.handleKeydown);
    
    // Store lightbox reference
    this.currentLightbox = lightbox;
  }
  
  // Load photo in lightbox
  loadLightboxPhoto() {
    if (!this.currentLightbox || this.currentPhotoIndex >= this.photos.length) return;
    
    const photo = this.photos[this.currentPhotoIndex];
    const lightboxPhoto = this.currentLightbox.querySelector('.lightbox-photo');
    const lightboxCaption = this.currentLightbox.querySelector('.lightbox-caption');
    const lightboxCounter = this.currentLightbox.querySelector('.lightbox-counter');
    const loadingIndicator = this.currentLightbox.querySelector('.lightbox-loading');
    
    // Show loading
    loadingIndicator.style.display = 'block';
    lightboxPhoto.style.display = 'none';
    
    // Load photo
    lightboxPhoto.src = photo.url || photo.src;
    lightboxPhoto.alt = photo.caption || photo.alt || `Photo ${this.currentPhotoIndex + 1}`;
    
    // Update caption
    lightboxCaption.textContent = photo.caption || photo.alt || '';
    
    // Update counter
    const currentSpan = lightboxCounter.querySelector('.current-photo');
    currentSpan.textContent = this.currentPhotoIndex + 1;
    
    // Handle photo load
    lightboxPhoto.onload = () => {
      loadingIndicator.style.display = 'none';
      lightboxPhoto.style.display = 'block';
      this.resetZoom();
    };
    
    lightboxPhoto.onerror = () => {
      loadingIndicator.innerHTML = `
        <span class="loading-panda">🐼</span>
        <p>Photo could not be loaded</p>
      `;
    };
  }
  
  // Close lightbox
  closeLightbox() {
    if (!this.currentLightbox) return;
    
    // Remove event listeners
    document.removeEventListener('keydown', this.handleKeydown);
    
    // Animate out
    this.currentLightbox.style.animation = 'lightboxFadeOut 0.3s ease-out';
    
    setTimeout(() => {
      if (this.currentLightbox && this.currentLightbox.parentNode) {
        this.currentLightbox.parentNode.removeChild(this.currentLightbox);
      }
      this.currentLightbox = null;
      this.isLightboxOpen = false;
      
      // Restore body scroll
      document.body.style.overflow = '';
      
      console.log('📸 Lightbox closed');
    }, 300);
  }
  
  // Navigate to previous photo
  previousPhoto() {
    if (this.currentPhotoIndex > 0) {
      this.currentPhotoIndex--;
      this.loadLightboxPhoto();
    }
  }
  
  // Navigate to next photo
  nextPhoto() {
    if (this.currentPhotoIndex < this.photos.length - 1) {
      this.currentPhotoIndex++;
      this.loadLightboxPhoto();
    }
  }
  
  // Zoom in
  zoomIn() {
    if (this.zoomLevel < this.maxZoom) {
      this.zoomLevel += 0.5;
      this.applyZoom();
    }
  }
  
  // Zoom out
  zoomOut() {
    if (this.zoomLevel > this.minZoom) {
      this.zoomLevel -= 0.5;
      this.applyZoom();
    }
  }
  
  // Reset zoom
  resetZoom() {
    this.zoomLevel = 1;
    this.isZoomed = false;
    this.applyZoom();
  }
  
  // Toggle zoom (for double tap)
  toggleZoom() {
    if (this.zoomLevel === 1) {
      this.zoomLevel = 2;
    } else {
      this.zoomLevel = 1;
    }
    this.applyZoom();
  }
  
  // Apply zoom to photo
  applyZoom() {
    if (!this.currentLightbox) return;
    
    const lightboxPhoto = this.currentLightbox.querySelector('.lightbox-photo');
    if (lightboxPhoto) {
      lightboxPhoto.style.transform = `scale(${this.zoomLevel})`;
      
      if (this.zoomLevel > 1) {
        lightboxPhoto.classList.add('zoomed');
        this.isZoomed = true;
      } else {
        lightboxPhoto.classList.remove('zoomed');
        this.isZoomed = false;
      }
    }
  }
  
  // Handle touch start
  handleTouchStart(e) {
    if (e.touches.length === 1) {
      this.touchStartX = e.touches[0].clientX;
      this.touchStartY = e.touches[0].clientY;
    }
  }
  
  // Handle touch move
  handleTouchMove(e) {
    if (!this.isZoomed) {
      e.preventDefault();
    }
  }
  
  // Handle touch end
  handleTouchEnd(e) {
    if (!this.touchStartX || !this.touchStartY) return;
    
    const touchEndX = e.changedTouches[0].clientX;
    const touchEndY = e.changedTouches[0].clientY;
    
    const deltaX = touchEndX - this.touchStartX;
    const deltaY = touchEndY - this.touchStartY;
    
    // Check if it's a swipe (not just a tap)
    if (Math.abs(deltaX) > 50 && Math.abs(deltaX) > Math.abs(deltaY)) {
      if (deltaX > 0) {
        // Swipe right - previous photo
        this.previousPhoto();
      } else {
        // Swipe left - next photo
        this.nextPhoto();
      }
    }
    
    // Reset touch coordinates
    this.touchStartX = 0;
    this.touchStartY = 0;
  }
  
  // Handle keyboard navigation
  handleKeydown(e) {
    if (!this.isLightboxOpen) return;
    
    switch (e.key) {
      case 'Escape':
        this.closeLightbox();
        break;
      case 'ArrowLeft':
        e.preventDefault();
        this.previousPhoto();
        break;
      case 'ArrowRight':
        e.preventDefault();
        this.nextPhoto();
        break;
      case '+':
      case '=':
        e.preventDefault();
        this.zoomIn();
        break;
      case '-':
        e.preventDefault();
        this.zoomOut();
        break;
      case '0':
        e.preventDefault();
        this.resetZoom();
        break;
    }
  }
  
  // Initialize event listeners
  initializeEventListeners() {
    // Window resize
    window.addEventListener('resize', this.handleResize);
  }
  
  // Initialize mobile optimizations
  initializeMobileOptimizations() {
    // Add mobile-specific CSS classes
    if (this.isMobile()) {
      this.galleryElement.classList.add('mobile-gallery');
    }
    
    if (this.isTouch()) {
      this.galleryElement.classList.add('touch-gallery');
    }
  }
  
  // Handle window resize
  handleResize() {
    // Debounce resize events
    clearTimeout(this.resizeTimeout);
    this.resizeTimeout = setTimeout(() => {
      // Adjust gallery layout if needed
      this.adjustGalleryLayout();
    }, 250);
  }
  
  // Adjust gallery layout for different screen sizes
  adjustGalleryLayout() {
    // This can be used to dynamically adjust the gallery grid
    // based on screen size if needed
  }
  
  // Utility methods
  isMobile() {
    return window.innerWidth <= 768 || /Android|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
  }
  
  isTouch() {
    return 'ontouchstart' in window || navigator.maxTouchPoints > 0;
  }
  
  // Public methods for external control
  addPhoto(photo) {
    this.photos.push(photo);
    this.renderGallery();
  }
  
  removePhoto(index) {
    if (index >= 0 && index < this.photos.length) {
      this.photos.splice(index, 1);
      this.renderGallery();
    }
  }
  
  updatePhoto(index, photo) {
    if (index >= 0 && index < this.photos.length) {
      this.photos[index] = { ...this.photos[index], ...photo };
      this.renderGallery();
    }
  }
  
  setPhotos(photos) {
    this.photos = photos;
    this.renderGallery();
  }
  
  getPhotos() {
    return this.photos;
  }
}

// Auto-initialize photo galleries on page load
document.addEventListener('DOMContentLoaded', function() {
  const galleryElements = document.querySelectorAll('.photo-gallery');
  
  galleryElements.forEach(galleryElement => {
    // Try to get photos from data attribute or existing photo items
    let photos = [];
    
    // Check for existing photo items
    const existingPhotos = galleryElement.querySelectorAll('.photo-item');
    if (existingPhotos.length > 0) {
      photos = Array.from(existingPhotos).map((item, index) => {
        const img = item.querySelector('.gallery-photo, img');
        const caption = item.querySelector('.photo-caption');
        
        return {
          url: img ? img.src : '',
          caption: caption ? caption.textContent : '',
          alt: img ? img.alt : `Photo ${index + 1}`
        };
      });
    }
    
    // Initialize photo gallery
    const gallery = new PhotoGallery(galleryElement, photos);
    
    // Store reference for external access
    galleryElement.photoGallery = gallery;
    
    console.log('📸 Photo gallery initialized for element with', photos.length, 'photos');
  });
});

// Export for use in other modules
if (typeof module !== 'undefined' && module.exports) {
  module.exports = PhotoGallery;
}