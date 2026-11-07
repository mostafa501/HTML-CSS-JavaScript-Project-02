
// ==========================================
// PORTFOLIO FILTERING + SEARCH + MORE BUTTON
// ==========================================

const portfolio = document.querySelector(".portfolio");

if (portfolio) {

    const filterItems = [
        ...portfolio.querySelectorAll(".shuffle li")
    ];

    const portfolioBoxes = [
        ...portfolio.querySelectorAll(".imgs-container .box")
    ];

    const moreButton = portfolio.querySelector(".more");

    let activeCategory = "all";
    let searchText = "";
    let expanded = false;

    const initialVisibleCount = 4;

    // Get project information
    function getProjectText(box) {

        return box.textContent.toLowerCase();

    }

    // Display matching projects
    function updatePortfolio() {

        const matchingBoxes = portfolioBoxes.filter(box => {

            const category = (
                box.dataset.category || ""
            ).toLowerCase();

            const matchesCategory =
                activeCategory === "all" ||
                category === activeCategory;

            const matchesSearch =
                getProjectText(box).includes(searchText);

            return matchesCategory && matchesSearch;

        });

        portfolioBoxes.forEach(box => {
            box.hidden = true;
        });

        const visibleLimit = expanded
            ? matchingBoxes.length
            : initialVisibleCount;

        matchingBoxes.forEach((box, index) => {

            if (index < visibleLimit) {
                box.hidden = false;
            }

        });

        // Show or hide More button
        if (moreButton) {

            moreButton.hidden =
                matchingBoxes.length <= initialVisibleCount;

            moreButton.textContent = expanded
                ? "Show Less"
                : "More";

        }

    }

    // Category filtering
    filterItems.forEach(item => {

        item.setAttribute("role", "button");
        item.setAttribute("tabindex", "0");

        function selectCategory() {

            activeCategory = item.textContent.trim().toLowerCase();

            filterItems.forEach(filter => {
                filter.classList.remove("active");
            });

            item.classList.add("active");

            expanded = false;

            updatePortfolio();

        }

        item.addEventListener("click", selectCategory);

        item.addEventListener("keydown", event => {

            if (event.key === "Enter" || event.key === " ") {
                event.preventDefault();
                selectCategory();
            }

        });

    });

    // More / Show Less
    if (moreButton) {

        moreButton.addEventListener("click", event => {

            event.preventDefault();

            expanded = !expanded;

            updatePortfolio();

        });

    }

    // Search integration
    portfolio.addEventListener("portfolio:search", event => {

        searchText = event.detail.trim().toLowerCase();

        expanded = false;

        updatePortfolio();

    });

    updatePortfolio();

}
