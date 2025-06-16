// js/enroll.js - Fully Updated with Progress Bar Logic

document.addEventListener('DOMContentLoaded', () => {

    // --- 1. GET COURSE DATA AND UPDATE TITLE ---
    const pageTitle = document.getElementById('enroll-title');
    const formWrapper = document.querySelector('.enroll-form-wrapper');

    const params = new URLSearchParams(window.location.search);
    // Use the string version of id for consistency with localStorage
    const courseId = params.get('id'); 
    // Find the course using a non-strict comparison '==' because course.id is a number
    const course = courses.find(c => c.id == courseId);

    if (course) {
        pageTitle.textContent = `Enroll in "${course.title}"`;
    } else {
        // Handle case where course ID is missing or invalid
        pageTitle.textContent = 'Enrollment Error';
        if (formWrapper) {
            formWrapper.innerHTML = '<p style="color: red; text-align: center;">Error: Course not found. Please return to the catalog and select a course to enroll in.</p>';
        }
        return; // Stop the script if no valid course is found
    }

    // --- 2. GET FORM ELEMENTS ---
    const form = document.getElementById('enrollment-form');
    if (!form) return;

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
            // --- REPLACE showSuccessMessage() ---

            // 1. Get the list of enrolled courses from localStorage.
            let enrolledCourses = JSON.parse(localStorage.getItem('enrolledCourses')) || [];

            // 2. Add the new course ID to the list if it's not already there.
            if (!enrolledCourses.includes(courseId)) {
                enrolledCourses.push(courseId);
            }

            // 3. Save the updated list back to localStorage.
            localStorage.setItem('enrolledCourses', JSON.stringify(enrolledCourses));
            
            // 4. Redirect the user back to the course detail page to see their new progress bar.
            alert('Enrollment successful! You will now be taken back to the course page.');
            window.location.href = `course.html?id=${courseId}`;
        }
    });

    // --- 4. VALIDATION FUNCTION (Unchanged) ---
    function validateForm() {
        let isValid = true;
        document.querySelectorAll('.error-message').forEach(el => el.textContent = '');

        // Validate Full Name
        if (nameInput.value.trim() === '') {
            document.getElementById('name-error').textContent = 'Full Name is required.';
            isValid = false;
        }

        // Validate Email
        const emailPattern = /^\S+@\S+\.\S+$/;
        if (!emailPattern.test(emailInput.value)) {
            document.getElementById('email-error').textContent = 'Please enter a valid email address.';
            isValid = false;
        }

        // Validate Card Number
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
    /*
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
    */
});