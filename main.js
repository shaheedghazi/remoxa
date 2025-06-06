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
        }
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

// Initialize
window.addEventListener('DOMContentLoaded', () => {
    initMapDots();
    checkVisibility();
    
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
window.addEventListener('resize', checkVisibility); 