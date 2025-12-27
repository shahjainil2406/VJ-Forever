/* ==============================================
   Navigation Module - Event Detail Navigation
   Handles navigation to event detail pages
   ============================================== */

// Navigation Manager Class
class NavigationManager {
  constructor() {
    this.eventPageMap = {
      'first-talking': 'pages/event-first-talking.html',
      'birthday-tir-i-miss-u': 'pages/event-birthday-tir-i-miss-u.html',
      'vadodara-family': 'pages/event-vadodara-family.html',
      'roka-day': 'pages/event-roka-day.html',
      'bangalore-first-kiss': 'pages/event-bangalore-first-kiss.html',
      'our-engagement': 'pages/event-our-engagement.html',
      'the-day-we': 'pages/event-the-day-we.html',
      'day-to-forever': 'pages/event-day-to-forever.html'
    };
    
    this.init();
  }
  
  init() {
    console.log('🐼 Navigation Manager initialized');
    
    // Make navigateToEventDetail globally available
    window.navigateToEventDetail = this.navigateToEventDetail.bind(this);
    
    // Set up event delegation for timeline elements
    this.setupEventDelegation();
  }
  
  // Set up event delegation for better performance and reliability
  setupEventDelegation() {
    const timelineContainer = document.querySelector('.timeline-section');
    if (timelineContainer) {
      // Use event delegation for better performance
      timelineContainer.addEventListener('click', this.handleTimelineClick.bind(this));
      timelineContainer.addEventListener('touchend', this.handleTimelineTouch.bind(this));
    }
  }
  
  // Handle timeline clicks with event delegation
  handleTimelineClick(e) {
    const timelineDot = e.target.closest('.timeline-dot');
    const timelineLabel = e.target.closest('.timeline-date-label');
    
    if (timelineDot || timelineLabel) {
      e.preventDefault();
      e.stopPropagation();
      
      const element = timelineDot || timelineLabel;
      const eventId = element.getAttribute('data-event-id');
      const eventIndex = element.getAttribute('data-index');
      
      console.log('🐼 Timeline element clicked:', { eventId, eventIndex });
      
      if (eventId) {
        // Find the event data
        const event = this.findEventById(eventId);
        if (event) {
          this.navigateToEventDetail(event);
        } else {
          console.error('❌ Event not found:', eventId);
        }
      }
    }
  }
  
  // Handle timeline touch events
  handleTimelineTouch(e) {
    // Prevent double handling of touch events
    if (e.cancelable) {
      e.preventDefault();
    }
    
    const timelineDot = e.target.closest('.timeline-dot');
    const timelineLabel = e.target.closest('.timeline-date-label');
    
    if (timelineDot || timelineLabel) {
      const element = timelineDot || timelineLabel;
      const eventId = element.getAttribute('data-event-id');
      
      console.log('🐼 Timeline element touched:', eventId);
      
      if (eventId) {
        const event = this.findEventById(eventId);
        if (event) {
          this.navigateToEventDetail(event);
        }
      }
    }
  }
  
  // Find event by ID from timeline data
  findEventById(eventId) {
    if (typeof TIMELINE_DATA !== 'undefined' && TIMELINE_DATA.events) {
      return TIMELINE_DATA.events.find(event => event.id === eventId);
    }
    
    // Fallback to APP_CONFIG if available
    if (typeof APP_CONFIG !== 'undefined' && APP_CONFIG.timelineEvents) {
      return APP_CONFIG.timelineEvents.find(event => event.id === eventId);
    }
    
    console.error('❌ No timeline data available');
    return null;
  }
  
  // Main navigation function - enhanced with better error handling
  navigateToEventDetail(event) {
    console.log('🐼 Navigating to event detail:', event.title);
    
    try {
      // Add click animation to provide immediate feedback
      this.addClickFeedback(event);
      
      // Use event.id for mapping, fallback to title-based mapping
      const eventId = event.id || event.title.toLowerCase().replace(/[^a-z0-9]/g, '-');
      const detailPageUrl = this.eventPageMap[eventId];
      
      if (detailPageUrl) {
        console.log('🐼 Navigating to detail page:', detailPageUrl);
        
        // Check if the page exists before navigating
        this.checkPageExists(detailPageUrl)
          .then(exists => {
            if (exists) {
              // Add loading state
              this.showNavigationLoading();
              
              // Navigate after a short delay for better UX
              setTimeout(() => {
                window.location.href = detailPageUrl;
              }, 300);
            } else {
              console.log('🐼 Detail page not found, showing preview for:', event.title);
              this.showEventPreview(event);
            }
          })
          .catch(() => {
            // If check fails, show preview as fallback
            console.log('🐼 Page check failed, showing preview for:', event.title);
            this.showEventPreview(event);
          });
      } else {
        // Show preview modal for events without detail pages
        console.log('🐼 No detail page mapping found, showing preview for:', event.title);
        this.showEventPreview(event);
      }
    } catch (error) {
      console.error('❌ Error in navigateToEventDetail:', error);
      this.showErrorMessage('Sorry, something went wrong. Please try again.');
    }
  }
  
  // Add visual feedback for clicks/touches
  addClickFeedback(event) {
    // Find the timeline element for this event
    const timelineDot = document.querySelector(`[data-event-id="${event.id}"]`);
    if (timelineDot) {
      timelineDot.classList.add('gentle-pulse');
      setTimeout(() => {
        timelineDot.classList.remove('gentle-pulse');
      }, 600);
    }
  }
  
  // Check if a page exists
  checkPageExists(url) {
    return new Promise((resolve) => {
      const xhr = new XMLHttpRequest();
      xhr.open('HEAD', url, true);
      xhr.onreadystatechange = function() {
        if (xhr.readyState === 4) {
          resolve(xhr.status === 200);
        }
      };
      xhr.onerror = () => resolve(false);
      xhr.send();
    });
  }
  
  // Show navigation loading state
  showNavigationLoading() {
    const loadingIndicator = document.createElement('div');
    loadingIndicator.className = 'navigation-loading';
    loadingIndicator.innerHTML = `
      <div class="loading-content">
        <div class="loading-pandas">
          <span class="panda-icon loading-panda-1">🐼</span>
          <span class="panda-icon loading-panda-2">💕</span>
          <span class="panda-icon loading-panda-3">🐼</span>
        </div>
        <p>Loading our memory...</p>
      </div>
    `;
    
    loadingIndicator.style.cssText = `
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
      backdrop-filter: blur(5px);
    `;
    
    document.body.appendChild(loadingIndicator);
    
    // Remove after 2 seconds as fallback
    setTimeout(() => {
      if (loadingIndicator.parentNode) {
        loadingIndicator.remove();
      }
    }, 2000);
  }
  
  // Enhanced event preview with romantic personalization
  showEventPreview(event) {
    // Remove existing preview
    const existingPreview = document.querySelector('.event-preview-modal');
    if (existingPreview) {
      existingPreview.remove();
    }
    
    const eventId = event.id || event.title.toLowerCase().replace(/[^a-z0-9]/g, '-');
    const hasDetailPage = this.eventPageMap[eventId];
    
    // Create enhanced preview modal with romantic touches
    const modal = document.createElement('div');
    modal.className = 'event-preview-modal';
    modal.innerHTML = `
      <div class="event-preview-content">
        <div class="preview-header">
          <span class="preview-icon">${event.icon}</span>
          <h3 class="preview-title">${event.nickname || event.title}</h3>
          <button class="preview-close" onclick="this.parentElement.parentElement.parentElement.remove()">×</button>
        </div>
        <div class="preview-body">
          <p class="preview-description">${event.previewText}</p>
          ${event.location ? `<div class="preview-location">📍 ${event.location}</div>` : ''}
          <div class="preview-date">${new Date(event.date).toLocaleDateString('en-US', { 
            weekday: 'long', 
            year: 'numeric', 
            month: 'long', 
            day: 'numeric' 
          })}</div>
        </div>
        <div class="preview-footer">
          ${hasDetailPage ? `
            <button class="preview-button detail-button" onclick="window.location.href='${hasDetailPage}'">
              <span class="panda-icon">🐼</span>
              View Full Story
              <span class="panda-icon">💕</span>
            </button>
          ` : `
            <div class="preview-note">
              <span class="panda-icon">🐼</span>
              Detail page coming soon!
              <span class="panda-icon">🐼</span>
            </div>
          `}
          <button class="preview-button close-button" onclick="this.parentElement.parentElement.parentElement.remove()">
            Close
          </button>
        </div>
      </div>
    `;
    
    // Add enhanced modal styles with romantic touches
    modal.style.cssText = `
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
      backdrop-filter: blur(10px);
      animation: modalFadeIn 0.3s ease-out;
      font-family: 'Dancing Script', cursive;
    `;
    
    document.body.appendChild(modal);
    
    // Add romantic sparkle effect for special events
    if (event.title.includes('Said Yes') || event.title.includes('Engagement')) {
      this.addSparkleEffect(modal);
    }
    
    // Close on escape key
    const handleEscape = (e) => {
      if (e.key === 'Escape') {
        modal.remove();
        document.removeEventListener('keydown', handleEscape);
      }
    };
    document.addEventListener('keydown', handleEscape);
    
    // Close on background click
    modal.addEventListener('click', (e) => {
      if (e.target === modal) {
        modal.remove();
      }
    });
  }
  
  // Add sparkle effect for special romantic moments
  addSparkleEffect(container) {
    const sparkles = ['✨', '💫', '⭐', '🌟'];
    
    for (let i = 0; i < 8; i++) {
      const sparkle = document.createElement('div');
      sparkle.textContent = sparkles[Math.floor(Math.random() * sparkles.length)];
      sparkle.style.cssText = `
        position: absolute;
        font-size: 1.5rem;
        pointer-events: none;
        animation: sparkleFloat 3s ease-in-out infinite;
        animation-delay: ${i * 0.3}s;
        top: ${Math.random() * 80 + 10}%;
        left: ${Math.random() * 80 + 10}%;
        opacity: 0.7;
      `;
      container.appendChild(sparkle);
    }
  }
  
  // Show error message
  showErrorMessage(message) {
    const errorDiv = document.createElement('div');
    errorDiv.className = 'navigation-error';
    errorDiv.innerHTML = `
      <div class="error-content">
        <span class="error-icon">🐼</span>
        <p>${message}</p>
        <button onclick="this.parentElement.parentElement.remove()" class="btn">OK</button>
      </div>
    `;
    
    errorDiv.style.cssText = `
      position: fixed;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      background: rgba(232, 240, 228, 0.95);
      padding: 2rem;
      border-radius: 20px;
      z-index: 10001;
      font-family: 'Dancing Script', cursive;
      text-align: center;
      box-shadow: 0 8px 24px rgba(0, 0, 0, 0.2);
    `;
    
    document.body.appendChild(errorDiv);
    
    // Auto-remove after 5 seconds
    setTimeout(() => {
      if (errorDiv.parentNode) {
        errorDiv.remove();
      }
    }, 5000);
  }
}

// Initialize navigation manager when DOM is ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', () => {
    window.navigationManager = new NavigationManager();
  });
} else {
  window.navigationManager = new NavigationManager();
}

// Export for use in other modules
if (typeof module !== 'undefined' && module.exports) {
  module.exports = NavigationManager;
}