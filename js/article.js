const urlParams = new URLSearchParams(window.location.search);
const articleId = urlParams.get('id');

// Fetch article by ID from backend
fetch(`http://localhost:8080/articles/${articleId}`)
  .then(res => res.json())
  .then(article => {
    document.getElementById('article-details').innerHTML = `
                                                          <article class="full-article">${article.imagePath ? `
                                                          <h1 class="article-title">${article.title}</h1>
                                                          <img class="article-image" src="http://localhost:8080/${article.imagePath}" alt="${article.title}" />` : ''}
                                                          <div class="article-category">${article.category}</div>
                                                          <div class="article-meta">
                                                          <span><strong>Author:</strong> ${article.name}</span> |
                                                          <span><strong>Email:</strong> ${article.email}</span> |
                                                          <span><strong>Date:</strong> ${new Date(article.createdAt).toISOString().split('T')[0]}</span> |
                                                          </div>
                                                          <p class="article-content">${article.content}</p>
                                                          <a href="javascript:history.back()" class="back-button">← Back</a>
                                                          </article>`;
                      })
    .catch(() => {
      document.getElementById('article-details').innerHTML = `<p>Article not found.</p>`;
  });