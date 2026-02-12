"use strict";

// Funcionalidad del carrusel
document.addEventListener('DOMContentLoaded', function() {
    const footerSlot = document.getElementById('site-footer');
    if (footerSlot) {
        fetch('footer.html', { cache: 'no-store' })
            .then((response) => response.text())
            .then((html) => {
                footerSlot.innerHTML = html;
            })
            .catch((error) => {
                console.error('No se pudo cargar el footer:', error);
            });
    }

    const carouselItems = document.querySelectorAll('.carousel-item');
    const indicators = document.querySelectorAll('.indicator');
    const prevBtn = document.querySelector('.carousel-btn.prev');
    const nextBtn = document.querySelector('.carousel-btn.next');
    
    let currentSlide = 0;
    const totalSlides = carouselItems.length;
    
    // Función para mostrar slide específico
    function showSlide(index) {
        const prevSlide = currentSlide;
        
        // Normalizar el índice
        if (index >= totalSlides) {
            currentSlide = 0;
        } else if (index < 0) {
            currentSlide = totalSlides - 1;
        } else {
            currentSlide = index;
        }
        
        // Actualizar slides con animación de deslizamiento
        carouselItems.forEach((item, i) => {
            item.classList.remove('active', 'prev');
            if (i === currentSlide) {
                item.classList.add('active');
            } else if (i === prevSlide) {
                item.classList.add('prev');
            }
        });
        
        // Actualizar indicadores
        indicators.forEach((indicator, i) => {
            indicator.classList.toggle('active', i === currentSlide);
        });
    }
    
    // Botón anterior
    prevBtn.addEventListener('click', () => {
        showSlide(currentSlide - 1);
    });
    
    // Botón siguiente
    nextBtn.addEventListener('click', () => {
        showSlide(currentSlide + 1);
    });
    
    // Indicadores
    indicators.forEach((indicator, index) => {
        indicator.addEventListener('click', () => {
            showSlide(index);
        });
    });
    
    // Auto-avance cada 5 segundos
    setInterval(() => {
        showSlide(currentSlide + 1);
    }, 5000);
    
    // Navegación con teclado
    document.addEventListener('keydown', (e) => {
        if (e.key === 'ArrowLeft') {
            showSlide(currentSlide - 1);
        } else if (e.key === 'ArrowRight') {
            showSlide(currentSlide + 1);
        }
    });

    // Animaciones de entrada al hacer scroll
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const observerOptions = {
        threshold: 0.15,
        rootMargin: '0px 0px -80px 0px'
    };

    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('reveal-visible');
            } else {
                entry.target.classList.remove('reveal-visible');
            }
        });
    }, observerOptions);

    function registerReveal(selector, staggerSeconds) {
        const elements = document.querySelectorAll(selector);
        elements.forEach((element, index) => {
            element.classList.add('reveal');
            if (staggerSeconds) {
                element.style.transitionDelay = `${index * staggerSeconds}s`;
            }
            if (reduceMotion) {
                element.classList.add('reveal-visible');
            } else {
                revealObserver.observe(element);
            }
        });
    }

    registerReveal('.section-header', 0.08);
    registerReveal('.mv-carousel', 0);
    registerReveal('.info-card', 0.1);
    registerReveal('.value-item', 0.08);
    registerReveal('.procedure-card', 0.08);

    // Carrusel Misión y Visión
    const mvSlides = document.querySelectorAll('.mv-slide');
    const mvIndicators = document.querySelectorAll('.mv-indicator');
    const mvPrevBtn = document.querySelector('.mv-prev');
    const mvNextBtn = document.querySelector('.mv-next');
    
    let currentMVSlide = 0;
    const totalMVSlides = mvSlides.length;
    
    function showMVSlide(index) {
        const prevSlide = currentMVSlide;
        
        if (index >= totalMVSlides) {
            currentMVSlide = 0;
        } else if (index < 0) {
            currentMVSlide = totalMVSlides - 1;
        } else {
            currentMVSlide = index;
        }
        
        // Actualizar slides con animación de deslizamiento
        mvSlides.forEach((slide, i) => {
            slide.classList.remove('active', 'prev');
            if (i === currentMVSlide) {
                slide.classList.add('active');
            } else if (i === prevSlide) {
                slide.classList.add('prev');
            }
        });
        
        mvIndicators.forEach((indicator, i) => {
            indicator.classList.toggle('active', i === currentMVSlide);
        });
    }
    
    if (mvPrevBtn) {
        mvPrevBtn.addEventListener('click', () => {
            showMVSlide(currentMVSlide - 1);
        });
    }
    
    if (mvNextBtn) {
        mvNextBtn.addEventListener('click', () => {
            showMVSlide(currentMVSlide + 1);
        });
    }
    
    mvIndicators.forEach((indicator, index) => {
        indicator.addEventListener('click', () => {
            showMVSlide(index);
        });
    });
    
    // Auto-avance cada 7 segundos para Misión/Visión
    setInterval(() => {
        showMVSlide(currentMVSlide + 1);
    }, 7000);
});
