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
const fadeAddExpense = document.querySelector("#fadeAddExpense");
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

// Limpar o input depois que clicar em salvar.
function cleanInput() {
  typeInputText.forEach((input) => (input.value = ""));
}

//Função formatar valor

function formataValor(valor) {
  let dinheiro = Number(valor);
  dinheiro = dinheiro.toLocaleString("pt-BR", {
    style: "currency",
    currency: "BRL",
  });
  return dinheiro;
}

//Função para executar mensagem para o usuário e verificar se o input foi preenchido.

buttonSaveAddExpense.onclick = function () {
  if (input.value.trim()) {
    const objetExpense = {
      dataVencimento: dateExpense(dueDateAddExpense.value),
      despesa: valueAddExpense.value,
      valor: valueAddExpenseMoney.value,
      status: stats,
      codigo: cod,
    };
    arrExpense.push(objetExpense);
    saveMessage();
    exibirMensagemUsuario(true, "Cadastro realizado com sucesso!");
    categoryAddExpense.value.trim() === "" ||
      dueDateAddExpense.value.trim() === "" ||
      valueAddExpense.value.trim() === "" ||
      valueAddExpenseMoney.value.trim() === "";
  } else {
    exibirMensagemUsuario(false, "Por favor, preencha todos os campos!");
  }
};

function exibirMensagemUsuario(
  sucesso = true,
  mensagem = "Cadastro realizado com sucesso"
) {
  let classeAtual = buttonSaveAddExpense.getAttribute("class");
  classeAtual = sucesso
    ? classeAtual.replace("alert-danger", "alert-success")
    : classeAtual.replace("alert-success", "alert-danger");

  buttonSaveAddExpense.setAttribute("class", classeAtual);
  buttonSaveAddExpense.innerHTML = `  ${mensagem}
                                    <button
                                        type="button"
                                        class="btn-close"
                                        aria-label="Close"
                                        onclick="fechaDivMensagemUsuario()"
                                    ></button>`;
  buttonSaveAddExpense.removeAttribute("hidden");
}
