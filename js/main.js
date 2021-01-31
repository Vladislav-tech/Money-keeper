const startPayment = document.querySelector(".start-payment-button");
const budgetValue = document.querySelector(".budget-value");
const dayBudgetValue = document.querySelector(".daybudget-value");
const levelValue = document.querySelector(".level-value");
const expensesValue = document.querySelector(".expenses-value");
const optionalExpensesItems = document.querySelectorAll(".optional-expenses__enter-item");
const incomeValue = document.querySelector(".income-value");
const monthSavingsValue = document.querySelector(".monthsavings-value");
const yearSavingsValue = document.querySelector(".yearsavings-value");

const expensesItems = document.querySelectorAll(".expenses__enter-item");
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
    day.value = new Date(Date.parse(time)).getDate() + 1;
    expensesItemBtn.disabled = false;
    optionalExpensesBtn.disabled = false;

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
    let sum = 0;
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
});

optionalExpensesBtn.addEventListener("click", function() {
    for(let i = 0; i < optionalExpensesItems.length; i++) {
        let opt = optionalExpensesItems[i].value;
        appData.optionalExpenses[i] = opt;
        optionalExpensesValue.textContent += appData.optionalExpenses[i] + " ";
    }
    console.log("click");
});

// countBudgetBtn.addEventListener("click", function() {

//     if (appData.budget != undefined) {
//         appData.moneyPerDay = ((appData.budget - (+expensesValue.textContent)) / 30 ).toFixed(1);
//         dayBudgetValue.textContent = appData.moneyPerDay;
    
//         if (appData.moneyPerDay < 100) {
//             levelValue.textContent = "Минимальный уровень достатка";
//         }   else if (appData.moneyPerDay > 100 && appData.moneyPerDay < 2000) {
//             levelValue.textContent = "Средний уровень достатка";
//         }   else if (appData.moneyPerDay > 2000) {
//             levelValue.textContent = "Высокий уровень достатка";
//         }   else {
//             levelValue.textContent = "Error";
//         }
//     }   else {
//         dayBudgetValue.textContent = "Произошла ошибка";
//     }
// });