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

const successPopup = document.getElementById("successPopup");
const closePopup = document.getElementById("closePopup");

const errorPopup = document.getElementById("errorPopup");
const closeErrorPopup = document.getElementById("closeErrorPopup");

const submitButton = form.querySelector('button[type="submit"]');

const nameInput = document.getElementById("name");
const emailInput = document.getElementById("email");
const contactInput = document.getElementById("phone");

// 1. Name Validation
if (nameInput) {
    nameInput.addEventListener("invalid", () => {
        if (nameInput.value.trim() === '') nameInput.setCustomValidity('Please enter your name');
    });
    nameInput.addEventListener("input", () => {
        if (nameInput.value.trim() === '') {
            nameInput.setCustomValidity('Please enter your name');
        } else if (nameInput.value.trim().length < 3) {
            nameInput.setCustomValidity('Please enter a valid name (at least 3 characters)');
        } else {
            nameInput.setCustomValidity('');
        }
    });
}

// 2. Email Validation
if (emailInput) {
    emailInput.addEventListener("invalid", () => {
        if (emailInput.value.trim() === '') emailInput.setCustomValidity('Please enter your email id');
    });
    emailInput.addEventListener("input", () => {
        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (emailInput.value.trim() === '') {
            emailInput.setCustomValidity('Please enter your email id');
        } else if (!emailPattern.test(emailInput.value)) {
            emailInput.setCustomValidity('Please enter valid email id');
        } else {
            emailInput.setCustomValidity('');
        }
    });
}

// 3. Contact Number Validation
if (contactInput) {
    contactInput.addEventListener("invalid", () => {
        if (contactInput.value.trim() === '') contactInput.setCustomValidity('Please enter your contact number');
    });
    contactInput.addEventListener("input", () => {
        const phonePattern = /^[0-9]{10}$/;
        if (contactInput.value.trim() === '') {
            contactInput.setCustomValidity('Please enter your contact number');
        } else if (!phonePattern.test(contactInput.value)) {
            contactInput.setCustomValidity('Please enter valid contact number');
        } else {
            contactInput.setCustomValidity('');
        }
    });
}


form.addEventListener("submit", async (e) => {

    e.preventDefault();

    if (!form.checkValidity()){
        form.reportValidity();
        return;
    }

    submitButton.disabled = true;
    submitButton.textContent = "Sending...";

    const waitMessageTimer = setTimeout(() => {
        submitButton.textContent = "Please wait for a few seconds...";
    }, 5000);

    const name = nameInput.value.trim();
    const email = emailInput.value.trim();
    const contact = contactInput.value.trim();

 
    const messageInput = document.getElementById("message");

    const message =
        messageInput.value.trim() ||
        "No message provided";


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

        // EmailJS rate limit ke liye thoda wait
        await new Promise(resolve => setTimeout(resolve, 1100));

        // Auto-reply ko alag handle karenge
    try {

        // Auto Reply to Visitor
        await emailjs.send(
            EMAILJS_CONFIG.SERVICE_ID,
            EMAILJS_CONFIG.TEMPLATE_TO_SENDER,
            templateParams
        );

    } catch (autoReplyError) {

        // Auto-reply me response error aaye to
        // poore form ko failed nahi batayenge
        console.warn("Auto-reply response error:", autoReplyError);

    }

        // alert(
        //     "Thanks for contacting! Your message has been sent successfully."
        // );
    clearTimeout(waitMessageTimer);

    if (successPopup) {
        successPopup.classList.add("show");
    }

    form.reset();

    nameInput.setCustomValidity("");
    emailInput.setCustomValidity("");
    contactInput.setCustomValidity("");

} catch (mainEmailError) {

    clearTimeout(waitMessageTimer);

    console.error("Main email failed:", mainEmailError);

    if (errorPopup) {
        errorPopup.classList.add("show");
    }

} finally {

    clearTimeout(waitMessageTimer);

    submitButton.disabled = false;
    submitButton.textContent = "Send Message";

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