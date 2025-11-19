
document.addEventListener("DOMContentLoaded", () => {
  const loginStatus = localStorage.getItem("loginStatus");
  const authText = document.getElementById("authText");

  const userDropdownWrapper = document.getElementById("user-dropdown-wrapper");
  const userDropdownMenu = document.getElementById("user-dropdown-menu");
  const userBtn = document.getElementById("user-btn");
  const logoutBtn = document.getElementById("logoutBtn");

  if (loginStatus === "true") {
    document.getElementById("authLink").style.display = "none";
    document.getElementById("user-name").innerText ="User Id:" + localStorage.getItem("userId");
    console.log("Saved userId:", localStorage.getItem("userId"));
    userDropdownWrapper.style.display = "inline-block";
    logoutBtn.onclick = (e) => {
      e.preventDefault();
      logout();
    }
  } else {
    authText.textContent = "Login";
    authText.href = "login.html";
    userDropdownWrapper.style.display = "none";
  }

  userBtn?.addEventListener("click", () => {
    userDropdownMenu.classList.toggle("show");
  });

  document.addEventListener("click", (e) => {
    if (!userDropdownWrapper.contains(e.target)) {
      userDropdownMenu.classList.remove("show");
    }
  });
});

function logout() {
  if (confirm("Are you sure you want to logout?")) {
    localStorage.clear();
    alert("Logged out successfully.");
    window.location.replace("index.html");
  }
}
