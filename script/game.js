
//OBJECTES
const word = document.getElementById("word");
const empezar = document.getElementById("empezar");
const imatge = document.getElementById("imatge");
const adivinar = document.getElementById("adivinar");
const MAX_INTENTS_JUGADES = 10;
const MAX_IMG = 11;

let wordSecret;
let contador = 0;
let paraulaActual = [];
let nlletra;


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
        //iteració per buscar la lletra i canviar la paraula actual per la posició en la que la troba
        for(let i = 0; i< wordSecret.length; i++){
            if(wordSecret[i] === lletraJugada){
                paraulaActual[i] = lletraJugada;
            }
        }
        mostrarParaula();
        console.log('existeix');

        if (!paraulaActual.includes('_')) {
            win()
        }


    }else{

        console.log('no existeix');
        contador++;

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