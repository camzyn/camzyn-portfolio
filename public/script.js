const revealEls = document.querySelectorAll('.reveal');

const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        observer.unobserve(entry.target);
      }
    });
  },
  {
    threshold: 0.1,
    rootMargin: '0px 0px -40px 0px',
  }
);

revealEls.forEach((el) => observer.observe(el));

const cards = document.querySelectorAll('.project-card');
const cursorCta = document.querySelector('.cursor-cta');

if (cursorCta) {
  cards.forEach((card) => {
    card.addEventListener('mouseenter', () => {
      cursorCta.textContent = card.dataset.cta || 'View Project';
      cursorCta.style.opacity = '1';
    });

    card.addEventListener('mousemove', (event) => {
      cursorCta.style.left = `${event.clientX}px`;
      cursorCta.style.top = `${event.clientY}px`;
    });

    card.addEventListener('mouseleave', () => {
      cursorCta.style.opacity = '0';
    });
  });
}

const menuToggle = document.querySelector('.menu-toggle');
const mobileMenu = document.querySelector('.mobile-menu');

if (menuToggle && mobileMenu) {
  const setMenuOpen = (isOpen) => {
    document.body.classList.toggle('menu-open', isOpen);
    menuToggle.setAttribute('aria-expanded', String(isOpen));
    menuToggle.setAttribute('aria-label', isOpen ? 'Close menu' : 'Open menu');
    mobileMenu.hidden = !isOpen;
    const currentTopbar = document.querySelector('.topbar');
    if (isOpen && currentTopbar) {
      currentTopbar.classList.remove('nav-hidden');
    }
  };

  setMenuOpen(false);

  menuToggle.addEventListener('click', () => {
    const isOpen = menuToggle.getAttribute('aria-expanded') === 'true';
    setMenuOpen(!isOpen);
  });

  mobileMenu.querySelectorAll('a').forEach((link) => {
    link.addEventListener('click', () => setMenuOpen(false));
  });

  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape') {
      setMenuOpen(false);
    }
  });

  window.addEventListener('resize', () => {
    if (window.innerWidth > 900) {
      setMenuOpen(false);
    }
  });
}

const tocLinks = Array.from(document.querySelectorAll('.case-toc a'));

if (tocLinks.length) {
  const sectionMap = new Map();
  tocLinks.forEach((link) => {
    const id = link.getAttribute('href')?.replace('#', '');
    if (!id) return;
    const section = document.getElementById(id);
    if (section) sectionMap.set(section, link);
  });

  const setActive = (activeSection) => {
    tocLinks.forEach((link) => link.classList.remove('active'));
    const activeLink = sectionMap.get(activeSection);
    if (activeLink) activeLink.classList.add('active');
  };

  const sections = Array.from(sectionMap.keys());
  if (sections.length) {
    const updateActiveByScroll = () => {
      const currentY = window.scrollY + 140;
      let activeSection = sections[0];

      for (const section of sections) {
        if (section.offsetTop <= currentY) {
          activeSection = section;
        } else {
          break;
        }
      }

      setActive(activeSection);
    };

    updateActiveByScroll();
    window.addEventListener('scroll', updateActiveByScroll, { passive: true });
    window.addEventListener('resize', updateActiveByScroll);
  }
}

const topbar = document.querySelector('.topbar');
const caseTopbarTitle = document.querySelector('.case-topbar-title');

if (topbar) {
  let lastY = window.scrollY;
  const minDelta = 8;
  const showAtTop = 24;
  const setCaseTopbarState = (y) => {
    if (!caseTopbarTitle) return;
    document.body.classList.toggle('case-not-top', y > showAtTop);
  };

  setCaseTopbarState(window.scrollY);

  window.addEventListener(
    'scroll',
    () => {
      const currentY = window.scrollY;
      const delta = currentY - lastY;
      const menuOpen = document.body.classList.contains('menu-open');
      setCaseTopbarState(currentY);

      if (menuOpen || currentY <= showAtTop) {
        topbar.classList.remove('nav-hidden');
        lastY = currentY;
        return;
      }

      if (Math.abs(delta) < minDelta) {
        return;
      }

      if (delta > 0) {
        topbar.classList.add('nav-hidden');
      } else {
        topbar.classList.remove('nav-hidden');
      }

      lastY = currentY;
    },
    { passive: true }
  );
}

const researchBoard = document.querySelector('.research-collage');

if (researchBoard) {
  let dragStackIndex = 30;
  const draggableItems = Array.from(
    researchBoard.querySelectorAll('[data-draggable-item]')
  );

  draggableItems.forEach((item) => {
    let startX = 0;
    let startY = 0;
    let baseX = 0;
    let baseY = 0;

    item.addEventListener('pointerdown', (event) => {
      event.preventDefault();
      item.setPointerCapture(event.pointerId);
      dragStackIndex += 1;
      item.style.zIndex = String(dragStackIndex);
      startX = event.clientX;
      startY = event.clientY;
      const stateX = parseFloat(item.dataset.dragX || '0');
      const stateY = parseFloat(item.dataset.dragY || '0');
      baseX = Number.isFinite(stateX) ? stateX : 0;
      baseY = Number.isFinite(stateY) ? stateY : 0;
      item.classList.add('is-dragging');
    });

    item.addEventListener('pointermove', (event) => {
      if (!item.hasPointerCapture(event.pointerId)) return;
      const boardRect = researchBoard.getBoundingClientRect();
      const itemRect = item.getBoundingClientRect();
      const minDeltaX = boardRect.left - itemRect.left;
      const maxDeltaX = boardRect.right - itemRect.right;
      const minDeltaY = boardRect.top - itemRect.top;
      const maxDeltaY = boardRect.bottom - itemRect.bottom;
      const rawDeltaX = event.clientX - startX;
      const rawDeltaY = event.clientY - startY;
      const clampedDeltaX = Math.min(Math.max(rawDeltaX, minDeltaX), maxDeltaX);
      const clampedDeltaY = Math.min(Math.max(rawDeltaY, minDeltaY), maxDeltaY);
      const nextX = baseX + clampedDeltaX;
      const nextY = baseY + clampedDeltaY;
      item.dataset.dragX = String(nextX);
      item.dataset.dragY = String(nextY);
      item.style.setProperty('--drag-x', `${nextX}px`);
      item.style.setProperty('--drag-y', `${nextY}px`);
    });

    item.addEventListener('pointerup', (event) => {
      if (item.hasPointerCapture(event.pointerId)) {
        item.releasePointerCapture(event.pointerId);
      }
      item.classList.remove('is-dragging');
    });
  });
}

const ideationLightbox = document.getElementById('ideation-lightbox');
const ideationLightboxImage = ideationLightbox?.querySelector('.lightbox-image');
const ideationLightboxClose = ideationLightbox?.querySelector('.lightbox-close');
const ideationLightboxTriggers = document.querySelectorAll('.ideation-lightbox-trigger');

if (ideationLightbox && ideationLightboxImage && ideationLightboxTriggers.length) {
  const openLightbox = (src, altText) => {
    ideationLightboxImage.src = src;
    ideationLightboxImage.alt = altText || '';
    ideationLightbox.hidden = false;
    ideationLightbox.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
  };

  const closeLightbox = () => {
    ideationLightbox.hidden = true;
    ideationLightbox.setAttribute('aria-hidden', 'true');
    ideationLightboxImage.src = '';
    document.body.style.overflow = '';
  };

  ideationLightboxTriggers.forEach((img) => {
    img.addEventListener('click', () => openLightbox(img.src, img.alt));
  });

  ideationLightboxClose?.addEventListener('click', closeLightbox);
  ideationLightbox.addEventListener('click', (event) => {
    if (event.target === ideationLightbox) {
      closeLightbox();
    }
  });

  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape' && !ideationLightbox.hidden) {
      closeLightbox();
    }
  });
}
