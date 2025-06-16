document.addEventListener('DOMContentLoaded', function () {
    
    // --- Tabs Logic ---
    const tabButtons = document.querySelectorAll('.tab-btn');
    const tabContents = document.querySelectorAll('.tab-content');

    tabButtons.forEach(button => {
        button.addEventListener('click', () => {
            // Remove active class from all buttons
            tabButtons.forEach(btn => btn.classList.remove('active'));
            // Add active class to the clicked button
            button.classList.add('active');

            const targetTab = button.getAttribute('data-tab');

            // Hide all tab contents
            tabContents.forEach(content => {
                content.style.display = 'none';
            });

            // Show the target tab content
            document.getElementById(targetTab).style.display = 'block';
        });
    });

    // --- Slider Logic ---
    function initializeSlider(sliderId) {
        const slider = document.getElementById(sliderId);
        if (!slider) return;

        const track = slider.querySelector('.slider-track');
        const prevBtn = slider.querySelector('.prev');
        const nextBtn = slider.querySelector('.next');
        const slides = Array.from(track.children);
        
        let slideWidth = slides[0].offsetWidth;
        const gap = 16; // The gap from CSS
        let currentIndex = 0;

        // Function to update slider position
        const updateSliderPosition = () => {
            track.style.transform = `translateX(-${currentIndex * (slideWidth + gap)}px)`;
            
            // Update button states
            prevBtn.disabled = currentIndex === 0;
            const visibleSlides = Math.floor(slider.offsetWidth / (slideWidth + gap));
            nextBtn.disabled = currentIndex >= slides.length - visibleSlides;
        };

        // Event listeners for buttons
        nextBtn.addEventListener('click', () => {
            const visibleSlides = Math.floor(slider.offsetWidth / (slideWidth + gap));
            if (currentIndex < slides.length - visibleSlides) {
                currentIndex++;
                updateSliderPosition();
            }
        });

        prevBtn.addEventListener('click', () => {
            if (currentIndex > 0) {
                currentIndex--;
                updateSliderPosition();
            }
        });
        
        // Recalculate on window resize
        window.addEventListener('resize', () => {
            slideWidth = slides[0].offsetWidth;
            updateSliderPosition();
        });

        // Initial setup
        updateSliderPosition();
    }

    // Initialize both sliders
    initializeSlider('slider1');
    initializeSlider('slider2');

});

// --- Career Resources Tabs Logic ---
// This code is self-contained and will not conflict with other scripts.
const resourceTabButtons = document.querySelectorAll('.resource-tab-btn');
const resourceTabContents = document.querySelectorAll('.resource-tab-content');

resourceTabButtons.forEach(button => {
    button.addEventListener('click', () => {
        // Update button active state
        resourceTabButtons.forEach(btn => btn.classList.remove('active'));
        button.classList.add('active');

        const targetId = button.dataset.tab + '-content';

        // Show/hide content panes
        resourceTabContents.forEach(content => {
            if (content.id === targetId) {
                content.style.display = 'block';
            } else {
                content.style.display = 'none';
            }
        });
    });
});