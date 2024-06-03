document.addEventListener('DOMContentLoaded', loadTransactions);

function insereDados() {
    const valorInput = document.getElementById('valor');
    const entradaRadio = document.getElementById('comodato');
    const saidaRadio = document.getElementById('venda');
    const valor = parseFloat(valorInput.value);
    const tipo = entradaRadio.checked ? 'entrada' : (saidaRadio.checked ? 'saida' : '');

    if (!valor || !tipo) {
        alert('Por favor, preencha todos os campos.');
        return;
    }

    const transaction = {
        id: generateID(),
        date: new Date().toLocaleString(),
        valor: valor.toFixed(2),
        user: document.getElementById('tagusuario').textContent,
        tipo: tipo
    };

    saveTransactionLocalStorage(transaction);
    addTransactionDOM(transaction);
    valorInput.value = '';
    entradaRadio.checked = false;
    saidaRadio.checked = false;
}

function generateID() {
    return Math.floor(Math.random() * 1000000);
}

function addTransactionDOM(transaction) {
    const tabela = document.getElementById('tabela');
    const row = document.createElement('tr');

    row.innerHTML = `
        <td>${transaction.date}</td>
        <td>${transaction.valor}</td>
        <td>${transaction.user}</td>
        <td>${transaction.tipo}</td>
        <td><button onclick="removeTransaction(${transaction.id})">Remover</button></td>
    `;
    
    tabela.appendChild(row);
}

function saveTransactionLocalStorage(transaction) {
    let transactions = getTransactionsLocalStorage();
    transactions.push(transaction);
    localStorage.setItem('transactions', JSON.stringify(transactions));
}

function getTransactionsLocalStorage() {
    return localStorage.getItem('transactions') ? JSON.parse(localStorage.getItem('transactions')) : [];
}

function loadTransactions() {
    let transactions = getTransactionsLocalStorage();
    transactions.forEach(addTransactionDOM);
}

function removeTransaction(id) {
    let transactions = getTransactionsLocalStorage();
    transactions = transactions.filter(transaction => transaction.id !== id);
    localStorage.setItem('transactions', JSON.stringify(transactions));
    document.getElementById('tabela').innerHTML = '';
    transactions.forEach(addTransactionDOM);
}


function addTransactionDOM(transaction) {
    const tabela = document.getElementById('tabela');
    const row = document.createElement('tr');

    row.innerHTML = `
        <td>${transaction.date}</td>
        <td>${transaction.valor}</td>
        <td>${transaction.user}</td>
        <td>${transaction.tipo}</td>
        <td>
            <button class="btn-remove" onclick="removeTransaction(${transaction.id})">
                <i class="bi bi-trash"></i>
            </button>
        </td>
    `;
    tabela.appendChild(row);
}


function addTransactionDOM(transaction) {
    const tabela = document.getElementById('tabela');
    const row = document.createElement('tr');

    row.innerHTML = `
        <td>${transaction.date}</td>
        <td>${transaction.valor}</td>
        <td>${transaction.user}</td>
        <td>${transaction.tipo}</td>
        <td>
            <button class="btn-edit" onclick="editTransaction(${transaction.id})">
                <i class="bi bi-pencil"></i>
            </button>
            <button class="btn-remove" onclick="removeTransaction(${transaction.id})">
                <i class="bi bi-trash"></i>
            </button>
        </td>
    `;
    tabela.appendChild(row);
}

function editTransaction(id) {
    let transactions = getTransactionsLocalStorage();
    let transaction = transactions.find(transaction => transaction.id === id);

    if (transaction) {
        document.getElementById('valor').value = transaction.valor;
        if (transaction.tipo === 'entrada') {
            document.getElementById('comodato').checked = true;
        } else {
            document.getElementById('venda').checked = true;
        }

        removeTransaction(id); // Remover a transação antiga para substituir pela nova
    }
}

let editTransactionId = null;

function addTransactionDOM(transaction) {
    const tabela = document.getElementById('tabela');
    const row = document.createElement('tr');

    row.innerHTML = `
        <td>${transaction.date}</td>
        <td>${transaction.valor}</td>
        <td>${transaction.user}</td>
        <td>${transaction.tipo}</td>
        <td>
            <button class="btn-edit" onclick="openEditModal(${transaction.id})">
                <i class="bi bi-pencil-square"></i>
            </button>
            <button class="btn-remove" onclick="removeTransaction(${transaction.id})">
                <i class="bi bi-trash-fill"></i>
            </button>
        </td>
    `;
    tabela.appendChild(row);
}

function openEditModal(id) {
    let transactions = getTransactionsLocalStorage();
    let transaction = transactions.find(transaction => transaction.id === id);

    if (transaction) {
        document.getElementById('editValor').value = transaction.valor;
        if (transaction.tipo === 'entrada') {
            document.getElementById('editEntrada').checked = true;
        } else {
            document.getElementById('editSaida').checked = true;
        }

        editTransactionId = id;
        document.getElementById('editModal').style.display = 'block';
    }
}

function closeModal() {
    document.getElementById('editModal').style.display = 'none';
}

function saveEdit() {
    let transactions = getTransactionsLocalStorage();
    let transaction = transactions.find(transaction => transaction.id === editTransactionId);

    if (transaction) {
        transaction.valor = document.getElementById('editValor').value;
        transaction.tipo = document.querySelector('input[name="editTipo"]:checked').value;
        setTransactionsLocalStorage(transactions);
        refreshTable();
        closeModal();
    }
}

function refreshTable() {
    const tabela = document.getElementById('tabela');
    tabela.innerHTML = '';
    let transactions = getTransactionsLocalStorage();
    transactions.forEach(transaction => addTransactionDOM(transaction));
}