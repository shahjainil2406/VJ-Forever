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
    this.milestoneEffects = new Map();
    
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
    
    // Initialize milestone celebration system
    this.initMilestoneCelebrations();
    
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
    
    // Create continuous floating effect
    this.startContinuousFloatingEffect();
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
  
  startContinuousFloatingEffect() {
    if (!this.isEnabled) return;
    
    // Create floating pandas and hearts periodically
    setInterval(() => {
      if (!this.isPaused && this.isEnabled) {
        this.createRandomFloatingElement();
      }
    }, 8000); // Every 8 seconds
  }
  
  createRandomFloatingElement() {
    const elements = ['🐼', '💕', '🌿', '✨'];
    const element = elements[Math.floor(Math.random() * elements.length)];
    
    const floatingElement = document.createElement('div');
    floatingElement.className = 'random-floating-element';
    floatingElement.textContent = element;
    
    // Random starting position
    const startSide = Math.random() < 0.5 ? 'left' : 'right';
    const startPosition = Math.random() * 100;
    
    floatingElement.style.cssText = `
      position: fixed;
      ${startSide}: -50px;
      top: ${startPosition}%;
      font-size: 1.5rem;
      opacity: 0.3;
      pointer-events: none;
      z-index: 1;
      animation: floatAcross 15s linear forwards;
    `;
    
    document.body.appendChild(floatingElement);
    
    // Remove element after animation
    setTimeout(() => {
      if (floatingElement.parentNode) {
        floatingElement.parentNode.removeChild(floatingElement);
      }
    }, 15000);
  }
  
  initRomanticEffects() {
    if (!this.isEnabled) return;
    
    // Add sparkle effects to timeline dots
    this.addSparkleEffects();
    
    // Add heart particles on hover
    this.addHeartParticles();
    
    // Add bamboo growth effects
    this.addBambooEffects();
    
    // Add timer celebration effects
    this.addTimerCelebrationEffects();
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
  
  addTimerCelebrationEffects() {
    // Add special effects when timer units change
    const timerUnits = document.querySelectorAll('.timer-unit');
    
    timerUnits.forEach(unit => {
      const observer = new MutationObserver((mutations) => {
        mutations.forEach(mutation => {
          if (mutation.type === 'childList' || mutation.type === 'characterData') {
            this.triggerTimerChangeEffect(unit);
          }
        });
      });
      
      observer.observe(unit, {
        childList: true,
        subtree: true,
        characterData: true
      });
    });
  }
  
  triggerTimerChangeEffect(timerUnit) {
    if (!this.isEnabled || this.isPaused) return;
    
    // Create small celebration effect around timer unit
    const rect = timerUnit.getBoundingClientRect();
    const particles = ['🐼', '💕'];
    
    for (let i = 0; i < 2; i++) {
      const particle = document.createElement('div');
      particle.textContent = particles[i % particles.length];
      
      particle.style.cssText = `
        position: fixed;
        left: ${rect.left + rect.width / 2}px;
        top: ${rect.top + rect.height / 2}px;
        font-size: 12px;
        pointer-events: none;
        z-index: 1000;
        animation: timerCelebration 1s ease-out forwards;
        animation-delay: ${i * 0.1}s;
      `;
      
      document.body.appendChild(particle);
      
      setTimeout(() => {
        if (particle.parentNode) {
          particle.parentNode.removeChild(particle);
        }
      }, 1000);
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
  
  initMilestoneCelebrations() {
    // Define special anniversary dates and their celebration effects
    this.anniversaryDates = [
      { month: 5, day: 18, name: 'First Conversation', effect: 'sparkleRain' },
      { month: 6, day: 24, name: 'Birthday Magic', effect: 'pandaParty' },
      { month: 7, day: 26, name: 'Engagement Day', effect: 'heartExplosion' },
      { month: 8, day: 15, name: 'First Kiss', effect: 'romanticGlow' }
    ];
    
    // Check if today is a special anniversary
    this.checkAnniversaryDate();
    
    // Set up daily check
    setInterval(() => {
      this.checkAnniversaryDate();
    }, 24 * 60 * 60 * 1000); // Check once per day
  }
  
  checkAnniversaryDate() {
    const today = new Date();
    const currentMonth = today.getMonth() + 1; // JavaScript months are 0-indexed
    const currentDay = today.getDate();
    
    const anniversary = this.anniversaryDates.find(date => 
      date.month === currentMonth && date.day === currentDay
    );
    
    if (anniversary) {
      console.log(`🎉 Today is ${anniversary.name}! Triggering special celebration...`);
      this.triggerAnniversaryCelebration(anniversary);
    }
  }
  
  triggerAnniversaryCelebration(anniversary) {
    if (!this.isEnabled || this.isPaused) return;
    
    // Show anniversary message
    this.showAnniversaryMessage(anniversary);
    
    // Trigger specific celebration effect
    switch (anniversary.effect) {
      case 'sparkleRain':
        this.createSparkleRain();
        break;
      case 'pandaParty':
        this.createPandaParty();
        break;
      case 'heartExplosion':
        this.createHeartExplosion();
        break;
      case 'romanticGlow':
        this.createRomanticGlow();
        break;
    }
  }
  
  showAnniversaryMessage(anniversary) {
    const messageOverlay = document.createElement('div');
    messageOverlay.className = 'anniversary-message-overlay';
    messageOverlay.innerHTML = `
      <div class="anniversary-message">
        <div class="anniversary-pandas">🐼 🎉 🐼</div>
        <h3>Happy ${anniversary.name} Anniversary!</h3>
        <p>Celebrating this special day in our love story 💕</p>
        <div class="anniversary-hearts">💖 ✨ 💖</div>
      </div>
    `;
    
    messageOverlay.style.cssText = `
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background: rgba(232, 240, 228, 0.95);
      display: flex;
      align-items: center;
      justify-content: center;
      z-index: 10000;
      animation: fadeIn 0.5s ease-out;
      backdrop-filter: blur(10px);
    `;
    
    document.body.appendChild(messageOverlay);
    
    // Auto-remove after 6 seconds
    setTimeout(() => {
      messageOverlay.style.animation = 'fadeOut 0.5s ease-out';
      setTimeout(() => {
        if (messageOverlay.parentNode) {
          messageOverlay.parentNode.removeChild(messageOverlay);
        }
      }, 500);
    }, 6000);
    
    // Allow manual close
    messageOverlay.addEventListener('click', () => {
      messageOverlay.style.animation = 'fadeOut 0.5s ease-out';
      setTimeout(() => {
        if (messageOverlay.parentNode) {
          messageOverlay.parentNode.removeChild(messageOverlay);
        }
      }, 500);
    });
  }
  
  createSparkleRain() {
    const sparkleCount = 30;
    
    for (let i = 0; i < sparkleCount; i++) {
      setTimeout(() => {
        const sparkle = document.createElement('div');
        sparkle.textContent = '✨';
        sparkle.style.cssText = `
          position: fixed;
          left: ${Math.random() * 100}%;
          top: -20px;
          font-size: 16px;
          pointer-events: none;
          z-index: 9999;
          animation: sparkleRainFall ${3 + Math.random() * 2}s linear forwards;
        `;
        
        document.body.appendChild(sparkle);
        
        setTimeout(() => {
          if (sparkle.parentNode) {
            sparkle.parentNode.removeChild(sparkle);
          }
        }, 5000);
      }, i * 100);
    }
  }
  
  createPandaParty() {
    const pandaCount = 15;
    
    for (let i = 0; i < pandaCount; i++) {
      setTimeout(() => {
        const panda = document.createElement('div');
        panda.textContent = '🐼';
        panda.style.cssText = `
          position: fixed;
          left: ${Math.random() * 100}%;
          top: ${Math.random() * 100}%;
          font-size: 24px;
          pointer-events: none;
          z-index: 9999;
          animation: pandaPartyDance 3s ease-in-out forwards;
        `;
        
        document.body.appendChild(panda);
        
        setTimeout(() => {
          if (panda.parentNode) {
            panda.parentNode.removeChild(panda);
          }
        }, 3000);
      }, i * 200);
    }
  }
  
  createHeartExplosion() {
    const center = {
      x: window.innerWidth / 2,
      y: window.innerHeight / 2
    };
    
    const heartCount = 25;
    
    for (let i = 0; i < heartCount; i++) {
      const heart = document.createElement('div');
      heart.textContent = '💕';
      
      const angle = (i / heartCount) * Math.PI * 2;
      const velocity = 150 + Math.random() * 100;
      
      heart.style.cssText = `
        position: fixed;
        left: ${center.x}px;
        top: ${center.y}px;
        font-size: 20px;
        pointer-events: none;
        z-index: 9999;
        animation: heartExplosion 2.5s ease-out forwards;
        --angle: ${angle}rad;
        --velocity: ${velocity}px;
      `;
      
      document.body.appendChild(heart);
      
      setTimeout(() => {
        if (heart.parentNode) {
          heart.parentNode.removeChild(heart);
        }
      }, 2500);
    }
  }
  
  createRomanticGlow() {
    // Add romantic glow effect to the entire page
    const glowOverlay = document.createElement('div');
    glowOverlay.className = 'romantic-glow-overlay';
    glowOverlay.style.cssText = `
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background: radial-gradient(circle, rgba(232, 240, 228, 0.3) 0%, transparent 70%);
      pointer-events: none;
      z-index: 1;
      animation: romanticGlowPulse 4s ease-in-out;
    `;
    
    document.body.appendChild(glowOverlay);
    
    setTimeout(() => {
      if (glowOverlay.parentNode) {
        glowOverlay.parentNode.removeChild(glowOverlay);
      }
    }, 4000);
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
    this.milestoneEffects.clear();
    
    console.log('🐼 Animation manager destroyed');
  }
}

// Initialize animation manager when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
  console.log('🐼 DOM loaded, initializing animation manager...');
  
  try {
    const animationManager = new AnimationManager();
    
    // Make animation manager globally available
    window.animationManager = animationManager;
    
    // Handle window resize
    window.addEventListener('resize', () => {
      animationManager.handleResize();
    });
    
    console.log('🎉 Animation manager initialized successfully!');
  } catch (error) {
    console.error('❌ Error initializing animation manager:', error);
  }
});

// Add enhanced animation keyframes to document
const enhancedAnimationStyles = document.createElement('style');
enhancedAnimationStyles.textContent = `
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
  
  @keyframes floatAcross {
    0% {
      transform: translateX(0) rotate(0deg);
      opacity: 0.3;
    }
    50% {
      opacity: 0.6;
    }
    100% {
      transform: translateX(calc(100vw + 100px)) rotate(360deg);
      opacity: 0;
    }
  }
  
  @keyframes timerCelebration {
    0% {
      transform: translate(0, 0) scale(0);
      opacity: 1;
    }
    50% {
      transform: translate(${Math.random() * 30 - 15}px, -20px) scale(1);
      opacity: 1;
    }
    100% {
      transform: translate(${Math.random() * 60 - 30}px, -40px) scale(0);
      opacity: 0;
    }
  }
  
  @keyframes sparkleRainFall {
    0% {
      transform: translateY(-20px) rotate(0deg);
      opacity: 1;
    }
    100% {
      transform: translateY(100vh) rotate(360deg);
      opacity: 0;
    }
  }
  
  @keyframes pandaPartyDance {
    0%, 100% {
      transform: scale(1) rotate(0deg);
      opacity: 1;
    }
    25% {
      transform: scale(1.2) rotate(90deg);
      opacity: 0.8;
    }
    50% {
      transform: scale(0.8) rotate(180deg);
      opacity: 1;
    }
    75% {
      transform: scale(1.1) rotate(270deg);
      opacity: 0.9;
    }
  }
  
  @keyframes heartExplosion {
    0% {
      transform: translate(0, 0) scale(1);
      opacity: 1;
    }
    100% {
      transform: translate(
        calc(cos(var(--angle)) * var(--velocity)), 
        calc(sin(var(--angle)) * var(--velocity))
      ) scale(0);
      opacity: 0;
    }
  }
  
  @keyframes romanticGlowPulse {
    0%, 100% {
      opacity: 0;
    }
    50% {
      opacity: 1;
    }
  }
  
  /* Anniversary message styling */
  .anniversary-message {
    background: linear-gradient(135deg, var(--panda-white), var(--sage-green));
    padding: 2.5rem;
    border-radius: 25px;
    text-align: center;
    box-shadow: 0 15px 50px rgba(232, 240, 228, 0.8);
    max-width: 90%;
    margin: 0 auto;
  }
  
  .anniversary-pandas {
    font-size: 2.5rem;
    margin-bottom: 1.5rem;
    animation: pandaPartyDance 2s ease-in-out infinite;
  }
  
  .anniversary-message h3 {
    font-family: 'Great Vibes', cursive;
    font-size: 2.2rem;
    color: var(--forest-green);
    margin-bottom: 1rem;
  }
  
  .anniversary-message p {
    font-family: 'Dancing Script', cursive;
    font-size: 1.4rem;
    color: var(--text-accent);
    margin-bottom: 1.5rem;
    font-weight: 600;
  }
  
  .anniversary-hearts {
    font-size: 1.8rem;
    animation: heartFloat 2s ease-in-out infinite;
  }
  
  /* Reduced motion styles */
  .reduced-motion * {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
  }
`;

document.head.appendChild(enhancedAnimationStyles);

// Export for use in other modules
if (typeof module !== 'undefined' && module.exports) {
  module.exports = AnimationManager;
}

// Page Transition Manager
class PageTransitionManager {
  constructor() {
    this.isTransitioning = false;
    this.transitionDuration = 1200; // Increased from 600ms for smoother mobile experience
    
    this.init();
  }
  
  init() {
    console.log('🐼 Initializing page transition manager...');
    
    // Initialize page transition effects
    this.initPageTransitions();
    
    // Add loading animations
    this.initLoadingAnimations();
    
    console.log('✨ Page transition manager initialized');
  }
  
  initPageTransitions() {
    // Intercept navigation links for smooth transitions
    document.addEventListener('click', (e) => {
      const link = e.target.closest('a[href], button[onclick*="location"], button[onclick*="navigate"]');
      
      if (link && this.shouldTransition(link)) {
        e.preventDefault();
        this.performTransition(link);
      }
    });
    
    // Handle browser back/forward buttons
    window.addEventListener('popstate', () => {
      this.performPageLoad();
    });
  }
  
  shouldTransition(element) {
    // Don't transition for external links or special cases
    const href = element.getAttribute('href');
    const onclick = element.getAttribute('onclick');
    
    if (href && (href.startsWith('http') || href.startsWith('mailto') || href.startsWith('tel'))) {
      return false;
    }
    
    if (element.hasAttribute('data-no-transition')) {
      return false;
    }
    
    return true;
  }
  
  performTransition(element) {
    if (this.isTransitioning) return;
    
    this.isTransitioning = true;
    
    // Get destination URL
    let destination = '';
    const href = element.getAttribute('href');
    const onclick = element.getAttribute('onclick');
    
    if (href) {
      destination = href;
    } else if (onclick) {
      // Extract URL from onclick
      const urlMatch = onclick.match(/(?:location\.href|window\.location)\s*=\s*['"`]([^'"`]+)['"`]/);
      if (urlMatch) {
        destination = urlMatch[1];
      }
    }
    
    if (!destination) {
      this.isTransitioning = false;
      return;
    }
    
    // Create transition overlay
    this.createTransitionOverlay(() => {
      window.location.href = destination;
    });
  }
  
  createTransitionOverlay(callback) {
    const overlay = document.createElement('div');
    overlay.className = 'page-transition-overlay';
    overlay.innerHTML = `
      <div class="transition-content">
        <div class="transition-pandas">
          <div class="panda-1">🐼</div>
          <div class="panda-2">💕</div>
          <div class="panda-3">🐼</div>
        </div>
        <div class="transition-message">
          <p>Loading our beautiful memories...</p>
        </div>
        <div class="transition-hearts">
          <div class="heart-1">💚</div>
          <div class="heart-2">✨</div>
          <div class="heart-3">💚</div>
        </div>
      </div>
    `;
    
    // Add transition styles with mobile optimization
    overlay.style.cssText = `
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background: linear-gradient(135deg, var(--sage-green), var(--mint-cream), var(--pale-mint));
      z-index: 20000;
      display: flex;
      align-items: center;
      justify-content: center;
      animation: transitionFadeIn 0.8s ease-out;
      
      /* Mobile optimization */
      will-change: opacity;
      backface-visibility: hidden;
      -webkit-backface-visibility: hidden;
    `;
    
    document.body.appendChild(overlay);
    
    // Trigger callback after transition animation
    setTimeout(() => {
      callback();
    }, this.transitionDuration);
  }
  
  initLoadingAnimations() {
    // Add entrance animations when page loads
    window.addEventListener('load', () => {
      this.performPageLoad();
    });
    
    // Also trigger on DOMContentLoaded for faster response
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', () => {
        this.performPageLoad();
      });
    } else {
      this.performPageLoad();
    }
  }
  
  performPageLoad() {
    // Create page load animation
    this.createPageLoadAnimation();
    
    // Stagger entrance animations
    this.staggerEntranceAnimations();
    
    this.isTransitioning = false;
  }
  
  createPageLoadAnimation() {
    // Add fade-in effect to main content
    const mainContent = document.querySelector('main, .timeline-page, .event-detail-page');
    if (mainContent) {
      mainContent.style.opacity = '0';
      mainContent.style.transform = 'translateY(20px)';
      mainContent.style.transition = 'all 0.6s ease-out';
      
      setTimeout(() => {
        mainContent.style.opacity = '1';
        mainContent.style.transform = 'translateY(0)';
      }, 200); // Increased delay for smoother mobile experience
    }
  }
  
  staggerEntranceAnimations() {
    const elementsToAnimate = [
      { selector: '.countdown-timer', delay: 300 },
      { selector: '.timeline-title', delay: 600 },
      { selector: '.timeline-bar', delay: 900 },
      { selector: '.timeline-labels', delay: 1200 },
      { selector: '.event-header-content', delay: 450 },
      { selector: '.event-story', delay: 750 },
      { selector: '.photo-gallery-section', delay: 1050 },
      { selector: '.special-content-section', delay: 1350 },
      { selector: '.event-navigation', delay: 1650 }
    ];
    
    elementsToAnimate.forEach(({ selector, delay }) => {
      const elements = document.querySelectorAll(selector);
      elements.forEach((element, index) => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(30px)';
        element.style.transition = 'all 0.6s ease-out';
        
        setTimeout(() => {
          element.style.opacity = '1';
          element.style.transform = 'translateY(0)';
          element.classList.add('entrance-complete');
        }, delay + (index * 100));
      });
    });
  }
  
  // Create special transition effects
  createPandaTransition(callback) {
    const pandaCount = 8;
    const pandas = [];
    
    for (let i = 0; i < pandaCount; i++) {
      const panda = document.createElement('div');
      panda.textContent = '🐼';
      panda.style.cssText = `
        position: fixed;
        font-size: 2rem;
        z-index: 25000;
        pointer-events: none;
        animation: pandaTransition 1.5s ease-in-out forwards;
        animation-delay: ${i * 0.1}s;
      `;
      
      // Position pandas around the screen edges
      const angle = (i / pandaCount) * Math.PI * 2;
      const radius = Math.max(window.innerWidth, window.innerHeight) * 0.6;
      const startX = window.innerWidth / 2 + Math.cos(angle) * radius;
      const startY = window.innerHeight / 2 + Math.sin(angle) * radius;
      
      panda.style.left = `${startX}px`;
      panda.style.top = `${startY}px`;
      
      document.body.appendChild(panda);
      pandas.push(panda);
    }
    
    // Clean up pandas after animation
    setTimeout(() => {
      pandas.forEach(panda => {
        if (panda.parentNode) {
          panda.parentNode.removeChild(panda);
        }
      });
      
      if (callback) callback();
    }, 1500);
  }
  
  createHeartTransition(callback) {
    const heartCount = 12;
    const hearts = [];
    
    for (let i = 0; i < heartCount; i++) {
      const heart = document.createElement('div');
      heart.textContent = '💕';
      heart.style.cssText = `
        position: fixed;
        font-size: 1.5rem;
        z-index: 25000;
        pointer-events: none;
        animation: heartTransition 2s ease-in-out forwards;
        animation-delay: ${i * 0.15}s;
      `;
      
      // Random starting positions from edges
      const side = i % 4;
      let startX, startY;
      
      switch (side) {
        case 0: // Top
          startX = Math.random() * window.innerWidth;
          startY = -50;
          break;
        case 1: // Right
          startX = window.innerWidth + 50;
          startY = Math.random() * window.innerHeight;
          break;
        case 2: // Bottom
          startX = Math.random() * window.innerWidth;
          startY = window.innerHeight + 50;
          break;
        case 3: // Left
          startX = -50;
          startY = Math.random() * window.innerHeight;
          break;
      }
      
      heart.style.left = `${startX}px`;
      heart.style.top = `${startY}px`;
      
      document.body.appendChild(heart);
      hearts.push(heart);
    }
    
    // Clean up hearts after animation
    setTimeout(() => {
      hearts.forEach(heart => {
        if (heart.parentNode) {
          heart.parentNode.removeChild(heart);
        }
      });
      
      if (callback) callback();
    }, 2000);
  }
}

// Initialize page transition manager
document.addEventListener('DOMContentLoaded', function() {
  console.log('🐼 Initializing page transition manager...');
  
  try {
    const pageTransitionManager = new PageTransitionManager();
    
    // Make page transition manager globally available
    window.pageTransitionManager = pageTransitionManager;
    
    console.log('🎉 Page transition manager initialized successfully!');
  } catch (error) {
    console.error('❌ Error initializing page transition manager:', error);
  }
});

// Add page transition animation keyframes
const pageTransitionStyles = document.createElement('style');
pageTransitionStyles.textContent = `
  @keyframes transitionFadeIn {
    from {
      opacity: 0;
    }
    to {
      opacity: 1;
    }
  }
  
  @keyframes transitionFadeOut {
    from {
      opacity: 1;
    }
    to {
      opacity: 0;
    }
  }
  
  @keyframes pandaTransition {
    0% {
      transform: scale(0) rotate(0deg);
      opacity: 0;
    }
    50% {
      transform: scale(1.1) rotate(180deg);
      opacity: 1;
    }
    100% {
      transform: scale(0) rotate(360deg) translate(30vw, 30vh);
      opacity: 0;
    }
  }
  
  @keyframes heartTransition {
    0% {
      transform: scale(0);
      opacity: 0;
    }
    50% {
      transform: scale(1) translate(15vw, 15vh);
      opacity: 1;
    }
    100% {
      transform: scale(0) translate(30vw, 30vh);
      opacity: 0;
    }
  }
  
  /* Page transition overlay styling */
  .page-transition-overlay {
    font-family: 'Dancing Script', cursive;
  }
  
  .transition-content {
    text-align: center;
    max-width: 400px;
    padding: 2rem;
  }
  
  .transition-pandas {
    display: flex;
    justify-content: center;
    gap: 1rem;
    margin-bottom: 2rem;
    font-size: 2.5rem;
  }
  
  .transition-pandas > div {
    animation: pandaPartyDance 2s ease-in-out infinite;
  }
  
  .panda-1 { animation-delay: 0s; }
  .panda-2 { animation-delay: 0.3s; }
  .panda-3 { animation-delay: 0.6s; }
  
  .transition-message {
    margin-bottom: 2rem;
  }
  
  .transition-message p {
    font-size: 1.3rem;
    color: var(--text-accent);
    font-weight: 600;
    margin: 0;
  }
  
  .transition-hearts {
    display: flex;
    justify-content: center;
    gap: 1rem;
    font-size: 1.5rem;
  }
  
  .transition-hearts > div {
    animation: heartFloat 3s ease-in-out infinite;
  }
  
  .heart-1 { animation-delay: 0s; }
  .heart-2 { animation-delay: 0.4s; }
  .heart-3 { animation-delay: 0.8s; }
  
  /* Mobile responsive transitions */
  @media (max-width: 768px) {
    .transition-content {
      padding: 1.5rem;
    }
    
    .transition-pandas {
      font-size: 2rem;
      gap: 0.75rem;
    }
    
    .transition-pandas > div {
      animation-duration: 2.5s;
    }
    
    .transition-message p {
      font-size: 1.1rem;
    }
    
    .transition-hearts {
      font-size: 1.3rem;
      gap: 0.75rem;
    }
    
    .transition-hearts > div {
      animation-duration: 3.5s;
    }
    
    /* Slower, smoother animations on mobile */
    @keyframes pandaTransition {
      0% {
        transform: scale(0) rotate(0deg);
        opacity: 0;
      }
      50% {
        transform: scale(1.05) rotate(90deg);
        opacity: 1;
      }
      100% {
        transform: scale(0) rotate(180deg) translate(20vw, 20vh);
        opacity: 0;
      }
    }
    
    @keyframes heartTransition {
      0% {
        transform: scale(0);
        opacity: 0;
      }
      50% {
        transform: scale(1) translate(10vw, 10vh);
        opacity: 1;
      }
      100% {
        transform: scale(0) translate(20vw, 20vh);
        opacity: 0;
      }
    }
  }
`;

document.head.appendChild(pageTransitionStyles);

// Export for use in other modules
if (typeof module !== 'undefined' && module.exports) {
  module.exports = { AnimationManager, PageTransitionManager };
}