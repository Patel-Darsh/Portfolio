// Darshan Patel — Portfolio Interactions

document.addEventListener('DOMContentLoaded', () => {
  const toggle = document.querySelector('.menu-toggle');
  const nav = document.querySelector('.nav');
  const topbar = document.querySelector('.topbar');
  const navLinks = document.querySelectorAll('.nav a');
  const sections = document.querySelectorAll('main.hero, section.below');

  // 1. Mobile Menu Toggle
  if (toggle && nav) {
    toggle.addEventListener('click', () => {
      const isOpen = nav.classList.toggle('open');
      toggle.setAttribute('aria-expanded', String(isOpen));
    });

    // Close on escape key
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && nav.classList.contains('open')) {
        nav.classList.remove('open');
        toggle.setAttribute('aria-expanded', 'false');
        toggle.focus();
      }
    });
  }

  // Close menu and smooth-scroll on link click
  navLinks.forEach((link) => {
    link.addEventListener('click', () => {
      if (nav && nav.classList.contains('open')) {
        nav.classList.remove('open');
        if (toggle) toggle.setAttribute('aria-expanded', 'false');
      }
    });
  });

  // 2. Topbar Scroll Blur & Visual Weight
  const handleScroll = () => {
    if (!topbar) return;
    if (window.scrollY > 40) {
      topbar.classList.add('scrolled');
    } else {
      topbar.classList.remove('scrolled');
    }
  };
  window.addEventListener('scroll', handleScroll, { passive: true });
  handleScroll();

  // 3. Active Nav Link on Scroll (IntersectionObserver)
  if ('IntersectionObserver' in window && sections.length > 0) {
    const observerOptions = {
      root: null,
      rootMargin: '-20% 0px -65% 0px',
      threshold: 0
    };

    const sectionObserver = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const id = entry.target.getAttribute('id');
          if (id) {
            navLinks.forEach((link) => {
              const href = link.getAttribute('href');
              if (href === `#${id}`) {
                link.classList.add('active');
              } else {
                link.classList.remove('active');
              }
            });
          }
        }
      });
    }, observerOptions);

    sections.forEach((section) => sectionObserver.observe(section));
  }

  // 4. Copy Email to Clipboard Helper
  const copyBtn = document.querySelector('.copy-btn');
  if (copyBtn) {
    copyBtn.addEventListener('click', async () => {
      const email = copyBtn.getAttribute('data-email') || 'darshanpatelv2002@gmail.com';
      try {
        await navigator.clipboard.writeText(email);
        const originalText = copyBtn.textContent;
        copyBtn.textContent = 'Copied!';
        copyBtn.style.borderColor = 'var(--amber)';
        copyBtn.style.color = '#fff';
        setTimeout(() => {
          copyBtn.textContent = originalText;
          copyBtn.style.borderColor = '';
          copyBtn.style.color = '';
        }, 2000);
      } catch (err) {
        // Fallback for non-secure contexts
        const textarea = document.createElement('textarea');
        textarea.value = email;
        document.body.appendChild(textarea);
        textarea.select();
        document.execCommand('copy');
        document.body.removeChild(textarea);
        const originalText = copyBtn.textContent;
        copyBtn.textContent = 'Copied!';
        setTimeout(() => {
          copyBtn.textContent = originalText;
        }, 2000);
      }
    });
  }

  // 5. Contact Form Handler (Direct Mailto Integration)
  const contactForm = document.getElementById('contact-form');
  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const name = document.getElementById('form-name')?.value.trim() || '';
      const email = document.getElementById('form-email')?.value.trim() || '';
      const subject = document.getElementById('form-subject')?.value.trim() || 'Backend Engineering Opportunity';
      const message = document.getElementById('form-message')?.value.trim() || '';

      const recipient = 'darshanpatelv2002@gmail.com';
      const bodyText = `Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`;
      const mailtoUrl = `mailto:${recipient}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(bodyText)}`;

      // Open user's email client directly
      window.location.href = mailtoUrl;
    });
  }

  // 6. Interactive CV Modal (Formatted View)
  const cvModal = document.getElementById('cv-modal');
  const openCvButtons = document.querySelectorAll('.open-cv-modal');
  const closeCvBtn = document.getElementById('cv-close-btn');

  const openModal = () => {
    if (!cvModal) return;
    cvModal.classList.add('active');
    cvModal.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
    if (closeCvBtn) closeCvBtn.focus();
  };

  const closeModal = () => {
    if (!cvModal) return;
    cvModal.classList.remove('active');
    cvModal.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
  };

  openCvButtons.forEach((btn) => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      openModal();
    });
  });

  if (closeCvBtn) {
    closeCvBtn.addEventListener('click', closeModal);
  }

  if (cvModal) {
    // Close when clicking on backdrop outside the window
    cvModal.addEventListener('click', (e) => {
      if (e.target === cvModal) {
        closeModal();
      }
    });

    // Close on Escape key
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && cvModal.classList.contains('active')) {
        closeModal();
      }
    });
  }
});
