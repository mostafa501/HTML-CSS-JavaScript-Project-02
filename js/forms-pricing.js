
// // 1. CONTACT FORM VALIDATION

// NORTHSTAR MARKET
// EMAILJS CONTACT FORM + NEWSLETTER

// STEP 1: ENTER YOUR EMAILJS ACCOUNT DETAILS

const EMAILJS_PUBLIC_KEY = "yxGq46CLjAc4jSx8-";
const EMAILJS_SERVICE_ID = "service_rv7ruzb";
const CONTACT_TEMPLATE_ID = "template_pucorlq";
const NEWSLETTER_TEMPLATE_ID = "template_fk3oran";

// STEP 2: INITIALIZE EMAILJS

const emailJsReady =
    typeof emailjs !== "undefined" &&
    EMAILJS_PUBLIC_KEY !== "YOUR_PUBLIC_KEY" &&
    EMAILJS_SERVICE_ID !== "YOUR_SERVICE_ID";

if (emailJsReady) {
    emailjs.init({
        publicKey: EMAILJS_PUBLIC_KEY
    });
} else {
    console.warn("EmailJS is not configured yet.");
}



// HELPER FUNCTIONS
// Display messages to the visitor

function showFormStatus(form, message, isError = false) {

    let status = form.querySelector(".emailjs-status");

    if (!status) {

        status = document.createElement("p");
        status.className = "emailjs-status form-feedback";

        status.setAttribute("role", "status");
        status.setAttribute("aria-live", "polite");

        form.appendChild(status);
    }

    status.textContent = message;

    status.style.color = isError ? "#d93025" : "#08796e";
}


// Disable the submit button while sending

function setFormSending(form, sending, originalText) {

    const submit = form.querySelector(
        'button[type="submit"], input[type="submit"]'
    );

    if (!submit) return;

    submit.disabled = sending;

    if (submit.tagName === "INPUT") {

        submit.value = sending ? "Sending..." : originalText;

    } else {

        submit.textContent = sending ? "Sending..." : originalText;

    }
}


// 1. CONTACT FORM
const contactForm = document.querySelector(
    ".contact .content form"
);

if (contactForm) {

    const nameInput = contactForm.querySelector(
        '[name="name"]'
    );

    const emailInput = contactForm.querySelector(
        '[name="mail"]'
    );

    const messageInput = contactForm.querySelector(
        '[name="message"]'
    );

    // All fields are required

    [nameInput, emailInput, messageInput].forEach(input => {

        if (input) {
            input.required = true;
        }

    });

    if (emailInput) {
        emailInput.type = "email";
    }

    const contactSubmit = contactForm.querySelector(
        'input[type="submit"], button[type="submit"]'
    );

    const originalContactText = contactSubmit
        ? contactSubmit.value
        : "Send Message";


    // When customer submits the contact form

    contactForm.addEventListener("submit", async event => {

        event.preventDefault();

        // Validate form

        if (!contactForm.checkValidity()) {

            contactForm.reportValidity();

            showFormStatus(
                contactForm,
                "Please complete all fields with a valid email.",
                true
            );

            return;
        }


        // Check EmailJS configuration

        if (
            !emailJsReady ||
            CONTACT_TEMPLATE_ID === "YOUR_CONTACT_TEMPLATE_ID"
        ) {

            showFormStatus(
                contactForm,
                "EmailJS is not configured yet. Please check your settings.",
                true
            );

            return;
        }


        // Collect customer information

        const templateParams = {

            from_name: nameInput.value.trim(),

            from_email: emailInput.value.trim(),

            reply_to: emailInput.value.trim(),

            message: messageInput.value.trim(),

            to_email: "mostafahanafy@gmail.com"

        };


        setFormSending(
            contactForm,
            true,
            originalContactText
        );

        showFormStatus(
            contactForm,
            "Sending your message..."
        );


        // Send email through EmailJS

        try {

            await emailjs.send(
                EMAILJS_SERVICE_ID,
                CONTACT_TEMPLATE_ID,
                templateParams
            );

            showFormStatus(
                contactForm,
                "Thank you! Your message has been sent successfully."
            );

            contactForm.reset();

        } catch (error) {

            console.error("Contact EmailJS Error:", error);

            showFormStatus(
                contactForm,
                "Sorry! Your message could not be sent. Please try again.",
                true
            );

        } finally {

            setFormSending(
                contactForm,
                false,
                originalContactText
            );

        }

    });

}


// 2. NEWSLETTER SUBSCRIPTION

const subscribeForm = document.querySelector(
    ".subscribe form"
);

if (subscribeForm) {

    const newsletterEmail = subscribeForm.querySelector(
        'input[type="email"]'
    );

    if (newsletterEmail) {
        newsletterEmail.required = true;
    }

    const newsletterSubmit = subscribeForm.querySelector(
        'input[type="submit"], button[type="submit"]'
    );

    const originalNewsletterText = newsletterSubmit
        ? newsletterSubmit.value
        : "Subscribe";


    // Customer subscribes

    subscribeForm.addEventListener("submit", async event => {

        event.preventDefault();


        // Validate email

        if (!subscribeForm.checkValidity()) {

            subscribeForm.reportValidity();

            showFormStatus(
                subscribeForm,
                "Please enter a valid email address.",
                true
            );

            return;
        }


        // Check configuration

        if (
            !emailJsReady ||
            NEWSLETTER_TEMPLATE_ID === "YOUR_NEWSLETTER_TEMPLATE_ID"
        ) {

            showFormStatus(
                subscribeForm,
                "Newsletter EmailJS is not configured yet.",
                true
            );

            return;
        }


        // Collect subscriber email

        const templateParams = {

            subscriber_email: newsletterEmail.value.trim(),

            reply_to: newsletterEmail.value.trim(),

            to_email: "mostafahanafy@gmail.com"

        };


        setFormSending(
            subscribeForm,
            true,
            originalNewsletterText
        );

        showFormStatus(
            subscribeForm,
            "Submitting your subscription..."
        );


        // Send subscription email

        try {

            await emailjs.send(
                EMAILJS_SERVICE_ID,
                NEWSLETTER_TEMPLATE_ID,
                templateParams
            );

            showFormStatus(
                subscribeForm,
                "Thank you! Your subscription request has been received."
            );

            subscribeForm.reset();

        } catch (error) {

            console.error("Newsletter EmailJS Error:", error);

            showFormStatus(
                subscribeForm,
                "Sorry! We could not process your subscription. Please try again.",
                true
            );

        } finally {

            setFormSending(
                subscribeForm,
                false,
                originalNewsletterText
            );

        }

    });

}


// 3. PRICING PLAN BUTTONS

const pricingButtons = document.querySelectorAll(
    ".pricing .plans .plan .foot a"
);

const contactMessage = document.querySelector(
    '.contact textarea[name="message"]'
);

pricingButtons.forEach(button => {

    button.addEventListener("click", event => {

        event.preventDefault();

        const plan = button
            .closest(".plan")
            .querySelector(".head h3")
            .textContent.trim();

        if (contactMessage) {

            contactMessage.value =
                `Hello, I am interested in the ${plan} product bundle. Please send me more information.`;

        }

        document.querySelector(".contact")?.scrollIntoView({
            behavior: "smooth"
        });

    });

});


// 4. PRICING CONTACT BUTTON

const pricingContactButton = document.querySelector(
    ".pricing .contact-link"
);

if (pricingContactButton) {

    pricingContactButton.addEventListener("click", event => {

        event.preventDefault();

        document.querySelector(".contact")?.scrollIntoView({
            behavior: "smooth"
        });

    });

}