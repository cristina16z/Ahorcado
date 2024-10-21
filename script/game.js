
//OBJECTES
const word = document.getElementById("word");
const empezar = document.getElementById("empezar");
const imatge = document.getElementById("imatge");
const adivinar = document.getElementById("adivinar");
const nPoints = document.getElementById("nPoints");
const totalGames = document.getElementById("totalGames");
const winGames = document.getElementById("winGames");
const gameMaxPoints = document.getElementById("gameMaxPoints");

const MAX_INTENTS_JUGADES = 10;
const MAX_IMG = 11;

let wordSecret;
let contador = 0;
let paraulaActual = [];
let nlletra;

let puntscontador_lletra = 0;
let contador_totalPartidas = 0;
let contador_wins = 0;
let puntsAnteriors = 0;

let racha = false;
let contador_racha = 0;
let puntsActuals = 0;
let puntsGuanyats = 0;




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
    puntsActuals = 0;
    puntsGuanyats = 0;
    contador_racha = 0; 
    contador_lletra = 0;
    racha = false;
    nPoints.textContent = puntsActuals;
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

        if(racha){
            contador_racha++;
        }else{
            contador_racha = 1;
            racha = true;
        }

        puntsGuanyats = contador_racha*contador_lletra;
        puntsActuals = puntsGuanyats + puntsActuals;
        nPoints.textContent = puntsActuals;
       


        mostrarParaula();
        console.log('existeix');


        if (!paraulaActual.includes('_')) {
            win()
        }
        contador++;


    }else{

        console.log('no existeix');
        contador++;
        puntsActuals-= 1;
        racha = false;
        contador_racha = 1;

        //Para que no sea negativo la puntuación
        if(puntsActuals > 0){
            nPoints.textContent = puntsActuals;
        }else{
            nPoints.textContent = 0;
            puntsActuals = 0;
        }
        

        //Canviar d'imatge, cada cop que fallis fins el màxim de l'ultima imatge
        if( contador < MAX_IMG){
            imatge.src = "imatges/penjat_" + contador + ".jpg";
            console.log(lletraJugada + contador)
        }

        //Si arriba al máx número d'intents, que son 10, PERDS
        if (contador == MAX_INTENTS_JUGADES){
            lose();
        }
    }
}


//Deshabilitamos la letra seleccionada para volver a cambiarle al color deshabilitado
function deshabilitarLletra(lletra){
    lletra.disabled = true;
}


//QUAN GUANYES
function win(){
    adivinar.style.backgroundColor = 'rgb(220, 250, 166)';
    contador_wins++;
    winGames.textContent = contador_wins;
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

//Comenzamos con los botones del abecedario deshabilitados
deshabilitarButton();



/********************************************* ESTADÍSTIQUES ***********************************/

function totalPartides(){
    contador_totalPartidas++;
    totalGames.textContent = contador_totalPartidas;
}


function millorPuntuacio(){
    if(puntsAnteriors < puntsActuals){
        puntsAnteriors = puntsActuals;
        let fecha = new Date().toLocaleDateString('es-ES');
        let hora = new Date().toLocaleTimeString('es-ES');
        gameMaxPoints.textContent = `${fecha} ${hora} - ${puntsAnteriors} punts`;
    }
}