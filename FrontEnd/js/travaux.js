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
        figure.appendChild(img);
        figure.appendChild(figcaption);
        gallery.appendChild(figure);
    }
}
window.onload = function(){
    ajoutDesTravaux();
};