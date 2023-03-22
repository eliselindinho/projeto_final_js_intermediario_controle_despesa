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

// Função salvar despesas

const arrExpense = [];
const stats = false;
let cod = 0;

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
