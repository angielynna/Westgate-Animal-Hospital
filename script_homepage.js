document.addEventListener("DOMContentLoaded", function () {
    const carouselButtons = document.querySelectorAll("[data-carousel-button]");
    const navLinks = document.querySelectorAll(".bottom-nav a");

    function highlightSection(sectionId) {
        const targetSection = document.getElementById(sectionId);
        if (targetSection) {
            targetSection.classList.add("highlight-section");

            // Scroll to the highlighted section and center it in the view immediately
            targetSection.scrollIntoView({ behavior: "auto", block: "center" });

            // Remove the highlight class after a delay
            setTimeout(() => {
                targetSection.classList.remove("highlight-section");
            }, 1000); // Adjust the duration as needed
        }
    }

    carouselButtons.forEach(button => {
        button.addEventListener("click", (event) => {
            const offset = button.dataset.carouselButton === "next" ? 1 : -1;
            const slides = button.closest("[data-carousel]").querySelector("[data-slides]");
            const activeSlide = slides.querySelector("[data-active]");
            let newIndex = [...slides.children].indexOf(activeSlide) + offset;

            if (newIndex < 0) newIndex = slides.children.length - 1;
            if (newIndex >= slides.children.length) newIndex = 0;

            slides.children[newIndex].dataset.active = true;
            delete activeSlide.dataset.active;

            // Check if the click is not from the carousel buttons
            if (event.target.closest("[data-carousel-button]") === null) {
                // Call the highlightSection function with the appropriate sectionId
                if (newIndex === 0) {
                    highlightSection("about-us");
                } else if (newIndex === 1) {
                    highlightSection("contact-info");
                }
            }
        });
    });

    // Add click event listeners to navigation links
    navLinks.forEach(link => {
        link.addEventListener("click", (event) => {
            const targetSectionId = link.getAttribute("href").substring(1);
            // Check if the clicked link is the "Helpful Links" link
            if (targetSectionId === "helpful-links") {
                // Redirect to the desired page (helpfullinkspage.html)
                window.location.href = "helpfullinkspage.html";
            } else if (targetSectionId === "helpful-links-carecredit") {
                window.location.href = "helpfullinkspage.html?highlight=carecredit";
            } else if (targetSectionId === "helpful-links-petfinder") {
                window.location.href = "helpfullinkspage.html?highlight=petfinder";
            } else if (targetSectionId === "helpful-links-poisoncontrol") {
                window.location.href = "helpfullinkspage.html?highlight=poisoncontrol";
            } else if (targetSectionId === "helpful-links-emergency") {
                window.location.href = "helpfullinkspage.html?highlight=emergency-clinics";
            } else if (targetSectionId === "servicesandproducts" || targetSectionId === "services-section") {
                window.location.href = "productsandservicespage.html";
            } else {
                event.preventDefault(); // Prevent default behavior of anchor tag
                highlightSection(targetSectionId);
            }
        });
    });
});