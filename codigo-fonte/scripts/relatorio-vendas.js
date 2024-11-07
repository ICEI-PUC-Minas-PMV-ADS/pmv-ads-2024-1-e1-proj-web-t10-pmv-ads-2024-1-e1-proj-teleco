const url = "https://api.hinova.com.br/api/sga/v2/buscar/situacao-veiculo/PFC7899"; // API URL
const method = "GET"; // Request method, change for what's needed


fetch(url, {
    method,
    headers: {
        "Authorization": `Bearer 0faeb64da48fad399ca9f1648490b9d2ba3fb3ba1d56eeddd724c0d0a7b10e36a377bf706ee0a20d69e45a0dadc5a192c1b2070b0b926fd08fd02b303602f82271442f36a200670ae3f45c9eb14f6bcf4ff86a443e340d638d92408c4574d2b7cd9b6851fb8b638eabbb2f432519df2342af06319786363acf6373c7a65a281176be2142b7c219c524be537f019b6155`,
        "Content-Type": "application/json"	 // This is the important part, the auth header
    },


}).then((response) => {
    if (!response.ok) {
        throw new Error("Network response was not ok");
    }
    return response.json();
})
    .then((data) => {
        alert("oi")
        var placa = data
        console.log(placa)

    })
    .catch((error) => console.error("Fetch error:", error));



