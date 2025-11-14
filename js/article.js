const urlParams = new URLSearchParams(window.location.search);
const articleId = urlParams.get('id');

// Fetch article by ID from backend
fetch(`http://localhost:8080/article/search-by-id/${articleId}`)
  .then(res => res.json())
  .then(article => {
    console.log("Fetched Article:", article.imagePath);
    document.getElementById('article-details').innerHTML = `
        <article class="full-article">
          <img src="http://localhost:8080/${article.imagePath}" alt="${article.title}" />
          <h1>${article.title}</h1>
          <p>${article.content}</p>
        <a href="javascript:history.back()">← Back</a>

        </article>
      `;
  })
  .catch(() => {
    document.getElementById('article-details').innerHTML = `<p>Article not found.</p>`;
  });