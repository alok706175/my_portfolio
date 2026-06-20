
// ============================
// MOBILE MENU
// ============================

const menuBtn = document.querySelector(".menu-btn");
const navLinks = document.querySelector(".nav-links");

menuBtn.addEventListener("click", () => {
    navLinks.classList.toggle("active");
    menuBtn.textContent = navLinks.classList.contains("active") ? "✕" : "☰";
});




// ============================
// EMAILJS INITIALIZATION
// ============================
try {
    emailjs.init(EMAILJS_CONFIG.PUBLIC_KEY);
} catch (err) {
    console.error("EmailJS failed to initialize:", err);
}




// ============================
// CONTACT FORM
// ============================

const form = document.getElementById("contactForm");

form.addEventListener("submit", async (e) => {

    e.preventDefault();

    const name = document.getElementById("name").value;

    const email = document.getElementById("email").value;

    const contact = document.getElementById("contact").value.trim();

 
    const message =
    document.getElementById("message").value ||
    "No message provided";

    if (name.trim().length < 3) {
        alert("Please enter a valid name.");
    return;
    }

    const emailPattern =
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    const phonePattern =
    /^[0-9]{10}$/;

    if (!emailPattern.test(email)) {
    alert("Please Enter a Valid E-mail ID.");
    return;
    }

    if (!phonePattern.test(contact)) {
    alert("Please Enter a Valid Contact Number.");
    return;
    }

    const templateParams = {

        from_name: name,

        from_email: email,

        contact: contact,

        message: message,

        sent_time: new Date().toLocaleString()

    };

    try {

        // Email to You

        await emailjs.send(
            EMAILJS_CONFIG.SERVICE_ID,
            EMAILJS_CONFIG.TEMPLATE_TO_ME,
            templateParams
        );

        // Auto Reply to Visitor

        await emailjs.send(
            EMAILJS_CONFIG.SERVICE_ID,
            EMAILJS_CONFIG.TEMPLATE_TO_SENDER,
            templateParams
        );

        alert(
            "Thanks for contacting! Your message has been sent successfully."
        );

        form.reset();

    } catch (error) {

        console.error(error);

        alert(
            "Failed to send message. Please try again later."
        );

    }

});


// ============================
// CLOSE MENU AFTER CLICK
// ============================

document.querySelectorAll(".nav-links a").forEach(link => {
    link.addEventListener("click", () => {
        navLinks.classList.remove("active");
        menuBtn.textContent = "☰";
    });
});

// ============================
// HIDE SOCIALS ON SCROLL UP
// ============================

const floatingSocials = document.querySelector(".floating-socials");
let lastScrollY = window.scrollY;

window.addEventListener("scroll", () => {
    const currentScrollY = window.scrollY;

    if (currentScrollY > lastScrollY) {
        // Scrolling DOWN — hide
        floatingSocials.style.opacity = "0";
        floatingSocials.style.pointerEvents = "none";
    } else {
        // Scrolling UP — show
        floatingSocials.style.opacity = "1";
        floatingSocials.style.pointerEvents = "auto";
    }

    lastScrollY = currentScrollY;
});