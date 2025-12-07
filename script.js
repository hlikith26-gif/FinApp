// Add expense form logic
// keep a running total of expenses
let yourexpenses = 0;

const form = document.getElementById("expenseForm");
if (form) {
    form.addEventListener("submit", function (e) {
        e.preventDefault(); // stop page reload

        // Get form data
        const name = document.getElementById("expName").value.trim();
        const amount = Number(document.getElementById("expAmount").value);
        const category = document.getElementById("expCat").value;

        if (!name || isNaN(amount)) return;

        // Update running total (fixed operator and no duplicate declaration)
        yourexpenses += amount;

        // Show confirmation message
        const msg = document.getElementById("addedMsg");
        if (msg) {
            msg.classList.remove("hidden");
            msg.innerText = `Added: ${name} - ₹${amount.toFixed(2)} (${category}) • Total: ₹${yourexpenses.toFixed(2)}`;

            // Hide message after 1.5 seconds
            setTimeout(() => {
                msg.classList.add("hidden");
            }, 1500);
        }

        // Clear the form
        this.reset();
    });
} else {
    console.warn('Expense form (#expenseForm) not found in the document.');
}
