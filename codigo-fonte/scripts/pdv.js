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

    fetch(response[0].url+"/api/ura/consultacliente/", requestOptions)
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

        if (count == 1) {
            document.getElementById("labelcliente").innerHTML = nomeCLiente
        }
        else if (count > 1) {
            document.getElementById("labelcliente").innerHTML = nomeCLiente
        }
    } else {
        swal("CPF inválido!", "Digite o CPF correto")
    }
}

//funcao para buscar o nome do cliente no spg
function nomeCliente(nome) {
    var nomeCliente = nome.split('razaoSocial":"')[1];
    nomeCliente = nomeCliente.split('"')[0];
    return nomeCliente;
}