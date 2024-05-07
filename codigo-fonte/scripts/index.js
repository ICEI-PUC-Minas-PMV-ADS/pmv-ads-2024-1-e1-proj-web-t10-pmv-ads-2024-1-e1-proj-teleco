/*firebase.auth().onAuthStateChanged(user => {
    if (user) {
        window.location.href = "home.html";
    }
})

function login(email,senha){
    firebase.auth().signInWithEmailAndPassword(email, senha).then(response => {
           window.location.href="home.html"
            
    }).catch(error =>{
        swal("Usuário ou senha inválidos")
        })

}

function validadorForm(){
    
    var email = document.getElementById('user').value
    var senha = document.getElementById('senha').value

    if (ValidarEmail(email) == false){
        swal("Formato de email inválido.")
    } 
    else if(senha=='' || email ==''){
        swal("Preencha todos os campos.")
    }
    else{
        login(email,senha)
    }
}

function ValidarEmail(email) {
    var emailPattern =  /^[_a-z0-9-]+(\.[_a-z0-9-]+)*@[a-z0-9-]+(\.[a-z0-9-]+)*(\.[a-z]{2,4})$/;
     return emailPattern.test(email); 
}
*/