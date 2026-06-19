
// ============================
// SCROLL REVEAL ANIMATION
// ============================

const revealElements = document.querySelectorAll(

    ".skill-card, .project-card, .section-title, .about-container"

);

revealElements.forEach((element) => {

    element.classList.add("fade-up");

});

const revealOnScroll = () => {

    revealElements.forEach((element) => {

        const windowHeight = window.innerHeight;

        const elementTop = element.getBoundingClientRect().top;

        const revealPoint = 100;

        if (elementTop < windowHeight - revealPoint) {

            element.classList.add("show");

        }

    });

};

window.addEventListener("scroll", revealOnScroll);

revealOnScroll();


// ============================
// NAVBAR SHADOW ON SCROLL
// ============================

window.addEventListener("scroll", () => {

    const header = document.querySelector("header");

    if (window.scrollY > 50) {

        header.style.boxShadow =
            "0 5px 20px rgba(0,0,0,0.35)";

    } else {

        header.style.boxShadow =
            "none";

    }

});


// ============================
// HERO TYPING EFFECT
// ============================

const title = document.querySelector(".hero-content h2");

const text = title.textContent; // ← Reads directly from your HTML!

title.textContent = "";

let index = 0;

function typeEffect() {

    if (!title) return;

    title.textContent = text.slice(0, index);

    index++;

    if (index <= text.length) {

        setTimeout(typeEffect, 120);

    }

}

window.addEventListener("load", typeEffect);