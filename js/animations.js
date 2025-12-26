/* ==============================================
   Animation Manager - Romantic Animations & Effects
   Mobile-First Animations with Panda Theme
   ============================================== */

class AnimationManager {
  constructor() {
    this.isEnabled = true;
    this.isPaused = false;
    this.activeAnimations = new Set();
    this.observers = new Map();
    
    this.init();
  }
  
  init() {
    console.log('🐼 Initializing animation manager...');
    
    // Check for reduced motion preference
    this.checkReducedMotion();
    
    // Initialize intersection observer for scroll animations
    this.initIntersectionObserver();
    
    // Initialize floating pandas
    this.initFloatingPandas();
    
    // Initialize romantic effects
    this.initRomanticEffects();
    
    console.log('✨ Animation manager initialized');
  }
  
  checkReducedMotion() {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    
    if (prefersReducedMotion) {
      this.isEnabled = false;
      document.body.classList.add('reduced-motion');
      console.log('🐼 Reduced motion detected - animations disabled');
    }
  }
  
  initIntersectionObserver() {
    if (!this.isEnabled) return;
    
    // Create intersection observer for scroll-triggered animations
    const observerOptions = {
      threshold: 0.1,
      rootMargin: '0px 0px -50px 0px'
    };
    
    this.scrollObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          this.triggerScrollAnimation(entry.target);
        }
      });
    }, observerOptions);
    
    // Observe elements that should animate on scroll
    this.observeScrollElements();
  }
  
  observeScrollElements() {
    const elementsToObserve = [
      '.event-card',
      '.timer-unit',
      '.timeline-title',
      '.countdown-timer'
    ];
    
    elementsToObserve.forEach(selector => {
      const elements = document.querySelectorAll(selector);
      elements.forEach(element => {
        if (!element.classList.contains('observed')) {
          this.scrollObserver.observe(element);
          element.classList.add('observed');
        }
      });
    });
  }
  
  triggerScrollAnimation(element) {
    if (!this.isEnabled || this.isPaused) return;
    
    // Add appropriate animation class based on element type
    if (element.classList.contains('event-card')) {
      element.classList.add('slide-up');
    } else if (element.classList.contains('timer-unit')) {
      element.classList.add('fade-in');
    } else if (element.classList.contains('timeline-title')) {
      element.classList.add('fade-in');
    } else if (element.classList.contains('countdown-timer')) {
      element.classList.add('gentle-pulse');
    }
    
    // Stop observing this element
    this.scrollObserver.unobserve(element);
  }
  
  initFloatingPandas() {
    if (!this.isEnabled) return;
    
    const pandaContainer = document.querySelector('.floating-decorations');
    if (!pandaContainer) return;
    
    // Create additional floating pandas dynamically
    this.createFloatingPanda(pandaContainer, { top: '10%', left: '80%', delay: '5s' });
    this.createFloatingPanda(pandaContainer, { top: '70%', left: '5%', delay: '15s' });
    this.createFloatingPanda(pandaContainer, { top: '40%', right: '10%', delay: '25s' });
  }
  
  createFloatingPanda(container, options) {
    const panda = document.createElement('div');
    panda.className = 'panda-decoration dynamic-panda';
    panda.textContent = '🐼';
    
    // Apply positioning
    Object.keys(options).forEach(key => {
      if (key !== 'delay') {
        panda.style[key] = options[key];
      }
    });
    
    // Add custom animation with delay
    panda.style.animationDelay = options.delay || '0s';
    panda.style.animationDuration = '25s';
    
    container.appendChild(panda);
  }
  
  initRomanticEffects() {
    if (!this.isEnabled) return;
    
    // Add sparkle effects to timeline dots
    this.addSparkleEffects();
    
    // Add heart particles on hover
    this.addHeartParticles();
    
    // Add bamboo growth effects
    this.addBambooEffects();
  }
  
  addSparkleEffects() {
    const timelineDots = document.querySelectorAll('.timeline-dot');
    
    timelineDots.forEach(dot => {
      dot.addEventListener('mouseenter', () => {
        if (!this.isEnabled || this.isPaused) return;
        this.createSparkles(dot);
      });
    });
  }
  
  createSparkles(element) {
    const sparkleCount = 5;
    const rect = element.getBoundingClientRect();
    
    for (let i = 0; i < sparkleCount; i++) {
      const sparkle = document.createElement('div');
      sparkle.className = 'sparkle-particle';
      sparkle.textContent = '✨';
      
      sparkle.style.cssText = `
        position: fixed;
        left: ${rect.left + rect.width / 2}px;
        top: ${rect.top + rect.height / 2}px;
        font-size: 12px;
        pointer-events: none;
        z-index: 1000;
        animation: sparkleFloat 1.5s ease-out forwards;
        animation-delay: ${i * 0.1}s;
      `;
      
      document.body.appendChild(sparkle);
      
      // Remove sparkle after animation
      setTimeout(() => {
        if (sparkle.parentNode) {
          sparkle.parentNode.removeChild(sparkle);
        }
      }, 1500 + (i * 100));
    }
  }
  
  addHeartParticles() {
    const eventCards = document.querySelectorAll('.event-card');
    
    eventCards.forEach(card => {
      card.addEventListener('mouseenter', () => {
        if (!this.isEnabled || this.isPaused) return;
        this.createHeartParticles(card);
      });
    });
  }
  
  createHeartParticles(element) {
    const heartCount = 3;
    const rect = element.getBoundingClientRect();
    
    for (let i = 0; i < heartCount; i++) {
      const heart = document.createElement('div');
      heart.className = 'heart-particle';
      heart.textContent = '💕';
      
      const randomX = rect.left + Math.random() * rect.width;
      const randomY = rect.top + Math.random() * rect.height;
      
      heart.style.cssText = `
        position: fixed;
        left: ${randomX}px;
        top: ${randomY}px;
        font-size: 14px;
        pointer-events: none;
        z-index: 1000;
        animation: heartFloat 2s ease-out forwards;
        animation-delay: ${i * 0.2}s;
      `;
      
      document.body.appendChild(heart);
      
      // Remove heart after animation
      setTimeout(() => {
        if (heart.parentNode) {
          heart.parentNode.removeChild(heart);
        }
      }, 2000 + (i * 200));
    }
  }
  
  addBambooEffects() {
    // Add subtle bamboo growth animation to timeline bar
    const timelineBar = document.querySelector('.timeline-bar');
    if (timelineBar) {
      timelineBar.addEventListener('animationend', () => {
        if (!this.isEnabled || this.isPaused) return;
        
        // Add bamboo accent elements
        const bambooAccent = document.createElement('div');
        bambooAccent.className = 'bamboo-accent';
        bambooAccent.style.cssText = `
          position: absolute;
          right: -10px;
          top: 20%;
          width: 3px;
          height: 60%;
          background: linear-gradient(180deg, var(--sage-green), var(--mint-cream));
          border-radius: 2px;
          animation: bambooGrowth 2s ease-out;
        `;
        
        timelineBar.appendChild(bambooAccent);
      });
    }
  }
  
  // Animation control methods
  pause() {
    this.isPaused = true;
    
    // Pause CSS animations
    document.querySelectorAll('*').forEach(element => {
      const computedStyle = window.getComputedStyle(element);
      if (computedStyle.animationName !== 'none') {
        element.style.animationPlayState = 'paused';
      }
    });
    
    console.log('⏸️ Animations paused');
  }
  
  resume() {
    this.isPaused = false;
    
    // Resume CSS animations
    document.querySelectorAll('*').forEach(element => {
      if (element.style.animationPlayState === 'paused') {
        element.style.animationPlayState = 'running';
      }
    });
    
    console.log('▶️ Animations resumed');
  }
  
  disable() {
    this.isEnabled = false;
    this.pause();
    
    // Add reduced motion class
    document.body.classList.add('reduced-motion');
    
    console.log('🚫 Animations disabled');
  }
  
  enable() {
    this.isEnabled = true;
    this.resume();
    
    // Remove reduced motion class
    document.body.classList.remove('reduced-motion');
    
    console.log('✅ Animations enabled');
  }
  
  // Trigger specific animations
  triggerCelebration() {
    if (!this.isEnabled || this.isPaused) return;
    
    // Create celebration effect
    this.createCelebrationBurst();
  }
  
  createCelebrationBurst() {
    const center = {
      x: window.innerWidth / 2,
      y: window.innerHeight / 2
    };
    
    // Create burst of pandas and hearts
    const particles = ['🐼', '💕', '✨', '🎉'];
    const particleCount = 20;
    
    for (let i = 0; i < particleCount; i++) {
      const particle = document.createElement('div');
      particle.textContent = particles[Math.floor(Math.random() * particles.length)];
      
      const angle = (i / particleCount) * Math.PI * 2;
      const velocity = 100 + Math.random() * 100;
      const endX = center.x + Math.cos(angle) * velocity;
      const endY = center.y + Math.sin(angle) * velocity;
      
      particle.style.cssText = `
        position: fixed;
        left: ${center.x}px;
        top: ${center.y}px;
        font-size: 20px;
        pointer-events: none;
        z-index: 10000;
        animation: celebrationBurst 2s ease-out forwards;
        --end-x: ${endX}px;
        --end-y: ${endY}px;
      `;
      
      document.body.appendChild(particle);
      
      // Remove particle after animation
      setTimeout(() => {
        if (particle.parentNode) {
          particle.parentNode.removeChild(particle);
        }
      }, 2000);
    }
  }
  
  // Handle window resize
  handleResize() {
    // Re-observe elements that might have changed position
    if (this.scrollObserver) {
      this.observeScrollElements();
    }
  }
  
  // Cleanup method
  destroy() {
    if (this.scrollObserver) {
      this.scrollObserver.disconnect();
    }
    
    this.observers.clear();
    this.activeAnimations.clear();
    
    console.log('🐼 Animation manager destroyed');
  }
}

// Add animation keyframes to document
const animationStyles = document.createElement('style');
animationStyles.textContent = `
  @keyframes sparkleFloat {
    0% {
      transform: translate(0, 0) scale(0);
      opacity: 1;
    }
    50% {
      transform: translate(${Math.random() * 40 - 20}px, ${Math.random() * 40 - 20}px) scale(1);
      opacity: 1;
    }
    100% {
      transform: translate(${Math.random() * 80 - 40}px, ${Math.random() * 80 - 40}px) scale(0);
      opacity: 0;
    }
  }
  
  @keyframes heartFloat {
    0% {
      transform: translateY(0) scale(0);
      opacity: 1;
    }
    50% {
      transform: translateY(-30px) scale(1);
      opacity: 1;
    }
    100% {
      transform: translateY(-60px) scale(0);
      opacity: 0;
    }
  }
  
  @keyframes bambooGrowth {
    0% {
      height: 0;
      opacity: 0;
    }
    50% {
      height: 100%;
      opacity: 0.7;
    }
    100% {
      height: 100%;
      opacity: 1;
    }
  }
  
  @keyframes celebrationBurst {
    0% {
      transform: translate(0, 0) scale(1);
      opacity: 1;
    }
    100% {
      transform: translate(calc(var(--end-x) - 50vw), calc(var(--end-y) - 50vh)) scale(0);
      opacity: 0;
    }
  }
  
  /* Reduced motion styles */
  .reduced-motion * {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
  }
`;

document.head.appendChild(animationStyles);

// Export for use in other modules
if (typeof module !== 'undefined' && module.exports) {
  module.exports = AnimationManager;
}