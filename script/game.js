
//OBJECTES
const word = document.getElementById("word");
const start = document.getElementById("start");
const imatge = document.getElementById("imatge");
const adivinar = document.getElementById("adivinar");

let wordSecret;
let contador = 0;
let paraulaActual = [];



/************************************************  BUTTON COMENÇAR PARTIDA ******************************/


function startGame(){
    wordSecret = word.value.toUpperCase();

    let containsNumber = false;
    let wordSecretValid;


    //añadir check de no pot contenir espais
    for(let i = 0; i<wordSecret.length; i++){
        if(!isNaN(wordSecret[i]) && wordSecret[i] !== ' '){
            containsNumber = true;  
            break;
        }
    }



    if(wordSecret){

        if(containsNumber){
            alert('La paraula no pot contenir números');
            word.value = "";
            containsNumber = false;
            return;
        }else if(wordSecret.length >3){
            wordSecretValid = wordSecret.split("")

            console.log(wordSecret)
            console.log( wordSecretValid )

            word.disabled = true;
            start.disabled = true;
        }else{ 
            alert("Has d'introduir una paraula de minim 4 paraules");
        }
    
    }else{
        alert("No has introduit una paraula");
    }



    habilitarButton();

    actualitzarParaulaInicial();
    mostrarParaula();
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

}


function mostrarParaula(){
    adivinar.textContent = paraulaActual.toString().replaceAll(",", " ");
    console.log(paraulaActual, paraulaActual.toString());
}





/********************************************************  ABECEDARI  ******************************/

function jugarLletra(lletra){
    
    let lletraJugada = lletra.textContent;


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

    }else{
        console.log('no existeix');
    }

    contador++;
    imatge.src = "imatges/penjat_" + contador + ".jpg";
    console.log(lletraJugada + contador)
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