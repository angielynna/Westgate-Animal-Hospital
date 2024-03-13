document.addEventListener("DOMContentLoaded", function () {
    // Function to get URL parameters
    function getUrlParameter(name) {
        name = name.replace(/[\[]/, '\\[').replace(/[\]]/, '\\]');
        var regex = new RegExp('[\\?&]' + name + '=([^&#]*)');
        var results = regex.exec(location.search);
        return results === null ? '' : decodeURIComponent(results[1].replace(/\+/g, ' '));
    };

    // Extract the section to highlight from the URL parameter
    const sectionToHighlight = getUrlParameter('highlight');

    // Function to highlight a section by adding a CSS class
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

    // Highlight the section if the URL parameter is present
    if (sectionToHighlight) {
        highlightSection(sectionToHighlight);
    }

    // Add event listeners to helpful links
    const helpfulLinks = document.querySelectorAll(".bottom-nav a");
    helpfulLinks.forEach(link => {
        link.addEventListener("click", (event) => {
            const targetSectionId = link.getAttribute("href").substring(1);
            // Check if the clicked link is one of the helpful links
            if (targetSectionId === "carecredit" || targetSectionId === "petfinder" || targetSectionId === "poisoncontrol" || targetSectionId === "emergency-clinics") {
                event.preventDefault(); // Prevent default behavior of anchor tag
                // Update the URL with the selected section ID as a parameter
                window.history.pushState({}, '', 'helpfullinkspage.html?highlight=' + targetSectionId);
                // Highlight the selected section
                highlightSection(targetSectionId);
            } else if (targetSectionId === "homepage") {
                // Redirect to index.html without highlighting any section
                window.location.href = 'index.html';
            } else if (targetSectionId === "about-us" || targetSectionId === "contact-info") {
                // Redirect to index.html and highlight the section
                window.location.href = 'index.html?highlight=' + targetSectionId;
            }
        });
    });
});
