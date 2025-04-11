import{recuperationCategories, recuperationDesTravaux} from "./donnees.js"
import AffichageProjets from "./travaux.js"

let travaux = window.localStorage.getItem("travaux");
let categories = window.localStorage.getItem("categories")
const token = window.localStorage.getItem("token")

//Récupération des travaux éventuellement stockées dans le localStorage
if (travaux === null) {
    await recuperationDesTravaux()
    travaux = window.localStorage.getItem("travaux")
    travaux = JSON.parse(travaux)
} else {
    travaux = JSON.parse(travaux)
}

//Vérifie si l'utilisateur est connecté
if(token != null){

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
if (categories === null){
    await recuperationCategories()
    categories = window.localStorage.getItem("categories")
    categories = JSON.parse(categories)
}else{
    categories = JSON.parse(categories)
}

//Affichage des projets
AffichageProjets(travaux, categories)