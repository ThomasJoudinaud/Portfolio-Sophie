import { setCookie } from "./cookie.js"

// fonction pour récupérer les information du formulaire de connexion
async function logIn() {
    const formLog = document.querySelector("#formulaireConnexion")
    const mail = document.querySelector("#mail")
    const mdp = document.querySelector("#mdp")
    const errorMDP = document.querySelector("#erreurMDP")
    const erreurSaisie = document.querySelector("#formError")

    formLog.addEventListener("submit", function(event) {
      event.preventDefault()
      errorMDP.style.display = "none"
      erreurSaisie.style.display = "none"


      //Vérification du formulaire
      const userMail = mail.value.trim()
      const userMdp = mdp.value.trim()
  
      if (userMail === "" || userMail === null || userMdp === "" || userMdp === null) {
        console.error("Erreur: Valeurs saisies dans le formulaire manquante")
        erreurSaisie.style.display = "block"
        return
      } else {
        const information = {
          email:event.target.querySelector("#mail").value,
          password:event.target.querySelector("#mdp").value
        }
      
        //on Fetch avec les informations récupérer ci-dessus
            async function fetchLogin () {
              const r = await fetch("http://localhost:5678/api/users/login",{
                method: "POST",
                headers: {
                  "Accept" : "application/json",
                  "Content-Type": "application/json"
                },
                body: JSON.stringify(information)
              })
                if (r.ok === true) {
                  console.log("Authentification réussi")
                  return r.json()
                }else{
                  console.error("Erreur serveur")
                }
                console.error("Erreur: e-mail ou mot de passe incorrect")
                errorMDP.style.display = "block"  
            }
            fetchLogin()
            //je créer un cookie admin
              .then(user => {
                const userToken = user.token
                setCookie("token", userToken, 1)
                location.replace("./index.html")
              })
      } 
    })
}
logIn()