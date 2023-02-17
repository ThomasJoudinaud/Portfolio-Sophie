let result = fetch("http://localhost:5678/api/users/login")

// fonction pour l'envoie des identifiants

function connectUser () {
    const log = document.querySelector("#formulaireConnexion")
    log.addEventListener("submit", function(event){
        event.preventDefault()
        //creation de l'objet envoyé
        const user = {
            email: event.target.querySelector("[name=mail]").value,
            password: event.target.querySelector("[name=mdp]").value
        }
        //creation de la charge utile
        const objectUser = JSON.stringify(user)

        // envoie

        fetch("http://localhost:5678/api/users/login", {
            method: "POST",
            headers: {"Content-Type" : "application/json"},
            body: objectUser
        })
    })

}

connectUser()




