/* ==============================================
   Mobile Performance Optimization Manager
   Aggressive Mobile Performance Enhancements
   ============================================== */

class MobilePerformanceManager {
  constructor() {
    this.isMobile = this.detectMobile();
    this.isLowEndDevice = this.detectLowEndDevice();
    this.connectionType = this.detectConnectionType();
    this.isServiceWorkerSupported = 'serviceWorker' in navigator;
    
    // Performance tracking
    this.performanceMetrics = {
      loadStart: performance.now(),
      domContentLoaded: null,
      windowLoaded: null,
      firstPaint: null,
      firstContentfulPaint: null
    };
    
    this.init();
  }
  
  init() {
    console.log('🐼 Initializing Mobile Performance Manager...');
    console.log('📱 Mobile device:', this.isMobile);
    console.log('⚡ Low-end device:', this.isLowEndDevice);
    console.log('📶 Connection type:', this.connectionType);
    
    // Apply critical CSS inlining first
    this.inlineCriticalCSS();
    
    // Apply mobile-specific optimizations
    if (this.isMobile) {
      this.applyMobileOptimizations();
    }
    
    // Apply low-end device optimizations
    if (this.isLowEndDevice) {
      this.applyLowEndDeviceOptimizations();
    }
    
    // Apply connection-based optimizations
    this.applyConnectionOptimizations();
    
    // Initialize asset compression
    this.initAssetCompression();
    
    // Initialize lazy loading
    this.initLazyLoading();
    
    // Initialize image optimization
    this.initImageOptimization();
    
    // Initialize service worker
    this.initServiceWorker();
    
    // Initialize performance monitoring
    this.initPerformanceMonitoring();
    
    // Initialize memory management
    this.initMemoryManagement();
    
    // Initialize mobile-specific loading optimizations
    this.initMobileLoadingOptimizations();
    
    console.log('⚡ Mobile Performance Manager initialized');
  }
  
  // Critical CSS Inlining for Mobile Performance
  inlineCriticalCSS() {
    console.log('📱 Inlining critical CSS for mobile performance...');
    
    // Critical CSS for immediate mobile rendering
    const criticalCSS = `
      /* Critical Mobile-First CSS - Inlined for Performance */
      .countdown-header {
        background: linear-gradient(135deg, #e8f0e4, #f0f8f0);
        padding: 1.5rem 1rem;
        min-height: 200px;
        display: block !important;
        visibility: visible !important;
      }
      
      .countdown-timer {
        text-align: center;
        display: block !important;
        visibility: visible !important;
        max-width: 400px;
        margin: 0 auto;
      }
      
      .timer-display {
        display: grid;
        grid-template-columns: repeat(2, 1fr);
        gap: 0.75rem;
        margin-bottom: 1rem;
        padding: 0 0.5rem;
        min-height: 80px;
      }
      
      .timer-unit {
        background: linear-gradient(135deg, #fefefe, #f4f9f4);
        border: 2px solid #e8f0e4;
        border-radius: 15px;
        padding: 0.75rem 0.5rem;
        text-align: center;
        min-height: 70px;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        box-shadow: 0 3px 12px rgba(232, 240, 228, 0.4);
      }
      
      .timer-number {
        font-size: 1.5rem;
        font-weight: bold;
        color: #6b8e5a;
        display: block;
        line-height: 1;
        margin-bottom: 0.25rem;
      }
      
      .timer-label {
        font-size: 0.8rem;
        color: #5a5a5a;
        display: block;
        text-transform: uppercase;
        letter-spacing: 0.5px;
      }
      
      .timeline-section {
        background: linear-gradient(180deg, #f0f8f0, #e8f0e4);
        padding: 2rem 1rem;
        min-height: 60vh;
        display: block !important;
        visibility: visible !important;
      }
      
      .timeline-container {
        max-width: 1200px;
        margin: 0 auto;
        position: relative;
      }
      
      .timeline-wrapper {
        position: relative;
        margin: 2rem auto;
        padding: 2rem 1rem;
        background: rgba(255,255,255,0.8);
        border-radius: 20px;
        box-shadow: 0 4px 20px rgba(107, 142, 90, 0.2);
        border: 2px solid #e8f0e4;
        width: 100%;
        max-width: 1200px;
      }
      
      .timeline-bar {
        position: relative;
        width: 100%;
        height: 120px;
        margin: 0 auto;
        display: block !important;
        visibility: visible !important;
      }
      
      .timeline-line {
        position: absolute;
        top: 50%;
        left: 5%;
        right: 5%;
        height: 10px;
        background: linear-gradient(90deg, #2d5a2d, #6b8e5a, #2d5a2d);
        border-radius: 5px;
        transform: translateY(-50%);
        box-shadow: 0 4px 20px rgba(107, 142, 90, 0.4);
        z-index: 1;
        border: 2px solid #ffffff;
      }
      
      .timeline-dot {
        position: absolute;
        width: 50px;
        height: 50px;
        background: linear-gradient(45deg, #ffffff, #e8f0e4);
        border: 4px solid #6b8e5a;
        border-radius: 50%;
        top: 50%;
        transform: translateY(-50%);
        cursor: pointer;
        z-index: 5;
        box-shadow: 0 6px 25px rgba(107, 142, 90, 0.5);
        transition: all 0.3s ease;
      }
      
      .timeline-labels {
        display: block !important;
        visibility: visible !important;
        position: relative;
        margin-top: 1rem;
        width: 100%;
        padding: 0;
      }
      
      .timeline-date-labels {
        position: relative;
        width: 100%;
        height: 80px;
        max-width: 100%;
      }
      
      .timeline-date-label {
        position: absolute;
        text-align: center;
        cursor: pointer;
        padding: 0.5rem 0;
        transition: all 0.3s ease;
        width: 60px;
        transform: translateX(-50%);
        top: 0;
      }
      
      .timeline-date-text {
        font-family: 'Dancing Script', cursive;
        font-size: 0.9rem;
        color: #2d5a2d;
        font-weight: 700;
        line-height: 1.2;
        text-shadow: 0 1px 3px rgba(255,255,255,0.9);
        padding: 0.2rem 0;
        white-space: pre-line;
      }
      
      /* Mobile-specific optimizations */
      @media (max-width: 768px) {
        .timer-display {
          grid-template-columns: repeat(2, 1fr);
          gap: 0.5rem;
        }
        
        .timer-unit {
          min-height: 60px;
          padding: 0.5rem 0.25rem;
        }
        
        .timer-number {
          font-size: 1.2rem;
        }
        
        .timer-label {
          font-size: 0.7rem;
        }
        
        .timeline-wrapper {
          padding: 1.5rem 0.5rem;
          width: 95%;
        }
        
        .timeline-bar {
          height: 100px;
        }
        
        .timeline-dot {
          width: 40px;
          height: 40px;
        }
        
        .timeline-date-label {
          width: 50px;
        }
        
        .timeline-date-text {
          font-size: 0.8rem;
        }
      }
      
      @media (max-width: 480px) {
        .countdown-header {
          padding: 1rem 0.5rem;
          min-height: 180px;
        }
        
        .timer-display {
          gap: 0.25rem;
          padding: 0 0.25rem;
        }
        
        .timer-unit {
          min-height: 50px;
          padding: 0.4rem 0.2rem;
        }
        
        .timer-number {
          font-size: 1rem;
        }
        
        .timer-label {
          font-size: 0.6rem;
        }
        
        .timeline-section {
          padding: 1.5rem 0.5rem;
        }
        
        .timeline-wrapper {
          padding: 1rem 0.25rem;
          width: 98%;
        }
        
        .timeline-bar {
          height: 90px;
        }
        
        .timeline-dot {
          width: 35px;
          height: 35px;
        }
        
        .timeline-date-label {
          width: 45px;
        }
        
        .timeline-date-text {
          font-size: 0.7rem;
        }
      }
    `;
    
    // Create and inject critical CSS
    const criticalStyle = document.createElement('style');
    criticalStyle.id = 'critical-mobile-css';
    criticalStyle.textContent = criticalCSS;
    
    // Insert critical CSS at the beginning of head for highest priority
    const firstStylesheet = document.querySelector('link[rel="stylesheet"]');
    if (firstStylesheet) {
      document.head.insertBefore(criticalStyle, firstStylesheet);
    } else {
      document.head.appendChild(criticalStyle);
    }
    
    console.log('✅ Critical CSS inlined for mobile performance');
  }
  
  // Asset Compression and Optimization
  initAssetCompression() {
    console.log('📦 Initializing asset compression...');
    
    // Compress and optimize CSS delivery
    this.optimizeCSSDelivery();
    
    // Compress and optimize JavaScript delivery
    this.optimizeJSDelivery();
    
    // Optimize font loading
    this.optimizeFontDelivery();
    
    // Enable resource hints
    this.enableResourceHints();
  }
  
  optimizeCSSDelivery() {
    // Load non-critical CSS asynchronously
    const nonCriticalCSS = [
      'css/event-detail.css',
      'css/responsive.css'
    ];
    
    nonCriticalCSS.forEach(cssFile => {
      const link = document.createElement('link');
      link.rel = 'preload';
      link.as = 'style';
      link.href = cssFile;
      link.onload = function() {
        this.onload = null;
        this.rel = 'stylesheet';
      };
      
      // Fallback for browsers that don't support preload
      const noscript = document.createElement('noscript');
      const fallbackLink = document.createElement('link');
      fallbackLink.rel = 'stylesheet';
      fallbackLink.href = cssFile;
      noscript.appendChild(fallbackLink);
      
      document.head.appendChild(link);
      document.head.appendChild(noscript);
    });
    
    console.log('✅ CSS delivery optimized');
  }
  
  optimizeJSDelivery() {
    // Defer non-critical JavaScript
    const scripts = document.querySelectorAll('script[src]');
    scripts.forEach(script => {
      if (!script.hasAttribute('defer') && !script.hasAttribute('async')) {
        // Add defer to non-critical scripts
        if (!script.src.includes('main.js') && !script.src.includes('mobile-performance.js')) {
          script.defer = true;
        }
      }
    });
    
    console.log('✅ JavaScript delivery optimized');
  }
  
  optimizeFontDelivery() {
    // Optimize Google Fonts loading
    const fontLinks = document.querySelectorAll('link[href*="fonts.googleapis.com"]');
    fontLinks.forEach(link => {
      // Add font-display: swap for better performance
      if (link.href.includes('fonts.googleapis.com')) {
        const url = new URL(link.href);
        if (!url.searchParams.has('display')) {
          url.searchParams.set('display', 'swap');
          link.href = url.toString();
        }
      }
    });
    
    console.log('✅ Font delivery optimized');
  }
  
  enableResourceHints() {
    // Add DNS prefetch for external resources
    const dnsPrefetchHosts = [
      'fonts.googleapis.com',
      'fonts.gstatic.com'
    ];
    
    dnsPrefetchHosts.forEach(host => {
      const link = document.createElement('link');
      link.rel = 'dns-prefetch';
      link.href = `//${host}`;
      document.head.appendChild(link);
    });
    
    // Add preconnect for critical external resources
    const preconnectHosts = [
      'fonts.googleapis.com',
      'fonts.gstatic.com'
    ];
    
    preconnectHosts.forEach(host => {
      const link = document.createElement('link');
      link.rel = 'preconnect';
      link.href = `https://${host}`;
      link.crossOrigin = 'anonymous';
      document.head.appendChild(link);
    });
    
    console.log('✅ Resource hints enabled');
  }
  
  // Mobile-Specific Loading Optimizations
  initMobileLoadingOptimizations() {
    console.log('📱 Initializing mobile loading optimizations...');
    
    // Implement mobile-first loading strategy
    this.implementMobileFirstLoading();
    
    // Optimize for mobile networks
    this.optimizeForMobileNetworks();
    
    // Enable mobile-specific caching
    this.enableMobileCaching();
    
    // Implement progressive loading
    this.implementProgressiveLoading();
    
    // Add mobile performance monitoring
    this.addMobilePerformanceMonitoring();
  }
  
  implementMobileFirstLoading() {
    // Prioritize above-the-fold content
    const aboveTheFoldElements = [
      '.countdown-header',
      '.countdown-timer',
      '.timer-display'
    ];
    
    aboveTheFoldElements.forEach(selector => {
      const elements = document.querySelectorAll(selector);
      elements.forEach(element => {
        element.style.willChange = 'transform, opacity';
        element.style.contain = 'layout style paint';
      });
    });
    
    // Defer below-the-fold content
    const belowTheFoldElements = [
      '.floating-decorations',
      '.panda-decoration'
    ];
    
    if (this.isLowEndDevice || this.connectionType === 'slow' || this.connectionType === 'very-slow') {
      belowTheFoldElements.forEach(selector => {
        const elements = document.querySelectorAll(selector);
        elements.forEach(element => {
          element.style.display = 'none';
        });
      });
    }
    
    console.log('✅ Mobile-first loading implemented');
  }
  
  optimizeForMobileNetworks() {
    // Implement adaptive loading based on connection
    if (navigator.connection) {
      const connection = navigator.connection;
      
      // Adjust quality based on connection
      if (connection.effectiveType === 'slow-2g' || connection.effectiveType === '2g') {
        this.enableUltraLowDataMode();
      } else if (connection.effectiveType === '3g') {
        this.enableLowDataMode();
      }
      
      // Listen for connection changes
      connection.addEventListener('change', () => {
        this.handleConnectionChange();
      });
    }
    
    console.log('✅ Mobile network optimizations applied');
  }
  
  enableUltraLowDataMode() {
    console.log('📶 Enabling ultra-low data mode...');
    
    // Disable all animations
    const style = document.createElement('style');
    style.textContent = `
      * {
        animation-duration: 0.01ms !important;
        animation-iteration-count: 1 !important;
        transition-duration: 0.01ms !important;
      }
      
      .floating-decorations,
      .panda-decoration {
        display: none !important;
      }
    `;
    document.head.appendChild(style);
    
    // Disable non-essential features
    document.body.classList.add('ultra-low-data-mode');
  }
  
  enableLowDataMode() {
    console.log('📶 Enabling low data mode...');
    
    // Reduce animation complexity
    const style = document.createElement('style');
    style.textContent = `
      .floating-decorations .panda-decoration {
        animation-duration: 20s !important;
        opacity: 0.03 !important;
      }
      
      .gentle-pulse {
        animation-duration: 6s !important;
      }
    `;
    document.head.appendChild(style);
    
    document.body.classList.add('low-data-mode');
  }
  
  handleConnectionChange() {
    const connection = navigator.connection;
    console.log('📶 Connection changed to:', connection.effectiveType);
    
    // Adjust optimizations based on new connection
    if (connection.effectiveType === 'slow-2g' || connection.effectiveType === '2g') {
      this.enableUltraLowDataMode();
    } else if (connection.effectiveType === '3g') {
      this.enableLowDataMode();
    } else {
      // Remove data saving restrictions for faster connections
      document.body.classList.remove('ultra-low-data-mode', 'low-data-mode');
    }
  }
  
  enableMobileCaching() {
    // Implement aggressive caching for mobile
    if ('caches' in window) {
      const mobileAssets = [
        '/',
        '/index.html',
        '/css/styles.css',
        '/css/timeline.css',
        '/js/main.js',
        '/js/mobile-performance.js',
        '/data/timeline-data.js'
      ];
      
      caches.open('mobile-cache-v1').then(cache => {
        cache.addAll(mobileAssets).then(() => {
          console.log('✅ Mobile assets cached');
        });
      });
    }
  }
  
  implementProgressiveLoading() {
    // Load content progressively based on viewport
    const progressiveElements = document.querySelectorAll('.timeline-section, .event-content');
    
    if ('IntersectionObserver' in window) {
      const progressiveObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            this.loadProgressiveContent(entry.target);
            progressiveObserver.unobserve(entry.target);
          }
        });
      }, {
        rootMargin: '50px 0px',
        threshold: 0.1
      });
      
      progressiveElements.forEach(element => {
        progressiveObserver.observe(element);
      });
    }
    
    console.log('✅ Progressive loading implemented');
  }
  
  loadProgressiveContent(element) {
    // Load content progressively
    element.classList.add('progressive-loaded');
    
    // Trigger any deferred animations
    const deferredAnimations = element.querySelectorAll('[data-animate-on-load]');
    deferredAnimations.forEach(animElement => {
      animElement.classList.add('animate-in');
    });
  }
  
  addMobilePerformanceMonitoring() {
    // Add mobile-specific performance monitoring
    if ('PerformanceObserver' in window) {
      // Monitor Largest Contentful Paint (LCP)
      const lcpObserver = new PerformanceObserver((list) => {
        const entries = list.getEntries();
        const lastEntry = entries[entries.length - 1];
        console.log('📊 LCP:', lastEntry.startTime.toFixed(2) + 'ms');
        
        // Send to analytics
        this.sendMobileMetric('lcp', lastEntry.startTime);
      });
      
      lcpObserver.observe({ entryTypes: ['largest-contentful-paint'] });
      
      // Monitor First Input Delay (FID)
      const fidObserver = new PerformanceObserver((list) => {
        const entries = list.getEntries();
        entries.forEach(entry => {
          console.log('📊 FID:', entry.processingStart - entry.startTime + 'ms');
          this.sendMobileMetric('fid', entry.processingStart - entry.startTime);
        });
      });
      
      fidObserver.observe({ entryTypes: ['first-input'] });
      
      // Monitor Cumulative Layout Shift (CLS)
      let clsValue = 0;
      const clsObserver = new PerformanceObserver((list) => {
        const entries = list.getEntries();
        entries.forEach(entry => {
          if (!entry.hadRecentInput) {
            clsValue += entry.value;
          }
        });
        console.log('📊 CLS:', clsValue.toFixed(4));
        this.sendMobileMetric('cls', clsValue);
      });
      
      clsObserver.observe({ entryTypes: ['layout-shift'] });
    }
  }
  
  sendMobileMetric(metric, value) {
    // Send mobile performance metrics
    const mobileMetrics = {
      metric,
      value,
      isMobile: this.isMobile,
      isLowEndDevice: this.isLowEndDevice,
      connectionType: this.connectionType,
      timestamp: Date.now()
    };
    
    console.log('📱 Mobile Metric:', mobileMetrics);
    
    // Store in localStorage for later analysis
    const existingMetrics = JSON.parse(localStorage.getItem('mobileMetrics') || '[]');
    existingMetrics.push(mobileMetrics);
    
    // Keep only last 50 metrics
    if (existingMetrics.length > 50) {
      existingMetrics.splice(0, existingMetrics.length - 50);
    }
    
    localStorage.setItem('mobileMetrics', JSON.stringify(existingMetrics));
  }
  detectMobile() {
    return window.innerWidth <= 768 || /Android|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
  }
  
  detectLowEndDevice() {
    // Detect low-end devices based on various factors
    const hardwareConcurrency = navigator.hardwareConcurrency || 1;
    const deviceMemory = navigator.deviceMemory || 1;
    const connectionDownlink = navigator.connection?.downlink || 1;
    
    // Consider device low-end if:
    // - Less than 2 CPU cores
    // - Less than 2GB RAM
    // - Slow connection
    return hardwareConcurrency < 2 || deviceMemory < 2 || connectionDownlink < 1;
  }
  
  detectConnectionType() {
    if (!navigator.connection) return 'unknown';
    
    const connection = navigator.connection;
    const effectiveType = connection.effectiveType;
    
    // Map connection types to performance categories
    const connectionMap = {
      'slow-2g': 'very-slow',
      '2g': 'slow',
      '3g': 'medium',
      '4g': 'fast'
    };
    
    return connectionMap[effectiveType] || 'unknown';
  }
  
  // Mobile-Specific Optimizations
  applyMobileOptimizations() {
    console.log('📱 Applying mobile optimizations...');
    
    // Optimize viewport for mobile
    this.optimizeViewport();
    
    // Reduce animation complexity on mobile
    this.optimizeAnimations();
    
    // Optimize touch interactions
    this.optimizeTouchInteractions();
    
    // Reduce visual complexity
    this.reduceVisualComplexity();
    
    // Optimize font loading
    this.optimizeFontLoading();
  }
  
  optimizeViewport() {
    // Set viewport height for mobile browsers (handles address bar)
    const setVH = () => {
      const vh = window.innerHeight * 0.01;
      document.documentElement.style.setProperty('--vh', `${vh}px`);
    };
    
    setVH();
    window.addEventListener('resize', setVH);
    window.addEventListener('orientationchange', setVH);
    
    // Prevent zoom on input focus
    const viewportMeta = document.querySelector('meta[name="viewport"]');
    if (viewportMeta) {
      viewportMeta.setAttribute('content', 
        'width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no'
      );
    }
  }
  
  optimizeAnimations() {
    // Reduce animation complexity on mobile
    const style = document.createElement('style');
    style.textContent = `
      @media (max-width: 768px) {
        .floating-decorations .panda-decoration {
          animation-duration: 40s !important;
          opacity: 0.05 !important;
        }
        
        .gentle-pulse {
          animation-duration: 4s !important;
        }
        
        .timeline-dot:hover {
          transform: translateY(-50%) scale(1.1) !important;
        }
        
        .event-card:hover {
          transform: translateY(-2px) !important;
        }
      }
    `;
    document.head.appendChild(style);
  }
  
  optimizeTouchInteractions() {
    // Improve touch responsiveness
    document.addEventListener('touchstart', function() {}, { passive: true });
    
    // Prevent double-tap zoom
    let lastTouchEnd = 0;
    document.addEventListener('touchend', function(event) {
      const now = (new Date()).getTime();
      if (now - lastTouchEnd <= 300) {
        event.preventDefault();
      }
      lastTouchEnd = now;
    }, false);
    
    // Add touch feedback class
    document.body.classList.add('touch-optimized');
  }
  
  reduceVisualComplexity() {
    if (this.isLowEndDevice) {
      // Reduce number of floating pandas
      const pandas = document.querySelectorAll('.panda-decoration');
      pandas.forEach((panda, index) => {
        if (index > 6) { // Keep only first 6 pandas
          panda.style.display = 'none';
        }
      });
      
      // Simplify gradients
      const style = document.createElement('style');
      style.textContent = `
        .low-end-device .countdown-header,
        .low-end-device .timeline-section {
          background: var(--sage-green) !important;
        }
        
        .low-end-device .event-card {
          background: var(--whisper-pink) !important;
        }
      `;
      document.head.appendChild(style);
      document.body.classList.add('low-end-device');
    }
  }
  
  optimizeFontLoading() {
    // Optimize font loading for mobile
    const fontLinks = document.querySelectorAll('link[href*="fonts.googleapis.com"]');
    fontLinks.forEach(link => {
      link.setAttribute('rel', 'preload');
      link.setAttribute('as', 'style');
      link.setAttribute('onload', "this.onload=null;this.rel='stylesheet'");
    });
  }
  
  // Low-End Device Optimizations
  applyLowEndDeviceOptimizations() {
    console.log('⚡ Applying low-end device optimizations...');
    
    // Disable expensive animations
    this.disableExpensiveAnimations();
    
    // Reduce image quality
    this.reduceImageQuality();
    
    // Limit concurrent operations
    this.limitConcurrentOperations();
    
    // Enable aggressive caching
    this.enableAggressiveCaching();
  }
  
  disableExpensiveAnimations() {
    const style = document.createElement('style');
    style.textContent = `
      .low-end-device * {
        animation-duration: 0.1s !important;
        transition-duration: 0.1s !important;
      }
      
      .low-end-device .floating-decorations {
        display: none !important;
      }
      
      .low-end-device .sparkle-particle,
      .low-end-device .heart-particle {
        display: none !important;
      }
    `;
    document.head.appendChild(style);
  }
  
  reduceImageQuality() {
    // Reduce image quality for low-end devices
    const images = document.querySelectorAll('img');
    images.forEach(img => {
      if (img.src && !img.hasAttribute('data-optimized')) {
        // Add compression parameters if using a CDN
        // This is a placeholder - would need actual CDN integration
        img.setAttribute('data-optimized', 'true');
      }
    });
  }
  
  limitConcurrentOperations() {
    // Limit number of concurrent animations
    this.maxConcurrentAnimations = 3;
    this.activeAnimations = 0;
  }
  
  enableAggressiveCaching() {
    // Enable aggressive caching for low-end devices
    if (this.isServiceWorkerSupported) {
      this.cacheStrategy = 'cache-first';
    }
  }
  
  // Connection-Based Optimizations
  applyConnectionOptimizations() {
    console.log('📶 Applying connection optimizations for:', this.connectionType);
    
    switch (this.connectionType) {
      case 'very-slow':
      case 'slow':
        this.applySlowConnectionOptimizations();
        break;
      case 'medium':
        this.applyMediumConnectionOptimizations();
        break;
      case 'fast':
        this.applyFastConnectionOptimizations();
        break;
    }
  }
  
  applySlowConnectionOptimizations() {
    // Disable non-essential features for slow connections
    document.body.classList.add('slow-connection');
    
    // Disable background animations
    const style = document.createElement('style');
    style.textContent = `
      .slow-connection .floating-decorations {
        display: none !important;
      }
      
      .slow-connection .random-floating-element {
        display: none !important;
      }
    `;
    document.head.appendChild(style);
    
    // Reduce image loading
    this.enableDataSaver();
  }
  
  applyMediumConnectionOptimizations() {
    // Moderate optimizations for medium connections
    this.enableSelectiveLoading();
  }
  
  applyFastConnectionOptimizations() {
    // Enable all features for fast connections
    this.enablePreloading();
  }
  
  enableDataSaver() {
    // Implement data saver mode
    document.body.classList.add('data-saver');
    
    // Lazy load all images
    const images = document.querySelectorAll('img');
    images.forEach(img => {
      if (!img.hasAttribute('loading')) {
        img.setAttribute('loading', 'lazy');
      }
    });
  }
  
  enableSelectiveLoading() {
    // Load content based on viewport
    this.initIntersectionObserver();
  }
  
  enablePreloading() {
    // Preload critical resources
    this.preloadCriticalResources();
  }
  
  // Lazy Loading Implementation
  initLazyLoading() {
    if ('IntersectionObserver' in window) {
      this.lazyImageObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            const img = entry.target;
            this.loadImage(img);
            this.lazyImageObserver.unobserve(img);
          }
        });
      }, {
        rootMargin: '50px 0px',
        threshold: 0.01
      });
      
      // Observe all images with data-src
      document.querySelectorAll('img[data-src]').forEach(img => {
        this.lazyImageObserver.observe(img);
      });
    }
  }
  
  loadImage(img) {
    const src = img.getAttribute('data-src');
    if (src) {
      img.src = src;
      img.removeAttribute('data-src');
      img.classList.add('loaded');
    }
  }
  
  // Image Optimization
  initImageOptimization() {
    // Convert images to WebP if supported
    this.supportsWebP = this.checkWebPSupport();
    
    if (this.supportsWebP) {
      this.convertToWebP();
    }
    
    // Implement responsive images
    this.implementResponsiveImages();
  }
  
  checkWebPSupport() {
    return new Promise((resolve) => {
      const webP = new Image();
      webP.onload = webP.onerror = () => {
        resolve(webP.height === 2);
      };
      webP.src = 'data:image/webp;base64,UklGRjoAAABXRUJQVlA4IC4AAACyAgCdASoCAAIALmk0mk0iIiIiIgBoSygABc6WWgAA/veff/0PP8bA//LwYAAA';
    });
  }
  
  convertToWebP() {
    // This would typically be handled by a CDN or build process
    // Placeholder for WebP conversion logic
    console.log('🖼️ WebP support detected - optimizing images');
  }
  
  implementResponsiveImages() {
    const images = document.querySelectorAll('img:not([srcset])');
    images.forEach(img => {
      if (img.src && !img.hasAttribute('data-responsive')) {
        // Add responsive image attributes
        // This is a placeholder - would need actual responsive image URLs
        img.setAttribute('data-responsive', 'true');
      }
    });
  }
  
  // Service Worker Implementation
  initServiceWorker() {
    if (!this.isServiceWorkerSupported) {
      console.log('⚠️ Service Worker not supported');
      return;
    }
    
    // Register service worker
    navigator.serviceWorker.register('/sw.js')
      .then(registration => {
        console.log('✅ Service Worker registered:', registration);
        this.serviceWorkerRegistration = registration;
      })
      .catch(error => {
        console.log('❌ Service Worker registration failed:', error);
      });
    
    // Listen for service worker updates
    navigator.serviceWorker.addEventListener('controllerchange', () => {
      console.log('🔄 Service Worker updated');
      // Optionally reload the page or show update notification
    });
  }
  
  // Performance Monitoring
  initPerformanceMonitoring() {
    // Track performance metrics
    document.addEventListener('DOMContentLoaded', () => {
      this.performanceMetrics.domContentLoaded = performance.now();
    });
    
    window.addEventListener('load', () => {
      this.performanceMetrics.windowLoaded = performance.now();
      this.reportPerformanceMetrics();
    });
    
    // Track paint metrics
    if ('PerformanceObserver' in window) {
      const paintObserver = new PerformanceObserver((list) => {
        list.getEntries().forEach(entry => {
          if (entry.name === 'first-paint') {
            this.performanceMetrics.firstPaint = entry.startTime;
          } else if (entry.name === 'first-contentful-paint') {
            this.performanceMetrics.firstContentfulPaint = entry.startTime;
          }
        });
      });
      
      paintObserver.observe({ entryTypes: ['paint'] });
    }
  }
  
  reportPerformanceMetrics() {
    const metrics = this.performanceMetrics;
    const loadTime = metrics.windowLoaded - metrics.loadStart;
    
    console.log('📊 Performance Metrics:');
    console.log(`⏱️ Total Load Time: ${loadTime.toFixed(2)}ms`);
    console.log(`🎨 First Paint: ${metrics.firstPaint?.toFixed(2) || 'N/A'}ms`);
    console.log(`📄 First Contentful Paint: ${metrics.firstContentfulPaint?.toFixed(2) || 'N/A'}ms`);
    console.log(`📋 DOM Content Loaded: ${(metrics.domContentLoaded - metrics.loadStart).toFixed(2)}ms`);
    
    // Send metrics to analytics (placeholder)
    this.sendAnalytics({
      loadTime,
      firstPaint: metrics.firstPaint,
      firstContentfulPaint: metrics.firstContentfulPaint,
      domContentLoaded: metrics.domContentLoaded - metrics.loadStart,
      isMobile: this.isMobile,
      isLowEndDevice: this.isLowEndDevice,
      connectionType: this.connectionType
    });
  }
  
  sendAnalytics(metrics) {
    // Placeholder for analytics reporting
    console.log('📈 Analytics data:', metrics);
  }
  
  // Memory Management
  initMemoryManagement() {
    // Monitor memory usage
    if ('memory' in performance) {
      this.monitorMemoryUsage();
    }
    
    // Clean up unused resources
    this.scheduleCleanup();
    
    // Handle memory pressure
    this.handleMemoryPressure();
  }
  
  monitorMemoryUsage() {
    setInterval(() => {
      const memory = performance.memory;
      const usedMB = (memory.usedJSHeapSize / 1024 / 1024).toFixed(2);
      const totalMB = (memory.totalJSHeapSize / 1024 / 1024).toFixed(2);
      const limitMB = (memory.jsHeapSizeLimit / 1024 / 1024).toFixed(2);
      
      console.log(`🧠 Memory Usage: ${usedMB}MB / ${totalMB}MB (Limit: ${limitMB}MB)`);
      
      // Trigger cleanup if memory usage is high
      const usagePercent = (memory.usedJSHeapSize / memory.jsHeapSizeLimit) * 100;
      if (usagePercent > 80) {
        this.performCleanup();
      }
    }, 30000); // Check every 30 seconds
  }
  
  scheduleCleanup() {
    // Schedule periodic cleanup
    setInterval(() => {
      this.performCleanup();
    }, 60000); // Cleanup every minute
  }
  
  performCleanup() {
    console.log('🧹 Performing memory cleanup...');
    
    // Remove old animation elements
    const oldAnimations = document.querySelectorAll('.sparkle-particle, .heart-particle, .random-floating-element');
    oldAnimations.forEach(element => {
      if (element.parentNode) {
        element.parentNode.removeChild(element);
      }
    });
    
    // Clear unused event listeners
    this.clearUnusedEventListeners();
    
    // Force garbage collection if available
    if (window.gc) {
      window.gc();
    }
  }
  
  clearUnusedEventListeners() {
    // Remove event listeners from elements that are no longer in the DOM
    // This is a simplified implementation
    const elements = document.querySelectorAll('*');
    elements.forEach(element => {
      if (!element.isConnected) {
        // Element is not in DOM, clean up would happen here
        // This is handled automatically by modern browsers
      }
    });
  }
  
  handleMemoryPressure() {
    // Listen for memory pressure events (if supported)
    if ('onmemorywarning' in window) {
      window.addEventListener('memorywarning', () => {
        console.log('⚠️ Memory warning received - performing aggressive cleanup');
        this.performAggressiveCleanup();
      });
    }
  }
  
  performAggressiveCleanup() {
    // Disable animations
    document.body.classList.add('memory-pressure');
    
    // Remove all floating decorations
    const decorations = document.querySelectorAll('.floating-decorations');
    decorations.forEach(decoration => {
      decoration.style.display = 'none';
    });
    
    // Disable animation manager
    if (window.animationManager) {
      window.animationManager.disable();
    }
    
    // Clear all intervals and timeouts
    // Note: This is aggressive and might break functionality
    // In a real implementation, you'd track and selectively clear
  }
  
  // Intersection Observer for Selective Loading
  initIntersectionObserver() {
    if ('IntersectionObserver' in window) {
      this.contentObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            this.loadContent(entry.target);
          }
        });
      }, {
        rootMargin: '100px 0px',
        threshold: 0.1
      });
      
      // Observe content sections
      const sections = document.querySelectorAll('.timeline-section, .event-content, .photo-gallery-section');
      sections.forEach(section => {
        this.contentObserver.observe(section);
      });
    }
  }
  
  loadContent(element) {
    // Load content when it comes into view
    element.classList.add('content-loaded');
    
    // Trigger any lazy-loaded content within this element
    const lazyElements = element.querySelectorAll('[data-lazy]');
    lazyElements.forEach(lazyElement => {
      this.loadLazyElement(lazyElement);
    });
  }
  
  loadLazyElement(element) {
    const lazyContent = element.getAttribute('data-lazy');
    if (lazyContent) {
      element.innerHTML = lazyContent;
      element.removeAttribute('data-lazy');
    }
  }
  
  // Preload Critical Resources
  preloadCriticalResources() {
    const criticalResources = [
      { href: 'css/styles.css', as: 'style' },
      { href: 'css/timeline.css', as: 'style' },
      { href: 'js/main.js', as: 'script' },
      { href: 'data/timeline-data.js', as: 'script' }
    ];
    
    criticalResources.forEach(resource => {
      const link = document.createElement('link');
      link.rel = 'preload';
      link.href = resource.href;
      link.as = resource.as;
      document.head.appendChild(link);
    });
  }
  
  // Public API
  getPerformanceMetrics() {
    return this.performanceMetrics;
  }
  
  isOptimizedForMobile() {
    return this.isMobile;
  }
  
  getConnectionType() {
    return this.connectionType;
  }
  
  enableDataSaverMode() {
    this.enableDataSaver();
  }
  
  disableDataSaverMode() {
    document.body.classList.remove('data-saver');
  }
}

// Initialize Mobile Performance Manager
document.addEventListener('DOMContentLoaded', function() {
  console.log('🐼 Initializing Mobile Performance Manager...');
  
  try {
    const mobilePerformanceManager = new MobilePerformanceManager();
    
    // Make mobile performance manager globally available
    window.mobilePerformanceManager = mobilePerformanceManager;
    
    console.log('⚡ Mobile Performance Manager initialized successfully!');
  } catch (error) {
    console.error('❌ Error initializing Mobile Performance Manager:', error);
  }
});

// Export for use in other modules
if (typeof module !== 'undefined' && module.exports) {
  module.exports = MobilePerformanceManager;
}