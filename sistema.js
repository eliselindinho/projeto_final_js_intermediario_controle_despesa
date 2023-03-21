// let listCategoryRegister = JSON.parse(localStorage.getItem("listCategory"));
// let listCategory = listCategoryRegister ?? [];

let listCategory = [];
const arrStatus = [];

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
const cardTotalPaid = document.querySelector("#cardTotalPaid");
const cardTotalPayable = document.querySelector("#cardTotalPayable");
const cardTotalLate = document.querySelector("#cardTotalLate");
const categoryFilterHome = document.querySelector("#categoryFilterHome");
const homePageTable = document.querySelector("#homePageTable");
const bodyTableHomePage = document.querySelector("#bodyTableHomePage");
const modalButtonAddExpense = document.querySelector("#modalButtonAddExpense");
const modalAddExpense = document.querySelector("#modalAddExpense");
const categoryAddExpense = document.querySelector("#categoryAddExpense");
const dueDateAddExpense = document.querySelector("#dueDateAddExpense");
const valueAddExpense = document.querySelector("#valueAddExpense");
const valueAddExpenseMoney = document.querySelector("#valueAddExpenseMoney");
const categoryFilterRegister = document.querySelector(
  "#categoryFilterRegister"
);
const pageCategory = document.querySelector("#pageCategory");
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
const btnChangeStatusPending = document.querySelector(
  "#btnChangeStatusPending"
);
const btnChangeStatusPaid = document.querySelector("#btnChangeStatusPaid");
const btnChangeStatusLate = document.querySelector("#btnChangeStatusLate");

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
  categoriesSearch(arrSearchCategories);
}

// Limpar o input depois que clicar em salvar.
function cleanInput() {
  typeInputText.forEach((input) => (input.value = ""));
}

// Função buscar categoria.

function categoriesSearch(category) {
  const objSearchCategories = bodyTableAddCategory.value;
}

// Função que lista todas as categorias na tabela.

function showCategories(array) {
  let listCategories = "";
  array.forEach((category) => {
    listCategories += `<tr>
    <td>${category.id}</td>
    <td>${category.nome}</td>
      <td><button type="button" id="btnEditList" class="buttonblueTable" onclick="showEditCategory('${category.id}', '${category.nome}')">Editar</button>
      <button type="button" id="btnDeleteList" class="buttonCancelTable" onclick="removeCategory(${category.id})">Excluir
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

// Função para editar categoria

function showEditCategory(id, nome) {
  modalAddEditCategory.style.display = "block";
  categoryFilterEditAdd.value = nome;

  buttonSave.setAttribute("onclick", `editCategory(${id})`);
}

function editCategory(id) {
  arrRegisterCategory.map((category) => {
    if (category.id == id) {
      if (categoryFilterEditAdd.value.trim() == "") {
        alert("Digite uma categoria.");
      } else {
        category.nome = categoryFilterEditAdd.value.trim();
      }
    }
  });
  showCategories(arrRegisterCategory);
  cleanInput();
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

//Função formatar valor

function formataValor(valor) {
  let dinheiro = Number(valor);
  dinheiro = dinheiro.toLocaleString("pt-BR", {
    style: "currency",
    currency: "BRL",
  });
  return dinheiro;
}

// function dateExpense() {
//   let dateCurrent = new Date();
//   let datePayment = new Date(
//     dateCurrent.setDate(dateCurrent.getDate() + 30)
//   ).toLocaleDateString("pt-BR");
//   dueDateAddExpense.setAttribute("placeholder", `${datePayment}`);
//   return datePayment;
// }

// Função salvar despesas

const arrExpense = [];

function saveExpense() {
  const objetExpense = {
    dataVencimento: dueDateAddExpense.value,
    despesa: valueAddExpense.value,
    valor: formataValor(valueAddExpenseMoney.value),
    status: "Pendente",
  };
  arrExpense.push(objetExpense);
  insertExpenseInHtml(arrExpense);
  cleanInput();
}
buttonSaveAddExpense.addEventListener("click", () => saveExpense());

// Salvar as despesas que serão criadas, inserindo no HTML

function insertExpenseInHtml() {
  let listExpense = "";
  arrExpense.forEach((expense) => {
    listExpense += `
      <tr>
      <td>${expense.dataVencimento}</td>
      <td>${expense.despesa}</td>
      <td>${expense.valor}</td>
      <td>
      <button type="button" id='btnChangeStatusPending' onclick="changeStatus()">PENDENTE</button>
      <button type="button" id='btnChangeStatusPaid'>PAGO</button>
      <button type="button" id='btnChangeStatusLate'>ATRASADO</button>
      </td>
    </tr>`;
  });
  bodyTableHomePage.innerHTML = listExpense;
}

  // Mudar status da despesa.

  btnChangeStatusPending.onclick = changeStatus(){
    if ((onclick = btnChangeStatusPending)) {
      btnChangeStatusPending.disabled == true;
      btnChangeStatusPaid.disabled == false;
    } else {
      btnChangeStatusPaid.disable == true;
      btnChangeStatusPending.disable == false;
    }
    if ((onclick = btnChangeStatusPaid)) {
      btnChangeStatusPaid.disabled == true;
      btnChangeStatusLate.disabled == false;
    } else {
      btnChangeStatusLate.disable == true;
      btnChangeStatusPaid.disable == false;
    }
  };

  insertExpenseInHtml();
  cleanInput();
};

let validateStatus = (status) => {
  let statusExpense = "";
  switch (status) {
    case "Pendente":
      statusExpense = "pending";
      break;
    case "Pago":
      statusExpense = "paid";
      break;
    case "Atrasado":
      statusExpense = "late";
      break;
  }
  return statusExpense;
};
btnChangeStatusPending.addEventListener("click", changeStatus);

// const typeExpense = [
//   {
//     dataVencimento: dateExpense(),
//     despesa: valueAddExpense.value,
//     valor: valueAddExpenseMoney.value,
//     status: changeStatus(),
//   },
// ];

// Função para mostrar quantidades no card da página principal

const cardExpensePaid = () => {
  let cardPaymentsPaid = arrExpense.reduce((acumulador, expense) => {
    return (acumulador += expense.valor), 0;
  }, 0);
  cardTotalPaid.innerHTML = `${cardPaymentsPaid}`;
};

const cardExpensePayable = () => {
  let cardPayamentsPayable = arrExpense.reduce((acumulador, expense) => {
    return (acumulador += expense.valor), 0;
  }, 0);
  cardTotalPayable.innerHTML = `${arrExpense.length - cardPayamentsPayable}`;
};

//Função filtrar despesas

categoryFilterHome.addEventListener("keyup", () => {
  let meetExpense = categoryFilterHome.value.toLowerCase().trim();
  let expenseFiltered = arrExpense.filter((expense) => {
    let compareExpense = expense.status.toLowerCase().startsWith(meetExpense);
    return compareExpense;
  });
  insertExpenseInHtml(expenseFiltered);
  cleanInput();
});
