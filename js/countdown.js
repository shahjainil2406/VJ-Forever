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
    this.milestones = this.calculateMilestones();
    
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
    
    // Check for milestones
    this.checkMilestones(timeDifference);
  }
  
  showTimeSince(timeDifference) {
    const timeUnits = this.calculateTimeUnits(timeDifference);
    
    this.element.innerHTML = `
      <div class="timer-unit">
        <span class="timer-number">${timeUnits.days}</span>
        <span class="timer-label">Days</span>
      </div>
      <div class="timer-unit">
        <span class="timer-number">${timeUnits.hours}</span>
        <span class="timer-label">Hours</span>
      </div>
      <div class="timer-unit">
        <span class="timer-number">${timeUnits.minutes}</span>
        <span class="timer-label">Minutes</span>
      </div>
      <div class="timer-unit">
        <span class="timer-number">${timeUnits.seconds}</span>
        <span class="timer-label">Seconds</span>
      </div>
    `;
    
    // Add animation to seconds for visual feedback
    const secondsElement = this.element.querySelector('.timer-unit:last-child .timer-number');
    if (secondsElement) {
      secondsElement.style.animation = 'none';
      // Trigger reflow
      void secondsElement.offsetWidth;
      secondsElement.style.animation = 'gentlePulse 1s ease-in-out';
    }
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
          <div class="timer-unit">
            <span class="timer-number">${timeUnits.days}</span>
            <span class="timer-label">Days</span>
          </div>
          <div class="timer-unit">
            <span class="timer-number">${timeUnits.hours}</span>
            <span class="timer-label">Hours</span>
          </div>
          <div class="timer-unit">
            <span class="timer-number">${timeUnits.minutes}</span>
            <span class="timer-label">Minutes</span>
          </div>
          <div class="timer-unit">
            <span class="timer-number">${timeUnits.seconds}</span>
            <span class="timer-label">Seconds</span>
          </div>
        </div>
      </div>
    `;
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
  
  calculateMilestones() {
    // Define milestone days for celebrations
    return [
      { days: 30, message: "One month of love! 🐼💕", celebrated: false },
      { days: 100, message: "100 days together! 🎉🐼", celebrated: false },
      { days: 365, message: "One year of beautiful memories! 🎂🐼", celebrated: false },
      { days: 500, message: "500 days of happiness! ✨🐼", celebrated: false },
      { days: 730, message: "Two years of love! 💖🐼", celebrated: false },
      { days: 1000, message: "1000 days together! 🎊🐼", celebrated: false },
      { days: 1095, message: "Three years of joy! 🌟🐼", celebrated: false },
      { days: 1460, message: "Four years of love! 💝🐼", celebrated: false },
      { days: 1825, message: "Five years together! 🎈🐼", celebrated: false }
    ];
  }
  
  checkMilestones(timeDifference) {
    const daysSince = Math.floor(timeDifference / (1000 * 60 * 60 * 24));
    
    this.milestones.forEach(milestone => {
      if (daysSince >= milestone.days && !milestone.celebrated) {
        this.celebrateMilestone(milestone);
        milestone.celebrated = true;
      }
    });
  }
  
  celebrateMilestone(milestone) {
    console.log('🎉 Milestone reached:', milestone.message);
    
    // Create celebration overlay
    const celebration = document.createElement('div');
    celebration.className = 'milestone-celebration';
    celebration.innerHTML = `
      <div class="celebration-content">
        <div class="celebration-pandas">🐼 🎉 🐼</div>
        <h3>Milestone Reached!</h3>
        <p>${milestone.message}</p>
        <div class="celebration-hearts">💕 ✨ 💕</div>
      </div>
    `;
    
    // Add celebration styles
    celebration.style.cssText = `
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background: rgba(232, 240, 228, 0.9);
      display: flex;
      align-items: center;
      justify-content: center;
      z-index: 9999;
      animation: fadeIn 0.5s ease-out;
      backdrop-filter: blur(5px);
    `;
    
    document.body.appendChild(celebration);
    
    // Trigger confetti effect if available
    if (typeof triggerConfetti === 'function') {
      setTimeout(() => {
        triggerConfetti();
      }, 500);
    }
    
    // Auto-remove celebration after 5 seconds
    setTimeout(() => {
      celebration.style.animation = 'fadeOut 0.5s ease-out';
      setTimeout(() => {
        if (celebration.parentNode) {
          celebration.parentNode.removeChild(celebration);
        }
      }, 500);
    }, 5000);
    
    // Allow manual close by clicking
    celebration.addEventListener('click', () => {
      celebration.style.animation = 'fadeOut 0.5s ease-out';
      setTimeout(() => {
        if (celebration.parentNode) {
          celebration.parentNode.removeChild(celebration);
        }
      }, 500);
    });
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
    // Initial render
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
    this.milestones.forEach(milestone => {
      milestone.celebrated = false;
    });
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
  const colors = ['#e8f0e4', '#f0f8f0', '#f8e8ea', '#f5f0f2'];
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

// Add confetti animation styles
const confettiStyles = document.createElement('style');
confettiStyles.textContent = `
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
document.head.appendChild(confettiStyles);

// Export for use in other modules
if (typeof module !== 'undefined' && module.exports) {
  module.exports = { CountdownTimer, triggerConfetti };
}