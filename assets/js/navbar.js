function initNavbar() {
    const navbar = document.querySelector('.navbar');
    const mobileToggle = document.querySelector('.mobile-menu-toggle');
    const mobileMenu = document.querySelector('.mobile-menu');
    const mobileOverlay = document.querySelector('.mobile-overlay');
    const navLinks = document.querySelectorAll('.nav-link');

    let lastScroll = 0;

    window.addEventListener('scroll', () => {
        const currentScroll = window.pageYOffset;

        if (currentScroll > 100) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }

        lastScroll = currentScroll;
    });

    mobileToggle.addEventListener('click', () => {
        const isActive = mobileMenu.classList.contains('active');

        if (isActive) {
            closeMobileMenu();
        } else {
            openMobileMenu();
        }
    });

    mobileOverlay.addEventListener('click', () => {
        closeMobileMenu();
    });

    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            if (window.innerWidth <= 768) {
                closeMobileMenu();
            }
        });
    });

    function openMobileMenu() {
        mobileToggle.classList.add('active');
        mobileMenu.classList.add('active');
        mobileOverlay.classList.add('active');
        mobileToggle.setAttribute('aria-expanded', 'true');
        document.body.style.overflow = 'hidden';
    }

    function closeMobileMenu() {
        mobileToggle.classList.remove('active');
        mobileMenu.classList.remove('active');
        mobileOverlay.classList.remove('active');
        mobileToggle.setAttribute('aria-expanded', 'false');
        document.body.style.overflow = '';
    }

    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    navLinks.forEach(link => {
        const linkPage = link.getAttribute('href');
        if (linkPage === currentPage) {
            link.classList.add('active');
        }
    });
}

document.addEventListener('DOMContentLoaded', initNavbar);
