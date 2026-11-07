
// LANDING SLIDER

const landing = document.querySelector(".landing");

if (landing) {

    const heading = landing.querySelector(".text h2");
    const paragraph = landing.querySelector(".text p");

    const prevButton = landing.querySelector(".fa-angle-left");
    const nextButton = landing.querySelector(".fa-angle-right");

    const bullets = [...landing.querySelectorAll(".bullets li")];

    const slides = [

    {
        title: "Discover Products<br>You’ll Love.",
        description:
            "Explore a considered range of everyday essentials, smart technology and useful finds for your home and lifestyle."
    },
    {
        title: "Everyday Essentials.<br>Thoughtfully Selected.",
        description:
            "Discover practical products, modern accessories and useful solutions designed to make everyday life easier."
    },
    {
        title: "Find Your Next<br>Favorite Product.",
        description:
            "Browse our collections, compare your options and discover products that fit your needs and lifestyle."
    }

    ];


    let currentSlide = 0;
    let sliderTimer;

    function showSlide(index) {

        currentSlide = (index + slides.length) % slides.length;

        heading.innerHTML = slides[currentSlide].title;
        paragraph.textContent = slides[currentSlide].description;

        bullets.forEach((bullet, i) => {

            bullet.classList.toggle(
                "active",
                i === currentSlide
            );

        });

    }

    function nextSlide() {
        showSlide(currentSlide + 1);
    }

    function previousSlide() {
        showSlide(currentSlide - 1);
    }

    function startSlider() {

        clearInterval(sliderTimer);

        if (!window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
            sliderTimer = setInterval(nextSlide, 5000);
        }

    }

    function restartSlider() {
        startSlider();
    }

    if (nextButton) {
        nextButton.setAttribute("role", "button");
        nextButton.setAttribute("tabindex", "0");
        nextButton.setAttribute("aria-label", "Next slide");

        nextButton.addEventListener("click", () => {
            nextSlide();
            restartSlider();
        });
    }

    if (prevButton) {
        prevButton.setAttribute("role", "button");
        prevButton.setAttribute("tabindex", "0");
        prevButton.setAttribute("aria-label", "Previous slide");

        prevButton.addEventListener("click", () => {
            previousSlide();
            restartSlider();
        });
    }

    bullets.forEach((bullet, index) => {

        bullet.setAttribute("role", "button");
        bullet.setAttribute("tabindex", "0");
        bullet.setAttribute("aria-label", `Go to slide ${index + 1}`);

        bullet.addEventListener("click", () => {
            showSlide(index);
            restartSlider();
        });

    });

    showSlide(0);
    startSlider();

    // Pause when the browser tab is hidden
    document.addEventListener("visibilitychange", () => {

        if (document.hidden) {
            clearInterval(sliderTimer);
        } else {
            startSlider();
        }

    });

}
