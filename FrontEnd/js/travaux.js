async function ajoutDesTravaux(){
    const reponse = await fetch("http://localhost:5678/api/works")
    const travaux = await reponse.json();
    const gallery = document.getElementsByClassName("gallery")[0]
    for (let i = 0; i < travaux.length; i++) {
        let figure = document.createElement("figure")
        let img = document.createElement("img")
        let figcaption = document.createElement("figcaption")
        figcaption.textContent = travaux[i].title;
        img.src = travaux[i].imageUrl;
        img.alt = travaux[i].title;
        figure.dataset.idTravaux = travaux[i].id;
        figure.dataset.categoryId = travaux[i].categoryId;
        figure.dataset.userId = travaux[i].userId;
        figure.appendChild(img);
        figure.appendChild(figcaption);
        gallery.appendChild(figure);
    }
}
async function ajoutCategories() {
    const reponse = await fetch("http://localhost:5678/api/categories")
    const categories = await reponse.json();
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
}
ajoutDesTravaux();
ajoutCategories();