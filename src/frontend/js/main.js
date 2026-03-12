function createParticles(container, count = 50) {
  if (!container) return;
  
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (prefersReducedMotion) return;
  
  for (let i = 0; i < count; i++) {
    const particle = document.createElement('div');
    particle.className = 'particle';
    particle.style.left = Math.random() * 100 + '%';
    particle.style.animationDuration = (15 + Math.random() * 10) + 's';
    particle.style.animationDelay = Math.random() * 20 + 's';
    particle.style.width = (2 + Math.random() * 2) + 'px';
    particle.style.height = particle.style.width;
    container.appendChild(particle);
  }
}

function animateOnScroll() {
  const elements = document.querySelectorAll('.animate-on-scroll');
  
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('animate-fade-in');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1 });
  
  elements.forEach(el => observer.observe(el));
}

function initNavbar() {
  const navbar = document.querySelector('.navbar');
  if (!navbar) return;
  
  let lastScroll = 0;
  
  window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;
    
    if (currentScroll > 100) {
      navbar.style.boxShadow = '0 4px 20px rgba(0, 0, 0, 0.3)';
    } else {
      navbar.style.boxShadow = 'none';
    }
    
    lastScroll = currentScroll;
  });
}

function initBooks() {
  const books = document.querySelectorAll('.book-3d');
  
  books.forEach(book => {
    book.addEventListener('click', function() {
      const link = this.dataset.link;
      if (link) {
        window.location.href = link;
      }
    });
  });
}

function showNotification(message, type = 'info') {
  const notification = document.createElement('div');
  notification.className = `notification notification-${type}`;
  notification.textContent = message;
  notification.style.cssText = `
    position: fixed;
    top: 80px;
    right: 20px;
    padding: 16px 24px;
    background: ${type === 'success' ? 'var(--color-success)' : type === 'error' ? 'var(--color-error)' : 'var(--color-gold)'};
    color: ${type === 'info' ? '#1a1a2e' : '#fff'};
    border-radius: 8px;
    font-family: var(--font-ui);
    font-size: 14px;
    z-index: 1000;
    animation: slideDown 0.3s ease-out;
  `;
  
  document.body.appendChild(notification);
  
  setTimeout(() => {
    notification.style.animation = 'fadeOut 0.3s ease-out forwards';
    setTimeout(() => notification.remove(), 300);
  }, 3000);
}

function init() {
  const particlesContainer = document.querySelector('.particles-container');
  if (particlesContainer) {
    const isMobile = window.innerWidth < 768;
    createParticles(particlesContainer, isMobile ? 20 : 50);
  }
  
  initNavbar();
  initBooks();
  animateOnScroll();
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', init);
} else {
  init();
}
