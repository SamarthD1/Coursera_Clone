// js/course-detail.js - Fully Updated with Progress Bar Logic

document.addEventListener('DOMContentLoaded', () => {
    
    const mainContainer = document.querySelector('.course-detail-container');
    if (!mainContainer) {
        console.error("Course detail container not found.");
        return;
    }

    const params = new URLSearchParams(window.location.search);
    const courseId = params.get('id'); // Get ID as a string for consistent comparison
    const course = courses.find(c => c.id == courseId); //  '==' to compare string and number

    if (!course) {
        mainContainer.innerHTML = '<h1>Course not found!</h1><p>Sorry, the course you are looking for does not exist. Please <a href="index.html">return to the catalog</a>.</p>';
        document.title = "Course Not Found | Coursera Clone";
        return;
    }

    document.title = `${course.title} | Coursera Clone`;

    // code to DYNAMICALLY BUILD HTML  

    const syllabusItems = course.syllabus.map(item => `<li>${item}</li>`).join('');

    const reviewCards = course.reviews.map(review => `
        <div class="review-card">
            <div class="review-stars">${'★'.repeat(review.rating)}${'☆'.repeat(5 - review.rating)}</div>
            <p>"${review.comment}"</p>
            <strong>- ${review.user}</strong>
        </div>
    `).join('');

    // The complete HTML structure with new containers in the sidebar
    const courseHTML = `
        <div class="course-layout">
            <!-- Main Content Column -->
            <div class="course-main-content">
                <h1>${course.title}</h1>
                <p class="course-tagline">${course.description}</p>
                <img src="${course.image}" alt="Hero image for ${course.title}" class="course-hero-image">

                <!-- Tab Navigation -->
                <div class="course-tabs">
                    <nav class="course-tabs-nav">
                        <button class="tab-link active-tab" data-tab="syllabus">Syllabus</button>
                        <button class="tab-link" data-tab="instructor">Instructor</button>
                        <button class="tab-link" data-tab="reviews">Reviews</button>
                    </nav>

                    <!-- Tab Content Panels -->
                    <div id="syllabus" class="tab-content active-tab-content">
                        <!-- ... syllabus content ... -->
                        <ul>${syllabusItems}</ul>
                    </div>
                    <div id="instructor" class="tab-content">
                        <!-- ... instructor content ... -->
                        <h3><a href="instructor.html?name=${encodeURIComponent(course.instructor)}">${course.instructor}</a></h3>
                        <p>${course.instructorBio}</p>
                    </div>
                    <div id="reviews" class="tab-content">
                        <!-- ... reviews content ... -->
                        ${reviewCards.length > 0 ? reviewCards : '<p>No reviews yet for this course.</p>'}
                    </div>
                </div>
            </div>

            <!-- Sidebar Column (UPDATED with new containers) -->
            <aside class="course-sidebar">
                <h3>Course Details</h3>
                <p>
                    <strong>Level:</strong> ${course.difficulty}
                </p>
                <p class="price-wrapper">
                    ${course.originalPrice ? `<s class="original-price">$${course.originalPrice.toFixed(2)}</s>` : ''}
                    <span class="price">$${course.price.toFixed(2)}</span>
                </p>
                ${course.discountUrgencyMessage ? `<p class="urgency-message">${course.discountUrgencyMessage}</p>` : ''}
                
                <!-- Container for the Enroll Buttons -->
                <div id="enroll-button-container">
                    <a href="enroll.html?id=${course.id}" class="enroll-button">Enroll Now</a>
                    ${course.hasFreeTrial ? `<a href="#" class="secondary-button">Try a Sample Lesson</a>` : ''}
                </div>

                <!-- Container for the Progress Bar (initially empty) -->
                <div id="enrollment-status-container"></div>

                <!-- Financial Aid Info -->
                <div class="financial-aid-info">
                    <a href="financial-aid.html">Financial aid available</a>
                    <p>Group discounts also offered for teams.</p>
                </div>
            </aside>
        </div>
    `;
    
    // Inject the generated HTML into the page
    mainContainer.innerHTML = courseHTML;

    // --- NEW: CHECK ENROLLMENT STATUS AFTER HTML IS BUILT ---
    checkEnrollmentStatus();

    // --- Tab Switching Logic (remains unchanged) ---
    const tabLinks = mainContainer.querySelectorAll('.tab-link');
    const tabContents = mainContainer.querySelectorAll('.tab-content');

    tabLinks.forEach(link => {
        link.addEventListener('click', () => {
            const tabId = link.dataset.tab;
            tabLinks.forEach(l => l.classList.remove('active-tab'));
            link.classList.add('active-tab');
            tabContents.forEach(content => {
                content.classList.toggle('active-tab-content', content.id === tabId);
            });
        });
    });

    // ---  FUNCTION TO UPDATE UI BASED ON ENROLLMENT ---
    function checkEnrollmentStatus() {
        // Get the list of enrolled courses from localStorage
        const enrolledCourses = JSON.parse(localStorage.getItem('enrolledCourses')) || [];

        // Check if the current course's ID is in the list
        if (enrolledCourses.includes(courseId)) {
            const buttonContainer = document.getElementById('enroll-button-container');
            const statusContainer = document.getElementById('enrollment-status-container');

            // Hide the enroll buttons
            if (buttonContainer) {
                buttonContainer.style.display = 'none';
            }

            // Create and display the progress bar
            if (statusContainer) {
                const progressBarHTML = `
                    <div class="progress-bar-wrapper">
                        <h3>Your Progress</h3>
                        <div class="progress-bar-outer">
                            <div class="progress-bar-inner" style="width: 5%;"></div>
                        </div>
                        <p>5% Complete</p>
                        <a href="#" class="enroll-button">Continue Learning</a>
                    </div>
                `;
                statusContainer.innerHTML = progressBarHTML;
            }
        }
    }
});