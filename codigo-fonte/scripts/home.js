/*
firebase.auth().onAuthStateChanged(user => {
    if (user) {
        var tag = document.getElementById('tagusuario')
        tag.innerHTML = user.email

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
*/
