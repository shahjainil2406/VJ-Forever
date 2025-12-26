/* ==============================================
   Event Detail Page - Interactive Functionality
   Mobile-First Event Detail Pages with Panda Theme
   ============================================== */

class EventDetailManager {
  constructor(eventId) {
    this.eventId = eventId;
    this.eventData = null;
    this.isInitialized = false;
    
    // Bind methods
    this.handleKeydown = this.handleKeydown.bind(this);
    this.handleResize = this.handleResize.bind(this);
    
    // Initialize when DOM is ready
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', () => this.init());
    } else {
      this.init();
    }
  }
  
  // Initialize the event detail page
  init() {
    try {
      console.log('🐼 Initializing Event Detail Page for:', this.eventId);
      
      // Load event data
      this.loadEventData();
      
      // Initialize components
      this.initializeEventListeners();
      this.initializeBookmarks();
      this.initializeMobileOptimizations();
      
      // Play entrance animations
      this.playEntranceAnimations();
      
      this.isInitialized = true;
      console.log('💕 Event Detail Page initialized successfully!');
      
    } catch (error) {
      console.error('❌ Error initializing event detail page:', error);
      this.showErrorMessage('Sorry, something went wrong loading this memory.');
    }
  }
  
  // Load event data from timeline data
  loadEventData() {
    if (typeof TIMELINE_DATA !== 'undefined' && TIMELINE_DATA.events) {
      this.eventData = TIMELINE_DATA.events.find(event => event.id === this.eventId);
      
      if (this.eventData) {
        console.log('✅ Event data loaded:', this.eventData.title);
        this.populateEventContent();
      } else {
        console.error('❌ Event not found:', this.eventId);
        this.showErrorMessage('This memory could not be found.');
      }
    } else {
      console.error('❌ Timeline data not available');
      this.showErrorMessage('Memory data is not available.');
    }
  }
  
  // Populate event content in the page
  populateEventContent() {
    try {
      // Update page title
      document.title = `${this.eventData.title} - Our Love Story`;
      
      // Update meta description
      const metaDescription = document.querySelector('meta[name="description"]');
      if (metaDescription) {
        metaDescription.setAttribute('content', this.eventData.previewText);
      }
      
      // Update event icon
      const eventIcon = document.querySelector('.event-icon-large');
      if (eventIcon) {
        eventIcon.textContent = this.eventData.icon;
      }
      
      // Update event title
      const eventTitle = document.querySelector('.event-title');
      if (eventTitle) {
        eventTitle.textContent = this.eventData.title;
      }
      
      // Update event nickname
      const eventNickname = document.querySelector('.event-nickname');
      if (eventNickname) {
        eventNickname.textContent = this.eventData.nickname || this.eventData.title;
      }
      
      // Update event date
      const eventDate = document.querySelector('.event-date');
      if (eventDate) {
        const formattedDate = this.formatDate(new Date(this.eventData.date));
        eventDate.textContent = formattedDate;
      }
      
      // Update event location (if exists)
      const eventLocation = document.querySelector('.event-location');
      if (this.eventData.location && eventLocation) {
        const locationText = eventLocation.querySelector('.location-text');
        if (locationText) {
          locationText.textContent = this.eventData.location;
        }
        eventLocation.style.display = 'flex';
      } else if (eventLocation) {
        eventLocation.style.display = 'none';
      }
      
      // Update story content
      const storyContent = document.querySelector('.story-content');
      if (storyContent && this.eventData.detailContent) {
        // Convert line breaks to paragraphs
        const paragraphs = this.eventData.detailContent
          .split('\n\n')
          .filter(p => p.trim())
          .map(p => `<p>${p.trim()}</p>`)
          .join('');
        
        storyContent.innerHTML = paragraphs;
      }
      
      // Update navigation buttons
      this.updateNavigationButtons();
      
      // Update bookmark button
      this.updateBookmarkButton();
      
      console.log('✅ Event content populated successfully');
      
    } catch (error) {
      console.error('❌ Error populating event content:', error);
      this.showErrorMessage('Error loading event details.');
    }
  }
  
  // Update navigation buttons with adjacent events
  updateNavigationButtons() {
    if (!TIMELINE_DATA || !TIMELINE_DATA.events) return;
    
    const events = TIMELINE_DATA.events;
    const currentIndex = events.findIndex(event => event.id === this.eventId);
    
    if (currentIndex === -1) return;
    
    // Previous event
    const prevEvent = currentIndex > 0 ? events[currentIndex - 1] : null;
    const prevButton = document.querySelector('.prev-event');
    
    if (prevEvent && prevButton) {
      const prevTitle = prevButton.querySelector('.nav-event-title');
      if (prevTitle) {
        prevTitle.textContent = prevEvent.nickname || prevEvent.title;
      }
      prevButton.onclick = () => this.navigateToEvent(prevEvent.id);
      prevButton.style.display = 'flex';
    } else if (prevButton) {
      prevButton.style.display = 'none';
    }
    
    // Next event
    const nextEvent = currentIndex < events.length - 1 ? events[currentIndex + 1] : null;
    const nextButton = document.querySelector('.next-event');
    
    if (nextEvent && nextButton) {
      const nextTitle = nextButton.querySelector('.nav-event-title');
      if (nextTitle) {
        nextTitle.textContent = nextEvent.nickname || nextEvent.title;
      }
      nextButton.onclick = () => this.navigateToEvent(nextEvent.id);
      nextButton.style.display = 'flex';
    } else if (nextButton) {
      nextButton.style.display = 'none';
    }
  }
  
  // Update bookmark button based on saved state
  updateBookmarkButton() {
    const bookmarkButton = document.getElementById('bookmark-button');
    if (!bookmarkButton) return;
    
    const isBookmarked = localStorage.getItem(`bookmarked-${this.eventId}`);
    
    if (isBookmarked) {
      bookmarkButton.classList.add('bookmarked');
      bookmarkButton.innerHTML = '<span class="bookmark-icon">💖</span><span class="bookmark-text">Bookmarked!</span>';
    } else {
      bookmarkButton.classList.remove('bookmarked');
      bookmarkButton.innerHTML = '<span class="bookmark-icon">🔖</span><span class="bookmark-text">Bookmark This Memory</span>';
    }
    
    // Update onclick handler
    bookmarkButton.onclick = () => this.toggleBookmark();
  }
  
  // Initialize event listeners
  initializeEventListeners() {
    // Keyboard navigation
    document.addEventListener('keydown', this.handleKeydown);
    
    // Window resize
    window.addEventListener('resize', this.handleResize);
    
    // Visibility change (for pausing animations when tab is not active)
    document.addEventListener('visibilitychange', () => this.handleVisibilityChange());
    
    // Back button click
    const backButton = document.querySelector('.back-button');
    if (backButton) {
      backButton.addEventListener('click', () => this.navigateToTimeline());
    }
    
    // Timeline button click
    const timelineButton = document.querySelector('.timeline-button');
    if (timelineButton) {
      timelineButton.addEventListener('click', () => this.navigateToTimeline());
    }
  }
  
  // Initialize bookmark functionality
  initializeBookmarks() {
    // Check if event is already bookmarked
    this.updateBookmarkButton();
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
  
  // Handle keyboard navigation
  handleKeydown(e) {
    switch (e.key) {
      case 'Escape':
        this.navigateToTimeline();
        break;
      case 'ArrowLeft':
        e.preventDefault();
        this.navigateToPrevious();
        break;
      case 'ArrowRight':
        e.preventDefault();
        this.navigateToNext();
        break;
      case 'b':
      case 'B':
        if (e.ctrlKey || e.metaKey) {
          e.preventDefault();
          this.toggleBookmark();
        }
        break;
    }
  }
  
  // Handle window resize
  handleResize() {
    // Debounce resize events
    clearTimeout(this.resizeTimeout);
    this.resizeTimeout = setTimeout(() => {
      this.optimizeViewport();
    }, 250);
  }
  
  // Handle visibility change
  handleVisibilityChange() {
    if (document.hidden) {
      // Page is hidden, pause animations
      console.log('🐼 Page hidden, pausing animations');
    } else {
      // Page is visible, resume animations
      console.log('🐼 Page visible, resuming animations');
    }
  }
  
  // Navigation methods
  navigateToTimeline() {
    console.log('🐼 Navigating to timeline');
    window.location.href = '../index.html';
  }
  
  navigateToEvent(eventId) {
    console.log('🐼 Navigating to event:', eventId);
    window.location.href = `event-${eventId}.html`;
  }
  
  navigateToPrevious() {
    if (!TIMELINE_DATA || !TIMELINE_DATA.events) return;
    
    const events = TIMELINE_DATA.events;
    const currentIndex = events.findIndex(event => event.id === this.eventId);
    
    if (currentIndex > 0) {
      const prevEvent = events[currentIndex - 1];
      this.navigateToEvent(prevEvent.id);
    }
  }
  
  navigateToNext() {
    if (!TIMELINE_DATA || !TIMELINE_DATA.events) return;
    
    const events = TIMELINE_DATA.events;
    const currentIndex = events.findIndex(event => event.id === this.eventId);
    
    if (currentIndex < events.length - 1) {
      const nextEvent = events[currentIndex + 1];
      this.navigateToEvent(nextEvent.id);
    }
  }
  
  // Bookmark functionality
  toggleBookmark() {
    const bookmarkButton = document.getElementById('bookmark-button');
    if (!bookmarkButton) return;
    
    const isBookmarked = bookmarkButton.classList.contains('bookmarked');
    
    if (isBookmarked) {
      // Remove bookmark
      bookmarkButton.classList.remove('bookmarked');
      bookmarkButton.innerHTML = '<span class="bookmark-icon">🔖</span><span class="bookmark-text">Bookmark This Memory</span>';
      localStorage.removeItem(`bookmarked-${this.eventId}`);
      
      // Show feedback
      this.showToast('Bookmark removed', '🐼');
      
      console.log('🔖 Bookmark removed for event:', this.eventId);
    } else {
      // Add bookmark
      bookmarkButton.classList.add('bookmarked');
      bookmarkButton.innerHTML = '<span class="bookmark-icon">💖</span><span class="bookmark-text">Bookmarked!</span>';
      localStorage.setItem(`bookmarked-${this.eventId}`, 'true');
      
      // Show feedback
      this.showToast('Memory bookmarked!', '💖');
      
      console.log('💖 Bookmark added for event:', this.eventId);
    }
    
    // Add animation
    bookmarkButton.classList.add('gentle-pulse');
    setTimeout(() => {
      bookmarkButton.classList.remove('gentle-pulse');
    }, 600);
  }
  
  // Play entrance animations
  playEntranceAnimations() {
    const elementsToAnimate = [
      '.event-header-content',
      '.story-content',
      '.photo-gallery-section',
      '.special-content-section',
      '.event-navigation',
      '.bookmark-section'
    ];
    
    elementsToAnimate.forEach((selector, index) => {
      const element = document.querySelector(selector);
      if (element) {
        setTimeout(() => {
          element.classList.add('fade-in');
        }, index * 200);
      }
    });
  }
  
  // Utility methods
  formatDate(date) {
    const options = { 
      weekday: 'long',
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    };
    return date.toLocaleDateString('en-US', options);
  }
  
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
  
  // Show toast notification
  showToast(message, icon = '🐼') {
    // Remove existing toast
    const existingToast = document.querySelector('.toast-notification');
    if (existingToast) {
      existingToast.remove();
    }
    
    // Create toast
    const toast = document.createElement('div');
    toast.className = 'toast-notification';
    toast.innerHTML = `
      <span class="toast-icon">${icon}</span>
      <span class="toast-message">${message}</span>
    `;
    
    // Add styles
    toast.style.cssText = `
      position: fixed;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      background: linear-gradient(45deg, var(--sage-green), var(--mint-cream));
      color: var(--text-accent);
      padding: 1rem 2rem;
      border-radius: 25px;
      box-shadow: 0 6px 20px rgba(232, 240, 228, 0.6);
      z-index: 10000;
      font-family: 'Dancing Script', cursive;
      font-size: 1.1rem;
      font-weight: 600;
      display: flex;
      align-items: center;
      gap: 0.75rem;
      animation: toastFadeIn 0.3s ease-out;
      border: 2px solid var(--bamboo-green);
    `;
    
    document.body.appendChild(toast);
    
    // Remove toast after 2 seconds
    setTimeout(() => {
      toast.style.animation = 'toastFadeOut 0.3s ease-out';
      setTimeout(() => {
        if (toast.parentNode) {
          toast.parentNode.removeChild(toast);
        }
      }, 300);
    }, 2000);
  }
  
  // Show error message
  showErrorMessage(message) {
    const eventContent = document.querySelector('.event-content');
    if (eventContent) {
      eventContent.innerHTML = `
        <div class="content-error">
          <span class="error-panda">🐼</span>
          <p>${message}</p>
          <button onclick="window.location.href='../index.html'" class="btn">Back to Timeline</button>
        </div>
      `;
    }
  }
}

// Add toast animation styles
const toastStyles = document.createElement('style');
toastStyles.textContent = `
  @keyframes toastFadeIn {
    from {
      opacity: 0;
      transform: translate(-50%, -50%) scale(0.8);
    }
    to {
      opacity: 1;
      transform: translate(-50%, -50%) scale(1);
    }
  }
  
  @keyframes toastFadeOut {
    from {
      opacity: 1;
      transform: translate(-50%, -50%) scale(1);
    }
    to {
      opacity: 0;
      transform: translate(-50%, -50%) scale(0.8);
    }
  }
`;
document.head.appendChild(toastStyles);

// Global navigation functions for template use
function navigateToTimeline() {
  window.location.href = '../index.html';
}

function navigateToEvent(eventId) {
  window.location.href = `event-${eventId}.html`;
}

function toggleBookmark() {
  if (window.eventDetailManager) {
    window.eventDetailManager.toggleBookmark();
  }
}

// Auto-initialize based on URL or data attribute
document.addEventListener('DOMContentLoaded', function() {
  // Try to get event ID from URL or data attribute
  const urlParams = new URLSearchParams(window.location.search);
  let eventId = urlParams.get('event');
  
  if (!eventId) {
    // Try to extract from filename (e.g., event-first-talking.html)
    const filename = window.location.pathname.split('/').pop();
    const match = filename.match(/event-(.+)\.html/);
    if (match) {
      eventId = match[1];
    }
  }
  
  if (!eventId) {
    // Try to get from data attribute
    const eventElement = document.querySelector('[data-event-id]');
    if (eventElement) {
      eventId = eventElement.getAttribute('data-event-id');
    }
  }
  
  if (eventId) {
    console.log('🐼 Auto-initializing EventDetailManager for:', eventId);
    window.eventDetailManager = new EventDetailManager(eventId);
  } else {
    console.warn('⚠️ No event ID found, EventDetailManager not initialized');
  }
});

// Export for use in other modules
if (typeof module !== 'undefined' && module.exports) {
  module.exports = EventDetailManager;
}