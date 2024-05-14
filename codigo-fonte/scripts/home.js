firebase.auth().onAuthStateChanged(user => {
    if (user) {
        var tag = document.getElementById('tagusuario')
        tag.innerHTML = firebase.auth().currentUser.email
        var id = "BU2j7gEcZYR2dIOGOqiTQfh0DQB3"
    }
})


function logout() {
    firebase.auth().signOut().then(() => {
        window.location.href = "index.html";
    }).catch((error) => {
        console.log(error)
        alert('Erro ao fazer logout');
    })
}