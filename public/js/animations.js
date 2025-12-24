import { gsap } from '/lib/gsap.js';
import { ScrollTrigger } from '/lib/ScrollTrigger.js';

gsap.registerPlugin(ScrollTrigger);

document.addEventListener('DOMContentLoaded', () => {
    // Header Animation
    const header = document.querySelector("header");
    if (header) {
        gsap.from(header, {
            duration: 1,
            y: -100,
            opacity: 0,
            ease: "power3.out"
        });
    }

    // Content Fade In with Parallax feel
    const fadeTargets = document.querySelectorAll(".glass-card, .project-card, .skill-card, .timeline-item");
    if (fadeTargets.length > 0) {
        gsap.from(fadeTargets, {
            scrollTrigger: {
                trigger: "#home", // Default trigger
                start: "top center",
                toggleActions: "play none none none"
            },
            duration: 1,
            y: 50,
            opacity: 0,
            stagger: 0.1,
            ease: "power2.out"
        });
    }

    // Timeline Animation (Individual cards)
    const timelineItems = gsap.utils.toArray('.experience-card, .timeline-item');
    if (timelineItems.length > 0) {
        timelineItems.forEach((card) => {
            gsap.from(card, {
                scrollTrigger: {
                    trigger: card,
                    start: "top 80%",
                },
                duration: 0.8,
                x: -50,
                opacity: 0,
                ease: "back.out(1.7)"
            });
        });
    }

    // Card Hover Effects (Tilt - lightweight)
    const cards = document.querySelectorAll('.glass-card, .project-card, .skill-card');
    cards.forEach(card => {
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;

            // Calculate rotation details
            const rotateX = ((y / rect.height) - 0.5) * -10; // Max 10deg
            const rotateY = ((x / rect.width) - 0.5) * 10;

            gsap.to(card, {
                duration: 0.5,
                rotationY: rotateY,
                rotationX: rotateX,
                transformPerspective: 1000,
                transformOrigin: "center center",
                ease: "power1.out"
            });
        });

        card.addEventListener('mouseleave', () => {
            gsap.to(card, {
                duration: 0.5,
                rotationY: 0,
                rotationX: 0,
                ease: "power1.out" // Return to flat
            });
        });
    });

    // Navbar 3D Tilt
    const nav = document.querySelector('nav');
    if (nav) {
        document.addEventListener('mousemove', (e) => {
            const x = (window.innerWidth / 2 - e.pageX) / 50;
            const y = (window.innerHeight / 2 - e.pageY) / 50;
            nav.style.transform = `rotateY(${x}deg) rotateX(${y}deg)`;
        });
    }
});
