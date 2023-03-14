let expense = document.querySelector("#expenses");
let category = document.querySelector("#category");
let home = document.querySelector("#home");
let addExpense = document.querySelector("#addExpense");
let categoryRegister = document.querySelector("#categoryRegister");
let modalAddEditCategory = document.querySelector("#modalAddEditCategory");
let monitoringTotalPaid = document.querySelector("#monitoringTotalPaid");
let monitoringTotalPayable = document.querySelector("#monitoringTotalPayable");
let monitoringLate = document.querySelector("#monitoringLate");
let categoryFilter = document.querySelector("#categoryFilterHome");
let homePageTable = document.querySelector("#homePageTable");
let bodyTableHomePage = document.querySelector("#bodyTableHomePage");
let modalButtonAddExpense = document.querySelector("#modalButtonAddExpense");
let modalAddExpense = document.querySelector("#modalAddExpense");
let categoryAddExpense = document.querySelector("#categoryAddExpense");
let dueDateAddExpense = document.querySelector("#dueDateAddExpense");
let valueAddExpense = document.querySelector("#valueAddExpense");
let saveAddExpense = document.querySelector("#saveAddExpense");
let categoryFilterRegister = document.querySelector("#categoryFilterRegister");
let headerTableCategoryRegister = document.querySelector(
  "#headerTableCategoryRegister"
);
let categoryRegisterTableHeader = document.querySelector(
  "#categoryRegisterTableHeader"
);
let bodyTableAddCategory = document.querySelector("#bodyTableAddCategory");
let categoryFilterEditAdd = document.querySelector("#categoryFilterEditAdd");

let buttonFilter = document.querySelector("#buttonFilter");
let buttonCancelAddExpense = document.querySelector("#cancelAddExpense");
let buttonFilterCategory = document.querySelector("#buttonFilterCategory");
let buttonSave = document.querySelector("#buttonSave");
let buttonForCancel = document.querySelector("#buttonForCancel");

function activeExpense(active, desactive) {
  category.classList.remove("active");
  expense.classList.add("active");
}

function activeCategory(active, desactive) {
  expense.classList.remove("active");
  category.classList.add("active");
}
