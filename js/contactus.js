document.addEventListener('DOMContentLoaded', () => {

    // Mobile menu toggle
    const hamburger = document.getElementById('hamburger-menu');
    const navMenu = document.getElementById('main-nav');

    hamburger.addEventListener('click', () => {
        navMenu.classList.toggle('active');
        hamburger.classList.toggle('active');
    });

    // Simple form validation
    const contactForm = document.getElementById('contact-form');
    
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault(); // Prevent actual form submission for this demo

        const firstName = document.getElementById('first-name');
        const email = document.getElementById('email');
        let isValid = true;

        // Reset previous errors
        firstName.style.borderColor = 'var(--border-color)';
        email.style.borderColor = 'var(--border-color)';
        
        // Check First Name
        if (firstName.value.trim() === '') {
            firstName.style.borderColor = 'red';
            isValid = false;
        }

        // Check Email
        if (email.value.trim() === '' || !email.value.includes('@')) {
            email.style.borderColor = 'red';
            isValid = false;
        }

        if (isValid) {
            alert('Thank you for your submission!');
            contactForm.reset(); // Clear the form
        } else {
            alert('Please fill out the required fields correctly.');
        }
    });

});