function initContactForm() {
    const form = document.getElementById('contactForm');
    const successMessage = document.getElementById('successMessage');

    if (!form) return;

    form.addEventListener('submit', async function(e) {
        e.preventDefault();

        if (!validateForm()) {
            return;
        }

        const formData = new FormData(form);

        if (formData.get('email2')) {
            console.log('Bot detected');
            return;
        }

        const submitButton = form.querySelector('button[type="submit"]');
        const originalText = submitButton.textContent;

        submitButton.disabled = true;
        submitButton.textContent = 'Sending...';

        try {
            successMessage.classList.add('visible');
            form.reset();

            setTimeout(() => {
                successMessage.classList.remove('visible');
            }, 5000);
        } catch (error) {
            alert('There was an error sending your message. Please try again.');
        } finally {
            submitButton.disabled = false;
            submitButton.textContent = originalText;
        }
    });

    const inputs = form.querySelectorAll('.form-input, .form-textarea');
    inputs.forEach(input => {
        input.addEventListener('blur', function() {
            validateField(this);
        });

        input.addEventListener('input', function() {
            if (this.classList.contains('error')) {
                validateField(this);
            }
        });
    });
}

function validateForm() {
    const name = document.getElementById('name');
    const email = document.getElementById('email');
    const message = document.getElementById('message');

    let isValid = true;

    if (!validateField(name)) isValid = false;
    if (!validateField(email)) isValid = false;
    if (!validateField(message)) isValid = false;

    return isValid;
}

function validateField(field) {
    const errorElement = document.getElementById(field.id + 'Error');
    let isValid = true;
    let errorMessage = '';

    if (field.hasAttribute('required') && !field.value.trim()) {
        isValid = false;
        errorMessage = `Please enter your ${field.name}`;
    }

    if (field.type === 'email' && field.value.trim()) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(field.value)) {
            isValid = false;
            errorMessage = 'Please enter a valid email address';
        }
    }

    if (field.id === 'message' && field.value.trim().length < 10) {
        isValid = false;
        errorMessage = 'Message must be at least 10 characters';
    }

    if (isValid) {
        field.classList.remove('error');
        if (errorElement) {
            errorElement.classList.remove('visible');
        }
    } else {
        field.classList.add('error');
        if (errorElement) {
            errorElement.textContent = errorMessage;
            errorElement.classList.add('visible');
        }
    }

    return isValid;
}

document.addEventListener('DOMContentLoaded', initContactForm);
