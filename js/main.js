document.addEventListener("DOMContentLoaded", () => {
  console.log("Page loaded — calling API...");

  const loginStatus = localStorage.getItem("loginStatus");
  const authText = document.getElementById("authText");
  console.log("Login Status:", loginStatus);
  console.log("Auth Text Element:", authText.textContent);

  if (!loginStatus) {
    console.log("Login Status 32:", loginStatus);
    console.log(" found 1", authText.textContent);
    authText.textContent = "Login";
    console.log(" found 2", authText.textContent);

    authText.href = "login.html";
    return;
  };

  if (loginStatus === "true") {
    // User is logged in
    authText.textContent = "Logout";
    authText.href = "#";

    authText.onclick = () => {
      if (confirm("Are you sure you want to logout?")) {
        localStorage.removeItem("loginStatus");
        localStorage.removeItem("role");
        localStorage.removeItem("username");
        localStorage.removeItem("userId");
        alert("Logged out successfully.");
        window.location.replace("login.html");
      }
    }



  } else {
    // Not logged in
    authText.textContent = "Login";
    authText.href = "login.html";
  }
});











