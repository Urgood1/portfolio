/* ============================================
   PORTFOLIO — JAVASCRIPT
   Scroll animations, navbar, interactions
   ============================================ */

document.addEventListener('DOMContentLoaded', () => {
  // Initialize Lucide icons
  lucide.createIcons();

  // ── Elements ──
  const navbar = document.getElementById('navbar');
  const navToggle = document.getElementById('navToggle');
  const navLinks = document.getElementById('navLinks');
  const navLinkItems = document.querySelectorAll('.nav-link');
  const sections = document.querySelectorAll('.section');

  // ══════════════════════════════════════
  // CUSTOM CURSOR GLOW
  // ══════════════════════════════════════
  const cursor = document.createElement('div');
  cursor.classList.add('cursor-glow');
  document.body.appendChild(cursor);

  let cursorX = 0, cursorY = 0;
  let currentX = 0, currentY = 0;

  document.addEventListener('mousemove', (e) => {
    cursorX = e.clientX;
    cursorY = e.clientY;
  });

  function animateCursor() {
    currentX += (cursorX - currentX) * 0.15;
    currentY += (cursorY - currentY) * 0.15;
    cursor.style.left = currentX + 'px';
    cursor.style.top = currentY + 'px';
    requestAnimationFrame(animateCursor);
  }
  animateCursor();

  // Grow cursor on interactive elements
  const interactives = document.querySelectorAll('a, button, .glass-card, .skill-tag');
  interactives.forEach(el => {
    el.addEventListener('mouseenter', () => cursor.classList.add('cursor-hover'));
    el.addEventListener('mouseleave', () => cursor.classList.remove('cursor-hover'));
  });

  // ══════════════════════════════════════
  // SCROLL PROGRESS BAR
  // ══════════════════════════════════════
  const progressBar = document.createElement('div');
  progressBar.classList.add('scroll-progress');
  document.body.appendChild(progressBar);

  // ══════════════════════════════════════
  // BACK TO TOP BUTTON
  // ══════════════════════════════════════
  const backToTop = document.createElement('button');
  backToTop.classList.add('back-to-top');
  backToTop.setAttribute('aria-label', 'Back to top');
  backToTop.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m18 15-6-6-6 6"/></svg>';
  document.body.appendChild(backToTop);

  backToTop.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });

  // ══════════════════════════════════════
  // NAVBAR SCROLL + PROGRESS + BACK-TO-TOP
  // ══════════════════════════════════════
  const handleScroll = () => {
    const scrollTop = window.scrollY;
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
    const scrollPercent = (scrollTop / docHeight) * 100;

    // Navbar
    if (scrollTop > 50) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }

    // Progress bar
    progressBar.style.width = scrollPercent + '%';

    // Back to top
    if (scrollTop > 500) {
      backToTop.classList.add('visible');
    } else {
      backToTop.classList.remove('visible');
    }
  };

  window.addEventListener('scroll', handleScroll);
  handleScroll();

  // ══════════════════════════════════════
  // NAVBAR MOBILE TOGGLE
  // ══════════════════════════════════════
  navToggle.addEventListener('click', () => {
    navToggle.classList.toggle('active');
    navLinks.classList.toggle('open');
  });

  navLinkItems.forEach(link => {
    link.addEventListener('click', () => {
      navToggle.classList.remove('active');
      navLinks.classList.remove('open');
    });
  });

  // ══════════════════════════════════════
  // ACTIVE NAV HIGHLIGHTING
  // ══════════════════════════════════════
  const navObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const id = entry.target.getAttribute('id');
        navLinkItems.forEach(link => {
          link.classList.remove('active');
          if (link.getAttribute('href') === `#${id}`) {
            link.classList.add('active');
          }
        });
      }
    });
  }, {
    root: null,
    rootMargin: '-20% 0px -70% 0px',
    threshold: 0,
  });

  sections.forEach(section => {
    if (section.id && section.id !== 'hero') {
      navObserver.observe(section);
    }
  });

  // ══════════════════════════════════════
  // SCROLL REVEAL ANIMATIONS
  // ══════════════════════════════════════
  const revealElements = document.querySelectorAll('.reveal');

  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        revealObserver.unobserve(entry.target);
      }
    });
  }, {
    root: null,
    rootMargin: '0px 0px -60px 0px',
    threshold: 0.1,
  });

  revealElements.forEach(el => revealObserver.observe(el));

  // ══════════════════════════════════════
  // NAV LOGO CLICK → SCROLL TO TOP
  // ══════════════════════════════════════
  document.querySelector('.nav-logo').addEventListener('click', (e) => {
    e.preventDefault();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });

  // ══════════════════════════════════════
  // TYPING EFFECT ON HERO GREETING
  // ══════════════════════════════════════
  const greeting = document.querySelector('.hero-greeting');
  if (greeting) {
    const text = greeting.textContent;
    greeting.textContent = '';
    greeting.style.opacity = '1';
    greeting.style.transform = 'translateY(0)';
    let i = 0;
    const typeWriter = () => {
      if (i < text.length) {
        greeting.textContent += text.charAt(i);
        i++;
        setTimeout(typeWriter, 80);
      }
    };
    setTimeout(typeWriter, 500);
  }

  // ══════════════════════════════════════
  // PARALLAX ORBS (MOUSE FOLLOW)
  // ══════════════════════════════════════
  const orbs = document.querySelectorAll('.orb');
  if (orbs.length > 0) {
    window.addEventListener('mousemove', (e) => {
      const x = (e.clientX / window.innerWidth - 0.5) * 2;
      const y = (e.clientY / window.innerHeight - 0.5) * 2;
      orbs.forEach((orb, index) => {
        const speed = (index + 1) * 15;
        orb.style.transform = `translate(${x * speed}px, ${y * speed}px)`;
      });
    });
  }

  // ══════════════════════════════════════
  // 3D TILT EFFECT ON CARDS
  // ══════════════════════════════════════
  const tiltCards = document.querySelectorAll('.glass-card');

  tiltCards.forEach(card => {
    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;

      const rotateX = ((y - centerY) / centerY) * -8;
      const rotateY = ((x - centerX) / centerX) * 8;

      card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-4px)`;
    });

    card.addEventListener('mouseleave', () => {
      card.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) translateY(0px)';
    });
  });

  // ══════════════════════════════════════
  // MAGNETIC EFFECT ON SOCIAL ICONS
  // ══════════════════════════════════════
  const magneticElements = document.querySelectorAll('.hero-socials a');

  magneticElements.forEach(el => {
    el.addEventListener('mousemove', (e) => {
      const rect = el.getBoundingClientRect();
      const x = e.clientX - rect.left - rect.width / 2;
      const y = e.clientY - rect.top - rect.height / 2;
      el.style.transform = `translate(${x * 0.3}px, ${y * 0.3}px)`;
    });

    el.addEventListener('mouseleave', () => {
      el.style.transform = 'translate(0px, 0px)';
    });
  });

  // ══════════════════════════════════════
  // COUNTER ANIMATION FOR STATS
  // ══════════════════════════════════════
  const statNumbers = document.querySelectorAll('.stat-number');

  const animateCounter = (el) => {
    const target = parseFloat(el.textContent);
    const isFloat = el.textContent.includes('.');
    const hasSuffix = el.textContent.includes('+');
    const duration = 1500;
    const start = performance.now();

    const step = (currentTime) => {
      const elapsed = currentTime - start;
      const progress = Math.min(elapsed / duration, 1);
      const easeOut = 1 - Math.pow(1 - progress, 3);
      const current = target * easeOut;

      if (isFloat) {
        el.textContent = current.toFixed(2);
      } else {
        el.textContent = Math.floor(current);
      }

      if (hasSuffix && progress >= 1) {
        el.textContent += '+';
      }

      if (progress < 1) {
        requestAnimationFrame(step);
      }
    };

    requestAnimationFrame(step);
  };

  const counterObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        animateCounter(entry.target);
        counterObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.5 });

  statNumbers.forEach(el => counterObserver.observe(el));

  // ══════════════════════════════════════
  // INTERACTIVE PARTICLE DOTS (HERO)
  // ══════════════════════════════════════
  const canvas = document.createElement('canvas');
  canvas.classList.add('particle-canvas');
  const heroBg = document.querySelector('.hero-bg');
  if (heroBg) {
    heroBg.appendChild(canvas);
    const ctx = canvas.getContext('2d');

    let particles = [];
    let mouseParticle = { x: 0, y: 0 };

    function resizeCanvas() {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    }
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    class Particle {
      constructor() {
        this.reset();
      }

      reset() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.size = Math.random() * 2 + 0.5;
        this.speedX = (Math.random() - 0.5) * 0.5;
        this.speedY = (Math.random() - 0.5) * 0.5;
        this.opacity = Math.random() * 0.5 + 0.1;
      }

      update() {
        this.x += this.speedX;
        this.y += this.speedY;

        // Mouse interaction — repel slightly
        const dx = this.x - mouseParticle.x;
        const dy = this.y - mouseParticle.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < 120) {
          const force = (120 - dist) / 120;
          this.x += (dx / dist) * force * 2;
          this.y += (dy / dist) * force * 2;
        }

        if (this.x < 0 || this.x > canvas.width) this.speedX *= -1;
        if (this.y < 0 || this.y > canvas.height) this.speedY *= -1;
      }

      draw() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(167, 139, 250, ${this.opacity})`;
        ctx.fill();
      }
    }

    // Create particles
    const particleCount = Math.min(80, Math.floor((canvas.width * canvas.height) / 15000));
    for (let i = 0; i < particleCount; i++) {
      particles.push(new Particle());
    }

    document.addEventListener('mousemove', (e) => {
      mouseParticle.x = e.clientX;
      mouseParticle.y = e.clientY;
    });

    function drawLines() {
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < 150) {
            const opacity = (1 - dist / 150) * 0.15;
            ctx.beginPath();
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.strokeStyle = `rgba(99, 102, 241, ${opacity})`;
            ctx.lineWidth = 0.5;
            ctx.stroke();
          }
        }
      }
    }

    function animateParticles() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      particles.forEach(p => {
        p.update();
        p.draw();
      });
      drawLines();
      requestAnimationFrame(animateParticles);
    }

    animateParticles();
  }

  // ══════════════════════════════════════
  // SKILL TAG RIPPLE ON CLICK
  // ══════════════════════════════════════
  document.querySelectorAll('.skill-tag').forEach(tag => {
    tag.addEventListener('click', function(e) {
      this.style.transform = 'scale(0.9)';
      setTimeout(() => {
        this.style.transform = 'scale(1.1)';
        setTimeout(() => {
          this.style.transform = 'scale(1)';
        }, 150);
      }, 100);
    });
  });

  // ══════════════════════════════════════
  // CLOSE MOBILE NAV ON OUTSIDE CLICK
  // ══════════════════════════════════════
  document.addEventListener('click', (e) => {
    if (!navToggle.contains(e.target) && !navLinks.contains(e.target)) {
      navToggle.classList.remove('active');
      navLinks.classList.remove('open');
    }
  });
});
