document.addEventListener('DOMContentLoaded', () => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (prefersReducedMotion) {
        document.querySelectorAll('[data-animate]').forEach(el => {
            el.style.opacity = '1';
            el.style.transform = 'none';
        });
        return;
    }

    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const animateElement = (element, index = 0) => {
        const delay = index * 100;

        setTimeout(() => {
            element.classList.add('animate-in');
        }, delay);
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const parent = entry.target.parentElement;
                const siblings = parent ? Array.from(parent.children).filter(el => el.hasAttribute('data-animate')) : [entry.target];
                const index = siblings.indexOf(entry.target);

                animateElement(entry.target, index);
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    document.querySelectorAll('[data-animate]').forEach(element => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(20px)';
        element.style.transition = 'opacity 0.6s cubic-bezier(0.25, 0.46, 0.45, 0.94), transform 0.6s cubic-bezier(0.25, 0.46, 0.45, 0.94)';

        observer.observe(element);
    });

    const heroElements = document.querySelectorAll('.hero [data-animate]');
    if (heroElements.length > 0) {
        heroElements.forEach((el, index) => {
            setTimeout(() => {
                el.classList.add('animate-in');
            }, index * 150);
        });
    }

    const interestBadges = document.querySelectorAll('.interest-badge');
    if (interestBadges.length > 0) {
        const badgeObserver = new IntersectionObserver((entries) => {
            entries.forEach((entry, index) => {
                if (entry.isIntersecting) {
                    setTimeout(() => {
                        entry.target.style.opacity = '1';
                        entry.target.style.transform = 'translateY(0)';
                    }, index * 50);
                    badgeObserver.unobserve(entry.target);
                }
            });
        }, { threshold: 0.1 });

        interestBadges.forEach(badge => {
            badge.style.opacity = '0';
            badge.style.transform = 'translateY(20px)';
            badge.style.transition = 'all 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94)';
            badgeObserver.observe(badge);
        });
    }

    const cards = document.querySelectorAll('.publication-card, .project-card, .card');
    if (cards.length > 0) {
        const cardObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                    cardObserver.unobserve(entry.target);
                }
            });
        }, { threshold: 0.1, rootMargin: '0px 0px -30px 0px' });

        cards.forEach((card, index) => {
            if (!card.hasAttribute('data-animate')) {
                card.style.opacity = '0';
                card.style.transform = 'translateY(15px)';
                card.style.transition = `opacity 0.5s ease ${index * 50}ms, transform 0.5s ease ${index * 50}ms`;
                cardObserver.observe(card);
            }
        });
    }

    const revealOnScroll = () => {
        const reveals = document.querySelectorAll('[data-reveal]');

        reveals.forEach(element => {
            const windowHeight = window.innerHeight;
            const elementTop = element.getBoundingClientRect().top;
            const elementVisible = 100;

            if (elementTop < windowHeight - elementVisible) {
                element.classList.add('revealed');
            }
        });
    };

    window.addEventListener('scroll', revealOnScroll);
    revealOnScroll();

    window.addEventListener('load', () => {
        document.body.classList.add('loaded');
    });
});