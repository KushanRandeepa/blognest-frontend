document.addEventListener("DOMContentLoaded", () => {
  console.log("Page loaded — calling API...");

  getAllArticles();

});

function getAllArticles() {
  fetch("http://localhost:8080/articles/pending")
    .then(response => response.json())
    .then(data => {
      const tableBody = document.getElementById("articleTableBody");
      if (tableBody) {
        tableBody.innerHTML = "";

        data.forEach(article => {
          console.log("Article:", article);
          const row = document.createElement("tr");
          row.innerHTML = `
          <td>${article.name}</td>
          <td>${article.email}</td>
          <td>${article.category}</td>
          <td>${article.status}</td>
          <td><button class="preview-btn" onclick="previewArticle(${article.id})">Preview</button><td>       
          <td>
            <button class="approve-btn" onclick="approveArticle(${article.id},'APPROVED')">Approve</button>
            <button class="reject-btn" onclick="rejectArticle(${article.id},'REJECTED')">Reject</button>
          </td>
        `;
          tableBody.appendChild(row);
        });
      }
    })
    .catch(error => console.error("Error fetching data:", error));


}
function approveArticle(id, status) {
  console.log("ID:", id);
  console.log("Status:", status);

  fetch(`http://localhost:8080/admin/review/${id}/${status}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" }
  })
    .then(res => {
      if (res.ok) {
        alert("Article Approved!");
        location.reload();
      } else {
        alert("Failed to approve article.");
      }
    })
    .catch(err => {
      console.error(err);
      alert("Error occurred while approving.");
    });

}
function previewArticle(id) {
  document.getElementById("previewModal").style.display = "flex";
  fetch(`http://localhost:8080/articles/${id}`)
    .then(res => res.json())
    .then(article => {
      const iframe = document.getElementById('pdfFrame');
      const doc = iframe.contentDocument || iframe.contentWindow.document;
      doc.open();
      doc.write(` 
        <html>
    <head>
      <style>
        body {
          font-family: 'Arial', sans-serif;
          background-color: #f4f4f9;
          margin: 0;
          padding: 20px;
        }

        .full-article {
          max-width: 800px;
          margin: 20px auto;
          padding: 30px;
          background-color: #fff;
          box-shadow: 0 8px 20px rgba(0,0,0,0.1);
          border-radius: 12px;
          line-height: 1.8;
        }

        .full-article .article-title {
          font-size: 2.5em;
          font-weight: bold;
          margin-bottom: 15px;
          text-align: center;
          color: #333;
        }

        .full-article .article-meta {
          font-size: 0.95em;
          color: #555;
          margin-bottom: 20px;
          text-align: center;
        }

        .full-article .article-meta span {
          margin: 0 10px;
        }

        .full-article .article-image {
          max-width: 70%;
          height: auto;
          display: block;
          margin: 20px auto;
          border-radius: 10px;
          box-shadow: 0 4px 15px rgba(0,0,0,0.1);
        }

        .full-article .article-content {
          font-size: 1.1em;
          text-align: justify;
          color: #333;
        }
      </style>
    </head>
    <body>
      <div class="full-article">
        <h1 class="article-title">${article.title}</h1>
        <div class="article-meta">
          <span><strong>Author:</strong> ${article.name}</span> |
          <span><strong>Category:</strong> ${article.category}</span> |
          <span><strong>Email:</strong> ${article.email}</span> |
          <span><strong>Date:</strong> ${article.createdAt}</span> |
          <span><strong>Status:</strong> ${article.status}</span>
        </div>
        ${article.imagePath ? `<img class="article-image" src="http://localhost:8080/${article.imagePath}" alt="${article.title}" />` : ''}
        <p class="article-content"><strong>Content:</strong> ${article.content}</p>
      </div>
    </body>
  </html>
   
`);
      doc.close();

    })
    .catch(() => {
      document.getElementById('pdfFrame').style.display = 'none'; // hide if no PDF
      console.log("No PDF available for this article.");
    });
}

function rejectArticle(id, status) {
  if (confirm("Are you sure you want to reject this article?")) {
    fetch(`http://localhost:8080/admin/review/${id}/${status}`, {
      method: "PUT"
    })
      .then(res => {
        if (res.ok) {
          alert("Article Rejected!");
          location.reload(); // Reload table
        } else {
          alert("Failed to reject article.");
        }
      })
      .catch(err => {
        console.error(err);
        alert("Error occurred while rejecting.");
      });
  }

}

function closePreview() {
  document.getElementById("previewModal").style.display = "none";
  document.getElementById("pdfFrame").src = "";
}