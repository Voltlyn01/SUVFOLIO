/**
 * SUVAJIT SAHA PORTFOLIO - VANILLA JAVASCRIPT
 * Handles:
 * 1. Navbar Sticky & Scroll spy (active links)
 * 2. Mobile Drawer Navigation toggle and focus
 * 3. Smooth scrolling for internal anchor links
 * 4. About Section "More About Me" expandable bio toggle
 * 5. Resume Download, View PDF, and Modal Dialog handling
 * 6. Formspree Contact Form AJAX submission with validation, anti-abuse, loading, and accessible status states
 * 7. Dynamic copyright year in footer
 */

(function () {
  'use strict';

  // --- CONFIGURATION ---
  // Formspree endpoint configured for workwithsuvajit@gmail.com
  const FORMSPREE_FORM_ID = 'mbggzgzn';
  const FORMSPREE_ENDPOINT = `https://formspree.io/f/${FORMSPREE_FORM_ID}`;

  // --- DOM READY INITIALIZATION ---
  document.addEventListener('DOMContentLoaded', () => {
    initNavigation();
    initAboutToggle();
    initResumeFeatures();
    initContactForm();
    initDynamicYear();
  });

  /* ==========================================================================
     1. NAVIGATION (DESKTOP SCROLL SPY + MOBILE DRAWER)
     ========================================================================== */
  function initNavigation() {
    const navbar = document.getElementById('navbar-header');
    const hamburgerBtn = document.getElementById('hamburger-btn');
    const mobileDrawer = document.getElementById('mobile-drawer');
    const navLinks = document.querySelectorAll('.nav-link, .mobile-nav-link, .footer-nav-link');
    const sections = ['hero', 'about', 'skills', 'projects', 'experience', 'resume', 'contact'];

    // Sticky navbar & Active section spy
    function onScroll() {
      const scrollY = window.scrollY;

      // Scrolled state
      if (navbar) {
        if (scrollY > 20) {
          navbar.classList.add('scrolled');
        } else {
          navbar.classList.remove('scrolled');
        }
      }

      // Active section calculation
      const scrollPosition = scrollY + 140;
      let currentSectionId = 'hero';

      for (let i = sections.length - 1; i >= 0; i--) {
        const sec = document.getElementById(sections[i]);
        if (sec) {
          if (scrollPosition >= sec.offsetTop) {
            currentSectionId = sections[i];
            break;
          }
        }
      }

      // Update desktop nav links
      document.querySelectorAll('.nav-link').forEach((link) => {
        const href = link.getAttribute('href');
        if (href === `#${currentSectionId}`) {
          link.classList.add('active');
          link.setAttribute('aria-current', 'page');
          if (!link.querySelector('.active-dot')) {
            const dot = document.createElement('span');
            dot.className = 'active-dot';
            link.appendChild(dot);
          }
        } else {
          link.classList.remove('active');
          link.removeAttribute('aria-current');
          const dot = link.querySelector('.active-dot');
          if (dot) dot.remove();
        }
      });

      // Update mobile nav links
      document.querySelectorAll('.mobile-nav-link').forEach((link) => {
        const href = link.getAttribute('href');
        if (href === `#${currentSectionId}`) {
          link.classList.add('active');
        } else {
          link.classList.remove('active');
        }
      });
    }

    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();

    // Mobile Drawer Open / Close
    function toggleMobileMenu(open) {
      const isOpen = open !== undefined ? open : !hamburgerBtn.classList.contains('open');
      if (isOpen) {
        hamburgerBtn.classList.add('open');
        hamburgerBtn.setAttribute('aria-expanded', 'true');
        hamburgerBtn.setAttribute('aria-label', 'Close navigation menu');
        mobileDrawer.classList.add('open');
        mobileDrawer.setAttribute('aria-hidden', 'false');
        document.body.style.overflow = 'hidden';
      } else {
        hamburgerBtn.classList.remove('open');
        hamburgerBtn.setAttribute('aria-expanded', 'false');
        hamburgerBtn.setAttribute('aria-label', 'Open navigation menu');
        mobileDrawer.classList.remove('open');
        mobileDrawer.setAttribute('aria-hidden', 'true');
        document.body.style.overflow = '';
      }
    }

    if (hamburgerBtn && mobileDrawer) {
      hamburgerBtn.addEventListener('click', () => toggleMobileMenu());
    }

    // Close mobile menu when links are clicked + Smooth Scroll
    navLinks.forEach((link) => {
      link.addEventListener('click', (e) => {
        const href = link.getAttribute('href');
        if (href && href.startsWith('#')) {
          const targetId = href.substring(1);
          const targetElem = document.getElementById(targetId);
          if (targetElem) {
            e.preventDefault();
            toggleMobileMenu(false);
            targetElem.scrollIntoView({ behavior: 'smooth' });
            history.replaceState(null, null, href);
          }
        }
      });
    });

    // Brand and logo clicks
    document.querySelectorAll('.navbar-brand, .footer-brand').forEach((brandLink) => {
      brandLink.addEventListener('click', (e) => {
        const heroSection = document.getElementById('hero');
        if (heroSection) {
          e.preventDefault();
          toggleMobileMenu(false);
          heroSection.scrollIntoView({ behavior: 'smooth' });
          history.replaceState(null, null, '#hero');
        }
      });
    });

    // Close mobile drawer on Escape key
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && hamburgerBtn && hamburgerBtn.classList.contains('open')) {
        toggleMobileMenu(false);
        hamburgerBtn.focus();
      }
    });
  }

  /* ==========================================================================
     2. ABOUT SECTION EXPANDABLE BIO TOGGLE
     ========================================================================== */
  function initAboutToggle() {
    const toggleBtn = document.getElementById('about-toggle-btn');
    const extendedContent = document.getElementById('about-extended-content');

    if (!toggleBtn || !extendedContent) return;

    toggleBtn.addEventListener('click', () => {
      const isHidden = extendedContent.hasAttribute('hidden') || extendedContent.style.display === 'none';

      if (isHidden) {
        extendedContent.removeAttribute('hidden');
        extendedContent.style.display = 'flex';
        toggleBtn.textContent = 'Show Less ↑';
        toggleBtn.setAttribute('aria-expanded', 'true');
      } else {
        extendedContent.setAttribute('hidden', '');
        extendedContent.style.display = 'none';
        toggleBtn.textContent = 'More About Me →';
        toggleBtn.setAttribute('aria-expanded', 'false');
      }
    });
  }

  /* ==========================================================================
     3. RESUME SECTION (MODAL + DOWNLOAD ACTION)
     ========================================================================== */
  function initResumeFeatures() {
    const resumeModal = document.getElementById('resume-modal');
    const openModalBtns = document.querySelectorAll('[data-action="open-resume-modal"]');
    const closeModalBtns = document.querySelectorAll('[data-action="close-resume-modal"]');
    const downloadBtns = document.querySelectorAll('[data-action="download-resume"]');

    // Trigger download
    function triggerResumeDownload() {
      const link = document.createElement('a');
      link.href = 'assets/resume.pdf';
      link.download = 'Suvajit_Resume.pdf';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }

    downloadBtns.forEach((btn) => {
      btn.addEventListener('click', (e) => {
        e.preventDefault();
        triggerResumeDownload();
      });
    });

    // Open Modal
    function openModal() {
      if (!resumeModal) return;
      resumeModal.removeAttribute('hidden');
      resumeModal.style.display = 'flex';
      document.body.style.overflow = 'hidden';
      const closeBtn = resumeModal.querySelector('.modal-close-btn');
      if (closeBtn) closeBtn.focus();
    }

    // Close Modal
    function closeModal() {
      if (!resumeModal) return;
      resumeModal.setAttribute('hidden', '');
      resumeModal.style.display = 'none';
      document.body.style.overflow = '';
    }

    openModalBtns.forEach((btn) => {
      btn.addEventListener('click', (e) => {
        e.preventDefault();
        openModal();
      });
    });

    closeModalBtns.forEach((btn) => {
      btn.addEventListener('click', (e) => {
        e.preventDefault();
        closeModal();
      });
    });

    if (resumeModal) {
      // Close on backdrop click
      resumeModal.addEventListener('click', (e) => {
        if (e.target === resumeModal) {
          closeModal();
        }
      });

      // Close on Escape key
      document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && resumeModal.style.display === 'flex') {
          closeModal();
        }
      });
    }
  }

  /* ==========================================================================
     4. FORMSPREE CONTACT FORM SUBMISSION WITH VALIDATION
     ========================================================================== */
  function initContactForm() {
    const form = document.getElementById('contact-form');
    if (!form) return;

    const nameInput = document.getElementById('name');
    const emailInput = document.getElementById('email');
    const subjectInput = document.getElementById('subject');
    const messageInput = document.getElementById('message');
    const submitBtn = document.getElementById('contact-submit-btn');
    const submitText = document.getElementById('submit-btn-text');
    const submitSpinner = document.getElementById('submit-btn-spinner');
    const submitIcon = document.getElementById('submit-btn-icon');
    const bannerContainer = document.getElementById('submission-banner-container');

    let isSubmitting = false;
    let lastSubmittedHash = '';

    // Field error indicators
    function setFieldError(field, errorId, message) {
      const errorSpan = document.getElementById(errorId);
      if (message) {
        field.classList.add('input-error');
        if (errorSpan) {
          errorSpan.textContent = message;
          errorSpan.style.display = 'block';
        }
      } else {
        field.classList.remove('input-error');
        if (errorSpan) {
          errorSpan.textContent = '';
          errorSpan.style.display = 'none';
        }
      }
    }

    // Clear individual errors on input
    [nameInput, emailInput, subjectInput, messageInput].forEach((input) => {
      if (!input) return;
      input.addEventListener('input', () => {
        setFieldError(input, `${input.id}-error`, null);
      });
    });

    // Form validation logic
    function validateForm() {
      let isValid = true;

      // Name
      const nameVal = nameInput.value.trim();
      if (!nameVal) {
        setFieldError(nameInput, 'name-error', 'Full name is required.');
        isValid = false;
      } else if (nameVal.length < 2) {
        setFieldError(nameInput, 'name-error', 'Name must be at least 2 characters.');
        isValid = false;
      } else if (nameVal.length > 100) {
        setFieldError(nameInput, 'name-error', 'Name exceeds maximum length of 100 characters.');
        isValid = false;
      } else {
        setFieldError(nameInput, 'name-error', null);
      }

      // Email
      const emailVal = emailInput.value.trim();
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailVal) {
        setFieldError(emailInput, 'email-error', 'Email address is required.');
        isValid = false;
      } else if (!emailRegex.test(emailVal) || emailVal.length > 254) {
        setFieldError(emailInput, 'email-error', 'Please provide a valid email address.');
        isValid = false;
      } else {
        setFieldError(emailInput, 'email-error', null);
      }

      // Subject
      const subjectVal = subjectInput.value.trim();
      if (!subjectVal) {
        setFieldError(subjectInput, 'subject-error', 'Subject is required.');
        isValid = false;
      } else if (subjectVal.length < 2) {
        setFieldError(subjectInput, 'subject-error', 'Subject must be at least 2 characters.');
        isValid = false;
      } else if (subjectVal.length > 200) {
        setFieldError(subjectInput, 'subject-error', 'Subject exceeds maximum length of 200 characters.');
        isValid = false;
      } else {
        setFieldError(subjectInput, 'subject-error', null);
      }

      // Message
      const messageVal = messageInput.value.trim();
      if (!messageVal) {
        setFieldError(messageInput, 'message-error', 'Message cannot be empty.');
        isValid = false;
      } else if (messageVal.length < 10) {
        setFieldError(messageInput, 'message-error', 'Message should be at least 10 characters long.');
        isValid = false;
      } else if (messageVal.length > 5000) {
        setFieldError(messageInput, 'message-error', 'Message exceeds maximum length of 5000 characters.');
        isValid = false;
      } else {
        setFieldError(messageInput, 'message-error', null);
      }

      return isValid;
    }

    // Render accessible status banners
    function showBanner(type, title, message, showMailto = false) {
      if (!bannerContainer) return;
      bannerContainer.innerHTML = '';

      const banner = document.createElement('div');
      banner.className = `submission-banner banner-${type}`;
      banner.setAttribute('role', type === 'success' ? 'status' : 'alert');
      banner.setAttribute('aria-live', 'polite');

      let iconHtml = '';
      if (type === 'success') {
        iconHtml = `<svg class="banner-icon icon-success" viewBox="0 0 512 512" width="20" height="20" fill="currentColor" aria-hidden="true"><path d="M504 256c0 136.967-111.033 248-248 248S8 392.967 8 256 119.033 8 256 8s248 111.033 248 248zM227.314 387.314l184-184c6.248-6.248 6.248-16.379 0-22.627l-22.627-22.627c-6.248-6.249-16.379-6.249-22.628 0L216 308.118l-70.059-70.059c-6.248-6.248-16.379-6.248-22.628 0l-22.627 22.627c-6.248 6.248-6.248 16.379 0 22.627l104 104c6.249 6.249 16.379 6.249 22.628 0z"/></svg>`;
      } else if (type === 'warning') {
        iconHtml = `<svg class="banner-icon icon-warning" viewBox="0 0 576 512" width="20" height="20" fill="currentColor" aria-hidden="true"><path d="M569.517 440.013C587.975 472.007 564.806 512 527.94 512H48.054c-36.937 0-59.999-40.055-41.577-71.987L246.423 23.985c18.467-32.009 64.72-31.951 83.154 0l239.94 416.028zM288 354c-25.405 0-46 20.595-46 46s20.595 46 46 46 46-20.595 46-46-20.595-46-46-46zm-43.673-165.346l7.418 136c.347 6.364 5.609 11.346 11.982 11.346h48.546c6.373 0 11.635-4.982 11.982-11.346l7.418-136c.375-6.874-5.098-12.654-11.982-12.654h-63.383c-6.885 0-12.358 5.78-11.981 12.654z"/></svg>`;
      } else {
        iconHtml = `<svg class="banner-icon icon-error" viewBox="0 0 576 512" width="20" height="20" fill="currentColor" aria-hidden="true"><path d="M569.517 440.013C587.975 472.007 564.806 512 527.94 512H48.054c-36.937 0-59.999-40.055-41.577-71.987L246.423 23.985c18.467-32.009 64.72-31.951 83.154 0l239.94 416.028zM288 354c-25.405 0-46 20.595-46 46s20.595 46 46 46 46-20.595 46-46-20.595-46-46-46zm-43.673-165.346l7.418 136c.347 6.364 5.609 11.346 11.982 11.346h48.546c6.373 0 11.635-4.982 11.982-11.346l7.418-136c.375-6.874-5.098-12.654-11.982-12.654h-63.383c-6.885 0-12.358 5.78-11.981 12.654z"/></svg>`;
      }

      let mailtoButtonHtml = '';
      if (showMailto) {
        const mailtoSub = encodeURIComponent(`[Portfolio Contact] ${subjectInput.value.trim() || 'Collaboration Inquiry'}`);
        const mailtoBody = encodeURIComponent(`From: ${nameInput.value.trim()} (${emailInput.value.trim()})\n\nMessage:\n${messageInput.value.trim()}`);
        mailtoButtonHtml = `
          <a href="mailto:workwithsuvajit@gmail.com?subject=${mailtoSub}&body=${mailtoBody}" class="btn-mailto-fallback" style="text-decoration:none;">
            Send via Email App (mailto) ↗
          </a>
        `;
      }

      banner.innerHTML = `
        ${iconHtml}
        <div>
          <strong>${title}</strong>
          <p class="banner-subtext">${message}</p>
          ${mailtoButtonHtml}
        </div>
      `;

      bannerContainer.appendChild(banner);
    }

    // Submission handler
    form.addEventListener('submit', async (e) => {
      e.preventDefault();

      if (!validateForm()) return;

      // Duplicate message prevention
      const currentHash = `${emailInput.value.trim().toLowerCase()}|${messageInput.value.trim().toLowerCase()}`;
      if (lastSubmittedHash === currentHash) {
        showBanner(
          'error',
          'Duplicate Submission',
          'You have already submitted this exact message. We have received it and will reply soon!'
        );
        return;
      }

      // Check if placeholder is still set
      if (FORMSPREE_FORM_ID === 'YOUR_FORMSPREE_FORM_ID') {
        showBanner(
          'warning',
          'Formspree Endpoint Configuration Required',
          'Your Formspree form ID is currently set to the placeholder <code>YOUR_FORMSPREE_FORM_ID</code>. Create a free form at <a href="https://formspree.io" target="_blank" rel="noopener noreferrer" style="color:var(--neon-blue);text-decoration:underline;">formspree.io</a> with recipient <strong>workwithsuvajit@gmail.com</strong>, then replace <code>YOUR_FORMSPREE_FORM_ID</code> in <code>js/script.js</code> (line 21) or in <code>index.html</code>.',
          true
        );
        return;
      }

      // Prepare payload before disabling fields (disabled inputs are omitted from FormData)
      const payload = {
        name: nameInput.value.trim(),
        email: emailInput.value.trim(),
        subject: subjectInput.value.trim(),
        message: messageInput.value.trim()
      };

      // Set Loading State
      isSubmitting = true;
      submitBtn.disabled = true;
      nameInput.disabled = true;
      emailInput.disabled = true;
      subjectInput.disabled = true;
      messageInput.disabled = true;

      if (submitText) submitText.textContent = 'Sending to Inbox...';
      if (submitSpinner) submitSpinner.style.display = 'inline-block';
      if (submitIcon) submitIcon.style.display = 'none';

      try {
        const response = await fetch(FORMSPREE_ENDPOINT, {
          method: 'POST',
          body: JSON.stringify(payload),
          headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
          }
        });

        const data = await response.json().catch(() => ({}));

        if (response.ok) {
          // Confirmed success by Formspree
          lastSubmittedHash = currentHash;
          form.reset();
          showBanner(
            'success',
            'Message Delivered!',
            'Thank you! Your message has been submitted successfully to workwithsuvajit@gmail.com. I will get back to you as soon as possible.'
          );
        } else {
          // HTTP error response from Formspree
          const errMsg = data.errors && data.errors.length
            ? data.errors.map(err => err.message).join(', ')
            : (data.error || 'Unable to deliver message at this time.');

          showBanner(
            'error',
            'Submission Failed',
            `Formspree returned an error: ${errMsg}. Please try again or email me directly at workwithsuvajit@gmail.com.`,
            true
          );
        }
      } catch (err) {
        console.error('Contact form submission network error:', err);
        showBanner(
          'error',
          'Network Error',
          'A network error occurred while contacting the form delivery service. Please check your connection or send your message directly via email.',
          true
        );
      } finally {
        isSubmitting = false;
        submitBtn.disabled = false;
        nameInput.disabled = false;
        emailInput.disabled = false;
        subjectInput.disabled = false;
        messageInput.disabled = false;

        if (submitText) submitText.textContent = 'Send Message';
        if (submitSpinner) submitSpinner.style.display = 'none';
        if (submitIcon) submitIcon.style.display = 'inline-block';
      }
    });
  }

  /* ==========================================================================
     5. DYNAMIC COPYRIGHT YEAR
     ========================================================================== */
  function initDynamicYear() {
    const yearSpan = document.getElementById('current-year');
    if (yearSpan) {
      yearSpan.textContent = new Date().getFullYear();
    }
  }
})();
