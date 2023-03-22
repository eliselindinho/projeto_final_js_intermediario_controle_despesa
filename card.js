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

//Criando cards

function cards() {
  let paidTotal = 0;
  let payable = 0;
  let late = 0;
  arrExpense.filter((card) => {
    if (card.status) paidTotal += Number(card.valor);
    if (!card.status) payable += Number(card.valor);
    if (!card.status) late = checkDate(card.dataVencimento, late);
  });
  cardTotalPaid.innerHTML = formataValor(paidTotal);
  cardTotalPayable.innerHTML = formataValor(payable);
  cardTotalLate.innerHTML = `${late}`;
}
