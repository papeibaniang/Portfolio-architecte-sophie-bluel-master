import supprimerUnTravail from "./donnees.js"
import { recuperationDesTravaux } from "./donnees.js"
import AffichageProjets from "./travaux.js"
import AffichageProjets from "./travaux.js"

export default function afficherModale(travaux) {

    //Récupération du modale
    const modale = document.getElementById("modale")
    modale.style.display = "flex"

    //Récupération du bouton qui ferme le modale
    const btnFermer = document.getElementsByClassName("js-modal-close")[0]

    //Fermeture du modale quand on appuie sur X
    btnFermer.onclick = function () {
        supContenuModal()
        modale.style.display = "none"
    }

    //Fermeture du modale lorsque l'on appuie en dehors du modale
    window.onclick = function (event) {
        if (event.target == modale) {
            supContenuModal()
            modale.style.display = "none"
        }
    }

    //Affiche la première modale avec les images des travaux
    afficherModale1()

}

function afficherTravauxModale(travaux) {
    const divImages = document.getElementsByClassName("images")[0]
    const listeClasse = divImages.classList
    listeClasse.add("flex")
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
        imgSuppression.addEventListener("click", function (event) {
            supprimerTravail(event)
        })
        divTravail.appendChild(imgSuppression)
    }
}

function supContenuModal() {
    const divImages = document.getElementsByClassName("images")[0]
    divImages.classList.remove("flex")
    while (divImages.hasChildNodes()) {
        divImages.removeChild(divImages.firstChild)
    }
    const btn = document.getElementsByClassName("btnEnvoi")[0]
    if (btn.hasChildNodes()) {
        btn.removeChild(btn.firstElementChild)
    }
    const premierElement = document.getElementsByClassName("modale-contenu")[0].firstElementChild
    if (premierElement.tagName == "IMG") {
        premierElement.removeEventListener("click", function(){})
        premierElement.remove()
    }
}

function afficherModale1() {
    //Titre modale
    const titreModale = document.getElementById("titreModal")
    titreModale.textContent = "Galerie photo"

    //Bouton modale
    const divBoutonEnvoi = document.getElementsByClassName("btnEnvoi")[0]
    const btnAjtPhoto = document.createElement("button")
    btnAjtPhoto.textContent = "Ajouter une photo"
    btnAjtPhoto.style.cursor = "pointer"
    divBoutonEnvoi.appendChild(btnAjtPhoto)
    btnAjtPhoto.addEventListener("click", function (event) {
        //btnAjtPhoto.removeEventListener("click", function(){})
        event.target.remove()
        afficherModale2()
    })

    //Affichage des images
    afficherTravauxModale(JSON.parse(window.localStorage.getItem("travaux")))
}

function afficherModale2() {
    supContenuModal()
    ajoutBtnPrecedent()
    const titreModale = document.getElementById("titreModal")
    titreModale.textContent = "Ajout photo"
    const divBoutonEnvoi = document.getElementsByClassName("btnEnvoi")[0]
    const btnAjout = document.createElement("button")
    btnAjout.textContent = "Valider"
    btnAjout.style.backgroundColor = "#A7A7A7"
    divBoutonEnvoi.appendChild(btnAjout)
    const divImages = document.getElementsByClassName("images")[0]
    const form = document.createElement("form")
    const divFile = document.createElement("div")
    divFile.style.backgroundColor = "#E8F1F6"
    divFile.style.height = "169px"
    const image = document.createElement("img")
    image.src = "./assets/icons/Vector.png"
    divFile.appendChild(image)
    const file = document.createElement("input")
    file.setAttribute("type", "file")
    file.style.display = "none"
    divFile.appendChild(file)
    const boutonAjoutFile = document.createElement("button")
    boutonAjoutFile.textContent = "+ Ajouter photo"
    boutonAjoutFile.addEventListener("click", function(e){
        if(file){
            e.preventDefault()
            file.click()
        }
    },false)
    divFile.appendChild(boutonAjoutFile)
    const paragraphe = document.createElement("p")
    paragraphe.textContent = "jpg, png : 4mo max"
    divFile.appendChild(paragraphe)
    form.appendChild(divFile)
    const divTitre = document.createElement("div")
    const labelTitre = document.createElement("label")
    labelTitre.textContent = "Titre"
    const inputTitre = document.createElement("input")
    inputTitre.setAttribute("type", "text")
    divTitre.appendChild(labelTitre)
    divTitre.appendChild(inputTitre)
    form.appendChild(divTitre)
    const divCategorie = document.createElement("div")
    const labelCategorie = document.createElement("label")
    labelCategorie.textContent = "Catégorie"
    const select = document.createElement("select")
    select.name = "categorie"
    select.id = "categorie"
    const optionVide = document.createElement("option")
    select.appendChild(optionVide)
    const listCategories = JSON.parse(window.localStorage.getItem("categories"))
    for (let i = 0; i < listCategories.length; i++) {
        let option = document.createElement("option")
        option.value = listCategories[i].name
        option.textContent = listCategories[i].name
        select.appendChild(option)
    }
    divCategorie.appendChild(labelCategorie)
    divCategorie.appendChild(select)
    form.appendChild(divCategorie)
    divImages.appendChild(form)
    btnAjout.addEventListener("click", function () {

    })
}

async function supprimerTravail(event) {
    const travailASupprimer = event.target.parentElement
    const id = travailASupprimer.getAttribute("data-id")
    await supprimerUnTravail(id)
    await recuperationDesTravaux()
    let travaux = window.localStorage.getItem("travaux")
    travaux = JSON.parse(travaux)
    supContenuModal()
    afficherTravauxModale(travaux)
    AffichageProjets(travaux, JSON.parse(window.localStorage.getItem("categories")))
}

function ajoutBtnPrecedent() {
    const modale = document.getElementsByClassName("modale-contenu")[0]
    const imagePrecedent = document.createElement("img")
    imagePrecedent.src = "./assets/icons/fleche-pointant-vers-la-gauche.png"
    imagePrecedent.addEventListener("click", function (event) {
        event.target.remove()
        supContenuModal()
        afficherModale1()
    })
    modale.insertBefore(imagePrecedent, modale.firstElementChild)
}