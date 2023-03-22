//Função formatar data.

function dateExpense(date) {
  const dataEntrada = new Date(date);
  const timezoneOffset = 180;
  const newTime = dataEntrada.getTime() + timezoneOffset * 60 * 1000;
  const converteData = new Date(newTime);
  let dia = converteData.getDate();
  let mes = converteData.getMonth() + 1;
  let ano = converteData.getFullYear();
  return `${dia >= 10 ? dia : `0${dia}`}/${mes >= 10 ? mes : `0${mes}`}/${ano}`;
}

//Função para checar data.

function checkDate(dataVencimento, late) {
  const [dia, mes, ano] = dataVencimento.split("/");
  const data = new Date(`${ano}-${mes}-${dia}`);
  if (data < new Date()) late++;
  return late;
}
