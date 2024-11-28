const expenseForm = document.getElementById("expense-form");
const categoryInput = document.getElementById("category");
const amountInput = document.getElementById("amount");
const pieChartCanvas = document.getElementById("pie-chart");

let expenses = [];
let categories = [];
let amounts = [];

// initialize the Pie Chart (ensure that the canvas context is correct)
const ctx = pieChartCanvas.getContext("2d");

let chart = new Chart(ctx, {
  type: "pie",
  data: {
    labels: categories,
    datasets: [{
      data: amounts,
      backgroundColor: ["#ff9999", "#66b3ff", "#99ff99", "#ffcc99", "#c2c2f0", "#ffb3e6"],
    }]
  },
  options: {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
      tooltip: {
        callbacks: {
          label: function(tooltipItem) {
            return tooltipItem.label + ': ' + tooltipItem.raw;
          }
        }
      }
    }
  }
});

// event listener for form submission
expenseForm.addEventListener("submit", function(event) {
  event.preventDefault();

  const category = categoryInput.value.trim();
  const amount = parseFloat(amountInput.value);

  if (category && !isNaN(amount) && amount > 0) {
    // add expense to the list
    expenses.push({ category, amount });
    categories.push(category);
    amounts.push(amount);

    // update the Pie Chart
    chart.data.labels = categories;
    chart.data.datasets[0].data = amounts;
    chart.update();

    // clear form inputs
    categoryInput.value = "";
    amountInput.value = "";
  } else {
    alert("Please enter valid expense details.");
  }
});

