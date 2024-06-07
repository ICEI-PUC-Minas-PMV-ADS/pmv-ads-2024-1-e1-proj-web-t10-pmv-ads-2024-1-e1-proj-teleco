pegadados()

function pegadados() {
    arrayvenda = JSON.parse(localStorage.getItem('arrayvenda'))
    var soma = 0
    var count = arrayvenda.length
    var tabela = document.getElementById('tabela')


    for (i = count; i > 0; i--) {
        let tr = tabela.insertRow()
        let tddata = tr.insertCell()
        let tdvalor = tr.insertCell()
        let tdproduto = tr.insertCell()
        let tduser = tr.insertCell()


        tddata.innerText = arrayvenda[i - 1].data
        tdvalor.innerText = arrayvenda[i - 1].vtotal
        tdvalor.setAttribute("class", "valor")
        tdproduto.innerText = arrayvenda[i - 1].produto
        tduser.innerText = arrayvenda[i - 1].user

    }

    for (i = count; i > 0; i--) {
        soma = soma + parseFloat(arrayvenda[i - 1].vtotal)
    }
    var resultado = document.getElementById('resultado')
    resultado.innerText = parseFloat(soma).toFixed(2)
}

function filtradados() {

    const busca = document.getElementById('busca');
    const tabela = document.getElementById('tabela');

    let expressao = busca.value.toLowerCase();
    var valorcalculado = 0
    let linhas = tabela.getElementsByTagName('tr');


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
            valorcalculado = parseFloat(valor) +valorcalculado
            var resultado = document.getElementById('resultado')
            resultado.innerText = valorcalculado.toFixed(2)           

        } else {
            linhas[posicao].style.display = 'none';
        }
    }



}
