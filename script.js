// Page Navigation Logic
class PageNavigator {
  constructor() {
    this.currentPage = 1;
    this.totalPages = document.querySelectorAll('[data-page]').length;
    this.initializeNavigation();
  }

  initializeNavigation() {
    // Initialize buttons
    const nextButtons = document.querySelectorAll('[data-action="next"]');
    const prevButtons = document.querySelectorAll('[data-action="prev"]');

    nextButtons.forEach(btn => {
      btn.addEventListener('click', () => this.nextPage());
    });

    prevButtons.forEach(btn => {
      btn.addEventListener('click', () => this.prevPage());
    });

    // Initialize keyboard navigation
    document.addEventListener('keydown', (e) => {
      if (e.key === 'ArrowRight') this.nextPage();
      if (e.key === 'ArrowLeft') this.prevPage();
    });

    this.showPage(this.currentPage);
  }

  nextPage() {
    if (this.currentPage < this.totalPages) {
      this.currentPage++;
      this.showPage(this.currentPage);
    }
  }

  prevPage() {
    if (this.currentPage > 1) {
      this.currentPage--;
      this.showPage(this.currentPage);
    }
  }

  showPage(pageNumber) {
    const pages = document.querySelectorAll('[data-page]');
    pages.forEach(page => {
      page.classList.remove('active');
    });

    const targetPage = document.querySelector(`[data-page="${pageNumber}"]`);
    if (targetPage) {
      targetPage.classList.add('active');
      
      // Trigger animation
      this.animatePageTransition(targetPage);

      // Initialize countdown timer if present
      const countdownElement = targetPage.querySelector('[data-countdown]');
      if (countdownElement) {
        this.initializeCountdownTimer(countdownElement);
      }

      // Trigger confetti if it's the final page
      if (pageNumber === this.totalPages) {
        triggerConfetti();
      }
    }

    // Update navigation buttons
    this.updateNavigationState();
  }

  updateNavigationState() {
    const prevButtons = document.querySelectorAll('[data-action="prev"]');
    const nextButtons = document.querySelectorAll('[data-action="next"]');

    prevButtons.forEach(btn => {
      btn.disabled = this.currentPage === 1;
    });

    nextButtons.forEach(btn => {
      btn.disabled = this.currentPage === this.totalPages;
    });
  }

  animatePageTransition(page) {
    page.style.animation = 'none';
    // Trigger reflow to restart animation
    void page.offsetWidth;
    page.style.animation = 'pageSlideIn 0.6s ease-out forwards';
  }
}

// Page Transition Animations
const createTransitionStyles = () => {
  const style = document.createElement('style');
  style.textContent = `
    @keyframes pageSlideIn {
      from {
        opacity: 0;
        transform: translateX(30px);
      }
      to {
        opacity: 1;
        transform: translateX(0);
      }
    }

    @keyframes pageFadeIn {
      from {
        opacity: 0;
      }
      to {
        opacity: 1;
      }
    }

    @keyframes pageZoomIn {
      from {
        opacity: 0;
        transform: scale(0.95);
      }
      to {
        opacity: 1;
        transform: scale(1);
      }
    }

    @keyframes bounce {
      0%, 100% {
        transform: translateY(0);
      }
      50% {
        transform: translateY(-10px);
      }
    }

    [data-page] {
      display: none;
      animation: pageSlideIn 0.6s ease-out forwards;
    }

    [data-page].active {
      display: block;
    }

    .transition-fade {
      animation: pageFadeIn 0.5s ease-in-out;
    }

    .transition-zoom {
      animation: pageZoomIn 0.5s ease-out;
    }

    .bounce-element {
      animation: bounce 0.6s ease-in-out;
    }
  `;
  document.head.appendChild(style);
};

// Countdown Timer Functionality
class CountdownTimer {
  constructor(element, targetDate) {
    this.element = element;
    this.targetDate = new Date(targetDate).getTime();
    this.intervalId = null;
    this.start();
  }

  start() {
    this.update();
    this.intervalId = setInterval(() => this.update(), 1000);
  }

  update() {
    const now = new Date().getTime();
    const distance = this.targetDate - now;

    if (distance < 0) {
      this.element.innerHTML = '<span class="countdown-expired">Time\'s up!</span>';
      clearInterval(this.intervalId);
      return;
    }

    const days = Math.floor(distance / (1000 * 60 * 60 * 24));
    const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((distance % (1000 * 60)) / 1000);

    this.element.innerHTML = `
      <div class="countdown-container">
        <div class="countdown-unit">
          <span class="countdown-value">${days}</span>
          <span class="countdown-label">Days</span>
        </div>
        <div class="countdown-unit">
          <span class="countdown-value">${hours}</span>
          <span class="countdown-label">Hours</span>
        </div>
        <div class="countdown-unit">
          <span class="countdown-value">${minutes}</span>
          <span class="countdown-label">Minutes</span>
        </div>
        <div class="countdown-unit">
          <span class="countdown-value">${seconds}</span>
          <span class="countdown-label">Seconds</span>
        </div>
      </div>
    `;
  }

  stop() {
    clearInterval(this.intervalId);
  }
}

// Confetti Effect
function triggerConfetti() {
  const canvas = document.getElementById('confetti-canvas') || createConfettiCanvas();
  const ctx = canvas.getContext('2d');
  const particles = [];

  // Resize canvas to match window
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;

  // Create confetti particles
  for (let i = 0; i < 100; i++) {
    particles.push({
      x: Math.random() * canvas.width,
      y: -10,
      vx: (Math.random() - 0.5) * 8,
      vy: Math.random() * 5 + 3,
      size: Math.random() * 8 + 4,
      color: getRandomColor(),
      rotation: Math.random() * Math.PI * 2,
      rotationVel: (Math.random() - 0.5) * 0.2,
      opacity: 1
    });
  }

  const animate = () => {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.globalAlpha = 1;

    let activeParticles = false;

    particles.forEach(particle => {
      if (particle.opacity > 0) {
        activeParticles = true;

        // Update position
        particle.x += particle.vx;
        particle.y += particle.vy;
        particle.vy += 0.2; // gravity
        particle.rotation += particle.rotationVel;
        particle.opacity -= 0.01;

        // Draw particle
        ctx.save();
        ctx.globalAlpha = particle.opacity;
        ctx.translate(particle.x, particle.y);
        ctx.rotate(particle.rotation);
        ctx.fillStyle = particle.color;
        ctx.fillRect(-particle.size / 2, -particle.size / 2, particle.size, particle.size);
        ctx.restore();
      }
    });

    if (activeParticles) {
      requestAnimationFrame(animate);
    } else {
      // Hide canvas when animation is complete
      canvas.style.pointerEvents = 'none';
    }
  };

  animate();
}

function createConfettiCanvas() {
  const canvas = document.createElement('canvas');
  canvas.id = 'confetti-canvas';
  canvas.style.position = 'fixed';
  canvas.style.top = '0';
  canvas.style.left = '0';
  canvas.style.width = '100%';
  canvas.style.height = '100%';
  canvas.style.pointerEvents = 'none';
  canvas.style.zIndex = '9999';
  document.body.appendChild(canvas);
  return canvas;
}

function getRandomColor() {
  const colors = ['#FF6B6B', '#4ECDC4', '#45B7D1', '#FFA07A', '#98D8C8', '#F7DC6F', '#BB8FCE', '#85C1E2'];
  return colors[Math.floor(Math.random() * colors.length)];
}

// Initialize countdown timer from data attribute
function initializeCountdownTimer(element) {
  const targetDate = element.getAttribute('data-countdown');
  if (targetDate) {
    new CountdownTimer(element, targetDate);
  }
}

// Initialize everything on DOM content loaded
document.addEventListener('DOMContentLoaded', () => {
  // Create transition animations
  createTransitionStyles();

  // Initialize page navigator
  const navigator = new PageNavigator();

  // Handle window resize for confetti canvas
  window.addEventListener('resize', () => {
    const canvas = document.getElementById('confetti-canvas');
    if (canvas) {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    }
  });
});

// Export for use in other modules
if (typeof module !== 'undefined' && module.exports) {
  module.exports = { PageNavigator, CountdownTimer, triggerConfetti };
}
