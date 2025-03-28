document.addEventListener('DOMContentLoaded', () => {
    // Smooth scroll to section
    const scrollToSection = (targetElement) => {
        targetElement.scrollIntoView({ 
            behavior: 'smooth',
            block: 'start'
        });
    };

    // Navigation smooth scrolling
    const navLinks = document.querySelectorAll('.navbar-menu a');
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            // Check if link is to current page
            if (link.getAttribute('href').startsWith('#')) {
                e.preventDefault();
                const targetId = link.getAttribute('href').substring(1);
                const targetElement = document.getElementById(targetId);
                
                if (targetElement) {
                    scrollToSection(targetElement);
                }
            }
        });
    });

    // Post card hover effect
    const postCards = document.querySelectorAll('.post-card');
    postCards.forEach(card => {
        card.addEventListener('mouseenter', () => {
            card.style.transform = 'translateY(-5px)';
        });

        card.addEventListener('mouseleave', () => {
            card.style.transform = 'translateY(0)';
        });
    });

    // Simple read more interaction
    const readMoreLinks = document.querySelectorAll('.post-card a');
    readMoreLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            // Optional: Add analytics or tracking
            console.log(`Clicked read more for: ${link.closest('.post-card').querySelector('h3').textContent}`);
        });
    });

    // Optional: Simple scroll reveal for sections
    const revealOnScroll = () => {
        const reveals = document.querySelectorAll('.post-card');
        
        reveals.forEach(reveal => {
            const windowHeight = window.innerHeight;
            const revealTop = reveal.getBoundingClientRect().top;
            const revealPoint = 150;

            if (revealTop < windowHeight - revealPoint) {
                reveal.classList.add('active');
            } else {
                reveal.classList.remove('active');
            }
        });
    };

    window.addEventListener('scroll', revealOnScroll);
});