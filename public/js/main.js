import { gsap } from '/scripts/gsap/index.js';
import { ScrollTrigger } from '/scripts/gsap/ScrollTrigger.js';

gsap.registerPlugin(ScrollTrigger);

document.addEventListener('DOMContentLoaded', () => {
    // Current year in footer
    const yearEl = document.querySelector('.year');
    if (yearEl) {
        yearEl.textContent = new Date().getFullYear();
    }

    // Role Typing Animation
    const roles = ["Full-Stack Dev", "Software Dev"];
    let roleIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    const roleElement = document.querySelector('.role-text');
    const typingSpeed = 100;
    const deletingSpeed = 50;
    const delayBetweenRoles = 2000;

    function typeRoles() {
        if (!roleElement) return;

        const currentRole = roles[roleIndex];

        if (isDeleting) {
            roleElement.textContent = currentRole.substring(0, charIndex--);
        } else {
            roleElement.textContent = currentRole.substring(0, charIndex++);
        }

        let typeSpeed = isDeleting ? deletingSpeed : typingSpeed;

        if (!isDeleting && charIndex === currentRole.length + 1) {
            isDeleting = true;
            typeSpeed = delayBetweenRoles;
        } else if (isDeleting && charIndex === 0) {
            isDeleting = false;
            roleIndex = (roleIndex + 1) % roles.length;
            typeSpeed = 500;
        }

        setTimeout(typeRoles, typeSpeed);
    }

    // Start typing
    if (roleElement) typeRoles();

    // About Section Animation (Intersection Observer)
    const aboutSection = document.querySelector('#about');
    const aboutParagraphs = document.querySelectorAll('#about p');

    if (aboutSection && aboutParagraphs.length > 0) {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    gsap.fromTo(aboutParagraphs, { y: 20, opacity: 0 }, { y: 0, opacity: 1, duration: 1, stagger: 0.2 });
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.5 });

        observer.observe(aboutSection);
    }

    // Skills Filter Logic
    const filterBtns = document.querySelectorAll('.filter-btn');
    const skillCards = document.querySelectorAll('.skill-card');

    if (filterBtns.length > 0 && skillCards.length > 0) {
        filterBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                // Remove active class from all
                filterBtns.forEach(b => b.classList.remove('active'));
                // Add active to clicked
                btn.classList.add('active');

                const filterValue = btn.getAttribute('data-filter');

                skillCards.forEach(card => {
                    const category = card.getAttribute('data-category');
                    const skillNameEl = card.querySelector('.skill-name');
                    const skillName = skillNameEl ? skillNameEl.textContent.trim() : '';
                    let shouldShow = false;

                    if (filterValue === 'all') {
                        shouldShow = true;
                    } else if (filterValue === 'language') {
                        // Strict filtering for Programming Languages
                        if (['Python', 'Java', 'JavaScript'].includes(skillName)) {
                            shouldShow = true;
                        }
                    } else if (category === filterValue) {
                        shouldShow = true;
                    }

                    if (shouldShow) {
                        card.style.display = 'flex';
                        gsap.to(card, { opacity: 1, scale: 1, duration: 0.3, display: 'flex', overwrite: true });
                    } else {
                        gsap.to(card, {
                            opacity: 0, scale: 0.5, duration: 0.3, onComplete: () => {
                                card.style.display = 'none';
                            }, overwrite: true
                        });
                    }
                });
            });
        });
    }

    // Profile Image & About Image Animations
    const profileImg = document.querySelector('.profile-img');
    if (profileImg) {
        gsap.to(profileImg, {
            y: 15,
            duration: 2,
            yoyo: true,
            repeat: -1,
            ease: "sine.inOut"
        });
    }

    const aboutImg = document.querySelector('#about img');
    if (aboutImg) {
        gsap.from(aboutImg, {
            scrollTrigger: {
                trigger: "#about",
                start: "top 70%"
            },
            x: -100,
            opacity: 0,
            duration: 1.2,
            ease: "power2.out",
            onComplete: () => {
                gsap.to(aboutImg, {
                    y: 10,
                    duration: 3,
                    yoyo: true,
                    repeat: -1,
                    ease: "sine.inOut"
                });
            }
        });
    }

    // Active Navigation Link Highlighting
    const currentPath = window.location.pathname;
    const navLinks = document.querySelectorAll('nav a');

    if (navLinks.length > 0) {
        navLinks.forEach(link => {
            if (link.getAttribute('href') === currentPath) {
                link.classList.add('active');
                link.style.color = '#fff';
                link.style.fontWeight = 'bold';
            }
        });
    }
});
