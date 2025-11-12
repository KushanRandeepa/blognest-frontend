document.addEventListener("DOMContentLoaded", () => {
  console.log("Page loaded — calling API...");
    
  let currentPageName =  getCurrentPageName();
  console.log("Current page name:", currentPageName);

  switch(currentPageName) {
  case 'index':
    console.log('You are on the index page');
    // Call function to load homepage articles
    loadHomeArticles();
    break;

  case 'entertainment':
    console.log('You are on the entertainment page');
    // Call function to load entertainment articles
    loadArticlesByCategory('entertainment');
    break;

  case 'sports':
    console.log('You are on the sports page');
    loadArticlesByCategory('sports');
    break;

  case 'article': // article.html
    console.log('You are on a single article page');
    displaySelectedArticle();
    break;

  default:
    console.log('Unknown page');
}
    });

  function getCurrentPageName() {
    const path = window.location.pathname;              
    const fileName = path.substring(path.lastIndexOf('/') + 1);  
    const pageName = fileName.split('.')[0];           
    return pageName;
 }

 