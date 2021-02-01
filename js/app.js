const startPayment = document.querySelector(".start-payment-button");
const budgetValue = document.querySelector(".budget-value");
const dayBudgetValue = document.querySelector(".daybudget-value");
const levelValue = document.querySelector(".level-value");
const expensesValue = document.querySelector(".expenses-value");
var optionalExpensesItems = document.querySelectorAll(".optional-expenses__enter-item");
const incomeValue = document.querySelector(".income-value");
const monthSavingsValue = document.querySelector(".monthsavings-value");
const yearSavingsValue = document.querySelector(".yearsavings-value");

var expensesItems = document.querySelectorAll(".expenses__enter-item");
const expensesItemBtn = document.querySelector(".expenses__button");
const optionalExpensesBtn = document.querySelector(".optional-expenses__button");
const optionalExpensesValue = document.querySelector(".optionalexpenses-value");

const chooseIncome = document.querySelector(".income__enter");
const checkSavings = document.querySelector(".check-savings");
const sum = document.querySelector(".sum");
const percent = document.querySelector(".percent");
const year = document.querySelector(".data__year");
const month = document.querySelector(".data__month");
const day = document.querySelector(".data__day");

let money, time;

expensesItemBtn.disabled = true;
optionalExpensesBtn.disabled = true;

for (let key of optionalExpensesItems) {
    key.disabled = true;
    key.style.backgroundColor = "white";
}

for (let key of expensesItems) {
    key.disabled = true;
    key.style.backgroundColor = "white";
}

chooseIncome.disabled = true;
chooseIncome.style.backgroundColor = "white";

checkSavings.disabled = true;

sum.disabled = true;
sum.style.backgroundColor = "white";
percent.disabled = true;
percent.style.backgroundColor = "white";

chooseIncome.addEventListener("input", function() {
    let items = chooseIncome.value;
    appData.income = items.split(", ");
    incomeValue.textContent = appData.income;

});

checkSavings.addEventListener("click", function() {
    if (appData.savings) {
        appData.savings = false;
    } else {
        appData.savings = true;
    }
});

sum.addEventListener("input", function() {
    if (appData.savings) {
        let currentSum = +sum.value,
            currentPercent = +percent.value;

     appData.monthIncome = currentSum / 100 / 12 * currentPercent;
     appData.yearIncome = currentSum / 100 * currentPercent;

     monthSavingsValue.textContent = appData.monthIncome.toFixed(1);
     yearSavingsValue.textContent = appData.yearIncome.toFixed(1);
    }
});


percent.addEventListener("input", function() {
    if (appData.savings) {
        let currentSum = +sum.value,
        currentPercent = +percent.value;

    appData.monthIncome = currentSum / 100 / 12 * currentPercent;
    appData.yearIncome = currentSum / 100 * currentPercent;

    monthSavingsValue.textContent = appData.monthIncome.toFixed(1);
    yearSavingsValue.textContent = appData.yearIncome.toFixed(1);

    }
});

let appData = {
    budget: money,
    expenses: {},
    optionalExpenses: {},
    income: [],
    timeData: time,
    savings: false,
};


startPayment.addEventListener("click", function() {
    time = prompt("Введите дату в формате YYYY-MM-DD");
    money = +prompt("Ваш бюджет на месяц?");

    while(isNaN(money) || money == "" || money == null) {
        money = +prompt("Ваш бюджет на месяц?");
    }
    appData.budget = money;
    appData.timeData = time;
    budgetValue.textContent = money.toFixed();
    year.value = new Date(Date.parse(time)).getFullYear();
    month.value = new Date(Date.parse(time)).getMonth() + 1;
    day.value = new Date(Date.parse(time)).getDate();
    expensesItemBtn.disabled = false;
    optionalExpensesBtn.disabled = false;
    chooseIncome.disabled = false;
    checkSavings.disabled = false;
    sum.disabled = false;
    percent.disabled = false;
    for (let key of optionalExpensesItems) {
        key.disabled = false;
    }
    
    for (let key of expensesItems) {
        key.disabled = false;
    }

    const addExpensesItem = document.querySelector(".add-expenses");
    const deleteExpensesItem = document.querySelector(".input-delete");
    const addOptionalItem = document.querySelector(".add-optional-expenses");
    const deleteOptionalItem = document.querySelector(".delete-optional-expenses");
    const expensesEnterItems = document.querySelector(".expenses__enter-items");
    const optionalExpensesEnterItems = document.querySelector(".optional-expenses__enter-items");

    addExpensesItem.addEventListener("click", function(){
        deleteExpensesItem.style.display = "flex";
        deleteExpensesItem.classList.add("delete-expenses");

        let inputName = document.createElement("input");
        let inputPrice = document.createElement("input");

        inputName.classList.add("expenses__enter-item");
        inputName.classList.add("enter-item");
        inputName.placeholder = "Наименование";
        expensesEnterItems.appendChild(inputName);

        inputPrice.classList.add("expenses__enter-item");
        inputPrice.classList.add("enter-item");
        inputPrice.placeholder = "Цена";
        inputPrice.type = "number";
        expensesEnterItems.appendChild(inputPrice);

        deleteExpensesItem.addEventListener("click", function() {
            expensesEnterItems.removeChild(inputName);
            expensesEnterItems.removeChild(inputPrice);
            deleteExpensesItem.style.display = "none";
          
            console.log(appData.expenses);
            const lastExpensesElement = Object.keys(appData.expenses)[Object.keys(appData.expenses).length - 1]; // последний элемент appData.expenses
            console.log(appData.expenses[lastExpensesElement]);
            expensesItems = document.querySelectorAll(".expenses__enter-item");
            delete appData.expenses[lastExpensesElement];
            countMoney();

        });
    });

    // addOptionalItem.addEventListener("click", function(){
    //     deleteOptionalItem.style.display = "flex";
    //     deleteOptionalItem.classList.add("delete-expenses");
        
    //     let optionalExpenses = document.createElement("input");

    //     optionalExpenses.classList.add("optional-expenses__enter-item");
    //     optionalExpenses.classList.add("enter-item");
    //     optionalExpensesEnterItems.appendChild(optionalExpenses);
    //     console.log("click");

    //     optionalExpensesItems = document.querySelectorAll(".optional-expenses__enter-item");

    //     deleteOptionalItem.addEventListener("click", function() {
    //         optionalExpensesEnterItems.removeChild(optionalExpenses);
    //         deleteOptionalItem.style.display = "none";

    //         console.log(appData.optionalExpenses);
    //         const lastOptionalExpenses = Object.keys(appData.optionalExpenses)[Object.keys(appData.optionalExpenses).length - 1]; // последний элемент appData.optionalExpenses
    //         optionalExpensesItems = document.querySelectorAll(".optional-expenses__enter-item");
    //         delete appData.optionalExpenses[lastOptionalExpenses];

    //         optionalExpensesValue.textContent = (Array.from(optionalExpensesItems)).join("");
    //     });

    // });

    if (appData.budget != undefined) {
        appData.moneyPerDay = ((appData.budget - (+expensesValue.textContent)) / 30 ).toFixed(1);
        dayBudgetValue.textContent = appData.moneyPerDay;
    
        if (appData.moneyPerDay < 100) {
            levelValue.textContent = "Минимальный уровень достатка";
        }   else if (appData.moneyPerDay > 100 && appData.moneyPerDay < 2000) {
            levelValue.textContent = "Средний уровень достатка";
        }   else if (appData.moneyPerDay > 2000) {
            levelValue.textContent = "Высокий уровень достатка";
        }   else {
            levelValue.textContent = "Error";
        }
    }   else {
        dayBudgetValue.textContent = "Произошла ошибка";
    }
});

expensesItemBtn.addEventListener("click", function() {
    countMoney();
});

function countMoney() {
    let sum = 0;
    expensesItems = document.querySelectorAll(".expenses__enter-item");
    console.log(expensesItems.length);
    console.log(expensesItems);
    for (let i = 0; i < expensesItems.length; i++) {
        let a = expensesItems[i].value,
            b = expensesItems[++i].value;
    
            if (typeof(a) === "string" && typeof(a) !== null && 
            typeof(b) !== null && a !== "" && b !== "" && a.length < 50) {
                console.log("done");
                appData.expenses[a] = b;
                sum += +b;
            }   else {
                i--;
            }
            
    }
    expensesValue.textContent = sum;
    if (appData.budget != undefined) {
        appData.moneyPerDay = ((appData.budget - (+expensesValue.textContent)) / 30 ).toFixed(1);
        dayBudgetValue.textContent = appData.moneyPerDay;
    
        if (appData.moneyPerDay < 100) {
            levelValue.textContent = "Минимальный уровень достатка";
        }   else if (appData.moneyPerDay > 100 && appData.moneyPerDay < 2000) {
            levelValue.textContent = "Средний уровень достатка";
        }   else if (appData.moneyPerDay > 2000) {
            levelValue.textContent = "Высокий уровень достатка";
        }   else {
            levelValue.textContent = "Error";
        }
    }   else {
        dayBudgetValue.textContent = "Произошла ошибка";
    }
}

optionalExpensesBtn.addEventListener("click", function() {
    for(let i = 0; i < optionalExpensesItems.length; i++) {
        let opt = optionalExpensesItems[i].value;
        appData.optionalExpenses[i] = opt;
        optionalExpensesValue.textContent += appData.optionalExpenses[i] + " ";
    }
    console.log("click");
});
