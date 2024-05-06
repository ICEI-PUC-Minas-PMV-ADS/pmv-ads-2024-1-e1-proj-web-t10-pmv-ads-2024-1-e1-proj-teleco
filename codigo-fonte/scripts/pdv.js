function vercomodato(){
    var radio = document.getElementById("cliente");
    radio.required = true;
    var coditem = document.getElementById("coditem");

    var botaoconsulta = document.getElementById("consultaCliente");
    botaoconsulta.style.display="block";
    alert(coditem.value);

}

function vervenda(){
var radio = document.getElementById("cliente");
radio.required = false;

var botaoconsulta = document.getElementById("consultaCliente");
botaoconsulta.style.display="none";
} 

$("#cliente").mask("000.000.000-00")

