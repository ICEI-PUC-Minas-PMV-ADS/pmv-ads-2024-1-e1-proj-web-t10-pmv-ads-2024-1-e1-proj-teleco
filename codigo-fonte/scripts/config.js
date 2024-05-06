/*


//Conexao com SGP
function consultasgp() {
    var token = document.getElementById("token");
    var app = document.getElementById("app");
    var url = document.getElementById("url");

    var formdata = new FormData();
    formdata.append("token", "cfadf859-6f6b-4d49-b5d6-00dcb82efa19");
    formdata.append("app", "testepuc");
    formdata.append("cpfcnpj", "000.000.000-00");

    var requestOptions = {
        method: 'POST',
        body: formdata,
        redirect: 'follow'
    };

    fetch("https://demo.sgp.net.br/api/ura/consultacliente/", requestOptions)
        .then(response => response.text())
        .then(result => dadossgp(result))
        .catch(error => dadossgp(error));
}

//funcao para tratar os dados vindos do sgp
function dadossgp(dados) {
    var status = document.getElementById("statusconexao")
    if (dados == '{"detail":"As credenciais de autenticação não foram fornecidas."}') {
        swal("Erro!", "Token ou APP incorretos")

    }
    else  if (dados == '{"detail":"Credenciais de autenticação incorretas."}') {
        swal("Erro!", "Token ou APP incorretos")
    }
    else if(dados==""){
        swal("Erro!", "URL Inválida")
    }
    else if (dados.length > 100) {
        swal("Sucesso!", "A conexão foi realizada")

    }
    else if (dados == "") {
        swal("Erro!", "URL Inválida")

    }
    else{
        swal("Não foi possível estabelecer uma conexão", "Verifique os dados")

    }

}

//Conexao com SGP onload
function statussgponload() {
    var token = document.getElementById("token");
    var app = document.getElementById("app");
    var url = document.getElementById("url");

    var formdata = new FormData();
    formdata.append("token", "cfadf859-6f6b-4d49-b5d6-00dcb8efa19");
    formdata.append("app", "testepuc");
    formdata.append("cpfcnpj", "030.000.00-00");

    var requestOptions = {
        method: 'POST',
        body: formdata,
        redirect: 'follow'
    };

    fetch("https://demo.sgp.net.br/api/ura/consultacliente/", requestOptions)
        .then(response => response.text())
        .then(result => conexaosgp(result))
        .catch(error => conexaosgp(error));
}
//funcao para tratar os dados vindos do sgp e mostrar status
function conexaosgp(dados) {
    var status = document.getElementById("statusconexao")
    if (dados == '{"detail":"As credenciais de autenticação não foram fornecidas."}') {
        status.innerHTML = "Desconectado"
        status.style.color = "red"
    }
    else  if (dados == '{"detail":"Credenciais de autenticação incorretas."}') {
        status.innerHTML = "Desconectado"
        status.style.color = "red"    }
    else if(dados==""){
        status.innerHTML = "Desconectado"
        status.style.color = "red"
    }
    else if (dados.length > 100) {
        status.innerHTML = "Conectado"
        status.style.color = "green"
    }
    else if (dados == '{"contratos":[]}') {
        status.innerHTML = "Conectado"
        status.style.color = "green"
    }
    else{
        status.innerHTML = "Desconectado"
        status.style.color = "red"
    }

}



*/