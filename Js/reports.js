// ===== Reports Page Logic =====

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

// Load sales data
let sales = JSON.parse(localStorage.getItem("salesData")) || [];
const tableBody = document.querySelector("#salesTable tbody");
const searchCustomer = document.getElementById("searchCustomer");
const filterCategory = document.getElementById("filterCategory");

// Render table
function renderTable() {
  tableBody.innerHTML = "";
  const search = searchCustomer.value.toLowerCase();
  const category = filterCategory.value;

  const filtered = sales.filter(s => {
    const matchesCustomer = s.customer.toLowerCase().includes(search);
    const matchesCategory = category ? s.category === category : true;
    return matchesCustomer && matchesCategory;
  });

  filtered.forEach(s => {
    const row = `
      <tr>
        <td>${s.customer}</td>
        <td>${s.product}</td>
        <td>${s.category}</td>
        <td>${s.quantity}</td>
        <td>${formatCurrency(s.price)}</td>
        <td>${formatCurrency(s.price * s.quantity)}</td>
        <td>${s.date}</td>
      </tr>
    `;
    tableBody.insertAdjacentHTML("beforeend", row);
  });
}

renderTable();

// Filters
searchCustomer.addEventListener("input", renderTable);
filterCategory.addEventListener("change", renderTable);

// Export CSV
document.getElementById("exportBtn").addEventListener("click", () => {
  let csv = "Customer,Product,Category,Quantity,Price (₦),Total (₦),Date\n";
  sales.forEach(s => {
    csv += `${s.customer},${s.product},${s.category},${s.quantity},${s.price},${s.price * s.quantity},${s.date}\n`;
  });

  const blob = new Blob([csv], { type: "text/csv" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = "sales_report.csv";
  a.click();
  URL.revokeObjectURL(url);
});
