// js/data.js (UPDATED with urgency message)

const courses = [
    // --- Courses from your "Most Popular Certificates" section ---
    {
        id: 101,
        title: 'Google Data Analytics',
        instructor: 'Google',
        instructorBio: 'Learn the foundations of data analytics with this certificate program from Google. You’ll learn to use tools like R, SQL, and Tableau to analyze data.',
        instructorImage: 'images/google.png',
        description: 'Get professional training in data analytics from the experts at Google.',
        category: 'data-science',
        difficulty: 'Beginner',
        price: 69.99,
        originalPrice: 89.99,
        discountUrgencyMessage: 'Discount ends in 2 days!', // Added for urgency
        hasFreeTrial: true,
        image: 'images/googledataanalyst.png',
        syllabus: ['Foundations: Data, Data, Everywhere', 'Ask Questions to Make Data-Driven Decisions', 'Prepare Data for Exploration', 'Analyze Data to Answer Questions'],
        reviews: [{ user: 'Heidi', rating: 5, comment: 'The best course to start a data analytics career.' }]
    },
    {
        id: 102,
        title: 'Google Project Management',
        instructor: 'Google',
        instructorBio: 'Gain in-demand skills in project management. This program is designed by Google and provides hands-on, practical experience that is critical for job success.',
        instructorImage: 'images/google.png', 
        description: 'Launch your career in project management with a certificate from Google.',
        category: 'business',
        difficulty: 'Beginner',
        price: 69.99,
        hasFreeTrial: true,
        image: 'images/googleproductmanage.png',
        syllabus: ['Foundations of Project Management', 'Project Initiation: Starting a Successful Project', 'Project Planning: Putting It All Together', 'Project Execution: Running the Project'],
        reviews: [{ user: 'Frank', rating: 5, comment: 'This course helped me land my first PM job!' }]
    },
    {
        id: 103,
        title: 'Meta Social Media Marketing',
        instructor: 'Meta',
        instructorBio: 'This course is taught by senior software engineers at Meta who specialize in building large-scale, high-performance web applications with modern JavaScript.',
        instructorImage: 'images/Meta_logo.png',
        description: 'Learn about social media marketing from the experts at Meta.',
        category: 'business',
        difficulty: 'Beginner',
        price: 59.99,
        image: 'images/googleItsupport.png', // You may want to change this image path
        syllabus: ['Intro to Social Media', 'Content Strategy', 'Advertising', 'Analytics'],
        reviews: []
    },
    {
        id: 104,
        title: 'IBM Data Science',
        instructor: 'IBM',
        instructorBio: 'Learn from the marketing masters at IBM. This course covers the strategic principles and practical tools used by one of the world\'s leading tech companies.',
        instructorImage: 'images/IBM_logo.png',
        description: 'Launch your career in the field of data science with IBM.',
        category: 'data-science',
        difficulty: 'Intermediate',
        price: 89.99,
        originalPrice: 119.99,
        discountUrgencyMessage: 'Sale price for the first 100 learners!', // Another example
        image: 'images/googleuiux.png', // You may want to change this image path
        syllabus: ['What is Data Science?', 'Tools for Data Science', 'Data Science Methodology', 'Databases and SQL'],
        reviews: []
    },

    // --- Courses from your "New on Coursera" section ---
    {
        id: 201,
        title: 'SAP Business Analyst',
        instructor: 'SAP',
        instructorBio: 'Learn directly from SAP, the market leader in enterprise application software.',
        instructorImage: 'images/SAP.png',
        description: 'Become a certified business analyst with official SAP training.',
        category: 'business',
        difficulty: 'Intermediate',
        price: 99.99,
        hasFreeTrial: true,
        image: 'images/degree1.png',
        syllabus: ['SAP Foundations', 'Business Process Modeling', 'Analytics with SAP', 'Final Project'],
        reviews: []
    },
    {
        id: 202,
        title: 'Microsoft AI Product Manager',
        instructor: 'Microsoft',
        instructorBio: 'Learn how to manage AI products and projects from the leaders at Microsoft.',
        instructorImage: 'images/Microsolft_logo.png',
        description: 'Gain the skills to lead the development of AI-powered products.',
        category: 'business',
        difficulty: 'Advanced',
        price: 129.99,
        image: 'images/degree2.png',
        syllabus: ['AI Fundamentals', 'Product Strategy for AI', 'Machine Learning Concepts', 'AI Ethics'],
        reviews: []
    },

    // --- Other courses from your design ---
    {
        id: 2,
        title: 'Advanced JavaScript',
        instructor: 'Meta',
        instructorBio: 'This course is taught by senior software engineers at Meta who specialize in building large-scale, high-performance web applications with modern JavaScript.',
        instructorImage: 'images/Meta_logo.png',
        description: 'Master advanced concepts in JavaScript for powerful web apps.',
        category: 'web-dev',
        difficulty: 'Intermediate',
        price: 79.99,
        hasFreeTrial: true,
        image: 'images/genai2.png',
        syllabus: ['Asynchronous JavaScript', 'Advanced DOM Manipulation', 'Design Patterns', 'Building a SPA'],
        reviews: [{ user: 'Charlie', rating: 5, comment: 'This course took my JS skills to the next level.' }]
    },
    {
        id: 5,
        title: 'IBM Cybersecurity Analyst',
        instructor: 'IBM',
        instructorBio: 'Learn the concepts of cybersecurity and gain the skills needed to become a cybersecurity analyst. This course is designed by cybersecurity experts at IBM.',
        instructorImage: 'images/IBM_logo.png',
        description: 'Prepare for a career in cybersecurity with this professional certificate.',
        category: 'web-dev', 
        difficulty: 'Intermediate',
        price: 89.99,
        image: 'images/degree4.png',
        syllabus: ['Intro to Cybersecurity Tools', 'Network Security', 'Database Vulnerabilities', 'Compliance Frameworks'],
        reviews: [{ user: 'Grace', rating: 5, comment: 'Very thorough and practical.' }]
    },
    {
        id: 7,
        title: 'AI For Everyone',
        instructor: 'DeepLearning.AI',
        instructorBio: 'Taught by Andrew Ng, AI For Everyone is a non-technical course that will help you understand AI technologies and spot opportunities to apply AI to problems in your own organization.',
        instructorImage: 'images/deeplearning.png',
        description: 'A non-technical introduction to artificial intelligence.',
        category: 'data-science',
        difficulty: 'Beginner',
        price: 29.99,
        image: 'images/Free3.png',
        syllabus: ['What is AI?', 'Building AI Projects', 'Building AI In Your Company', 'AI and Society'],
        reviews: [{ user: 'Ivan', rating: 5, comment: 'Perfect for managers and non-engineers.' }]
    },
    {
        id: 8,
        title: 'Machine Learning Specialization',
        instructor: 'Stanford University',
        instructorBio: 'This foundational program from Stanford and DeepLearning.AI teaches the fundamentals of machine learning and how to apply them in the real world.',
        instructorImage: 'images/stanford_logo1.png',
        description: 'Master the fundamentals of machine learning.',
        category: 'data-science',
        difficulty: 'Intermediate',
        price: 99.99,
        image: 'images/careerrole3.png',
        syllabus: ['Supervised Machine Learning', 'Advanced Learning Algorithms', 'Unsupervised Learning & Recommenders'],
        reviews: [{ user: 'Judy', rating: 5, comment: 'The classic ML course for a reason. Excellent content.' }]
    }
];