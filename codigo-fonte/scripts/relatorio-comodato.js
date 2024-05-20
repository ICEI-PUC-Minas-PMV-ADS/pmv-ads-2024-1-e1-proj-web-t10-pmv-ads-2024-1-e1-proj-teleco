pegadados()

function pegadados() {
    arraycomodato = JSON.parse(localStorage.getItem('arraycomodato'))

    var count = arraycomodato.length

    var tabela = document.getElementById('tabela')

    for (i = count; i > 0; i--) {
        let tr = tabela.insertRow()
        let tdcliente = tr.insertCell()
        let tdproduto = tr.insertCell()
        let tdqtd = tr.insertCell()
        let tddata = tr.insertCell()
        let tdAcao = tr.insertCell()


        tdcliente.innerText = arraycomodato[i - 1].cliente
        tdproduto.innerText = arraycomodato[i - 1].produto
        tdqtd.innerText = arraycomodato[i - 1].qtd
        tddata.innerText = arraycomodato[i - 1].data


        let botaodelete = document.createElement('i')
        botaodelete.setAttribute("class", "bi bi-trash-fill");
        botaodelete.setAttribute("id", "botaodelete");
        botaodelete.setAttribute("onClick", "deletar(" + i + ")");


        tdAcao.append( botaodelete)

    }
}

function deletar(id) {
    var tabela = document.getElementById('tabela')
    let array = JSON.parse(localStorage.getItem('arraycomodato'))
            array.splice(id-1, 1)
            localStorage.arraycomodato = JSON.stringify(array)
            tabela.deleteRow(i-1)
            location.reload()
}