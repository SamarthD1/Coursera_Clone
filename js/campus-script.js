
document.addEventListener('DOMContentLoaded', function() {
    const tabsNav = document.getElementById('features-tabs-nav');
    const tabsContent = document.getElementById('features-tabs-content');

    if (tabsNav && tabsContent) {
        tabsNav.addEventListener('click', function(e) {
            if (e.target.tagName !== 'BUTTON') return;

            // Deactivate current active tab and pane
            const currentActiveTab = tabsNav.querySelector('.active');
            if (currentActiveTab) currentActiveTab.classList.remove('active');
            
            const currentActivePane = tabsContent.querySelector('.active');
            if (currentActivePane) currentActivePane.classList.remove('active');

            // Activate the new tab and corresponding pane
            const newActiveTab = e.target;
            newActiveTab.classList.add('active');

            const newActivePaneId = newActiveTab.dataset.target;
            const newActivePane = document.getElementById(newActivePaneId);
            if (newActivePane) {
                newActivePane.classList.add('active');
            }
        });
    }

    // --- Sales Contact Form Validation ---
    const contactForm = document.getElementById('sales-contact-form');
    const formFeedback = document.getElementById('form-feedback');

    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault(); // Stop the default form submission

            // Simple validation: check if required fields are filled
            let isValid = true;
            const requiredFields = contactForm.querySelectorAll('[required]');

            requiredFields.forEach(field => {
                if (!field.value.trim()) {
                    isValid = false;
                    field.style.borderColor = '#d93025'; // Highlight empty required fields
                } else {
                    field.style.borderColor = '#ccc'; // Reset border color
                }
            });

            if (isValid) {
                // If form is valid, show success message
                formFeedback.textContent = 'Thank you! Your message has been sent.';
                formFeedback.className = 'form-feedback-message success';
                contactForm.reset(); // Clear the form
            } else {
                // If form is invalid, show error message
                formFeedback.textContent = 'Please fill out all required fields marked with *.';
                formFeedback.className = 'form-feedback-message';
            }
        });
    }

}); 


// document.addEventListener('DOMContentLoaded', function() {

//     const tabsNav = document.getElementById('features-tabs-nav');
//     const tabsContent = document.getElementById('features-tabs-content');

//     if (tabsNav && tabsContent) {
//         tabsNav.addEventListener('click', function(e) {
//             // Ensure a button was clicked
//             if (e.target.tagName !== 'BUTTON') {
//                 return;
//             }

//             // 1. Deactivate current active elements
//             const currentActiveTab = tabsNav.querySelector('.active');
//             const currentActivePane = tabsContent.querySelector('.active');
            
//             if (currentActiveTab) currentActiveTab.classList.remove('active');
//             if (currentActivePane) currentActivePane.classList.remove('active');

//             // 2. Activate the new elements
//             const newActiveTab = e.target;
//             const newActivePaneId = newActiveTab.dataset.target; // Gets "tab-1", "tab-2", etc.
//             const newActivePane = document.getElementById(newActivePaneId);

//             newActiveTab.classList.add('active');
//             if (newActivePane) {
//                 newActivePane.classList.add('active');
//             }
//         });
//     }
// });