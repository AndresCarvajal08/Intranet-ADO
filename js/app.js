"use strict";

// Cargar footer dinámicamente
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

    // Leer más en sección Nuestros Compromisos
    document.querySelectorAll('.read-more').forEach(btn => {
        btn.addEventListener('click', function () {
            const card = btn.closest('.info-card');
            const collapse = card.querySelector('.collapse-text');
            const expanded = collapse.classList.toggle('expanded');
            btn.textContent = expanded ? 'Leer menos' : 'Leer más';
            if (expanded) {
                collapse.style.maxHeight = collapse.scrollHeight + 'px';
            } else {
                collapse.style.maxHeight = null;
            }
        });
    });

    // Carrusel Misión y Visión

    const mvSlides = document.querySelectorAll('.mv-slide');
    const mvPrevBtn = document.querySelector('.mv-btn.mv-prev');
    const mvNextBtn = document.querySelector('.mv-btn.mv-next');
    let mvCurrent = 0;
    let mvInterval;

    function showMVSlide(index) {
        mvSlides.forEach((slide, i) => {
            slide.classList.toggle('active', i === index);
            slide.style.transform = `translateX(${(i - index) * 100}%)`;
        });
        mvCurrent = index;
    }

    function nextMVSlide() {
        showMVSlide((mvCurrent + 1) % mvSlides.length);
    }

    function prevMVSlide() {
        showMVSlide((mvCurrent - 1 + mvSlides.length) % mvSlides.length);
    }

    function startMVAutoPlay() {
        mvInterval = setInterval(nextMVSlide, 6000);
    }

    function stopMVAutoPlay() {
        clearInterval(mvInterval);
    }

    if (mvPrevBtn && mvNextBtn) {
        mvNextBtn.addEventListener('click', () => {
            nextMVSlide();
            stopMVAutoPlay();
            startMVAutoPlay();
        });
        mvPrevBtn.addEventListener('click', () => {
            prevMVSlide();
            stopMVAutoPlay();
            startMVAutoPlay();
        });
    }

    showMVSlide(mvCurrent);
    startMVAutoPlay();

    // Carrusel de imágenes del Hero
    const heroSlides = document.querySelectorAll('.hero-carousel-slide');
    const heroPrevBtn = document.querySelector('.hero-carousel-prev');
    const heroNextBtn = document.querySelector('.hero-carousel-next');
    const heroIndicators = document.querySelectorAll('.hero-carousel-indicator');
    let heroCurrent = 0;
    let heroInterval;

    function showHeroSlide(index) {
        heroSlides.forEach((slide, i) => {
            slide.classList.toggle('active', i === index);
        });
        heroIndicators.forEach((indicator, i) => {
            indicator.classList.toggle('active', i === index);
        });
        heroCurrent = index;
    }

    function nextHeroSlide() {
        showHeroSlide((heroCurrent + 1) % heroSlides.length);
    }

    function prevHeroSlide() {
        showHeroSlide((heroCurrent - 1 + heroSlides.length) % heroSlides.length);
    }

    function startHeroAutoPlay() {
        heroInterval = setInterval(nextHeroSlide, 5000);
    }

    function stopHeroAutoPlay() {
        clearInterval(heroInterval);
    }

    if (heroNextBtn) {
        heroNextBtn.addEventListener('click', () => {
            nextHeroSlide();
            stopHeroAutoPlay();
            startHeroAutoPlay();
        });
    }
    if (heroPrevBtn) {
        heroPrevBtn.addEventListener('click', () => {
            prevHeroSlide();
            stopHeroAutoPlay();
            startHeroAutoPlay();
        });
    }
    heroIndicators.forEach((indicator, i) => {
        indicator.addEventListener('click', () => {
            showHeroSlide(i);
            stopHeroAutoPlay();
            startHeroAutoPlay();
        });
    });

    showHeroSlide(heroCurrent);
    startHeroAutoPlay();

    // Modal de Datos de Interés
    const modal = document.getElementById('dataModal');
    const openModalBtn = document.getElementById('openModalBtn');
    const closeModalBtn = document.getElementById('closeModalBtn');

    if (openModalBtn && modal) {
        openModalBtn.addEventListener('click', () => {
            modal.classList.add('active');
            document.body.style.overflow = 'hidden';
        });
    }

    if (closeModalBtn && modal) {
        closeModalBtn.addEventListener('click', () => {
            modal.classList.remove('active');
            document.body.style.overflow = '';
        });
    }

    // Cerrar modal al hacer clic fuera del contenido
    if (modal) {
        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                modal.classList.remove('active');
                document.body.style.overflow = '';
            }
        });
    }

    // Cerrar modal con tecla ESC
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && modal && modal.classList.contains('active')) {
            modal.classList.remove('active');
            document.body.style.overflow = '';
        }
    });
});
