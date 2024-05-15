


//declaracao de variaveis
const modalcadastro = document.getElementById("dialogcadastro")
const modaledit = document.getElementById("dialogedit")
var codItem = document.getElementById('coditem')
var produto = document.getElementById('produto')
var qtd = document.getElementById('qtd')
var vunit = document.getElementById('vunit')
var codIteme = document.getElementById('coditeme')
var produtoe = document.getElementById('produtoe')
var qtde = document.getElementById('qtde')
var vunite = document.getElementById('vunite')
let arrayEstoque = new Array()


//abre a tela modal para cadastro
function abremodal() {
    modalcadastro.showModal()

    codItem.value = ''
    produto.value = ''
    qtd.value = ''
    vunit.value = ''
}


//cadastra e salva no local storage
function cadastraproduto() {
    var e = false
    if (codItem.value == '' || produto.value == '' || qtd.value == '' || vunit.value == '') {
        alert("Preencha todos os campos ou ESC para sair.")
    } else {
        if (localStorage.arrayEstoque) {
            arrayEstoque = JSON.parse(localStorage.getItem('arrayEstoque'))
        }
        else {
            arrayEstoque = []
        }

        for (i = 0; i < arrayEstoque.length; i++) {
            if (arrayEstoque[i].codItem == codItem.value) {
                e = true
                alert("Este código ja existe.")
                return

            }
            else {
                e = false
            }
        }
        if (e == false) {
            arrayEstoque.push({ codItem: codItem.value, produto: produto.value, qtd: qtd.value, vunit: vunit.value })
            localStorage.arrayEstoque = JSON.stringify(arrayEstoque)
            arrayEstoque = []
        } else {
            alert("Este código ja existe.")
        }
        modalcadastro.close()
        modaledit.close()
        location.reload()
    }
}

//insere dados na tabela
pegadados()

//Insere dados na tabela
function pegadados() {
    arrayEstoque = JSON.parse(localStorage.getItem('arrayEstoque'))

    var count = arrayEstoque.length

    var tabela = document.getElementById('tabela')

    for (i = count; i > 0; i--) {
        let tr = tabela.insertRow()
        let tdcod = tr.insertCell()
        let tdproduto = tr.insertCell()
        let tdqtd = tr.insertCell()
        let tdvalor = tr.insertCell()
        let tdAcao = tr.insertCell()

        tdcod.setAttribute("class", "tdcod");
        tdproduto.setAttribute("class", "tdproduto");
        tdqtd.setAttribute("class", "tdqtd");
        tdvalor.setAttribute("class", "tdvalor");
        tdAcao.setAttribute("class", "tdAcao");


        tdcod.innerText = arrayEstoque[i - 1].codItem
        tdproduto.innerText = arrayEstoque[i - 1].produto
        tdqtd.innerText = arrayEstoque[i - 1].qtd
        tdvalor.innerText = arrayEstoque[i - 1].vunit
        var id = arrayEstoque[i - 1].codItem

        let botaoedit = document.createElement('i')
        botaoedit.setAttribute("class", "bi bi-pencil-square");
        botaoedit.setAttribute("id", "botaoedit");
        botaoedit.setAttribute("onClick", "editar(" + id + ")");


        let botaodelete = document.createElement('i')
        botaodelete.setAttribute("class", "bi bi-trash-fill");
        botaodelete.setAttribute("id", "botaodelete");
        botaodelete.setAttribute("onClick", "deletar(" + id + ")");


        tdAcao.append(botaoedit, botaodelete)

    }
}

//deleta produto da tabela e do local storage
function deletar(id) {
    var tabela = document.getElementById('tabela')
    let array = JSON.parse(localStorage.getItem('arrayEstoque'))
    for (i = 0; i < array.length; i++) {
        if (array[i].codItem == id) {
            array.splice(i, 1)
            localStorage.arrayEstoque = JSON.stringify(array)
            tabela.deleteRow(i-1)
            location.reload()
        }
    }
}

// funcao do icone editar
function editar(id) {
    let array = JSON.parse(localStorage.getItem('arrayEstoque'))
    for (i = 0; i < array.length; i++) {
        if (array[i].codItem == id) {
            arrayEstoque = JSON.parse(localStorage.getItem('arrayEstoque'))
            modaledit.showModal()
            codIteme.value = arrayEstoque[i].codItem
            produtoe.value = arrayEstoque[i].produto
            qtde.value = arrayEstoque[i].qtd
            vunite.value = arrayEstoque[i].vunit

            let botao = document.getElementById("botaoEditar")
            botao.setAttribute("onClick", "editaproduto(" + i + ")")

        }
    }
}



// Pesquisa Produtos na tabela
function filtraDados() {

    const busca = document.getElementById('busca');
    const tabela = document.getElementById('tabela');

    let expressao = busca.value.toLowerCase();

    let linhas = tabela.getElementsByTagName('tr');

    for (let posicao in linhas) {
        if (true === isNaN(posicao)) {
            continue;
        }

        let conteudoDaLinha = linhas[posicao].innerHTML.toLowerCase();

        if (true === conteudoDaLinha.includes(expressao)) {
            linhas[posicao].style.display = '';
        } else {
            linhas[posicao].style.display = 'none';
        }
    }
}

//funcao para editar produto na janela modal
function editaproduto(i) {

    let array = JSON.parse(localStorage.getItem('arrayEstoque'))
    
    array[i].codItem = codIteme.value
    array[i].qtd = qtde.value
    array[i].vunit = vunite.value
    array[i].produto = produtoe.value
    console.log(array)
    localStorage.arrayEstoque = JSON.stringify(array)
    modaledit.close()
    location.reload()
}
