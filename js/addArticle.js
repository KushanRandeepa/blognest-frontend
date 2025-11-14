document.addEventListener("DOMContentLoaded", () => {
  const loginStatus = localStorage.getItem("loginStatus");
  const role = localStorage.getItem("role");

  // 🚫 If not logged in
  if (loginStatus !== "true") {
    alert("You must log in first!");
    window.location.href = "login.html";
    return;
  }
});

// const form = document.getElementById('articleForm');
// const messageBox = document.getElementById('messageBox');


// form.addEventListener('submit', function (e) {

//     e.preventDefault();

//     const formData = new FormData(form);
//     const articlePhoto = document.getElementById('article-photo').files[0];

//     formData.append("title", formData.get('article-title'));
//     formData.append("category", formData.get('article-category'));
//     formData.append("content", formData.get('article-content'));
//     formData.append("image", articlePhoto);
//     formData.append("name", formData.get('student-name'));
//     formData.append("email", formData.get('student-email'));

//     console.log("Request Body:", formData);

//     fetch("http://localhost:8080/article/add-article", {
//         method: 'POST',
//         body: formData,
//         headers: { "Content-Type": "application/json" }
//     })
        
//        . then(response => response.json())
// .then(data => console.log("Server response:", data))
// .catch(err => console.error(err));
//          });


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
    })
    .catch(error => {
        console.error("Upload Error:", error);

        messageBox.textContent = "Failed to submit article!";
        messageBox.classList.remove("hidden");
        messageBox.classList.add("bg-red-600");
    });
});


// .then(response=>{
        // //      if (response.ok && response.headers.get("Content-Type")?.includes("application/json")) {
        // //              return response.json();
        // //     } else {
        // //         return {}; // empty object if no JSON
        // // }
        // })
        // .then(data => {
        //     console.log("Article saved successfully:", data);
        //     // Show a success message
        //     messageBox.innerHTML = `<strong>Thank you, ${escapeHTML(formData.get('student-name'))}!</strong> Your article "<strong>${escapeHTML(formData.get('article-title'))}</strong>" has been submitted for review.`;

        //     // Apply success styling (updated for dark theme)
        //     messageBox.classList.remove('hidden', 'bg-red-900/50', 'text-red-300');
        //     messageBox.classList.add('bg-green-900/50', 'text-green-300', 'border', 'border-green-400');

        //     // Reset the form fields
        //     form.reset();

        //     // Optional: Hide the message after 6 seconds
        //     setTimeout(() => {
        //         messageBox.classList.add('hidden');
        //     }, 6000);
        // })
        // .catch(error => {
        //     console.error("Error saving article:", error);
        //     // Optionally show error message
        //     messageBox.innerHTML = `Something went wrong! Please try again.`;
        //     messageBox.classList.remove('hidden', 'bg-green-900/50', 'text-green-300');
        //     messageBox.classList.add('bg-red-900/50', 'text-red-300', 'border', 'border-red-400');
