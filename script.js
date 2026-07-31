/* ==========================================================================
   Obsidian & Aurora Portfolio Interactive Script
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {
    // ----------------------------------------------------------------------
    // 1. Mobile Menu Navigation
    // ----------------------------------------------------------------------
    const mobileToggle = document.getElementById('mobile-toggle');
    const navbar = document.getElementById('navbar');
    const navLinks = document.querySelectorAll('.nav-link');

    if (mobileToggle) {
        mobileToggle.addEventListener('click', () => {
            navbar.classList.toggle('mobile-open');
            const icon = mobileToggle.querySelector('i');
            if (icon.classList.contains('fa-bars')) {
                icon.classList.replace('fa-bars', 'fa-xmark');
            } else {
                icon.classList.replace('fa-xmark', 'fa-bars');
            }
        });
    }

    // Close mobile menu when a link is clicked
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            if (navbar.classList.contains('mobile-open')) {
                navbar.classList.remove('mobile-open');
                const icon = mobileToggle.querySelector('i');
                icon.classList.replace('fa-xmark', 'fa-bars');
            }
        });
    });

    // ----------------------------------------------------------------------
    // 2. Typewriter Effect
    // ----------------------------------------------------------------------
    const words = [
        "Real-Time Backend Architect",
        "AWS Academy Graduate",
        "GenAI Developer",
        "Full-Stack Developer"
    ];
    let i = 0;
    let timer;

    function typingEffect() {
        const typewriterEl = document.getElementById('typewriter');
        if (!typewriterEl) return;
        
        let word = words[i].split("");
        var loopTyping = function() {
            if (word.length > 0) {
                typewriterEl.innerHTML += word.shift();
            } else {
                setTimeout(deletingEffect, 2000);
                return false;
            }
            timer = setTimeout(loopTyping, 100);
        };
        loopTyping();
    }

    function deletingEffect() {
        const typewriterEl = document.getElementById('typewriter');
        if (!typewriterEl) return;
        
        let word = words[i].split("");
        var loopDeleting = function() {
            if (word.length > 0) {
                word.pop();
                typewriterEl.innerHTML = word.join("");
            } else {
                if (words.length > (i + 1)) {
                    i++;
                } else {
                    i = 0;
                }
                setTimeout(typingEffect, 500);
                return false;
            }
            timer = setTimeout(loopDeleting, 60);
        };
        loopDeleting();
    }

    // Initialize Typewriter Loop
    typingEffect();

    // ----------------------------------------------------------------------
    // 3. Scroll Reveal Animation using Intersection Observer
    // ----------------------------------------------------------------------
    const revealElements = document.querySelectorAll('.scroll-reveal');
    
    if ('IntersectionObserver' in window) {
        const revealObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('revealed');
                    // Stop observing once revealed to preserve performance
                    observer.unobserve(entry.target);
                }
            });
        }, {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        });

        revealElements.forEach(el => revealObserver.observe(el));
    } else {
        // Fallback for older browsers
        revealElements.forEach(el => el.classList.add('revealed'));
    }

    // ----------------------------------------------------------------------
    // 4. Accordion Toggle for Tier 2 Certifications
    // ----------------------------------------------------------------------
    const accordionToggle = document.getElementById('accordion-toggle');
    const accordionContent = document.getElementById('accordion-content');

    if (accordionToggle && accordionContent) {
        accordionToggle.addEventListener('click', () => {
            accordionToggle.classList.toggle('active');
            accordionContent.classList.toggle('open');
        });
    }

    // ----------------------------------------------------------------------
    // 5. Contact Form Submission Handling
    // ----------------------------------------------------------------------
    const contactForm = document.getElementById('contact-form');
    
    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            
            // Extract values
            const name = document.getElementById('name').value;
            const email = document.getElementById('email').value;
            const message = document.getElementById('message').value;

            // Simple user validation
            if (!name || !email || !message) {
                alert('Please fill out all fields before submitting.');
                return;
            }

            // Create a custom glassmorphism modal popup alert
            alert(`Thanks, ${name}! Your mock message has been submitted. In a production environment, this form would trigger an email or direct webhook integration.`);
            contactForm.reset();
        });
    }
});
