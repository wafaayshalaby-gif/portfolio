// ===========================
// LANGUAGE TOGGLE SYSTEM
// ===========================
let currentLang = 'ar';

const typedTextsAr = [
  'محللة أنظمة معلومات',
  'متخصصة في قواعد البيانات',
  'محللة بيانات الأعمال',
  'مديرة مشاريع تقنية',
  'خريجة MIS متميزة'
];

const typedTextsEn = [
  'Information Systems Analyst',
  'Database Specialist',
  'Business Data Analyst',
  'Technical Project Manager',
  'Outstanding MIS Graduate'
];

function applyLanguage(lang) {
  const htmlRoot  = document.getElementById('html-root');
  const langLabel = document.getElementById('langLabel');
  const langBtn   = document.getElementById('langToggle');
  const allElements = document.querySelectorAll('[data-ar], [data-en]');

  // Fade out
  allElements.forEach(el => el.classList.add('lang-fade'));

  setTimeout(() => {
    if (lang === 'en') {
      // Switch to English
      htmlRoot.setAttribute('lang', 'en');
      htmlRoot.setAttribute('dir', 'ltr');
      document.body.classList.add('lang-en');
      document.body.classList.remove('lang-ar');
      document.body.style.direction = 'ltr';
      langLabel.textContent = 'AR';
      langBtn.title = 'Switch to Arabic';

      // Update form direction
      document.querySelectorAll('input, textarea').forEach(el => {
        el.style.direction = 'ltr';
        el.style.textAlign = 'left';
      });

    } else {
      // Switch to Arabic
      htmlRoot.setAttribute('lang', 'ar');
      htmlRoot.setAttribute('dir', 'rtl');
      document.body.classList.add('lang-ar');
      document.body.classList.remove('lang-en');
      document.body.style.direction = 'rtl';
      langLabel.textContent = 'EN';
      langBtn.title = 'Switch to English';

      // Reset form direction
      document.querySelectorAll('input, textarea').forEach(el => {
        el.style.direction = 'rtl';
        el.style.textAlign = 'right';
      });
    }

    // Update all data-ar / data-en text nodes
    allElements.forEach(el => {
      const text = el.getAttribute(`data-${lang}`);
      if (!text) return;

      // Check if element has child elements (like <strong>)
      if (el.innerHTML && (el.getAttribute('data-ar') || '').includes('<')) {
        el.innerHTML = text;
      } else if (el.tagName === 'LABEL') {
        el.textContent = text;
      } else if (el.tagName === 'INPUT' || el.tagName === 'TEXTAREA') {
        // skip — handled by placeholder separately
      } else {
        el.textContent = text;
      }
    });

    // Update placeholders
    document.querySelectorAll('[data-ar-placeholder]').forEach(el => {
      const ph = el.getAttribute(`data-${lang}-placeholder`);
      if (ph) el.placeholder = ph;
    });

    // Fade in
    allElements.forEach(el => el.classList.remove('lang-fade'));

    // Reset typed animation with new texts
    currentTypedIndex = 0;
    currentCharIndex = 0;
    isDeleting = false;
    clearTimeout(typedTimeout);
    const typedEl = document.getElementById('typed');
    if (typedEl) typedEl.textContent = '';
    startTyped();

  }, 220);
}

const langToggleBtn = document.getElementById('langToggle');
if (langToggleBtn) {
  langToggleBtn.addEventListener('click', () => {
    // Bounce animation
    langToggleBtn.classList.remove('switching');
    void langToggleBtn.offsetWidth; // reflow
    langToggleBtn.classList.add('switching');
    setTimeout(() => langToggleBtn.classList.remove('switching'), 350);

    currentLang = currentLang === 'ar' ? 'en' : 'ar';
    applyLanguage(currentLang);
  });
}

// ===========================
// NAVIGATION SCROLL EFFECT
// ===========================
const navbar = document.getElementById('navbar');
const navLinks = document.querySelectorAll('.nav-link');
const hamburger = document.getElementById('hamburger');
const navLinksContainer = document.querySelector('.nav-links');

window.addEventListener('scroll', () => {
  if (window.scrollY > 50) {
    navbar.classList.add('scrolled');
  } else {
    navbar.classList.remove('scrolled');
  }
  updateActiveNav();
});

// Hamburger Menu
hamburger.addEventListener('click', () => {
  navLinksContainer.classList.toggle('open');
  const spans = hamburger.querySelectorAll('span');
  if (navLinksContainer.classList.contains('open')) {
    spans[0].style.transform = 'rotate(45deg) translate(5px, 5px)';
    spans[1].style.opacity = '0';
    spans[2].style.transform = 'rotate(-45deg) translate(5px, -5px)';
  } else {
    spans[0].style.transform = '';
    spans[1].style.opacity = '';
    spans[2].style.transform = '';
  }
});

// Close menu on link click
navLinks.forEach(link => {
  link.addEventListener('click', () => {
    navLinksContainer.classList.remove('open');
    const spans = hamburger.querySelectorAll('span');
    spans[0].style.transform = '';
    spans[1].style.opacity = '';
    spans[2].style.transform = '';
  });
});

// Active nav link based on scroll
function updateActiveNav() {
  const sections = document.querySelectorAll('section[id]');
  let current = '';

  sections.forEach(section => {
    const sectionTop = section.offsetTop - 120;
    if (window.scrollY >= sectionTop) {
      current = section.getAttribute('id');
    }
  });

  navLinks.forEach(link => {
    link.classList.remove('active');
    if (link.getAttribute('data-section') === current) {
      link.classList.add('active');
    }
  });
}

// ===========================
// TYPED TEXT ANIMATION
// ===========================
let currentTypedIndex = 0;
let currentCharIndex  = 0;
let isDeleting = false;
let typedTimeout = null;

function getTypedTexts() {
  return currentLang === 'en' ? typedTextsEn : typedTextsAr;
}

function startTyped() {
  const typedEl = document.getElementById('typed');
  if (!typedEl) return;

  const texts = getTypedTexts();
  const current = texts[currentTypedIndex];

  if (!isDeleting) {
    typedEl.textContent = current.substring(0, currentCharIndex + 1);
    currentCharIndex++;
    if (currentCharIndex === current.length) {
      typedTimeout = setTimeout(() => { isDeleting = true; startTyped(); }, 2200);
      return;
    }
  } else {
    typedEl.textContent = current.substring(0, currentCharIndex - 1);
    currentCharIndex--;
    if (currentCharIndex === 0) {
      isDeleting = false;
      currentTypedIndex = (currentTypedIndex + 1) % texts.length;
    }
  }

  const speed = isDeleting ? 55 : 85;
  typedTimeout = setTimeout(startTyped, speed);
}

setTimeout(startTyped, 1000);


// ===========================
// SKILL BAR ANIMATION
// ===========================
function animateSkillBars() {
  const skillFills = document.querySelectorAll('.skill-fill');
  skillFills.forEach(fill => {
    const targetWidth = fill.style.getPropertyValue('--fill');
    fill.style.width = targetWidth;
  });
}

// ===========================
// SCROLL REVEAL
// ===========================
const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry, index) => {
    if (entry.isIntersecting) {
      setTimeout(() => {
        entry.target.classList.add('visible');
      }, index * 80);
    }
  });
}, {
  threshold: 0.1,
  rootMargin: '0px 0px -60px 0px'
});

// Skill bars observer
const skillObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      animateSkillBars();
      skillObserver.disconnect();
    }
  });
}, { threshold: 0.3 });

const skillsSection = document.getElementById('skills');
if (skillsSection) skillObserver.observe(skillsSection);

// Observe all revealable elements
document.addEventListener('DOMContentLoaded', () => {
  const revealEls = document.querySelectorAll(
    '.about-grid, .highlight-card, .skill-card, .soft-skill-tag, .course-card, .contact-link, .contact-form, .quick-info-item'
  );
  revealEls.forEach(el => {
    el.classList.add('reveal');
    revealObserver.observe(el);
  });
});

// ===========================
// CONTACT FORM
// ===========================
const contactForm = document.getElementById('contactForm');
if (contactForm) {
  contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const btn = document.getElementById('submitBtn');
    const successMsg = currentLang === 'en' ? 'Sent Successfully!' : 'تم الإرسال بنجاح!';
    const sendMsg    = currentLang === 'en' ? 'Send Message' : 'إرسال الرسالة';
    btn.innerHTML = `<i class="fas fa-check"></i> ${successMsg}`;
    btn.style.background = 'linear-gradient(135deg, #10b981, #059669)';
    btn.style.color = '#090909';
    btn.disabled = true;

    setTimeout(() => {
      btn.innerHTML = `<i class="fas fa-paper-plane"></i> ${sendMsg}`;
      btn.style.background = '';
      btn.style.color = '';
      btn.disabled = false;
      contactForm.reset();
    }, 3500);
  });
}

// ===========================
// SMOOTH SCROLL FOR NAV LINKS
// ===========================
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    const targetId = this.getAttribute('href');
    if (targetId === '#') return;
    const target = document.querySelector(targetId);
    if (target) {
      e.preventDefault();
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  });
});

// ===========================
// PARALLAX ORBS
// ===========================
window.addEventListener('mousemove', (e) => {
  const orbs = document.querySelectorAll('.orb');
  const x = (e.clientX / window.innerWidth - 0.5) * 2;
  const y = (e.clientY / window.innerHeight - 0.5) * 2;

  orbs.forEach((orb, i) => {
    const intensity = (i + 1) * 12;
    orb.style.transform = `translate(${x * intensity}px, ${y * intensity}px)`;
  });
});

// ===========================
// CURSOR GLOW EFFECT
// ===========================
const cursorGlow = document.createElement('div');
cursorGlow.style.cssText = `
  position: fixed;
  width: 300px;
  height: 300px;
  border-radius: 50%;
  background: radial-gradient(circle, rgba(245, 196, 0, 0.08), transparent 70%);
  pointer-events: none;
  z-index: 0;
  transform: translate(-50%, -50%);
  transition: left 0.15s ease, top 0.15s ease;
`;
document.body.appendChild(cursorGlow);

window.addEventListener('mousemove', (e) => {
  cursorGlow.style.left = e.clientX + 'px';
  cursorGlow.style.top = e.clientY + 'px';
});
