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
  buttonSave.setAttribute("onclick", `saveRegisterCategory()`);
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
  saveLocalCategory();
}
buttonSave.setAttribute("onclick", `saveRegisterCategory()`);

// Limpar o input depois que clicar em salvar.
function cleanInput() {
  typeInputText.forEach((input) => (input.value = ""));
}

// Função que lista todas as categorias na tabela.

function showCategories(array) {
  let listCategories = "";
  categoryAddExpense.innerHTML = "";
  array.forEach((category) => {
    listCategories += `<tr>
    <td>${category.id}</td>
    <td>${category.nome}</td>
      <td><button type="button" id="btnEditList" class="buttonblueTable" onclick="showEditCategory('${category.id}', '${category.nome}')">Editar</button>
      <button type="button" id="btnDeleteList" class="buttonCancelTable" onclick="removeCategory(${category.id})">Excluir
      </button>
      </td>
    </tr>`;

    categoryAddExpense.innerHTML += `<option value="${category.nome}">${category.nome}</option>`;
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
  saveLocalCategory();
}

// Função salvar local as categorias.

function saveLocalCategory() {
  localStorage.setItem("arquivoCategoria", JSON.stringify(arrRegisterCategory));
}

function restaurarCategory() {
  const categoryRestarad = JSON.parse(localStorage.getItem("arquivoCategoria"));
  for (let e of categoryRestarad) {
    numberRegisterId++;
    const objetCategory = {
      id: e.id,
      nome: e.nome,
    };
    arrRegisterCategory.push(objetCategory);
  }
  showCategories(arrRegisterCategory);
}
restaurarCategory();

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
  saveLocalCategory();
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

// Função salvar despesas

const arrExpense = [];
const stats = false;
let cod = 0;

function saveExpense() {
  const objetExpense = {
    dataVencimento: dueDateAddExpense.value,
    despesa: valueAddExpense.value,
    valor: formataValor(valueAddExpenseMoney.value),
    status: stats,
    codigo: cod,
  };
  cod++;
  arrExpense.push(objetExpense);
  insertExpenseInHtml(arrExpense);
  saveLocalExpense();
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
      <button type="button" id='${
        expense.status ? "btnChangeStatusPaid" : "btnChangeStatusPending"
      }' onclick="changeStatus(${expense.id})">${
      expense.status ? "PAGO" : "PENDENTE"
    }</button>
      </td>
    </tr>`;
  });
  bodyTableHomePage.innerHTML = listExpense;
}

// Mudar status da despesa.

function changeStatus(id) {
  arrExpense.filter((expense, index) => {
    if (expense.id == id) {
      arrExpense[index].status = arrExpense[index].status ? false : true;
    }
  });
  insertExpenseInHtml(arrExpense);
  saveLocalExpense();
}

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
    return (
      expense.status.toLowerCase().includes(meetExpense) ||
      expense.despesa.toLowerCase().includes(meetExpense) ||
      expense.dataVencimento.includes(meetExpense) ||
      expense.valor.includes(meetExpense)
    );
  });
  insertExpenseInHtml(expenseFiltered);
  cleanInput();
});

//Função salvar local Despesas

function saveLocalExpense() {
  localStorage.setItem("arquivoDespesa", JSON.stringify(arrExpense));
}

function restaurarExpense() {
  const expenseRestarad = JSON.parse(localStorage.getItem("arquivoDespesa"));
  for (let e of expenseRestarad) {
    const objetExpense = {
      dataVencimento: e.dataVencimento,
      despesa: e.despesa,
      valor: e.valor,
      status: e.status,
      codigo: e.codigo,
    };
    arrExpense.push(objetExpense);
  }
  insertExpenseInHtml(arrExpense);
  console.log(arrExpense);
}
restaurarExpense();
