/* ===== Charts Rendering ===== */

function renderCharts() {
  const sales = getSales(); // from utils.js

  // If no sales data, show placeholders
  if (!sales || sales.length === 0) {
    const ctx1 = document.getElementById("barChart").getContext("2d");
    ctx1.font = "16px Poppins";
    ctx1.fillStyle = "#999";
    ctx1.textAlign = "center";
    ctx1.fillText("No data available", ctx1.canvas.width / 2, ctx1.canvas.height / 2);

    const ctx2 = document.getElementById("pieChart").getContext("2d");
    ctx2.font = "16px Poppins";
    ctx2.fillStyle = "#999";
    ctx2.textAlign = "center";
    ctx2.fillText("No data available", ctx2.canvas.width / 2, ctx2.canvas.height / 2);
    return;
  }

  // Aggregate sales by category
  const categoryTotals = {};
  sales.forEach(s => {
    categoryTotals[s.category] = (categoryTotals[s.category] || 0) + (s.quantity * s.price);
  });

  const labels = Object.keys(categoryTotals);
  const values = Object.values(categoryTotals);

  // Bar Chart
  const ctxBar = document.getElementById("barChart");
  if (ctxBar) {
    new Chart(ctxBar, {
      type: "bar",
      data: {
        labels: labels,
        datasets: [{
          label: "Sales ($)",
          data: values,
          backgroundColor: "#007bff"
        }]
      },
      options: {
        responsive: true,
        plugins: { legend: { display: false } },
        scales: {
          y: { beginAtZero: true }
        }
      }
    });
  }

  // Pie Chart
  const ctxPie = document.getElementById("pieChart");
  if (ctxPie) {
    new Chart(ctxPie, {
      type: "pie",
      data: {
        labels: labels,
        datasets: [{
          data: values,
          backgroundColor: [
            "#007bff", "#28a745", "#ffc107", "#dc3545", "#6610f2", "#6c757d"
          ]
        }]
      },
      options: {
        responsive: true,
        plugins: { legend: { position: "bottom" } }
      }
    });
  }
}
