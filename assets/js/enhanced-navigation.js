document.addEventListener('DOMContentLoaded', () => {
    const currentPath = window.location.pathname;
    const currentPage = currentPath.split('/').pop() || 'index.html';

    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
        const linkHref = link.getAttribute('href');
        if (linkHref === currentPage || 
            (currentPage === '' && linkHref === 'index.html') ||
            linkHref.includes(currentPage)) {
            link.classList.add('active');
            link.setAttribute('aria-current', 'page');
        }
    });

    const hamburger = document.querySelector('.mobile-menu-toggle');
    const mobileMenu = document.querySelector('.mobile-menu');
    const mobileOverlay = document.querySelector('.mobile-overlay');
    const body = document.body;

    if (hamburger && mobileMenu && mobileOverlay) {
        const toggleMenu = (open) => {
            const isOpen = open !== undefined ? open : !mobileMenu.classList.contains('active');

            mobileMenu.classList.toggle('active', isOpen);
            mobileOverlay.classList.toggle('active', isOpen);
            hamburger.setAttribute('aria-expanded', isOpen);

            if (isOpen) {
                body.style.overflow = 'hidden';
                hamburger.classList.add('active');
            } else {
                body.style.overflow = '';
                hamburger.classList.remove('active');
            }
        };

        hamburger.addEventListener('click', () => toggleMenu());

        mobileOverlay.addEventListener('click', () => toggleMenu(false));

        document.querySelectorAll('.mobile-menu .nav-link').forEach(link => {
            link.addEventListener('click', () => toggleMenu(false));
        });

        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && mobileMenu.classList.contains('active')) {
                toggleMenu(false);
            }
        });
    }

    const allLinks = document.querySelectorAll('a[href^="#"]');
    allLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            const targetId = link.getAttribute('href');
            if (targetId === '#') return;

            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                e.preventDefault();
                const navbarHeight = document.querySelector('.navbar')?.offsetHeight || 70;
                const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset - navbarHeight;

                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });

                if (mobileMenu && mobileMenu.classList.contains('active')) {
                    toggleMenu(false);
                }
            }
        });
    });

    const navbar = document.querySelector('.navbar');
    if (navbar) {
        let lastScrollY = window.pageYOffset;
        let ticking = false;

        const updateNavbar = () => {
            const currentScrollY = window.pageYOffset;

            if (currentScrollY > 100) {
                navbar.classList.add('scrolled');
            } else {
                navbar.classList.remove('scrolled');
            }

            lastScrollY = currentScrollY;
            ticking = false;
        };

        window.addEventListener('scroll', () => {
            if (!ticking) {
                window.requestAnimationFrame(updateNavbar);
                ticking = true;
            }
        });
    }
});