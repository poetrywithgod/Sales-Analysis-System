// Dummy user (replace with DB check in real app)
const demoUser = {
  username: "admin",
  password: "1234"
};

const form = document.getElementById("loginForm");
const errorMsg = document.getElementById("errorMsg");

form.addEventListener("submit", (e) => {
  e.preventDefault();

  const username = document.getElementById("username").value.trim();
  const password = document.getElementById("password").value.trim();

  // Validate login
  if (username === demoUser.username && password === demoUser.password) {
    // Save session
    localStorage.setItem("loggedInUser", JSON.stringify({ username }));

    // Redirect
    window.location.href = "dashboard.html";
  } else {
    errorMsg.textContent = "❌ Invalid username or password";
  }
});

// Auto-redirect if already logged in
if (localStorage.getItem("loggedInUser")) {
  window.location.href = "dashboard.html";
}
