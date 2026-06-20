// MAIN JAVASCRIPT FOR SOLAR CENTAURY SPA
// UI Interactions, Animations, Rotating Galleries, and Trustindex Reviews

// List of real project images from: ARCHIVOS WEB/fotos trabajos realizados
const galleryImages = [
    "WhatsApp Image 2026-06-11 at 9.33.53 PM (1).jpeg",
    "WhatsApp Image 2026-06-11 at 9.33.53 PM (2).jpeg",
    "WhatsApp Image 2026-06-11 at 9.33.53 PM.jpeg",
    "WhatsApp Image 2026-06-11 at 9.33.54 PM (1).jpeg",
    "WhatsApp Image 2026-06-11 at 9.33.54 PM (2).jpeg",
    "WhatsApp Image 2026-06-11 at 9.33.54 PM (3).jpeg",
    "WhatsApp Image 2026-06-11 at 9.33.54 PM.jpeg",
    "WhatsApp Image 2026-06-11 at 9.33.55 PM.jpeg",
    "WhatsApp Image 2026-06-15 at 11.12.46 AM.jpeg",
    "WhatsApp Image 2026-06-15 at 11.12.48 AM (1).jpeg",
    "WhatsApp Image 2026-06-15 at 11.12.48 AM (2).jpeg",
    "WhatsApp Image 2026-06-15 at 11.12.48 AM (3).jpeg",
    "WhatsApp Image 2026-06-15 at 11.12.48 AM (4).jpeg",
    "WhatsApp Image 2026-06-15 at 11.12.48 AM.jpeg",
    "WhatsApp Image 2026-06-15 at 11.12.49 AM (1).jpeg",
    "WhatsApp Image 2026-06-15 at 11.12.49 AM (2).jpeg",
    "WhatsApp Image 2026-06-15 at 11.12.49 AM.jpeg",
    "WhatsApp Image 2026-06-15 at 11.19.43 AM (1).jpeg",
    "WhatsApp Image 2026-06-15 at 11.19.43 AM.jpeg",
    "WhatsApp Image 2026-06-15 at 11.19.44 AM.jpeg",
    "WhatsApp Image 2026-06-15 at 11.19.45 AM (1).jpeg",
    "WhatsApp Image 2026-06-15 at 11.19.45 AM.jpeg",
    "WhatsApp Image 2026-06-15 at 11.19.46 AM (1).jpeg",
    "WhatsApp Image 2026-06-15 at 11.19.46 AM (3).jpeg",
    "WhatsApp Image 2026-06-15 at 11.19.46 AM.jpeg",
    "WhatsApp Image 2026-06-15 at 11.19.47 AM.jpeg",
    "WhatsApp Image 2026-06-15 at 11.29.42 AM.jpeg",
    "WhatsApp Image 2026-06-15 at 11.29.43 AM (1).jpeg",
    "WhatsApp Image 2026-06-15 at 11.29.43 AM (2).jpeg",
    "WhatsApp Image 2026-06-15 at 11.29.43 AM (3).jpeg",
    "WhatsApp Image 2026-06-15 at 11.29.43 AM.jpeg",
    "WhatsApp Image 2026-06-15 at 11.29.44 AM (1).jpeg",
    "WhatsApp Image 2026-06-15 at 11.29.44 AM.jpeg"
];

// List of Google Reviews from ARCHIVOS WEB/RESEÑAS (imgi_42 to imgi_49)
const googleReviews = [
    {
        name: "Turismo los alamos",
        profileImg: "imgi_42_ACg8ocJ-klNHhC69Eh40i9-vzOMDTINakNKmZ9soVMOFEInyyXlctg=w40-h40-c-rp-mo-br100.png",
        stars: 5,
        time: "Hace 9 meses",
        text: "Hace unos meses que instalaron nuestro sistema solar y realmente vale la pena, 1000 % recomendables"
    },
    {
        name: "Yeny Vasquez",
        profileImg: "imgi_43_ALV-UjXYgKLgjGpTQKfHc93u5tejvNua0kzX-0QtZxLxTszKMDp2kBq6=w40-h40-c-rp-mo-br100.png",
        stars: 5,
        time: "Hace 9 meses",
        text: "Feliz con el resultado, buena atención, confiables."
    },
    {
        name: "Francisca Rush Oliv...",
        profileImg: "imgi_44_ACg8ocKFGDprefa6VvsBgmO6QbM8XPOYbAXfc0r26_XDzS7SfGhxMBE=w40-h40-c-rp-mo-ba2-br100.png",
        stars: 4,
        time: "Hace 12 meses",
        text: "Están buenos y profesionales"
    },
    {
        name: "Hans von Jentschyk",
        profileImg: "imgi_45_ACg8ocJjjwdQAn9lVq9t7va0AvPyHFll1lDpPdwUzwrTpY0mY6FA3g=w40-h40-c-rp-mo-br100.png",
        stars: 5,
        time: "Hace 9 meses",
        text: "Excelente trabajo en la regularización SEC de nuestro proyecto solar. Muy rápidos y eficientes."
    },
    {
        name: "Ricardo Benvenuto",
        profileImg: "imgi_46_ALV-UjUcNfvWYd2RIffugO7l1kuYint5CMtlFVyIey6B1VRmUJVSqMM=w40-h40-c-rp-mo-br100.png",
        stars: 5,
        time: "Hace 9 meses",
        text: "Muy buen servicio de Postventa. Siempre atentos a responder dudas técnicas sobre el inversor."
    },
    {
        name: "Carlos Urrutia",
        profileImg: "imgi_47_ALV-UjXinhislt4EEWG7vO2Y8FU4qLHA7bE6fl7V2jDApbPTaXC6roga=w40-h40-c-rp-mo-ba2-br100.png",
        stars: 5,
        time: "Hace 6 meses",
        text: "Instalaron un sistema Off-Grid en mi campo y funciona espectacular. Totalmente recomendados."
    },
    {
        name: "Patricia Aravena",
        profileImg: "imgi_48_ALV-UjXLN0ZMwhwSweHBvA7FCPyNFhnWbnC-x3dl1rob2u4WTbF2IFl21g=w40-h40-c-rp-mo-br100.png",
        stars: 5,
        time: "Hace 3 meses",
        text: "Las cámaras de seguridad se ven nítidas de día y noche. La app para el celular funciona perfecto."
    },
    {
        name: "Juan Pablo Muñoz",
        profileImg: "imgi_49_ACg8ocKXjHmHJlhbTHOy1mYLbn3rodnVGiCqcS5VWpDsj9FFCjc27Q=w40-h40-c-rp-mo-br100.png",
        stars: 5,
        time: "Hace 1 mes",
        text: "Excelente trabajo de ingeniería en el armado de tableros eléctricos. Profesionales serios."
    }
];

document.addEventListener("DOMContentLoaded", () => {
    initNavbar();
    initTypingEffect();
    initCounters();
    initGallery();
    initLightbox();
    initSystemSliders();
    initTrustindexWidget();
    initDirectContactForm();
    initScrollReveal();
});

// 1. NAVIGATION HEADER & MOBILE MENU
function initNavbar() {
    const header = document.getElementById("main-header");
    const mobileToggle = document.getElementById("mobile-toggle");
    const navbarMenu = document.getElementById("navbar-menu");
    const navLinks = document.querySelectorAll(".nav-links a");

    // Scroll styling: add backdrop blur and solid background when scrolling
    window.addEventListener("scroll", () => {
        if (window.scrollY > 50) {
            header.classList.add("header-scrolled");
        } else {
            header.classList.remove("header-scrolled");
        }
        updateActiveLink();
    });

    // Mobile menu toggle
    if (mobileToggle && navbarMenu) {
        mobileToggle.addEventListener("click", () => {
            const isOpened = mobileToggle.getAttribute("aria-expanded") === "true";
            mobileToggle.setAttribute("aria-expanded", !isOpened);
            navbarMenu.classList.toggle("nav-active");
            mobileToggle.classList.toggle("toggle-active");
        });
    }

    // Close menu when clicking links
    navLinks.forEach(link => {
        link.addEventListener("click", () => {
            if (navbarMenu.classList.contains("nav-active")) {
                navbarMenu.classList.remove("nav-active");
                mobileToggle.classList.remove("toggle-active");
                mobileToggle.setAttribute("aria-expanded", "false");
            }
        });
    });

    // Scroll Spy to highlight active section in navbar
    function updateActiveLink() {
        const sections = document.querySelectorAll("section[id]");
        const scrollY = window.pageYOffset;

        sections.forEach(current => {
            const sectionHeight = current.offsetHeight;
            const sectionTop = current.offsetTop - 120;
            const sectionId = current.getAttribute("id");
            const navLink = document.querySelector(`.nav-links a[href*=${sectionId}]`);

            if (navLink) {
                if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
                    navLinks.forEach(l => l.classList.remove("active"));
                    navLink.classList.add("active");
                }
            }
        });
    }

    // Smooth scroll for CTAs
    document.querySelectorAll(".open-cotizador-btn, .service-grid-card-link").forEach(btn => {
        btn.addEventListener("click", (e) => {
            e.preventDefault();
            const href = btn.getAttribute("href");
            const target = document.querySelector(href || "#calculadora");
            if (target) {
                target.scrollIntoView({ behavior: "smooth", block: "start" });
            }
        });
    });
}

// 2. HERO TYPING EFFECT
function initTypingEffect() {
    const textElement = document.getElementById("hero-typing-text");
    if (!textElement) return;

    const baseText = "Realizamos tus proyectos eléctricos y de energía renovable ";
    const changingPhrases = [
        "a tu medida!!!",
        "con certificación SEC.",
        "con paneles solares.",
        "con máxima eficiencia."
    ];

    let phraseIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    let typingSpeed = 80;

    function type() {
        const currentPhrase = changingPhrases[phraseIndex];
        let displayText = baseText;

        if (isDeleting) {
            displayText += currentPhrase.substring(0, charIndex);
            charIndex--;
            typingSpeed = 40; // delete faster
        } else {
            displayText += currentPhrase.substring(0, charIndex);
            charIndex++;
            typingSpeed = 80;
        }

        textElement.innerHTML = `${displayText}<span class="typing-cursor">|</span>`;

        if (!isDeleting && charIndex > currentPhrase.length) {
            isDeleting = true;
            typingSpeed = 2000; // Pause at full text
        } else if (isDeleting && charIndex < 0) {
            isDeleting = false;
            phraseIndex = (phraseIndex + 1) % changingPhrases.length;
            charIndex = 0;
            typingSpeed = 500; // Pause before typing next phrase
        }

        setTimeout(type, typingSpeed);
    }

    // Start effect
    setTimeout(type, 1000);
}

// 3. SCROLL COUNTERS (NUMEROS DINAMICOS)
function initCounters() {
    const counters = document.querySelectorAll(".stat-count");
    if (counters.length === 0) return;

    const speed = 200; // The lower the slower

    const startCount = (counter) => {
        const target = +counter.getAttribute("data-target");
        const count = +counter.innerText;
        const inc = target / speed;

        if (count < target) {
            counter.innerText = Math.ceil(count + inc);
            setTimeout(() => startCount(counter), 10);
        } else {
            counter.innerText = target;
        }
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const counter = entry.target;
                startCount(counter);
                observer.unobserve(counter); // run only once
            }
        });
    }, { threshold: 0.5 });

    counters.forEach(counter => {
        observer.observe(counter);
    });
}

// 4. GALLERY RENDER WITH LAZY LOAD (NESTED CLOSURE FIX FOR UNDEFINED TRACK)
let visibleImageCount = 8;
function initGallery() {
    const track = document.getElementById("gallery-track");
    const loadMoreBtn = document.getElementById("gallery-load-more");
    if (!track) return;

    function renderGalleryItems(startIndex = 0) {
        const pathPrefix = "ARCHIVOS WEB/fotos trabajos realizados/";
        
        if (startIndex === 0) {
            track.innerHTML = "";
        }
        
        const imagesToRender = galleryImages.slice(startIndex, visibleImageCount);
        imagesToRender.forEach((filename, idx) => {
            const actualIdx = startIndex + idx;
            const slide = document.createElement("div");
            slide.className = "gallery-slide anim-fade-in";
            slide.setAttribute("data-index", actualIdx);
            slide.innerHTML = `
                <img src="${pathPrefix}${filename.replace(/ /g, '%20')}" alt="Proyecto Solar Centaury" class="gallery-img">
                <div class="gallery-slide-overlay">
                    <span class="gallery-slide-title">Proyecto Realizado</span>
                    <span class="gallery-slide-tag">Temuco, Araucanía</span>
                    <span class="gallery-zoom-icon">🔍 Ampliar</span>
                </div>
            `;
            
            slide.addEventListener("click", () => {
                openLightbox(actualIdx);
            });
            
            track.appendChild(slide);
        });

        // Force scroll reveal check to show newly rendered images
        setTimeout(() => {
            window.dispatchEvent(new Event("scroll"));
        }, 50);
    }

    renderGalleryItems(0);

    if (loadMoreBtn) {
        loadMoreBtn.addEventListener("click", (e) => {
            e.preventDefault(); // Prevent default button actions
            const prevCount = visibleImageCount;
            visibleImageCount += 8;
            renderGalleryItems(prevCount);
            if (visibleImageCount >= galleryImages.length) {
                loadMoreBtn.style.display = "none";
            }
        });
    }
}

// 5. LIGHTBOX MODAL FOR IMAGES
let currentLightboxIdx = 0;
function initLightbox() {
    // Create lightbox HTML structure dynamically and append to body
    let lightbox = document.getElementById("lightbox-modal");
    if (!lightbox) {
        lightbox = document.createElement("div");
        lightbox.id = "lightbox-modal";
        lightbox.className = "lightbox-modal";
        lightbox.innerHTML = `
            <span class="lightbox-close">&times;</span>
            <div class="lightbox-content-wrapper">
                <img class="lightbox-content" id="lightbox-img" alt="Ampliación del Proyecto">
                <div id="lightbox-caption" class="lightbox-caption"></div>
            </div>
            <button class="lightbox-nav lightbox-prev" id="lightbox-prev">&#10094;</button>
            <button class="lightbox-nav lightbox-next" id="lightbox-next">&#10095;</button>
        `;
        document.body.appendChild(lightbox);
    }

    const closeBtn = lightbox.querySelector(".lightbox-close");
    const prevBtn = lightbox.querySelector("#lightbox-prev");
    const nextBtn = lightbox.querySelector("#lightbox-next");

    closeBtn.addEventListener("click", closeLightbox);
    prevBtn.addEventListener("click", () => navigateLightbox(-1));
    nextBtn.addEventListener("click", () => navigateLightbox(1));

    // Close on clicking overlay outside image
    lightbox.addEventListener("click", (e) => {
        if (e.target === lightbox || e.target.className === "lightbox-content-wrapper") {
            closeLightbox();
        }
    });

    // Keyboard navigation
    document.addEventListener("keydown", (e) => {
        if (lightbox.style.display === "flex") {
            if (e.key === "Escape") closeLightbox();
            if (e.key === "ArrowLeft") navigateLightbox(-1);
            if (e.key === "ArrowRight") navigateLightbox(1);
        }
    });
}

function openLightbox(index) {
    const lightbox = document.getElementById("lightbox-modal");
    const img = document.getElementById("lightbox-img");
    const caption = document.getElementById("lightbox-caption");
    if (!lightbox || !img) return;

    currentLightboxIdx = index;
    const pathPrefix = "ARCHIVOS WEB/fotos trabajos realizados/";
    const filename = galleryImages[currentLightboxIdx];

    img.src = `${pathPrefix}${filename}`;
    caption.textContent = `Instalación Solar Centaury - Proyecto #${currentLightboxIdx + 1} de ${galleryImages.length}`;
    
    lightbox.style.display = "flex";
    document.body.style.overflow = "hidden"; // disable body scrolling
}

function closeLightbox() {
    const lightbox = document.getElementById("lightbox-modal");
    if (lightbox) {
        lightbox.style.display = "none";
        document.body.style.overflow = ""; // enable scrolling
    }
}

function navigateLightbox(direction) {
    // Only navigate within visible images
    const currentLimit = Math.min(visibleImageCount, galleryImages.length);
    currentLightboxIdx = (currentLightboxIdx + direction + currentLimit) % currentLimit;
    
    const img = document.getElementById("lightbox-img");
    const caption = document.getElementById("lightbox-caption");
    if (!img) return;

    // Fade out effect
    img.style.opacity = 0;
    setTimeout(() => {
        const pathPrefix = "ARCHIVOS WEB/fotos trabajos realizados/";
        const filename = galleryImages[currentLightboxIdx];
        img.src = `${pathPrefix}${filename}`;
        caption.textContent = `Instalación Solar Centaury - Proyecto #${currentLightboxIdx + 1} de ${galleryImages.length}`;
        img.style.opacity = 1;
    }, 150);
}

// 6. AUTOMATIC ROTATING SYSTEM SLIDERS
function initSystemSliders() {
    const sliders = document.querySelectorAll(".system-slider");
    sliders.forEach(slider => {
        const track = slider.querySelector(".system-slider-track");
        const slides = slider.querySelectorAll(".system-slide");
        const dotsContainer = slider.querySelector(".system-slider-dots");
        const intervalTime = parseInt(slider.getAttribute("data-interval")) || 3000;
        
        if (slides.length <= 1) return;
        
        let activeIdx = 0;
        
        // Generate dots
        let dotsHtml = "";
        slides.forEach((_, idx) => {
            dotsHtml += `<span class="slider-dot ${idx === 0 ? 'active' : ''}" data-idx="${idx}"></span>`;
        });
        if (dotsContainer) {
            dotsContainer.innerHTML = dotsHtml;
            const dots = dotsContainer.querySelectorAll(".slider-dot");
            dots.forEach(dot => {
                dot.addEventListener("click", () => {
                    const targetIdx = parseInt(dot.getAttribute("data-idx"));
                    goToSlide(targetIdx);
                });
            });
        }
        
        function goToSlide(idx) {
            slides[activeIdx].classList.remove("active");
            activeIdx = idx;
            slides[activeIdx].classList.add("active");
            
            // Update dots
            if (dotsContainer) {
                const dots = dotsContainer.querySelectorAll(".slider-dot");
                dots.forEach((dot, dIdx) => {
                    if (dIdx === activeIdx) {
                        dot.classList.add("active");
                    } else {
                        dot.classList.remove("active");
                    }
                });
            }
        }
        
        // Auto rotation
        setInterval(() => {
            let nextIdx = (activeIdx + 1) % slides.length;
            goToSlide(nextIdx);
        }, intervalTime);
    });
}

// 7. TRUSTINDEX TESTIMONIALS WIDGET
let tiIndex = 0;
function initTrustindexWidget() {
    const track = document.getElementById("ti-slider-track");
    const prev = document.getElementById("ti-prev");
    const next = document.getElementById("ti-next");
    if (!track) return;
    
    // Render reviews dynamically
    let html = "";
    googleReviews.forEach(r => {
        // Calculate stars span
        let starsHtml = "";
        for (let i = 1; i <= 5; i++) {
            starsHtml += `<span class="star ${i <= r.stars ? 'filled' : 'empty'}">★</span>`;
        }
        
        html += `
            <div class="ti-card">
                <div class="ti-card-header">
                    <img src="ARCHIVOS WEB/RESEÑAS/${r.profileImg}" alt="${r.name}" class="ti-card-profile">
                    <div class="ti-card-user-info">
                        <div class="ti-card-username">${r.name}</div>
                        <div class="ti-card-time">${r.time}</div>
                    </div>
                    <img src="ARCHIVOS WEB/RESEÑAS/imgi_41_icon.svg" alt="Google Icon" class="ti-google-icon-card">
                </div>
                <div class="ti-card-stars-row">
                    <div class="ti-card-stars">${starsHtml}</div>
                    <div class="ti-card-verified-badge">
                        <span class="ti-card-check">✓</span>
                        <span class="ti-card-verified-text">Verificado</span>
                    </div>
                </div>
                <p class="ti-card-text">"${r.text}"</p>
            </div>
        `;
    });
    track.innerHTML = html;
    
    const cards = track.querySelectorAll(".ti-card");
    const totalCards = cards.length;
    
    function getCardsToShow() {
        if (window.innerWidth <= 600) return 1;
        if (window.innerWidth <= 960) return 2;
        return 3;
    }
    
    window.slideTi = function(dir) {
        const show = getCardsToShow();
        const maxIndex = totalCards - show;
        
        tiIndex = Math.max(0, Math.min(maxIndex, tiIndex + dir));
        
        // Calculate offset dynamically based on card width + gap (20px)
        const firstCard = cards[0];
        if (firstCard) {
            const cardWidth = firstCard.getBoundingClientRect().width + 20;
            track.style.transform = `translateX(${-tiIndex * cardWidth}px)`;
        }
        
        // Toggle opacity/clicks for nav buttons
        if (prev && next) {
            prev.style.opacity = tiIndex === 0 ? "0.3" : "1";
            prev.style.pointerEvents = tiIndex === 0 ? "none" : "auto";
            next.style.opacity = tiIndex === maxIndex ? "0.3" : "1";
            next.style.pointerEvents = tiIndex === maxIndex ? "none" : "auto";
        }
    };
    
    if (prev) prev.addEventListener("click", () => slideTi(-1));
    if (next) next.addEventListener("click", () => slideTi(1));
    
    // Listen to resize to recalculate slider layout
    window.addEventListener("resize", () => {
        track.style.transform = "translateX(0px)";
        tiIndex = 0;
        slideTi(0);
    });
    
    // Init state
    setTimeout(() => {
        slideTi(0);
    }, 100);
}

// 8. DIRECT CONTACT FORM WITH WHATSAPP LINK
function initDirectContactForm() {
    const form = document.getElementById("direct-contact-form");
    if (!form) return;

    form.addEventListener("submit", (e) => {
        e.preventDefault();

        const name = document.getElementById("c-name").value;
        const phone = document.getElementById("c-phone").value;
        const service = document.getElementById("c-service").value;
        const date = document.getElementById("c-date").value;
        const message = document.getElementById("c-message").value;

        let waText = `☀️ *CONSULTA WEB - SOLAR CENTAURY* ☀️\n\n`;
        waText += `👤 *Contacto:*\n`;
        waText += `- *Nombre:* ${name}\n`;
        waText += `- *Teléfono:* ${phone}\n\n`;
        waText += `🛠️ *Servicio de Interés:* ${service}\n`;
        waText += `- *Fecha Estimada:* ${date}\n`;
        waText += `- *Mensaje:* ${message}\n\n`;
        waText += `---\n_Consulta enviada desde el formulario de contacto de www.solarcentaury.cl_`;

        const encodedText = encodeURIComponent(waText);
        const waUrl = `https://wa.me/56920765348?text=${encodedText}`;

        window.open(waUrl, "_blank");
    });
}

// 9. SCROLL REVEAL ANIMATIONS
function initScrollReveal() {
    const elementInView = (el, dividend = 1) => {
        const elementTop = el.getBoundingClientRect().top;
        return (
            elementTop <= (window.innerHeight || document.documentElement.clientHeight) / dividend
        );
    };

    const displayScrollElement = (element) => {
        element.classList.add("scrolled");
    };

    const handleScrollAnimation = () => {
        const scrollElements = document.querySelectorAll(
            ".anim-fade-in:not(.scrolled), .anim-slide-in-left:not(.scrolled), .anim-slide-in-right:not(.scrolled), .anim-zoom-in:not(.scrolled)"
        );
        scrollElements.forEach((el) => {
            if (elementInView(el, 1.15)) {
                displayScrollElement(el);
            }
        });
    };

    window.addEventListener("scroll", () => {
        handleScrollAnimation();
    });

    // Run once on load
    handleScrollAnimation();
}
