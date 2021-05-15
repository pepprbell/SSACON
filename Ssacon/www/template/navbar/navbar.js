const navbar__body = document.querySelector("body")

const navbar = document.createElement("div")
const navbar__backButton = document.createElement("button")
const navbar__title = document.createElement("div")
const navbar__menuButton = document.createElement("button")

const sidemenu = document.createElement("div")
sidemenu.classList.add("sidemenu")

const sidemenu__close = document.createElement("div")
sidemenu__close.className = "sidemenu__close"
sidemenu__close.innerHTML='X'

sidemenu.appendChild(sidemenu__close)

const hamburger = document.createElement("img")
hamburger.className="icon"
hamburger.src="file:///android_asset/www/template/navbar/icons/hamburger.png"
const chevelon__back = document.createElement("img")
chevelon__back.className="icon"
chevelon__back.src="file:///android_asset/www/template/navbar/icons/chevelon__back.png"

navbar__backButton.appendChild(chevelon__back);
navbar__menuButton.appendChild(hamburger);

const title= document.title


navbar.className="navbar"
navbar__backButton.className="navbar__backButton"
navbar__title.className="navbar__title"
navbar__title.innerHTML=title
navbar__menuButton.className="navbar__menuButton"

// navbar__backButton.innerHTML = "<"
navbar__backButton.addEventListener("click", function(){
    window.history.back();
})

navbar__menuButton.addEventListener("click", function(){
    sidemenu.classList.add("show")
})

// navbar__menuButton.innerHTML="메뉴"

navbar.appendChild(navbar__backButton)
navbar.appendChild(navbar__title)
navbar.appendChild(navbar__menuButton)
navbar__body.appendChild(navbar)

