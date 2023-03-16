import {setCookie} from "./script-connexion.js";

// Je créer mon lien avec l'API ou se trouve les travaux de Sophie
let travaux = window.sessionStorage.getItem("localWork")

if (travaux === null){
    await fetch("http://localhost:5678/api/works", {
        method: 'GET'
    })
    .then(function (res) {
        if (res.ok) {
            return res.json()
        }
    })
    .then(function(save) {
    window.sessionStorage.setItem("localWork", JSON.stringify(save))
    creerCarte(save)
    })
} else {
    travaux = JSON.parse(travaux)
}

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
creerCarte(travaux)
affichageFiltrer(travaux)

// fonction de filtre de l'affichage des travaux
function affichageFiltrer(travaux){
    for(let i = travaux.length -1; i > 0; i--) {
        const travail = travaux[i]
        console.log(travail)
        
    }
}

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
    window.sessionStorage.removeItem("localWork")
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
    defaultModal.querySelectorAll(".closeModalButton").forEach(a=> {
        a.addEventListener("click", closeModal)
    })
    defaultModal.querySelector("#modal").addEventListener("click", stopPropagation)
    defaultModal.querySelector("#modalAdd").addEventListener("click", stopPropagation)
}

const closeModal = function (e) {
    if (defaultModal === null) return
    e.preventDefault()
    defaultModal.style.display = "none"
    defaultModal.setAttribute("aria-hidden", "true")
    defaultModal.removeAttribute("aria-modal")
    defaultModal.removeEventListener("click", closeModal)
    defaultModal.querySelector(".closeModalButton").removeEventListener("click", closeModal)
    defaultModal.querySelector(".closeButtonDiv").removeEventListener("click", stopPropagation)

    document.querySelector("#modalAdd").style.display = "none"
    document.querySelector("#modal").style.display = null
    document.querySelector("#formulaireAjoutPhoto").reset()
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

// Suppression des travaux
document.querySelectorAll("#trashClick").forEach( e => {
    const result =  e.parentElement.dataset.id
    e.addEventListener("click", (e) => {
        e.preventDefault()
        console.log(result)
        deleteWork(result)
    })
})

const deleteWork = async function (e) {
    await fetch("http://localhost:5678/api/works/" + e, {
        headers: {
            Authorization: "BEARER " + getCookie("token"),
        },
        method:"DELETE"
    })
    .then(function (res) {
            if (res.ok){
                console.log("Fichier supprimer")
            }else{
                console.log("Erreur lors de la suppression")
            }
        })
    }

//Drag & Drop
const dropArea = document.querySelector(".drag-area")
const dragButton = dropArea.querySelector("#dragButton")
const dragInput = dropArea.querySelector("#dragInput")

let file

dragButton.onclick = (e)=>{
    e.preventDefault()
    dragInput.click()
}

dragInput.addEventListener("change",function(){
    file = this.files[0]
    showFile()
})

dropArea.addEventListener("dragover", (event)=>{
    event.preventDefault()
    dropArea.classList.add("active")
})

dropArea.addEventListener("dragleave", ()=>{
    dropArea.classList.remove("active")
})

dropArea.addEventListener("drop", (event)=>{
    event.preventDefault()
    file = event.dataTransfer.files[0]
    showFile()
})

function showFile(){
    let fileType = file.type

    let valideExtensions = ["image/png","image/jpeg","image/jpg"]
    if(valideExtensions.includes(fileType)){
        console.log("c'est une image")
        let fileReader = new FileReader()
        fileReader.onload = ()=>{
            let fileURL = fileReader.result
            let imgTag = `<img src="${fileURL}" alt="">`
            dropArea.innerHTML = imgTag
        }
        fileReader.readAsDataURL(file)
    }else{
        document.querySelector("#erreurAdd").style.display = "inline"
        dropArea.classList.remove("active")
    }
}

//Ajout des travaux
document.querySelector("#addButton").addEventListener("click", ()=> {
    document.querySelector("#modalAdd").style.display = null
    document.querySelector("#modal").style.display = "none"
})
document.querySelector("#lastPage").addEventListener("click", ()=> {
    document.querySelector("#modalAdd").style.display = "none"
    document.querySelector("#modal").style.display = null
    document.querySelector("#formulaireAjoutPhoto").reset()
})


async function envoieTravail(){
    const formInfo = document.querySelector("#formulaireAjoutPhoto")
    formInfo.addEventListener("submit", function(event) {
        event.preventDefault()

        let data = new FormData()
        data.append("image", file)
        data.append("title", document.querySelector("#workTitle").value)
        data.append("category", document.querySelector("#workCategory").value)

        async function sendWork(){
            await fetch("http://localhost:5678/api/works",{
                headers: {
                    Authorization: "BEARER " + getCookie("token"),
                },
                method: "POST",
                body: data
            })
            .then(res => {
                try{
                    if (res.ok === true) {
                    document.querySelector("#succesAdd").style.display = "inline"
                    return res.json()
                    }else{
                    document.querySelector("#erreurAdd").style.display = "inline"
                    }
                  } catch (e) {
                    console.error(e)
                  }
            })
        }
        sendWork()
    })
}
envoieTravail()