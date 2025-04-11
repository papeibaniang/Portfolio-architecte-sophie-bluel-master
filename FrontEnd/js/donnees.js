 export async function recuperationDesTravaux(){
    const reponse = await fetch("http://localhost:5678/api/works")
    const travaux = await reponse.json()
    const valeurTravaux = JSON.stringify(travaux)
    window.localStorage.setItem("travaux", valeurTravaux)
}

export async function recuperationCategories() {
    const reponse = await fetch("http://localhost:5678/api/categories")
    const categories = await reponse.json()
    const valeurCategories = JSON.stringify(categories)
    window.localStorage.setItem("categories", valeurCategories)
}

export async function connexion(pEmail, pMotDePasse) {
    const utilisateur = {email:pEmail, password:pMotDePasse}
    const chargeUtile = JSON.stringify(utilisateur)
    const reponse = await fetch("http://localhost:5678/api/users/login",{
        method: "POST",
        headers:{"Content-Type": "application/json"},
        body: chargeUtile
    })

    return(reponse)
}