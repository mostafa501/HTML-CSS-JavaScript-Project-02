
// 1. MOBILE NAVIGATION

const menuIcon = document.querySelector("header nav .toggle-menu");
const navMenu = document.querySelector("header nav ul");

if (menuIcon && navMenu) {

    // Make the icon accessible by keyboard
    menuIcon.setAttribute("role", "button");
    menuIcon.setAttribute("tabindex", "0");
    menuIcon.setAttribute("aria-label", "Toggle navigation menu");
    menuIcon.setAttribute("aria-expanded", "false");

    function toggleMenu() {
        const isOpen = navMenu.classList.toggle("is-open");

        menuIcon.setAttribute("aria-expanded", String(isOpen));
    }

    function closeMenu() {
        navMenu.classList.remove("is-open");
        menuIcon.setAttribute("aria-expanded", "false");
    }

    // Open and close menu
    menuIcon.addEventListener("click", toggleMenu);

    // Keyboard support
    menuIcon.addEventListener("keydown", (event) => {
        if (event.key === "Enter" || event.key === " ") {
            event.preventDefault();
            toggleMenu();
        }
    });

    // Close when clicking a navigation link
    navMenu.querySelectorAll("a").forEach(link => {
        link.addEventListener("click", closeMenu);
    });

    // Close when clicking outside
    document.addEventListener("click", (event) => {
        if (
            navMenu.classList.contains("is-open") &&
            !navMenu.contains(event.target) &&
            !menuIcon.contains(event.target)
        ) {
            closeMenu();
        }
    });

    // Close using Escape
    document.addEventListener("keydown", (event) => {
        if (event.key === "Escape") {
            closeMenu();
        }
    });
}


// 2. ACTIVE NAVIGATION WHILE SCROLLING

const navigationLinks = document.querySelectorAll("header nav ul a");

const pageSections = document.querySelectorAll(
    ".landing, .services, .portfolio, .about, .pricing, .contact"
);

if ("IntersectionObserver" in window) {

    const sectionObserver = new IntersectionObserver((entries) => {

        entries.forEach(entry => {

            if (entry.isIntersecting) {

                const sectionId = entry.target.id;

                navigationLinks.forEach(link => {

                    link.classList.toggle(
                        "active",
                        link.getAttribute("href") === `#${sectionId}`
                    );

                });

            }

        });

    }, {
        rootMargin: "-35% 0px -55% 0px"
    });

    pageSections.forEach(section => {
        if (section.id) {
            sectionObserver.observe(section);
        }
    });
}




// 3. ANIMATE SKILLS BARS WHEN SCROLLING

const skillsSection = document.querySelector(".our-skills");

const progressBars = document.querySelectorAll(
    ".our-skills .skills .prog span"
);

if (skillsSection && progressBars.length > 0) {

    // Save the original percentages and empty the bars
    progressBars.forEach(bar => {

        const targetWidth = bar.dataset.progress;

        bar.style.width = "0%";
        bar.style.transition = "none";

        bar.dataset.targetWidth = targetWidth;

    });

    // Check whether the user prefers reduced motion
    const reducedMotion = window.matchMedia(
        "(prefers-reduced-motion: reduce)"
    ).matches;

    // Start animation when the section appears
    function animateProgressBars() {

        progressBars.forEach((bar, index) => {

            const targetWidth = bar.dataset.targetWidth;

            if (reducedMotion) {

                bar.style.width = targetWidth;

            } else {

                // Small delay between each bar
                setTimeout(() => {

                    bar.style.transition = "width 1.5s ease-in-out";

                    bar.style.width = targetWidth;

                }, index * 200);

            }

        });

    }

    // Observe the skills section
    if ("IntersectionObserver" in window) {

        const skillsObserver = new IntersectionObserver(
            (entries, observer) => {

                entries.forEach(entry => {

                    if (entry.isIntersecting) {

                        animateProgressBars();

                        // Run only once
                        observer.unobserve(entry.target);

                    }

                });

            },
            {
                threshold: 0.35
            }
        );

        skillsObserver.observe(skillsSection);

    } else {

        // Fallback for older browsers
        animateProgressBars();

    }

}
