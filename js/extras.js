
// 1. SEARCH FUNCTIONALITY

const searchContainer = document.querySelector("header nav .form");

if (searchContainer) {

    const searchIcon = searchContainer.querySelector("i");

    const searchInput = document.createElement("input");

    searchInput.type = "search";
    searchInput.placeholder = "Search projects...";
    searchInput.className = "site-search";
    searchInput.setAttribute("aria-label", "Search portfolio projects");
    searchInput.hidden = true;

    searchContainer.appendChild(searchInput);

    function toggleSearch() {

        searchInput.hidden = !searchInput.hidden;

        if (!searchInput.hidden) {

            searchInput.focus();

        } else {

            searchInput.value = "";

            searchInput.dispatchEvent(
                new Event("input", { bubbles: true })
            );

        }

    }

    searchIcon.style.cursor = "pointer";
    searchIcon.setAttribute("role", "button");
    searchIcon.setAttribute("tabindex", "0");
    searchIcon.setAttribute("aria-label", "Open project search");

    searchIcon.addEventListener("click", toggleSearch);

    searchIcon.addEventListener("keydown", event => {

        if (event.key === "Enter" || event.key === " ") {

            event.preventDefault();
            toggleSearch();

        }

    });

    searchInput.addEventListener("input", () => {

        const portfolio = document.querySelector(".portfolio");

        if (portfolio) {

            portfolio.dispatchEvent(
                new CustomEvent("portfolio:search", {
                    detail: searchInput.value
                })
            );

        }

    });

    searchInput.addEventListener("keydown", event => {

        if (event.key === "Escape") {

            searchInput.hidden = true;
            searchInput.value = "";

            searchInput.dispatchEvent(
                new Event("input", { bubbles: true })
            );

            searchIcon.focus();

        }

    });

}


// 2. VIDEO CONTROLS

const videoSection = document.querySelector(".video");

if (videoSection) {

    const video = videoSection.querySelector("video");
    const videoButton = videoSection.querySelector("button");

    if (video && videoButton) {

        videoButton.addEventListener("click", () => {

            // Show native video controls
            video.controls = !video.controls;

            if (!video.controls) {

                videoButton.textContent = "See More";

            } else {

                videoButton.textContent = "Hide Controls";

                video.pause();

            }

        });

    }

}


// 3. SCROLL REVEAL ANIMATIONS

const revealElements = document.querySelectorAll(
    ".services .srv-box, .portfolio .box, .stats .box, .pricing .plan"
);

if (
    "IntersectionObserver" in window &&
    !window.matchMedia("(prefers-reduced-motion: reduce)").matches
) {

    revealElements.forEach(element => {

        element.classList.add("js-reveal");

    });

    const revealObserver = new IntersectionObserver(entries => {

        entries.forEach(entry => {

            if (entry.isIntersecting) {

                entry.target.classList.add("is-visible");

                revealObserver.unobserve(entry.target);

            }

        });

    }, {
        threshold: 0.12
    });

    revealElements.forEach(element => {

        revealObserver.observe(element);

    });

} else {

    revealElements.forEach(element => {

        element.classList.add("is-visible");

    });

}
