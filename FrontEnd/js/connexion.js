import{connexion} from "./donnees.js"

const messageErreur = document.getElementsByClassName("messageErreur")[0]
const champsMail = document.getElementsByClassName("champsMail")[0]
const email = document.getElementById("email")
const motDePasse = document.getElementById("motDePasse")
const formulaireConnexion = document.getElementsByClassName("formulaire")[0].parentElement
formulaireConnexion.addEventListener("submit", async function(event){
    event.preventDefault()
    const reponse = await connexion(email.value, motDePasse.value)
    const infoUtilisateur = await reponse.json()
    if(reponse.status == 404 || reponse.status == 401){
        messageErreur.textContent = "Erreur dans l’identifiant ou le mot de passe"
        champsMail.style.marginTop = "10px"
    }
    else if(reponse.status === 200){
        window.localStorage.setItem("token", infoUtilisateur.token)
        window.location.href = "index.html";
    }
})