const modalWindow = document.querySelector(".modal-window");
const modalWindowBtn = document.querySelector(".modal-window__button")
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
modalWindow.style.display = "none";

for (let key of optionalExpensesItems) {
    key.disabled = true;
}

for (let key of expensesItems) {
    key.disabled = true;
}

chooseIncome.disabled = true;
checkSavings.disabled = true;

sum.disabled = true;
percent.disabled = true;

chooseIncome.addEventListener("input", function() {
    let items = chooseIncome.value;
    appData.income = items.split(", ");
    incomeValue.textContent = appData.income;

});

checkSavings.addEventListener("click", function() {
    sum.disabled = false;
    percent.disabled = false;
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

var regExPData = /[0-9]{4}-(0[1-9]|1[012])-(0[1-9]|1[0-9]|2[0-9]|3[01])/; // проверка ввода даты

let modalTime = document.querySelector(".modal-window__date");
let modalMoney = document.querySelector(".modal-window__budget");

let tooltip = document.querySelectorAll(".tooltip");
startPayment.addEventListener("click", function() {
    modalWindow.style.display = "block";

    time = document.querySelector(".modal-window__date").value;
    money = +(document.querySelector(".modal-window__budget").value);


    modalWindowBtn.addEventListener("click", function() {

    time = document.querySelector(".modal-window__date").value;
    money = +(document.querySelector(".modal-window__budget").value);


        if (time.match(regExPData) && typeof(money) === "number" && money !== 0){
            console.log(true);
                   
            modalWindow.style.display = "none";
            
            tooltip[0].style.display = "none";
            tooltip[1].style.display = "none";

            appData.budget = money;
            appData.timeData = time;
            budgetValue.textContent = numberWithSpaces(money.toFixed());
            year.value = new Date(Date.parse(time)).getFullYear();
            month.value = new Date(Date.parse(time)).getMonth() + 1;
            day.value = new Date(Date.parse(time)).getDate();

            determineLevel();
        } 
        
        else if((time.match(regExPData) == null) && (typeof(money) !== "number" || money === 0)) {
            console.log("money & data false");

            tooltip[0].style.display = "inline-block";
            tooltip[1].style.display = "inline-block";

        }   
        
        else if (time.match(regExPData) == null){
            console.log("data false");
            tooltip[0].style.display = "inline-block";
            tooltip[1].style.display = "none";
        }   
        
        else if(typeof(money) !== "number" || money === 0) {
            console.log("money false");
            tooltip[0].style.display = "none";
            tooltip[1].style.display = "inline-block";
        }   
        
    });


    appData.budget = money;
    appData.timeData = time;
    budgetValue.textContent = numberWithSpaces(money.toFixed());
    year.value = new Date(Date.parse(time)).getFullYear();
    month.value = new Date(Date.parse(time)).getMonth() + 1;
    day.value = new Date(Date.parse(time)).getDate();
    expensesItemBtn.disabled = false;
    optionalExpensesBtn.disabled = false;
    chooseIncome.disabled = false;
    checkSavings.disabled = false;
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
            // let lastInputPrice = document.querySelector(".expenses__enter-items").children[document.querySelector(".expenses__enter-items").children.length - 1];
            // let lastInputName = document.querySelector(".expenses__enter-items").children[document.querySelector(".expenses__enter-items").children.length - 1];

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


    addOptionalItem.addEventListener("click", function(){
        deleteOptionalItem.style.display = "flex";
        deleteOptionalItem.classList.add("delete-expenses");

        let optionalInput = document.createElement("input");
        optionalInput.classList.add("optional-expenses__enter-item");
        optionalInput.classList.add("enter-item");

        optionalExpensesEnterItems.appendChild(optionalInput);
        optionalExpensesItems = document.querySelectorAll(".optional-expenses__enter-item");
        console.log(optionalExpensesValue.textContent);

        optionalExpensesObj = Object.assign({}, appData.optionalExpenses);
        optionalTextContent = (Object.values(optionalExpensesObj)).join(" ");
        optionalExpensesValue.textContent = optionalTextContent;

        deleteOptionalItem.addEventListener("click", function() {
            optionalExpensesEnterItems.removeChild(optionalInput);
            deleteOptionalItem.style.display = "none";

            const lastOptExpensesElement = Object.keys(appData.optionalExpenses)[Object.keys(appData.optionalExpenses).length - 1];
            console.log(lastOptExpensesElement);
            optionalExpensesItems = document.querySelectorAll(".optional-expenses__enter-item");

            delete appData.optionalExpenses[lastOptExpensesElement];

            optionalExpensesObj = Object.assign({}, appData.optionalExpenses);
            optionalTextContent = (Object.values(optionalExpensesObj)).join(" ");
            optionalExpensesValue.textContent = optionalTextContent;

        });
    });

    determineLevel();
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

        if (expensesItems[i].value) {
            expensesItemBtn.removeAttribute("data-tooltip");
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
        }   else {
            console.log("error");
            expensesItemBtn.setAttribute("data-tooltip", "Введите данные");

        }

            
    }
    expensesValue.textContent = sum;
    determineLevel();
}

function determineLevel() {
    if (appData.budget != undefined) {
        appData.moneyPerDay = ((appData.budget - (+expensesValue.textContent)) / 30 ).toFixed(1);
        dayBudgetValue.textContent = numberWithSpaces(appData.moneyPerDay);
    
        if (appData.moneyPerDay < 100) {
            levelValue.textContent = "Минимальный уровень достатка $";
            levelValue.style.color = "red";
        }   else if (appData.moneyPerDay > 100 && appData.moneyPerDay < 2000) {
            levelValue.textContent = "Средний уровень достатка $$";
            levelValue.style.color = "rgb(242,202,3)";
        }   else if (appData.moneyPerDay > 2000) {
            levelValue.textContent = "Высокий уровень достатка $$$";
            levelValue.style.color = "green";
        }   else {
            levelValue.textContent = "Error";
        }
    }   else {
        dayBudgetValue.textContent = "Произошла ошибка";
    }
}

var optionalExpensesObj = Object.assign({}, appData.optionalExpenses);
var optionalTextContent = (Object.values(optionalExpensesObj)).join(" ");

optionalExpensesBtn.addEventListener("click", function() {
    for(let i = 0; i < optionalExpensesItems.length; i++) {
        let opt = optionalExpensesItems[i].value;
        appData.optionalExpenses[i] = opt;
        optionalExpensesValue.textContent += appData.optionalExpenses[i] + " ";
    }
    optionalExpensesObj = Object.assign({}, appData.optionalExpenses);
    optionalTextContent = (Object.values(optionalExpensesObj)).join(" ");
    optionalExpensesValue.textContent = optionalTextContent;
    console.log("click");
});

//раздение числа по разрядам
function numberWithSpaces(x) {
    var parts = x.toString().split(".");
    parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, " ");
    return parts.join(".");
  }
