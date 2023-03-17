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
let valueAddExpenseMoney = document.querySelector("#valueAddExpense");
const saveAddExpense = document.querySelector("#saveAddExpense");
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
const buttonCancelAddExpense = document.querySelector("#cancelAddExpense");
const buttonFilterCategory = document.querySelector("#buttonFilterCategory");
const buttonSave = document.querySelector("#buttonSave");
const buttonForCancel = document.querySelector("#buttonForCancel");
const buttonAddExpenseTriggerModal = document.querySelector(
  "#buttonAddExpenseTriggerModal"
);
const buttonPageRegisterCategory = document.querySelector(
  "#buttonPageRegisterCategory"
);

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

const arrRegisterCategory = [
  {
    id: 1005,
    nome: "Elis",
  },
];
let numberRegisterId = 1000;

function saveRegisterCategory() {
  numberRegisterId += 1;
  const objetCategory = {
    id: numberRegisterId,
    nome: categoryFilterEditAdd.value,
  };
  arrRegisterCategory.push(objetCategory);
  console.log(arrRegisterCategory);
  cleanInput();
  showCategories();
}

buttonSave.addEventListener("click", () => saveRegisterCategory());

// Limpar o input depois que clicar em salvar.
function cleanInput() {
  typeInputText.forEach((input) => (input.value = ""));
}

// Função que lista todas as categorias na tabela.

// function showCategories() {
//   let listCategory = "";
//   arrRegisterCategory.forEach((category) => {
//     listCategory += `<tr>
//       <td>${category.id}</td>
//       <td>${category.nome}</td>
//       <td>
//       </td>
//     </tr>`;
//   });

//   bodyTableAddCategory.innerHTML = listCategory;
// }
// showCategories();

function showCategories() {
  arrRegisterCategory.forEach((category) => {
    bodyTableAddCategory.innerHTML += `
    <tr>
      <td>${category.id}</td>
      <td>${category.nome}</td>
      <td><button type="button" class="buttonblueTable">Editar
      </button>
      </td>
      <td><button type="button" class="buttonCancelTable">Excluir
      </button>
      </td>
    </tr>`;
  });
}
showCategories();

// Salvar as categorias que serão criadas.

const arrExpense = [];
const dataVencimento = [];

function dateExpense() {
  let dateCurrent = new Date();
  let datePayment = new Date(
    dateCurrent.setDate(dateCurrent.getDate() + 30)
  ).toLocaleDateString("pt-BR");
  datePayment.push(dueDateAddExpense);
}
dateExpense();

function saveExpense() {
  dataVencimento = dueDateAddExpense.value;
  const objetExpense = {
    dataVencimento: dateExpense(),
    despesa: valueAddExpense.value,
    valor: valueAddExpenseMoney.setAttribute(
      `${objectProduct.price.toLocaleString("pt-BR", {
        style: "currency",
        currency: "BRL",
      })}`
    ),
  };
  arrExpense.push(objetExpense);
  console.log(arrExpense);
  cleanInput();
  saveExpense();
}
console.log(saveExpense);

buttonSave.addEventListener("click", () => saveRegisterCategory());

// Função que lista todas as despesas pagas, a pagar e atrasadas.

function expenseList() {
  let listExpense = "";
  arrExpense.forEach((expense) => {
    listExpense += `<tr>
      <td>${expense.id}</td>
      <td>${expense.nome}</td>
      <td>
      </td>
    </tr>`;
  });

  bodyTableHomePage.innerHTML = listCategory;
}
expenseList();

// TOTAL PAGO TOTAL A PAGAR ATRASADO - USAR O REDUCE
