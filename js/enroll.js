// js/enroll.js

document.addEventListener('DOMContentLoaded', () => {

    // --- 1. GET COURSE DATA AND UPDATE TITLE ---
    const pageTitle = document.getElementById('enroll-title');
    const formWrapper = document.querySelector('.enroll-form-wrapper');

    const params = new URLSearchParams(window.location.search);
    const courseId = parseInt(params.get('id'));
    const course = courses.find(c => c.id === courseId);

    if (course) {
        pageTitle.textContent = `Enroll in "${course.title}"`;
    } else {
        pageTitle.textContent = 'Enroll in a Course';
    }

    // --- 2. GET FORM ELEMENTS ---
    const form = document.getElementById('enrollment-form');
    if (!form) return; // Stop if there's no form on the page

    const nameInput = document.getElementById('full-name');
    const emailInput = document.getElementById('email');
    const cardInput = document.getElementById('card-number');
    const expiryInput = document.getElementById('expiry-date');
    const cvvInput = document.getElementById('cvv');

    // --- 3. FORM SUBMISSION EVENT LISTENER ---
    form.addEventListener('submit', (event) => {
        // Prevent the form from actually submitting and reloading the page
        event.preventDefault();
        
        // Run validation and check if the form is valid
        const isFormValid = validateForm();

        if (isFormValid) {
            // If valid, show the success message
            showSuccessMessage();
        }
    });

    // --- 4. VALIDATION FUNCTION ---
    function validateForm() {
        let isValid = true;

        // Clear all previous errors
        document.querySelectorAll('.error-message').forEach(el => el.textContent = '');

        // Validate Full Name
        if (nameInput.value.trim() === '') {
            document.getElementById('name-error').textContent = 'Full Name is required.';
            isValid = false;
        }

        // Validate Email
        const emailPattern = /^\S+@\S+\.\S+$/; // Simple email regex
        if (!emailPattern.test(emailInput.value)) {
            document.getElementById('email-error').textContent = 'Please enter a valid email address.';
            isValid = false;
        }

        // Validate Card Number (simple check for non-empty)
        if (cardInput.value.trim().length < 16) {
            document.getElementById('card-error').textContent = 'Please enter a valid card number.';
            isValid = false;
        }

        // Validate Expiry Date
        if (expiryInput.value.trim() === '') {
            document.getElementById('expiry-error').textContent = 'Expiry date is required.';
            isValid = false;
        }

        // Validate CVV
        if (cvvInput.value.trim().length < 3) {
            document.getElementById('cvv-error').textContent = 'Please enter a valid CVV.';
            isValid = false;
        }

        return isValid;
    }

    // --- 5. SUCCESS MESSAGE FUNCTION ---
    function showSuccessMessage() {
        const courseName = course ? `"${course.title}"` : "the course";
        
        formWrapper.innerHTML = `
            <div class="enroll-success-message">
                <h2>Thank You!</h2>
                <p>You have successfully enrolled in ${courseName}.</p>
                <p>A confirmation email has been sent to your inbox.</p>
                <br>
                <a href="index.html">Back to Course Catalog</a>
            </div>
        `;
    }
});