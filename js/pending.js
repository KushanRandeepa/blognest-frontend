document.addEventListener("DOMContentLoaded", () => {
  console.log("Page loaded — calling API...");

  getAllArticles();

});

function getAllArticles(){
  fetch("http://localhost:8080/article/get-all-pending") 
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
function previewArticle(id){
    window.location.href = `article.html?id=${id}`;
}
 
function rejectArticle(id,status){
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