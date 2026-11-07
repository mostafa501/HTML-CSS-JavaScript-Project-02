
// 1. ANIMATED STATISTICS

const statsSection = document.querySelector(".stats");

if (statsSection) {

    const counters = statsSection.querySelectorAll(".number");

    let countersStarted = false;

    function animateCounter(counter) {

        const target = Number(
            counter.textContent.replace(/,/g, "")
        );

        if (!Number.isFinite(target)) return;

        const duration = 2000;
        const startTime = performance.now();

        function updateCounter(currentTime) {

            const progress = Math.min(
                (currentTime - startTime) / duration,
                1
            );

            // Smooth easing
            const easedProgress = 1 - Math.pow(1 - progress, 3);

            const currentValue = Math.floor(
                target * easedProgress
            );

            counter.textContent =
                currentValue.toLocaleString("en-US");

            if (progress < 1) {

                requestAnimationFrame(updateCounter);

            } else {

                counter.textContent =
                    target.toLocaleString("en-US");

            }

        }

        requestAnimationFrame(updateCounter);

    }

    if ("IntersectionObserver" in window) {

        const statsObserver = new IntersectionObserver(entries => {

            entries.forEach(entry => {

                if (entry.isIntersecting && !countersStarted) {

                    countersStarted = true;

                    counters.forEach(animateCounter);

                    statsObserver.disconnect();

                }

            });

        }, { threshold: 0.3 });

        statsObserver.observe(statsSection);

    } else {

        counters.forEach(animateCounter);

    }

}


// 2. ANIMATED SKILLS BARS

const skillsSection = document.querySelector(".our-skills .skills");

if (skillsSection) {

    const progressBars = skillsSection.querySelectorAll(
        ".prog-holder .prog span"
    );

    progressBars.forEach(bar => {

        const targetWidth = bar.style.width || "0%";

        bar.dataset.targetWidth = targetWidth;

        bar.style.width = "0%";

    });

    function animateSkills() {

        progressBars.forEach(bar => {

            bar.style.transition = "width 1.5s ease";

            bar.style.width = bar.dataset.targetWidth;

        });

    }

    if ("IntersectionObserver" in window) {

        const skillsObserver = new IntersectionObserver(entries => {

            entries.forEach(entry => {

                if (entry.isIntersecting) {

                    animateSkills();

                    skillsObserver.disconnect();

                }

            });

        }, { threshold: 0.2 });

        skillsObserver.observe(skillsSection);

    } else {

        animateSkills();

    }

}
