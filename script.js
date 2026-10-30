// Get HTML elements
const searchForm = document.getElementById("searchForm");
const searchInput = document.getElementById("searchInput");
const results = document.getElementById("results");
const resultCount = document.getElementById("resultCount");

// Listen for form submission
searchForm.addEventListener("submit", async function(event) {

    // Prevent page reload
    event.preventDefault();

    // Get search query
    const query = searchInput.value.trim();

    // Ignore empty searches
    if (query === "") {
        return;
    }

    // Clear previous results
    results.innerHTML = "";
    resultCount.textContent = "Searching...";

    // Wikimedia Commons API URL
    const url = https: //commons.wikimedia.org/w/api.php?action=query&generator=search&gsrsearch=${encodeURIComponent(query)}&gsrnamespace=6&gsrlimit=20&prop=imageinfo&iiprop=url&iiurlwidth=400&format=json&origin=*;

        try {

            // Fetch data from API
            const response = await fetch(url);

            // Check response
            if (!response.ok) {
                throw new Error("Failed to fetch images");
            }

            // Convert response into JSON
            const data = await response.json();

            // Get image results
            const pages = data.query ? .pages || {};
            const images = Object.values(pages);

            // Update result count
            resultCount.textContent =
                Showing $ { images.length }
            results
            for "${query}";

            // Display message if no images found
            if (images.length === 0) {
                resultCount.textContent = No images found
                for "${query}";
                return;
            }

            // Create a card for every image
            images.forEach(function(item) {

                // Create card
                const card = document.createElement("div");
                card.className = "card";

                // Create image
                const img = document.createElement("img");
                img.src = item.imageinfo[0].thumburl || item.imageinfo[0].url;
                img.alt = item.title;

                // Create title
                const title = document.createElement("h3");
                title.textContent = item.title.replace("File:", "");

                // Make image open in new tab
                const link = document.createElement("a");
                link.href = item.imageinfo[0].url;
                link.target = "_blank";
                link.rel = "noopener noreferrer";

                link.appendChild(img);

                // Add image and title to card
                card.appendChild(link);
                card.appendChild(title);

                // Add card to results grid
                results.appendChild(card);

            });

        } catch (error) {
            console.error(error);
            resultCount.textContent = "Something went wrong. Please try again.";
        }

});