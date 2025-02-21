const accesskey = "Yzfz0XJFHLxtS7XPXOM_N0WLZgTHp8MlmFpoWHGzfg0";
const searchButton = document.querySelector("#search-button");
const searchInput = document.querySelector("#search-input");
const imageContainer = document.querySelector("#image-container");
const showMoreBtn = document.querySelector("#show-more-btn");

let keyword = "";
let page = 1;

async function searchImages() {
    keyword = searchInput.value;
    const url = `https://api.unsplash.com/search/photos?page=${page}&query=${keyword}&client_id=${accesskey}`;
    const response = await fetch(url);
    const data = await response.json();

    const results = data.results;
    results.map((result) => {
        const image = document.createElement("img");
        image.src = result.urls.small;
        const imageLink = document.createElement("a");
        // Create a link to the fullScreen.html page with the image URL as a query parameter
        imageLink.href = `index7.html?imageUrl=${encodeURIComponent(result.urls.full)}`;
        imageLink.target = "_blank";  // Open in a new tab

        imageLink.appendChild(image);
        imageContainer.appendChild(imageLink);
    });

    showMoreBtn.style.display = "block";  // To show the "Show More" button
}

searchButton.addEventListener("click", (e) => {
    e.preventDefault();
    page = 1;
    imageContainer.innerHTML = "";  // Clear previous results before new search
    searchImages();
});

showMoreBtn.addEventListener("click", () => {
    page++;
    searchImages();
});
