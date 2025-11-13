document.addEventListener("DOMContentLoaded", () => {
  console.log("Page loaded — calling API...");
  
  filterSearch();
 
});

function searchByCategory(category) {
  
    fetch(`http://localhost:8080/article/search-by-category/${category}`)
    .then(response => response.json())
    .then(data => {
      displayingSearchresult(data)
    })
    .catch(error =>
      console.error('Error fetching articles:', error));
      document.getElementById("article-grid").innerHTML = "<p>Failed to load data</p>";
}
function getAll(){
     fetch(`http://localhost:8080/article/get-all-article`)
    .then(response => response.json())
    .then(data => {
      displayingSearchresult(data)
    })
    .catch(error =>
      console.error('Error fetching articles:', error));
      document.getElementById("article-grid").innerHTML = "<p>Failed to load data</p>";
}

function displayingSearchresult(data){
  if(data.length===0){
    document.getElementById("article-grid").innerHTML = "<p>No articles found</p>";
    return;
  }
    const articleGrid = document.getElementById('article-grid');
      articleGrid.innerHTML = ''; 

      data.forEach(article => {
        const articleCard = document.createElement('article');
        articleCard.classList.add('magazine-card');

        articleCard.innerHTML = `
                                 <img src="./images/Gemini_Generated_Image_izmaukizmaukizma.png" alt="${article.title}" class="magazine-img" />
                                 <div class="magazine-content">
                                 <h3>${article.title}</h3>
                                 <p>${article.content}</p>
                                 <a href="#" class="read-btn">Read More</a>
                                 </div>
                                 `;

        const readBtn = articleCard.querySelector('.read-btn');
        readBtn.addEventListener('click', (e) => {
          e.preventDefault();
          window.location.href = `article.html?id=${article.id}`;
        });

        articleGrid.appendChild(articleCard);
      });
}

function handleSearch() {
  const query = document.getElementById("searchInput") .value.trim();
  console.log("Searching for:", query);

  fetch(`http://localhost:8080/article/search?query=${encodeURIComponent(query)}`)
    .then(res => res.json())
    .then(data => displayingSearchresult(data))
    .catch(err => console.error("Search failed:", err));
}

function filterSearch() {
  const categorySelect = document.getElementById("categorySelect");
  const sortSelect = document.getElementById("sortSelect");

  categorySelect.addEventListener("change", () => {
    const selectedCategory = categorySelect.value;

    if (selectedCategory) {
      searchByCategory(selectedCategory); // call API when a category is selected
    } else {
      console.log("All categories selected");
      // Optionally fetch all articles
      getAll();
    }
  });
  sortSelect.addEventListener("change", () => {
    const selectedSort = sortSelect.value;
    if (selectedSort === "Ascending") {
      sortByAccending();
    } else if (selectedSort === "Descending") {
      sortbyDecending();
    }
  });
}

function sortByAccending(){}
function sortbyDecending(){}