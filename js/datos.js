'use strict';

function inicio() {
    // var arrayImagenes = ['lagarto','papel','piedra','spot','tijera',]
    var UnoVsUno = document.querySelector('#UnoVsUno');
    var vsMaquina = document.querySelector('#vsMaquina');
    var contenedorImagenes = document.querySelector('#contenedorImagenes');
    var div = document.getElementsByTagName('div');
    var divTurno = document.querySelector('#divTurno');
    var ulUno = document.querySelector('#ulUno');
    var turno = 2;
    //para cuando escojas a la maquina como jugador
    var opcion;
    var puntoJugador1, puntoJugador2;
    //eventos------------------------------
    UnoVsUno.addEventListener('click', unoContraUno);
    vsMaquina.addEventListener('click', contraMaquina);
    //fin eventos--------------------------

    //funcion para 1 contra 1
    function unoContraUno() {
        contenedorImagenes.innerHTML = crearImagen();
        opcion = 1;
        aparecerDesaparecerDivTurno('1');
    }

    //funcion contra la maquina
    function contraMaquina() {
        contenedorImagenes.innerHTML = crearImagen();
        opcion = 2;
        aparecerDesaparecerDivTurno('1');
    }

    //funcion para crear las imagenes
    function crearImagen() {
        let plantilla =
        `<div id='div_0' class="dviImagenes">
            <img src="img/lagarto.PNG" alt="lagarto">
        </div>
        <div id='div_1' class="dviImagenes">
            <img src="img/papel.PNG" alt="papel">
        </div>
        <div id='div_2' class="dviImagenes">
            <img src="img/piedra.PNG" alt="piedra">
        </div>
        <div id='div_3' class="dviImagenes">
            <img src="img/spot.PNG" alt="spot">
        </div>
        <div id='div_4' class="dviImagenes">
            <img src="img/tijera.PNG" alt="tijera">
        </div>
        `;
        return plantilla;
    }

    //funcion para dar eventos a todos los divs de foto
    function asignacionEvento() {
        for (let i = 3; i < 8; i++) {
            div[i].addEventListener('click', eventoClickDiv)
        }
    }

    //funcion para remover eventos y no toquen cunado salga el mensaje del turno
    function removerEventos() {
        for (let i = 3; i < 8; i++) {
            div[i].removeEventListener('click', eventoClickDiv)
        }
    }

    //funcion para remover el evento del teclado
    function removerEventoTeclado(){
        window.removeEventListener('keydown', eventoTeclado);
    }
    //funcion cunado le damos click a los divs
    function eventoClickDiv() {
        // this.style.animationName = 'animacion1';
        eventoPorTurno(this);
    }

    //funcion para los eventos por turnos
    function eventoPorTurno(celda){
        celda.style.animationName = 'animacion1';
        let im = celda.getElementsByTagName('img');
        if (turno % 2 == 0) {
            aparecerDesaparecerDivTurno('2');
            puntoJugador1 = im[0].alt;
            console.log('Jugador 1: ' + puntoJugador1);   
        }
        else {           
            aparecerDesaparecerDivTurno('1');
            puntoJugador2 = im[0].alt;
            console.log('Jugador 1: ' + puntoJugador1);
            console.log('Jugador 2: ' + puntoJugador2);
            comprobarVictoria(puntoJugador1, puntoJugador2);
        }
        turno++;
    }

    //funcion para quitar el escalado
    function quitarEscalado(){
        for (let i = 3; i < 8; i++) {
            div[i].style.animationName = '';
        }
    }

    //funcion para generar un numero aleatorio para cuando el jugador sea la maquina
    function jugadorMaquina(){
        let numAleatorio = numeroAleatorio(3, 7);
        div[numAleatorio].style.animationName = 'animacion1';
        let im = div[numAleatorio].getElementsByTagName('img');
        puntoJugador2 = im[0].alt;
    }

    function numeroAleatorio(min, max) {
        return Math.round(Math.random() * (max - min) + min);
      }

    //funcino para los eventos del teclado
    function asignarEventoTeclado() {
        window.addEventListener('keydown', eventoTeclado);
    }

    //funcion cuando cotamos el teclado
    function eventoTeclado() {
        //a-s-d-f-g
        //65-83-68-70-71

        //h-j-k-l-ñ
        //72-74-75-76-192
        switchCase(event.keyCode,65,83,68,70,71);
        switchCase(event.keyCode,72,74,75,76,192);
    }

    //funcion para el swichcase
    function switchCase(codigo,opcion1,opcion2,opcion3,opcion4,opcion5){
        switch (codigo) {
            case opcion1:eventoPorTurno(div[3]);
                break;
            case opcion2:eventoPorTurno(div[4]);
                break;
            case opcion3:eventoPorTurno(div[5]);
                break;
            case opcion4:eventoPorTurno(div[6]);
                break;
            case opcion5:eventoPorTurno(div[7]);
                break;
            default:
                break;
        }
    }

    //funcion para hacer aparecer el div del turno
    function aparecerDesaparecerDivTurno(texto) {
        //removemos el evento del click y del teclado
        removerEventos();
        removerEventoTeclado();
        let intervalo = 0;
        let tiempo = setInterval(function () {
            if (intervalo < 2) {
                divTurno.innerHTML = `<h3>Turno del jugador ${texto}</h3>`
                divTurno.style.display = 'block';
            }
            else {
                divTurno.style.display = 'none';
                clearInterval(tiempo);
                quitarEscalado();
                //aqui entraria en un 1 vs 1
                if(opcion == 1){
                    asignacionEvento();
                    asignarEventoTeclado();
                }//aqui entraria si seria 1 vs la maquina
                else{
                   if(turno % 2 == 0){
                        asignacionEvento();
                        asignarEventoTeclado();
                 
                    }
                    else{
                        jugadorMaquina();                
                        console.log('Jugador 1: ' + puntoJugador1);
                        console.log('Jugador 2: ' + puntoJugador2);
                        comprobarVictoria(puntoJugador1, puntoJugador2);        
                        aparecerDesaparecerDivTurno('1');        
                        turno++;               
                    }                    
                }
            }
            intervalo++;
        }, 500)//medio segundo
    }

    //funcion para ver quien a ganado
    function comprobarVictoria(valor1, valor2) {        
        let li = document.createElement('li');
        li.innerHTML = comprobacion(valor1, valor2);
        ulUno.append(li);     
        // quitarEscalado();  
    }

    //funcon para comprobar quien a ganado
    function comprobacion(valor1, valor2) {
        var ganador;
        if (valor1 == 'tijera' && valor2 == 'lagarto' || valor1 == 'tijera' && valor2 == 'papel') {
            ganador = `Gana el jugador 1`;
        }
        else if (valor1 == 'papel' && valor2 == 'piedra' || valor1 == 'papel' && valor2 == 'spot') {
            ganador = `Gana el jugador 1`;
        }
        else if (valor1 == 'piedra' && valor2 == 'tijera' || valor1 == 'piedra' && valor2 == 'lagarto') {
            ganador = `Gana el jugador 1`;
        }
        else if (valor1 == 'lagarto' && valor2 == 'papel' || valor1 == 'lagarto' && valor2 == 'spot') {
            ganador = `Gana el jugador 1`;
        }
        else if (valor1 == 'spot' && valor2 == 'tijera' || valor1 == 'spot' && valor2 == 'piedra') {
            ganador = `Gana el jugador 1`;
        }
        else if(valor1 == valor2){
            ganador = `Empate`;
        }
        else {
            ganador = `Gana el jugador 2`;
        }
        return ganador;
    }
}