/* ========================================================
   ALOK KUMAR PORTFOLIO - CORE APPLICATION LOGIC
   ======================================================== */

document.addEventListener("DOMContentLoaded", () => {
    initMobileMenu();
    initSkillFiltering();
    initProjectFiltering();
    initProjectModals();
    initContactForm();
    initBackToTop();
});

/* ========================================================
   1. MOBILE DRAWER NAVIGATION
   ======================================================== */
function initMobileMenu() {
    const menuBtn = document.getElementById("menuToggle");
    const navLinks = document.getElementById("navLinks");
    if (!menuBtn || !navLinks) return;

    function toggleMenu() {
        const isOpen = navLinks.classList.contains("active");
        navLinks.classList.toggle("active");
        menuBtn.classList.toggle("active");
        menuBtn.setAttribute("aria-expanded", !isOpen);
        document.body.style.overflow = isOpen ? "" : "hidden";
    }

    function closeMenu() {
        navLinks.classList.remove("active");
        menuBtn.classList.remove("active");
        menuBtn.setAttribute("aria-expanded", "false");
        document.body.style.overflow = "";
    }

    menuBtn.addEventListener("click", toggleMenu);

    // Close when clicking nav link
    document.querySelectorAll(".nav-item").forEach((link) => {
        link.addEventListener("click", closeMenu);
    });

    // Close when clicking outside
    document.addEventListener("click", (e) => {
        if (
            navLinks.classList.contains("active") &&
            !navLinks.contains(e.target) &&
            !menuBtn.contains(e.target)
        ) {
            closeMenu();
        }
    });

    // Close on Escape key
    document.addEventListener("keydown", (e) => {
        if (e.key === "Escape" && navLinks.classList.contains("active")) {
            closeMenu();
        }
    });
}

/* ========================================================
   2. SKILLS CATEGORY FILTERING
   ======================================================== */
function initSkillFiltering() {
    const filterButtons = document.querySelectorAll(".skills-filter-bar .filter-btn");
    const skillCards = document.querySelectorAll(".skill-card");

    if (!filterButtons.length || !skillCards.length) return;

    filterButtons.forEach((btn) => {
        btn.addEventListener("click", () => {
            filterButtons.forEach((b) => b.classList.remove("active"));
            btn.classList.add("active");

            const filter = btn.getAttribute("data-filter");

            skillCards.forEach((card) => {
                const category = card.getAttribute("data-category");
                if (filter === "all" || category === filter) {
                    card.style.display = "flex";
                    setTimeout(() => {
                        card.style.opacity = "1";
                        card.style.transform = "translateY(0)";
                    }, 30);
                } else {
                    card.style.opacity = "0";
                    card.style.transform = "scale(0.95)";
                    setTimeout(() => {
                        card.style.display = "none";
                    }, 250);
                }
            });
        });
    });
}

/* ========================================================
   3. PROJECTS CATEGORY FILTERING
   ======================================================== */
function initProjectFiltering() {
    const filterButtons = document.querySelectorAll(".project-filter-bar .proj-filter-btn");
    const projectCards = document.querySelectorAll(".project-card");

    if (!filterButtons.length || !projectCards.length) return;

    filterButtons.forEach((btn) => {
        btn.addEventListener("click", () => {
            filterButtons.forEach((b) => b.classList.remove("active"));
            btn.classList.add("active");

            const filter = btn.getAttribute("data-filter");

            projectCards.forEach((card) => {
                const category = card.getAttribute("data-category");
                if (filter === "all" || category === filter) {
                    card.style.display = "flex";
                    setTimeout(() => {
                        card.style.opacity = "1";
                        card.style.transform = "translateY(0)";
                    }, 30);
                } else {
                    card.style.opacity = "0";
                    card.style.transform = "scale(0.95)";
                    setTimeout(() => {
                        card.style.display = "none";
                    }, 250);
                }
            });
        });
    });
}

/* ========================================================
   4. PROJECT DETAILS MODAL
   ======================================================== */
const PROJECT_DETAILS = {
    "student-mgmt": {
        title: "Student Management System",
        category: "Full Stack Java Application",
        image: "images/projects/student-mgmt.jpg",
        description:
            "A comprehensive enterprise platform engineered to streamline academic administration, track student lifecycle analytics, handle course registrations, and manage fee/attendance records.",
        features: [
            "Built with Java and Spring Boot backend architecture implementing RESTful API design.",
            "Hibernate / Spring Data JPA for object-relational mapping and entity persistence.",
            "Relational MySQL database with optimized index querying and transactional integrity.",
            "Intuitive administrative dashboard with student enrollment metrics and attendance trends."
        ],
        technologies: ["Java", "Spring Boot", "MySQL", "Hibernate", "REST APIs", "Maven"],
        github: "https://github.com/alok706175"
    },
    "weather-app": {
        title: "Dynamic Weather Forecast App",
        category: "Frontend Web Application",
        image: "images/projects/weather-app.jpg",
        description:
            "An interactive meteorological web application providing real-time conditions, multi-day forecasting, humidity and wind speeds, and visual temperature graphs.",
        features: [
            "Asynchronous HTTP requests leveraging Fetch API to consume live OpenWeather API endpoints.",
            "Dynamic client-side UI updating with glassmorphism card themes based on live weather states.",
            "City search with geolocation detection, auto-complete queries, and error fallback states.",
            "Fully responsive fluid grid ensuring seamless experience from mobile to 4K displays."
        ],
        technologies: ["JavaScript ES6+", "REST API", "HTML5", "Modern CSS", "Async/Await"],
        github: "https://github.com/alok706175"
    },
    "ecommerce-app": {
        title: "E-Commerce & Product Store",
        category: "Full Stack Web Application",
        image: "images/projects/ecommerce-app.jpg",
        description:
            "A scalable e-commerce platform offering rich catalog browsing, category filtering, cart state persistence, checkout order processing, and admin inventory control.",
        features: [
            "React-based component architecture with dynamic state management and instant search filters.",
            "Spring Boot RESTful microservices managing product inventory, orders, and customer accounts.",
            "MySQL relational schema for relational order histories and product variant catalogs.",
            "Responsive product card layout with shopping cart drawer and quick view animations."
        ],
        technologies: ["React", "Spring Boot", "REST APIs", "MySQL", "CSS3", "Git"],
        github: "https://github.com/alok706175"
    },
    "portfolio-v2": {
        title: "Modern Glassmorphism Portfolio",
        category: "Personal Portfolio & Showcase",
        image: "images/projects/portfolio-v2.jpg",
        description:
            "A high-performance modern developer portfolio showcasing projects, technical competencies, and contact touchpoints with dynamic visual aesthetics.",
        features: [
            "Pure HTML5 & Vanilla CSS architecture for lightning-fast 100/100 Lighthouse performance.",
            "Interactive HTML5 Canvas ambient particle system with mouse interaction physics.",
            "Secure multi-recipient EmailJS email delivery integration with automatic visitor confirmation.",
            "Mobile-first responsive drawer menu and accessible semantic structure."
        ],
        technologies: ["HTML5", "Modern CSS", "JavaScript", "EmailJS API", "Canvas 2D"],
        github: "https://github.com/alok706175"
    }
};

function initProjectModals() {
    const modal = document.getElementById("projectModal");
    const backdrop = document.getElementById("modalBackdrop");
    const closeBtn = document.getElementById("modalCloseBtn");
    const dismissBtn = document.getElementById("modalDismissBtn");

    const modalImg = document.getElementById("modalImg");
    const modalCategory = document.getElementById("modalCategory");
    const modalTitle = document.getElementById("modalTitle");
    const modalDesc = document.getElementById("modalDesc");
    const modalFeatures = document.getElementById("modalFeatures");
    const modalTags = document.getElementById("modalTags");
    const modalGithubBtn = document.getElementById("modalGithubBtn");

    if (!modal) return;

    function openModal(projectId) {
        const data = PROJECT_DETAILS[projectId];
        if (!data) return;

        modalImg.src = data.image;
        modalImg.alt = data.title;
        modalCategory.textContent = data.category;
        modalTitle.textContent = data.title;
        modalDesc.textContent = data.description;

        modalFeatures.innerHTML = data.features.map((f) => `<li>${f}</li>`).join("");
        modalTags.innerHTML = data.technologies.map((t) => `<span>${t}</span>`).join("");
        modalGithubBtn.href = data.github;

        modal.classList.add("active");
        modal.setAttribute("aria-hidden", "false");
        document.body.style.overflow = "hidden";
    }

    function closeModal() {
        modal.classList.remove("active");
        modal.setAttribute("aria-hidden", "true");
        document.body.style.overflow = "";
    }

    // Trigger buttons
    document.querySelectorAll(".view-details-trigger, .view-project-btn").forEach((btn) => {
        btn.addEventListener("click", () => {
            const card = btn.closest(".project-card");
            if (card) {
                const id = card.getAttribute("data-id");
                openModal(id);
            }
        });
    });

    if (closeBtn) closeBtn.addEventListener("click", closeModal);
    if (dismissBtn) dismissBtn.addEventListener("click", closeModal);
    if (backdrop) backdrop.addEventListener("click", closeModal);

    document.addEventListener("keydown", (e) => {
        if (e.key === "Escape" && modal.classList.contains("active")) {
            closeModal();
        }
    });
}

/* ========================================================
   5. CONTACT FORM & EMAILJS INTEGRATION
   ======================================================== */
function initContactForm() {
    // Initialize EmailJS
    try {
        if (window.emailjs && typeof EMAILJS_CONFIG !== "undefined") {
            emailjs.init(EMAILJS_CONFIG.PUBLIC_KEY);
        }
    } catch (err) {
        console.error("EmailJS failed to initialize:", err);
    }

    const form = document.getElementById("contactForm");
    if (!form) return;

    const nameInput = document.getElementById("name");
    const emailInput = document.getElementById("email");
    const phoneInput = document.getElementById("phone");
    const messageInput = document.getElementById("message");

    const nameError = document.getElementById("nameError");
    const emailError = document.getElementById("emailError");
    const phoneError = document.getElementById("phoneError");

    const submitBtn = document.getElementById("submitBtn");
    const btnText = submitBtn.querySelector(".btn-text");

    const successPopup = document.getElementById("successPopup");
    const closePopup = document.getElementById("closePopup");

    const errorPopup = document.getElementById("errorPopup");
    const closeErrorPopup = document.getElementById("closeErrorPopup");

    // Real-time Validation Handlers
    function validateName() {
        const val = nameInput.value.trim();
        if (!val) {
            nameError.textContent = "Please enter your name.";
            return false;
        } else if (val.length < 3) {
            nameError.textContent = "Name must be at least 3 characters.";
            return false;
        }
        nameError.textContent = "";
        return true;
    }

    function validateEmail() {
        const val = emailInput.value.trim();
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!val) {
            emailError.textContent = "Please enter your email address.";
            return false;
        } else if (!emailRegex.test(val)) {
            emailError.textContent = "Please enter a valid email address.";
            return false;
        }
        emailError.textContent = "";
        return true;
    }

    function validatePhone() {
        const val = phoneInput.value.trim();
        const phoneRegex = /^[0-9]{10}$/;
        if (!val) {
            phoneError.textContent = "Please enter your 10-digit contact number.";
            return false;
        } else if (!phoneRegex.test(val)) {
            phoneError.textContent = "Must be exactly 10 digits (0-9).";
            return false;
        }
        phoneError.textContent = "";
        return true;
    }

    if (nameInput) nameInput.addEventListener("input", validateName);
    if (emailInput) emailInput.addEventListener("input", validateEmail);
    if (phoneInput) phoneInput.addEventListener("input", validatePhone);

    form.addEventListener("submit", async (e) => {
        e.preventDefault();

        const isNameValid = validateName();
        const isEmailValid = validateEmail();
        const isPhoneValid = validatePhone();

        if (!isNameValid || !isEmailValid || !isPhoneValid) {
            return;
        }

        submitBtn.disabled = true;
        submitBtn.classList.add("loading");
        btnText.textContent = "Sending...";

        const waitTimer = setTimeout(() => {
            btnText.textContent = "Connecting to mail server...";
        }, 4000);

        const templateParams = {
            from_name: nameInput.value.trim(),
            from_email: emailInput.value.trim(),
            contact: phoneInput.value.trim(),
            message: messageInput.value.trim() || "No message provided",
            sent_time: new Date().toLocaleString()
        };

        try {
            // 1. Send notification to Alok
            await emailjs.send(
                EMAILJS_CONFIG.SERVICE_ID,
                EMAILJS_CONFIG.TEMPLATE_TO_ME,
                templateParams
            );

            // Rate-limit buffer
            await new Promise((res) => setTimeout(res, 1000));

            // 2. Auto-reply to sender
            try {
                await emailjs.send(
                    EMAILJS_CONFIG.SERVICE_ID,
                    EMAILJS_CONFIG.TEMPLATE_TO_SENDER,
                    templateParams
                );
            } catch (autoErr) {
                console.warn("Auto-reply response warning:", autoErr);
            }

            clearTimeout(waitTimer);
            if (successPopup) successPopup.classList.add("show");
            form.reset();
        } catch (mailErr) {
            clearTimeout(waitTimer);
            console.error("Main email delivery failed:", mailErr);
            if (errorPopup) errorPopup.classList.add("show");
        } finally {
            clearTimeout(waitTimer);
            submitBtn.disabled = false;
            submitBtn.classList.remove("loading");
            btnText.textContent = "Send Message";
        }
    });

    if (closePopup && successPopup) {
        closePopup.addEventListener("click", () => {
            successPopup.classList.remove("show");
        });
    }

    if (closeErrorPopup && errorPopup) {
        closeErrorPopup.addEventListener("click", () => {
            errorPopup.classList.remove("show");
        });
    }
}

/* ========================================================
   6. BACK TO TOP BUTTON WITH SCROLL PROGRESS
   ======================================================== */
function initBackToTop() {
    const backToTopBtn = document.getElementById("backToTop");
    const circle = document.querySelector(".progress-ring__circle");
    if (!backToTopBtn || !circle) return;

    const circumference = 2 * Math.PI * 20; // r = 20 => ~125.6
    circle.style.strokeDasharray = `${circumference} ${circumference}`;

    window.addEventListener("scroll", () => {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        const scrollHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
        const scrollPercent = scrollTop / scrollHeight;

        if (scrollTop > 300) {
            backToTopBtn.classList.add("show");
        } else {
            backToTopBtn.classList.remove("show");
        }

        const offset = circumference - scrollPercent * circumference;
        circle.style.strokeDashoffset = offset;
    });

    backToTopBtn.addEventListener("click", () => {
        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });
    });
}