document.addEventListener("DOMContentLoaded", () => {
  console.log("Page loaded — calling API...");
  if (localStorage.getItem("loginStatus") !== "true") {
    window.location.replace("login.html");
  }
  getAllArticles();
  getAllUsers();
  initArticleEditFormHandler();
  initUserEditFormHandler();
  updateDashboardCounts();

});

function getAllArticles() {

  fetch("http://localhost:8080/article/get-all-article")
    .then(response => response.json())
    .then(data => {
      const tableBody = document.getElementById("articleTableBody");
      if (tableBody) {
        tableBody.innerHTML = "";

        data.forEach(article => {
          console.log("Article:", article);
          const row = document.createElement("tr");
          row.innerHTML = `
          <td>${article.id}</td>
          <td>${article.title}</td>
          <td>${article.category}</td>
          <td>${article.name}</td>
          <td>${article.status}</td>
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

function initArticleEditFormHandler() {
  const editForm = document.getElementById("editForm")
  if (editForm) {
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
}


function updateArticle(article) {
  if (confirm("Are you sure you want to update this article?")) {
    fetch(`http://localhost:8080/article/update-article`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(article)
    })
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
      method: "DELETE"
    })
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

function openModal(id, title, category, name, content, createdDate, updateDate) {
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


function getAllUsers() {
  fetch("http://localhost:8080/admin/get-all-users") // ✅ Replace with your real endpoint
    .then(response => response.json())
    .then(data => {
      const tableBody = document.getElementById("userTableBody");
      if (tableBody) {
        tableBody.innerHTML = ""; // Clear existing rows

        data.forEach(user => {
          console.log("User:", user);
          const row = document.createElement("tr");
          row.innerHTML = `
          <td>${user.userId}</td>
          <td>${user.username}</td>
          <td>${user.email}</td>
          <td>${user.role}</td>
          <td>${user.createdAt}</td>
          <td>
            <button class="edit" onclick="openUserModal(${user.userId}, '${user.username}', '${user.email}','${user.role}','${user.password}', '${user.createdAt}')">Edit</button>
            <button class="delete" onclick="deleteUser(${user.userId})">Delete</button>
          </td>
        `;
          tableBody.appendChild(row);
        });
      }
    })
    .catch(error => console.error("Error fetching data:", error));
}


function initUserEditFormHandler() {
  const editUserForm = document.getElementById("editUserForm");
  if (editUserForm) {
    editUserForm.addEventListener("submit", function (e) {
      e.preventDefault();
      const updatedUserData = {
        userId: document.getElementById("editUserId").value,
        username: document.getElementById("editUsername").value,
        email: document.getElementById("editEmail").value,
        role: document.getElementById("editRole").value,
        password: document.getElementById("editPassword").value,
        // createdAt: document.getElementById("editCreatedAt").value,
        createdAt: new Date().toISOString(),  // <-- current date-time in ISO format
      };
      console.log("Updated User Data:", updatedUserData);
      updateUser(updatedUserData);

    });
  }
}


function updateUser(updatedUserData) {
  fetch(`http://localhost:8080/admin/update-user`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(updatedUserData)
  })
    .then(res => {
      if (res.ok) {
        alert("User updated successfully!");
        closeUserModal();
        location.reload();
      } else {
        alert("Failed to update user.");
      }
    })
    .catch(err => {
      console.error("Error updating user:", err);
      alert("Something went wrong while updating the user.");
    });
}


function openUserModal(userId, username, email, role, password, createdAt) {
  document.getElementById("editUserId").value = userId;
  document.getElementById("editUsername").value = username;
  document.getElementById("editEmail").value = email;
  document.getElementById("editRole").value = role;
  document.getElementById("editPassword").value = password;
  document.getElementById("editCreatedAt").value = createdAt;
  document.getElementById("editUserModal").style.display = "flex";
}


function closeUserModal() {
  document.getElementById("editUserModal").style.display = "none";
}


function deleteUser(id) {
  if (confirm("Are you sure you want to delete this user?")) {
    fetch(`http://localhost:8080/admin/delete-user/${id}`, {
      method: "DELETE"
    })
      .then(res => {
        if (res.ok) {
          alert("User deleted!");
          location.reload(); // Reload table
        } else {
          alert("Failed to delete user.");
        }
      });
  }
}

function logout() {
  if (confirm("Are you sure you want to logout?")) {
    localStorage.setItem("loginStatus", "false");
    localStorage.removeItem("role");
    alert("Logged out!");

    window.location.replace("login.html");
    setTimeout(() => {
      window.history.pushState(null, "", window.location.href);
      window.onpopstate = function () {
        window.history.go(1);
      };
    }, 0);
  }
}


function updateDashboardCounts() {
  console.log("Updating dashboard counts...");

  fetch("http://localhost:8080/admin/dashboard-counts")
    .then(response => response.json())
    .then(data => {
      const totalUsersEl = document.getElementById("totalUsers");
      const totalPostsEl = document.getElementById("totalPosts");
      if (totalUsersEl) totalUsersEl.innerText = "Total Users: " + data.totalUsers;
      if (totalPostsEl) totalPostsEl.innerText = "Total Posts: " + data.totalArticles;
    })
    .catch(error => console.error("Error fetching dashboard counts:", error));

  fetch("http://localhost:8080/article/get-all-pending")
    .then(res => res.json())
    .then(data => {
      const countEl = document.getElementById("pendingCount");
      if (countEl) {
        countEl.textContent = data.length;
      }
    })
    .catch(() => {
      const countEl = document.getElementById("pendingCount");
      if (countEl) {
        countEl.textContent = "0";
      }
    });
}

function navigateToEditorUI() {
  window.location.href = "index.html";
}
