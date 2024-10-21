
//OBJECTES
const word = document.getElementById("word");
const empezar = document.getElementById("empezar");
const imatge = document.getElementById("imatge");
const adivinar = document.getElementById("adivinar");
//Jugador1
const estadisticas = document.getElementById("estadisticas");
const nPoints = document.getElementById("nPoints");
const totalGames = document.getElementById("totalGames");
const winGames = document.getElementById("winGames");
const gameMaxPoints = document.getElementById("gameMaxPoints");
//Jugador2
const estadisticas2 = document.getElementById("estadisticas2");
const nPoints2 = document.getElementById("nPoints2");
const totalGames2 = document.getElementById("totalGames2");
const winGames2 = document.getElementById("winGames2");
const gameMaxPoints2 = document.getElementById("gameMaxPoints2");

const MAX_INTENTS_JUGADES = 10;
const MAX_IMG = 11;

let wordSecret;
let contador = 0;
let paraulaActual = [];

let contador_totalPartidas = 0;
let contador_wins = [0, 0];
let puntsAnteriors = [0,0];
let racha = false;
let contador_racha = 1;
let puntsGuanyats = 0;
let jugador = 1; //para el jugador1 = 1, y para el jugador2 = 0
let puntsJugadors = [0,0];


/************************************************  BUTTON COMENÇAR PARTIDA ******************************/


function startGame(){
    wordSecret = word.value.toUpperCase();

    reiniciarJoc(); 
   
    let containsNumber = false;
    let wordSecretValid;


    //añadir check de no pot contenir espais
    for(let i = 0; i<wordSecret.length; i++){
        if(!isNaN(wordSecret[i]) && wordSecret[i] !== ""){
            containsNumber = true;  
            break;
        }
    }



    if(wordSecret){

        if(containsNumber){
            alert('La paraula no pot contenir números o espais en blanc');
            word.value = "";
            containsNumber = false;
            return;
        }else if(wordSecret.length >3){
            wordSecretValid = wordSecret.split("")

            console.log(wordSecret)
            console.log( wordSecretValid )

            word.disabled = true;
            empezar.disabled = true;
        }else{ 
            alert("La paraula ha de contenir més de 3 caràcters");
        }
    
    }else{
        alert("Has d'afegir una paraula per poder començar a jugar");
    }

    //comença el torn al jugador 1
    estadisticas.style.backgroundColor = "rgb(83, 188, 148)";
    estadisticas2.style.backgroundColor = "rgb(188, 83, 113)";

    totalPartides();
    habilitarButton();
    actualitzarParaulaInicial();
    mostrarParaula();
    
}


//Resetejar els valors a l'hora de començar una nova partida (paraula, imatges, lletres,..)
function reiniciarJoc(){
    paraulaActual = [];
    adivinar.textContent = "";
    adivinar.style.backgroundColor = "";
    contador = 0;
    imatge.src = "imatges/penjat_" + contador + ".jpg";

    //estadístiques
    puntsGuanyats = 0;
    contador_racha = 1; 
    contador_lletra = 0;
    puntsJugadors = [0,0];
    racha = false;
    //empieza en el jugador 1
    jugador = 1; 
    actualizarPuntuaciones();
}


/*BUTTON EYE */
function encriptacio(){

    if(word.type === "password"){
        word.type="text";
    }else{
        word.type="password";
    }
    console.log(word);
}




/*****************************************************  Paraula anònima ***********************************/


function actualitzarParaulaInicial(){
    for(let i=0; i<wordSecret.length; i++){
        paraulaActual.push("_");
    }

    //Com començo la partida, afegeixo espai entre les lletres per al joc.
    adivinar.style.letterSpacing = '20px';
}


function mostrarParaula(){
    adivinar.textContent = paraulaActual.toString().replaceAll(",", " ");
    console.log(paraulaActual, paraulaActual.toString());
}





/********************************************************  ABECEDARI  ******************************/

function jugarLletra(lletra){
    
    let lletraJugada = lletra.textContent;

    //deshabilitamos ése mismo botón/letra
    deshabilitarLletra(lletra);

    const aux = wordSecret.includes(lletraJugada);
   /* const aux2 = wordSecret.indexOf(lletraJugada);*/

   
    if(aux){
        contador_lletra = 0;

        //iteració per buscar la lletra i canviar la paraula actual per la posició en la que la troba
        for(let i = 0; i< wordSecret.length; i++){
            if(wordSecret[i] === lletraJugada){
                paraulaActual[i] = lletraJugada;
                contador_lletra++;
                
            }
        }

        
        
        if (racha) {
            contador_racha++; // Si ya estamos en racha, la aumentamos
        } else {
            contador_racha = 1; // Si es el primer acierto, empezamos con una racha de 1
            racha = true; // La racha sigue activa
        }

       


        mostrarParaula();

        puntsGuanyats = contador_racha*contador_lletra;
    
        puntsJugadors[jugador] += puntsGuanyats;
        actualizarPuntuaciones();
       
        console.log('existeix');
        

        if (!paraulaActual.includes('_')) {
            win()
        }
        contador++;


    }else{

        console.log('no existeix');
        contador++;
        puntsJugadors[jugador] -= 1;
        racha = false;
        contador_racha = 1;

        //Para que no sea negativo la puntuación
        if ( puntsJugadors[jugador]  < 0) {
            puntsJugadors[jugador]  = 0;
        }

        actualizarPuntuaciones();
        
        
        //Canviar d'imatge, cada cop que fallis fins el màxim de l'ultima imatge
        if( contador < MAX_IMG){
            imatge.src = "imatges/penjat_" + contador + ".jpg";
            console.log(lletraJugada + contador)
        }

        //Si arriba al máx número d'intents, que son 10, PERDS
        if (contador == MAX_INTENTS_JUGADES){
            lose();
        }


        changePlayer();
    }
}


//Deshabilitamos la letra seleccionada para volver a cambiarle al color deshabilitado
function deshabilitarLletra(lletra){
    lletra.disabled = true;
}


//QUAN GUANYES
function win(){
    adivinar.style.backgroundColor = 'rgb(220, 250, 166)';
    guanyador();
    millorPuntuacio();
    habilitarPlayNewGame();
}


//QUAN PERDS
function lose(){
    adivinar.style.backgroundColor = 'red';
    habilitarPlayNewGame();
}


//Habilitar input & button per Começar una nova partida
function habilitarPlayNewGame(){
    
    empezar.disabled = false;
    word.value = "";
    word.disabled = false;
    deshabilitarButton();
}



function deshabilitarButton(){
    for(let i = 1; i<27; i++){
        let literal = "lletra_" + i;
        const botoA = document.getElementById(literal);
        botoA.disabled = true;
    }
}


function habilitarButton(){
    for(let i = 1; i<27; i++){
        let literal = "lletra_" + i;
        const botoA = document.getElementById(literal);
        botoA.disabled = false;
    }
}

deshabilitarButton();



/********************************************* ESTADÍSTIQUES ***********************************/

function totalPartides(){
    contador_totalPartidas++;
    totalGames.textContent = contador_totalPartidas;
    totalGames2.textContent = contador_totalPartidas;
}


function millorPuntuacio(){

    let fecha = new Date().toLocaleDateString('es-ES');
    let hora = new Date().toLocaleTimeString('es-ES');
    
    if( puntsAnteriors[0] < puntsJugadors[0]){
        puntsAnteriors[0] =  puntsJugadors[0];

        gameMaxPoints2.textContent = `${fecha} ${hora} - ${puntsAnteriors[0]} punts`;

    } 

    if( puntsAnteriors[1] < puntsJugadors[1]){
        puntsAnteriors[1] =  puntsJugadors[1];
 
        gameMaxPoints.textContent = `${fecha} ${hora} - ${puntsAnteriors[1]} punts`;
    }
}


function guanyador(){

    if (puntsJugadors[0] > puntsJugadors[1]) {
        //Ha guanyat el jugador 2
        contador_wins[0]++;
        winGames2.textContent = contador_wins[0]; 
    } else {
         //Ha guanyat el jugador 1
         contador_wins[1]++; 
         winGames.textContent = contador_wins[1]; 
    }


    //Mostra el Guanyador amb l'alert després de que s'executi la resta de coses de win
    setTimeout(() => {
        if (puntsJugadors[0] > puntsJugadors[1]) {
            alert("Ha guanyat el Jugador 2");
        } else {
            alert("Ha guanyat el Jugador 1");
        }
    }, 100);
}


function actualizarPuntuaciones(){
    nPoints.textContent = puntsJugadors[1];
    nPoints2.textContent = puntsJugadors[0];
}

/*************************************** MULTIJUGADOR ************************************/

function changePlayer(){
    if (jugador === 1){
        //cambia el torn al jugador 2
        jugador = 0; 
        estadisticas2.style.backgroundColor = "rgb(83, 188, 148)";
        estadisticas.style.backgroundColor = "rgb(188, 83, 113)";
      
    }else{
        //cambia el torn al jugador 1
        jugador = 1; 
        estadisticas.style.backgroundColor = "rgb(83, 188, 148)";
        estadisticas2.style.backgroundColor = "rgb(188, 83, 113)";
        
    }

}