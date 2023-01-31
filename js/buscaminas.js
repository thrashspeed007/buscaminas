const hamburgerMenu = document.getElementById('hamburger-menu');
const nav = document.getElementById('nav');
const divJuego = document.getElementsByClassName('divJuego');

const dificultad = document.getElementById('dificultad');
dificultad.addEventListener("change", mostrarDivPersonalizado);

const personalizado = document.getElementById('personalizado');

function mostrarDivPersonalizado() {
    if (dificultad.value === "personalizado") {
        personalizado.style.display = "flex"
    }else{
        console.log("dx");
        personalizado.style.display = "none"
    }
}

// Menú responsive de hamburguesa
hamburgerMenu.addEventListener("click", menuResponsive);

function menuResponsive() {
    nav.classList.toggle("active");
}

function crearTablero(filas, columnas) {

    divJuego.innerHTML += "<table>";

    for (let i = 0; i < filas; i++) {
        divJuego.innerHTML += "<tr>";
        for (let j = 0; j < columnas; j++) {
            divJuego.innerHTML += "<td>";
            divJuego.innerHTML += "uwu " + j;
            divJuego.innerHTML += "</td>";
        }
        divJuego.innerHTML += "</tr>";
        
    }

    divJuego.innerHTML += "</table>";
}

function inicarPartida() {
    
}