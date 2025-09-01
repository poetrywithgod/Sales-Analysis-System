// Check login
const user = JSON.parse(localStorage.getItem("loggedInUser"));
if (!user) {
  window.location.href = "index.html";
}

// Logout
document.getElementById("logoutBtn").addEventListener("click", () => {
  localStorage.removeItem("loggedInUser");
  window.location.href = "index.html";
});

// Handle sales form
const form = document.getElementById("salesForm");
const successMsg = document.getElementById("successMsg");

form.addEventListener("submit", (e) => {
  e.preventDefault();

  const sale = {
    customer: document.getElementById("customer").value,
    product: document.getElementById("product").value,
    category: document.getElementById("category").value,
    quantity: parseInt(document.getElementById("quantity").value),
    price: parseFloat(document.getElementById("price").value),
    date: document.getElementById("date").value
  };

  // Save to localStorage
  let sales = JSON.parse(localStorage.getItem("salesData")) || [];
  sales.push(sale);
  localStorage.setItem("salesData", JSON.stringify(sales));

  // Show success
  successMsg.textContent = "✅ Sale record saved successfully!";
  form.reset();

  // Remove message after 3s
  setTimeout(() => successMsg.textContent = "", 3000);
});
