/* ==============================================
   Countdown Timer - Real-time Timer Component
   Mobile-First Countdown with Panda Theme
   ============================================== */

class CountdownTimer {
  constructor(element, targetDate) {
    this.element = element;
    this.targetDate = new Date(targetDate);
    this.intervalId = null;
    this.isRunning = false;
    this.previousValues = { days: 0, hours: 0, minutes: 0, seconds: 0 };
    
    // Validate target date
    if (isNaN(this.targetDate.getTime())) {
      console.error('Invalid target date provided to CountdownTimer');
      this.showError();
      return;
    }
    
    this.init();
  }
  
  init() {
    console.log('🐼 Initializing countdown timer for:', this.targetDate);
    this.render();
    this.start();
  }
  
  start() {
    if (this.isRunning) return;
    
    this.isRunning = true;
    this.update();
    this.intervalId = setInterval(() => {
      this.update();
    }, 1000);
    
    console.log('⏰ Countdown timer started');
  }
  
  stop() {
    if (this.intervalId) {
      clearInterval(this.intervalId);
      this.intervalId = null;
      this.isRunning = false;
      console.log('⏰ Countdown timer stopped');
    }
  }
  
  update() {
    const now = new Date();
    const timeDifference = now - this.targetDate;
    
    if (timeDifference < 0) {
      // Target date is in the future - show countdown to date
      this.showCountdownTo();
    } else {
      // Target date is in the past - show time since date
      this.showTimeSince(timeDifference);
    }
  }
  
  showTimeSince(timeDifference) {
    const timeUnits = this.calculateTimeUnits(timeDifference);
    
    // Create timer HTML with smooth transition support
    this.element.innerHTML = `
      <div class="timer-unit" data-unit="days">
        <span class="timer-number" data-value="${timeUnits.days}">${timeUnits.days}</span>
        <span class="timer-label">Days</span>
      </div>
      <div class="timer-unit" data-unit="hours">
        <span class="timer-number" data-value="${timeUnits.hours}">${timeUnits.hours}</span>
        <span class="timer-label">Hours</span>
      </div>
      <div class="timer-unit" data-unit="minutes">
        <span class="timer-number" data-value="${timeUnits.minutes}">${timeUnits.minutes}</span>
        <span class="timer-label">Minutes</span>
      </div>
      <div class="timer-unit" data-unit="seconds">
        <span class="timer-number" data-value="${timeUnits.seconds}">${timeUnits.seconds}</span>
        <span class="timer-label">Seconds</span>
      </div>
    `;
    
    // Add smooth animations for number transitions
    this.animateNumberChanges(timeUnits);
  }
  
  showCountdownTo() {
    // If the target date is in the future, show countdown
    const now = new Date();
    const timeDifference = this.targetDate - now;
    const timeUnits = this.calculateTimeUnits(timeDifference);
    
    this.element.innerHTML = `
      <div class="countdown-future">
        <p class="countdown-message">Counting down to our special day...</p>
        <div class="timer-display">
          <div class="timer-unit" data-unit="days">
            <span class="timer-number" data-value="${timeUnits.days}">${timeUnits.days}</span>
            <span class="timer-label">Days</span>
          </div>
          <div class="timer-unit" data-unit="hours">
            <span class="timer-number" data-value="${timeUnits.hours}">${timeUnits.hours}</span>
            <span class="timer-label">Hours</span>
          </div>
          <div class="timer-unit" data-unit="minutes">
            <span class="timer-number" data-value="${timeUnits.minutes}">${timeUnits.minutes}</span>
            <span class="timer-label">Minutes</span>
          </div>
          <div class="timer-unit" data-unit="seconds">
            <span class="timer-number" data-value="${timeUnits.seconds}">${timeUnits.seconds}</span>
            <span class="timer-label">Seconds</span>
          </div>
        </div>
      </div>
    `;
    
    // Add smooth animations for countdown
    this.animateNumberChanges(timeUnits);
  }
  
  animateNumberChanges(currentValues) {
    // Animate changes for each time unit
    Object.keys(currentValues).forEach(unit => {
      const currentValue = parseInt(currentValues[unit]);
      const previousValue = this.previousValues[unit];
      
      if (currentValue !== previousValue) {
        this.animateNumberTransition(unit, previousValue, currentValue);
      }
    });
    
    // Update previous values for next comparison
    this.previousValues = {
      days: parseInt(currentValues.days),
      hours: parseInt(currentValues.hours),
      minutes: parseInt(currentValues.minutes),
      seconds: parseInt(currentValues.seconds)
    };
    
    // Always animate seconds for visual feedback
    const secondsElement = this.element.querySelector('[data-unit="seconds"] .timer-number');
    if (secondsElement) {
      this.addPulseAnimation(secondsElement);
    }
  }
  
  animateNumberTransition(unit, oldValue, newValue) {
    const numberElement = this.element.querySelector(`[data-unit="${unit}"] .timer-number`);
    if (!numberElement) return;
    
    // Add transition class
    numberElement.classList.add('number-changing');
    
    // Create flip animation effect
    numberElement.style.transform = 'rotateX(90deg)';
    numberElement.style.opacity = '0.7';
    
    setTimeout(() => {
      numberElement.textContent = this.formatNumber(newValue);
      numberElement.style.transform = 'rotateX(0deg)';
      numberElement.style.opacity = '1';
      
      // Add a gentle glow effect for significant changes
      if (unit === 'days' || unit === 'hours') {
        this.addGlowEffect(numberElement);
      }
      
      // Remove transition class after animation
      setTimeout(() => {
        numberElement.classList.remove('number-changing');
      }, 300);
    }, 150);
  }
  
  addPulseAnimation(element) {
    element.classList.remove('pulse-animation');
    // Trigger reflow
    void element.offsetWidth;
    element.classList.add('pulse-animation');
    
    // Remove class after animation
    setTimeout(() => {
      element.classList.remove('pulse-animation');
    }, 1000);
  }
  
  addGlowEffect(element) {
    element.classList.add('glow-effect');
    
    // Remove glow after animation
    setTimeout(() => {
      element.classList.remove('glow-effect');
    }, 2000);
  }
  
  calculateTimeUnits(timeDifference) {
    const totalSeconds = Math.floor(Math.abs(timeDifference) / 1000);
    
    const days = Math.floor(totalSeconds / (24 * 60 * 60));
    const hours = Math.floor((totalSeconds % (24 * 60 * 60)) / (60 * 60));
    const minutes = Math.floor((totalSeconds % (60 * 60)) / 60);
    const seconds = totalSeconds % 60;
    
    return {
      days: this.formatNumber(days),
      hours: this.formatNumber(hours),
      minutes: this.formatNumber(minutes),
      seconds: this.formatNumber(seconds)
    };
  }
  
  formatNumber(num) {
    return num.toString().padStart(2, '0');
  }
  
  showError() {
    this.element.innerHTML = `
      <div class="timer-error">
        <span class="error-panda">🐼</span>
        <p>Oops! There's an issue with the timer.</p>
        <p>Please check the date configuration.</p>
      </div>
    `;
  }
  
  render() {
    // Initial render with loading state
    this.element.innerHTML = `
      <div class="timer-loading">
        <span class="loading-panda">🐼</span>
        <p>Loading our time together...</p>
      </div>
    `;
  }
  
  // Public methods for external control
  pause() {
    this.stop();
  }
  
  resume() {
    this.start();
  }
  
  reset() {
    this.stop();
    this.previousValues = { days: 0, hours: 0, minutes: 0, seconds: 0 };
    this.init();
  }
  
  updateTargetDate(newDate) {
    this.targetDate = new Date(newDate);
    if (isNaN(this.targetDate.getTime())) {
      console.error('Invalid new target date provided');
      this.showError();
      return;
    }
    
    this.reset();
  }
  
  // Get current time difference for external use
  getTimeDifference() {
    const now = new Date();
    return now - this.targetDate;
  }
  
  // Get formatted time string for external use
  getFormattedTime() {
    const timeDifference = this.getTimeDifference();
    const timeUnits = this.calculateTimeUnits(timeDifference);
    
    return `${timeUnits.days} days, ${timeUnits.hours} hours, ${timeUnits.minutes} minutes, ${timeUnits.seconds} seconds`;
  }
}

// Confetti effect for celebrations
function triggerConfetti() {
  // Create confetti particles
  const colors = ['#e8f0e4', '#f0f8f0', '#f8e8ea', '#f5f0f2', '#87a96b', '#6b8e5a'];
  const confettiCount = 50;
  
  for (let i = 0; i < confettiCount; i++) {
    createConfettiParticle(colors[Math.floor(Math.random() * colors.length)]);
  }
}

function createConfettiParticle(color) {
  const particle = document.createElement('div');
  particle.style.cssText = `
    position: fixed;
    width: 10px;
    height: 10px;
    background: ${color};
    top: -10px;
    left: ${Math.random() * 100}%;
    z-index: 10000;
    border-radius: 50%;
    pointer-events: none;
    animation: confettiFall ${2 + Math.random() * 3}s linear forwards;
  `;
  
  document.body.appendChild(particle);
  
  // Remove particle after animation
  setTimeout(() => {
    if (particle.parentNode) {
      particle.parentNode.removeChild(particle);
    }
  }, 5000);
}

// Initialize countdown timer when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
  console.log('🐼 DOM loaded, initializing countdown timer...');
  
  try {
    const timerDisplay = document.getElementById('timer-display');
    if (timerDisplay && typeof TIMELINE_DATA !== 'undefined') {
      console.log('✅ Timer display and data found, creating CountdownTimer instance');
      
      // Create countdown timer instance
      const countdownTimer = new CountdownTimer(timerDisplay, TIMELINE_DATA.dalChawalDate);
      
      // Make timer globally available for debugging
      window.countdownTimer = countdownTimer;
      
      console.log('🎉 CountdownTimer initialized successfully!');
    } else {
      console.warn('⚠️ Timer display element or timeline data not found, using fallback');
      // Fallback timer is already implemented in index.html
    }
  } catch (error) {
    console.error('❌ Error initializing CountdownTimer:', error);
    // Fallback timer will continue to work
  }
});

// Add animation styles for smooth transitions
const animationStyles = document.createElement('style');
animationStyles.textContent = `
  /* Number transition animations */
  .timer-number {
    transition: all 0.3s ease-in-out;
  }
  
  .timer-number.number-changing {
    transition: all 0.15s ease-in-out;
  }
  
  .timer-number.pulse-animation {
    animation: timerPulse 1s ease-in-out;
  }
  
  .timer-number.glow-effect {
    animation: timerGlow 2s ease-in-out;
  }
  
  @keyframes timerPulse {
    0%, 100% {
      transform: scale(1);
      color: var(--forest-green);
    }
    50% {
      transform: scale(1.05);
      color: var(--bamboo-green);
    }
  }
  
  @keyframes timerGlow {
    0%, 100% {
      text-shadow: 1px 1px 2px rgba(107, 142, 90, 0.2);
      color: var(--forest-green);
    }
    50% {
      text-shadow: 0 0 10px rgba(135, 169, 107, 0.6), 1px 1px 2px rgba(107, 142, 90, 0.4);
      color: var(--bamboo-green);
    }
  }
  
  @keyframes confettiFall {
    0% {
      transform: translateY(-100vh) rotate(0deg);
      opacity: 1;
    }
    100% {
      transform: translateY(100vh) rotate(720deg);
      opacity: 0;
    }
  }
  
  @keyframes fadeOut {
    from { opacity: 1; }
    to { opacity: 0; }
  }
`;
document.head.appendChild(animationStyles);

// Export for use in other modules
if (typeof module !== 'undefined' && module.exports) {
  module.exports = { CountdownTimer, triggerConfetti };
}