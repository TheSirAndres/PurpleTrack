// var and selector
const form = document.querySelector('#transactionForm');
const incomeDisplay = document.querySelector('#income-box p');
const expenseDisplay = document.querySelector('#expense-box p');
const savingDisplay = document.querySelector('#saving-display');
const totalDisplay = document.querySelector('#total-display');
const incomes = document.querySelector('#incomes-container');
const expenses = document.querySelector('#expenses-container');
const savings = document.querySelector('#savings-container');
const formSubmit = document.querySelector('#transactionForm .btn-primary');
const addModal = document.getElementById('addModal');
// events

// classes
class Report{
    constructor(incomes, expenses, savings) {
        this.incomes = incomes;
        this.expenses = expenses;
        this.savings = savings;
        this.total = incomes - expenses - savings;
        this.transactionsList = [];
    }
    addTransaction(type, amount) {
        if (type === 'income'){
            this.incomes += Number(amount);
        } else if (type === 'expense'){
            this.expenses += Number(amount);
        } else if (type ==='savings'){
            this.savings += Number(amount)
        }
        this.total = this.incomes - this.expenses - this.savings;
        ui.displayData(this.incomes, this.expenses, this.savings, this.total);
    }
}

class Transaction {
    constructor(type, amount, description, id) {
        this.type = type;
        this.amount = amount;
        this.description = description;
        this.id = id;
    }
    registerTransaction(transaction){
        report.transactionsList.push(transaction);
        console.log(report.transactionsList)

    }
}
class UI{
    displayData(income, expenses, savings, total) {
        incomeDisplay.textContent = ``
        expenseDisplay.textContent = ``
        savingDisplay.textContent = ``
        totalDisplay.textContent = ``
        incomeDisplay.textContent = `$${income}`
        expenseDisplay.textContent = `$${expenses}`
        savingDisplay.textContent = `$${savings}`
        totalDisplay.textContent = `$${total}`
    }
}


// instance
const ui = new UI();
const report = new Report(0, 0, 0);
console.log(report);
console.log(ui);
// funtions

eventListeners()

function eventListeners() {
    document.addEventListener('DOMContentLoaded', ui.displayData(report.incomes, report.expenses, report.savings, report.total));
    document.addEventListener('DOMContentLoaded', getFormData)
    formSubmit.addEventListener('click', verifyTransaction)
}

function getFormData(){
    const amount = document.querySelector('#input1');
    const description = document.querySelector('#input2');
    const inputs = document.querySelector('.type-selector');
    amount.addEventListener('blur', validate)
    amount.addEventListener('input', validate)
    description.addEventListener('blur', validate)
    description.addEventListener('input', validate)
    inputs.addEventListener('click', validate)
}

function validate(e) {
    const amount = document.querySelector('#input1').value;
    const description = document.querySelector('#input2').value;
    const type = () => {
        if (document.querySelector('.type-selector .active')){
            return document.querySelector('.type-selector .active').getAttribute('data-type');
        } else {
        return '';
        }
    }
    console.log(amount, description, type())
    const error = document.createElement('p')
    error.className = 'error';
    if(amount === '' || description === '' || type() === ''){
        error.textContent = 'All fields are required';
        e.preventDefault();
        showError(e, error);
    }else if(isNaN(amount) || amount <= 0){
        error.textContent = 'Amount must be a positive number';
        e.preventDefault();
        showError(e, error);
    } else {
        if (document.querySelector('.error')){
            document.querySelector('.error').remove();
        }
        document.querySelector('.btn-primary').classList.remove('disabled')
    }
}

function showError(e, error) {
    if(!e.target.parentElement.parentElement.querySelector('.error')){
        e.target.parentElement.parentElement.appendChild(error);
        document.querySelector('.btn-primary').classList.add('disabled')
    }
}

function verifyTransaction(e) {
    console.log('Verifying transaction');
    e.preventDefault();
    if (document.querySelector('.btn-primary').classList.contains('disabled')){
        return;
    } else {
        const amount = document.querySelector('#input1').value;
        const description = document.querySelector('#input2').value;
        const type = document.querySelector('.type-selector .active').getAttribute('data-type');
        if (type === 'expense' || type === 'savings'){
            console.log('Verifying subtraction')
            if (amount > report.incomes){
                const error = document.createElement('p')
                error.className = 'error';
                error.textContent = 'Not enough money to add this transaction';
                showError(e, error);
            } else {
                if (document.querySelector('.error')){
                    document.querySelector('.error').remove()
                }
                registerTransaction(type, amount, description);
            }
        } else {
            registerTransaction(type, amount, description);
        }
    }
}
function registerTransaction(type, amount, description){
    addModal.style.display = 'none';
    report.addTransaction(type, amount);
    const transaction = new Transaction(type, amount, description, Date.now())
    transaction.registerTransaction(transaction);
    clearFields();
}

function clearFields(){
    document.querySelector('#input1').value = '';
    document.querySelector('#input2').value = '';
    document.querySelector('.type-selector .active').classList.remove('active');
    document.querySelector('.btn-primary').classList.add('disabled');
}
