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
      navbar.style.boxShadow = '0 4px 20px rgba(0, 0, 0, 0.5)';
    } else {
      navbar.style.boxShadow = 'none';
    }
    
    lastScroll = currentScroll;
  });
}

function initCards() {
  const cards = document.querySelectorAll('.hs-card');
  
  cards.forEach(card => {
    card.addEventListener('mouseenter', function() {
      this.style.zIndex = '10';
    });
    
    card.addEventListener('mouseleave', function() {
      this.style.zIndex = '1';
    });
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

function initModals() {
  const modalTriggers = document.querySelectorAll('[data-modal]');
  const modals = document.querySelectorAll('.modal-overlay');
  
  modalTriggers.forEach(trigger => {
    trigger.addEventListener('click', () => {
      const modalId = trigger.dataset.modal;
      const modal = document.getElementById(modalId);
      if (modal) {
        modal.classList.add('active');
        document.body.style.overflow = 'hidden';
      }
    });
  });
  
  modals.forEach(modal => {
    modal.addEventListener('click', (e) => {
      if (e.target === modal) {
        modal.classList.remove('active');
        document.body.style.overflow = '';
      }
    });
  });
  
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      modals.forEach(modal => {
        modal.classList.remove('active');
      });
      document.body.style.overflow = '';
    }
  });
}

function initTabs() {
  const tabContainers = document.querySelectorAll('.tabs');
  
  tabContainers.forEach(container => {
    const tabs = container.querySelectorAll('.tab');
    const contents = container.querySelectorAll('.tab-content');
    
    tabs.forEach(tab => {
      tab.addEventListener('click', () => {
        const targetId = tab.dataset.tab;
        
        tabs.forEach(t => t.classList.remove('active'));
        contents.forEach(c => c.classList.remove('active'));
        
        tab.classList.add('active');
        const targetContent = container.querySelector(`#${targetId}`);
        if (targetContent) {
          targetContent.classList.add('active');
        }
      });
    });
  });
}

function initScrolls() {
  const scrolls = document.querySelectorAll('.scroll');
  
  scrolls.forEach(scroll => {
    const handle = scroll.querySelector('.scroll-handle.top');
    if (handle) {
      handle.addEventListener('click', () => {
        scroll.classList.toggle('expanded');
        scroll.classList.toggle('collapsed');
      });
    }
  });
}

function initWaxSeal() {
  const waxSeals = document.querySelectorAll('.wax-seal-btn');
  
  waxSeals.forEach(btn => {
    btn.addEventListener('click', function(e) {
      const seal = this.querySelector('.wax-seal');
      if (seal) {
        seal.style.animation = 'none';
        seal.offsetHeight;
        seal.style.animation = 'waxSealPress 0.3s ease';
      }
    });
  });
}

function initBookshelf() {
  const books = document.querySelectorAll('.bookshelf .book-3d');
  
  books.forEach((book, index) => {
    const rotation = (index - books.length / 2) * 8;
    book.style.transform = `rotate(${rotation}deg)`;
    
    book.addEventListener('mouseenter', function() {
      this.style.transform = 'rotate(0deg) translateY(-30px) scale(1.1)';
    });
    
    book.addEventListener('mouseleave', function() {
      this.style.transform = `rotate(${rotation}deg)`;
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
  initCards();
  initBooks();
  initModals();
  initTabs();
  initScrolls();
  initWaxSeal();
  initBookshelf();
  animateOnScroll();
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', init);
} else {
  init();
}
