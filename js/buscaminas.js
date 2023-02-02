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
            columna.setAttribute("id", "f" + i + "c" + j);
            columna.addEventListener("click", function() {
                destaparCasilla(columna.id);
            })
        }
    }
}

function rellenarMinas(nbombas, filas, columnas) {
    let minas = new Array();
    let fila;
    let celda;
    let idMina;

    for (let i = 0; i < nbombas;) {
        random = String("0" + Math.floor(Math.random() * (filas*columnas))).slice(-2);
        if (!minas.includes(random)) {
            i++;
            fila = "f" + String(random).charAt(0);
            celda = "c" + String(random).charAt(1);
            idMina = fila+celda;
            minas.push(idMina);
            console.log(random);
        }
    }
    console.log(minas);
}

function destaparCasilla(id) {
    console.log("el id es" + id);
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
        divDatosPartida.classList.add("hidden");
        crearTablero(filas, columnas);
        rellenarMinas(nbombas, filas, columnas);
    }
}

function juego() {
    let minas = new Array();
    

}