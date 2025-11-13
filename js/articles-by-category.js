document.addEventListener("DOMContentLoaded", () => {

  checkLoggingstatus();
  
  console.log("Page loaded — calling API...");

  let currentPageName = getCurrentPageName();
  console.log("Current page name:", currentPageName);
  fetchDataFromAPI(currentPageName);
});

function getCurrentPageName() {
  const path = window.location.pathname;
  const fileName = path.substring(path.lastIndexOf('/') + 1);
  const pageName = fileName.split('.')[0];
  return pageName;
}

async function fetchDataFromAPI(category) {
  fetch(`http://localhost:8080/article/search-by-category/${category}`)
    .then(response => response.json())
    .then(data => {

      console.log("Fetched articles:", data);
      
      let contentClass = 'article-content';
      let imgClass = 'article-img';
      let cardClass = 'article-card';

      if (category === 'sport') {
        contentClass = 'magazine-content';
        imgClass = 'magazine-img';
        cardClass = 'magazine-card';
      } else if (category === 'education') {
        contentClass = 'overlay';
        cardClass = 'category-card';
      }

      const articleGrid = document.getElementById('article-grid');
      articleGrid.innerHTML = ''; // clear any existing content

      data.forEach(article => {
        const articleCard = document.createElement('article');
        articleCard.classList.add(`${cardClass}`);

        articleCard.innerHTML = `
                                        <img src="./images/Gemini_Generated_Image_izmaukizmaukizma.png" alt="${article.title}" class="${imgClass}" />
                                        <div class="${contentClass}">
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
    })
    .catch(error =>
      console.error('Error fetching articles:', error));
  document.getElementById("article-grid").innerHTML = "<p>Failed to load data</p>";
}


function checkLoggingstatus() {
  const loginStatus = localStorage.getItem("loginStatus");
  // const role = localStorage.getItem("role");
  // const authLink = document.getElementById("authLink");
  const authText = document.getElementById("authText");


  if (loginStatus === "true") {
    authText.textContent = "Logout";
    authText.href = "#";

    authText.addEventListener("click", () => {

      const confirmLogout = confirm("Are you sure you want to logout?");

      if (confirmLogout) {
        localStorage.setItem("loginStatus", "false");
        localStorage.removeItem("role");
        localStorage.removeItem("username");
        alert("You have been logged out.");
        window.location.reload();
      }
    });

  } else {
    authText.textContent = "Login";
    authText.href = "login.html";
  }



}