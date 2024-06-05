document.addEventListener('DOMContentLoaded', () => {
    loadarrayfinanceiros();
    setUser();
});

function setUser() {
    let user = localStorage.getItem('username') || 'Usuário Desconhecido';
    document.getElementById('tagusuario').textContent = user;
}

function insereDados() {
    const valorInput = document.getElementById('valor');
    const entradaRadio = document.getElementById('comodato');
    const saidaRadio = document.getElementById('venda');
    let valor = parseFloat(valorInput.value);
    const tipo = entradaRadio.checked ? 'entrada' : (saidaRadio.checked ? 'saida' : '');

    if (!valor || !tipo) {
        alert('Por favor, preencha todos os campos.');
        return;
    }

    if (tipo === 'saida') {
        valor = -valor;
    }

    const arrayfinanceiro = {
        id: generateID(),
        date: new Date().toLocaleString(),
        valor: valor.toFixed(2),
        user: document.getElementById('tagusuario').textContent,
        tipo: tipo
    };

    savearrayfinanceiroLocalStorage(arrayfinanceiro);
    addarrayfinanceiroDOM(arrayfinanceiro);
    valorInput.value = '';
    entradaRadio.checked = false;
    saidaRadio.checked = false;
}

function generateID() {
    return Math.floor(Math.random() * 1000000);
}

function addarrayfinanceiroDOM(arrayfinanceiro) {
    const tabela = document.getElementById('tabela');
    const row = document.createElement('tr');

    row.innerHTML = `
        <td>${arrayfinanceiro.date}</td>
        <td>${arrayfinanceiro.valor}</td>
        <td>${arrayfinanceiro.user}</td>
        <td>${arrayfinanceiro.tipo}</td>
        <td>
            <button class="btn-edit" onclick="openEditModal(${arrayfinanceiro.id})">
                <i class="bi bi-pencil"></i>
            </button>
            <button class="btn-remove" onclick="removearrayfinanceiro(${arrayfinanceiro.id})">
                <i class="bi bi-trash"></i>
            </button>
        </td>
    `;
    tabela.appendChild(row);
}

function savearrayfinanceiroLocalStorage(arrayfinanceiro) {
    let arrayfinanceiros = getarrayfinanceirosLocalStorage();
    arrayfinanceiros.push(arrayfinanceiro);
    localStorage.setItem('arrayfinanceiros', JSON.stringify(arrayfinanceiros));
}

function getarrayfinanceirosLocalStorage() {
    return localStorage.getItem('arrayfinanceiros') ? JSON.parse(localStorage.getItem('arrayfinanceiros')) : [];
}

function loadarrayfinanceiros() {
    let arrayfinanceiros = getarrayfinanceirosLocalStorage();
    arrayfinanceiros.forEach(addarrayfinanceiroDOM);
}

function removearrayfinanceiro(id) {
    let arrayfinanceiros = getarrayfinanceirosLocalStorage();
    arrayfinanceiros = arrayfinanceiros.filter(arrayfinanceiro => arrayfinanceiro.id !== id);
    localStorage.setItem('arrayfinanceiros', JSON.stringify(arrayfinanceiros));
    document.getElementById('tabela').innerHTML = '';
    arrayfinanceiros.forEach(addarrayfinanceiroDOM);
}

let editarrayfinanceiroId = null;

function openEditModal(id) {
    let arrayfinanceiros = getarrayfinanceirosLocalStorage();
    let arrayfinanceiro = arrayfinanceiros.find(arrayfinanceiro => arrayfinanceiro.id === id);

    if (arrayfinanceiro) {
        document.getElementById('editValor').value = Math.abs(arrayfinanceiro.valor);
        if (arrayfinanceiro.tipo === 'entrada') {
            document.getElementById('editEntrada').checked = true;
        } else {
            document.getElementById('editSaida').checked = true;
        }

        editarrayfinanceiroId = id;
        document.getElementById('editModal').style.display = 'block';
    }
}

function closeModal() {
    document.getElementById('editModal').style.display = 'none';
}

function saveEdit() {
    let arrayfinanceiros = getarrayfinanceirosLocalStorage();
    let arrayfinanceiro = arrayfinanceiros.find(arrayfinanceiro => arrayfinanceiro.id === editarrayfinanceiroId);

    if (arrayfinanceiro) {
        let valorEditado = parseFloat(document.getElementById('editValor').value);
        let tipoEditado = document.querySelector('input[name="editTipo"]:checked').value;

        if (tipoEditado === 'saida') {
            valorEditado = -valorEditado;
        }

        arrayfinanceiro.valor = valorEditado.toFixed(2);
        arrayfinanceiro.tipo = tipoEditado;
        localStorage.setItem('arrayfinanceiros', JSON.stringify(arrayfinanceiros));
        refreshTable();
        closeModal();
    }
}

function refreshTable() {
    const tabela = document.getElementById('tabela');
    tabela.innerHTML = '';
    let arrayfinanceiros = getarrayfinanceirosLocalStorage();
    arrayfinanceiros.forEach(arrayfinanceiro => addarrayfinanceiroDOM(arrayfinanceiro));
}