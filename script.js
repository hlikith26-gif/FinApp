let yourexpenses = 0;
let monthlyBudget = 0;
let monthlyIncome = 0;
let expenseItems = [];

// ----------------------------
// Expense Logic
// ----------------------------
const form = document.getElementById("expenseForm");
const totalSpan = document.getElementById("totalExpenses");
const expenseList = document.getElementById("expenseList");
const addedMsg = document.getElementById("addedMsg");

if (form) {
    form.addEventListener("submit", function (e) {
        e.preventDefault();

        const name = document.getElementById("expName").value.trim();
        const amount = Number(document.getElementById("expAmount").value);
        const category = document.getElementById("expCat").value;

        if (!name || isNaN(amount) || amount <= 0) return;

        // Add to total
        yourexpenses += amount;

        // Store expense
        expenseItems.push({ name, amount, category });

        // Update total display
        totalSpan.textContent = yourexpenses.toLocaleString("en-US", {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2
        });

        // Render expense list
        expenseList.innerHTML = "";
        expenseItems.forEach(exp => {
            const li = document.createElement("li");
            li.textContent = `${exp.name} - ₹${exp.amount.toLocaleString("en-US")} - ${exp.category}`;
            expenseList.appendChild(li);
        });

        // Budget alerts
        if (monthlyBudget > 0 && yourexpenses > monthlyBudget) {
            alert("You have spent more than your Budget!");
        }

        if (monthlyIncome > 0 && yourexpenses > monthlyIncome) {
            alert("You are in debt");
        }

        // Confirmation
        addedMsg.style.display = "block";
        setTimeout(() => addedMsg.style.display = "none", 1500);

        // Clear inputs (dropdown stays)
        document.getElementById("expName").value = "";
        document.getElementById("expAmount").value = "";
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
        budgetInput.value = "";
    });
}

// ----------------------------
// Set Monthly Income
// ----------------------------
const incomeInput = document.getElementById("setIncome");
const incomeBtn = document.getElementById("setIncomeBtn");
const incomeDisplay = document.getElementById("monthlyIncome");

const savedIncome = localStorage.getItem("monthlyIncome");
if (savedIncome) {
    monthlyIncome = Number(savedIncome);
    incomeDisplay.textContent = monthlyIncome.toLocaleString("en-US");
}

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
