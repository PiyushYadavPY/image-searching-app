const accessKey = "zzNfXWxoY6iAjptS1LyFFR00s19_YwmqzG_gV-FLrB4";
const form = document.querySelector("form");
const searchInputElement = document.getElementById("search-input");
const searchResultsElement = document.querySelector(".search-results");

let page = 1;

form.addEventListener("submit", async (event) => {
  event.preventDefault();
  page = 1;
  await searchImages();
});

showMoreButtonEl.addEventListener("click", searchImages);

async function searchImages() {
  const inputData =  searchInputElement.value;
  const url = `https://api.unsplash.com/search/photos?page=${page}&query=${inputData}&client_id=${accessKey}`;

  try {
    const response = await fetch(url);
    const data = await response.json();

    if (page === 1) {
      searchResultsElement.innerHTML = "";
    }

    const results = data.results;

    results.forEach((result) => {
      const imageWrapper = createImageWrapper(result);
      searchResultsElement.appendChild(imageWrapper);
    });
  } catch (error) {
    console.error("An error occurred:", error);
  }
}

function createImageWrapper(result) {
  const imageWrapper = document.createElement("div");
  imageWrapper.classList.add("search-result");
  imageWrapper.innerHTML = `
    <img src="${result.urls.small}" alt="${result.alt_description}">
    <a href="${result.links.html}" target="_blank">${result.alt_description}</a>
  `;
  return imageWrapper;
}
