document.addEventListener("DOMContentLoaded", () => {
  console.log("Page loaded — calling API...");
 
  getAllArticles();

  const editForm = document.getElementById("editForm")
  if(editForm){
  editForm.addEventListener("submit", function (e) {
    e.preventDefault();
    console.log("Edit form submitted");
    const updatedArticle = {
      id: document.getElementById("editId").value,
      title: document.getElementById("editTitle").value,
      category: document.getElementById("editCategory").value,
      content: document.getElementById("editContent").value,
      image: "update img",// optional
      name: document.getElementById("editAuthor").value,
      email: "0update@email", // optional
      createdAt: document.getElementById("editDate1").value,
      updatedAt: "",
    };
    console.log("Updated Article Data:", updatedArticle);
    updateArticle(updatedArticle);


  });
  }


});

function getAllArticles(){

    fetch("http://localhost:8080/article/get-all-article") // ✅ Replace with your real endpoint
    .then(response => response.json())
    .then(data => {
      const tableBody = document.getElementById("articleTableBody");
      if(tableBody){
      tableBody.innerHTML = ""; // Clear existing rows

      data.forEach(article => {
        console.log("Article:", article);
        const row = document.createElement("tr");
        row.innerHTML = `
          <td>${article.id}</td>
          <td>${article.title}</td>
          <td>${article.category}</td>
          <td>${article.name}</td>
          <td>${article.createdAt}</td>
          <td>
            <button class="edit" onclick="openModal(${article.id}, '${article.title}', '${article.category}','${article.name}','${article.content}', '${article.createdAt}','${article.updatedAt}')">Edit</button>
            <button class="delete" onclick="deleteArticle(${article.id})">Delete</button>
             <button class="view" onclick="viewArticle(${article.id})">View</button>
          </td>
        `;
        tableBody.appendChild(row);
      });
      }

    })
    .catch(error => console.error("Error fetching data:", error));
}


 function updateArticle(article) {
    if (confirm("Are you sure you want to update this article?")) {
      fetch(`http://localhost:8080/article/update-article`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(article) })
        .then(res => {
          if (res.ok) {
            alert("Article updated!");
            location.reload(); // Reload table
          } else {
            alert("Failed to update article.");
          }
        });
    }
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
    }
  }


  function openModal(id, title, category, name,content, createdDate,updateDate) {
    console.log(updateDate)
    document.getElementById("editId").value = id;
    document.getElementById("editTitle").value = title;
    document.getElementById("editCategory").value = category;
    document.getElementById("editAuthor").value = name;
    document.getElementById("editContent").value = content;
    document.getElementById("editDate1").value = createdDate;
    document.getElementById("editDate2").value = updateDate;
    // document.getElementById("editImage").value = image;
    document.getElementById("editModal").style.display = "flex";

  }

  function closeModal() {
    document.getElementById("editModal").style.display = "none";
  }

  function viewArticle(id) {
    window.location.href = `article.html?id=${id}`;
  }

  function logout() {
  if (confirm("Are you sure you want to logout?")) {
    localStorage.setItem("loginStatus", "false");
    localStorage.removeItem("role");
    alert("Logged out!");
 window.location.replace("login.html");   }
}
