let yourexpenses = 0;
let monthlyBudget = 0;
let monthlyIncome = 0;

// ----------------------------
// Expense Logic
// ----------------------------
const form = document.getElementById("expenseForm");
if (form) {
    form.addEventListener("submit", function (e) {
        e.preventDefault();

        const name = document.getElementById("expName").value.trim();
        const amount = Number(document.getElementById("expAmount").value);
        const category = document.getElementById("expCat").value;

        if (!name || isNaN(amount) || amount <= 0) return;

        yourexpenses += amount;

        // Update total expenses display
        const totalSpan = document.getElementById("totalExpenses");
        if (totalSpan) {
            totalSpan.innerText = yourexpenses.toLocaleString("en-US", {
                minimumFractionDigits: 2,
                maximumFractionDigits: 2
            });
        }

        // Alerts
        if (monthlyBudget > 0 && yourexpenses > monthlyBudget) {
            alert("You have spent more than your Budget!");
        }

        if (monthlyIncome > 0 && yourexpenses > monthlyIncome) {
            alert("You are in debt");
        }

        // Confirmation message
        const msg = document.getElementById("addedMsg");
        if (msg) {
            msg.classList.remove("hidden");
            msg.innerText = `Added: ${name} - ₹${amount.toLocaleString("en-US")} (${category})`;
            setTimeout(() => msg.classList.add("hidden"), 1500);
        }

        this.reset();
    });
}

// ----------------------------
// Set Monthly Budget Logic
// ----------------------------
const budgetInput = document.getElementById("setBudget");
const budgetBtn = document.getElementById("setBudgetBtn");
const budgetDisplay = document.getElementById("monthlyBudget");

if (budgetBtn && budgetInput && budgetDisplay) {
    budgetBtn.addEventListener("click", function () {
        const amount = Number(budgetInput.value);

        if (isNaN(amount) || amount <= 0) {
            alert("Please enter a valid budget amount.");
            return;
        }

        if (monthlyIncome > 0 && amount > monthlyIncome) {
            alert("Your budget is more than your Income, choose a different Budget");
            budgetInput.value = "";
            return;
        }

        monthlyBudget = amount;
        budgetDisplay.innerText = amount.toLocaleString("en-US");
        budgetInput.value = "";
    });
}

// ----------------------------
// Set Monthly Income Logic
// ----------------------------
const setIncomeInput = document.getElementById("setIncome");
const setIncomeBtn = document.getElementById("setIncomeBtn");
const monthlyIncomeSpan = document.getElementById("monthlyIncome");

// Load saved income on page load
const savedIncome = localStorage.getItem("monthlyIncome");
if (savedIncome) {
    monthlyIncome = Number(savedIncome);
    monthlyIncomeSpan.textContent = monthlyIncome.toLocaleString("en-US");
}

if (setIncomeBtn) {
    setIncomeBtn.addEventListener("click", () => {
        const income = Number(setIncomeInput.value);

        if (isNaN(income) || income <= 0) {
            alert("Please enter a valid income amount");
            return;
        }

        monthlyIncome = income;
        monthlyIncomeSpan.textContent = income.toLocaleString("en-US");
        localStorage.setItem("monthlyIncome", income);

        // If current budget becomes invalid
        if (monthlyBudget > income) {
            alert("Your budget is more than your Income, choose a different Budget");
            monthlyBudget = 0;
            if (budgetDisplay) budgetDisplay.innerText = "0";
        }

        setIncomeInput.value = "";
    });
}
