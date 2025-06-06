// Initialize map dots for Scene 1
function initMapDots() {
    const scene1 = document.getElementById('scene-1');
    const width = scene1.offsetWidth;
    const height = scene1.offsetHeight;
    
    for (let i = 0; i < 20; i++) {
        const dot = document.createElement('div');
        dot.className = 'map-dot';
        dot.style.left = `${Math.random() * width}px`;
        dot.style.top = `${100 + Math.random() * (height - 200)}px`;
        scene1.appendChild(dot);
        
        // Animate dots in with delays
        setTimeout(() => {
            dot.style.opacity = '0.8';
            dot.style.transform = 'scale(1)';
        }, Math.random() * 1000 + 500);
        
        // Make dots pulse continuously
        setInterval(() => {
            dot.style.boxShadow = `0 0 0 ${Math.random() * 8}px rgba(239, 68, 68, 0.2)`;
        }, Math.random() * 2000 + 1000);
    }
}

// Check if elements are in viewport for animations
function checkVisibility() {
    const sections = document.querySelectorAll('.section');
    const windowHeight = window.innerHeight;
    const windowTop = window.scrollY;
    const windowBottom = windowTop + windowHeight;
    
    sections.forEach((section, index) => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.offsetHeight;
        const sectionBottom = sectionTop + sectionHeight;
        
        // Update navigation dots
        const navDots = document.querySelectorAll('.nav-dot');
        if (windowTop + windowHeight/2 >= sectionTop && windowTop + windowHeight/2 < sectionBottom) {
            navDots[index].classList.add('bg-emerald-500', 'border-emerald-500');
        } else {
            navDots[index].classList.remove('bg-emerald-500', 'border-emerald-500');
        }
        
        // Animate elements when section is 50% in view
        if (windowBottom > sectionTop + sectionHeight/2 && windowTop < sectionBottom - sectionHeight/2) {
            const elements = section.querySelectorAll('.slide-in');
            elements.forEach(el => {
                el.classList.add('active');
            });
            
            // Animate counters if present
            const counters = section.querySelectorAll('.counter-animated');
            animateCounters(counters);
        }
    });
}

// Animate counters
function animateCounters(counters) {
    counters.forEach(counter => {
        // Skip if already animated
        if (counter.dataset.animated === 'true') return;
        
        const target = parseInt(counter.getAttribute('data-target'));
        const duration = 2000; // ms
        const increment = target / (duration / 30); // Update every 30ms
        let current = 0;
        
        counter.dataset.animated = 'true';
        
        const updateCounter = () => {
            current += increment;
            if (current >= target) {
                counter.textContent = target;
                return;
            }
            counter.textContent = Math.floor(current);
            setTimeout(updateCounter, 30);
        };
        
        updateCounter();
    });
}

// Scroll to section when clicking nav dots
document.querySelectorAll('.nav-dot').forEach(dot => {
    dot.addEventListener('click', () => {
        const sectionId = `scene-${dot.getAttribute('data-section')}`;
        document.getElementById(sectionId).scrollIntoView({
            behavior: 'smooth'
        });
    });
});

// Mobile navigation
document.querySelectorAll('.mobile-nav a').forEach(link => {
    link.addEventListener('click', (e) => {
        e.preventDefault();
        const targetId = link.getAttribute('href').substring(1);
        document.getElementById(targetId).scrollIntoView({
            behavior: 'smooth'
        });
    });
});

// Tool item hover effects
function initToolItems() {
    document.querySelectorAll('.tool-item').forEach(item => {
        item.addEventListener('mouseenter', () => {
            const tooltip = item.getAttribute('data-tooltip');
            const category = item.getAttribute('data-category');
            const descContainer = document.querySelector('.tool-description');
            const statusDisplay = document.querySelector('.tool-status');
            
            if (descContainer && tooltip) {
                descContainer.textContent = tooltip;
                descContainer.parentElement.classList.add('active');
                
                // Update status display based on category
                if (statusDisplay) {
                    switch(category) {
                        case 'recon':
                            statusDisplay.textContent = '[SCANNING]';
                            statusDisplay.className = 'ml-auto text-[10px] text-emerald-500';
                            break;
                        case 'exploit':
                            statusDisplay.textContent = '[EXPLOITING]';
                            statusDisplay.className = 'ml-auto text-[10px] text-blue-500';
                            break;
                        case 'post':
                            statusDisplay.textContent = '[EXECUTING]';
                            statusDisplay.className = 'ml-auto text-[10px] text-purple-500';
                            break;
                        case 'defense':
                            statusDisplay.textContent = '[EVADING]';
                            statusDisplay.className = 'ml-auto text-[10px] text-yellow-500';
                            break;
                        default:
                            statusDisplay.textContent = '[ACTIVE]';
                            statusDisplay.className = 'ml-auto text-[10px] text-emerald-500';
                    }
                }
                
                // Highlight the active category
                document.querySelectorAll('.tool-category').forEach(category => {
                    category.classList.remove('active-category');
                });
                
                item.closest('.tool-category').classList.add('active-category');
            }
        });
        
        item.addEventListener('mouseleave', () => {
            const descContainer = document.querySelector('.tool-description');
            const statusDisplay = document.querySelector('.tool-status');
            
            if (descContainer) {
                descContainer.textContent = '';
                descContainer.parentElement.classList.remove('active');
                
                if (statusDisplay) {
                    statusDisplay.textContent = '[STANDBY]';
                    statusDisplay.className = 'ml-auto text-[10px] text-gray-500';
                }
            }
        });
        
        // For mobile touch
        item.addEventListener('touchstart', (e) => {
            e.preventDefault();
            const tooltip = item.getAttribute('data-tooltip');
            const category = item.getAttribute('data-category');
            const descContainer = document.querySelector('.tool-description');
            const statusDisplay = document.querySelector('.tool-status');
            
            // Clear any existing descriptions first
            document.querySelectorAll('.tool-item').forEach(otherItem => {
                otherItem.classList.remove('active-touch');
            });
            
            // Set this item as active
            item.classList.add('active-touch');
            
            if (descContainer && tooltip) {
                descContainer.textContent = tooltip;
                descContainer.parentElement.classList.add('active');
                
                // Update status display based on category
                if (statusDisplay) {
                    switch(category) {
                        case 'recon':
                            statusDisplay.textContent = '[SCANNING]';
                            statusDisplay.className = 'ml-auto text-[10px] text-emerald-500';
                            break;
                        case 'exploit':
                            statusDisplay.textContent = '[EXPLOITING]';
                            statusDisplay.className = 'ml-auto text-[10px] text-blue-500';
                            break;
                        case 'post':
                            statusDisplay.textContent = '[EXECUTING]';
                            statusDisplay.className = 'ml-auto text-[10px] text-purple-500';
                            break;
                        case 'defense':
                            statusDisplay.textContent = '[EVADING]';
                            statusDisplay.className = 'ml-auto text-[10px] text-yellow-500';
                            break;
                        default:
                            statusDisplay.textContent = '[ACTIVE]';
                            statusDisplay.className = 'ml-auto text-[10px] text-emerald-500';
                    }
                }
                
                // Highlight the active category
                document.querySelectorAll('.tool-category').forEach(category => {
                    category.classList.remove('active-category');
                });
                
                item.closest('.tool-category').classList.add('active-category');
            }
        });
    });
    
    // Close tool descriptions when tapping elsewhere
    document.addEventListener('touchstart', (e) => {
        if (!e.target.closest('.tool-item')) {
            document.querySelectorAll('.tool-item').forEach(item => {
                item.classList.remove('active-touch');
            });
            
            const descContainer = document.querySelector('.tool-description');
            const statusDisplay = document.querySelector('.tool-status');
            
            if (descContainer) {
                descContainer.textContent = '';
                descContainer.parentElement.classList.remove('active');
                
                if (statusDisplay) {
                    statusDisplay.textContent = '[STANDBY]';
                    statusDisplay.className = 'ml-auto text-[10px] text-gray-500';
                }
            }
            
            document.querySelectorAll('.tool-category').forEach(category => {
                category.classList.remove('active-category');
            });
        }
    });
}

// Typewriter effect
function typeWriter(element, text, speed) {
    let i = 0;
    function type() {
        if (i < text.length) {
            element.innerHTML = text.substring(0, i+1);
            i++;
            setTimeout(type, speed);
        } else {
            setTimeout(() => {
                element.innerHTML = '';
                i = 0;
                setTimeout(type, 500);
            }, 3000);
        }
    }
    type();
}

// Initialize particles.js
function initParticles() {
    if (window.particlesJS) {
        particlesJS('particles-js', {
            particles: {
                number: {
                    value: 80,
                    density: {
                        enable: true,
                        value_area: 800
                    }
                },
                color: {
                    value: '#10b981'
                },
                shape: {
                    type: 'circle',
                    stroke: {
                        width: 0,
                        color: '#000000'
                    },
                    polygon: {
                        nb_sides: 5
                    }
                },
                opacity: {
                    value: 0.3,
                    random: true,
                    anim: {
                        enable: true,
                        speed: 1,
                        opacity_min: 0.1,
                        sync: false
                    }
                },
                size: {
                    value: 3,
                    random: true,
                    anim: {
                        enable: true,
                        speed: 2,
                        size_min: 0.1,
                        sync: false
                    }
                },
                line_linked: {
                    enable: true,
                    distance: 150,
                    color: '#3b82f6',
                    opacity: 0.2,
                    width: 1
                },
                move: {
                    enable: true,
                    speed: 1,
                    direction: 'none',
                    random: true,
                    straight: false,
                    out_mode: 'out',
                    bounce: false,
                    attract: {
                        enable: false,
                        rotateX: 600,
                        rotateY: 1200
                    }
                }
            },
            interactivity: {
                detect_on: 'window',
                events: {
                    onhover: {
                        enable: true,
                        mode: 'grab'
                    },
                    onclick: {
                        enable: true,
                        mode: 'push'
                    },
                    resize: true
                },
                modes: {
                    grab: {
                        distance: 140,
                        line_linked: {
                            opacity: 0.5
                        }
                    },
                    push: {
                        particles_nb: 4
                    }
                }
            },
            retina_detect: true
        });
    }
}

// Handle mobile responsiveness
function handleMobileView() {
    const isMobile = window.innerWidth < 768;
    
    if (isMobile) {
        // Adjust for mobile view
        document.querySelectorAll('.section').forEach(section => {
            section.style.minHeight = `${window.innerHeight}px`;
        });
    }
}

// Initialize
window.addEventListener('DOMContentLoaded', () => {
    initMapDots();
    checkVisibility();
    initToolItems();
    initParticles();
    handleMobileView();
    
    // Initialize typewriter effect
    const typewriterElement = document.querySelector('.typewriter');
    if (typewriterElement) {
        const texts = ["infiltrate", "track", "neutralize", "analyze"];
        let currentIndex = 0;
        
        function cycleTexts() {
            typeWriter(typewriterElement, texts[currentIndex], 100);
            currentIndex = (currentIndex + 1) % texts.length;
            setTimeout(cycleTexts, 4000);
        }
        
        cycleTexts();
    }
});

window.addEventListener('scroll', checkVisibility);
window.addEventListener('resize', () => {
    checkVisibility();
    handleMobileView();
}); 