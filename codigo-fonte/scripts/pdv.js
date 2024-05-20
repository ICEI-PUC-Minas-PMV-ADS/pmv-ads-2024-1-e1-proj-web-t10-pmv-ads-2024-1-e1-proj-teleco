//Coloca o cliente como campo obrigatorio
function vercomodato() {
    var radio = document.getElementById("cliente");
    radio.required = true;
    var coditem = document.getElementById("coditem");
    var botaoconsulta = document.getElementById("consultaCliente");
    botaoconsulta.style.display = "block";

}
//Coloca o cliente como campo opicional
function vervenda() {
    var radio = document.getElementById("cliente");
    radio.required = false;

    var botaoconsulta = document.getElementById("consultaCliente");
    botaoconsulta.style.display = "none";
}

//mascara para o campo cpf
$("#cliente").mask("000.000.000-00")


//316.230.320-67
//busca cliente na base de dados do SGP 
function consultasgp() {

    firebase.firestore()
        .collection('SGP')
        .get()
        .then(snapshot => {
            var response = snapshot.docs.map(doc => doc.data())

            var cpf = document.getElementById("cliente");
            var formdata = new FormData();
            formdata.append("token", response[0].token);
            formdata.append("app", response[0].app);
            formdata.append("cpfcnpj", cpf.value);

            var requestOptions = {
                method: 'POST',
                body: formdata,
                redirect: 'follow'
            };

            fetch(response[0].url + "/api/ura/consultacliente/", requestOptions)
                .then(response => response.text())
                .then(result => dadossgp(result))
                .catch(error => console.log('error', error));
        })
}

//funcao para tratar os dados vindos do sgp
function dadossgp(dados) {
    var nome = document.getElementById("cliente");
    if (dados.length > 100) {
        var count = (dados.match(/contratoId/g) || []).length;
        var nomeCLiente = nomeCliente(dados);
        var cliente = document.getElementById('cliente')


        if (count == 1) {
            cliente.value = nomeCLiente
        }
        else if (count > 1) {
            cliente.value = nomeCLiente

        }
    } else {
        swal("CPF inválido!", "Digite o CPF correto")
        cliente = document.getElementById('cliente').value=''

    }
}

//funcao para buscar o nome do cliente no spg
function nomeCliente(nome) {
    var nomeCliente = nome.split('razaoSocial":"')[1];
    nomeCliente = nomeCliente.split('"')[0];
    return nomeCliente;
}


function insereDados() {
    var codItem = document.getElementById('coditem')
    var produto = document.getElementById('produto')
    var qtd = document.getElementById('qtd')
    var vunit = document.getElementById('vunit')
    var vtotal = document.getElementById('vtotal')
    var cliente = document.getElementById('cliente')
    var radio = document.querySelector('input[name="comodato"]:checked')

    if (codItem.value == ''|| produto.value == ''|| radio == null){
        swal("Preencha todos os campos")

    }else{
    var tabela = document.getElementById('tabela')


    let tr = tabela.insertRow()
    let tdcliente = tr.insertCell()
    let tdcod = tr.insertCell()
    let tdproduto = tr.insertCell()
    let tdqtd = tr.insertCell()
    let tdvalor = tr.insertCell()
    let tdvalorTotal = tr.insertCell()
    let tdAcao = tr.insertCell()

    tdcod.innerText = codItem.value
    tdcliente.innerText = cliente.value
    tdproduto.innerText = produto.value
    tdqtd.innerText = qtd.value
    tdvalor.innerText = vunit.value
    tdvalorTotal.innerText = vtotal.value


    let botaodelete = document.createElement('i')
    botaodelete.setAttribute("class", "bi bi-trash-fill");
    botaodelete.setAttribute("id", "botaodelete");
    botaodelete.setAttribute("onClick", "deletar()");


    tdAcao.append(botaodelete)

    codItem.value = ''
    cliente.value= ''
    produto.value= ''
    qtd.value= '1'
    vunit.value= 'R$ 0.00'
    vtotal.value= 'R$ 0.00'
}
}


function pesquisaproduto() {
    let array = JSON.parse(localStorage.getItem('arrayEstoque'))
    var count = array.length
    var codItem = document.getElementById('coditem')
    var produto = document.getElementById('produto')
    var vunit = document.getElementById('vunit')
    var vtotal = document.getElementById('vtotal')
    var qtd = document.getElementById('qtd')


    for (i = count; i > 0; i--) {
        var e = false
        if (array[i - 1].codItem == codItem.value) {
            produto.value = array[i - 1].produto
            vunit.value = "R$ " + parseFloat(array[i - 1].vunit).toFixed(2)
            vtotal.value = "R$ " + parseFloat((parseFloat(array[i - 1].vunit).toFixed(2)) * qtd.value).toFixed(2)
            e = true
        }
    }
    if (e == false){
        swal("Produto não cadastrado.")
        codItem.value = ''
        cliente.value= ''
        produto.value= ''
        qtd.value= '1'
        vunit.value= 'R$ 0.00'
        vtotal.value= 'R$ 0.00'
    }
}

function inserelocalstorage(){
    var tabela = document.getElementsByTagName('tr').length
    alert(tabela)
}