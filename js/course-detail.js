// js/course-detail.js (UPDATED with urgency message)

document.addEventListener('DOMContentLoaded', () => {
    
    const mainContainer = document.querySelector('.course-detail-container');
    if (!mainContainer) {
        console.error("Course detail container not found.");
        return;
    }

    const params = new URLSearchParams(window.location.search);
    const courseId = parseInt(params.get('id'));
    const course = courses.find(c => c.id === courseId);

    if (!course) {
        mainContainer.innerHTML = '<h1>Course not found!</h1><p>Sorry, the course you are looking for does not exist. Please <a href="index.html">return to the catalog</a>.</p>';
        document.title = "Course Not Found | Coursera Clone";
        return;
    }

    document.title = `${course.title} | Coursera Clone`;

    // --- DYNAMICALLY BUILD HTML ---

    const syllabusItems = course.syllabus.map(item => `<li>${item}</li>`).join('');

    const reviewCards = course.reviews.map(review => `
        <div class="review-card">
            <div class="review-stars">${'★'.repeat(review.rating)}${'☆'.repeat(5 - review.rating)}</div>
            <p>"${review.comment}"</p>
            <strong>- ${review.user}</strong>
        </div>
    `).join('');

    // The complete HTML structure with tabs and new pricing logic
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
                        <h2>Syllabus</h2>
                        <p>This course is broken down into the following weekly modules:</p>
                        <ul>${syllabusItems}</ul>
                    </div>
                    <div id="instructor" class="tab-content">
                        <h2>About the Instructor</h2>
                        <h3><a href="instructor.html?name=${encodeURIComponent(course.instructor)}">${course.instructor}</a></h3>
                        <p>${course.instructorBio}</p>
                    </div>
                    <div id="reviews" class="tab-content">
                        <h2>What Learners Are Saying</h2>
                        ${reviewCards.length > 0 ? reviewCards : '<p>No reviews yet for this course.</p>'}
                    </div>
                </div>
            </div>

            <!-- Sidebar Column -->
            <aside class="course-sidebar">
                <h3>Course Details</h3>
                <p>
                    <strong>Level:</strong> ${course.difficulty}
                </p>
                
                <!-- Price Display Logic -->
                <p class="price-wrapper">
                    ${course.originalPrice ? `<s class="original-price">$${course.originalPrice.toFixed(2)}</s>` : ''}
                    <span class="price">$${course.price.toFixed(2)}</span>
                </p>

                <!-- Urgency Message -->
                ${course.discountUrgencyMessage ? `<p class="urgency-message">${course.discountUrgencyMessage}</p>` : ''}
                
                <!-- Buttons -->
                <a href="enroll.html?id=${course.id}" class="enroll-button">Enroll Now</a>
                ${course.hasFreeTrial ? `<a href="#" class="secondary-button">Try a Sample Lesson</a>` : ''}

                <!-- Financial Aid Info -->
                <div class="financial-aid-info">
                    <a href="financial-aid.html">Financial aid available</a>
                    <p>Group discounts also offered for teams.</p>
                </div>
            </aside>
        </div>
    `;
    
    mainContainer.innerHTML = courseHTML;

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
});