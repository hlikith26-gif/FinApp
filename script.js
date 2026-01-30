// ----------------------------
// Global State (NO persistence)
// ----------------------------
let yourexpenses = 0;
let monthlyBudget = 0;
let monthlyIncome = 0;
let expenseItems = [];

// ----------------------------
// DOM Elements
// ----------------------------
const form = document.getElementById("expenseForm");
const totalSpan = document.getElementById("totalExpenses");
const expenseList = document.getElementById("expenseList");
const addedMsg = document.getElementById("addedMsg");
const rSpan = document.getElementById("RBudget");

// ----------------------------
// Expense Logic
// ----------------------------
if (form) {
  form.addEventListener("submit", function (e) {
    e.preventDefault();

    const name = document.getElementById("expName").value.trim();
    const amount = Number(document.getElementById("expAmount").value);
    const category = document.getElementById("expCat").value;

    if (!name || isNaN(amount) || amount <= 0) return;

    expenseItems.push({ name, amount, category });

    renderExpenses();
    updateTotalExpenses();
    updateRemainingBudget();

    if (monthlyBudget > 0 && yourexpenses > monthlyBudget) {
      alert("You have spent more than your Budget!");
    }

    if (monthlyIncome > 0 && yourexpenses > monthlyIncome) {
      alert("You are in debt");
    }

    addedMsg.style.display = "block";
    setTimeout(() => (addedMsg.style.display = "none"), 1500);

    document.getElementById("expName").value = "";
    document.getElementById("expAmount").value = "";
  });
}

// ----------------------------
// Render Expenses
// ----------------------------
function renderExpenses() {
  expenseList.innerHTML = "";

  expenseItems.forEach(exp => {
    const li = document.createElement("li");
    li.textContent = `${exp.name} - ₹${exp.amount.toLocaleString("en-US")} - ${exp.category}`;
    expenseList.appendChild(li);
  });
}

// ----------------------------
// Totals
// ----------------------------
function updateTotalExpenses() {
  yourexpenses = expenseItems.reduce((sum, exp) => sum + exp.amount, 0);

  totalSpan.textContent = yourexpenses.toLocaleString("en-US", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2
  });
}

// ----------------------------
// Set Monthly Budget
// ----------------------------
document.getElementById("setBudgetBtn")?.addEventListener("click", () => {
  const input = document.getElementById("setBudget");
  const amount = Number(input.value);
  if (isNaN(amount) || amount <= 0) return;

  if (monthlyIncome > 0 && amount > monthlyIncome) {
    alert("Budget cannot exceed income");
    return;
  }

  monthlyBudget = amount;
  document.getElementById("monthlyBudget").innerText =
    amount.toLocaleString("en-US");

  input.value = "";
  updateRemainingBudget();
});

// ----------------------------
// Set Monthly Income
// ----------------------------
document.getElementById("setIncomeBtn")?.addEventListener("click", () => {
  const input = document.getElementById("setIncome");
  const income = Number(input.value);
  if (isNaN(income) || income <= 0) return;

  monthlyIncome = income;
  document.getElementById("monthlyIncome").innerText =
    income.toLocaleString("en-US");

  input.value = "";
});

// ----------------------------
// Remaining Budget
// ----------------------------
function updateRemainingBudget() {
  const remaining = monthlyBudget - yourexpenses;

  rSpan.innerText = remaining.toLocaleString("en-US", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2
  });

  rSpan.style.color =
    remaining < 0 ? "red" :
    remaining < monthlyBudget * 0.25 ? "orange" :
    "#3FB950";
}

// ----------------------------
// Undo Last Expense
// ----------------------------
document.getElementById("undoBtn")?.addEventListener("click", () => {
  if (expenseItems.length === 0) {
    alert("Nothing to undo!");
    return;
  }

  expenseItems.pop();
  renderExpenses();
  updateTotalExpenses();
  updateRemainingBudget();
});
document.addEventListener("DOMContentLoaded", () => {
  const resetBtn = document.getElementById("resetAll");

  if (!resetBtn) return;

  resetBtn.addEventListener("click", () => {
    const sure = confirm("Are you sure you want to reset all your finance data?");
    if (!sure) return;

    // Reset forms
    document.querySelectorAll("form").forEach(form => {
      form.reset();
    });

    // Reset displays
    document.getElementById("monthlyBudget").textContent = "0";
    document.getElementById("RBudget").textContent = "0";
    document.getElementById("totalExpenses").textContent = "0.00";
    document.getElementById("monthlyIncome").textContent = "0";

    // Clear expense list
    document.getElementById("expenseList").innerHTML = "";

    // Clear saved data
    localStorage.clear();

    alert("All data has been reset!");
  });
});
