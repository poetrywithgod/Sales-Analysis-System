/* ===== Charts for Dashboard ===== */

function renderCharts() {
  const sales = getSales();

  // Aggregate Sales by Category
  const categories = {};
  sales.forEach(s => {
    categories[s.category] = (categories[s.category] || 0) + s.quantity * s.price;
  });

  // ==== Bar Chart: Sales per Category ====
  const ctx = document.getElementById("salesChart");
  if (ctx) {
    new Chart(ctx, {
      type: "bar",
      data: {
        labels: Object.keys(categories),
        datasets: [{
          label: "Total Sales (₦)",
          data: Object.values(categories),
          backgroundColor: ["#007bff", "#28a745", "#ffc107", "#dc3545"]
        }]
      },
      options: {
        responsive: true,
        plugins: {
          legend: { display: false },
          tooltip: {
            callbacks: {
              label: function(context) {
                return formatCurrency(context.raw);
              }
            }
          }
        },
        scales: {
          y: {
            beginAtZero: true,
            ticks: {
              callback: function(value) {
                return formatCurrency(value);
              }
            }
          }
        }
      }
    });
  }

  // ==== Line Chart: Sales Over Time ====
  const sorted = [...sales].sort((a, b) => new Date(a.date) - new Date(b.date));
  const dates = sorted.map(s => s.date);
  const totals = sorted.map(s => s.quantity * s.price);

  const ctx2 = document.getElementById("revenueChart");
  if (ctx2) {
    new Chart(ctx2, {
      type: "line",
      data: {
        labels: dates,
        datasets: [{
          label: "Revenue (₦)",
          data: totals,
          borderColor: "#007bff",
          fill: false,
          tension: 0.3
        }]
      },
      options: {
        responsive: true,
        plugins: {
          legend: { display: true },
          tooltip: {
            callbacks: {
              label: function(context) {
                return formatCurrency(context.raw);
              }
            }
          }
        },
        scales: {
          y: {
            beginAtZero: true,
            ticks: {
              callback: function(value) {
                return formatCurrency(value);
              }
            }
          }
        }
      }
    });
  }
}
