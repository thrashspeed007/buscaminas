// Autor : Adrián García

let hamburgerMenu = document.getElementById('hamburger-menu');
let nav = document.getElementById('nav');
let divJuego = document.getElementById('divJuego');
let tablero = document.getElementById('tablero');
let divDatosPartida = document.getElementById('datosPartida');
let divInstrucciones = document.getElementById('instrucciones');
let divFormulario = document.getElementById('divFormulario');
let minas = new Array();
let nfilas;
let ncolumnas;
let nminas;
let multiplos = new Array();
let totalCeldas = 0;
let celdasBlancas = new Array();
let celdasLiberadas = 0;
let celdasExpuestas = new Array();
let celdasBlancasUsadas = new Array();
let megaman = document.getElementById('megaman');
let billBala = document.getElementById('billBala');
let botonStart = document.getElementById('botonStart');

botonStart.addEventListener("click", iniciarPartida);

// Animacion de megaman

function empezarPartida() {

    botonStart.classList.add("noHover");

    if (window.getComputedStyle(megaman, null).display === "none") {
        calcularMultiplos(nfilas, ncolumnas);
        totalCeldas = nfilas * ncolumnas;
        divDatosPartida.classList.add("hidden");
        divInstrucciones.classList.add("hidden");
        crearTablero(nfilas, ncolumnas);
        rellenarMinas(nminas, nfilas, ncolumnas);
    }else{
        megaman.classList.add("megamanActive");
        setTimeout(function() {
            billBala.classList.add("billBalaActive");
        }, 500)
        setTimeout(function() {    
            calcularMultiplos(nfilas, ncolumnas);
            totalCeldas = nfilas * ncolumnas;
            divDatosPartida.classList.add("hidden");
            divInstrucciones.classList.add("hidden");
            crearTablero(nfilas, ncolumnas);
            rellenarMinas(nminas, nfilas, ncolumnas);
        }, 1000);
    }
}

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

// Opciones de la dificultad

let dificultad = document.getElementById('dificultad');
dificultad.addEventListener("change", mostrarDivPersonalizado);

let personalizado = document.getElementById('personalizado');

function mostrarDivPersonalizado() {
    let nivelDificultad = dificultad.value;

    switch (nivelDificultad) {
        case "10x10x10":
            divFormulario.style.boxShadow = "inset 0px 0px 10px 2px green";
            break;
        case "15x20x40":
            divFormulario.style.boxShadow = "inset 0px 0px 10px 2px yellow";
            break;
        case "15x30x90":
            divFormulario.style.boxShadow = "inset 0px 0px 10px 2px red";
            break;
        case "personalizado":
            divFormulario.style.boxShadow = "inset 0px 0px 10px 2px white";
            break;

        default:
            break;
    }

    if (nivelDificultad === "personalizado") {
        personalizado.style.display = "flex";
    }else{
        personalizado.style.display = "none";
    }

    if (dificultad.value) {
        
    }
}

// Menú responsive de hamburguesa

hamburgerMenu.addEventListener("click", menuResponsive);

function menuResponsive() {
    nav.classList.toggle("active");
}

// Crear tabla del buscaminas

function crearTablero(filas, columnas) {

    let contador = 0;
    let divString = "";

    for (let i = 0; i < filas; i++) {
        // let fila = tablero.insertRow();
        divString += "<div class='fila'>";
        for (let j = 0; j < columnas; j++) {
            divString += "<div class='casilla' id='" + contador + "' onclick='destaparCasilla(" + contador.toString() + ")'></div>";
            contador++;
        }
        divString += "</div>";
    }
    tablero.innerHTML = divString;

    
    let casillas = document.getElementsByClassName("casilla");

    for (let casilla of casillas) {
         casilla.addEventListener("click", function() {
                destaparCasilla(casilla.id);
            });
        casilla.addEventListener("contextmenu", function(event) {
                event.preventDefault();
                ponerBanderita(casilla.id);
            });
    }
}

function rellenarMinas(nbombas, filas, columnas) {

    for (let i = 0; i < nbombas;) {
        let randomNum = Math.floor(Math.random() * (totalCeldas));
        if (!minas.includes(randomNum.toString())) {
            i++;
            minas.push(randomNum.toString());
        }
    }

    console.log(minas);
}

function ponerBanderita(id) {
    if (!document.getElementById(id).hasChildNodes() && !document.getElementById(id).classList.contains("celdaLibre")) {
        document.getElementById(id).classList.toggle("bandera");
    }
}

function destaparCasilla(id) {

    if (minas.includes(id.toString())) {
        minas.forEach(element => {
            document.getElementById(element).classList.add("bomba");
            derrota();
        });

    }else if (!document.getElementById(id).hasChildNodes() && !document.getElementById(id).classList.contains("celdaLibre")) {
            destaparAutomatico(parseInt(id));   
    }
}

function destaparAutomatico(id) {

    console.log(celdasLiberadas);

    let up = false;
    let down = false;
    let right = false;
    let left = false;

    // Calcular si la casilla esta en algun borde o esquina

    if (multiplos.includes(id + 1)) {
        right = true;
    }

    if (multiplos.includes(id)) {
        left = true;
    }

    if ( (id - ncolumnas) < 0) {
        up = true;
    }
    if ((id + ncolumnas) >= totalCeldas ) {
        down = true;
    }
    
    if (calcularBombasVecinas(id) === 0) {

        if (up && left) {
            calcularBombasVecinas(id + 1);
            calcularBombasVecinas(id + ncolumnas + 1);
            calcularBombasVecinas(id + ncolumnas);
        }else if (up && right) {
            calcularBombasVecinas(id - 1);
            calcularBombasVecinas(id + ncolumnas - 1);
            calcularBombasVecinas(id + ncolumnas);
        }else if (down && left) {
            calcularBombasVecinas(id - ncolumnas);
            calcularBombasVecinas(id - ncolumnas + 1);
            calcularBombasVecinas(id + 1);
        }else if (down && right) {
            calcularBombasVecinas(id - ncolumnas);
            calcularBombasVecinas(id - ncolumnas - 1);
            calcularBombasVecinas(id - 1);
        
        }else if (up) {
            calcularBombasVecinas(id - 1);
            calcularBombasVecinas(id + ncolumnas - 1);
            calcularBombasVecinas(id + ncolumnas);
            calcularBombasVecinas(id + ncolumnas + 1);
            calcularBombasVecinas(id + 1);
        }else if (down) {
            calcularBombasVecinas(id - 1);
            calcularBombasVecinas(id - ncolumnas - 1);
            calcularBombasVecinas(id - ncolumnas);
            calcularBombasVecinas(id - ncolumnas + 1);
            calcularBombasVecinas(id + 1);
        }else if (left) {
            calcularBombasVecinas(id - ncolumnas);
            calcularBombasVecinas(id - ncolumnas + 1);
            calcularBombasVecinas(id + 1);
            calcularBombasVecinas(id + ncolumnas + 1);
            calcularBombasVecinas(id + ncolumnas);
        }else if (right) {
            calcularBombasVecinas(id - ncolumnas);
            calcularBombasVecinas(id - ncolumnas - 1);
            calcularBombasVecinas(id - 1);
            calcularBombasVecinas(id + ncolumnas - 1);
            calcularBombasVecinas(id + ncolumnas);
        }else{
            calcularBombasVecinas(id - ncolumnas);
            calcularBombasVecinas(id - ncolumnas + 1);
            calcularBombasVecinas(id + 1);
            calcularBombasVecinas(id + ncolumnas + 1);
            calcularBombasVecinas(id + ncolumnas);
            calcularBombasVecinas(id + ncolumnas - 1);
            calcularBombasVecinas(id - 1);
            calcularBombasVecinas(id - ncolumnas - 1);
        }

        celdasBlancasUsadas = celdasBlancasUsadas.concat(celdasBlancas);
        celdasBlancas.shift();
    
        if (celdasBlancas.length != 0) {
            destaparAutomatico(celdasBlancas[0]);
        }
    }

    if (celdasLiberadas >= (totalCeldas - nminas)) {
        victoria();
    }


}

function calcularBombasVecinas(id) {

    let contador = 0;

    let up = false;
    let down = false;
    let right = false;
    let left = false;

    // Calcular si la casilla esta en algun borde o esquina

    if (multiplos.includes(id + 1)) {
        right = true;
    }

    if (multiplos.includes(id)) {
        left = true;
    }

    if ( (id - ncolumnas) < 0) {
        up = true;
    }
    if ((id + ncolumnas) >= totalCeldas ) {
        down = true;
    }

    // Calcular el numero de minas de la casilla dependiendo de la posicion (borde , esquina o centro)


    if (up && left) {
        if (tieneMina(id + 1)) {
            contador++;
        }
        if (tieneMina(id + ncolumnas + 1)) {
            contador++;
        }
        if (tieneMina(id + ncolumnas)) {
            contador++;
        }
    }else if (up && right) {
        if (tieneMina(id - 1)) {
            contador++;
        }
        if (tieneMina(id + ncolumnas - 1)) {
            contador++;
        }
        if (tieneMina(id + ncolumnas)) {
            contador++;
        }
        
    }else if (down && left) {
        if (tieneMina(id - ncolumnas)) {
            contador++;
        }
        if (tieneMina(id - ncolumnas + 1)) {
            contador++;
        }
        if (tieneMina(id + 1)) {
            contador++;
        }
        
    }else if (down && right) {
        
        if (tieneMina(id - ncolumnas)) {
            contador++;
        }
        if (tieneMina(id - ncolumnas - 1)) {
            contador++;
        }
        if (tieneMina(id - 1)) {
            contador++;
        }
        
    }else if (up) {

        if (tieneMina(id - 1)) {
            contador++;
        }
        if (tieneMina(id + ncolumnas - 1)) {
            contador++;
        }
        if (tieneMina(id + ncolumnas)) {
            contador++;
        }
        if (tieneMina(id + ncolumnas + 1)) {
            contador++;
        }
        if (tieneMina(id + 1)) {
            contador++;
        }

    }else if (down) {

        if (tieneMina(id - 1)) {
            contador++;
        }
        if (tieneMina(id - ncolumnas - 1)) {
            contador++;
        }
        if (tieneMina(id - ncolumnas)) {
            contador++;
        }
        if (tieneMina(id - ncolumnas + 1)) {
            contador++;
        }
        if (tieneMina(id + 1)) {
            contador++;
        }

    }else if (left) {
        if (tieneMina(id - ncolumnas)) {
            contador++;
        }
        if (tieneMina(id - ncolumnas + 1)) {
            contador++;
        }
        if (tieneMina(id + 1)) {
            contador++;
        }
        if (tieneMina(id + ncolumnas + 1)) {
            contador++;
        }
        if (tieneMina(id + ncolumnas)) {
            contador++;
        }
        
    }else if (right) {
        if (tieneMina(id - ncolumnas)) {
            contador++;
        }
        if (tieneMina(id - ncolumnas - 1)) {
            contador++;
        }
        if (tieneMina(id - 1)) {
            contador++;
        }
        if (tieneMina(id + ncolumnas - 1)) {
            contador++;
        }
        if (tieneMina(id + ncolumnas)) {
            contador++;
        }
        
    }else{
        if (tieneMina(id - ncolumnas)) {
            contador++;
        }
        if (tieneMina(id - ncolumnas + 1)) {
            contador++;
        }
        if (tieneMina(id + 1)) {
            contador++;
        }
        if (tieneMina(id + ncolumnas + 1)) {
            contador++;
        }
        if (tieneMina(id + ncolumnas)) {
            contador++;
        }
        if (tieneMina(id + ncolumnas - 1)) {
            contador++;
        }
        if (tieneMina(id - 1)) {
            contador++;
        }
        if (tieneMina(id - ncolumnas - 1)) {
            contador++;
        }
    }

    if (contador === 0) {
        document.getElementById(id).classList.add("celdaLibre");
        if (!celdasBlancasUsadas.includes(id)) {
            celdasBlancas.push(id);
        }
    }else{
        switch (contador) {
            case 1:
                document.getElementById(id).innerHTML = "<span style='color: blue'>" + contador + "</span>";        
                break;
            case 2:
                document.getElementById(id).innerHTML = "<span style='color: yellow'>" + contador + "</span>";        
                break;
            case 3:
                document.getElementById(id).innerHTML = "<span style='color: orange'>" + contador + "</span>";        
                break;
            case 4:
                document.getElementById(id).innerHTML = "<span style='color: purple'>" + contador + "</span>";        
                break;
        
            default:

            break;
        }
        document.getElementById(id).classList.remove("bandera");
        document.getElementById(id).classList.add("celdaConNumero");
    }

    if (!celdasExpuestas.includes(id)) {
        celdasExpuestas.push(id);
        celdasLiberadas++;
    }

    return contador;
}

function tieneMina(id) {
    if (minas.includes(id.toString())) {
        return true;
    }else{
        return false;
    }
}

function iniciarPartida() {

    let dificultad = document.getElementById('dificultad').value;
    let creaTablero = true;

    if (dificultad === "personalizado") {

        nfilas = parseInt(document.getElementById("filas").value);
        ncolumnas = parseInt(document.getElementById("columnas").value);
        nminas = parseInt(document.getElementById("nbombas").value);

        if (isNaN(nfilas) || isNaN(ncolumnas) || isNaN(nminas)) {
            document.getElementById("errorCampos").innerHTML = "<span>Rellena todos los campos porfavor</span>"
            document.getElementById("errorCampos").classList.add("errorCamposActivo");
            creaTablero = false;
        }else if (nminas > (nfilas/2) * (ncolumnas/2)) {
            document.getElementById("errorCampos").innerHTML = "<span>El numero de minas introducido no es correcto. Intentalo con un número menor</span>"
            document.getElementById("errorCampos").classList.add("errorCamposActivo");
            creaTablero = false;
        }else if (nfilas == 0 || ncolumnas == 0 || nminas == 0) {
            document.getElementById("errorCampos").innerHTML = "<span>Los valores tienen que ser mayores que 0</span>"
            document.getElementById("errorCampos").classList.add("errorCamposActivo");
            creaTablero = false;
        }

    }else{
        let dificultadArray = dificultad.split("x");
        nfilas = parseInt(dificultadArray[0]);
        ncolumnas = parseInt(dificultadArray[1]);
        nminas = parseInt(dificultadArray[2]);
    }

    if (creaTablero) {
        empezarPartida();
    }
}

function calcularMultiplos(filas, columnas) {

    let multiplo = 0;
    multiplos.push(multiplo);

    for (let i = 0; i < filas; i++) {
        multiplo += columnas;
        multiplos.push(multiplo);
    }
}

function contarCeldasExpuestas() {
    
}

function victoria() {
    document.getElementById('victoria').style.display = "block";
    minas.forEach(element => {
        document.getElementById(element).classList.add("bandera");
    });
    tablero.classList.add("noHover");
}

function derrota() {
    document.getElementById('derrota').style.display = "block";
    tablero.classList.add("noHover");
}

function reset() {
    minas = new Array();
}