import supprimerUnTravail from "./donnees.js"
import{recuperationDesTravaux} from "./donnees.js"

export default function afficherModale(travaux) {

    //Récupération du modale
    const modale = document.getElementById("modale")
    modale.style.display = "flex"

    //Récupération du bouton qui ferme le modale
    const btnFermer = document.getElementsByClassName("js-modal-close")[0]

    //Fermeture du modale quand on appuie sur X
    btnFermer.onclick = function(){
        supContenuModal()
        modale.style.display = "none"
    }

    //Fermeture du modale lorsque l'on appuie en dehors du modale
    window.onclick = function(event){
        if(event.target == modale){
            supContenuModal()
            modale.style.display = "none"
        }
    }

    //Titre modale
    const titreModale = document.getElementById("titreModal")
    titreModale.textContent = "Galerie photo"

    //Bouton modale
    const btnAjtPhoto = document.getElementsByClassName("btnEnvoi")[0].firstElementChild
    btnAjtPhoto.textContent = "Ajouter une photo"
    btnAjtPhoto.addEventListener("click", function(){
        afficherModale2()
    })

    //Affichage des images
    afficherTravauxModale(travaux)
}

function afficherTravauxModale(travaux){
    const divImages = document.getElementsByClassName("images")[0]
    for (let i = 0; i < travaux.length; i++) {
        const divTravail = document.createElement("div")
        const img = document.createElement("img")
        img.setAttribute("src", travaux[i].imageUrl)
        divTravail.appendChild(img)
        divImages.appendChild(divTravail)
        divTravail.setAttribute("data-id", travaux[i].id)

        //Image suppression d'un travaux
        const imgSuppression = document.createElement("img")
        imgSuppression.setAttribute("src", "./assets/icons/trash-can-solid.png")
        let listeClasse = imgSuppression.classList
        listeClasse.add("img-suppression")
        imgSuppression.addEventListener("click", function(event){
            supprimerTravail(event)
        })
        divTravail.appendChild(imgSuppression)
    }
}

function supContenuModal() {
    const divImages = document.getElementsByClassName("images")[0]
    while (divImages.hasChildNodes()) {
        divImages.removeChild(divImages.firstChild)
    }
}

function afficherModale2(){
    supContenuModal()
    const titreModale = document.getElementById("titreModal")
    titreModale.textContent = "Ajout photo"
    const btnAjout = document.getElementsByClassName("btnEnvoi")[0].firstElementChild
    btnAjout.textContent = "Valider"
    btnAjout.removeEventListener("click",)

    //Ajout bouton précédent
    ajoutBtnPrecedent()
}

async function supprimerTravail(event){
    const travailASupprimer = event.target.parentElement
    const id = travailASupprimer.getAttribute("data-id")
    await supprimerUnTravail(id)
    await recuperationDesTravaux()
    let travaux = window.localStorage.getItem("travaux")
    travaux = JSON.parse(travaux)
    supContenuModal()
    afficherTravauxModale(travaux)
}

function ajoutBtnPrecedent(){
    const modale = document.getElementsByClassName("modale-contenu")[0]
    const btnPrecedent = document.createElement("button")
    const imagePrecedent = document.createElement("img")
    imagePrecedent.setAttribute("src", "./assets/icons/fleche-pointant-vers-la-gauche.png")
    btnPrecedent.appendChild(imagePrecedent)
    modale.insertBefore(btnPrecedent, modale.firstElementChild)
}