document.addEventListener("DOMContentLoaded", () => {
  console.log("Page loaded — calling API...");

  checkLoggingstatus();

  const signupForm = document.getElementById("signupForm");
  const loginForm = document.getElementById("loginForm");


  if (signupForm) {
    signupForm.addEventListener("submit", async function (e) {
      e.preventDefault();
      console.log("Signup form submitted");
      signup();
    });
  }

  if (loginForm) {
    loginForm.addEventListener("submit", async function (e) {
      e.preventDefault();
      console.log("Login form submitted");
      login();
    });
  }






});


async function signup() {
  console.log("Signup  methoed");
  const username = document.getElementById("suUser").value.trim();
  const email = document.getElementById("suEmail").value.trim();
  const password = document.getElementById("suPass").value.trim();
  const confirmPassword = document.getElementById("suPass2").value.trim();
  const suMsg = document.getElementById("suMsg");

  if (password !== confirmPassword) {
    suMsg.style.color = "#b00020";
    suMsg.textContent = "Passwords do not match!";
    return;
  }

  const signupData = {
    username: username,
    password: password,
    email: email,
    role: "USER" // default role
  };

  fetch("http://localhost:8080/auth/signup", {
    method: 'POST',
    body: JSON.stringify(signupData),
    headers: { "Content-Type": "application/json" }
  })
    .then(response => response.json())
    .then(data => {
      console.log("Signup response:", data);
      if (data.success) {
        suMsg.style.color = "green";
        suMsg.textContent = data.message || "Signup successful!";
        document.getElementById("signupForm").reset();
        setTimeout(() => {
          window.location.href = "login.html";
        }, 1000);
      } else {
        suMsg.style.color = "#b00020";
        suMsg.textContent = data.message || "Signup failed. Please try again.";
      }
    })
    .catch(error => {
      console.error("Error:", error)
      suMsg.textContent = "Error connecting to server.";
      console.error("Signup error:", error);
    });
};


async function login() {
  console.log("loging");

  const username = document.getElementById("loginUser").value.trim();
  const password = document.getElementById("loginPass").value.trim();
  const loMsg = document.getElementById("message");

    const loginData = {
    username: username,
    password: password
  };

  fetch("http://localhost:8080/auth/login", {
    method: 'POST',
    body: JSON.stringify(loginData),
    headers: { "Content-Type": "application/json" }
  })
    .then(response => response.json())
    .then(data => {
    
      if (data.login===true) {
        loMsg.style.color = "green";
        loMsg.textContent = data.message || "Login successful!";

          localStorage.setItem("loginStatus", "true");
          localStorage.setItem("role", data.role);       
          localStorage.setItem("userId",data.userId);

          setTimeout(() => {
          
            if (data.role === "ADMIN") {
            window.location.href = "admin-dashboard.html";
          } else if (data.role === "USER") {
            window.location.href = "index.html";
          }
        }, 400);
      document.getElementById("loginForm").reset();
      
      } else if(data.login===false){
        loMsg.style.color = "#b00020";
         loMsg.textContent = data.massage || "Username or Password Incorrect";
      }

    })
    .catch(error => {
      loMsg.style.color = "#b00020";
      loMsg.textContent = "Login failed. Please try again.";
    });

}

function checkLoggingstatus() {
  const loginStatus = localStorage.getItem("loginStatus");
  // const role = localStorage.getItem("role");
  // const authLink = document.getElementById("authLink");
  const authText = document.getElementById("authText");

if(authText){
 if (loginStatus === "true") {
    authText.textContent = "Logout";
    authText.href = "#";

    authText.addEventListener("click", () => {

      const confirmLogout = confirm("Are you sure you want to logout?");

      if (confirmLogout) {
        localStorage.setItem("loginStatus", "false");
        localStorage.removeItem("role");
        localStorage.removeItem("username");
        alert("You have been logged out.");
        window.location.reload();
         // window.location.href = "login.html";
      }
    });

  } else {
    authText.textContent = "Login";
    authText.href = "login.html";
  }
}
 
}