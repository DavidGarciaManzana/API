let characters = ""
let characterCards = document.getElementById("characterCards")
let characterCard = ""
let allCardsVisible = ""
let apifetch = "https://rickandmortyapi.com/api/character"


let getCharacter = (apifecth) => {
    fetch(apifecth, {
        method: "GET",
    })
        .then((resp) => {
            return resp.json()
        })
        .then((answer) => {
            characters = answer.results
            charactersInfo = answer.info
            //Creo cada personaje en una "tarjeta de personaje"
            characters.forEach(function (char) {
                characterCard = document.createElement("div")
                characterCard.classList.add("character-card")
                characterCard.setAttribute("id", `${char.id}`)
                characterCard.innerHTML = `
                <div id="cards-container">
                <img src="${char.image}" alt="">
                <h1>Name: ${char.name}</h1>
                <h1>Species: ${char.species}</h1>
                <h1>Gender: ${char.gender}</h1>
                <h1>Status: ${char.status}</h1>
                </div>
                `
                characterCards.appendChild(characterCard)

                //Cuando se da click en alguno de los personajes, se muestra el siguiente modal creado a continuacion
                let showModal = () => {
                    let modal = document.createElement("div")
                    modal.classList.add("modal")
                    document.body.insertAdjacentElement("beforeend", modal)
                    let detailsFromChar = document.createElement("div")
                    detailsFromChar.classList.add("details")
                    detailsFromChar.innerHTML = `
                    <img src="${char.image}" alt="">
                    <h1>Name: ${char.name}</h1>
                    <h1>Species: ${char.species}</h1>
                    <h1>Gender: ${char.gender}</h1>
                    <h1>Id: ${char.id}</h1>
                    <h1>Status: ${char.status}</h1>
                    <h1>Location: ${char.location.name}</h1>
                    <h1>Origin: ${char.origin.name}</h1>
                    <h1>Created: ${char.created}</h1>
                    <a href="${char.url}">Click here to visit ${char.name} website</a>
                    `
                    modal.appendChild(detailsFromChar)
                    let closeButton = document.createElement("button")
                    closeButton.classList.add("close-button")
                    modal.appendChild(closeButton)
                    //Cuando se da click en el boton para cerrar el modal, este se elimina
                    let hideModal = () => {
                        modal.remove()
                    }
                    closeButton.addEventListener("click", hideModal)
                }

                characterCard.addEventListener("click", showModal)
            })
        })
        .catch(error => console.log("Error catch"))
}

// ---------------------------- SAQUE LAS FUNCIONES DEL SCOPE YA QUE SE GENERABA UN PROBLEMA CON EL ADEVENTLISTENER, LAS COLOQUE AFUERA
//----------------------------- PARA QUE NO EXISTIERA DICHO CONFLICTO
let showNextPage = () => {
    //Con esto obtenemos en que pagina estamos
    // let actualPage = answer.info.next.split("=").pop()

    //  Elimino todas las cartas que esten a la vista
    allCards = Array.from(document.getElementsByTagName("div"))
    allCards.forEach(card => {
        card.remove()
    })
    //Aplique un timeout para que se vea claramente como si se borran todos los elementos en pantalla
    //al hacer click en el boton de siguiente pagina

    //***El problema esta en que se llama a la API mas de una vez, volviendo a escribir valores que fueron previamente borrados
    //Aqui imprimo en consola la informacion que nos muestra como se llaman multiples "paginas" del API
    console.log(charactersInfo.next)
    apifetch = charactersInfo.next;
    return getCharacter(apifetch);

}
let nextPageButton = document.getElementById("next-page")
nextPageButton.addEventListener("click", showNextPage)

//Con esta funcion se resuelve el click a la pagina anterior
let previusPageButton = document.getElementById("previus-page")
let showPreviousPage = () => {
    // let actualPage = answer.info.prev.split("=").pop()
    //Eliminamos todas las cartes que se encuentren visibles
    allCards = Array.from(document.getElementsByTagName("div"))
    allCards.forEach(card => {
        card.remove()
    })
    if (charactersInfo.prev == null) {
        return
    } else {
        //Solo quiero que funcione en caso de que exista una pagina anterior
        apifetch = charactersInfo.prev;
        //Se llama a la API con la informacion de la pagina anterior
        return getCharacter(apifetch);

    }
}
// Escuchamos cuando el boton recibe un click para llamar a la funcion anterior
previusPageButton.addEventListener("click", showPreviousPage)


//Aqui se llama por primera vez la funcion. pasando como parametro el API original, con la primera pagina de elementos
getCharacter(apifetch)




