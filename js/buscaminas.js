// Autor : Adrián García

let hamburgerMenu = document.getElementById('hamburger-menu');
let nav = document.getElementById('nav');
let divJuego = document.getElementById('divJuego');
let tablero = document.getElementById('tablero');
let divDatosPartida = document.getElementById('datosPartida');
let divInstrucciones = document.getElementById('instrucciones');
let divFormulario = document.getElementById('divFormulario');
let imagenSonic = document.getElementById('sonic');
let btnPantallaInicio = document.getElementById('btnPantallaInicio');
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
let tiempo = document.getElementById('tiempo');
let minutosDiv = document.getElementById('minutos');
let segundosDiv = document.getElementById('segundos');
let segundos = 0;
let minutos = 0;
let carita = document.getElementById('carita');
let contadorMinas = 0;
let contadorMinasDiv = document.getElementById('contadorMinas');
let cronometro;
let explosion = document.getElementById('explosion');
let explosionGif = document.getElementById('explosionGif');
let celdasADestapar = new Array();

botonStart.addEventListener("click", iniciarPartida);
btnPantallaInicio.addEventListener("click", volver);

// Animacion de megaman

function empezarPartida() {

    botonStart.classList.add("noHover");

    if (window.getComputedStyle(megaman, null).display === "none") {
        calcularMultiplos(nfilas, ncolumnas);
        totalCeldas = nfilas * ncolumnas;
        divDatosPartida.style.display = "none";
        divInstrucciones.style.display = "none";
        crearTablero(nfilas, ncolumnas);
        rellenarMinas(nminas, nfilas, ncolumnas);
        divJuego.style.display = "flex";
        iniciarCrono();
    }else{
        megaman.classList.add("megamanActive");
        setTimeout(function() {
            billBala.classList.add("billBalaActive");
        }, 500)
        setTimeout(function() {    
            calcularMultiplos(nfilas, ncolumnas);
            totalCeldas = nfilas * ncolumnas;
            divDatosPartida.style.display = "none";
            divInstrucciones.style.display = "none";
            crearTablero(nfilas, ncolumnas);
            rellenarMinas(nminas, nfilas, ncolumnas);
            iniciarCrono();
            divJuego.style.display = "flex";
        }, 1000);
    }

    contadorMinas = nminas;
    imagenSonic.src="../img/sonic-pointing-static.gif";
    contadorMinasDiv.innerHTML = contadorMinas;
    carita.addEventListener('click', resetTablero);
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
        divString += "<div class='fila'>";
        for (let j = 0; j < columnas; j++) {
            divString += "<div class='casilla' id='" + contador + "'></div>";
            contador++;
        }
        divString += "</div>";
    }
    tablero.innerHTML = divString;

    
    let casillas = document.getElementsByClassName("casilla");

    for (let casilla of casillas) {
         casilla.addEventListener("click", function() {
                let idParseado = parseInt(casilla.id);
                destaparCasilla(idParseado);
            });
        casilla.addEventListener("contextmenu", function(event) {
                event.preventDefault();
                let idParseado = parseInt(casilla.id);
                ponerBanderita(idParseado);
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
}

function ponerBanderita(id) {

    if (contadorMinas === 0 && !document.getElementById(id).classList.contains("bandera")) {
        return;
    }else if (!document.getElementById(id).hasChildNodes() && !document.getElementById(id).classList.contains("celdaLibre")) {
        document.getElementById(id).classList.toggle("bandera");
        if (document.getElementById(id).classList.contains("bandera")) {
            contadorMinas--;
        }else{
            contadorMinas++;
        }
        contadorMinasDiv.innerHTML = contadorMinas;
    }
}

function destaparCasilla(id) {

    if (!document.getElementById(id).classList.contains("bandera") && minas.includes(id.toString())) {
        minas.forEach(element => {
            document.getElementById(element).classList.add("bomba");
            derrota();
        });
        document.getElementById(id).classList.add("bombaRoja");

    }else if (/*!document.getElementById(id).hasChildNodes() && */!document.getElementById(id).classList.contains("celdaLibre") && !document.getElementById(id).classList.contains("bandera")) {

        try {
            if (document.getElementById(id).hasChildNodes()) {

                celdasADestapar.push(id);

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


                if (up && left) {
                    celdasADestapar.push(id + 1);
                    celdasADestapar.push(id + ncolumnas + 1);
                    celdasADestapar.push(id + ncolumnas);
                }else if (up && right) {
                    celdasADestapar.push(id - 1);
                    celdasADestapar.push(id + ncolumnas - 1);
                    celdasADestapar.push(id + ncolumnas);
                }else if (down && left) {
                    celdasADestapar.push(id - ncolumnas);
                    celdasADestapar.push(id - ncolumnas + 1);
                    celdasADestapar.push(id + 1);
                }else if (down && right) {
                    celdasADestapar.push(id - ncolumnas);
                    celdasADestapar.push(id - ncolumnas - 1);
                    celdasADestapar.push(id - 1);
                
                }else if (up) {
                    celdasADestapar.push(id - 1);
                    celdasADestapar.push(id + ncolumnas - 1);
                    celdasADestapar.push(id + ncolumnas);
                    celdasADestapar.push(id + ncolumnas + 1);
                    celdasADestapar.push(id + 1);
                }else if (down) {
                    celdasADestapar.push(id - 1);
                    celdasADestapar.push(id - ncolumnas - 1);
                    celdasADestapar.push(id - ncolumnas);
                    celdasADestapar.push(id - ncolumnas + 1);
                    celdasADestapar.push(id + 1);
                }else if (left) {
                    celdasADestapar.push(id - ncolumnas);
                    celdasADestapar.push(id - ncolumnas + 1);
                    celdasADestapar.push(id + 1);
                    celdasADestapar.push(id + ncolumnas + 1);
                    celdasADestapar.push(id + ncolumnas);
                }else if (right) {
                    celdasADestapar.push(id - ncolumnas);
                    celdasADestapar.push(id - ncolumnas - 1);
                    celdasADestapar.push(id - 1);
                    celdasADestapar.push(id + ncolumnas - 1);
                    celdasADestapar.push(id + ncolumnas);
                }else{
                    celdasADestapar.push(id - ncolumnas);
                    celdasADestapar.push(id - ncolumnas + 1);
                    celdasADestapar.push(id + 1);
                    celdasADestapar.push(id + ncolumnas + 1);
                    celdasADestapar.push(id + ncolumnas);
                    celdasADestapar.push(id + ncolumnas - 1);
                    celdasADestapar.push(id - 1);
                    celdasADestapar.push(id - ncolumnas - 1);
                }

            }

            destaparAutomatico(id); 
        }catch (e) {
            
        }

    }
}

function destaparAutomatico(id) {

    if (id > totalCeldas || id < 0) {
        return;
    }

    if (!document.getElementById(id).classList.contains("bandera") && minas.includes(id.toString())) {
        minas.forEach(element => {
            document.getElementById(element).classList.add("bomba");
            derrota();
        });
        document.getElementById(id).classList.add("bombaRoja");
        return;

    }else if (document.getElementById(id).classList.contains("bandera")) {
        console.log(id + " tiene bandera, la salto");
        celdasADestapar.shift();
        destaparAutomatico(celdasADestapar[0]);   
        
    }else{
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
    
            celdasBlancas.forEach(celda => {
                if (!celdasBlancasUsadas.includes(celda)) {
                    celdasBlancasUsadas.push(celda);
                }
            });
        
            if (celdasBlancas.length != 0) {
                celdasBlancas.shift();
                destaparAutomatico(celdasBlancas[0]);
            }
        }

        if (celdasADestapar.length !== 0) {
            let celda = celdasADestapar[0];
            console.log(celdasADestapar);
            console.log("destapo " + celda);
            if (!document.getElementById(celda).classList.contains("bandera")) {
                celdasADestapar.shift();
            }
            destaparAutomatico(celda);   
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
        document.getElementById(id).firstChild.classList.add("noHover");
        document.getElementById(id).classList.add("celdaConNumero");
    }

    if (document.getElementById(id).classList.contains("bandera")) {
        document.getElementById(id).classList.remove("bandera");
        contadorMinas++;
        contadorMinasDiv.innerHTML = contadorMinas;
    }

    if (!celdasExpuestas.includes(id)) {
        celdasExpuestas.push(id);
        celdasLiberadas++;
        console.log(celdasLiberadas);
    }

    if (celdasLiberadas >= (totalCeldas - nminas)) {
        victoria();
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

    multiplos = new Array();

    let multiplo = 0;
    multiplos.push(multiplo);

    for (let i = 0; i < filas; i++) {
        multiplo += columnas;
        multiplos.push(multiplo);
    }
}

function victoria() {
    document.getElementById('victoria').style.display = "block";
    minas.forEach(element => {
        document.getElementById(element).classList.add("bandera");
    });
    tablero.classList.add("noHover");
    carita.style.backgroundPosition = "0px -50px";
    clearInterval(cronometro);
}

function derrota() {
    document.getElementById('derrota').style.display = "block";
    tablero.classList.add("noHover");
    carita.style.backgroundPosition = "-55px -50px";
    clearInterval(cronometro);
    explosionGif.src = "../img/explosion.gif"+"?a="+Math.random();
    explosionGif.style.width = tablero.offsetWidth + "px";
    explosionGif.style.height = tablero.offsetHeight + "px";
    explosion.style.display = "block";
    setTimeout(function() {
        explosion.style.display = "none";
    }, 1000);
}

function resetVariables() {
    if (tablero.classList.contains('noHover')) {
        tablero.classList.remove('noHover');
    }

    minutos = 0;
    segundos = 0;
    clearInterval(cronometro);
    celdasBlancas = new Array();
    celdasLiberadas = 0;
    celdasExpuestas = new Array();
    celdasBlancasUsadas = new Array();
    minas = new Array();
    celdasADestapar = new Array();
    carita.style.backgroundPosition = "0px 0px";
    document.getElementById('derrota').style.display = "none";
    document.getElementById('victoria').style.display = "none";
}

function resetTablero() {
    resetVariables();
    
    minutosDiv.innerHTML = "";
    iniciarCrono();
    rellenarMinas(nminas, nfilas, ncolumnas);
    
    let casillas = document.getElementsByClassName("casilla");
    contadorMinas = nminas;
    contadorMinasDiv.innerHTML = contadorMinas;

    for (let casilla of casillas) {
        casilla.innerHTML = "";
        casilla.className = "";
        casilla.classList.add("casilla");
    }
}

function volver() {
    resetVariables();
    imagenSonic.src="../img/sonic-pointing.gif";
    divJuego.style.display = "none";
    divDatosPartida.style.display = "block";
    divInstrucciones.style.display = "block";
    botonStart.classList.remove("noHover");
    billBala.classList.remove("billBalaActive");
    megaman.classList.remove("megamanActive");
}

function iniciarCrono() {
    minutosDiv.innerHTML = minutos + " :";
    segundosDiv.innerHTML = "0" + segundos;
    cronometro = setInterval(function(){
        segundos++;

        if (segundos === 60) {
            minutos++;
            segundos = 0;
        }

        minutosDiv.innerHTML = minutos + " :";

        if (segundos < 10) {
            segundosDiv.innerHTML = "0" + segundos;
        }else{
            segundosDiv.innerHTML = segundos;    
        }
    }, 1000);
}