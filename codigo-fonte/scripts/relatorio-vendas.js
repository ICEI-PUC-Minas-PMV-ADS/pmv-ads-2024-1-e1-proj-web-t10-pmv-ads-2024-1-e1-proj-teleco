const url = "http://ap3.stc.srv.br/integration/prod/ws/vehicle/list"; // API URL
const method = "POST"; // Request method, change for what's needed

const update = {
    key: '7e0a6b6b42558761470d6269804fa428'
};

fetch(url, {
    method,
    headers: {
        "Content-Type": "application/json"
    },
    body: JSON.stringify(update),

}).then((response) => {
    if (!response.ok) {
        throw new Error("Network response was not ok");
    }
    return response.json();
})
    .then((data) => {

        for (i=5 ; i>0 ; i--){

        var placa = data.data.data[i].lisencePlate
        getSga(placa)
        }
    })
    .catch((error) => console.error("Fetch error:", error));


















function resposta(resposta) {
    let tr = tabela.insertRow()
    let tddata = tr.insertCell()
    let tdvalor = tr.insertCell()
    let tdproduto = tr.insertCell()
    let tduser = tr.insertCell()


    tddata.innerText = resposta

}

function getSga(placa) {
    const url = `https://api.hinova.com.br/api/sga/v2/veiculo/buscar/${placa}/placa`; // API URL
    const token = "4962a431d48bdc7d85fbe39d430f8421191f6f6c9fe4593529cd9295177dc37c8e7f2a2e7d5bd7ab42258b1752a624c857cfa950a931fc1b822fd6885c847a2265c80bab40556abd4b8c782e08d8450108f990417ef0f723e7c3998def8b61668fdda80c0bd818be85f295a3641d8bf85857f054461c0992d50c8f4dc48eb149cbe5f5690d95d69d9c05fe92864c2ed4"; // API Token
    const method = "GET"; // Request method, change for what's needed

    fetch(url, {
        method,
        headers: {

            "Authorization": `Bearer ${token}`,
            "Content-Type": "application/json"	 // This is the important part, the auth header
        },
        // body: JSON.stringify(update),

    }).then((response) => {
        if (!response.ok) {
            throw new Error('Placa não encontrada: ' + placa);
        }
        return response.json();
    })
        .then((data) => {
            resposta(data[0].descricao_situacao)
        })
        .catch((error) => {
            resposta(error)
        });
}



