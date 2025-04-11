function afficherTravaux(travaux, idCategorie = 0) {
    const gallery = document.getElementsByClassName("gallery")[0]
    if(gallery.children.length != 0){
        let taille = gallery.children.length
        for(let i = 0; i < taille; i++){
            gallery.removeChild(gallery.firstElementChild)
        }
    }
    for (let i = 0; i < travaux.length; i++) {
        if(idCategorie == 0 || travaux[i].categoryId == idCategorie){
            let figure = document.createElement("figure")
            let img = document.createElement("img")
            let figcaption = document.createElement("figcaption")
            figcaption.textContent = travaux[i].title;
            img.src = travaux[i].imageUrl;
            img.alt = travaux[i].title;
            figure.appendChild(img);
            figure.appendChild(figcaption);
            gallery.appendChild(figure);
        }
    }
}
function afficherCategories(categories, travaux) {
    const divBouton = document.getElementsByClassName("filtre")[0]
    let boutonTous = document.createElement("button");
    boutonTous.textContent = "Tous";
    //Pour le bouton tous on met un id de 0 
    boutonTous.dataset.idCategorie = 0;
    divBouton.appendChild(boutonTous);
    for (let i = 0; i < categories.length; i++) {
        let bouton = document.createElement("button")
        bouton.textContent = categories[i].name;
        bouton.dataset.idCategorie = categories[i].id;
        divBouton.appendChild(bouton);
    }
    ajoutEvOnClick(travaux)
}
function ajoutEvOnClick(travaux) {
    const boutons = document.getElementsByClassName("filtre")[0].children;
    for (let i = 0; i < boutons.length; i++) {
        boutons[i].addEventListener("click", function(event){
            const idCategorie = event.target.dataset.idCategorie
            afficherTravaux(travaux, idCategorie)
        });
    }
}

export default function AffichageProjets(travaux, categories) {
    if(window.localStorage.getItem("token") == null){
        afficherCategories(categories, travaux)
    }
    afficherTravaux(travaux)
}