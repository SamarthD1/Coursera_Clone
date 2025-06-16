

// Wait for the DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    // Initialize slider functionality
    initSlider();
    
    // Initialize form validation
    initFormValidation();
    
    // Add smooth scrolling for anchor links
    initSmoothScroll();
    
    // Initialize dropdown menus
    initDropdowns();
    
    // Initialize mobile menu
    initMobileMenu();
    
    // Add scroll animations
    initScrollAnimations();
    
    // Initialize sticky header
    initStickyHeader();
});

/**
 * Initialize the academy cards slider
 */
function initSlider() {
    const sliderDots = document.querySelectorAll('.slider-dot');
    const sliderCards = document.querySelector('.academies-cards');
    
    if (!sliderDots.length || !sliderCards) return;
    
    sliderDots.forEach((dot, index) => {
        dot.addEventListener('click', () => {
            // Calculate the scroll position based on the card width and gap
            const cardWidth = document.querySelector('.academy-card').offsetWidth;
            const cardGap = 20; // This should match the gap in CSS
            const scrollPosition = index * (cardWidth + cardGap);
            
            // Scroll to the position
            sliderCards.scrollTo({
                left: scrollPosition,
                behavior: 'smooth'
            });
            
            // Update active dot
            sliderDots.forEach(d => d.classList.remove('active'));
            dot.classList.add('active');
        });
    });
    
    // Auto-scroll the slider every 5 seconds
    let currentSlide = 0;
    const autoSlideInterval = setInterval(() => {
        currentSlide = (currentSlide + 1) % sliderDots.length;
        sliderDots[currentSlide].click();
    }, 5000);
    
    // Pause auto-scroll when user interacts with the slider
    sliderCards.addEventListener('mouseenter', () => {
        clearInterval(autoSlideInterval);
    });
    
    // Resume auto-scroll when user leaves the slider
    sliderCards.addEventListener('mouseleave', () => {
        autoSlideInterval = setInterval(() => {
            currentSlide = (currentSlide + 1) % sliderDots.length;
            sliderDots[currentSlide].click();
        }, 5000);
    });
    
    // Update active dot when user scrolls manually
    sliderCards.addEventListener('scroll', () => {
        const scrollPosition = sliderCards.scrollLeft;
        const cardWidth = document.querySelector('.academy-card').offsetWidth;
        const cardGap = 20;
        const currentIndex = Math.round(scrollPosition / (cardWidth + cardGap));
        
        sliderDots.forEach((dot, index) => {
            if (index === currentIndex) {
                dot.classList.add('active');
            } else {
                dot.classList.remove('active');
            }
        });
    });
}

/**
 * Initialize form validation with real-time feedback
 */
function initFormValidation() {
    const contactForm = document.getElementById('contact-form');
    
    if (!contactForm) return;
    
    // Add input event listeners for real-time validation
    const formInputs = contactForm.querySelectorAll('input, select');
    formInputs.forEach(input => {
        input.addEventListener('input', function() {
            validateInput(this);
        });
        
        input.addEventListener('blur', function() {
            validateInput(this, true);
        });
    });
    
    // Form submission handler
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Validate all inputs
        let isValid = true;
        formInputs.forEach(input => {
            if (!validateInput(input, true)) {
                isValid = false;
            }
        });
        
        if (isValid) {
            // In a real implementation, this would submit the form data to a server
            // For this clone, we'll just show a success message
            const formContainer = document.querySelector('.form-container');
            formContainer.innerHTML = `
                <div class="form-success">
                    <h3>Thank you for your interest!</h3>
                    <p>A Coursera for Business representative will contact you soon to discuss how we can help your organization.</p>
                    <p>In the meantime, you can explore more about our solutions and offerings.</p>
                </div>
            `;
        }
    });
}

/**
 * Validate a single form input
 * @param {HTMLElement} input - The input element to validate
 * @param {boolean} showError - Whether to show error messages
 * @returns {boolean} - Whether the input is valid
 */
function validateInput(input, showError = false) {
    const value = input.value.trim();
    const id = input.id;
    let isValid = true;
    let errorMessage = '';
    
    // Remove any existing error message
    const existingError = input.parentNode.querySelector('.error-message');
    if (existingError) {
        existingError.remove();
    }
    
    // Reset input style
    input.classList.remove('error');
    
    // Validate based on input type
    switch(id) {
        case 'first-name':
        case 'last-name':
            if (!value) {
                isValid = false;
                errorMessage = 'This field is required';
            }
            break;
            
        case 'work-email':
            if (!value) {
                isValid = false;
                errorMessage = 'Email is required';
            } else if (!isValidEmail(value)) {
                isValid = false;
                errorMessage = 'Please enter a valid work email';
            }
            break;
            
        case 'phone':
            if (!value) {
                isValid = false;
                errorMessage = 'Phone number is required';
            } else if (!isValidPhone(value)) {
                isValid = false;
                errorMessage = 'Please enter a valid phone number';
            }
            break;
            
        case 'company-name':
            if (!value) {
                isValid = false;
                errorMessage = 'Company name is required';
            }
            break;
            
        case 'org-type':
        case 'company-size':
        case 'country':
            if (!value || value === '') {
                isValid = false;
                errorMessage = 'Please select an option';
            }
            break;
    }
    
    // Show error if needed
    if (!isValid && showError) {
        input.classList.add('error');
        const errorElement = document.createElement('div');
        errorElement.className = 'error-message';
        errorElement.textContent = errorMessage;
        input.parentNode.appendChild(errorElement);
    }
    
    return isValid;
}

/**
 * Validate email format
 * @param {string} email - The email to validate
 * @returns {boolean} - Whether the email is valid
 */
function isValidEmail(email) {
    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
}

/**
 * Validate phone number format
 * @param {string} phone - The phone number to validate
 * @returns {boolean} - Whether the phone number is valid
 */
function isValidPhone(phone) {
    // Simple validation for international phone numbers
    // In a real implementation, this would be more sophisticated
    return phone.length >= 10 && /^[+0-9\s()-]+$/.test(phone);
}

/**
 * Initialize smooth scrolling for anchor links
 */
function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (!targetElement) return;
            
            e.preventDefault();
            
            window.scrollTo({
                top: targetElement.offsetTop - 100, // Offset for fixed header
                behavior: 'smooth'
            });
        });
    });
}

/**
 * Initialize dropdown menus for navigation
 */
function initDropdowns() {
    const navItems = document.querySelectorAll('.primary-nav li');
    
    navItems.forEach(item => {
        // Create dropdown content for each nav item
        const link = item.querySelector('a');
        const linkText = link.textContent;
        
        // Only create dropdowns for specific nav items
        if (['Why Coursera', 'Solutions', 'Resources'].includes(linkText)) {
            const dropdown = document.createElement('div');
            dropdown.className = 'dropdown-menu';
            
            // Add different content based on the nav item
            if (linkText === 'Why Coursera') {
                dropdown.innerHTML = `
                    <div class="dropdown-column">
                        <h4>Why Choose Coursera</h4>
                        <ul>
                            <li><a href="#">World-Class Content</a></li>
                            <li><a href="#">Skills Development</a></li>
                            <li><a href="#">Learning Engagement</a></li>
                            <li><a href="#">Implementation Support</a></li>
                            <li><a href="#">Customer Success</a></li>
                        </ul>
                    </div>
                    <div class="dropdown-column">
                        <h4>Success Stories</h4>
                        <ul>
                            <li><a href="#">Case Studies</a></li>
                            <li><a href="#">Testimonials</a></li>
                            <li><a href="#">ROI Calculator</a></li>
                        </ul>
                    </div>
                `;
            } else if (linkText === 'Solutions') {
                dropdown.innerHTML = `
                    <div class="dropdown-column">
                        <h4>By Need</h4>
                        <ul>
                            <li><a href="#">Upskilling & Reskilling</a></li>
                            <li><a href="#">Digital Transformation</a></li>
                            <li><a href="#">Leadership Development</a></li>
                            <li><a href="#">Technical Skills</a></li>
                        </ul>
                    </div>
                    <div class="dropdown-column">
                        <h4>By Role</h4>
                        <ul>
                            <li><a href="#">HR & L&D</a></li>
                            <li><a href="#">IT Leaders</a></li>
                            <li><a href="#">Engineering Leaders</a></li>
                            <li><a href="#">Data Leaders</a></li>
                        </ul>
                    </div>
                    <div class="dropdown-column">
                        <h4>By Industry</h4>
                        <ul>
                            <li><a href="#">Financial Services</a></li>
                            <li><a href="#">Technology</a></li>
                            <li><a href="#">Healthcare</a></li>
                            <li><a href="#">Manufacturing</a></li>
                        </ul>
                    </div>
                `;
            } else if (linkText === 'Resources') {
                dropdown.innerHTML = `
                    <div class="dropdown-column">
                        <h4>Insights</h4>
                        <ul>
                            <li><a href="#">Blog</a></li>
                            <li><a href="#">Webinars</a></li>
                            <li><a href="#">Reports</a></li>
                            <li><a href="#">eBooks</a></li>
                        </ul>
                    </div>
                    <div class="dropdown-column">
                        <h4>Help & Support</h4>
                        <ul>
                            <li><a href="#">FAQs</a></li>
                            <li><a href="#">Contact Support</a></li>
                            <li><a href="#">Implementation Guide</a></li>
                        </ul>
                    </div>
                `;
            }
            
            item.appendChild(dropdown);
            
            // Add event listeners for hover
            item.addEventListener('mouseenter', function() {
                dropdown.style.display = 'flex';
                setTimeout(() => {
                    dropdown.style.opacity = '1';
                    dropdown.style.transform = 'translateY(0)';
                }, 10);
            });
            
            item.addEventListener('mouseleave', function() {
                dropdown.style.opacity = '0';
                dropdown.style.transform = 'translateY(-10px)';
                setTimeout(() => {
                    dropdown.style.display = 'none';
                }, 300);
            });
        }
    });
    
    // Add CSS for dropdowns
    const style = document.createElement('style');
    style.textContent = `
        .primary-nav li {
            position: relative;
        }
        
        .dropdown-menu {
            position: absolute;
            top: 100%;
            left: -20px;
            background-color: white;
            box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
            border-radius: 4px;
            padding: 20px;
            display: none;
            opacity: 0;
            transform: translateY(-10px);
            transition: opacity 0.3s ease, transform 0.3s ease;
            z-index: 1000;
            min-width: 600px;
            flex-wrap: wrap;
        }
        
        .dropdown-column {
            flex: 1;
            min-width: 180px;
            padding: 0 15px;
        }
        
        .dropdown-column h4 {
            font-size: 16px;
            margin-bottom: 12px;
            color: var(--text-dark);
        }
        
        .dropdown-column ul li {
            margin-bottom: 8px;
        }
        
        .dropdown-column ul li a {
            color: var(--text-medium);
            font-size: 14px;
            font-weight: normal;
        }
        
        .dropdown-column ul li a:hover {
            color: var(--primary-blue);
        }
        
        @media (max-width: 768px) {
            .dropdown-menu {
                position: static;
                box-shadow: none;
                padding: 0 0 0 20px;
                min-width: auto;
                display: none;
                opacity: 1;
                transform: none;
            }
            
            .dropdown-column {
                padding: 0;
            }
        }
    `;
    document.head.appendChild(style);
}

/**
 * Initialize mobile menu functionality
 */
function initMobileMenu() {
    // Create mobile menu button
    const header = document.querySelector('.main-nav .container');
    const mobileMenuBtn = document.createElement('button');
    mobileMenuBtn.className = 'mobile-menu-btn';
    mobileMenuBtn.innerHTML = `
        <span></span>
        <span></span>
        <span></span>
    `;
    header.insertBefore(mobileMenuBtn, header.firstChild);
    
    // Add CSS for mobile menu
    const style = document.createElement('style');
    style.textContent = `
        .mobile-menu-btn {
            display: none;
            background: none;
            border: none;
            cursor: pointer;
            padding: 10px;
        }
        
        .mobile-menu-btn span {
            display: block;
            width: 25px;
            height: 3px;
            background-color: var(--text-dark);
            margin: 5px 0;
            transition: transform 0.3s ease, opacity 0.3s ease;
        }
        
        .mobile-menu-btn.active span:nth-child(1) {
            transform: translateY(8px) rotate(45deg);
        }
        
        .mobile-menu-btn.active span:nth-child(2) {
            opacity: 0;
        }
        
        .mobile-menu-btn.active span:nth-child(3) {
            transform: translateY(-8px) rotate(-45deg);
        }
        
        @media (max-width: 768px) {
            .mobile-menu-btn {
                display: block;
            }
            
            .primary-nav {
                position: absolute;
                top: 100%;
                left: 0;
                right: 0;
                background-color: white;
                box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
                padding: 20px;
                display: none;
            }
            
            .primary-nav.mobile-open {
                display: block;
            }
            
            .primary-nav ul {
                flex-direction: column;
                gap: 16px;
            }
            
            .logo {
                margin: 0 auto;
            }
            
            .cta-button {
                margin-left: auto;
            }
        }
    `;
    document.head.appendChild(style);
    
    // Toggle mobile menu
    mobileMenuBtn.addEventListener('click', function() {
        this.classList.toggle('active');
        document.querySelector('.primary-nav').classList.toggle('mobile-open');
    });
    
    // Close mobile menu when clicking outside
    document.addEventListener('click', function(e) {
        if (!e.target.closest('.mobile-menu-btn') && !e.target.closest('.primary-nav')) {
            mobileMenuBtn.classList.remove('active');
            document.querySelector('.primary-nav').classList.remove('mobile-open');
        }
    });
}

/**
 * Initialize scroll animations
 */
function initScrollAnimations() {
    // Add CSS for animations
    const style = document.createElement('style');
    style.textContent = `
        .fade-in {
            opacity: 0;
            transform: translateY(20px);
            transition: opacity 0.6s ease, transform 0.6s ease;
        }
        
        .fade-in.visible {
            opacity: 1;
            transform: translateY(0);
        }
    `;
    document.head.appendChild(style);
    
    // Add fade-in class to elements
    const animatedElements = [
        ...document.querySelectorAll('.benefits-card'),
        ...document.querySelectorAll('.academy-card'),
        ...document.querySelectorAll('.content-partners-info > div'),
        document.querySelector('.hero-content'),
        document.querySelector('.hero-image'),
        document.querySelector('.companies h2'),
        document.querySelector('.company-logos'),
        document.querySelector('.benefits-intro'),
        document.querySelector('.form-content'),
        document.querySelector('.form-container')
    ].filter(el => el !== null);
    
    animatedElements.forEach(el => {
        el.classList.add('fade-in');
    });
    
    // Check if elements are in viewport and add visible class
    function checkVisibility() {
        animatedElements.forEach(el => {
            const rect = el.getBoundingClientRect();
            const windowHeight = window.innerHeight || document.documentElement.clientHeight;
            
            if (rect.top <= windowHeight * 0.8) {
                el.classList.add('visible');
            }
        });
    }
    
    // Initial check
    checkVisibility();
    
    // Check on scroll
    window.addEventListener('scroll', checkVisibility);
}

/**
 * Initialize sticky header
 */
function initStickyHeader() {
    const header = document.querySelector('.header');
    const headerHeight = header.offsetHeight;
    let isSticky = false;
    
    // Add CSS for sticky header
    const style = document.createElement('style');
    style.textContent = `
        .header.sticky {
            position: fixed;
            top: 0;
            left: 0;
            right: 0;
            animation: slideDown 0.3s ease;
        }
        
        @keyframes slideDown {
            from {
                transform: translateY(-100%);
            }
            to {
                transform: translateY(0);
            }
        }
    `;
    document.head.appendChild(style);
    
    // Add padding to body when header becomes sticky
    function updateHeaderState() {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        
        if (scrollTop > headerHeight && !isSticky) {
            header.classList.add('sticky');
            document.body.style.paddingTop = headerHeight + 'px';
            isSticky = true;
        } else if (scrollTop <= headerHeight && isSticky) {
            header.classList.remove('sticky');
            document.body.style.paddingTop = '0';
            isSticky = false;
        }
    }
    
    // Initial check
    updateHeaderState();
    
    // Check on scroll
    window.addEventListener('scroll', updateHeaderState);
}

