document.addEventListener("DOMContentLoaded", () => {
  const loginStatus = localStorage.getItem("loginStatus");
  const role = localStorage.getItem("role");

  if (loginStatus !== "true") {
    alert("You must log in first!");
    window.location.href = "login.html";
    return;
  }
});

function escapeHTML(str) {
    return str.replace(/[&<>"']/g, function (m) {
        return {
            '&': '&amp;',
            '<': '&lt;',
            '>': '&gt;',
            '"': '&quot;',
            "'": '&#39;'
        }[m];
    });
}

const form = document.getElementById('articleForm');
const messageBox = document.getElementById('messageBox');

form.addEventListener('submit', function (e) {
    e.preventDefault();

    const formData = new FormData();

    formData.append("title", document.getElementById('article-title').value);
    formData.append("category", document.getElementById('article-category').value);
    formData.append("content", document.getElementById('article-content').value);
    formData.append("name", document.getElementById('student-name').value);
    formData.append("email", document.getElementById('student-email').value);

    const articlePhoto = document.getElementById('article-photo').files[0];
    if (articlePhoto) {
        formData.append("file", articlePhoto); // ✔ Correct key
    }

    fetch("http://localhost:8080/article/add-article", {
        method: 'POST',
        body: formData, // ✔ Do NOT set Content-Type
    })
    .then(response => response.json())
    .then(data => {
        console.log("Server Response:", data);
 messageBox.textContent = data.message || "Article submitted!";
            messageBox.classList.remove("hidden");
         messageBox.classList.add("bg-green-600");
       
        setTimeout(() => {
          
          form.reset();
        window.history.back();
        }, 2000);

       
    })
    .catch(error => {
        console.error("Upload Error:", error);

        messageBox.textContent = "Failed to submit article!";
        messageBox.classList.remove("hidden");
        messageBox.classList.add("bg-red-600");
    });
});

