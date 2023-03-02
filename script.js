(function() {
  'use strict'

  var forms = document.querySelectorAll('.needs-validation')

  Array.prototype.slice.call(forms)
    .forEach(function(form) {
      form.addEventListener('submit', function(event) {
        if (!form.checkValidity()) {
          form.classList.add('was-validated')
        } else {
          inserir()
          form.classList.remove('was-validated')
          form.reset()
        }
        event.preventDefault()
        event.stopPropagation()
      }, false)
    })
})()


function getLocalStorage() {
  return JSON.parse(localStorage.getItem('bd_maquiagens')) ?? [];
}

function setLocalStorage(bd_maquiagens) {
  localStorage.setItem('bd_maquiagens', JSON.stringify(bd_maquiagens));
}

function limparTabela() {
  var elemento = document.querySelector("#tabela>tbody");
  while (elemento.firstChild) {
    elemento.removeChild(elemento.firstChild);
  }
}

function atualizarTabela() { // Adaptação da função atualizarTabela (5 pontos)
  limparTabela();
  const bd_maquiagens = getLocalStorage();
  let index = 0;
  for (maquiagem of bd_maquiagens) {
    const novaLinha = document.createElement('tr');
    novaLinha.innerHTML = `
        <th scope="row">${index}</th>
        <td>${maquiagem.codigo}</td>
        <td>${maquiagem.marca}</td>
        <td>${maquiagem.categoria}</td>
        <td>${maquiagem.descricao}</td>
        <td>${maquiagem.Fórmula}</td>
        <td>${maquiagem.lote}</td>        

        <td>
            <button type="button" class="btn btn-danger" id="${index}" onclick="excluir(${index})">Excluir</button>
        </td>
    `
    document.querySelector('#tabela>tbody').appendChild(novaLinha)
    index++;
  }
}

function inserir() { // Adaptação da função inserir (10 pontos)
  const maquiagem = {
    codigo: document.getElementById('codigo').value,
    marca: document.getElementById('marca').value,
    categoria: document.getElementById('categoria').value,
    descricao: document.getElementById('descricao').value,
    Fórmula: document.getElementById('Fórmula').value,
    lote: document.getElementById('lote').value
  }
  const bd_maquiagens = getLocalStorage();
  bd_maquiagens.push(maquiagem);
  setLocalStorage(bd_maquiagens);
  atualizarTabela();
}

function excluir(index) { // Adaptação da função excluir (5 pontos)
  const bd_maquiagens = getLocalStorage();
  bd_maquiagens.splice(index, 1);
  setLocalStorage(bd_maquiagens);
  atualizarTabela();
}

function validarCodigo() { // Adaptação da função validar (10 pontos)
  const bd_maquiagens = getLocalStorage();
  for (maquiagem of bd_maquiagens) {
    if (codigo.value == maquiagem.codigo) {
      codigo.setCustomValidity("Este número de codigo já existe!");
      feedbackcodigo.innerText = "Este número de codigo já existe!";
      return false;
    } else {
      codigo.setCustomValidity("");
      feedbackcodigo.innerText = "Informe o codigo corretamente.";
    }
  }
  return true;
}

atualizarTabela();
// Seleção dos elementos e adição do listener para validação customizada (5 pontos)
const codigo = document.getElementById("codigo");
const feedbackcodigo = document.getElementById("feedbackcodigo");
codigo.addEventListener('input', validarCodigo);