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
            "particles": {
                "number": {
                    "value": 80,
                    "density": {
                        "enable": true,
                        "value_area": 800
                    }
                },
                "color": {
                    "value": ["#10b981", "#3b82f6", "#8b5cf6"]
                },
                "shape": {
                    "type": "circle",
                    "stroke": {
                        "width": 0,
                        "color": "#000000"
                    },
                    "polygon": {
                        "nb_sides": 5
                    }
                },
                "opacity": {
                    "value": 0.2,
                    "random": true,
                    "anim": {
                        "enable": true,
                        "speed": 0.2,
                        "opacity_min": 0.1,
                        "sync": false
                    }
                },
                "size": {
                    "value": 3,
                    "random": true,
                    "anim": {
                        "enable": true,
                        "speed": 2,
                        "size_min": 0.3,
                        "sync": false
                    }
                },
                "line_linked": {
                    "enable": true,
                    "distance": 150,
                    "color": "#10b981",
                    "opacity": 0.1,
                    "width": 1
                },
                "move": {
                    "enable": true,
                    "speed": 0.5,
                    "direction": "none",
                    "random": true,
                    "straight": false,
                    "out_mode": "out",
                    "bounce": false,
                    "attract": {
                        "enable": false,
                        "rotateX": 600,
                        "rotateY": 1200
                    }
                }
            },
            "interactivity": {
                "detect_on": "canvas",
                "events": {
                    "onhover": {
                        "enable": true,
                        "mode": "grab"
                    },
                    "onclick": {
                        "enable": false,
                        "mode": "push"
                    },
                    "resize": true
                },
                "modes": {
                    "grab": {
                        "distance": 140,
                        "line_linked": {
                            "opacity": 0.3
                        }
                    },
                    "bubble": {
                        "distance": 400,
                        "size": 40,
                        "duration": 2,
                        "opacity": 8,
                        "speed": 3
                    },
                    "repulse": {
                        "distance": 200,
                        "duration": 0.4
                    },
                    "push": {
                        "particles_nb": 4
                    },
                    "remove": {
                        "particles_nb": 2
                    }
                }
            },
            "retina_detect": true
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

// Slide-in animations on scroll
const slideInElements = document.querySelectorAll('.slide-in');
const animatedCounters = document.querySelectorAll('.counter-animated');

const checkScroll = () => {
    slideInElements.forEach(element => {
        const elementTop = element.getBoundingClientRect().top;
        const elementBottom = element.getBoundingClientRect().bottom;
        const isVisible = (elementTop < window.innerHeight - 100) && (elementBottom > 0);
        
        if (isVisible) {
            element.classList.add('active');
        }
    });
};

window.addEventListener('scroll', checkScroll);
checkScroll();

// Animated counters
const animateCounter = (counter) => {
    const target = +counter.getAttribute('data-target');
    const duration = 2000; // in milliseconds
    const increment = target / (duration / 16);
    let current = 0;
    
    const updateCounter = () => {
        current += increment;
        
        if (current < target) {
            counter.textContent = Math.ceil(current);
            requestAnimationFrame(updateCounter);
        } else {
            counter.textContent = target;
        }
    };
    
    updateCounter();
};

const handleCounters = () => {
    animatedCounters.forEach(counter => {
        const rect = counter.getBoundingClientRect();
        if (rect.top < window.innerHeight && rect.bottom > 0 && !counter.classList.contains('animated')) {
            counter.classList.add('animated');
            animateCounter(counter);
        }
    });
};

window.addEventListener('scroll', handleCounters);
handleCounters();

// Nav dots for section navigation
const navDots = document.querySelectorAll('.nav-dot');

navDots.forEach(dot => {
    dot.addEventListener('click', () => {
        const sectionId = dot.getAttribute('data-section');
        const targetSection = document.getElementById(`scene-${sectionId}`);
        if (targetSection) {
            window.scrollTo({
                top: targetSection.offsetTop,
                behavior: 'smooth'
            });
        }
    });
});

const updateActiveDot = () => {
    const scrollPosition = window.scrollY;
    
    document.querySelectorAll('.section').forEach((section, index) => {
        const sectionTop = section.offsetTop - 100;
        const sectionBottom = sectionTop + section.offsetHeight;
        
        if (scrollPosition >= sectionTop && scrollPosition < sectionBottom) {
            navDots.forEach(dot => dot.classList.remove('bg-emerald-500', 'border-emerald-500'));
            const activeDot = document.querySelector(`.nav-dot[data-section="${index + 1}"]`);
            if (activeDot) {
                activeDot.classList.add('bg-emerald-500', 'border-emerald-500');
            }
        }
    });
};

window.addEventListener('scroll', updateActiveDot);
updateActiveDot();

// System Access Portal Tabs Functionality
const toolTabs = document.querySelectorAll('.tool-tab');
const toolContents = document.querySelectorAll('.tool-content');

toolTabs.forEach(tab => {
    tab.addEventListener('click', () => {
        // Remove active class from all tabs
        toolTabs.forEach(t => t.classList.remove('active', 'bg-emerald-500/20', 'bg-blue-500/20', 'bg-purple-500/20', 'bg-yellow-500/20', 'bg-red-500/20', 'bg-gray-500/20'));
        
        // Add active class to clicked tab
        tab.classList.add('active');
        
        // Add the appropriate background color based on the tab
        const tabType = tab.getAttribute('data-tab');
        if (tabType === 'recon') {
            tab.classList.add('bg-emerald-500/20');
        } else if (tabType === 'exploit') {
            tab.classList.add('bg-blue-500/20');
        } else if (tabType === 'post') {
            tab.classList.add('bg-purple-500/20');
        } else if (tabType === 'defense') {
            tab.classList.add('bg-yellow-500/20');
        } else if (tabType === 'intel') {
            tab.classList.add('bg-red-500/20');
        } else if (tabType === 'crypto') {
            tab.classList.add('bg-gray-500/20');
        }
        
        // Hide all content sections
        toolContents.forEach(content => {
            content.classList.add('hidden');
            content.classList.remove('active');
        });
        
        // Show the corresponding content
        const contentToShow = document.querySelector(`.tool-content[data-content="${tabType}"]`);
        if (contentToShow) {
            contentToShow.classList.remove('hidden');
            contentToShow.classList.add('active');
        }
    });
});

// Tool items click functionality
const toolItems = document.querySelectorAll('.tool-item');

toolItems.forEach(item => {
    item.addEventListener('click', () => {
        // Visual feedback on click
        toolItems.forEach(i => i.classList.remove('ring', 'ring-emerald-400/50', 'ring-blue-400/50'));
        item.classList.add('ring');
        
        // Add the appropriate ring color based on the tab
        const parentTab = item.closest('.tool-content');
        if (parentTab) {
            const tabType = parentTab.getAttribute('data-content');
            if (tabType === 'recon') {
                item.classList.add('ring-emerald-400/50');
            } else if (tabType === 'exploit') {
                item.classList.add('ring-blue-400/50');
            } else if (tabType === 'post') {
                item.classList.add('ring-purple-400/50');
            } else if (tabType === 'defense') {
                item.classList.add('ring-yellow-400/50');
            } else if (tabType === 'intel') {
                item.classList.add('ring-red-400/50');
            } else if (tabType === 'crypto') {
                item.classList.add('ring-gray-400/50');
            }
        }
    });
});

// Terminal input functionality
const terminalInputs = document.querySelectorAll('.terminal-input');

terminalInputs.forEach(input => {
    input.addEventListener('keydown', (e) => {
        if (e.key === 'Enter') {
            const command = input.value.trim();
            input.value = '';
            
            if (command) {
                // Display command feedback animation
                const parentTerminal = input.closest('.terminal');
                if (parentTerminal) {
                    const commandLine = document.createElement('div');
                    commandLine.classList.add('mb-4', 'terminal-line', 'text-gray-300');
                    commandLine.textContent = command;
                    
                    const responseContainer = document.createElement('div');
                    responseContainer.classList.add('mb-4', 'terminal-line', 'text-emerald-400');
                    responseContainer.textContent = 'Command received. Processing...';
                    
                    // Insert before the terminal input line
                    const inputContainer = input.closest('.terminal-line');
                    parentTerminal.insertBefore(commandLine, inputContainer);
                    parentTerminal.insertBefore(responseContainer, inputContainer);
                    
                    // Scroll to bottom
                    parentTerminal.scrollTop = parentTerminal.scrollHeight;
                }
            }
        }
    });
}); 