let characters = ""
let charactersInfo = ""
let characterCards = document.getElementById("characterCards")
let characterCard = ""
let allCardsVisible = ""
let apifetch = "https://rickandmortyapi.com/api/character"
let slideCointainer = document.getElementById("slide-track")

let nextPageButton = document.getElementById("next-page")
let previusPageButton = document.getElementById("previus-page")


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


            characters.forEach(function (char) {
                //CARROUSEL
                slide = document.createElement("div")
                slide.classList.add("slide")
                slide.innerHTML = `<div class="container5" id="container5" > 
                <img src="${char.image}" alt="" /> 
                <h1>Name: ${char.name}</h1>
                <h1>Species: ${char.species}</h1>
                <h1>Gender: ${char.gender}</h1>
                <h1>Status: ${char.status}</h1></div>`
                slideCointainer.appendChild(slide)
                //CARROUSEL

                //CHARACTER CARDS
                characterCard = document.createElement("div")
                characterCard.classList.add(`character-card`, `id-${char.id}`)
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
                //CHARACTER CARDS

                //SHOW MODAL
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
                    //SHOW MODAL

                    //CLOSE MODAL
                    let closeButton = document.createElement("button")
                    closeButton.classList.add("close-button")
                    modal.appendChild(closeButton)
                    let hideModal = () => {
                        modal.remove()
                    }
                    closeButton.addEventListener("click", hideModal)
                    //CLOSE MODAL
                }

                characterCard.addEventListener("click", showModal)
            })
        })
        .catch(error => console.log("Error catch"))
}

let showNextPage = () => {
    //DELETE ALL SLIDES
    allSlides = Array.from(document.querySelectorAll(".slide"))
    allSlides.forEach(slide => {
        slide.remove()
    })
    //DELETE ALL SLIDES

    //DELETE ALL OF THE CARDS
    allCards = Array.from(document.querySelectorAll(".character-card"))
    allCards.forEach(card => {
        card.remove()
    })
    //DELETE ALL OF THE CARDS

    //CALL NEW PAGE
    apifetch = charactersInfo.next;
    return getCharacter(apifetch);
    //CALL NEW PAGE

}
nextPageButton.addEventListener("click", showNextPage)

let showPreviousPage = () => {



    if (charactersInfo.prev == null) {
    } else {
        //DELETE ALL SLIDES
        allSlides = Array.from(document.querySelectorAll(".slide"))
        allSlides.forEach(slide => {
            slide.remove()
        })
        //DELETE ALL SLIDES

        //DELETE ALL OF THE CARDS
        allCards = Array.from(document.querySelectorAll(".character-card"))
        allCards.forEach(card => {
            card.remove()
        })
        //DELETE ALL OF THE CARDS
        apifetch = charactersInfo.prev;
        return getCharacter(apifetch);
    }
}

previusPageButton.addEventListener("click", showPreviousPage)


getCharacter(apifetch)


// ------------------------------------------------------ MENU BUTTON (MOBILE)
let menuButton = document.getElementById("menu")
let openMenu = () => {
    let menuModal = document.createElement("div")
    menuModal.classList.add("menu-modal")
    document.body.insertBefore(menuModal, characterCards)

    let close = document.createElement("div")
    close.classList.add("close-menu")
    close.innerText = "Close menu"
    menuModal.appendChild(close)

    let github = document.createElement("div")
    github.classList.add("mobile-menu-github")
    github.innerHTML = `<a href="https://github.com/DavidGarciaManzana" target="_blank"></a>`
    menuModal.appendChild(github)

    let linkedin = document.createElement("div")
    linkedin.classList.add("mobile-menu-linkedin")
    linkedin.innerHTML = `<a href="https://www.linkedin.com/in/davidgarciaman/" target="_blank"></a>`
    menuModal.appendChild(linkedin)

    let portfolio = document.createElement("div")
    portfolio.classList.add("mobile-menu-portfolio")
    portfolio.innerHTML = `<a href="https://www.davidgarxa.com" target="_blank">Visit my portfolio!!!</a>`
    menuModal.appendChild(portfolio)

    let api = document.createElement("div")
    api.classList.add("mobile-menu-api")
    api.innerHTML = `<a href="https://rickandmortyapi.com/" target="_blank">Rick and Morty API</a>`
    menuModal.appendChild(api)

    let closeMenu = () => {
        menuModal.remove()
    }
    close.addEventListener("click", closeMenu)
}

menuButton.addEventListener("click", openMenu)

