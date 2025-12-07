let yourexpenses = 0;

const form = document.getElementById("expenseForm");
if (form) {
    form.addEventListener("submit", function (e) {
        e.preventDefault(); // stop page reload

        const name = document.getElementById("expName").value.trim();
        const amount = Number(document.getElementById("expAmount").value);
        const category = document.getElementById("expCat").value;

        if (!name || isNaN(amount)) return;

        // Update running total
        yourexpenses += amount;

        // Update total expenses display
        const totalSpan = document.getElementById("totalExpenses");
        if (totalSpan) totalSpan.innerText = yourexpenses.toFixed(2);

        // Show confirmation message
        const msg = document.getElementById("addedMsg");
        if (msg) {
            msg.classList.remove("hidden");
            msg.innerText = `Added: ${name} - ₹${amount.toFixed(2)} (${category}) • Total: ₹${yourexpenses.toFixed(2)}`;

            setTimeout(() => msg.classList.add("hidden"), 1500);
        }

        // Clear the form
        this.reset();
    });
} else {
    console.warn('Expense form (#expenseForm) not found in the document.');
}

// ----------------------------
// Set Monthly Budget Logic
// ----------------------------
const budgetInput = document.getElementById("setBudget");
const budgetBtn = document.getElementById("setBudgetBtn");
const budgetDisplay = document.getElementById("monthlyBudget");

if (budgetBtn && budgetInput && budgetDisplay) {
    budgetBtn.addEventListener("click", function() {
        const amount = Number(budgetInput.value);
        if (!isNaN(amount) && amount > 0) {
            budgetDisplay.innerText = amount.toLocaleString(); // formatted with commas
            budgetInput.value = ""; // clear input
        } else {
            alert("Please enter a valid budget amount.");
        }
    });
}