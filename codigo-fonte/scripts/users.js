pegadados()

function validadorForm() {
    var email = document.getElementById('user').value
    var senha = document.getElementById('senha').value
    var confirmaSenha = document.getElementById('confirmasenha').value


    if (ValidarEmail(email) == false) {
        swal("Formato de email inválido.")
    }
    else if (senha == '' || email == '' || confirmaSenha == '') {
        swal("Preencha todos os campos.")
    }
    else {
        if (senha == confirmaSenha) {
            registrar(email, senha)
            
        }
        else {
            swal("As senhas não conferem!")
        }

    }
}


function pegadados() {
    firebase.firestore()
        .collection('usuario')
        .get()
        .then(snapshot => {
            var response = snapshot.docs.map(doc => doc.data())
            var count = response.length
            var tabela = document.getElementById('tabela')
            for (i = count; i > 0; i--) {
                let tr = tabela.insertRow()
                let tdUser = tr.insertCell()
                let tdAcao = tr.insertCell()
                let currentmail = JSON.stringify(firebase.auth().currentUser.email)
                let email = JSON.stringify(response[i - 1].email)
                tdUser.innerText = response[i - 1].email


                if (currentmail == email) {
                    tdAcao.innerText = 'Deletar'
                    tdAcao.classList.add('excluir')
                    var id = JSON.stringify(response[i - 1].uid)
                    tdAcao.setAttribute("onClick", "deletar(" + id + ")")
                }

            }
        })
}

function deletar(uid) {
    firebase.firestore().collection("usuario").doc(uid).delete().then(() => {
        const user = firebase.auth().currentUser
        user.delete()
    })

}

function ValidarEmail(email) {
    var emailPattern = /^[_a-z0-9-]+(\.[_a-z0-9-]+)*@[a-z0-9-]+(\.[a-z0-9-]+)*(\.[a-z]{2,4})$/;
    return emailPattern.test(email);
}

function registrar(email, senha) {

    firebase.auth().createUserWithEmailAndPassword(email, senha).then(response => {
        var uid = response.user.uid
        swal("Cadastro realizado com sucesso!")
        document.getElementById('user').value = ''
        document.getElementById('senha').value = ''
        document.getElementById('confirmasenha').value = ''
        firebase.firestore()
            .collection('usuario')
            .doc(uid)
            .set({ email: email, uid: uid })
        .then(()=>{
            location.reload()
        })


    }).catch(error => {
        swal(getErrorMessage(error));
    })
}

function getErrorMessage(error) {
    if (error.code == "auth/email-already-in-use") {
        return "Email já está em uso";
    }
    if (error.code == "auth/weak-password") {
        return "A senha deve conter 6 digitos no minimo";
    }
    return error.message;
}