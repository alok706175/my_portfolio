/* ========================================================
   ALOK KUMAR PORTFOLIO - MODERN ANIMATIONS & CANVAS
   ======================================================== */

document.addEventListener("DOMContentLoaded", () => {
    initAmbientCanvas();
    initTypingEffect();
    initScrollAnimations();
    initNavbarScroll();
    initStatsCounter();
});

/* ========================================================
   1. AMBIENT PARTICLES CANVAS
   ======================================================== */
function initAmbientCanvas() {
    const canvas = document.getElementById("ambientCanvas");
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    let particles = [];
    const particleCount = Math.min(Math.floor(width * 0.045), 55);
    const mouse = { x: null, y: null, radius: 140 };

    window.addEventListener("resize", () => {
        width = canvas.width = window.innerWidth;
        height = canvas.height = window.innerHeight;
        createParticles();
    });

    window.addEventListener("mousemove", (e) => {
        mouse.x = e.clientX;
        mouse.y = e.clientY;
    });

    window.addEventListener("mouseout", () => {
        mouse.x = null;
        mouse.y = null;
    });

    class Particle {
        constructor() {
            this.x = Math.random() * width;
            this.y = Math.random() * height;
            this.size = Math.random() * 2 + 1;
            this.speedX = (Math.random() - 0.5) * 0.6;
            this.speedY = (Math.random() - 0.5) * 0.6;
            this.color = Math.random() > 0.4 ? "rgba(56, 189, 248, " : "rgba(99, 102, 241, ";
            this.alpha = Math.random() * 0.4 + 0.15;
        }

        update() {
            this.x += this.speedX;
            this.y += this.speedY;

            if (this.x < 0) this.x = width;
            if (this.x > width) this.x = 0;
            if (this.y < 0) this.y = height;
            if (this.y > height) this.y = 0;

            // Mouse repulsion/interaction
            if (mouse.x !== null && mouse.y !== null) {
                const dx = mouse.x - this.x;
                const dy = mouse.y - this.y;
                const distance = Math.sqrt(dx * dx + dy * dy);
                if (distance < mouse.radius) {
                    const force = (mouse.radius - distance) / mouse.radius;
                    const directionX = dx / distance;
                    const directionY = dy / distance;
                    this.x -= directionX * force * 1.5;
                    this.y -= directionY * force * 1.5;
                }
            }
        }

        draw() {
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
            ctx.fillStyle = this.color + this.alpha + ")";
            ctx.shadowBlur = 8;
            ctx.shadowColor = "rgba(56, 189, 248, 0.4)";
            ctx.fill();
            ctx.shadowBlur = 0;
        }
    }

    function createParticles() {
        particles = [];
        for (let i = 0; i < particleCount; i++) {
            particles.push(new Particle());
        }
    }

    function connectParticles() {
        const maxDist = 120;
        for (let a = 0; a < particles.length; a++) {
            for (let b = a + 1; b < particles.length; b++) {
                const dx = particles[a].x - particles[b].x;
                const dy = particles[a].y - particles[b].y;
                const distance = Math.sqrt(dx * dx + dy * dy);

                if (distance < maxDist) {
                    const opacity = (1 - distance / maxDist) * 0.18;
                    ctx.strokeStyle = `rgba(56, 189, 248, ${opacity})`;
                    ctx.lineWidth = 0.8;
                    ctx.beginPath();
                    ctx.moveTo(particles[a].x, particles[a].y);
                    ctx.lineTo(particles[b].x, particles[b].y);
                    ctx.stroke();
                }
            }
        }
    }

    createParticles();

    function animate() {
        ctx.clearRect(0, 0, width, height);
        for (let i = 0; i < particles.length; i++) {
            particles[i].update();
            particles[i].draw();
        }
        connectParticles();
        requestAnimationFrame(animate);
    }

    animate();
}

/* ========================================================
   2. DYNAMIC MULTI-PHRASE TYPING EFFECT
   ======================================================== */
function initTypingEffect() {
    const textElement = document.getElementById("typedText");
    if (!textElement) return;

    const phrases = [
        "Full Stack Developer",
        "Java & Spring Boot Engineer",
        "React & Frontend Specialist",
        "Computer Science Student",
        "Problem Solver & Coder"
    ];

    let phraseIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    let typeSpeed = 100;

    function typeLoop() {
        const currentPhrase = phrases[phraseIndex];

        if (isDeleting) {
            textElement.textContent = currentPhrase.substring(0, charIndex - 1);
            charIndex--;
            typeSpeed = 45;
        } else {
            textElement.textContent = currentPhrase.substring(0, charIndex + 1);
            charIndex++;
            typeSpeed = 100;
        }

        if (!isDeleting && charIndex === currentPhrase.length) {
            isDeleting = true;
            typeSpeed = 1800; // Pause at end of word
        } else if (isDeleting && charIndex === 0) {
            isDeleting = false;
            phraseIndex = (phraseIndex + 1) % phrases.length;
            typeSpeed = 450; // Pause before new word
        }

        setTimeout(typeLoop, typeSpeed);
    }

    typeLoop();
}

/* ========================================================
   3. SCROLL REVEAL ANIMATIONS (INTERSECTION OBSERVER)
   ======================================================== */
function initScrollAnimations() {
    const targets = document.querySelectorAll(
        ".section-header, .about-narrative, .about-details-grid, .skill-card, .project-card, .timeline-item, .contact-card, #contactForm"
    );

    targets.forEach((el, index) => {
        el.classList.add("reveal");
    });

    const observer = new IntersectionObserver(
        (entries, obs) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    entry.target.classList.add("active");
                    obs.unobserve(entry.target);
                }
            });
        },
        {
            threshold: 0.12,
            rootMargin: "0px 0px -40px 0px"
        }
    );

    targets.forEach((el) => observer.observe(el));
}

/* ========================================================
   4. NAVBAR SCROLL & SCROLLSPY
   ======================================================== */
function initNavbarScroll() {
    const header = document.getElementById("siteHeader");
    const sections = document.querySelectorAll("section[id]");
    const navItems = document.querySelectorAll(".nav-item");

    window.addEventListener("scroll", () => {
        const scrollY = window.pageYOffset;

        // Shrink header & blur
        if (header) {
            if (scrollY > 50) {
                header.classList.add("scrolled");
            } else {
                header.classList.remove("scrolled");
            }
        }

        // ScrollSpy: Highlight active nav link
        let currentSectionId = "";
        sections.forEach((section) => {
            const sectionTop = section.offsetTop - 140;
            const sectionHeight = section.offsetHeight;
            if (scrollY >= sectionTop && scrollY < sectionTop + sectionHeight) {
                currentSectionId = section.getAttribute("id");
            }
        });

        navItems.forEach((link) => {
            link.classList.remove("active");
            if (link.getAttribute("href") === `#${currentSectionId}`) {
                link.classList.add("active");
            }
        });
    });
}

/* ========================================================
   5. STAT NUMBERS COUNTER ANIMATION
   ======================================================== */
function initStatsCounter() {
    const statItems = document.querySelectorAll(".stat-item");
    if (!statItems.length) return;

    let hasCounted = false;

    const countUp = () => {
        statItems.forEach((item) => {
            const target = parseInt(item.getAttribute("data-target"), 10);
            const counterSpan = item.querySelector(".counter");
            if (!counterSpan || isNaN(target)) return;

            let current = 0;
            const increment = target / 35;
            const timer = setInterval(() => {
                current += increment;
                if (current >= target) {
                    counterSpan.textContent = target;
                    clearInterval(timer);
                } else {
                    counterSpan.textContent = Math.ceil(current);
                }
            }, 30);
        });
    };

    const observer = new IntersectionObserver((entries, obs) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting && !hasCounted) {
                hasCounted = true;
                countUp();
                obs.disconnect();
            }
        });
    }, { threshold: 0.3 });

    observer.observe(statItems[0]);
}