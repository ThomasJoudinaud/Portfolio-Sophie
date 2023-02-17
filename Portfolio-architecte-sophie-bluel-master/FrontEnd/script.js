
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
