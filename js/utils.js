/* ==============================================
   Consolidated Utility Functions
   Eliminates duplicate code patterns
   ============================================== */

// Consolidated Timer Utility
class CountdownTimer {
  constructor(targetDate, displayElement, messageElement) {
    this.targetDate = new Date(targetDate);
    this.displayElement = displayElement;
    this.messageElement = messageElement;
    this.interval = null;
  }

  start() {
    this.update();
    this.interval = setInterval(() => this.update(), 1000);
  }

  stop() {
    if (this.interval) {
      clearInterval(this.interval);
      this.interval = null;
    }
  }

  update() {
    try {
      const now = new Date();
      const timeDiff = this.targetDate - now;
      
      if (timeDiff > 0) {
        // Counting down to future date
        const days = Math.floor(timeDiff / (1000 * 60 * 60 * 24));
        const hours = Math.floor((timeDiff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((timeDiff % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((timeDiff % (1000 * 60)) / 1000);
        
        this.displayElement.innerHTML = this.formatTimerDisplay(days, hours, minutes, seconds);
      } else {
        // Date has passed - show time since
        const pastDiff = Math.abs(timeDiff);
        const days = Math.floor(pastDiff / (1000 * 60 * 60 * 24));
        const hours = Math.floor((pastDiff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((pastDiff % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((pastDiff % (1000 * 60)) / 1000);
        
        this.displayElement.innerHTML = this.formatTimerDisplay(days, hours, minutes, seconds);
      }
    } catch (error) {
      console.error('Timer update error:', error);
    }
  }

  formatTimerDisplay(days, hours, minutes, seconds) {
    return `
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
}

// Consolidated Event Handler Utility
class EventHandlerManager {
  static addClickHandler(element, callback, options = {}) {
    const { enableTouch = true, enableHover = true } = options;
    
    // Desktop click handler
    element.addEventListener('click', callback);
    
    if (enableTouch) {
      // Enhanced touch support for mobile
      element.addEventListener('touchstart', (e) => {
        element.classList.add('touch-active');
        setTimeout(() => element.classList.remove('touch-active'), 200);
      }, { passive: true });
      
      element.addEventListener('touchend', (e) => {
        e.preventDefault();
        e.stopPropagation();
        callback(e);
      });
    }
    
    if (enableHover) {
      // Hover effects
      element.addEventListener('mouseenter', () => element.classList.add('highlighted'));
      element.addEventListener('mouseleave', () => element.classList.remove('highlighted'));
    }
  }

  static addNavigationHandler(element, url, options = {}) {
    const { transition = true, delay = 300 } = options;
    
    const navigateHandler = (e) => {
      e.preventDefault();
      e.stopPropagation();
      
      // Add click animation
      element.classList.add('gentle-pulse');
      setTimeout(() => element.classList.remove('gentle-pulse'), 600);
      
      if (transition) {
        // Add smooth transition effect
        document.body.style.transition = 'opacity 0.3s ease';
        document.body.style.opacity = '0.7';
        
        setTimeout(() => {
          window.location.href = url;
        }, delay);
      } else {
        window.location.href = url;
      }
    };
    
    this.addClickHandler(element, navigateHandler);
  }
}

// Consolidated Animation Utility
class AnimationManager {
  static addGentlePulse(element, duration = 3000) {
    element.style.animation = `gentlePulse ${duration}ms ease-in-out infinite`;
  }

  static addFadeIn(element, delay = 0) {
    element.style.opacity = '0';
    element.style.transform = 'translateY(30px)';
    element.style.transition = 'all 0.8s ease-out';
    
    setTimeout(() => {
      element.style.opacity = '1';
      element.style.transform = 'translateY(0)';
    }, delay);
  }

  static addStaggeredFadeIn(elements, baseDelay = 150) {
    elements.forEach((element, index) => {
      this.addFadeIn(element, index * baseDelay);
    });
  }
}

// Consolidated Modal Utility
class ModalManager {
  static createModal(content, options = {}) {
    const { className = 'modal', closeOnBackdrop = true } = options;
    
    const modal = document.createElement('div');
    modal.className = className;
    modal.innerHTML = content;
    
    if (closeOnBackdrop) {
      modal.addEventListener('click', (e) => {
        if (e.target === modal) {
          this.closeModal(modal);
        }
      });
    }
    
    document.body.appendChild(modal);
    document.body.style.overflow = 'hidden';
    
    return modal;
  }

  static closeModal(modal) {
    if (modal && modal.parentNode) {
      modal.parentNode.removeChild(modal);
      document.body.style.overflow = '';
    }
  }
}

// Consolidated Validation Utility
class ValidationManager {
  static validateIntegration() {
    console.log('🐼 Running consolidated integration validation...');
    
    const validationResults = {
      timelineData: typeof TIMELINE_DATA !== 'undefined',
      countdownTimer: document.getElementById('timer-display') !== null,
      timelineElements: document.getElementById('timeline-bar') !== null,
      responsiveDesign: document.querySelector('meta[name="viewport"]') !== null,
      animations: document.querySelectorAll('.panda-decoration').length > 0
    };
    
    const passedChecks = Object.values(validationResults).filter(result => result === true).length;
    const totalChecks = Object.keys(validationResults).length;
    const successRate = Math.round((passedChecks / totalChecks) * 100);
    
    console.log(`🎯 Integration Status: ${passedChecks}/${totalChecks} (${successRate}%)`);
    
    if (successRate >= 90) {
      console.log('🎉 Excellent! All components integrated perfectly!');
      this.showIntegrationSuccess();
    }
    
    return validationResults;
  }

  static showIntegrationSuccess() {
    const successIndicator = document.createElement('div');
    successIndicator.style.cssText = `
      position: fixed;
      top: 10px;
      right: 10px;
      background: var(--gradient-sage-mint);
      color: var(--forest-green);
      padding: 0.5rem 1rem;
      border-radius: 20px;
      font-family: 'Dancing Script', cursive;
      font-size: 0.9rem;
      font-weight: 600;
      z-index: 1000;
      box-shadow: var(--shadow-soft);
      opacity: 0;
      transition: opacity 0.3s ease;
      pointer-events: none;
    `;
    successIndicator.innerHTML = '🐼 All systems ready! 💕';
    
    document.body.appendChild(successIndicator);
    
    setTimeout(() => successIndicator.style.opacity = '1', 100);
    setTimeout(() => {
      successIndicator.style.opacity = '0';
      setTimeout(() => {
        if (successIndicator.parentNode) {
          successIndicator.parentNode.removeChild(successIndicator);
        }
      }, 300);
    }, 3000);
  }
}

// Export utilities for use in other files
window.CountdownTimer = CountdownTimer;
window.EventHandlerManager = EventHandlerManager;
window.AnimationManager = AnimationManager;
window.ModalManager = ModalManager;
window.ValidationManager = ValidationManager;