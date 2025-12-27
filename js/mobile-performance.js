/* ==============================================
   Mobile Performance Optimizations
   Specific fixes for Chrome and Opera mobile browsers
   ============================================== */

class MobilePerformanceManager {
  constructor() {
    this.isMobile = this.detectMobile();
    this.isChrome = this.detectChrome();
    this.isOpera = this.detectOpera();
    this.isLowEndDevice = this.detectLowEndDevice();
    
    this.init();
  }
  
  init() {
    console.log('🐼 Initializing mobile performance manager...');
    console.log(`Mobile: ${this.isMobile}, Chrome: ${this.isChrome}, Opera: ${this.isOpera}, Low-end: ${this.isLowEndDevice}`);
    
    if (this.isMobile) {
      this.applyMobileOptimizations();
    }
    
    if (this.isChrome || this.isOpera) {
      this.applyBrowserSpecificFixes();
    }
    
    if (this.isLowEndDevice) {
      this.applyLowEndDeviceOptimizations();
    }
    
    console.log('✨ Mobile performance manager initialized');
  }
  
  detectMobile() {
    return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) ||
           window.innerWidth <= 768 ||
           ('ontouchstart' in window);
  }
  
  detectChrome() {
    return /Chrome/i.test(navigator.userAgent) && !/Edge|OPR/i.test(navigator.userAgent);
  }
  
  detectOpera() {
    return /OPR|Opera/i.test(navigator.userAgent);
  }
  
  detectLowEndDevice() {
    // Detect low-end devices based on various factors
    const hardwareConcurrency = navigator.hardwareConcurrency || 1;
    const deviceMemory = navigator.deviceMemory || 1;
    const connection = navigator.connection;
    
    // Consider it low-end if:
    // - Less than 2 CPU cores
    // - Less than 2GB RAM
    // - Slow connection
    return hardwareConcurrency < 2 || 
           deviceMemory < 2 || 
           (connection && (connection.effectiveType === 'slow-2g' || connection.effectiveType === '2g'));
  }
  
  applyMobileOptimizations() {
    console.log('🔧 Applying mobile optimizations...');
    
    // Add mobile-specific CSS class
    document.body.classList.add('mobile-optimized');
    
    // Optimize panda animations for mobile
    this.optimizePandaAnimations();
    
    // Reduce animation complexity
    this.reduceAnimationComplexity();
    
    // Improve touch responsiveness
    this.improveTouchResponsiveness();
    
    // Optimize rendering performance
    this.optimizeRendering();
  }
  
  applyBrowserSpecificFixes() {
    console.log('🔧 Applying Chrome/Opera specific fixes...');
    
    if (this.isChrome) {
      document.body.classList.add('chrome-mobile');
      this.fixChromeFlickering();
    }
    
    if (this.isOpera) {
      document.body.classList.add('opera-mobile');
      this.fixOperaFlickering();
    }
    
    // Common fixes for both browsers
    this.fixCommonMobileBrowserIssues();
  }
  
  applyLowEndDeviceOptimizations() {
    console.log('🔧 Applying low-end device optimizations...');
    
    document.body.classList.add('low-end-device');
    
    // Disable complex animations
    this.disableComplexAnimations();
    
    // Reduce the number of animated elements
    this.reduceAnimatedElements();
    
    // Use simpler transitions
    this.useSimpleTransitions();
  }
  
  optimizePandaAnimations() {
    const style = document.createElement('style');
    style.textContent = `
      .mobile-optimized .panda-decoration {
        /* Force hardware acceleration */
        transform: translateZ(0);
        -webkit-transform: translateZ(0);
        will-change: transform, opacity;
        
        /* Improve rendering */
        backface-visibility: hidden;
        -webkit-backface-visibility: hidden;
        
        /* Reduce animation frequency */
        animation-duration: 40s !important;
        
        /* Stabilize opacity to prevent flickering */
        opacity: 0.12 !important;
      }
      
      .mobile-optimized .panda-decoration::after {
        /* Optimize pseudo-elements */
        will-change: transform;
        backface-visibility: hidden;
        -webkit-backface-visibility: hidden;
      }
      
      /* Hide some pandas on mobile to reduce load */
      .mobile-optimized .panda-7,
      .mobile-optimized .panda-8,
      .mobile-optimized .panda-9,
      .mobile-optimized .panda-10,
      .mobile-optimized .panda-11,
      .mobile-optimized .panda-12 {
        display: none !important;
      }
    `;
    document.head.appendChild(style);
  }
  
  fixChromeFlickering() {
    const style = document.createElement('style');
    style.textContent = `
      .chrome-mobile .panda-decoration {
        /* Chrome-specific anti-flickering */
        -webkit-font-smoothing: antialiased;
        -webkit-transform-style: preserve-3d;
        transform-style: preserve-3d;
        
        /* Force compositing layer */
        -webkit-transform: translateZ(0);
        transform: translateZ(0);
        
        /* Prevent subpixel rendering issues */
        -webkit-backface-visibility: hidden;
        backface-visibility: hidden;
        
        /* Stabilize animations */
        animation-fill-mode: both;
        -webkit-animation-fill-mode: both;
      }
      
      /* Fix Chrome's animation timing issues */
      .chrome-mobile .panda-decoration {
        animation-timing-function: linear !important;
      }
    `;
    document.head.appendChild(style);
  }
  
  fixOperaFlickering() {
    const style = document.createElement('style');
    style.textContent = `
      .opera-mobile .panda-decoration {
        /* Opera-specific optimizations */
        -o-transform: translateZ(0);
        transform: translateZ(0);
        
        /* Improve Opera's rendering */
        will-change: transform, opacity;
        contain: layout style paint;
        
        /* Prevent Opera's animation glitches */
        animation-play-state: running;
        -o-animation-play-state: running;
      }
    `;
    document.head.appendChild(style);
  }
  
  fixCommonMobileBrowserIssues() {
    const style = document.createElement('style');
    style.textContent = `
      /* Common mobile browser fixes */
      .mobile-optimized .floating-decorations {
        /* Improve container performance */
        will-change: auto;
        contain: layout style;
        
        /* Prevent overflow issues */
        overflow: hidden;
      }
      
      /* Fix page transition animations */
      .mobile-optimized .page-transition-overlay {
        /* Slower, smoother transitions */
        animation-duration: 1s !important;
        
        /* Better mobile rendering */
        will-change: opacity;
        backface-visibility: hidden;
        -webkit-backface-visibility: hidden;
      }
      
      .mobile-optimized .transition-pandas > div {
        /* Slower panda animations in transitions */
        animation-duration: 3s !important;
        
        /* Prevent flickering */
        will-change: transform;
        backface-visibility: hidden;
        -webkit-backface-visibility: hidden;
      }
      
      .mobile-optimized .transition-hearts > div {
        /* Slower heart animations */
        animation-duration: 4s !important;
      }
    `;
    document.head.appendChild(style);
  }
  
  reduceAnimationComplexity() {
    const style = document.createElement('style');
    style.textContent = `
      .mobile-optimized .romanticFloatingPandas {
        /* Simpler animation for mobile */
        animation-name: simplePandaFloat !important;
      }
      
      @keyframes simplePandaFloat {
        0%, 100% {
          transform: translateY(0) scale(1);
          opacity: 0.12;
        }
        50% {
          transform: translateY(-10px) scale(1.02);
          opacity: 0.15;
        }
      }
      
      /* Simplify other complex animations */
      .mobile-optimized .gentlePulse {
        animation-name: simplePulse !important;
      }
      
      @keyframes simplePulse {
        0%, 100% {
          transform: scale(1);
          opacity: 1;
        }
        50% {
          transform: scale(1.05);
          opacity: 0.9;
        }
      }
    `;
    document.head.appendChild(style);
  }
  
  disableComplexAnimations() {
    const style = document.createElement('style');
    style.textContent = `
      .low-end-device .panda-decoration {
        /* Disable animations on low-end devices */
        animation: none !important;
        opacity: 0.08 !important;
      }
      
      .low-end-device .panda-decoration::after {
        animation: none !important;
      }
      
      /* Keep only essential animations */
      .low-end-device .gentle-pulse {
        animation-duration: 4s !important;
      }
    `;
    document.head.appendChild(style);
  }
  
  reduceAnimatedElements() {
    if (this.isLowEndDevice) {
      // Hide most pandas on low-end devices
      const pandas = document.querySelectorAll('.panda-decoration');
      pandas.forEach((panda, index) => {
        if (index > 2) { // Keep only first 3 pandas
          panda.style.display = 'none';
        }
      });
    }
  }
  
  useSimpleTransitions() {
    const style = document.createElement('style');
    style.textContent = `
      .low-end-device * {
        /* Use simple transitions only */
        transition-duration: 0.2s !important;
        transition-timing-function: ease !important;
      }
      
      .low-end-device .page-transition-overlay {
        /* Very simple page transitions */
        animation: simpleFadeIn 0.5s ease !important;
      }
      
      @keyframes simpleFadeIn {
        from { opacity: 0; }
        to { opacity: 1; }
      }
    `;
    document.head.appendChild(style);
  }
  
  improveTouchResponsiveness() {
    // Add touch-friendly styles
    const style = document.createElement('style');
    style.textContent = `
      .mobile-optimized {
        /* Improve touch responsiveness */
        -webkit-tap-highlight-color: rgba(107, 142, 90, 0.2);
        -webkit-touch-callout: none;
        -webkit-user-select: none;
        user-select: none;
        touch-action: manipulation;
      }
      
      .mobile-optimized .event-content {
        /* Better touch feedback */
        -webkit-tap-highlight-color: rgba(107, 142, 90, 0.3);
        touch-action: manipulation;
      }
      
      .mobile-optimized .btn,
      .mobile-optimized button {
        /* Optimize button touches */
        touch-action: manipulation;
        -webkit-tap-highlight-color: rgba(107, 142, 90, 0.2);
      }
    `;
    document.head.appendChild(style);
  }
  
  optimizeRendering() {
    // Apply rendering optimizations
    const style = document.createElement('style');
    style.textContent = `
      .mobile-optimized {
        /* Optimize overall rendering */
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
        text-rendering: optimizeSpeed;
      }
      
      .mobile-optimized .floating-decorations {
        /* Optimize floating elements container */
        contain: layout style paint;
        will-change: auto;
      }
      
      .mobile-optimized .timeline-section {
        /* Optimize timeline rendering */
        contain: layout style;
      }
    `;
    document.head.appendChild(style);
  }
  
  // Method to temporarily disable animations during scrolling
  optimizeScrollPerformance() {
    let scrollTimeout;
    let isScrolling = false;
    
    const handleScrollStart = () => {
      if (!isScrolling) {
        isScrolling = true;
        document.body.classList.add('scrolling');
        
        // Pause complex animations during scroll
        const pandas = document.querySelectorAll('.panda-decoration');
        pandas.forEach(panda => {
          panda.style.animationPlayState = 'paused';
        });
      }
      
      clearTimeout(scrollTimeout);
      scrollTimeout = setTimeout(() => {
        isScrolling = false;
        document.body.classList.remove('scrolling');
        
        // Resume animations after scroll
        const pandas = document.querySelectorAll('.panda-decoration');
        pandas.forEach(panda => {
          panda.style.animationPlayState = 'running';
        });
      }, 150);
    };
    
    if (this.isMobile) {
      window.addEventListener('scroll', handleScrollStart, { passive: true });
      window.addEventListener('touchmove', handleScrollStart, { passive: true });
    }
  }
  
  // Monitor performance and adjust accordingly
  monitorPerformance() {
    if ('performance' in window && 'memory' in performance) {
      const checkPerformance = () => {
        const memory = performance.memory;
        const usedMemory = memory.usedJSHeapSize / memory.jsHeapSizeLimit;
        
        // If memory usage is high, reduce animations
        if (usedMemory > 0.8) {
          console.log('🔧 High memory usage detected, reducing animations...');
          document.body.classList.add('high-memory-usage');
          
          const style = document.createElement('style');
          style.textContent = `
            .high-memory-usage .panda-decoration {
              animation-duration: 60s !important;
              opacity: 0.06 !important;
            }
            
            .high-memory-usage .panda-decoration:nth-child(n+4) {
              display: none !important;
            }
          `;
          document.head.appendChild(style);
        }
      };
      
      // Check performance every 10 seconds
      setInterval(checkPerformance, 10000);
    }
  }
}

// Initialize mobile performance manager
document.addEventListener('DOMContentLoaded', function() {
  console.log('🐼 Initializing mobile performance manager...');
  
  try {
    const mobilePerformanceManager = new MobilePerformanceManager();
    
    // Make it globally available
    window.mobilePerformanceManager = mobilePerformanceManager;
    
    // Start performance monitoring
    mobilePerformanceManager.optimizeScrollPerformance();
    mobilePerformanceManager.monitorPerformance();
    
    console.log('🎉 Mobile performance manager initialized successfully!');
  } catch (error) {
    console.error('❌ Error initializing mobile performance manager:', error);
  }
});

// Export for use in other modules
if (typeof module !== 'undefined' && module.exports) {
  module.exports = MobilePerformanceManager;
}