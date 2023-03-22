const arrExpense = [];
const stats = false;
let cod = 0;

// Mostrar e  fechar o modal de adição de despesas.

function showModalAddExpense() {
  addExpense.style.display = "block";
}

buttonAddExpenseTriggerModal.addEventListener("click", showModalAddExpense);

function hideModalExpense() {
  addExpense.style.display = "none";
}

buttonCancelAddExpense.addEventListener("click", hideModalExpense);

// Salvar as despesas que serão criadas, inserindo no HTML

function insertExpenseInHtml(array) {
  let listExpense = "";
  cards();
  array.forEach((expense) => {
    listExpense += `
        <tr>
        <td>${expense.dataVencimento}</td>
        <td>${expense.despesa}</td>
        <td>${formataValor(expense.valor)}</td>
        <td>
        <button type="button" id='${
          expense.status ? "btnChangeStatusPaid" : "btnChangeStatusPending"
        }' onclick="changeStatus(${expense.codigo})">${
      expense.status ? "PAGO" : "PENDENTE"
    }</button>
      <button class="buttonCancelTable" onclick="removeExpense(${
        expense.codigo
      })">Excluir</button>
        </td>
      </tr>`;
  });
  bodyTableHomePage.innerHTML = listExpense;
  saveMessage(true, "Despesa incluída com sucesso!");
}

// Função excluir despesas.

function removeExpense(id) {
  arrExpense.filter((category, indice) => {
    if (id == category.codigo) {
      arrExpense.splice(indice, 1);
    }
  });
  insertExpenseInHtml(arrExpense);
  saveLocalExpense();
  saveMessage(true, "Convidado removido co sucesso!");
}

// Mudar status da despesa.

function changeStatus(id) {
  arrExpense.filter((expense, index) => {
    if (expense.codigo == id) {
      arrExpense[index].status = arrExpense[index].status ? false : true;
    }
  });
  insertExpenseInHtml(arrExpense);
  saveLocalExpense();
}

//Função filtrar despesas

categoryFilterHome.addEventListener("keyup", () => {
  let meetExpense = categoryFilterHome.value.toLowerCase().trim();
  let expenseFiltered = arrExpense.filter((expense) => {
    return (
      expense.despesa.toLowerCase().includes(meetExpense) ||
      expense.dataVencimento.includes(meetExpense) ||
      expense.valor.includes(meetExpense)
    );
  });
  insertExpenseInHtml(expenseFiltered);
  cleanInput();
});

// Função salvar despesas

function saveExpense() {
  const objetExpense = {
    dataVencimento: dateExpense(dueDateAddExpense.value),
    despesa: valueAddExpense.value,
    valor: valueAddExpenseMoney.value,
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

//Função salvar local Despesas

function saveLocalExpense() {
  localStorage.setItem("arquivoDespesa", JSON.stringify(arrExpense));
}

function restoreExpense() {
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
restoreExpense();

//Exibir mensagem de despesa cadastrada com sucesso.

function saveMessage(
  sucesso = true,
  mensagem = "Despesa cadastrada com sucesso!"
) {
  let messageExpense = fadeAddExpense.getAttribute("class");
  messageExpense = sucesso
    ? messageExpense.replace("alert-danger", "alert-sucess")
    : messageExpense.replace("alert-sucess", "alert-danger");

  fadeAddExpense.setAttribute("class", messageExpense);
  fadeAddExpense.innerHTML = `${mensagem}
  <button type="button" class="btn-close aria-label="Close" onclick="fechaDivMensagemUsuario()></button>`;
  fadeAddExpense.removeAttribute("hidden");
}

function fechaDivMensagemUsuario() {
  fadeAddExpense.setAttribute("hidden", "");
}
