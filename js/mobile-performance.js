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
    
    // Initialize emoji persistence system
    this.initEmojiPersistenceSystem();
    
    // Optimize panda animations for mobile
    this.optimizePandaAnimations();
    
    // Reduce animation complexity
    this.reduceAnimationComplexity();
    
    // Improve touch responsiveness
    this.improveTouchResponsiveness();
    
    // Optimize rendering performance
    this.optimizeRendering();
    
    // Add scroll-specific optimizations that don't hide pandas
    this.addScrollOptimizations();
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
  
  // Add scroll-specific optimizations that don't hide pandas
  addScrollOptimizations() {
    if (!this.isMobile) return;
    
    console.log('🐼 Adding scroll optimizations that preserve panda visibility...');
    
    // Add CSS optimizations for scrolling that don't affect panda visibility
    const style = document.createElement('style');
    style.textContent = `
      /* Scroll optimizations that preserve floating pandas */
      .mobile-optimized.scrolling {
        /* Optimize scrolling performance without hiding pandas */
        -webkit-overflow-scrolling: touch;
        scroll-behavior: smooth;
      }
      
      /* Ensure pandas remain visible during scroll */
      .mobile-optimized.scrolling .floating-decorations {
        /* Keep decorations container visible */
        visibility: visible !important;
        opacity: 1 !important;
        display: block !important;
      }
      
      .mobile-optimized.scrolling .panda-decoration,
      .mobile-optimized.scrolling .heart-decoration {
        /* Keep individual pandas and hearts visible */
        visibility: visible !important;
        opacity: 0.12 !important;
        display: block !important;
        animation-play-state: running !important;
        
        /* Optimize rendering during scroll */
        will-change: transform;
        backface-visibility: hidden;
        -webkit-backface-visibility: hidden;
      }
      
      /* Reduce animation complexity during scroll for performance */
      .mobile-optimized.scrolling .panda-decoration {
        animation-duration: 45s !important;
      }
      
      .mobile-optimized.scrolling .heart-decoration {
        animation-duration: 35s !important;
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
        
        // Don't pause panda animations - this was causing them to disappear
        // Instead, just add a CSS class for scroll-specific optimizations
        console.log('🐼 Scroll started - applying scroll optimizations');
      }
      
      clearTimeout(scrollTimeout);
      scrollTimeout = setTimeout(() => {
        isScrolling = false;
        document.body.classList.remove('scrolling');
        
        // Ensure pandas are still visible after scrolling
        this.ensurePandasVisible();
        
        console.log('🐼 Scroll ended - pandas should remain visible');
      }, 150);
    };
    
    if (this.isMobile) {
      window.addEventListener('scroll', handleScrollStart, { passive: true });
      window.addEventListener('touchmove', handleScrollStart, { passive: true });
    }
  }
  
  // New method to ensure pandas remain visible after scrolling
  ensurePandasVisible() {
    const pandas = document.querySelectorAll('.panda-decoration');
    pandas.forEach((panda, index) => {
      // Ensure animation is running
      panda.style.animationPlayState = 'running';
      
      // Ensure visibility
      if (panda.style.display === 'none' || panda.style.visibility === 'hidden') {
        panda.style.display = 'block';
        panda.style.visibility = 'visible';
      }
      
      // Ensure opacity is set
      if (!panda.style.opacity || panda.style.opacity === '0') {
        panda.style.opacity = '0.12';
      }
      
      // Force repaint to ensure visibility
      panda.offsetHeight;
      
      console.log(`🐼 Panda ${index + 1} visibility ensured`);
    });
    
    // If no pandas found, trigger recovery
    if (pandas.length === 0) {
      console.log('🚨 No pandas found after scroll - triggering recovery');
      this.forceEmojiRecovery();
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
  
  // Mobile Browser Emoji Persistence System
  initEmojiPersistenceSystem() {
    if (!this.isMobile) return;
    
    console.log('🐼 Initializing emoji persistence system for mobile browsers...');
    
    this.emojiElements = new Map();
    this.emojiCheckInterval = null;
    this.emojiRecoveryCount = 0;
    
    // Start monitoring emoji elements
    this.startEmojiMonitoring();
    
    // Set up periodic emoji visibility checks
    this.startEmojiVisibilityChecks();
    
    // Add mobile-specific emoji stability protections
    this.addEmojiStabilityProtections();
    
    console.log('✨ Emoji persistence system initialized');
  }
  
  startEmojiMonitoring() {
    // Monitor all emoji elements on the page
    const emojiSelectors = [
      '.panda-decoration',
      '.heart-decoration',
      '.floating-decorations .panda-decoration',
      '.floating-decorations .heart-decoration',
      '.dynamic-panda',
      '.dynamic-heart',
      '.random-floating-element',
      '.sparkle-particle',
      '.heart-particle'
    ];
    
    const observeEmojis = () => {
      emojiSelectors.forEach(selector => {
        const elements = document.querySelectorAll(selector);
        elements.forEach((element, index) => {
          const key = `${selector}-${index}`;
          if (!this.emojiElements.has(key)) {
            this.emojiElements.set(key, {
              element: element,
              selector: selector,
              index: index,
              lastSeen: Date.now(),
              content: element.textContent || element.innerHTML,
              styles: this.captureElementStyles(element)
            });
            
            console.log(`🐼 Monitoring emoji element: ${key}`);
          }
        });
      });
    };
    
    // Initial observation
    observeEmojis();
    
    // Re-observe periodically to catch new elements
    setInterval(observeEmojis, 5000);
  }
  
  captureElementStyles(element) {
    const computedStyle = window.getComputedStyle(element);
    return {
      position: computedStyle.position,
      top: computedStyle.top,
      left: computedStyle.left,
      right: computedStyle.right,
      bottom: computedStyle.bottom,
      fontSize: computedStyle.fontSize,
      opacity: computedStyle.opacity,
      zIndex: computedStyle.zIndex,
      animation: computedStyle.animation,
      transform: computedStyle.transform,
      className: element.className
    };
  }
  
  startEmojiVisibilityChecks() {
    // Check emoji visibility every 10 seconds on mobile
    this.emojiCheckInterval = setInterval(() => {
      this.checkEmojiVisibility();
    }, 10000);
    
    // Also check when page becomes visible again
    document.addEventListener('visibilitychange', () => {
      if (!document.hidden) {
        setTimeout(() => {
          this.checkEmojiVisibility();
        }, 1000);
      }
    });
  }
  
  checkEmojiVisibility() {
    let missingEmojis = 0;
    
    this.emojiElements.forEach((emojiData, key) => {
      const element = emojiData.element;
      
      // Check if element still exists in DOM
      if (!document.contains(element)) {
        console.log(`🚨 Missing emoji detected: ${key}`);
        missingEmojis++;
        this.recoverMissingEmoji(key, emojiData);
        return;
      }
      
      // Check if element is visible
      const rect = element.getBoundingClientRect();
      const isVisible = rect.width > 0 && rect.height > 0 && 
                       window.getComputedStyle(element).opacity !== '0' &&
                       window.getComputedStyle(element).display !== 'none';
      
      if (!isVisible && element.textContent) {
        console.log(`🚨 Invisible emoji detected: ${key}`);
        missingEmojis++;
        this.restoreEmojiVisibility(element, emojiData);
      }
      
      // Update last seen time
      emojiData.lastSeen = Date.now();
    });
    
    if (missingEmojis > 0) {
      console.log(`🔧 Recovered ${missingEmojis} missing emojis`);
      this.emojiRecoveryCount += missingEmojis;
    }
  }
  
  recoverMissingEmoji(key, emojiData) {
    // Recreate the missing emoji element
    const newElement = document.createElement('div');
    newElement.textContent = emojiData.content;
    newElement.className = emojiData.styles.className;
    
    // Restore styles
    Object.keys(emojiData.styles).forEach(property => {
      if (property !== 'className') {
        newElement.style[property] = emojiData.styles[property];
      }
    });
    
    // Find appropriate container
    let container = document.querySelector('.floating-decorations');
    if (!container) {
      container = document.body;
    }
    
    // Add to DOM
    container.appendChild(newElement);
    
    // Update our tracking
    this.emojiElements.set(key, {
      ...emojiData,
      element: newElement,
      lastSeen: Date.now()
    });
    
    console.log(`✅ Recovered emoji: ${key}`);
  }
  
  restoreEmojiVisibility(element, emojiData) {
    // Force visibility restoration
    element.style.opacity = emojiData.styles.opacity || '0.12';
    element.style.display = 'block';
    element.style.visibility = 'visible';
    
    // Ensure content is present
    if (!element.textContent && emojiData.content) {
      element.textContent = emojiData.content;
    }
    
    // Force repaint
    element.offsetHeight;
    
    console.log(`✅ Restored emoji visibility: ${element.className}`);
  }
  
  addEmojiStabilityProtections() {
    // Add CSS to prevent emoji removal
    const style = document.createElement('style');
    style.textContent = `
      .mobile-optimized .panda-decoration,
      .mobile-optimized .floating-decorations .panda-decoration {
        /* Force emoji persistence on mobile */
        will-change: auto !important;
        contain: none !important;
        
        /* Prevent mobile browser cleanup */
        -webkit-backface-visibility: visible !important;
        backface-visibility: visible !important;
        
        /* Ensure font loading stability */
        font-display: swap;
        font-family: "Apple Color Emoji", "Segoe UI Emoji", "Noto Color Emoji", sans-serif;
        
        /* Prevent disappearance during animations */
        animation-fill-mode: both !important;
        
        /* Mobile-specific stability */
        -webkit-transform: translateZ(0) !important;
        transform: translateZ(0) !important;
        
        /* Prevent removal by garbage collection */
        pointer-events: none !important;
        user-select: none !important;
        -webkit-user-select: none !important;
      }
      
      /* Ensure emoji containers are stable */
      .mobile-optimized .floating-decorations {
        /* Prevent container cleanup */
        min-height: 1px;
        position: relative;
        z-index: 1;
        
        /* Force layer creation */
        will-change: auto;
        contain: layout;
      }
      
      /* Mobile browser specific fixes */
      .chrome-mobile .panda-decoration,
      .opera-mobile .panda-decoration {
        /* Prevent Chrome/Opera mobile cleanup */
        -webkit-font-feature-settings: "liga" 1;
        font-feature-settings: "liga" 1;
        
        /* Force emoji rendering */
        text-rendering: optimizeQuality;
        -webkit-text-stroke: 0.01px transparent;
      }
      
      /* Additional mobile emoji stability */
      .mobile-optimized .panda-decoration::before {
        content: '';
        position: absolute;
        width: 1px;
        height: 1px;
        opacity: 0;
        pointer-events: none;
      }
      
      /* Force emoji font preloading */
      .mobile-optimized::after {
        content: '🐼💕✨🎉';
        position: absolute;
        left: -9999px;
        top: -9999px;
        opacity: 0;
        font-size: 1px;
        pointer-events: none;
      }
    `;
    document.head.appendChild(style);
    
    // Preload emoji fonts
    this.preloadEmojiFonts();
    
    // Add mutation observer to detect DOM changes
    this.addDOMMutationProtection();
  }
  
  preloadEmojiFonts() {
    // Create hidden element to force emoji font loading
    const emojiPreloader = document.createElement('div');
    emojiPreloader.style.cssText = `
      position: absolute;
      left: -9999px;
      top: -9999px;
      opacity: 0;
      font-size: 1px;
      pointer-events: none;
      font-family: "Apple Color Emoji", "Segoe UI Emoji", "Noto Color Emoji", sans-serif;
    `;
    emojiPreloader.textContent = '🐼💕✨🎉🌿💚';
    document.body.appendChild(emojiPreloader);
    
    // Force font loading with different sizes
    const sizes = ['12px', '16px', '20px', '24px'];
    sizes.forEach(size => {
      const testElement = document.createElement('span');
      testElement.style.cssText = `
        position: absolute;
        left: -9999px;
        top: -9999px;
        opacity: 0;
        font-size: ${size};
        font-family: "Apple Color Emoji", "Segoe UI Emoji", "Noto Color Emoji", sans-serif;
      `;
      testElement.textContent = '🐼';
      document.body.appendChild(testElement);
      
      // Remove after font is loaded
      setTimeout(() => {
        if (testElement.parentNode) {
          testElement.parentNode.removeChild(testElement);
        }
      }, 3000);
    });
    
    console.log('🔤 Emoji fonts preloaded for mobile stability');
  }
  
  addDOMMutationProtection() {
    const observer = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        if (mutation.type === 'childList') {
          // Check if any emoji elements were removed
          mutation.removedNodes.forEach((node) => {
            if (node.nodeType === Node.ELEMENT_NODE) {
              const removedEmojis = node.querySelectorAll('.panda-decoration, .dynamic-panda');
              if (removedEmojis.length > 0 || node.classList.contains('panda-decoration')) {
                console.log('🚨 Emoji element removed by DOM mutation, scheduling recovery...');
                setTimeout(() => {
                  this.checkEmojiVisibility();
                }, 1000);
              }
            }
          });
        }
      });
    });
    
    // Observe the entire document for changes
    observer.observe(document.body, {
      childList: true,
      subtree: true
    });
    
    console.log('🛡️ DOM mutation protection enabled for emojis');
  }
  
  // Method to manually trigger emoji recovery
  forceEmojiRecovery() {
    console.log('🔧 Forcing emoji recovery...');
    this.checkEmojiVisibility();
    
    // Also recreate base floating pandas if missing
    const floatingContainer = document.querySelector('.floating-decorations');
    if (floatingContainer) {
      const existingPandas = floatingContainer.querySelectorAll('.panda-decoration, .dynamic-panda');
      const existingHearts = floatingContainer.querySelectorAll('.heart-decoration, .dynamic-heart');
      
      console.log(`🐼 Found ${existingPandas.length} pandas and ${existingHearts.length} hearts`);
      
      if (existingPandas.length < 5) {
        console.log('🐼 Recreating base floating pandas...');
        this.recreateBasePandas(floatingContainer);
      }
      
      if (existingHearts.length < 3) {
        console.log('💕 Recreating base floating hearts...');
        this.recreateBaseHearts(floatingContainer);
      }
      
      // Force animation manager to reinitialize if available
      if (window.animationManager && window.animationManager.initFloatingPandas) {
        console.log('🔄 Reinitializing animation manager floating pandas...');
        window.animationManager.initFloatingPandas();
      }
    }
  }
  
  recreateBasePandas(container) {
    const pandaPositions = [
      { top: '15%', left: '85%', delay: '0s' },
      { top: '60%', left: '8%', delay: '10s' },
      { top: '35%', right: '12%', delay: '20s' },
      { top: '80%', left: '70%', delay: '30s' },
      { top: '25%', right: '30%', delay: '40s' }
    ];
    
    pandaPositions.forEach((pos, index) => {
      const panda = document.createElement('div');
      panda.className = 'panda-decoration recovery-panda dynamic-panda';
      panda.textContent = '🐼';
      
      // Apply positioning
      Object.keys(pos).forEach(key => {
        if (key !== 'delay') {
          panda.style[key] = pos[key];
        }
      });
      
      // Add animation
      panda.style.animationDelay = pos.delay;
      panda.style.animationDuration = '30s';
      panda.style.opacity = '0.15';
      panda.style.animationName = 'romanticFloatingPandas';
      panda.style.animationIterationCount = 'infinite';
      panda.style.animationTimingFunction = 'linear';
      
      container.appendChild(panda);
      
      console.log(`✅ Recreated base panda ${index + 1}`);
    });
  }
  
  recreateBaseHearts(container) {
    const heartPositions = [
      { top: '20%', left: '20%', delay: '5s', emoji: '💕' },
      { top: '50%', right: '25%', delay: '15s', emoji: '💖' },
      { top: '75%', left: '60%', delay: '25s', emoji: '💗' }
    ];
    
    heartPositions.forEach((pos, index) => {
      const heart = document.createElement('div');
      heart.className = 'heart-decoration recovery-heart dynamic-heart';
      heart.textContent = pos.emoji;
      
      // Apply positioning
      Object.keys(pos).forEach(key => {
        if (key !== 'delay' && key !== 'emoji') {
          heart.style[key] = pos[key];
        }
      });
      
      // Add animation
      heart.style.animationDelay = pos.delay;
      heart.style.animationDuration = '25s';
      heart.style.opacity = '0.12';
      heart.style.animationName = 'romanticFloatingHearts';
      heart.style.animationIterationCount = 'infinite';
      heart.style.animationTimingFunction = 'linear';
      
      container.appendChild(heart);
      
      console.log(`✅ Recreated base heart ${index + 1}`);
    });
  }
  
  // Cleanup method
  destroyEmojiPersistenceSystem() {
    if (this.emojiCheckInterval) {
      clearInterval(this.emojiCheckInterval);
      this.emojiCheckInterval = null;
    }
    
    this.emojiElements.clear();
    console.log('🐼 Emoji persistence system destroyed');
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
    
    // Add global emoji recovery function for debugging
    window.recoverEmojis = () => {
      if (mobilePerformanceManager.forceEmojiRecovery) {
        mobilePerformanceManager.forceEmojiRecovery();
      }
    };
    
    // Add debug function to check panda status
    window.checkPandas = () => {
      const pandas = document.querySelectorAll('.panda-decoration, .dynamic-panda');
      const hearts = document.querySelectorAll('.heart-decoration, .dynamic-heart');
      const container = document.querySelector('.floating-decorations');
      
      console.log('🐼 Panda Status Report:');
      console.log(`📊 Found ${pandas.length} pandas and ${hearts.length} hearts`);
      console.log(`📦 Container height: ${container ? container.style.height || 'auto' : 'not found'}`);
      console.log(`📱 Mobile optimized: ${document.body.classList.contains('mobile-optimized')}`);
      console.log(`🔄 Scrolling: ${document.body.classList.contains('scrolling')}`);
      
      pandas.forEach((panda, index) => {
        const rect = panda.getBoundingClientRect();
        const isVisible = rect.width > 0 && rect.height > 0 && 
                         window.getComputedStyle(panda).opacity !== '0' &&
                         window.getComputedStyle(panda).display !== 'none';
        console.log(`🐼 Panda ${index + 1}: ${isVisible ? '✅ Visible' : '❌ Hidden'} - Top: ${panda.style.top}, Animation: ${panda.style.animationName || 'default'}`);
      });
      
      hearts.forEach((heart, index) => {
        const rect = heart.getBoundingClientRect();
        const isVisible = rect.width > 0 && rect.height > 0 && 
                         window.getComputedStyle(heart).opacity !== '0' &&
                         window.getComputedStyle(heart).display !== 'none';
        console.log(`💕 Heart ${index + 1}: ${isVisible ? '✅ Visible' : '❌ Hidden'} - Top: ${heart.style.top}, Animation: ${heart.style.animationName || 'default'}`);
      });
      
      return { pandas: pandas.length, hearts: hearts.length, container: !!container };
    };
    
    console.log('🎉 Mobile performance manager initialized successfully!');
    console.log('💡 Use window.recoverEmojis() to manually recover missing emojis');
    console.log('🔍 Use window.checkPandas() to check panda status');
  } catch (error) {
    console.error('❌ Error initializing mobile performance manager:', error);
  }
});

// Export for use in other modules
if (typeof module !== 'undefined' && module.exports) {
  module.exports = MobilePerformanceManager;
}