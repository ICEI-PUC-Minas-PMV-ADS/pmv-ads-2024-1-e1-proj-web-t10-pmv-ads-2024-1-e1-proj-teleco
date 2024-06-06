pegadados()

function pegadados() {
    arraycaixa = JSON.parse(localStorage.getItem('arraycaixa'))
    var soma = 0
    var count = arraycaixa.length
    var tabela = document.getElementById('tabela')


    for (i = count; i > 0; i--) {
        let tr = tabela.insertRow()
        let tdvalor = tr.insertCell()
        let tdtipo = tr.insertCell()


        tdvalor.innerText ='R$ '+ parseFloat(arraycaixa[i - 1].valor).toFixed(2)
        tdtipo.innerText = arraycaixa[i - 1].tipo

    }

    for (i = count; i > 0; i--) {
        soma = soma + parseFloat(arraycaixa[i - 1].vtotal)
    }
    var resultado = document.getElementById('resultado')
    resultado.innerText = parseFloat(soma).toFixed(2)
}

function encerrar(){
    localStorage.arraycaixa = JSON.stringify([])
    location.reload()
}

var arraycaixa = JSON.parse(localStorage.getItem('arraycaixa'))
var count = arraycaixa.length
var soma = 0
for (i = count; i > 0; i--) {
    soma = soma + parseFloat(arraycaixa[i - 1].valor)
}
var resultado = document.getElementById('resultado')
resultado.innerText = parseFloat(soma).toFixed(2)
