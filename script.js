// ----------------------------
// Global State
// ----------------------------
let yourexpenses = 0;
let monthlyBudget = 0;
let monthlyIncome = 0;
let expenseItems = JSON.parse(localStorage.getItem("expenseItems")) || [];

// ----------------------------
// DOM Elements
// ----------------------------
const form = document.getElementById("expenseForm");
const totalSpan = document.getElementById("totalExpenses");
const expenseList = document.getElementById("expenseList");
const addedMsg = document.getElementById("addedMsg");

// ----------------------------
// Load Saved Data
// ----------------------------
monthlyBudget = Number(localStorage.getItem("monthlyBudget")) || 0;
monthlyIncome = Number(localStorage.getItem("monthlyIncome")) || 0;

document.getElementById("monthlyBudget").innerText =
  monthlyBudget ? monthlyBudget.toLocaleString("en-US") : "0";

document.getElementById("monthlyIncome").innerText =
  monthlyIncome ? monthlyIncome.toLocaleString("en-US") : "0";

renderExpenses();
updateTotalExpenses();
updateRemainingBudget();

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

    saveData();
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
const budgetInput = document.getElementById("setBudget");
const budgetBtn = document.getElementById("setBudgetBtn");
const budgetDisplay = document.getElementById("monthlyBudget");

if (budgetBtn) {
  budgetBtn.addEventListener("click", () => {
    const amount = Number(budgetInput.value);
    if (isNaN(amount) || amount <= 0) return;

    if (monthlyIncome > 0 && amount > monthlyIncome) {
      alert("Budget cannot exceed income");
      return;
    }

    monthlyBudget = amount;
    budgetDisplay.textContent = amount.toLocaleString("en-US");
    localStorage.setItem("monthlyBudget", amount);
    budgetInput.value = "";

    updateRemainingBudget();
  });
}

// ----------------------------
// Set Monthly Income
// ----------------------------
const incomeInput = document.getElementById("setIncome");
const incomeBtn = document.getElementById("setIncomeBtn");
const incomeDisplay = document.getElementById("monthlyIncome");

if (incomeBtn) {
  incomeBtn.addEventListener("click", () => {
    const income = Number(incomeInput.value);
    if (isNaN(income) || income <= 0) return;

    monthlyIncome = income;
    incomeDisplay.textContent = income.toLocaleString("en-US");
    localStorage.setItem("monthlyIncome", income);
    incomeInput.value = "";
  });
}

// ----------------------------
// Remaining Budget
// ----------------------------
function updateRemainingBudget() {
  const rSpan = document.getElementById("RBudget");

  const remaining = monthlyBudget - yourexpenses;

  rSpan.innerText = remaining.toLocaleString("en-US", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2
  });

  rSpan.style.color =
    remaining < 0 ? "red" : remaining < monthlyBudget * 0.25 ? "orange" : "#3FB950";
}

// ----------------------------
// Undo / Delete Last Expense
// ----------------------------
function deleteLastExpense() {
  if (expenseItems.length === 0) return;

  expenseItems.pop();
  saveData();
  renderExpenses();
  updateTotalExpenses();
  updateRemainingBudget();
}

// ----------------------------
// Save to localStorage
// ----------------------------
function saveData() {
  localStorage.setItem("expenseItems", JSON.stringify(expenseItems));
}
