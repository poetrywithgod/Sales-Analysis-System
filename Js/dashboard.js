/* ===== Dashboard Logic ===== */

// Check login
checkLogin();
setupLogout();

// Fetch sales data
let sales = getSales();

// ===== Summary Cards =====

// Total Sales
const totalSales = sales.reduce((sum, s) => sum + (s.quantity * s.price), 0);
document.getElementById("totalSales").textContent = formatCurrency(totalSales);

// Total Orders
document.getElementById("totalOrders").textContent = sales.length;

// Unique Customers
const customers = new Set(sales.map(s => s.customer));
document.getElementById("totalCustomers").textContent = customers.size;

// ===== Render Charts (from charts.js) =====
renderCharts();
