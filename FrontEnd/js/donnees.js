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