import {setCookie} from "./script-connexion.js";

// Je créer mon lien avec l'API ou se trouve les travaux de Sophie
const travaux = await fetch("http://localhost:5678/api/works")
    .then(travaux => travaux.json())
    
// fonction qui va me générer les cartes automatiquement avec comme base
// les travaux de Sophie

function creerCarte (travaux) {
    for (let i = 0; i < travaux.length; i++) {

        const travail = travaux[i]
        
        // je récupère l'élément parent dans le HTML
        const gallery = document.querySelector(".gallery")

        //création de la carte
        const carte = document.createElement("figure")
        carte.dataset.id = travail.id

        const imageCarte = document.createElement("img")
        imageCarte.src = travail.imageUrl

        const titreCarte = document.createElement("figcaption")
        titreCarte.innerText = travail.title


        //Lien entre l'élement enfant et l'élément parent
        gallery.appendChild(carte)
        carte.appendChild(imageCarte)
        carte.appendChild(titreCarte)

    }
}

// Appel de la fonction pour créer les cartes dynamiques
creerCarte(travaux)

// les filtres des travaux

// le filtre "Tous"
const boutonTous = document.querySelector("#tous")
boutonTous.addEventListener("click", function(){
    document.querySelector(".gallery").innerHTML =""
    creerCarte(travaux)
})

// le filtre "Objet"
const boutonObjet = document.querySelector("#objet")
boutonObjet.addEventListener("click", function(){
    const  filtreObjets = travaux.filter(travail => 
        travail.categoryId === 1)
        document.querySelector(".gallery").innerHTML =""
        creerCarte(filtreObjets)
})

// le filtre "Appartement"
const boutonAppartement = document.querySelector("#appartement")
boutonAppartement.addEventListener("click", function(){
    const  filtreAppartement = travaux.filter(travail => 
        travail.categoryId === 2)
        document.querySelector(".gallery").innerHTML =""
        creerCarte(filtreAppartement)
})

// le filtre "Restaurant"
const boutonRestaurant = document.querySelector("#restaurant")
boutonRestaurant.addEventListener("click", function(){
    const  filtreRestaurant = travaux.filter(travail => 
        travail.categoryId === 3)
        document.querySelector(".gallery").innerHTML =""
        creerCarte(filtreRestaurant)
})

//utilité du bouton logout
function deleteCookie(name){
    setCookie(name, null,null)
}

const logout = document.querySelector("#logoutButton")
logout.addEventListener("click", function(){
    deleteCookie("token")
})


//Modification de la page d'acceuil quand l'utilisateur est log
function getCookie(name){
   const cDecoded = decodeURIComponent(document.cookie)
   let result = cDecoded.substring(name.length + 1)
   return result
}

const cookieOK = getCookie("token")

if(cookieOK){
    const filtreAdmin = document.querySelector("#filtre")
    filtreAdmin.style.display = "none"
    const loginButton = document.querySelector("#loginButton")
    loginButton.style.display = "none"
    const logoutButton = document.querySelector("#logoutButton")
    logoutButton.style.display = "flex"
    const modifierClass = document.querySelector("#modifier")
    modifierClass.style.display = "flex"
    const modifierClass2 = document.querySelector("#modifier2")
    modifierClass2.style.display = "flex"
    const headerValidation = document.querySelector("#modeEdition")
    headerValidation.style.display = "flex"
}

//Affichage de la modale
let defaultModal = null

const openModal = function(e) {
    e.preventDefault()
    const target = document.querySelector("#modalAdmin")
    target.style.display = null
    target.removeAttribute("aria-hidden")
    target.setAttribute("aria-modal", "true")
    defaultModal = target
    defaultModal.addEventListener("click", closeModal)
    defaultModal.querySelector("#closeModalButton").addEventListener("click", closeModal)
    defaultModal.querySelector("#modal").addEventListener("click", stopPropagation)
}

const closeModal = function (e) {
    if (defaultModal === null) return
    e.preventDefault()
    defaultModal.style.display = "none"
    defaultModal.setAttribute("aria-hidden", "true")
    defaultModal.removeAttribute("aria-modal")
    defaultModal.removeEventListener("click", closeModal)
    defaultModal.querySelector("#closeModalButton").removeEventListener("click", closeModal)
    defaultModal.querySelector("#closeButtonDiv").removeEventListener("click", stopPropagation)

    defaultModal = null
}

const stopPropagation = (e) => {
    e.stopPropagation()
}

document.querySelectorAll(".js-modifier").forEach(a => {
    a.addEventListener("click", openModal)
})

window.addEventListener("keydown", function(e){
    if(e.key === "Escape" || e.key === "Esc") {
        closeModal(e)
    }
})


function adminPanel (travaux) {
    for (let i = 0; i < travaux.length; i++) {

        const travail = travaux[i]
        

        const galleryAdmin = document.querySelector("#adminWork")


        const carteAdmin = document.createElement("figure")
        carteAdmin.dataset.id = travail.id

        const imageCarte = document.createElement("img")
        imageCarte.src = travail.imageUrl

        const titreCarte = document.createElement("p")
        titreCarte.innerText = travail.title

        const trashButton = document.createElement("button")
        trashButton.setAttribute("id", "trashClick")


        galleryAdmin.append(carteAdmin)
        carteAdmin.append(trashButton)
        carteAdmin.append(imageCarte)
        carteAdmin.append(titreCarte)
    }
}
adminPanel(travaux)

const deleteWork = async function (e) {
    e.preventDefault()
    await fetch("http://localhost:5678/api/works/" + e, {
        headers: {
            Authorization: "BEARER" + getCookie("token"),
        },
        method:"DELETE"
    })
    .then(function (response) {
        if (response.ok){
            return response.json()
        }
    })
    .then(function (work){
        console.log(work)
    })
    .catch(function (error){
        console.log(error)
    })
}

const trashWork = document.querySelectorAll("#trashClick").forEach( e => {
    e.addEventListener("click", () => {
        const result = e.parentElement.dataset.id
        deleteWork(result)
    })
})
