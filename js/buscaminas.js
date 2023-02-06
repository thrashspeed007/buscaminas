// Autor : Adrián García

let hamburgerMenu = document.getElementById('hamburger-menu');
let nav = document.getElementById('nav');
let divJuego = document.getElementById('divJuego');
let tablero = document.getElementById('tablero');
let divDatosPartida = document.getElementById('datosPartida');
let minas = new Array();
let nfilas;
let ncolumnas;
let nminas;
let multiplos = new Array();
let totalCeldas = 0;
let celdasBlancas = new Array();
let celdasBlancasUsadas = new Array();

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

let dificultad = document.getElementById('dificultad');
dificultad.addEventListener("change", mostrarDivPersonalizado);

let personalizado = document.getElementById('personalizado');

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
            columna.addEventListener("contextmenu", function(event) {
                event.preventDefault();
                ponerBanderita(columna.id);
            });
            contador++;
        }
    }
}

function rellenarMinas(nbombas, filas, columnas) {

    for (let i = 0; i < nbombas;) {
        let randomNum = Math.floor(Math.random() * (totalCeldas));
        if (!minas.includes(randomNum)) {
            i++;
            minas.push(randomNum.toString());
        }
    }
}

function ponerBanderita(id) {
    if (!document.getElementById(id).hasChildNodes() && !document.getElementById(id).classList.contains("celdaLibre")) {
        document.getElementById(id).classList.toggle("bandera");
    }
}

function destaparCasilla(id) {

    if (minas.includes(id)) {
        minas.forEach(element => {
            document.getElementById(element).classList.add("bomba");
            derrota();
        });

    }else{
        destaparAutomatico(parseInt(id));
    }

}

function destaparAutomatico(id) {

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

        if (nfilas == 0 || ncolumnas == 0 || nminas == 0 || isNaN(nfilas) || isNaN(ncolumnas) || isNaN(nminas)) {
            document.getElementById("errorCampos").classList.add("errorCamposActivo");
            creaTablero = false;
        }else if (nminas > (nfilas/2) * (ncolumnas/2)) {
            document.getElementById("errorCampos").innerHTML = "El numero de minas introducido no es correcto, intentalo con un número menor"
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
        calcularMultiplos(nfilas, ncolumnas);
        totalCeldas = nfilas * ncolumnas;
        divDatosPartida.classList.add("hidden");
        crearTablero(nfilas, ncolumnas);
        rellenarMinas(nminas, nfilas, ncolumnas);
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

function juego() {
    
}

function derrota() {
    document.getElementById('derrota').style.display = "block";

}

function reset() {
    minas = new Array();
}