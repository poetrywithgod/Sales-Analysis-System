/* ===== Utilities ===== */

// Get logged in user
function getLoggedInUser() {
  return JSON.parse(localStorage.getItem("loggedInUser"));
}

// Save sales data
function saveSales(sales) {
  localStorage.setItem("salesData", JSON.stringify(sales));
}

// Get sales data
function getSales() {
  return JSON.parse(localStorage.getItem("salesData")) || [];
}

// Format currency (Naira ₦)
function formatCurrency(value) {
  return "₦" + value.toLocaleString("en-NG", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2
  });
}

// Check login
function checkLogin() {
  const user = getLoggedInUser();
  if (!user) {
    window.location.href = "index.html";
  } else {
    const usernameDisplay = document.getElementById("usernameDisplay");
    if (usernameDisplay) {
      usernameDisplay.textContent = "Welcome, " + user.username;
    }
  }
}

// Setup logout
function setupLogout() {
  const logoutBtn = document.getElementById("logoutBtn");
  if (logoutBtn) {
    logoutBtn.addEventListener("click", () => {
      localStorage.removeItem("loggedInUser");
      window.location.href = "index.html";
    });
  }
}
