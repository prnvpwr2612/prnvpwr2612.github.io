document.addEventListener('DOMContentLoaded', () => {
    const forms = document.querySelectorAll('form');

    forms.forEach(form => {
        const inputs = form.querySelectorAll('input:not([type="submit"]):not([type="hidden"]), textarea, select');

        inputs.forEach(input => {
            const formGroup = input.closest('.form-group');
            const label = formGroup?.querySelector('.form-label, label');

            const updateLabelState = () => {
                if (input.value || input === document.activeElement) {
                    label?.classList.add('active');
                } else {
                    label?.classList.remove('active');
                }
            };

            input.addEventListener('focus', () => {
                formGroup?.classList.add('focused');
                updateLabelState();
            });

            input.addEventListener('blur', () => {
                formGroup?.classList.remove('focused');
                updateLabelState();
            });

            input.addEventListener('input', updateLabelState);

            updateLabelState();
        });

        const textareas = form.querySelectorAll('textarea[maxlength]');
        textareas.forEach(textarea => {
            const maxLength = textarea.getAttribute('maxlength');
            if (!maxLength) return;

            const counter = document.createElement('div');
            counter.className = 'char-counter';
            counter.setAttribute('aria-live', 'polite');
            textarea.parentElement.appendChild(counter);

            const updateCounter = () => {
                const current = textarea.value.length;
                counter.textContent = `${current} / ${maxLength} characters`;

                if (current > maxLength * 0.9) {
                    counter.classList.add('warning');
                } else {
                    counter.classList.remove('warning');
                }
            };

            textarea.addEventListener('input', updateCounter);
            updateCounter();
        });
    });

    const buttons = document.querySelectorAll('.btn');
    buttons.forEach(button => {
        button.addEventListener('mousedown', (e) => {
            const ripple = document.createElement('span');
            ripple.className = 'ripple';

            const rect = button.getBoundingClientRect();
            const size = Math.max(rect.width, rect.height);
            const x = e.clientX - rect.left - size / 2;
            const y = e.clientY - rect.top - size / 2;

            ripple.style.width = ripple.style.height = size + 'px';
            ripple.style.left = x + 'px';
            ripple.style.top = y + 'px';

            button.appendChild(ripple);

            setTimeout(() => ripple.remove(), 600);
        });
    });

    const hoverElements = document.querySelectorAll('[data-hover]');
    hoverElements.forEach(element => {
        element.addEventListener('mouseenter', () => {
            element.classList.add('hovering');
        });

        element.addEventListener('mouseleave', () => {
            element.classList.remove('hovering');
        });
    });

    const cards = document.querySelectorAll('.card, .publication-card, .project-card');
    cards.forEach(card => {
        card.addEventListener('mouseenter', (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;

            card.style.setProperty('--mouse-x', `${x}px`);
            card.style.setProperty('--mouse-y', `${y}px`);
        });

        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;

            card.style.setProperty('--mouse-x', `${x}px`);
            card.style.setProperty('--mouse-y', `${y}px`);
        });
    });

    const links = document.querySelectorAll('a:not(.btn)');
    links.forEach(link => {
        if (link.hostname !== window.location.hostname) {
            link.setAttribute('target', '_blank');
            link.setAttribute('rel', 'noopener noreferrer');

            if (!link.querySelector('.external-icon')) {
                const icon = document.createElement('span');
                icon.className = 'external-icon';
                icon.innerHTML = '↗';
                icon.setAttribute('aria-label', 'Opens in new tab');
                link.appendChild(icon);
            }
        }
    });

    const copyButtons = document.querySelectorAll('[data-copy]');
    copyButtons.forEach(button => {
        button.addEventListener('click', async () => {
            const textToCopy = button.dataset.copy || button.textContent;

            try {
                await navigator.clipboard.writeText(textToCopy);

                const originalText = button.textContent;
                button.textContent = '✓ Copied!';
                button.classList.add('copied');

                setTimeout(() => {
                    button.textContent = originalText;
                    button.classList.remove('copied');
                }, 2000);
            } catch (err) {
                console.error('Copy failed:', err);
            }
        });
    });

    const scrollTopButton = document.createElement('button');
    scrollTopButton.className = 'scroll-to-top';
    scrollTopButton.innerHTML = '↑';
    scrollTopButton.setAttribute('aria-label', 'Scroll to top');
    document.body.appendChild(scrollTopButton);

    scrollTopButton.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });

    window.addEventListener('scroll', () => {
        if (window.pageYOffset > 300) {
            scrollTopButton.classList.add('visible');
        } else {
            scrollTopButton.classList.remove('visible');
        }
    });
});