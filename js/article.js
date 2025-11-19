const urlParams = new URLSearchParams(window.location.search);
const articleId = urlParams.get('id');

fetch(`http://localhost:8080/articles/views/${articleId}`)
  .then(res => res.json())
  .then(article => {
    document.getElementById('article-details')
      .innerHTML = `
                  <article class="article-container">
                  <h1 class="article-title">${article.title}</h1>
                  ${article.imagePath ? `
                            <div class="article-image-container">
                            <img class="article-image" src="http://localhost:8080/${article.imagePath}" alt="${article.title}">
                            </div>` : ''}
                  <div class="article-meta">
                  <span>By <strong>${article.name}</strong></span>
                  <span>${new Date(article.createdAt).toLocaleDateString()}</span>
                  <span class="category-badge">${article.category}</span>
                  </div>
                  <div class="article-content">${article.content}</div>
                  <a href="javascript:history.back()" class="back-button">← Back</a>
        </article>`;


    return fetch(`http://localhost:8080/editor/${articleId}`)
      .then(res => res.json())
      .then(comments => {
        const commentsSection = document.getElementById('comments-section');
        if (commentsSection && comments.length > 0) {
          document.getElementById('comments-count').innerText = `Comments (${comments.length})`;
          comments.forEach(comment => {
          commentsSection.innerHTML += `
                    <li class="comment-item">
                    <img class="profile-pic" src="https://cdn-icons-png.flaticon.com/512/847/847969.png" alt="">
                    <div class="comment-text-group">
                    <p class="comment-username">${comment.userId}</p>
                    <span class="comment-date">${new Date(comment.time).toISOString().split('T')[0]}</span>
                    <p>${comment.comment}</p>
                    </div>
                    </li>`;
            });
        }else {
          commentsSection.innerHTML = `<p>No comments yet.</p>`;
        }
      })
      .catch(() => {
        document.getElementById('comments-section').innerHTML = `<p>Failed to load comments.</p>`;
      });
  })
  .catch(() => {
    document.getElementById('article-details').innerHTML = `<p>Article not found.</p>`;
  });



const commentForm = document.getElementById('comment-form');
commentForm.addEventListener('submit', (e) => {
  e.preventDefault();
  const commentText = document.getElementById('comment-input').value;

  if (commentForm) {
    if (!commentText) {
      alert('Comment cannot be empty.');
      return;
    }
    commentsObject = {
      userId: localStorage.getItem("userId") || "Anonymous",
      articleId: articleId,
      comment: commentText
    };
    console.log("Submitting comment:", commentsObject);

    fetch(`http://localhost:8080/editor`, {
      method: 'POST',
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(commentsObject)
    })
      .then(res => {
        if (!res.ok) throw new Error('Network error');
        return res.text(); 
      })
      .then(() => {
        alert('Comment added successfully.');
        document.getElementById('comment-input').value = '';
      })
      .catch(() => {
        alert('Failed to add comment.');
      });
  }
});
