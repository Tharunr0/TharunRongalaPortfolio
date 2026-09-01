document.addEventListener('DOMContentLoaded', () => {
    
    // --- Mobile Menu Toggle ---
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');
    
    hamburger.addEventListener('click', () => {
        navLinks.classList.toggle('active');
        const icon = hamburger.querySelector('i');
        if (navLinks.classList.contains('active')) {
            icon.classList.remove('ph-list');
            icon.classList.add('ph-x');
        } else {
            icon.classList.remove('ph-x');
            icon.classList.add('ph-list');
        }
    });

    // Close menu when link is clicked
    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', () => {
            navLinks.classList.remove('active');
            hamburger.querySelector('i').classList.replace('ph-x', 'ph-list');
        });
    });

    // --- Active Nav Link on Scroll ---
    const sections = document.querySelectorAll('section');
    const navItems = document.querySelectorAll('.nav-link');

    window.addEventListener('scroll', () => {
        let current = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            if (scrollY >= (sectionTop - 200)) {
                current = section.getAttribute('id');
            }
        });

        navItems.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href').includes(current) && current !== '') {
                link.classList.add('active');
            }
        });
    });

    // --- Intersection Observer for Fade-In Animations ---
    const faders = document.querySelectorAll('.fade-in');
    
    const appearOptions = {
        threshold: 0.15,
        rootMargin: "0px 0px -50px 0px"
    };

    const appearOnScroll = new IntersectionObserver(function(entries, observer) {
        entries.forEach(entry => {
            if (!entry.isIntersecting) {
                return;
            } else {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target);
            }
        });
    }, appearOptions);

    faders.forEach(fader => {
        appearOnScroll.observe(fader);
    });

    // --- Copy to Clipboard ---
    const copyBtn = document.getElementById('copyBtn');
    if (copyBtn) {
        copyBtn.addEventListener('click', () => {
            navigator.clipboard.writeText('tharunr8533@gmail.com').then(() => {
                const icon = copyBtn.querySelector('i');
                icon.classList.replace('ph-copy', 'ph-check');
                icon.style.color = 'var(--metric-green)';
                
                setTimeout(() => {
                    icon.classList.replace('ph-check', 'ph-copy');
                    icon.style.color = '';
                }, 2000);
            });
        });
    }

    // --- Typewriter Effect (Continuous Loop) ---
    const codeSnippet = `from langgraph.graph import StateGraph
from langchain_openai import ChatOpenAI

# Initialize multi-agent router
router = StateGraph(AgentState)
router.add_node('researcher', research_agent)
router.add_node('synthesizer', synth_agent)

router.compile(checkpointer=memory)
# Ready for production deployment`;

    const typeTarget = document.getElementById('typewriter');
    let charIndex = 0;
    
    function typeCode() {
        if (charIndex < codeSnippet.length) {
            typeTarget.innerHTML += codeSnippet.charAt(charIndex);
            charIndex++;
            const speed = Math.random() * (50 - 20) + 20;
            setTimeout(typeCode, speed);
        } else {
            // Done typing — pause 3 seconds, then start erasing
            setTimeout(eraseCode, 3000);
        }
    }

    function eraseCode() {
        const currentText = typeTarget.innerHTML;
        if (currentText.length > 0) {
            typeTarget.innerHTML = currentText.slice(0, -1);
            setTimeout(eraseCode, 10); // Erase faster than typing
        } else {
            // Done erasing — pause 1 second, then type again
            charIndex = 0;
            setTimeout(typeCode, 1000);
        }
    }
    
    // Start the loop after a short delay
    setTimeout(typeCode, 1000);

});
