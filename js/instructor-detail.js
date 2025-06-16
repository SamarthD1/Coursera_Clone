// js/instructor-detail.js (Complete and Corrected)

document.addEventListener('DOMContentLoaded', () => {

    const mainContainer = document.querySelector('.instructor-page-container');
    if (!mainContainer) {
        console.error("Instructor page container not found.");
        return;
    }

    // 1. Get the instructor's name from the URL
    const params = new URLSearchParams(window.location.search);
    const instructorName = decodeURIComponent(params.get('name'));

    // 2. Find all courses taught by this instructor
    const instructorCourses = courses.filter(course => course.instructor === instructorName);

    // 3. If no courses are found for this instructor, show an error
    if (instructorCourses.length === 0) {
        mainContainer.innerHTML = '<h1>Instructor Not Found</h1><p>Sorry, we could not find an instructor with that name. Please <a href="index.html">return to the catalog</a>.</p>';
        document.title = 'Instructor Not Found | Coursera Clone';
        return;
    }

    // 4. Update the page title
    document.title = `${instructorName} | Coursera Clone`;

    // 5. Get the instructor's bio and image from the first course we found.
    // This assumes an instructor's bio and image are the same across all their courses.
    const instructorBio = instructorCourses[0].instructorBio;
    const instructorImage = instructorCourses[0].instructorImage;

    // 6. Build the HTML for the list of courses
    const courseListHTML = instructorCourses.map(course => `
        <li>
            <a href="course.html?id=${course.id}">${course.title}</a>
        </li>
    `).join('');

    // 7. Build the final page HTML, now including the instructor image
    const pageHTML = `
        <section class="instructor-profile">
            <img src="${instructorImage}" alt="Profile picture of ${instructorName}" class="instructor-avatar">
            
            <h1>${instructorName}</h1>
            <p class="instructor-bio">${instructorBio}</p>
        </section>

        <section class="instructor-courses">
            <h2>Courses by ${instructorName}</h2>
            <ul class="instructor-course-list">
                ${courseListHTML}
            </ul>
        </section>
    `;

    // 8. Inject the HTML into the container
    mainContainer.innerHTML = pageHTML;

});