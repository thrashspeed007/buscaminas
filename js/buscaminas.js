const hamburgerMenu = document.getElementById('hamburger-menu');
const nav = document.getElementById('nav');
const divJuego = document.getElementById('divJuego');
const tablero = document.getElementById('tablero');
const divDatosPartida = document.getElementById('datosPartida');
let minas = new Array();

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

    let contador = 0;

    for (let i = 0; i < filas; i++) {
        let fila = tablero.insertRow();
        for (let j = 0; j < columnas; j++) {
            let columna = fila.insertCell();
            columna.setAttribute("id", contador);
            columna.addEventListener("click", function() {
                destaparCasilla(columna.id);
            });
            contador++;
        }
    }
}

function rellenarMinas(nbombas, filas, columnas) {
    let fila;
    let celda;
    let idMina;
    let totalCeldas = filas * columnas;

    for (let i = 0; i < nbombas;) {
        let randomNum = Math.floor(Math.random() * (totalCeldas));
        if (!minas.includes(randomNum)) {
            console.log(randomNum);
            i++;
            minas.push(randomNum.toString());
            console.log(randomNum);
        }
    }
    console.log(minas);
}

function destaparCasilla(id) {

    if (minas.includes(id)) {
        minas.forEach(element => {
            document.getElementById(element).style.backgroundColor = "red";
            derrota();
        });

    }else{
        calcularBombasVecinas(id);
    }

}

function calcularBombasVecinas(id) {
    
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
    
    

}

function derrota() {
    document.getElementById('derrota').style.display = "block"
}

function reset() {
    minas = new Array();
}