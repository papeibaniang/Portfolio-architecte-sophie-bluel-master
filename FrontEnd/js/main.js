import{recuperationCategories, recuperationDesTravaux} from "./donnees.js"
import AffichageProjets from "./travaux.js"
import afficherModale from "./modale.js"

const token = window.localStorage.getItem("token")

//Récupération des travaux éventuellement stockées dans le localStorage
if (window.localStorage.getItem("travaux") === null) {
    await recuperationDesTravaux()
}

//Vérifie si l'utilisateur est connecté
if(token != null){

    //Ajout de la division mode édition 
    const modeEdition = document.getElementsByClassName("modeEdition")[0]
    modeEdition.style.display = "block"
    //Ajout du bouton modifier
    const sectionPortfolio = document.getElementById("portfolio")
    const titre = sectionPortfolio.firstElementChild
    const span = document.createElement("span")
    const texteSpan = document.createTextNode("Modifier")
    span.innerHTML = '<img src="./assets/icons/modifier.png" alt="">'
    span.appendChild(texteSpan)
    const div = document.createElement("div")
    div.classList.add("btnModifier")
    titre.style.margin = 0 
    sectionPortfolio.insertBefore(div, sectionPortfolio.children[0])
    div.appendChild(titre)
    div.appendChild(span)
    span.style.cursor = "pointer"

    //Ajout d'un écouteur événement sur le bouton modifier
    span.addEventListener("click", function(){
        afficherModale(JSON.parse(window.localStorage.getItem("travaux")))
        AffichageProjets(JSON.parse(window.localStorage.getItem("travaux")), JSON.parse(window.localStorage.getItem("categories")))
    })

    //Modification du bouton login en logout
    const login = document.getElementById("loginLogout")
    login.removeChild(login.firstElementChild)
    const logout = document.createTextNode("logout")
    login.appendChild(logout)
    login.style.cursor = "pointer"
    login.addEventListener("click", function(){
        window.localStorage.removeItem("token")
        location.reload()
    })
}

//Récupération des catégories de travaux éventuellement stockées dans le localStorage
if (window.localStorage.getItem("categories") === null){
    await recuperationCategories()
}

//Affichage des projets
AffichageProjets(JSON.parse(window.localStorage.getItem("travaux")), JSON.parse(window.localStorage.getItem("categories")))