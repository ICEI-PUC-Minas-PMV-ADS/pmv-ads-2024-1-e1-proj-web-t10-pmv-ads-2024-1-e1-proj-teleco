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
        cliente = document.getElementById('cliente').value = ''

    }
}

//funcao para buscar o nome do cliente no spg
function nomeCliente(nome) {
    var nomeCliente = nome.split('razaoSocial":"')[1];
    nomeCliente = nomeCliente.split('"')[0];
    return nomeCliente;
}


//verifica se existe o produto no estoque
function pesquisaproduto() {
    let array = JSON.parse(localStorage.getItem('arrayEstoque'))
    var count = array.length
    var codItem = document.getElementById('coditem')
    var produto = document.getElementById('produto')
    var vunit = document.getElementById('vunit')
    var vtotal = document.getElementById('vtotal')
    var qtd = document.getElementById('qtd')
    var e = false

    for (i = count; i > 0; i--) {
        if (array[i - 1].codItem == codItem.value) {
            produto.value = array[i - 1].produto
            vunit.value = "R$ " + parseFloat(array[i - 1].vunit).toFixed(2)
            vtotal.value = "R$ " + parseFloat((parseFloat(array[i - 1].vunit).toFixed(2)) * qtd.value).toFixed(2)
            e = true
        }
    }
    if (e == false) {
        swal("Produto não cadastrado.")
        codItem.value = ''
        cliente.value = ''
        produto.value = ''
        qtd.value = '1'
        vunit.value = 'R$ 0.00'
        vtotal.value = 'R$ 0.00'
    }
}

//exibe a venda atual na tela
mostravendaatual()
function mostravendaatual() {
    var arrayPdv = JSON.parse(localStorage.getItem('arrayPdv'))

    var count = arrayPdv.length
    var soma = 0
    var tabela = document.getElementById('tabela')

    for (i = count; i > 0; i--) {
        let tr = tabela.insertRow()
        let tdcliente = tr.insertCell()
        let tdcod = tr.insertCell()
        let tdproduto = tr.insertCell()
        let tdqtd = tr.insertCell()
        let tdvalor = tr.insertCell()
        let tdvalorTotal = tr.insertCell()
        let tdAcao = tr.insertCell()

        tdcod.innerText = arrayPdv[i - 1].codItem
        tdcliente.innerText = arrayPdv[i - 1].cliente
        tdproduto.innerText = arrayPdv[i - 1].produto
        tdqtd.innerText = arrayPdv[i - 1].qtd
        tdvalor.innerText = "R$ " + parseFloat(arrayPdv[i - 1].vunit).toFixed(2)
        tdvalorTotal.innerText = "R$ " + parseFloat(arrayPdv[i - 1].vtotal).toFixed(2)
        tdAcao.innerText = arrayPdv[i - 1].tipo

    }
    for (i = count; i > 0; i--) {
        soma = soma + parseFloat(arrayPdv[i - 1].vtotal)
    }
    var resultado = document.getElementById('resultado')
    resultado.innerText = parseFloat(soma).toFixed(2)

}

//insere os dados na tabela
function insereDados() {
    var arrayPdv
    var arrayEstoque
    arrayEstoque = JSON.parse(localStorage.getItem('arrayEstoque'))
    var count = arrayEstoque.length
    var codItem = document.getElementById('coditem')
    var produto = document.getElementById('produto')
    var qtd = document.getElementById('qtd')
    var vunit = document.getElementById('vunit')
    var vtotal = document.getElementById('vtotal')
    var cliente = document.getElementById('cliente')
    var radio = document.querySelector('input[name="comodato"]:checked')

    if (codItem.value == '' || produto.value == '' || radio == null) {
        swal("Preencha todos os campos")
    } else {

        for (i = count; i > 0; i--) {

            if (arrayEstoque[i - 1].produto == produto.value){
            
            if (parseFloat(arrayEstoque[i - 1].qtd) - parseFloat(qtd.value) <= 0) {
                swal("Estoque insuficiente")
            }else{
                if (localStorage.arrayPdv) {
                    arrayPdv = JSON.parse(localStorage.getItem('arrayPdv'))
                }
                else {
                    arrayPdv = []
                }
                arrayPdv.push({
                    cliente: cliente.value, codItem: codItem.value, produto: produto.value,
                    qtd: qtd.value, vunit: vunit.value.split(' ')[1], tipo: radio.value, vtotal: vtotal.value.split(' ')[1]
                })
                localStorage.arrayPdv = JSON.stringify(arrayPdv)
        
                codItem.value = ''
                cliente.value = ''
                produto.value = ''
                qtd.value = '1'
                vunit.value = 'R$ 0.00'
                vtotal.value = 'R$ 0.00'
                location.reload()
            }
        }
        }


    }

}


//finaliza a venda e grava no local storage
function fecharvenda() {
    var user = document.getElementById('tagusuario').textContent
    var arraycomodato
    var arrayvenda
    var arrayPdv
    var arrayEstoque

    if (localStorage.arrayPdv) {


        if (localStorage.arrayvenda) {
            arrayvenda = JSON.parse(localStorage.getItem('arrayvenda'))
        } else {
            arrayvenda = []
        }

        if (localStorage.arraycomodato) {
            arraycomodato = JSON.parse(localStorage.getItem('arraycomodato'))
        } else {
            arraycomodato = []
        }


        arrayPdv = JSON.parse(localStorage.getItem('arrayPdv'))
        arrayEstoque = JSON.parse(localStorage.getItem('arrayEstoque'))
        var count = arrayPdv.length
        var count2 = arrayEstoque.length


        for (i = count; i > 0; i--) {

            // remove do estoque
            for (j = count2; j > 0; j--) {
                if (arrayEstoque[j - 1].produto == arrayPdv[i - 1].produto) {
                    arrayEstoque[j - 1].qtd = parseFloat(arrayEstoque[j - 1].qtd) - parseFloat(arrayPdv[i - 1].qtd)
                    localStorage.arrayEstoque = JSON.stringify(arrayEstoque)

                }

            }

            if (arrayPdv[i - 1].tipo == "venda") {

                var data = new Date()
                data = data.getDate() + "/" + data.getMonth() + "/" + data.getFullYear()

                arrayvenda.push({ produto: arrayPdv[i - 1].produto, vtotal: arrayPdv[i - 1].vtotal, user, data })

                localStorage.arrayvenda = JSON.stringify(arrayvenda)

            }

            else if (arrayPdv[i - 1].tipo == "comodato") {
                var data = new Date()
                data = data.getDate() + "/" + data.getMonth() + "/" + data.getFullYear()
                arraycomodato.push({
                    produto: arrayPdv[i - 1].produto, vtotal: arrayPdv[i - 1].vtotal, user, data
                })
                localStorage.arraycomodato = JSON.stringify(arraycomodato)

            }
        }


        localStorage.arrayPdv = []
        location.reload()

    } else {
        swal("Insira Produtos!")
    }


}