// js/app.js (UPDATED to make trending links functional)

document.addEventListener('DOMContentLoaded', () => {

    // Get references to DOM elements
    const courseGrid = document.getElementById('course-grid');
    const searchInput = document.getElementById('course-search');
    const filterButtonsContainer = document.getElementById('filters');
    const trendingLinksContainer = document.querySelector('.dynamic-catalog .trending'); // More specific selector

    // Make sure all required elements exist before running the script
    if (!courseGrid || !searchInput || !filterButtonsContainer || !trendingLinksContainer) {
        console.error("Essential elements for the dynamic catalog are missing from the page.");
        return; // Stop the script if elements are not found
    }

    // Function to display courses
    function displayCourses(courseArray) {
        courseGrid.innerHTML = ''; // Clear existing content

        if (courseArray.length === 0) {
            courseGrid.innerHTML = '<p>No courses found matching your criteria. Try another term!</p>';
            return;
        }

        courseArray.forEach(course => {
            const courseCardHTML = `
                <div class="crole-card">
                    <div class="image-container">
                        <img src="${course.image}" alt="Thumbnail for ${course.title}">
                        
                        <!-- NEW: Conditionally add the offer tag -->
                        ${course.discountUrgencyMessage ? `<span class="special-offer-tag">Special Offer</span>` : ''}
                    </div>
                    <div class="clogo">
                        <img src="https://via.placeholder.com/25/0056D2/FFFFFF?text=C" alt="${course.instructor} Logo">
                        <p>${course.instructor}</p>
                    </div>
                    <p><strong>${course.title}</strong></p>
                    <div class="certificate-icon">
                        <p>Difficulty: ${course.difficulty}</p>
                    </div>
                    <a href="course.html?id=${course.id}" class="view-details-btn">View Details</a>
                </div>
            `;
            courseGrid.innerHTML += courseCardHTML;
        });
    }

    // --- EVENT LISTENERS ---

    // 1. Search input functionality
    searchInput.addEventListener('input', (event) => {
        const searchTerm = event.target.value.toLowerCase();
        // Clear active state from category filters when searching
        document.querySelectorAll('#filters button').forEach(btn => btn.classList.remove('active'));
        
        const filteredCourses = courses.filter(course => 
            course.title.toLowerCase().includes(searchTerm) || 
            course.instructor.toLowerCase().includes(searchTerm) ||
            course.description.toLowerCase().includes(searchTerm)
        );
        displayCourses(filteredCourses);
    });

    // 2. Filter button functionality
    filterButtonsContainer.addEventListener('click', (event) => {
        if (event.target.tagName === 'BUTTON') {
            const category = event.target.dataset.category;
            searchInput.value = ''; // Clear search bar when using filters

            // Update active class on buttons
            document.querySelectorAll('#filters button').forEach(btn => btn.classList.remove('active'));
            event.target.classList.add('active');
            
            if (category === 'all') {
                displayCourses(courses);
            } else {
                const filteredCourses = courses.filter(course => course.category === category);
                displayCourses(filteredCourses);
            }
        }
    });

    // 3. Trending links functionality (NEW)
    trendingLinksContainer.addEventListener('click', (event) => {
        // Only act if a link (<a>) was clicked
        if (event.target.tagName === 'A') {
            event.preventDefault(); // Stop the link from trying to navigate
            const searchTerm = event.target.textContent.toLowerCase();
            
            // Update the search bar with the clicked term for user feedback
            searchInput.value = event.target.textContent;

            // Clear active state from category filters
            document.querySelectorAll('#filters button').forEach(btn => btn.classList.remove('active'));

            // Filter courses based on the clicked term
            const filteredCourses = courses.filter(course => 
                course.title.toLowerCase().includes(searchTerm) ||
                course.description.toLowerCase().includes(searchTerm) ||
                course.instructor.toLowerCase().includes(searchTerm)
            );
            displayCourses(filteredCourses);
        }
    });

    // --- INITIAL PAGE LOAD ---
    // Display all courses by default
    displayCourses(courses);
});