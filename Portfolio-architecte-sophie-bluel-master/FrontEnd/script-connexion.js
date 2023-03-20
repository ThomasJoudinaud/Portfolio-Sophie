// Créer des cookie avec timer en jour
export function setCookie (name, value, days) {
  const date = new Date()
  date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000))
  let expires = "expires=" + date.toUTCString()
  document.cookie = `${name}=${value}; ${expires}; path=/`
}


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
          const errorMDP = document.querySelector("#erreurMDP")
          errorMDP.style.display = "block"
        } catch (e) {
          console.error(e)
        }   
      }
      fetchLogin()
      //je créer un cookie admin
        .then(user => {
          const userToken = user.token
          setCookie("token", userToken, 1)
          location.replace("./index.html")
        })
    })
  }
logIn()
