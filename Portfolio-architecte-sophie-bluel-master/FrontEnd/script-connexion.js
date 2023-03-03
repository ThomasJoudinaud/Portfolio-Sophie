// fonction pour récupérer les information du formulaire de connexion

  async function logIn() {
    const formLog = document.querySelector("#formulaireConnexion")
    formLog.addEventListener("submit", function(event) {
      event.preventDefault()

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
        try{
          if (r.ok === true) {
            return r.json()
          }
          alert("Email ou mot de passe invalide")
        } catch (e) {
          console.error("Erreur Serveur")
        }
    
      }
      fetchLogin()
      //je créer un sessionStorage du token pour garder la connexion tout en limitant les possibles intrusions non voulu qu'aurait pu causer un localStorage
        .then(user => {
          sessionStorage.setItem("token", JSON.stringify(user.token))
          location.replace("./index.html")
        })
    })
  }
logIn()

