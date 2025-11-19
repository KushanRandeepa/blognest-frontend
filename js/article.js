const urlParams = new URLSearchParams(window.location.search);
const articleId = urlParams.get('id');

fetch(`http://localhost:8080/articles/views/${articleId}`)
  .then(res => res.json())
  .then(article => {
    document.getElementById('article-details')
      .innerHTML = `
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


    return fetch(`http://localhost:8080/editor/${articleId}`)
      .then(res => res.json())
      .then(comments => {
        const commentsSection = document.getElementById('comments-section');
        if (commentsSection && comments.length > 0) {
          comments.forEach(comment => {
            commentsSection.innerHTML += `
        <li class="comment-item">
          <p><strong>${comment.comment}</strong> (${new Date(comment.time).toISOString().split('T')[0]}):</p>
          <p>${comment.userId}</p>
        </li>`;
          });
        } else {
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
  return res.text(); // parse as text to avoid json parse error
})
      .then(() => {
        alert('Comment added successfully.');
        document.getElementById('comment-input').value = ''; // Clear input field
      })
      .catch(() => {
        alert('Failed to add comment.');
      });
  }
});
