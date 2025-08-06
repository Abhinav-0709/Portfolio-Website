const hamburger = document.getElementById('hamburger');
const navLinks = document.getElementById('navLinks');

hamburger.addEventListener('click', () => {
    navLinks.classList.toggle('active');
});

// Show main content after intro
window.addEventListener('DOMContentLoaded', () => {
    setTimeout(() => {
        document.querySelector('.main-content').classList.add('show');
        document.querySelector('.main-content').classList.remove('hidden');
    }, 2000); // matches animation delay in CSS
});

//nav-link
const nav_Links = document.querySelectorAll('#navLinks a');

nav_Links.forEach(link => {
    link.addEventListener('click', () => {
        nav_Links.forEach(nav => nav.classList.remove('active'));
        link.classList.add('active');
    });
});

// typing effect

const texts = ["Developer", "Designer", "AI Enthusiast"];
let currentText = "";
let count = 0;
let index = 0;
let isDeleting = false;
const typedText = document.getElementById("typed-text");

function typeEffect() {
    const fullText = texts[count % texts.length];

    if (isDeleting) {
        currentText = fullText.substring(0, index--);
    } else {
        currentText = fullText.substring(0, index++);
    }

    typedText.textContent = currentText;

    let typingSpeed = isDeleting ? 50 : 100;

    if (!isDeleting && currentText === fullText) {
        // Pause before deleting
        typingSpeed = 1000;
        isDeleting = true;
    } else if (isDeleting && currentText === "") {
        // Pause before typing new word
        isDeleting = false;
        count++;
        typingSpeed = 800;
    }

    setTimeout(typeEffect, typingSpeed);
}

typeEffect();


// project section

const projectsData = [
    {
        title: "Campus-Copilot",
        description: "CampusCopilot is a smart AI assistant built for college students, helping them stay organizedand informed. It answers campus FAQs, sends reminders, recommends local spots, and even detect chai break moments. Designed to make student life smoother, smarter, and stress-free.",
        techStack: ["React", "Tailwind CSS", "TypeScript", "MySQL", "Vite"],
        features: [
            "Chatbot who tell you about every thing on campus info",
            "ERP System with many smart features",
            "Login System for Admin, Faculty and Student are present"
        ]
    },
    {
        title: "Spotify-Clone",
        description: "A Clone for the original UI/UX clone for spotify but with its music playing feature by using fecth API and hosting is locally from my pc .",
        techStack: ["HTML", "CSS", "Javascripts"],
        features: [
            "Fetching Api calling for songs",
            "Responsive for all the platforms ",
            "Running Locally form my pc"
        ]
    },
    {
        title: "Portfolio Website",
        description: "A modern personal portfolio webiste with mnay section about meself ,project and many more. Designed with using 3D model innovative and interactive for all user devices.",
        techStack: ["HTML", "CSS", "Javascripts", "3D Model"],
        features: [
            "Amazing Cursur Effect",
            "Responsive for every device",
            "A personal site for my self"
        ]
    },
    {
        title: "Valorant-Theme",
        description: "A fun little project based on valorant charactor rotating in a circular motion with its modern an interactive components and eye catching view for the user.",
        techStack: ["HTML", "CSS"],
        features: [
            "Circular Motion without using js",
            "Enjoyable Experience"
        ]
    },
];

let currentProject = 0;
let isUpdating = false;

const projectsScroll = document.getElementById('projectsScroll');
const projectCards = document.querySelectorAll('.project-card');

// Animation elements
const title = document.getElementById('projectTitle');
const description = document.getElementById('projectDescription');
const techStack = document.getElementById('techStack');
const features = document.getElementById('projectFeatures');

function updateProjectInfo(index) {
    if (isUpdating || index === currentProject || index < 0 || index >= projectsData.length) return;

    isUpdating = true;
    const project = projectsData[index];

    // Remove animation classes
    title.classList.remove('animate');
    description.classList.remove('animate');
    techStack.classList.remove('animate');
    features.classList.remove('animate');

    setTimeout(() => {
        // Update content
        title.textContent = project.title;
        description.textContent = project.description;

        // Update tech stack
        const techTags = document.getElementById('techTags');
        techTags.innerHTML = project.techStack.map(tech =>
            `<span class="tech-tag">${tech}</span>`
        ).join('');

        // Update features
        const featuresContainer = document.querySelector('#projectFeatures');
        featuresContainer.innerHTML = `
                    <div class="features-label">Key Features</div>
                    ${project.features.map(feature =>
            `<div class="feature-item">
                            <svg class="feature-icon" fill="currentColor" viewBox="0 0 20 20">
                                <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"></path>
                            </svg>
                            ${feature}
                        </div>`
        ).join('')}
                `;

        // Add animation classes back
        setTimeout(() => {
            title.classList.add('animate');
            description.classList.add('animate');
            techStack.classList.add('animate');
            features.classList.add('animate');

            isUpdating = false;
        }, 50);
    }, 300);

    currentProject = index;
}

function checkScrollPosition() {
    const containerRect = projectsScroll.getBoundingClientRect();
    const containerTop = containerRect.top;
    const containerHeight = containerRect.height;
    const containerCenter = containerTop + containerHeight / 2;

    let activeIndex = 0;
    let minDistance = Infinity;

    projectCards.forEach((card, index) => {
        const cardRect = card.getBoundingClientRect();
        const cardTop = cardRect.top;
        const cardBottom = cardRect.bottom;
        const cardCenter = cardTop + cardRect.height / 2;

        // Check if card is in viewport
        const isInViewport = cardTop < containerTop + containerHeight && cardBottom > containerTop;

        if (isInViewport) {
            card.classList.add('active');

            // Calculate distance from container center
            const distance = Math.abs(cardCenter - containerCenter);
            if (distance < minDistance) {
                minDistance = distance;
                activeIndex = index;
            }
        } else {
            card.classList.remove('active');
        }
    });

    // Update project info if we have a new active project
    if (activeIndex !== currentProject) {
        updateProjectInfo(activeIndex);
    }
}

// Initialize
document.addEventListener('DOMContentLoaded', () => {
    // Set first project content immediately
    updateProjectInfo(0);

    // Set initial animations
    setTimeout(() => {
        title.classList.add('animate');
        description.classList.add('animate');
        techStack.classList.add('animate');
        features.classList.add('animate');
    }, 100);

    // Set first card as active and trigger initial check
    projectCards[0].classList.add('active');

    // Initial check after a short delay
    setTimeout(() => {
        checkScrollPosition();
    }, 200);
});

// Scroll event listener
projectsScroll.addEventListener('scroll', checkScrollPosition);

// Smooth scroll behavior
let ticking = false;
projectsScroll.addEventListener('scroll', () => {
    if (!ticking) {
        requestAnimationFrame(() => {
            checkScrollPosition();
            ticking = false;
        });
        ticking = true;
    }
});


//contact me 

function openModal() {
    const modal = document.getElementById('modalOverlay');
    modal.classList.add('active');
    document.body.style.overflow = 'hidden';
}

function closeModal() {
    const modal = document.getElementById('modalOverlay');
    modal.classList.remove('active');
    document.body.style.overflow = 'auto';
}

// Close modal when clicking outside
document.getElementById('modalOverlay').addEventListener('click', function (e) {
    if (e.target === this) {
        closeModal();
    }
});

// Close modal with Escape key
document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape') {
        closeModal();
    }
});

// Form submission
document.getElementById('contactForm').addEventListener('submit', function (e) {
    e.preventDefault();

    // Get form data
    const formData = new FormData(this);
    const data = {
        name: formData.get('name'),
        email: formData.get('email'),
        subject: formData.get('subject'),
        message: formData.get('message')
    };

    // Simulate form submission
    const submitBtn = this.querySelector('.submit-btn');
    const originalText = submitBtn.textContent;

    submitBtn.textContent = 'Sending...';
    submitBtn.disabled = true;

    setTimeout(() => {
        alert('Thank you for your message! I\'ll get back to you soon.');
        this.reset();
        closeModal();
        submitBtn.textContent = originalText;
        submitBtn.disabled = false;
    }, 2000);
});

// Add some interactive particles
function createParticle() {
    const particle = document.createElement('div');
    particle.style.position = 'absolute';
    particle.style.width = '2px';
    particle.style.height = '2px';
    particle.style.background = '#3b82f6';
    particle.style.borderRadius = '50%';
    particle.style.pointerEvents = 'none';
    particle.style.left = Math.random() * window.innerWidth + 'px';
    particle.style.top = window.innerHeight + 'px';
    particle.style.opacity = '0.5';
    particle.style.animation = 'particleFloat 15s linear infinite';

    document.body.appendChild(particle);

    setTimeout(() => {
        particle.remove();
    }, 15000);
}

// Add CSS for particle animation
const style = document.createElement('style');
style.textContent = `
            @keyframes particleFloat {
                to {
                    transform: translateY(-100vh) translateX(50px);
                    opacity: 0;
                }
            }
        `;
document.head.appendChild(style);

// Create particles periodically
setInterval(createParticle, 3000);

// Add smooth scrolling behavior
document.documentElement.style.scrollBehavior = 'smooth';