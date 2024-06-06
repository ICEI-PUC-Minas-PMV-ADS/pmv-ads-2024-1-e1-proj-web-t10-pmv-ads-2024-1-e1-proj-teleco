swal('Aviso Importante','A pesquisa deve conter apenas um dos filtros! ')

pegadados()
function pegadados() {
    arrayfinanceiro = JSON.parse(localStorage.getItem('arrayfinanceiro'))
    var count = arrayfinanceiro.length
    var soma = 0
    var tabela = document.getElementById('tabela')

    for (i = count; i > 0; i--) {
        let tr = tabela.insertRow()
        let tddata = tr.insertCell()
        let tdvalor = tr.insertCell()
        let tduser = tr.insertCell()
        let tdtipo = tr.insertCell()
        let tdAcao = tr.insertCell()

        tddata.innerText = arrayfinanceiro[i - 1].data
        tdvalor.innerText = parseFloat(arrayfinanceiro[i - 1].valor).toFixed(2)
        tdvalor.setAttribute("class", "valor")
        tduser.innerText = arrayfinanceiro[i - 1].user
        tdtipo.innerText = arrayfinanceiro[i - 1].tipo


        let botaodelete = document.createElement('i')
        botaodelete.setAttribute("class", "bi bi-trash-fill");
        botaodelete.setAttribute("id", "botaodelete");
        botaodelete.setAttribute("onClick", "deletar(" + i + ")");


        tdAcao.append(botaodelete)

    }

    for (i = count; i > 0; i--) {
        soma = soma + parseFloat(arrayfinanceiro[i - 1].valor)
    }
    var resultado = document.getElementById('resultado')
    resultado.innerText = parseFloat(soma).toFixed(2)
}

function deletar(id) {
    var tabela = document.getElementById('tabela')
    let array = JSON.parse(localStorage.getItem('arrayfinanceiro'))
    array.splice(id - 1, 1)
    localStorage.arrayfinanceiro = JSON.stringify(array)
    tabela.deleteRow(i - 1)
    location.reload()
}

function filtradados() {
    var radio = document.querySelector('input[name="tipo"]:checked')
    const busca = document.getElementById('busca');
    const tabela = document.getElementById('tabela');
    let expressao = busca.value.toLowerCase();
    var valorcalculado = 0
    let linhas = tabela.getElementsByTagName('tr');


    if (expressao == ''){
    if (radio.value == 'entrada'){
        expressao = 'entrada'
    }
    else if (radio.value == 'saida'){
        expressao = 'saida'
    }
    }

    for (let posicao in linhas) {
        if (true === isNaN(posicao)) {
            continue;
        }

        let conteudoDaLinha = linhas[posicao].innerHTML.toLowerCase();

        if (true === conteudoDaLinha.includes(expressao)) {
            linhas[posicao].style.display = ''
            var valor = linhas[posicao].innerHTML
            valor = valor.split('class="valor">')[1]
            valor = valor.split('<')[0]
            valorcalculado = parseFloat(valor) + valorcalculado
            var resultado = document.getElementById('resultado')
            resultado.innerText = valorcalculado.toFixed(2)

        } else {
            linhas[posicao].style.display = 'none';
        }


    }
}
