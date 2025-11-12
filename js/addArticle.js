
const form = document.getElementById('articleForm');
const messageBox = document.getElementById('messageBox');


form.addEventListener('submit', function (e) {
    // Stop the form from submitting normally (which would refresh the page)
    e.preventDefault();
    // Get data (in a real app, you'd send this to a server)
    const formData = new FormData(form);

    const articleTitle = formData.get('article-title');
    const articleCategory = formData.get('article-category');
    const articleContent = formData.get('article-content');
    const articlePhoto = formData.get('article-photo');
    const studentName = formData.get('student-name');
    const studentEmail = formData.get('student-email');


    console.log(formData.get('article-photo'));

    let requestBody = {
        "title": articleTitle,
        "category": articleCategory,
        "content": articleContent,
        "image": "jnjni jnijn",
        "name": studentName,
        "email": studentEmail
    }

    console.log("Request Body:", requestBody);

    

    // --- This is a simulation ---
    // In a real application, you would use fetch() here
    // to POST the formData to your backend server.

    fetch("http://localhost:8080/article/add-article", {
        method: 'POST',
        body: JSON.stringify(requestBody),
        headers: { "Content-Type": "application/json" }
    })
        .then(response=>{
             if (response.ok && response.headers.get("Content-Type")?.includes("application/json")) {
                     return response.json();
            } else {
                return {}; // empty object if no JSON
        }
        })
        .then(data => {
            console.log("Article saved successfully:", data);
            // Show a success message
            messageBox.innerHTML = `<strong>Thank you, ${escapeHTML(studentName)}!</strong> Your article "<strong>${escapeHTML(articleTitle)}</strong>" has been submitted for review.`;

            // Apply success styling (updated for dark theme)
            messageBox.classList.remove('hidden', 'bg-red-900/50', 'text-red-300');
            messageBox.classList.add('bg-green-900/50', 'text-green-300', 'border', 'border-green-400');

            // Reset the form fields
            form.reset();

            // Optional: Hide the message after 6 seconds
            setTimeout(() => {
                messageBox.classList.add('hidden');
            }, 6000);
        })
        .catch(error => {
            console.error("Error saving article:", error);
            // Optionally show error message
            messageBox.innerHTML = `Something went wrong! Please try again.`;
            messageBox.classList.remove('hidden', 'bg-green-900/50', 'text-green-300');
            messageBox.classList.add('bg-red-900/50', 'text-red-300', 'border', 'border-red-400');
        });

});



// A small helper function to prevent simple XSS attacks
// when displaying user-entered names or titles in the message.
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
