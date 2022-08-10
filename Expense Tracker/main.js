var state = {
    balance: 1000,
    income: 400,
    expense: 100,
    transactions: [
        
    ]
}

var balance_el = document.querySelector("#balance");
var income_el = document.querySelector("#income");
var expense_el = document.querySelector("#expense");
var transaction_list_el = document.querySelector("#transaction-list");
var incomeBtn_el = document.querySelector("#incomeBtn");
var expenseBtn_el = document.querySelector("#expenseBtn");
var nameInput_el = document.querySelector("#name");
var amountInput_el = document.querySelector("#amount");

function init() {
    var localState = JSON.parse(localStorage.getItem("expenseTrackerState"));

    if ( localState !== null) {
        state = localState;
    }
    updateState();
    initListeners();
}

function uniqueId() {
    return Math.round(Math.random() * 100000);
}

function initListeners() {
    incomeBtn_el.addEventListener('click', onAddIncomeClick);
    expenseBtn_el.addEventListener('click', onAddExpenseClick);
}

function onAddIncomeClick() {
    addTransaction(nameInput_el.value, amountInput_el.value, "income");
}

function addTransaction(name, amount, type) {
    if ( name !== '' && amount !== '') {
        var transaction = {
            id: uniqueId(),
            name: name,
            amount: parseInt(amount),
            type: type,
        };

        state.transactions.push(transaction);

        updateState();
    } else {
        alert("Please enter valid data");
    }

    nameInput_el.value = '';
    amountInput_el.value = '';
}

function onAddExpenseClick() {
    addTransaction(nameInput_el.value, amountInput_el.value, "expense");
}

function onDeleteClick(event) {
    var id = parseInt(event.target.getAttribute("data-id"));
    var deleteIndex;
    
    for ( var i = 0; i < state.transactions.length; i++) {
        if ( state.transactions[i].id === id ) {
            deleteIndex = i;
            break;
        }
    }
    state.transactions.splice(deleteIndex, 1);

    updateState();
}

function updateState() {
    var balance = 0,
        income = 0,
        expense = 0,
        item;

        for ( var i = 0; i < state.transactions.length; i++) {
            item = state.transactions[i];

            if ( item.type === "income") {
                income += item.amount;
            } else if ( item.type === "expense") {
                expense += item.amount;
            }
        }
        balance = income - expense;

        state.balance = balance;
        state.income = income;
        state.expense = expense;

        localStorage.setItem("expenseTrackerState", JSON.stringify(state));
        render();
}

function render() {
    balance_el.innerHTML =`$${state.balance}`;
    income_el.innerHTML =`$${state.income}`;
    expense_el.innerHTML =`$${state.expense}`;

    var transaction_el, container_el, amount_el, item, btn_el;

    transaction_list_el.innerHTML = "";

    for (var i=0; i<state.transactions.length; i++) {
        item = state.transactions[i];
        transaction_el = document.createElement("li");
        transaction_el.append(item.name);

        transaction_list_el.appendChild(transaction_el);

        container_el = document.createElement("div");
        amount_el = document.createElement("span");

        if (item.type === "income") {
            amount_el.classList.add("income-amt");
        } else if (item.type === "expense") {
            amount_el.classList.add("expense-amt");
        }
        amount_el.innerHTML = `$${item.amount}`;

        container_el.appendChild(amount_el);

        btn_el = document.createElement("button");
        btn_el.setAttribute("data-id", item.id);
        btn_el.innerHTML = "X";
        btn_el.style.cursor = "pointer";

        btn_el.addEventListener("click", onDeleteClick);

        container_el.appendChild(btn_el);

        transaction_el.appendChild(container_el);
    }
}

init();