
// TESTIMONIALS SLIDER

const testimonialSection = document.querySelector(
    ".our-skills .testimonials"
);

if (testimonialSection) {

    const testimonials = [
        ...testimonialSection.querySelectorAll(".content")
    ];

    const bullets = [
        ...testimonialSection.querySelectorAll(".bullets li")
    ];

    let currentTestimonial = 0;
    let testimonialTimer;

    // Match number of bullets to testimonials
    bullets.forEach((bullet, index) => {
        bullet.hidden = index >= testimonials.length;
    });

    function showTestimonial(index) {

        if (testimonials.length === 0) return;

        currentTestimonial =
            (index + testimonials.length) % testimonials.length;

        testimonials.forEach((testimonial, i) => {

            testimonial.hidden = i !== currentTestimonial;

        });

        bullets.forEach((bullet, i) => {

            bullet.classList.toggle(
                "active",
                i === currentTestimonial
            );

        });

    }

    function startTestimonials() {

        clearInterval(testimonialTimer);

        if (
            testimonials.length > 1 &&
            !window.matchMedia("(prefers-reduced-motion: reduce)").matches
        ) {

            testimonialTimer = setInterval(() => {

                showTestimonial(currentTestimonial + 1);

            }, 6000);

        }

    }

    bullets.forEach((bullet, index) => {

        bullet.addEventListener("click", () => {

            showTestimonial(index);
            startTestimonials();

        });

    });

    showTestimonial(0);
    startTestimonials();

    document.addEventListener("visibilitychange", () => {

        if (document.hidden) {
            clearInterval(testimonialTimer);
        } else {
            startTestimonials();
        }

    });

}
