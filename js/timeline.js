/* ==============================================
   Timeline Manager - Interactive Timeline Component
   Mobile-First Timeline with Panda Theme
   ============================================== */

class TimelineManager {
  constructor(events) {
    this.events = events || [];
    this.currentEventIndex = 0;
    this.timelineBar = document.getElementById('timeline-bar');
    this.timelineEvents = document.getElementById('timeline-events');
    
    this.init();
  }
  
  init() {
    if (!this.timelineBar || !this.timelineEvents) {
      console.warn('Timeline elements not found');
      return;
    }
    
    this.renderTimeline();
    this.attachEventListeners();
    console.log('🐼 Timeline initialized with', this.events.length, 'events');
  }
  
  renderTimeline() {
    this.renderTimelineBar();
    this.renderTimelineEvents();
  }
  
  renderTimelineBar() {
    // Clear existing dots
    this.timelineBar.innerHTML = '';
    
    // Calculate positions for timeline dots
    const totalEvents = this.events.length;
    
    this.events.forEach((event, index) => {
      const dot = document.createElement('div');
      dot.className = 'timeline-dot';
      dot.dataset.eventId = event.id;
      dot.dataset.eventIndex = index;
      
      // Position dots along the timeline bar
      const position = (index / (totalEvents - 1)) * 100;
      
      // For mobile (vertical timeline), position along height
      if (window.innerWidth < 1024) {
        dot.style.top = `${position}%`;
      } else {
        // For desktop (horizontal timeline), position along width
        dot.style.left = `${position}%`;
        dot.style.top = '50%';
        dot.style.transform = 'translateY(-50%)';
      }
      
      // Add click handler
      dot.addEventListener('click', () => this.handleEventClick(event));
      
      // Add touch-friendly hover effect
      if ('ontouchstart' in window) {
        dot.addEventListener('touchstart', () => {
          dot.classList.add('touch-active');
        });
        
        dot.addEventListener('touchend', () => {
          setTimeout(() => {
            dot.classList.remove('touch-active');
          }, 200);
        });
      }
      
      this.timelineBar.appendChild(dot);
    });
  }
  
  renderTimelineEvents() {
    // Clear existing events
    this.timelineEvents.innerHTML = '';
    
    if (this.events.length === 0) {
      this.showLoadingState();
      return;
    }
    
    this.events.forEach((event, index) => {
      const eventCard = this.createEventCard(event, index);
      this.timelineEvents.appendChild(eventCard);
    });
  }
  
  createEventCard(event, index) {
    const card = document.createElement('div');
    card.className = `event-card ${event.category}`;
    card.dataset.eventId = event.id;
    card.dataset.eventIndex = index;
    
    // Format date
    const formattedDate = this.formatDate(event.date);
    
    // Create card HTML
    card.innerHTML = `
      <div class="event-header">
        <span class="event-icon">${event.icon}</span>
        <h3 class="event-title">${event.title}</h3>
        <span class="event-date">${formattedDate}</span>
      </div>
      <p class="event-preview">${event.previewText}</p>
      ${event.photoUrl ? `<img src="${event.photoUrl}" alt="${event.title}" class="event-photo-preview" onerror="this.style.display='none'">` : ''}
      <div class="panda-accent">🐼</div>
    `;
    
    // Add click handler for navigation
    card.addEventListener('click', () => this.handleEventClick(event));
    
    // Add touch feedback
    this.addTouchFeedback(card);
    
    // Add entrance animation
    setTimeout(() => {
      card.classList.add('slide-up');
    }, index * 150);
    
    return card;
  }
  
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
  
  handleEventClick(event) {
    console.log('🐼 Event clicked:', event.title);
    
    // Add click animation
    const eventCard = document.querySelector(`[data-event-id="${event.id}"]`);
    if (eventCard) {
      eventCard.classList.add('gentle-pulse');
      
      // Remove animation class after animation completes
      setTimeout(() => {
        eventCard.classList.remove('gentle-pulse');
      }, 600);
    }
    
    // Navigate to event detail page after a short delay
    setTimeout(() => {
      this.navigateToEvent(event);
    }, 300);
  }
  
  navigateToEvent(event) {
    // Check if detail page exists, otherwise show placeholder
    if (event.detailPageUrl) {
      window.location.href = event.detailPageUrl;
    } else {
      this.showEventPlaceholder(event);
    }
  }
  
  showEventPlaceholder(event) {
    // Create a modal-like overlay for events without detail pages
    const overlay = document.createElement('div');
    overlay.className = 'event-placeholder-overlay';
    overlay.innerHTML = `
      <div class="event-placeholder-content">
        <span class="event-placeholder-icon">${event.icon}</span>
        <h2>${event.title}</h2>
        <p class="event-placeholder-date">${this.formatDate(event.date)}</p>
        <p class="event-placeholder-text">${event.previewText}</p>
        <p class="event-placeholder-note">
          <span class="panda-icon">🐼</span>
          This beautiful memory is still being written...
          <span class="panda-icon">🐼</span>
        </p>
        <button class="btn back-to-timeline" onclick="this.parentElement.parentElement.remove()">
          Back to Timeline
        </button>
      </div>
    `;
    
    // Add styles
    overlay.style.cssText = `
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background: rgba(232, 240, 228, 0.95);
      display: flex;
      align-items: center;
      justify-content: center;
      z-index: 1000;
      backdrop-filter: blur(10px);
      animation: fadeIn 0.3s ease-out;
    `;
    
    document.body.appendChild(overlay);
    
    // Close on escape key
    const handleEscape = (e) => {
      if (e.key === 'Escape') {
        overlay.remove();
        document.removeEventListener('keydown', handleEscape);
      }
    };
    document.addEventListener('keydown', handleEscape);
  }
  
  formatDate(date) {
    const options = { 
      year: 'numeric', 
      month: 'short', 
      day: 'numeric' 
    };
    return date.toLocaleDateString('en-US', options);
  }
  
  showLoadingState() {
    this.timelineEvents.innerHTML = `
      <div class="timeline-loading">
        <div class="loading-panda">🐼</div>
        <p>Loading our beautiful memories...</p>
      </div>
    `;
  }
  
  // Navigation methods
  navigateToNext() {
    if (this.currentEventIndex < this.events.length - 1) {
      this.currentEventIndex++;
      this.highlightCurrentEvent();
    }
  }
  
  navigateToPrevious() {
    if (this.currentEventIndex > 0) {
      this.currentEventIndex--;
      this.highlightCurrentEvent();
    }
  }
  
  highlightCurrentEvent() {
    // Remove previous highlights
    document.querySelectorAll('.event-card.highlighted').forEach(card => {
      card.classList.remove('highlighted');
    });
    
    document.querySelectorAll('.timeline-dot.highlighted').forEach(dot => {
      dot.classList.remove('highlighted');
    });
    
    // Add highlight to current event
    const currentEvent = this.events[this.currentEventIndex];
    if (currentEvent) {
      const eventCard = document.querySelector(`[data-event-id="${currentEvent.id}"]`);
      const timelineDot = document.querySelector(`[data-event-id="${currentEvent.id}"]`);
      
      if (eventCard) {
        eventCard.classList.add('highlighted');
        eventCard.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
      
      if (timelineDot) {
        timelineDot.classList.add('highlighted');
      }
    }
  }
  
  // Handle window resize
  handleResize() {
    // Re-render timeline bar to adjust for new layout
    this.renderTimelineBar();
  }
  
  // Add new event (for future use)
  addEvent(event) {
    this.events.push(event);
    this.renderTimeline();
  }
  
  // Remove event (for future use)
  removeEvent(eventId) {
    this.events = this.events.filter(event => event.id !== eventId);
    this.renderTimeline();
  }
  
  // Update event (for future use)
  updateEvent(eventId, updatedEvent) {
    const index = this.events.findIndex(event => event.id === eventId);
    if (index !== -1) {
      this.events[index] = { ...this.events[index], ...updatedEvent };
      this.renderTimeline();
    }
  }
}

// Export for use in other modules
if (typeof module !== 'undefined' && module.exports) {
  module.exports = TimelineManager;
}