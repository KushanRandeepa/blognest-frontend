document.addEventListener("DOMContentLoaded", () => {
  console.log("Page loaded — calling API...");
getAllArticles();
});

function getAllArticles(){

    fetch("http://localhost:8080/article/get-all-article") // ✅ Replace with your real endpoint
    .then(response => response.json())
    .then(data => {
      const tableBody = document.getElementById("articleTableBody");
      tableBody.innerHTML = ""; // Clear existing rows

      data.forEach(article => {
        const row = document.createElement("tr");
        row.innerHTML = `
          <td>${article.id}</td>
          <td>${article.title}</td>
          <td>${article.category}</td>
          <td>${article.author}</td>
          <td>${article.date}</td>
          <td>
            <button class="edit" onclick="openModal(${article.id}, '${article.title}', '${article.category}', '${article.author}', '${article.date}')">Edit</button>
            <button class="delete" onclick="deleteArticle(${article.id})">Delete</button>
          </td>
        `;
        tableBody.appendChild(row);
      });
    })
    .catch(error => console.error("Error fetching data:", error));
}


 function editArticle(id) {
    alert(`Edit article ID: ${id}`);
    // You can open a modal or redirect to edit page here
  }

  function deleteArticle(id) {
    if (confirm("Are you sure you want to delete this article?")) {
      fetch(`http://localhost:8080/article/delete-article/${id}`, {
         method: "DELETE" })
        .then(res => {
          if (res.ok) {
            alert("Article deleted!");
            location.reload(); // Reload table
          } else {
            alert("Failed to delete article.");
          }
        });
    }}
    function openModal(id, title, category, author, date) {
    document.getElementById("editId").value = id;
    document.getElementById("editTitle").value = title;
    document.getElementById("editCategory").value = category;
    document.getElementById("editAuthor").value = author;
    document.getElementById("editDate").value = date;
    document.getElementById("editModal").style.display = "flex";
  }

  // 🔹 Close modal
  function closeModal() {
    document.getElementById("editModal").style.display = "none";
  }