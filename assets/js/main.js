// ===================================
// MAIN JAVASCRIPT FILE
// ===================================

document.addEventListener('DOMContentLoaded', function() {
    
    // ===================================
    // SCROLL PROGRESS BAR
    // ===================================
    function updateProgressBar() {
        const winScroll = document.body.scrollTop || document.documentElement.scrollTop;
        const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
        const scrolled = (winScroll / height) * 100;
        const progressBar = document.getElementById('progressBar');
        
        if (progressBar) {
            progressBar.style.width = scrolled + '%';
        }
    }

    window.addEventListener('scroll', updateProgressBar);

    // ===================================
    // SMOOTH SCROLLING NAVIGATION
    // ===================================
    function initSmoothScrolling() {
        const navLinks = document.querySelectorAll('a[href^="#"]');
        
        navLinks.forEach(anchor => {
            anchor.addEventListener('click', function (e) {
                e.preventDefault();
                
                const targetId = this.getAttribute('href');
                const targetSection = document.querySelector(targetId);
                
                if (targetSection) {
                    const offsetTop = targetSection.offsetTop - 80; // Account for fixed nav
                    
                    window.scrollTo({
                        top: offsetTop,
                        behavior: 'smooth'
                    });
                }
            });
        });
    }

    initSmoothScrolling();

    // ===================================
    // ACTIVE NAVIGATION HIGHLIGHTING
    // ===================================
    function updateActiveNavigation() {
        const sections = document.querySelectorAll('section[id]');
        const navLinks = document.querySelectorAll('.nav a[href^="#"]');
        
        window.addEventListener('scroll', () => {
            let current = '';
            
            sections.forEach(section => {
                const sectionTop = section.offsetTop;
                const sectionHeight = section.clientHeight;
                
                if (window.scrollY >= (sectionTop - 200)) {
                    current = section.getAttribute('id');
                }
            });

            navLinks.forEach(link => {
                link.classList.remove('active');
                if (link.getAttribute('href') === `#${current}`) {
                    link.classList.add('active');
                }
            });
        });
    }

    updateActiveNavigation();

    // ===================================
    // FADE IN ANIMATION ON SCROLL
    // ===================================
    function initScrollAnimations() {
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                }
            });
        }, observerOptions);

        // Observe all fade-in elements
        document.querySelectorAll('.fade-in').forEach(el => {
            observer.observe(el);
        });
    }

    initScrollAnimations();

    // ===================================
    // CONTACT FORM HANDLING
    // ===================================
    function initContactForm() {
        const contactForm = document.getElementById('contactForm');
        
        if (contactForm) {
            contactForm.addEventListener('submit', function(e) {
                e.preventDefault();
                
                // Get form data
                const formData = new FormData(this);
                const name = formData.get('name');
                const email = formData.get('email');
                const subject = formData.get('subject');
                const message = formData.get('message');
                
                // Validate form
                if (!name || !email || !subject || !message) {
                    showNotification('Por favor, preencha todos os campos.', 'error');
                    return;
                }
                
                // Create mailto link
                const mailtoSubject = encodeURIComponent(subject);
                const mailtoBody = encodeURIComponent(
                    `Nome: ${name}\n` +
                    `Email: ${email}\n\n` +
                    `Mensagem:\n${message}`
                );
                
                const mailtoLink = `mailto:dallanr@gmail.com?subject=${mailtoSubject}&body=${mailtoBody}`;
                
                // Open email client
                window.location.href = mailtoLink;
                
                // Reset form
                this.reset();
                
                // Show success message
                showNotification('Obrigado pelo contato! Seu cliente de email será aberto para enviar a mensagem.', 'success');
            });
        }
    }

    initContactForm();

    // ===================================
    // NOTIFICATION SYSTEM
    // ===================================
    function showNotification(message, type = 'info') {
        // Remove existing notifications
        const existingNotification = document.querySelector('.notification');
        if (existingNotification) {
            existingNotification.remove();
        }
        
        // Create notification element
        const notification = document.createElement('div');
        notification.className = `notification notification-${type}`;
        notification.innerHTML = `
            <span>${message}</span>
            <button type="button" class="notification-close">&times;</button>
        `;
        
        // Add styles
        notification.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            background: ${type === 'error' ? '#e74c3c' : type === 'success' ? '#27ae60' : '#3498db'};
            color: white;
            padding: 15px 20px;
            border-radius: 8px;
            box-shadow: 0 4px 12px rgba(0,0,0,0.15);
            z-index: 10000;
            display: flex;
            align-items: center;
            gap: 10px;
            max-width: 400px;
            animation: slideInRight 0.3s ease;
        `;
        
        // Add close button functionality
        const closeBtn = notification.querySelector('.notification-close');
        closeBtn.style.cssText = `
            background: none;
            border: none;
            color: white;
            font-size: 18px;
            cursor: pointer;
            padding: 0;
            margin-left: 10px;
        `;
        
        closeBtn.addEventListener('click', () => {
            notification.remove();
        });
        
        // Add to page
        document.body.appendChild(notification);
        
        // Auto remove after 5 seconds
        setTimeout(() => {
            if (notification.parentNode) {
                notification.remove();
            }
        }, 5000);
    }

    // ===================================
    // TYPING ANIMATION FOR HEADER
    // ===================================
    function initTypingAnimation() {
        const subtitleElement = document.querySelector('.header .subtitle');
        if (!subtitleElement) return;
        
        const originalText = subtitleElement.textContent;
        const typingSpeed = 50;
        const pauseDuration = 2000;
        
        function typeText() {
            subtitleElement.textContent = '';
            let i = 0;
            
            const typeInterval = setInterval(() => {
                subtitleElement.textContent += originalText.charAt(i);
                i++;
                
                if (i >= originalText.length) {
                    clearInterval(typeInterval);
                    // Add cursor blink effect
                    subtitleElement.innerHTML += '<span class="typing-cursor">|</span>';
                    
                    // Remove cursor after pause
                    setTimeout(() => {
                        const cursor = subtitleElement.querySelector('.typing-cursor');
                        if (cursor) cursor.remove();
                    }, pauseDuration);
                }
            }, typingSpeed);
        }
        
        // Start typing animation after page load
        setTimeout(typeText, 1000);
    }

    // Uncomment to enable typing animation
    // initTypingAnimation();

    // ===================================
    // SKILL TAGS INTERACTION
    // ===================================
    function initSkillTagsInteraction() {
        const skillTags = document.querySelectorAll('.skill-tag');
        
        skillTags.forEach(tag => {
            tag.addEventListener('click', function() {
                // Add click effect
                this.style.transform = 'scale(0.95)';
                setTimeout(() => {
                    this.style.transform = '';
                }, 150);
                
                // Could add functionality to show more info about the skill
                const skillName = this.textContent;
                console.log(`Clicked on skill: ${skillName}`);
            });
        });
    }

    initSkillTagsInteraction();

    // ===================================
    // THEME TOGGLE (Optional feature)
    // ===================================
    function initThemeToggle() {
        // Create theme toggle button
        const themeToggle = document.createElement('button');
        themeToggle.innerHTML = '🌙';
        themeToggle.className = 'theme-toggle';
        themeToggle.title = 'Alternar tema';
        
        themeToggle.style.cssText = `
            position: fixed;
            bottom: 20px;
            right: 20px;
            width: 50px;
            height: 50px;
            border-radius: 50%;
            border: none;
            background: var(--primary-color);
            color: white;
            font-size: 20px;
            cursor: pointer;
            box-shadow: 0 4px 12px rgba(0,0,0,0.15);
            z-index: 1000;
            transition: all 0.3s ease;
            display: none; /* Hidden by default */
        `;
        
        themeToggle.addEventListener('click', function() {
            document.body.classList.toggle('dark-theme');
            this.innerHTML = document.body.classList.contains('dark-theme') ? '☀️' : '🌙';
            
            // Save preference
            localStorage.setItem('darkTheme', document.body.classList.contains('dark-theme'));
        });
        
        // Load saved theme preference
        if (localStorage.getItem('darkTheme') === 'true') {
            document.body.classList.add('dark-theme');
            themeToggle.innerHTML = '☀️';
        }
        
        // Uncomment to enable theme toggle
        // document.body.appendChild(themeToggle);
        // themeToggle.style.display = 'block';
    }

    // initThemeToggle();

    // ===================================
    // PERFORMANCE OPTIMIZATIONS
    // ===================================
    
    // Lazy load images
    function initLazyLoading() {
        const images = document.querySelectorAll('img[data-src]');
        
        const imageObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.src = img.dataset.src;
                    img.classList.remove('lazy');
                    imageObserver.unobserve(img);
                }
            });
        });
        
        images.forEach(img => imageObserver.observe(img));
    }

    initLazyLoading();

    // ===================================
    // ERROR HANDLING
    // ===================================
    window.addEventListener('error', function(e) {
        console.error('JavaScript error:', e.error);
        // Could implement error reporting here
    });

    // ===================================
    // CONSOLE MESSAGE
    // ===================================
    console.log(`
    ╔══════════════════════════════════════╗
    ║                                      ║
    ║        CV - Dallan Borgheresi        ║
    ║                                      ║
    ║    Prompt Engineer & AI Developer    ║
    ║                                      ║
    ╚══════════════════════════════════════╝
    
    Interessado no código? Confira meu GitHub!
    🔗 https://github.com/Dallan99
    `);

});

// ===================================
// CSS ANIMATIONS KEYFRAMES
// ===================================
const style = document.createElement('style');
style.textContent = `
    @keyframes slideInRight {
        from {
            transform: translateX(100%);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }
    
    @keyframes fadeInUp {
        from {
            transform: translateY(30px);
            opacity: 0;
        }
        to {
            transform: translateY(0);
            opacity: 1;
        }
    }
    
    .typing-cursor {
        animation: blink 1s infinite;
    }
    
    @keyframes blink {
        0%, 50% { opacity: 1; }
        51%, 100% { opacity: 0; }
    }
    
    /* Dark theme styles (if implemented) */
    .dark-theme {
        --primary-color: #1a365d;
        --secondary-color: #2980b9;
        --text-dark: #e2e8f0;
        --bg-light: #1a202c;
        --bg-card: #2d3748;
    }
    
    .dark-theme .header {
        background: linear-gradient(135deg, #1a365d 0%, #2980b9 100%);
    }
`;

document.head.appendChild(style);