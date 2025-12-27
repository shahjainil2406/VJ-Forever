/* ==============================================
   Main JavaScript - Core Functionality
   Mobile-First Romantic Love Story Webapp
   ============================================== */

// Global App Configuration
const APP_CONFIG = {
  dalChawalDate: new Date('2025-07-26T17:30:00+05:30'), // July 26, 2025, 5:30 PM IST
  
  // Timeline events data - loaded from TIMELINE_DATA or use defaults
  timelineEvents: (typeof TIMELINE_DATA !== 'undefined' && TIMELINE_DATA.events) ? 
    TIMELINE_DATA.events.map(event => ({
      id: event.id,
      title: event.title,
      date: new Date(event.date),
      category: event.category,
      icon: event.icon,
      previewText: event.previewText,
      location: event.location,
      detailContent: event.detailContent,
      photos: event.photos || []
    })) : [
    {
      id: 'first-talking',
      title: 'The Day We First Started Talking',
      date: new Date('2025-05-18'),
      category: 'meeting',
      icon: '💬',
      previewText: 'The day our beautiful conversation began...',
      detailContent: 'May 18th, 2025 - the day that changed everything. Our first conversation sparked something magical that neither of us could have imagined.'
    },
    {
      id: 'special-day',
      title: 'Can\'t Explain The Day, Just Click 😏',
      date: new Date('2025-05-20'),
      category: 'dating',
      icon: '😏',
      previewText: 'A day so special, words can\'t describe it...',
      detailContent: 'May 20th, 2025 - some moments are too precious and personal to put into words.'
    },
    {
      id: 'birthday-tir-i-miss-u',
      title: 'My Birthday and Your Tir-i-miss-u',
      date: new Date('2025-06-24'),
      category: 'dating',
      icon: '🎂',
      previewText: 'A birthday made extra special by your love...',
      detailContent: 'June 24th, 2025 - my birthday became infinitely more special because of you and your sweet "Tir-i-miss-u".'
    },
    {
      id: 'mumbai-meeting',
      title: 'We Met in Mumbai',
      date: new Date('2025-06-28'),
      category: 'dating',
      icon: '🏙️',
      previewText: 'Our first meeting in the city of dreams...',
      detailContent: 'June 28th, 2025 - Mumbai, the city of dreams, became the backdrop for our first real meeting.'
    },
    {
      id: 'vadodara-family',
      title: 'You Went to Vadodara to Meet My Family Without Me :)',
      date: new Date('2025-07-04'),
      category: 'dating',
      icon: '👨‍👩‍👧‍👦',
      previewText: 'The brave journey to win over my family...',
      detailContent: 'July 4th, 2025 - the day you showed incredible courage and love by going to Vadodara to meet my family without me there!'
    },
    {
      id: 'the-day-we-said-yes',
      title: 'The Day We Said Yes',
      date: new Date('2025-07-26'),
      category: 'proposal',
      icon: '💍',
      previewText: 'The most magical moment when we said yes to forever...',
      location: 'Poetry by Love and Cheesecake, Balewadi, Pune',
      detailContent: 'July 26th, 2025 - at Poetry by Love and Cheesecake in Balewadi, Pune. The day we both said YES to forever!'
    },
    {
      id: 'roka-day',
      title: 'The Roka Day - Start of Official Courtship',
      date: new Date('2025-07-27'),
      category: 'proposal',
      icon: '🤝',
      previewText: 'The official beginning of our courtship period...',
      detailContent: 'July 27th, 2025 - our Roka ceremony! The traditional and official start of our courtship period.'
    },
    {
      id: 'bangalore-first-kiss',
      title: 'You Flew to Bangalore and First Kiss',
      date: new Date('2025-08-15'),
      category: 'dating',
      icon: '💋',
      previewText: 'A flight to Bangalore and our first magical kiss...',
      detailContent: 'August 15th, 2025 - you flew all the way to Bangalore, and on the 16th, we shared our first kiss.'
    },
    {
      id: 'our-engagement',
      title: 'Our Engagement',
      date: new Date('2025-09-05'),
      category: 'proposal',
      icon: '💎',
      previewText: 'The day we officially got engaged...',
      detailContent: 'September 5th, 2025 - our official engagement day! With rings exchanged and promises made.'
    },
    {
      id: 'the-day-we',
      title: 'The Day We....',
      date: new Date('2025-10-10'),
      category: 'dating',
      icon: '❤️',
      previewText: 'A special day that needs no explanation...',
      detailContent: 'October 10th, 2025 - some moments are so intimate and precious that they belong only to us.'
    },
    {
      id: 'memorable-photoshoot',
      title: 'The Most Memorable Photoshoot',
      date: new Date('2025-12-03'),
      category: 'dating',
      icon: '📸',
      previewText: 'Capturing our love in the most beautiful way...',
      detailContent: 'December 3rd, 2025 - our most memorable photoshoot! The day we captured our love in frames that will last forever.'
    },
    {
      id: 'day-to-forever',
      title: 'The Day to Forever',
      date: new Date('2026-02-03'),
      category: 'future',
      icon: '💒',
      previewText: 'Our wedding day - the beginning of forever...',
      detailContent: 'February 3rd, 2026 - our wedding day! The day we become husband and wife, the day we officially start our forever together.'
    }
  ],
  
  // Animation settings
  animations: {
    enabled: true,
    duration: 600,
    easing: 'ease-out'
  },
  
  // Mobile settings
  mobile: {
    touchThreshold: 44, // Minimum touch target size in pixels
    swipeThreshold: 50  // Minimum swipe distance
  }
};

// Main App Class
class LoveStoryApp {
  constructor() {
    this.isInitialized = false;
    this.currentView = 'timeline';
    this.touchStartX = 0;
    this.touchStartY = 0;
    
    // Bind methods
    this.handleResize = this.handleResize.bind(this);
    this.handleTouchStart = this.handleTouchStart.bind(this);
    this.handleTouchEnd = this.handleTouchEnd.bind(this);
    
    // Initialize when DOM is ready
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', () => this.init());
    } else {
      this.init();
    }
  }
  
  // Initialize the application
  init() {
    try {
      console.log('🐼 Initializing Love Story App...');
      
      // Show that we're starting
      this.showInitializationMessage();
      
      // Initialize components
      this.initializeCountdown();
      this.initializeTimeline();
      this.initializeAnimations();
      this.initializeEventListeners();
      this.initializeMobileOptimizations();
      
      this.isInitialized = true;
      console.log('💕 Love Story App initialized successfully!');
      
      // Trigger initial animations
      this.playInitialAnimations();
      
    } catch (error) {
      console.error('❌ Error initializing app:', error);
      this.showErrorMessage('Sorry, something went wrong. Please refresh the page.');
    }
  }
  
  // Show initialization message
  showInitializationMessage() {
    console.log('🐼 Starting initialization...');
    
    // Update timer display to show it's loading
    const timerDisplay = document.getElementById('timer-display');
    if (timerDisplay) {
      timerDisplay.innerHTML = `
        <div class="timer-loading">
          <span class="loading-panda">🐼</span>
          <p>Loading our time together...</p>
        </div>
      `;
    }
  }
  
  // Initialize countdown timer
  initializeCountdown() {
    console.log('🐼 Initializing countdown timer...');
    const timerDisplay = document.getElementById('timer-display');
    
    if (timerDisplay) {
      console.log('✅ Timer display element found');
      if (window.CountdownTimer) {
        console.log('✅ CountdownTimer class available');
        this.countdownTimer = new CountdownTimer(timerDisplay, APP_CONFIG.dalChawalDate);
      } else {
        console.log('⚠️ CountdownTimer class not available, creating simple timer');
        this.createSimpleTimer(timerDisplay);
      }
    } else {
      console.error('❌ Timer display element not found');
    }
  }
  
  // Create a simple timer if the CountdownTimer class isn't available
  createSimpleTimer(element) {
    const targetDate = APP_CONFIG.dalChawalDate;
    
    const updateTimer = () => {
      const now = new Date();
      const timeDifference = targetDate - now; // Countdown to future date
      
      if (timeDifference > 0) {
        // Counting down to future date
        const days = Math.floor(timeDifference / (1000 * 60 * 60 * 24));
        const hours = Math.floor((timeDifference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((timeDifference % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((timeDifference % (1000 * 60)) / 1000);
        
        element.innerHTML = `
          <div class="timer-unit">
            <span class="timer-number">${days.toString().padStart(2, '0')}</span>
            <span class="timer-label">Days</span>
          </div>
          <div class="timer-unit">
            <span class="timer-number">${hours.toString().padStart(2, '0')}</span>
            <span class="timer-label">Hours</span>
          </div>
          <div class="timer-unit">
            <span class="timer-number">${minutes.toString().padStart(2, '0')}</span>
            <span class="timer-label">Minutes</span>
          </div>
          <div class="timer-unit">
            <span class="timer-number">${seconds.toString().padStart(2, '0')}</span>
            <span class="timer-label">Seconds</span>
          </div>
        `;
      } else {
        // Date has passed - show time since
        const pastDiff = Math.abs(timeDifference);
        const days = Math.floor(pastDiff / (1000 * 60 * 60 * 24));
        const hours = Math.floor((pastDiff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((pastDiff % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((pastDiff % (1000 * 60)) / 1000);
        
        element.innerHTML = `
          <div class="timer-unit">
            <span class="timer-number">${days.toString().padStart(2, '0')}</span>
            <span class="timer-label">Days</span>
          </div>
          <div class="timer-unit">
            <span class="timer-number">${hours.toString().padStart(2, '0')}</span>
            <span class="timer-label">Hours</span>
          </div>
          <div class="timer-unit">
            <span class="timer-number">${minutes.toString().padStart(2, '0')}</span>
            <span class="timer-label">Minutes</span>
          </div>
          <div class="timer-unit">
            <span class="timer-number">${seconds.toString().padStart(2, '0')}</span>
            <span class="timer-label">Seconds</span>
          </div>
        `;
      }
    };
    
    // Update immediately and then every second
    updateTimer();
    setInterval(updateTimer, 1000);
  }
  
  // Initialize timeline
  initializeTimeline() {
    console.log('🐼 Initializing timeline...');
    
    if (window.TimelineManager) {
      console.log('✅ TimelineManager class available');
      this.timelineManager = new TimelineManager(APP_CONFIG.timelineEvents);
    } else {
      console.log('⚠️ TimelineManager class not available, creating simple timeline');
      this.createSimpleTimeline();
    }
  }
  
  // Create a simple timeline if the TimelineManager class isn't available
  createSimpleTimeline() {
    const timelineBar = document.getElementById('timeline-bar');
    const timelineEvents = document.getElementById('timeline-events');
    
    if (timelineBar && timelineEvents) {
      // Use real timeline events from APP_CONFIG
      const events = APP_CONFIG.timelineEvents;
      
      console.log('🐼 Creating vertical timeline with', events.length, 'events');
      
      // Clear existing content
      timelineEvents.innerHTML = '';
      
      // Create vertical timeline events
      events.forEach((event, index) => {
        console.log(`🐼 Creating vertical event ${index} (${event.title})`);
        
        // Create timeline event container
        const eventContainer = document.createElement('div');
        eventContainer.className = 'timeline-event';
        eventContainer.setAttribute('data-index', index);
        eventContainer.setAttribute('data-event-id', event.id);
        
        // Create event content
        const eventContent = document.createElement('div');
        eventContent.className = 'event-content';
        
        // Format date as dd/mm/yy
        const eventDate = new Date(event.date);
        const day = eventDate.getDate().toString().padStart(2, '0');
        const month = (eventDate.getMonth() + 1).toString().padStart(2, '0');
        const year = eventDate.getFullYear().toString().slice(-2);
        const dateText = `${day}/${month}/${year}`;
        
        eventContent.innerHTML = `
          <div class="event-date">${dateText}</div>
          <div class="event-title">${event.title}</div>
          <div class="event-preview">${event.previewText}</div>
        `;
        
        // Enhanced click handler
        const clickHandler = (e) => {
          e.preventDefault();
          e.stopPropagation();
          console.log('🐼 Vertical timeline event clicked:', event.title);
          
          // Add click animation
          eventContainer.classList.add('gentle-pulse');
          setTimeout(() => eventContainer.classList.remove('gentle-pulse'), 600);
          
          // Fallback alert
          const locationText = event.location ? `\nLocation: ${event.location}` : '';
          alert(`${event.title}\n\n${event.previewText}${locationText}\n\n${event.detailContent || 'More details coming soon!'}`);
        };
        
        // Add click handler to event content
        eventContent.addEventListener('click', clickHandler);
        
        // Enhanced hover events
        const hoverEnterHandler = () => {
          eventContainer.classList.add('highlighted');
        };
        
        const hoverLeaveHandler = () => {
          eventContainer.classList.remove('highlighted');
        };
        
        eventContent.addEventListener('mouseenter', hoverEnterHandler);
        eventContent.addEventListener('mouseleave', hoverLeaveHandler);
        
        // Enhanced touch support for mobile
        const touchHandler = (e) => {
          e.preventDefault();
          // Remove touch-active from all other events
          document.querySelectorAll('.timeline-event').forEach(event => {
            event.classList.remove('touch-active');
          });
          // Add touch-active to current event
          eventContainer.classList.add('touch-active');
          
          // Remove touch-active after 3 seconds
          setTimeout(() => {
            eventContainer.classList.remove('touch-active');
          }, 3000);
        };
        
        eventContent.addEventListener('touchstart', touchHandler);
        
        // Assemble the event (no timeline dot)
        eventContainer.appendChild(eventContent);
        timelineEvents.appendChild(eventContainer);
        
        console.log('✅ Added vertical timeline event:', event.title);
        
        // Add enhanced fade-in animation
        setTimeout(() => {
          eventContainer.style.opacity = '0';
          eventContainer.style.transform = 'translateY(30px)';
          eventContainer.style.transition = 'all 0.8s ease-out';
          
          setTimeout(() => {
            eventContainer.style.opacity = '1';
            eventContainer.style.transform = 'translateY(0)';
          }, 50);
        }, index * 150);
      });
      
      console.log('🎉 Vertical timeline created successfully!');
    } else {
      console.error('❌ Vertical timeline elements not found');
    }
  }
  
  // Initialize animations
  initializeAnimations() {
    if (window.AnimationManager && APP_CONFIG.animations.enabled) {
      this.animationManager = new AnimationManager();
    }
  }
  
  // Initialize event listeners
  initializeEventListeners() {
    // Window resize
    window.addEventListener('resize', this.handleResize);
    
    // Touch events for mobile
    document.addEventListener('touchstart', this.handleTouchStart, { passive: true });
    document.addEventListener('touchend', this.handleTouchEnd, { passive: true });
    
    // Keyboard navigation
    document.addEventListener('keydown', (e) => this.handleKeydown(e));
    
    // Visibility change (for pausing animations when tab is not active)
    document.addEventListener('visibilitychange', () => this.handleVisibilityChange());
  }
  
  // Initialize mobile-specific optimizations
  initializeMobileOptimizations() {
    // Prevent zoom on double tap
    let lastTouchEnd = 0;
    document.addEventListener('touchend', (e) => {
      const now = (new Date()).getTime();
      if (now - lastTouchEnd <= 300) {
        e.preventDefault();
      }
      lastTouchEnd = now;
    }, false);
    
    // Optimize for mobile viewport
    this.optimizeViewport();
    
    // Add mobile-specific CSS classes
    if (this.isMobile()) {
      document.body.classList.add('mobile-device');
    }
    
    if (this.isTouch()) {
      document.body.classList.add('touch-device');
    }
  }
  
  // Handle window resize
  handleResize() {
    // Debounce resize events
    clearTimeout(this.resizeTimeout);
    this.resizeTimeout = setTimeout(() => {
      this.optimizeViewport();
      
      // Notify components of resize
      if (this.timelineManager) {
        this.timelineManager.handleResize();
      }
      
      if (this.animationManager) {
        this.animationManager.handleResize();
      }
    }, 250);
  }
  
  // Handle touch start
  handleTouchStart(e) {
    if (e.touches.length === 1) {
      this.touchStartX = e.touches[0].clientX;
      this.touchStartY = e.touches[0].clientY;
    }
  }
  
  // Handle touch end (for swipe detection)
  handleTouchEnd(e) {
    if (!this.touchStartX || !this.touchStartY) return;
    
    const touchEndX = e.changedTouches[0].clientX;
    const touchEndY = e.changedTouches[0].clientY;
    
    const deltaX = touchEndX - this.touchStartX;
    const deltaY = touchEndY - this.touchStartY;
    
    // Check if it's a swipe (not just a tap)
    if (Math.abs(deltaX) > APP_CONFIG.mobile.swipeThreshold || 
        Math.abs(deltaY) > APP_CONFIG.mobile.swipeThreshold) {
      
      // Determine swipe direction
      if (Math.abs(deltaX) > Math.abs(deltaY)) {
        // Horizontal swipe
        if (deltaX > 0) {
          this.handleSwipeRight();
        } else {
          this.handleSwipeLeft();
        }
      } else {
        // Vertical swipe
        if (deltaY > 0) {
          this.handleSwipeDown();
        } else {
          this.handleSwipeUp();
        }
      }
    }
    
    // Reset touch coordinates
    this.touchStartX = 0;
    this.touchStartY = 0;
  }
  
  // Handle keyboard navigation
  handleKeydown(e) {
    switch (e.key) {
      case 'Escape':
        this.handleEscape();
        break;
      case 'ArrowUp':
        e.preventDefault();
        this.handleArrowUp();
        break;
      case 'ArrowDown':
        e.preventDefault();
        this.handleArrowDown();
        break;
      case 'ArrowLeft':
        e.preventDefault();
        this.handleArrowLeft();
        break;
      case 'ArrowRight':
        e.preventDefault();
        this.handleArrowRight();
        break;
    }
  }
  
  // Handle visibility change
  handleVisibilityChange() {
    if (document.hidden) {
      // Page is hidden, pause animations
      if (this.animationManager) {
        this.animationManager.pause();
      }
    } else {
      // Page is visible, resume animations
      if (this.animationManager) {
        this.animationManager.resume();
      }
    }
  }
  
  // Swipe handlers
  handleSwipeLeft() {
    // Could be used for navigation between timeline events
    console.log('Swipe left detected');
  }
  
  handleSwipeRight() {
    // Could be used for navigation between timeline events
    console.log('Swipe right detected');
  }
  
  handleSwipeUp() {
    // Could be used for scrolling timeline
    console.log('Swipe up detected');
  }
  
  handleSwipeDown() {
    // Could be used for scrolling timeline
    console.log('Swipe down detected');
  }
  
  // Keyboard navigation handlers
  handleEscape() {
    // Return to timeline if on detail page
    if (this.currentView !== 'timeline') {
      this.navigateToTimeline();
    }
  }
  
  handleArrowUp() {
    // Navigate to previous timeline event
    if (this.timelineManager) {
      this.timelineManager.navigateToPrevious();
    }
  }
  
  handleArrowDown() {
    // Navigate to next timeline event
    if (this.timelineManager) {
      this.timelineManager.navigateToNext();
    }
  }
  
  handleArrowLeft() {
    // Navigate to previous timeline event
    if (this.timelineManager) {
      this.timelineManager.navigateToPrevious();
    }
  }
  
  handleArrowRight() {
    // Navigate to next timeline event
    if (this.timelineManager) {
      this.timelineManager.navigateToNext();
    }
  }
  
  // Navigation methods
  navigateToTimeline() {
    window.location.href = 'index.html';
  }
  
  navigateToEvent(eventId) {
    const event = APP_CONFIG.timelineEvents.find(e => e.id === eventId);
    if (event) {
      window.location.href = event.detailPageUrl;
    }
  }
  
  // Utility methods
  isMobile() {
    return window.innerWidth <= 768 || /Android|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
  }
  
  isTouch() {
    return 'ontouchstart' in window || navigator.maxTouchPoints > 0;
  }
  
  optimizeViewport() {
    // Set viewport height for mobile browsers
    const vh = window.innerHeight * 0.01;
    document.documentElement.style.setProperty('--vh', `${vh}px`);
  }
  
  playInitialAnimations() {
    // Add fade-in animation to main elements
    const elementsToAnimate = [
      '.countdown-timer',
      '.timeline-title',
      '.timeline-bar',
      '.event-card'
    ];
    
    elementsToAnimate.forEach((selector, index) => {
      const elements = document.querySelectorAll(selector);
      elements.forEach((element, elementIndex) => {
        setTimeout(() => {
          element.classList.add('fade-in');
        }, (index * 200) + (elementIndex * 100));
      });
    });
  }
  
  showErrorMessage(message) {
    // Create and show error message
    const errorDiv = document.createElement('div');
    errorDiv.className = 'error-message';
    errorDiv.innerHTML = `
      <div class="error-content">
        <span class="error-icon">🐼</span>
        <p>${message}</p>
        <button onclick="location.reload()" class="btn">Try Again</button>
      </div>
    `;
    
    // Add error styles
    errorDiv.style.cssText = `
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background: rgba(232, 240, 228, 0.95);
      display: flex;
      align-items: center;
      justify-content: center;
      z-index: 9999;
      font-family: 'Dancing Script', cursive;
    `;
    
    document.body.appendChild(errorDiv);
  }
}

// Initialize the app
const loveStoryApp = new LoveStoryApp();

// Export for use in other modules
if (typeof module !== 'undefined' && module.exports) {
  module.exports = { LoveStoryApp, APP_CONFIG };
}