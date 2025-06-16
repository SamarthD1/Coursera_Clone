
document.addEventListener('DOMContentLoaded', function() {
    // SECTION 1: EXISTING PAGE INTERACTIVITY 

    // Banner close functionality
    const banner = document.querySelector('.banner');
    const closeBannerBtn = document.querySelector('.close-banner');
    if (closeBannerBtn && banner) {
        closeBannerBtn.addEventListener('click', () => banner.style.display = 'none');
    }

    // Explore dropdown functionality
    const exploreButton = document.querySelector('.explore-button');
    const exploreDropdown = document.querySelector('.explore-dropdown');
    if (exploreButton && exploreDropdown) {
        exploreButton.addEventListener('click', function(e) {
            e.preventDefault();
            exploreDropdown.classList.toggle('active');
            this.classList.toggle('active');
        });
        document.addEventListener('click', function(e) {
            if (!exploreButton.contains(e.target) && !exploreDropdown.contains(e.target)) {
                exploreDropdown.classList.remove('active');
                exploreButton.classList.remove('active');
            }
        });
        exploreDropdown.addEventListener('click', e => e.stopPropagation());
    }

    // Career dropdown functionality
    const careerButton = document.getElementById("careerDropdownButton");
    const careerDropdown = document.getElementById("career-div-dropdownContent");
    if (careerButton && careerDropdown) {
        careerButton.addEventListener("click", function (event) {
            careerDropdown.classList.toggle("show");
            event.stopPropagation();
        });
        window.addEventListener("click", function (event) {
            if (!careerButton.contains(event.target)) {
                careerDropdown.classList.remove("show");
            }
        });
    }

    // --- Mobile Navigation Toggle ---
    const mobileMenuButton = document.querySelector('.mobile-menu-toggle');
    const topsecNav = document.querySelector('.topsec-nav'); // The container for the nav

    if (mobileMenuButton && topsecNav) {
        mobileMenuButton.addEventListener('click', function() {
            // We add a class to the nav container, not the button itself
            topsecNav.classList.toggle('nav-active');
        });
    }

    // SECTION 2: DYNAMIC COURSE CATALOG 

    // Make sure the `courses` array from data.js is available
    if (typeof courses === 'undefined') {
        console.error('Error: The courses data file (data.js) is not loaded or is empty.');
        return; // Stop execution if there's no data
    }

    const courseGrid = document.getElementById('course-grid');
    const filterContainer = document.getElementById('filters');
    const searchInput = document.getElementById('course-search');

    /**
     * Creates the HTML string for a single course card.
     * Uses the correct property names from your data.js file.
     */
    function createCourseCard(course) {
        const offerTag = course.originalPrice ? '<div class="special-offer-tag">Special Offer</div>' : '';

        return `
            <div class="crole-card">
                <div class="image-container">
                    <img src="${course.image}" alt="${course.title}">
                    ${offerTag}
                </div>
                <div class="clogo">
                    <img src="${course.instructorImage}" alt="${course.instructor} Logo">
                    <p>${course.instructor}</p>
                </div>
                <p><strong>${course.title}</strong></p>
                <p>Difficulty: ${course.difficulty}</p>
                <a href="course.html?id=${course.id}" class="view-details-btn" style="margin-top: auto;">View Details</a>
            </div>
        `;
    }

    /**
     * Renders an array of course objects into the course grid.
     */
    function displayCourses(courseArray) {
        if (!courseGrid) return;
        courseGrid.innerHTML = courseArray.map(course => createCourseCard(course)).join('');
    }

    // --- SEARCH AND FILTER LOGIC ---

    // 1. Filtering Logic
    if (filterContainer) {
        filterContainer.addEventListener('click', function(e) {
            if (e.target.tagName === 'BUTTON') {
                // Update active button style
                document.querySelector('#filters .active').classList.remove('active');
                e.target.classList.add('active');

                const category = e.target.dataset.category;

                if (category === 'all') {
                    displayCourses(courses); // Show all courses
                } else {
                    const filteredCourses = courses.filter(course => course.category === category);
                    displayCourses(filteredCourses);
                }
            }
        });
    }

    // 2. Search Logic
    if (searchInput) {
        searchInput.addEventListener('keyup', function(e) {
            const query = e.target.value.toLowerCase().trim();
            const filteredCourses = courses.filter(course => {
                return (
                    course.title.toLowerCase().includes(query) ||
                    course.instructor.toLowerCase().includes(query) ||
                    course.description.toLowerCase().includes(query)
                );
            });
            displayCourses(filteredCourses);
        });
    }

    // --- INITIAL LOAD ---
    // Display all courses when the page first loads.
    displayCourses(courses);


    // SECTION 3: CHATBOT
    // -------------------------------------------------------------------------

    const chatToggleButton = document.getElementById('chat-toggle-button');
    const chatCloseButton = document.getElementById('chat-close-button');
    const chatContainer = document.getElementById('chat-container');
    const chatMessages = document.getElementById('chat-messages');
    const chatInput = document.getElementById('chat-input');
    const chatSendButton = document.getElementById('chat-send-button');

    const toggleChat = () => {
        if (chatContainer) chatContainer.classList.toggle('hidden');
    };

    if (chatToggleButton && chatCloseButton) {
        chatToggleButton.addEventListener('click', toggleChat);
        chatCloseButton.addEventListener('click', toggleChat);
    }

    // Adds a message to the chat window (supports HTML content)
    function addMessage(message, sender) {
        if (!chatMessages) return;
        const messageElement = document.createElement('div');
        messageElement.classList.add(sender === 'user' ? 'user-message' : 'bot-message');
        const p = document.createElement('p');
        p.innerHTML = message;
        messageElement.appendChild(p);
        chatMessages.appendChild(messageElement);
        chatMessages.scrollTop = chatMessages.scrollHeight;
    }

    // The "brain" of the bot - provides responses based on keywords
    function getBotResponse(userInput) {
        const text = userInput.toLowerCase().trim();
        // Greeting Keywords
        if (text.includes('hello') || text.includes('hi')) {
            return "Hello there! Ask me about 'courses', 'pricing', 'Coursera Plus', or 'financial aid'.";
        }
        // Pricing & Coursera Plus Keywords
        else if (text.includes('pricing') || text.includes('cost') || text.includes('price')) {
            return `We have many pricing options! Single courses can be purchased, or you can subscribe to <strong>Coursera Plus</strong> for unlimited access to over 7,000 courses. <a href="plus.html" target="_blank">Click here to learn more about Plus!</a>`;
        } else if (text.includes('plus') || text.includes('subscription')) {
            return `<strong>Coursera Plus</strong> is a subscription plan that gives you unlimited access to a huge portion of our catalog. You can find out more on the <a href="plus.html" target="_blank">Coursera Plus page</a>.`;
        }
        // Course & Certificate Keywords
        else if (text.includes('course') || text.includes('certificate') || text.includes('degree')) {
            return `You can explore our full catalog using the search bar on the main page. Or, if you have a topic in mind, just tell me! For example, try asking about 'Data Science' or 'Business'.`;
        } else if (text.includes('data science')) {
            return `We have excellent Data Science courses from Google, IBM, and more. Check out the <a href="#dynamic-catalog">full catalog section</a> to filter by the Data Science category!`;
        } else if (text.includes('business')) {
            return `Our Business courses are top-notch, with programs from Meta, SAP, and leading universities. You can filter for them in the <a href="#dynamic-catalog">main catalog</a>.`;
        }
        // Financial Aid Keywords
        else if (text.includes('financial aid') || text.includes('free')) {
            return `Yes, financial aid is available for learners who cannot afford the course fee. <a href="financial-aid.html" target="_blank">Learn more about how to apply.</a>`;
        }
        // Login & Signup Keywords
        else if (text.includes('login') || text.includes('sign in')) {
            return `You can log in to your account by <a href="login.html">clicking here</a>.`;
        } else if (text.includes('signup') || text.includes('join')) {
            return `Joining is free! <a href="signup1.html">Click here to create your account</a> and start learning.`;
        }
        // Politeness Keywords
        else if (text.includes('thank you') || text.includes('thanks')) {
            return "You're very welcome! Let me know if there's anything else I can help with.";
        }
        // Default Fallback Response
        else {
            return "I'm sorry, I don't have information on that. I can help with topics like 'pricing', 'Coursera Plus', and 'financial aid'.";
        }
    }

    // Handles the process of sending a message
    function handleSendMessage() {
        if (!chatInput) return;
        const userInput = chatInput.value.trim();
        if (userInput === '') return;

        addMessage(userInput, 'user');
        chatInput.value = '';

        setTimeout(() => {
            const botResponse = getBotResponse(userInput);
            addMessage(botResponse, 'bot');
        }, 500); // 500ms delay to simulate "thinking"
    }

    if (chatSendButton && chatInput) {
        chatSendButton.addEventListener('click', handleSendMessage);
        chatInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') handleSendMessage();
        });
    }


// NOTEPAD LOGIC START 

const notepadToggleButton = document.getElementById('notepad-toggle-button');
const notepadCloseButton = document.getElementById('notepad-close-button');
const notepadContainer = document.getElementById('notepad-container');
const notepadTextarea = document.getElementById('notepad-textarea');
const notepadStatus = document.getElementById('notepad-status');
let saveTimer; // Timer to provide user feedback on saving

// Function to toggle notepad visibility
const toggleNotepad = () => {
    if (notepadContainer) notepadContainer.classList.toggle('hidden');
};

if (notepadToggleButton && notepadCloseButton) {
    notepadToggleButton.addEventListener('click', toggleNotepad);
    notepadCloseButton.addEventListener('click', toggleNotepad);
}

// --- Save and Load Notes using localStorage ---
if (notepadTextarea) {
    // 1. Load existing notes when the page starts
    const savedNotes = localStorage.getItem('courseraUserNotes');
    if (savedNotes) {
        notepadTextarea.value = savedNotes;
    }

    // 2. Save notes as the user types
    notepadTextarea.addEventListener('keyup', () => {
        // Get the current notes
        const currentNotes = notepadTextarea.value;
        // Save them to localStorage
        localStorage.setItem('courseraUserNotes', currentNotes);

        // Provide visual feedback to the user
        if (notepadStatus) {
            clearTimeout(saveTimer); // Reset the timer
            notepadStatus.textContent = 'Saving...';
            
            // After a moment, confirm that notes are saved
            saveTimer = setTimeout(() => {
                notepadStatus.textContent = 'Notes saved automatically.';
            }, 1000); // 1 second delay
        }
    });
}
// NOTEPAD LOGIC END 
}); // End of DOMContentLoaded

