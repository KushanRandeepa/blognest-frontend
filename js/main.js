document.addEventListener("DOMContentLoaded", () => {
  console.log("Page loaded — calling API...");

  const signupForm = document.getElementById("signupForm");
  signupForm.addEventListener("submit", async function (e) {
    e.preventDefault();
    console.log("Signup form submitted");
    signup();
  });

});


async function signup() {
  console.log("Signup  methoed");
  const username = document.getElementById("suUser").value.trim();
  const email = document.getElementById("suEmail").value.trim();
  const password = document.getElementById("suPass").value.trim();
  const confirmPassword = document.getElementById("suPass2").value.trim();
  const suMsg = document.getElementById("suMsg");

  // Basic validation
  if (password !== confirmPassword) {
    suMsg.style.color = "#b00020";
    suMsg.textContent = "Passwords do not match!";
    return;
  }

  const signupData = {
    username: username,
    password: password,
    email: email,
    role: "USER" // default role, can change to ADMIN if needed
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