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
        // Verificar se IntersectionObserver é suportado
        if ('IntersectionObserver' in window) {
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
        } else {
            // Fallback para navegadores que não suportam IntersectionObserver
            document.querySelectorAll('.fade-in').forEach(el => {
                el.classList.add('visible');
            });
        }
    }

    initScrollAnimations();

    // ===================================
    // PROJECT CARD HOVER EFFECTS
    // ===================================
    function initProjectCardEffects() {
        const projectCards = document.querySelectorAll('.project-card');
        
        projectCards.forEach(card => {
            card.addEventListener('mouseenter', function() {
                this.style.transform = 'translateY(-8px) scale(1.02)';
                this.style.boxShadow = '0 15px 40px rgba(0,0,0,0.15)';
            });
            
            card.addEventListener('mouseleave', function() {
                this.style.transform = 'translateY(0) scale(1)';
                this.style.boxShadow = '0 4px 6px rgba(0, 0, 0, 0.1)';
            });
        });
    }

    initProjectCardEffects();

    // ===================================
    // ENHANCED BUTTON INTERACTIONS
    // ===================================
    function initButtonEffects() {
        const buttons = document.querySelectorAll('.github-link, .live-demo, .company-link, .social-link');
        
        buttons.forEach(button => {
            button.addEventListener('mouseenter', function() {
                this.style.transform = 'translateY(-3px) scale(1.05)';
            });
            
            button.addEventListener('mouseleave', function() {
                this.style.transform = 'translateY(0) scale(1)';
            });
            
            // Click effect
            button.addEventListener('click', function() {
                this.style.transform = 'translateY(1px) scale(0.98)';
                setTimeout(() => {
                    this.style.transform = 'translateY(-3px) scale(1.05)';
                }, 150);
            });
        });
    }

    initButtonEffects();

    // ===================================
    // SKILL TAGS ANIMATION
    // ===================================
    function initSkillTagsAnimation() {
        const skillTags = document.querySelectorAll('.skill-tag');
        
        skillTags.forEach((tag, index) => {
            tag.style.opacity = '0';
            tag.style.transform = 'translateY(20px)';
            
            setTimeout(() => {
                tag.style.transition = 'all 0.5s ease';
                tag.style.opacity = '1';
                tag.style.transform = 'translateY(0)';
            }, index * 50);
        });
    }

    // Initialize with delay to ensure elements are loaded
    setTimeout(initSkillTagsAnimation, 1000);

    // ===================================
    // RESPONSIVE NAVIGATION TOGGLE
    // ===================================
    function initMobileNavigation() {
        const nav = document.querySelector('.nav');
        if (!nav) return;
        
        const navItems = nav.querySelector('ul');
        if (!navItems) return;
        
        // Create mobile menu button
        const mobileMenuBtn = document.createElement('button');
        mobileMenuBtn.className = 'mobile-menu-btn';
        mobileMenuBtn.innerHTML = '☰';
        mobileMenuBtn.style.display = 'none';
        mobileMenuBtn.setAttribute('aria-label', 'Toggle navigation menu');
        
        nav.querySelector('.container').appendChild(mobileMenuBtn);
        
        mobileMenuBtn.addEventListener('click', () => {
            navItems.classList.toggle('mobile-active');
            
            // Update ARIA attributes for accessibility
            const isExpanded = navItems.classList.contains('mobile-active');
            mobileMenuBtn.setAttribute('aria-expanded', isExpanded);
        });
        
        // Handle mobile responsive behavior
        function checkMobile() {
            if (window.innerWidth <= 768) {
                mobileMenuBtn.style.display = 'block';
                navItems.classList.add('mobile-nav');
                mobileMenuBtn.setAttribute('aria-expanded', 'false');
            } else {
                mobileMenuBtn.style.display = 'none';
                navItems.classList.remove('mobile-nav', 'mobile-active');
            }
        }
        
        window.addEventListener('resize', checkMobile);
        checkMobile();
    }

    initMobileNavigation();

    // ===================================
    // PERFORMANCE OPTIMIZATIONS
    // ===================================
    
    // Throttle scroll events
    function throttle(func, limit) {
        let inThrottle;
        return function() {
            const args = arguments;
            const context = this;
            if (!inThrottle) {
                func.apply(context, args);
                inThrottle = true;
                setTimeout(() => inThrottle = false, limit);
            }
        };
    }
    
    // Apply throttling to scroll-dependent functions
    window.addEventListener('scroll', throttle(updateProgressBar, 10));

    // ===================================
    // ACCESSIBILITY IMPROVEMENTS
    // ===================================
    function initAccessibility() {
        // Add focus indicators for keyboard navigation
        const focusableElements = document.querySelectorAll('a, button, input, select, textarea');
        
        focusableElements.forEach(element => {
            element.addEventListener('focus', function() {
                this.style.outline = '2px solid var(--secondary-color)';
                this.style.outlineOffset = '2px';
            });
            
            element.addEventListener('blur', function() {
                this.style.outline = 'none';
            });
        });
        
        // Add aria-labels where needed
        const socialLinks = document.querySelectorAll('.social-link');
        const platforms = ['LinkedIn', 'GitHub', 'Portfolio', 'Email'];
        
        socialLinks.forEach((link, index) => {
            if (platforms[index]) {
                link.setAttribute('aria-label', platforms[index]);
            }
        });
    }

    initAccessibility();

    // ===================================
    // LANGUAGE SWITCHER FUNCTIONALITY
    // ===================================
    function initLanguageSwitcher() {
        const languageLinks = document.querySelectorAll('.language-switcher a');
        
        languageLinks.forEach(link => {
            link.addEventListener('click', function(e) {
                // Don't prevent default - let the link work normally
                // Just add a smooth transition effect
                document.body.style.transition = 'opacity 0.3s ease';
                document.body.style.opacity = '0.8';
            });
        });
    }

    initLanguageSwitcher();

    // ===================================
    // PROJECT LINKS ENHANCEMENT
    // ===================================
    function initProjectLinksEnhancement() {
        const projectLinks = document.querySelectorAll('.github-link, .live-demo, .company-link');
        
        projectLinks.forEach(link => {
            // Add loading state
            link.addEventListener('click', function() {
                const originalText = this.textContent;
                const loadingText = this.classList.contains('live-demo') ? '🔄 Loading...' : '🔄 Opening...';
                
                // Check if it's Portuguese
                if (document.documentElement.lang === 'pt-BR' || document.querySelector('html[lang="pt-BR"]')) {
                    this.textContent = this.classList.contains('live-demo') ? '🔄 Carregando...' : '🔄 Abrindo...';
                } else {
                    this.textContent = loadingText;
                }
                
                setTimeout(() => {
                    this.textContent = originalText;
                }, 2000);
            });
        });
    }

    initProjectLinksEnhancement();

    // ===================================
    // ERROR HANDLING
    // ===================================
    window.addEventListener('error', function(e) {
        console.error('🚨 Erro capturado:', e.error);
        
        // Implement graceful fallbacks
        if (e.error && e.error.message && e.error.message.includes('IntersectionObserver')) {
            // Fallback for browsers without IntersectionObserver
            document.querySelectorAll('.fade-in').forEach(el => {
                el.classList.add('visible');
            });
        }
    });

    // Handle unhandled promise rejections
    window.addEventListener('unhandledrejection', function(e) {
        console.error('🚨 Promise rejection:', e.reason);
        e.preventDefault();
    });

    // ===================================
    // FINAL SETUP
    // ===================================
    
    // Mark page as fully loaded
    document.body.classList.add('page-loaded');
    
    // Console welcome message
    console.log(`
    ╔══════════════════════════════════════╗
    ║                                      ║
    ║        CV - Dallan Borgheresi        ║
    ║                                      ║
    ║   Vibe Coding Specialist & AI Dev    ║
    ║                                      ║
    ╚══════════════════════════════════════╝
    
    🚀 Funcionalidades carregadas:
    • ✅ Scroll suave e barra de progresso
    • ✅ Animações responsivas
    • ✅ Navegação inteligente
    • ✅ Efeitos hover avançados
    • ✅ Suporte a acessibilidade
    • ✅ Menu mobile responsivo
    • ✅ Performance otimizada
    
    💡 Especializado em Vibe Coding e IA Generativa
    🔗 GitHub: https://github.com/Dallan99
    
    🎯 Novos projetos em destaque:
    • Ilha Norte Express: Landing page para entregas
    • WebFlow Solutions: Site institucional B2B
    `);
    
    console.log('🎉 CV totalmente carregado e funcional!');
});