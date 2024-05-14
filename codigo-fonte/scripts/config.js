// Testa Conexao com SGP
function consultasgp() {
    var token = document.getElementById("token").value;
    var app = document.getElementById("app").value;
    var url = document.getElementById("url").value;

    var formdata = new FormData();
    formdata.append("token", token);
    formdata.append("app", app);
    formdata.append("cpfcnpj", "000.000.000-00");

    var requestOptions = {
        method: 'POST',
        body: formdata,
        redirect: 'follow'
    };

    fetch(url+"/api/ura/consultacliente/", requestOptions)
        .then(response => response.text())
        .then(result => dadossgp(result))
        .catch(error => dadossgp(error));
}

// atualiza os dados
function atualizadados(){
    let token2 = document.getElementById("token").value
    let app2 = document.getElementById("app").value
    let url2 = document.getElementById("url").value

    firebase.firestore()
            .collection('SGP')
            .doc('dados')
            .update({ token: token2, app: app2, url: url2 })
        .then(()=>{
            location.reload()
        })
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

//Conexao com SGP no carregamento da pagina
function statussgponload() {
    firebase.firestore()
    .collection('SGP')
    .get()
    .then(snapshot => {
        var response = snapshot.docs.map(doc => doc.data())
    var token = document.getElementById("token");
    var app = document.getElementById("app");
    var url = document.getElementById("url");
        token.value = response[0].token
        url.value = response[0].url
        app.value = response[0].app
    var formdata = new FormData();
    formdata.append("token", response[0].token);
    formdata.append("app", response[0].app);
    formdata.append("cpfcnpj", "030.000.00-00");

    var requestOptions = {
        method: 'POST',
        body: formdata,
        redirect: 'follow'
    };

    fetch(response[0].url+"/api/ura/consultacliente/", requestOptions)
        .then(response => response.text())
        .then(result => conexaosgp(result))
        .catch(error => conexaosgp(error));
    })
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

//coloca status nas demais paginas
function statusonload() {
    firebase.firestore()
    .collection('SGP')
    .get()
    .then(snapshot => {
        var response = snapshot.docs.map(doc => doc.data())
    var formdata = new FormData();
    formdata.append("token", response[0].token);
    formdata.append("app", response[0].app);
    formdata.append("cpfcnpj", "030.000.00-00");

    var requestOptions = {
        method: 'POST',
        body: formdata,
        redirect: 'follow'
    };

    fetch(response[0].url+"/api/ura/consultacliente/", requestOptions)
        .then(response => response.text())
        .then(result => conexaosgp(result))
        .catch(error => conexaosgp(error));
    })
}



//dados de teste
// token:cfadf859-6f6b-4d49-b5d6-00dcb82efa19
// url:https://demo.sgp.net.br
// app:testepuc