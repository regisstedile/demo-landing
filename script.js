/**
 * OUTSOURCING DE IMPRESSÃO - LANDING PAGE
 * JavaScript para interatividade e funcionalidades
 */

document.addEventListener('DOMContentLoaded', function() {
    // ===========================================================
    // SMOOTH SCROLLING PARA NAVEGAÇÃO
    // ===========================================================
    
    const navLinks = document.querySelectorAll('a[href^="#"]');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                const headerHeight = document.querySelector('#header').offsetHeight;
                const targetPosition = targetSection.offsetTop - headerHeight;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });

    // ===========================================================
    // HEADER SCROLL EFFECT
    // ===========================================================
    
    const header = document.querySelector('#header');
    
    window.addEventListener('scroll', function() {
        if (window.scrollY > 100) {
            header.style.background = 'rgba(17, 17, 17, 0.98)';
            header.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.3)';
        } else {
            header.style.background = 'rgba(17, 17, 17, 0.95)';
            header.style.boxShadow = 'none';
        }
    });

    // ===========================================================
    // ANIMAÇÕES ON SCROLL
    // ===========================================================
    
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('fade-in-up');
            }
        });
    }, observerOptions);
    
    // Observar elementos para animação
    const animatedElements = document.querySelectorAll('.problem-card, .benefit-item, .step-card, .testimonial-card, .sector-card');
    animatedElements.forEach(el => observer.observe(el));

    // ===========================================================
    // FORMULÁRIO DE CONTATO
    // ===========================================================
    
    const contactForm = document.querySelector('.contact-form');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Coletar dados do formulário
            const formData = new FormData(this);
            const data = Object.fromEntries(formData);
            
            // Validação básica
            if (!data.nome || !data.email || !data.telefone || !data.empresa) {
                showNotification('Por favor, preencha todos os campos obrigatórios.', 'error');
                return;
            }
            
            if (!data.lgpd) {
                showNotification('Você deve aceitar a Política de Privacidade.', 'error');
                return;
            }
            
            // Simular envio (aqui você integraria com seu backend)
            showNotification('Orçamento solicitado com sucesso! Entraremos em contato em até 2 horas.', 'success');
            this.reset();
        });
    }

    // ===========================================================
    // SISTEMA DE NOTIFICAÇÕES
    // ===========================================================
    
    function showNotification(message, type = 'info') {
        // Remover notificação existente
        const existingNotification = document.querySelector('.notification');
        if (existingNotification) {
            existingNotification.remove();
        }
        
        // Criar nova notificação
        const notification = document.createElement('div');
        notification.className = `notification notification-${type}`;
        notification.innerHTML = `
            <div class="notification-content">
                <i class="fas fa-${type === 'success' ? 'check-circle' : type === 'error' ? 'exclamation-circle' : 'info-circle'}"></i>
                <span>${message}</span>
                <button class="notification-close" onclick="this.parentElement.parentElement.remove()">
                    <i class="fas fa-times"></i>
                </button>
            </div>
        `;
        
        // Adicionar estilos
        notification.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            background: ${type === 'success' ? '#30ff69' : type === 'error' ? '#ff4757' : '#3742fa'};
            color: ${type === 'success' ? '#111111' : '#ffffff'};
            padding: 15px 20px;
            border-radius: 8px;
            box-shadow: 0 10px 30px rgba(0, 0, 0, 0.3);
            z-index: 10000;
            max-width: 400px;
            animation: slideInRight 0.3s ease-out;
        `;
        
        // Adicionar ao DOM
        document.body.appendChild(notification);
        
        // Remover automaticamente após 5 segundos
        setTimeout(() => {
            if (notification.parentElement) {
                notification.style.animation = 'slideOutRight 0.3s ease-out';
                setTimeout(() => notification.remove(), 300);
            }
        }, 5000);
    }

    // ===========================================================
    // CONTADOR ANIMADO
    // ===========================================================
    
    function animateCounter(element, target, duration = 2000) {
        let start = 0;
        const increment = target / (duration / 16);
        
        function updateCounter() {
            start += increment;
            if (start < target) {
                element.textContent = Math.floor(start) + (element.textContent.includes('+') ? '+' : '');
                requestAnimationFrame(updateCounter);
            } else {
                element.textContent = target + (element.textContent.includes('+') ? '+' : '');
            }
        }
        
        updateCounter();
    }
    
    // Observar estatísticas para animação
    const statsObserver = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const statNumbers = entry.target.querySelectorAll('.stat-number');
                statNumbers.forEach(stat => {
                    const text = stat.textContent;
                    const number = parseInt(text.replace(/\D/g, ''));
                    if (number) {
                        stat.textContent = '0' + (text.includes('+') ? '+' : '');
                        animateCounter(stat, number, 2000);
                    }
                });
                statsObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });
    
    const heroStats = document.querySelector('.hero-stats');
    if (heroStats) {
        statsObserver.observe(heroStats);
    }

    // ===========================================================
    // MOBILE MENU
    // ===========================================================
    
    const navbarToggler = document.querySelector('.navbar-toggler');
    const navbarCollapse = document.querySelector('.navbar-collapse');
    
    if (navbarToggler && navbarCollapse) {
        // Fechar menu ao clicar em um link
        const navLinks = navbarCollapse.querySelectorAll('.nav-link');
        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                if (navbarCollapse.classList.contains('show')) {
                    navbarToggler.click();
                }
            });
        });
    }

    // ===========================================================
    // LAZY LOADING DE IMAGENS
    // ===========================================================
    
    const images = document.querySelectorAll('img[data-src]');
    
    const imageObserver = new IntersectionObserver(function(entries) {
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

    // ===========================================================
    // SCROLL TO TOP
    // ===========================================================
    
    // Criar botão scroll to top
    const scrollToTopBtn = document.createElement('button');
    scrollToTopBtn.innerHTML = '<i class="fas fa-arrow-up"></i>';
    scrollToTopBtn.className = 'scroll-to-top';
    scrollToTopBtn.style.cssText = `
        position: fixed;
        bottom: 30px;
        right: 30px;
        width: 50px;
        height: 50px;
        background: var(--accent-green);
        color: var(--bg-primary);
        border: none;
        border-radius: 50%;
        cursor: pointer;
        font-size: 18px;
        opacity: 0;
        visibility: hidden;
        transition: all 0.3s ease;
        z-index: 1000;
        box-shadow: 0 5px 15px rgba(48, 255, 105, 0.3);
    `;
    
    document.body.appendChild(scrollToTopBtn);
    
    // Mostrar/ocultar botão baseado no scroll
    window.addEventListener('scroll', function() {
        if (window.scrollY > 300) {
            scrollToTopBtn.style.opacity = '1';
            scrollToTopBtn.style.visibility = 'visible';
        } else {
            scrollToTopBtn.style.opacity = '0';
            scrollToTopBtn.style.visibility = 'hidden';
        }
    });
    
    // Funcionalidade do botão
    scrollToTopBtn.addEventListener('click', function() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });

    // ===========================================================
    // PERFORMANCE MONITORING
    // ===========================================================
    
    // Medir tempo de carregamento
    window.addEventListener('load', function() {
        const loadTime = performance.now();
        console.log(`Página carregada em ${Math.round(loadTime)}ms`);
        
        // Enviar métricas para analytics (se configurado)
        if (typeof gtag !== 'undefined') {
            gtag('event', 'page_load_time', {
                'value': Math.round(loadTime),
                'event_category': 'Performance'
            });
        }
    });

    // ===========================================================
    // ERROR HANDLING
    // ===========================================================
    
    window.addEventListener('error', function(e) {
        console.error('Erro JavaScript:', e.error);
        
        // Enviar erro para serviço de monitoramento (se configurado)
        if (typeof gtag !== 'undefined') {
            gtag('event', 'javascript_error', {
                'error_message': e.error.message,
                'error_file': e.filename,
                'error_line': e.lineno,
                'event_category': 'Error'
            });
        }
    });

    // ===========================================================
    // ACCESSIBILITY IMPROVEMENTS
    // ===========================================================
    
    // Adicionar suporte a navegação por teclado
    document.addEventListener('keydown', function(e) {
        // ESC para fechar modais/notificações
        if (e.key === 'Escape') {
            const notifications = document.querySelectorAll('.notification');
            notifications.forEach(notification => notification.remove());
        }
        
        // Enter/Space para botões customizados
        if ((e.key === 'Enter' || e.key === ' ') && e.target.classList.contains('scroll-to-top')) {
            e.preventDefault();
            e.target.click();
        }
    });

    // ===========================================================
    // CSS ANIMATIONS
    // ===========================================================
    
    // Adicionar estilos CSS para animações
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
        
        @keyframes slideOutRight {
            from {
                transform: translateX(0);
                opacity: 1;
            }
            to {
                transform: translateX(100%);
                opacity: 0;
            }
        }
        
        .notification-content {
            display: flex;
            align-items: center;
            gap: 10px;
        }
        
        .notification-close {
            background: none;
            border: none;
            color: inherit;
            cursor: pointer;
            padding: 0;
            margin-left: auto;
        }
        
        .scroll-to-top:hover {
            transform: translateY(-2px);
            box-shadow: 0 8px 25px rgba(48, 255, 105, 0.4);
        }
        
        .lazy {
            opacity: 0;
            transition: opacity 0.3s;
        }
        
        .lazy.loaded {
            opacity: 1;
        }
    `;
    document.head.appendChild(style);

    console.log('🚀 Landing Page carregada com sucesso!');
});
