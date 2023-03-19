// let listCategoryRegister = JSON.parse(localStorage.getItem("listCategory"));
// let listCategory = listCategoryRegister ?? [];

let listCategory = [];

const expense = document.querySelector("#expenses");
const category = document.querySelector("#category");
const home = document.querySelector("#home");
const addExpense = document.querySelector("#addExpense");
const categoryRegister = document.querySelector("#categoryRegister");
const modalAddEditCategory = document.querySelector("#modalAddEditCategory");
const monitoringTotalPaid = document.querySelector("#monitoringTotalPaid");
const monitoringTotalPayable = document.querySelector(
  "#monitoringTotalPayable"
);
const monitoringLate = document.querySelector("#monitoringLate");
const categoryFilter = document.querySelector("#categoryFilterHome");
const homePageTable = document.querySelector("#homePageTable");
const bodyTableHomePage = document.querySelector("#bodyTableHomePage");
const modalButtonAddExpense = document.querySelector("#modalButtonAddExpense");
const modalAddExpense = document.querySelector("#modalAddExpense");
const categoryAddExpense = document.querySelector("#categoryAddExpense");
const dueDateAddExpense = document.querySelector("#dueDateAddExpense");
const valueAddExpense = document.querySelector("#valueAddExpense");
const valueAddExpenseMoney = document.querySelector("#valueAddExpense");
const categoryFilterRegister = document.querySelector(
  "#categoryFilterRegister"
);
const headerTableCategoryRegister = document.querySelector(
  "#headerTableCategoryRegister"
);
const categoryRegisterTableHeader = document.querySelector(
  "#categoryRegisterTableHeader"
);
const bodyTableAddCategory = document.querySelector("#bodyTableAddCategory");
const categoryFilterEditAdd = document.querySelector("#categoryFilterEditAdd");

const typeInputText = document.querySelectorAll(".typeInputText");

const buttonFilter = document.querySelector("#buttonFilter");
const buttonCancelAddExpense = document.querySelector(
  "#buttonCancelAddExpense"
);
const buttonFilterCategory = document.querySelector("#buttonFilterCategory");
const buttonSave = document.querySelector("#buttonSave");
const buttonSaveAddExpense = document.querySelector("#buttonSaveAddExpense");
const buttonForCancel = document.querySelector("#buttonForCancel");
const buttonAddExpenseTriggerModal = document.querySelector(
  "#buttonAddExpenseTriggerModal"
);
const buttonPageRegisterCategory = document.querySelector(
  "#buttonPageRegisterCategory"
);
const filterClean = document.querySelector("#filterClean");

const numberId = 1000;

// Alternar entre categoria e despesas.

function activeExpense() {
  categoryRegister.style.display = "none";
  home.style.display = "block";
}

expense.addEventListener("click", activeExpense);

function activeCategory() {
  categoryRegister.style.display = "block";
  home.style.display = "none";
}

category.addEventListener("click", activeCategory);

// Mostrar e  fechar o modal de adição de despesas.

function showModalAddExpense() {
  addExpense.style.display = "block";
}

buttonAddExpenseTriggerModal.addEventListener("click", showModalAddExpense);

function hideModalExpense() {
  addExpense.style.display = "none";
}

buttonCancelAddExpense.addEventListener("click", hideModalExpense);

// Ativar o botão de adicionar categoria para mostrar o modal de cadastro e edição.

function editionModalCategory() {
  modalAddEditCategory.style.display = "block";
}

buttonPageRegisterCategory.addEventListener("click", editionModalCategory);

// Fechar o modal de cadastro.
function hideModalCategory() {
  modalAddEditCategory.style.display = "none";
}

buttonForCancel.addEventListener("click", hideModalCategory);

// Salvar as categorias que serão criadas.

const arrRegisterCategory = [];
let numberRegisterId = 1000;

function saveRegisterCategory() {
  numberRegisterId += 1;
  const objetCategory = {
    id: numberRegisterId,
    nome: categoryFilterEditAdd.value,
  };
  arrRegisterCategory.push(objetCategory);
  cleanInput();
  showCategories(arrRegisterCategory);
}

buttonSave.addEventListener("click", () => saveRegisterCategory());

// Limpar o input depois que clicar em salvar.
function cleanInput() {
  typeInputText.forEach((input) => (input.value = ""));
}

// Função que lista todas as categorias na tabela.

function showCategories(array) {
  let listCategories = "";
  array.forEach((category) => {
    listCategories += `<tr>
    <td>${category.id}</td>
    <td>${category.nome}</td>
      <td><button type="button" id="btnEditList" class="buttonblueTable">Editar
      </button>
      <button type="button" id="btnDeleteList" class="buttonCancelTable" onclick = "removeCategory(${category.id})">Excluir
      </button>
      </td>
    </tr>`;
  });
  bodyTableAddCategory.innerHTML = listCategories;
}

function removeCategory(id) {
  arrRegisterCategory.filter((category, indice) => {
    if (id == category.id) {
      arrRegisterCategory.splice(indice, 1);
    }
  });
  showCategories(arrRegisterCategory);
}

//Função para filtrar categorias.

categoryFilterRegister.addEventListener("keyup", () => {
  let meetCategory = categoryFilterRegister.value.toLowerCase().trim();
  let categoryFiltered = arrRegisterCategory.filter((category) => {
    let compareCategory = category.nome.toLowerCase().startsWith(meetCategory);
    return compareCategory;
  });
  showCategories(categoryFiltered);
  cleanInput();
});

function dateExpense() {
  let dateCurrent = new Date();
  let datePayment = new Date(
    dateCurrent.setDate(dateCurrent.getDate() + 30)
  ).toLocaleDateString("pt-BR");
  dueDateAddExpense.value = datePayment;
}

// Função salvar despesas

const arrExpense = [];

function saveExpense() {
  const objetExpense = {
    dataVencimento: dateExpense(),
    despesa: valueAddExpense.value,
    valor: valueAddExpenseMoney.value,
  };
  arrExpense.push(objetExpense);
  insertExpenseInHtml(arrExpense);
  cleanInput();
}
buttonSaveAddExpense.addEventListener("click", () => saveExpense());

// Salvar as despesas que serão criadas, inserindo no HTML

function insertExpenseInHtml(array) {
  let listExpense = "";
  array.forEach((expense) => {
    listExpense += `
    <tr>
    <td>${expense.dataVencimento}</td>
    <td>${expense.despesa}</td>
    <td>${expense.valor}</td>
    <td>
    <button type="button" class="btnChangeStatus" onclick="changeStatus()">Pendência</button></td>
  </tr>`;
  });
  bodyTableHomePage.innerHTML = listExpense;
}

// Mudar status da despesa.

// // TOTAL PAGO TOTAL A PAGAR ATRASADO - USAR O REDUCE
