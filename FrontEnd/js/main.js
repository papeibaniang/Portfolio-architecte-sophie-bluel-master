import{recuperationCategories, recuperationDesTravaux} from "./donnees.js"
import AffichageProjets from "./travaux.js"

let travaux = window.localStorage.getItem("travaux");
let categories = window.localStorage.getItem("categories")

//Récupération des travaux éventuellement stockées dans le localStorage
if (travaux === null) {
    await recuperationDesTravaux()
    travaux = window.localStorage.getItem("travaux")
    travaux = JSON.parse(travaux)
} else {
    travaux = JSON.parse(travaux)
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