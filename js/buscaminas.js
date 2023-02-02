const hamburgerMenu = document.getElementById('hamburger-menu');
const nav = document.getElementById('nav');
const divJuego = document.getElementById('divJuego');
const tablero = document.getElementById('tablero');
const divDatosPartida = document.getElementById('datosPartida');

// Opciones del zoom

document.getElementById('z100').addEventListener('click', function(){
    document.body.style.zoom = '1';
});
document.getElementById('z125').addEventListener('click', function(){
    document.body.style.zoom = '1.25';
});
document.getElementById('z150').addEventListener('click', function(){
    document.body.style.zoom = '1.50';
});
document.getElementById('z200').addEventListener('click', function(){
    document.body.style.zoom = '2';
});

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
    
    for (let i = 0; i < filas; i++) {
        let fila = tablero.insertRow();
        for (let j = 0; j < columnas; j++) {
            let columna = fila.insertCell();
            columna.appendChild(document.createTextNode(j));
        }
    }
}

function iniciarPartida() {
    let dificultad = document.getElementById('dificultad').value;
    let filas = 0;
    let columnas = 0;
    let nbombas = 0;
    let creaTablero = true;

    if (dificultad === "personalizado") {

        filas = document.getElementById("filas").value;
        columnas = document.getElementById("columnas").value;
        nbombas = document.getElementById("nbombas").value;

        if (filas == 0 || columnas == 0 || nbombas == 0) {
            document.getElementById("errorCampos").classList.add("errorCamposActivo");
            creaTablero = false;
        }
    }else{
        let dificultadArray = dificultad.split("x");
        filas = dificultadArray[0];
        columnas = dificultadArray[1];
        nbombas = dificultadArray[2];
    }

    if (creaTablero) {
        crearTablero(filas, columnas);
        juego();
    }
}

function juego() {
    divDatosPartida.classList.add("hidden");
}