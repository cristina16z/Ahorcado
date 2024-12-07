
//OBJECTES
const word = document.getElementById("word");
const empezar = document.getElementById("empezar");
const imatge = document.getElementById("imatge");
const adivinar = document.getElementById("adivinar");
const nPoints = document.getElementById("nPoints");
const totalGames = document.getElementById("totalGames");
const winGames = document.getElementById("winGames");
const gameMaxPoints = document.getElementById("gameMaxPoints");

const seccioButtons = document.querySelector(".abecedari")

const MAX_INTENTS_JUGADES = 10;
const MAX_IMG = 11;


const game = {

    "wordSecret":"",
    "contador": 0,
    "paraulaActual": [],
    "nlletra": 0,
    
    "contador_lletra": 0,
    "contador_totalPartidas": 0,
    "contador_wins": 0,
    "puntsAnteriors":0,
    
    "racha": false,
    "contador_racha": 0,
    "puntsActuals":0,
    "puntsGuanyats": 0,

    "containsNumber": false,
    "wordSecretValid":"",

    "fecha": new Date(),
    "hora": new Date(),

    
    "setTotalPartides": function(){
        this.contador_totalPartidas++;
        totalGames.textContent = this.contador_totalPartidas;
    }
    

};

   
    let alfabet = "";

    const loadButtons = function(){
        
        
        fetch('http://127.0.0.1:5500/script/alfabet.json')
        .then(function(response){
            // response.status
            return response.json();
        })
        .then(function(data){
            alfabet = data.alfabet;
           
            for(let i = 0; i< alfabet.length; i++){
                const boto = document.createElement("button");
                boto.className ="button-game";
                boto.textContent = alfabet[i];
                boto.addEventListener("click", () => jugarLletra(boto));
                seccioButtons.appendChild(boto);
            }
        });
    }

    loadButtons();


/************************************************  BUTTON COMENÇAR PARTIDA ******************************/


function startGame(){
    game.wordSecret = word.value.toUpperCase();

    reiniciarJoc(); 
   
    game.containsNumber = false;

    //añadir check de no pot contenir espais
    for(let i = 0; i<game.wordSecret.length; i++){
        if(!isNaN(game.wordSecret[i]) && game.wordSecret[i] !== ""){
            game.containsNumber = true;  
            break;
        }
    }



    if(game.wordSecret){

        if(game.containsNumber){
            alert('La paraula no pot contenir números o espais en blanc');
            word.value = "";
            game.containsNumber = false;
            return;
        }else if(game.wordSecret.length >3){
            game.wordSecretValid = game.wordSecret.split("")

            console.log(game.wordSecret)
            console.log( game.wordSecretValid )

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
    game.paraulaActual = [];
    adivinar.textContent = "";
    adivinar.style.backgroundColor = "";
    game.contador = 0;
    imatge.src = "imatges/penjat_" +  game.contador + ".jpg";

    //estadístiques
    game.puntsActuals = 0;
    game.puntsGuanyats = 0;
    game.contador_racha = 0; 
    game.contador_lletra = 0;
    game.racha = false;
    nPoints.textContent = game.puntsActuals;
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
    for(let i=0; i<game.wordSecret.length; i++){
        game.paraulaActual.push("_");
    }

    //Com començo la partida, afegeixo espai entre les lletres per al joc.
    adivinar.style.letterSpacing = '20px';
}


function mostrarParaula(){
    adivinar.textContent = game.paraulaActual.toString().replaceAll(",", " ");
    console.log(game.paraulaActual, game.paraulaActual.toString());
}




/********************************************************  ABECEDARI  ******************************/


function jugarLletra(lletra){
    
    game.lletraJugada = lletra.textContent;

    //deshabilitamos ése mismo botón/letra
    deshabilitarLletra(lletra);

    const aux = game.wordSecret.includes(game.lletraJugada);
   /* const aux2 = wordSecret.indexOf(lletraJugada);*/

   
    if(aux){
        game.contador_lletra = 0;

        //iteració per buscar la lletra i canviar la paraula actual per la posició en la que la troba
        for(let i = 0; i< game.wordSecret.length; i++){
            if(game.wordSecret[i] === game.lletraJugada){
                game.paraulaActual[i] = game.lletraJugada;
                game.contador_lletra++;
                
            }
        }

        if(game.racha){
            game.contador_racha++;
        }else{
            game.contador_racha = 1;
            game.racha = true;
        }

        game.puntsGuanyats = game.contador_racha*game.contador_lletra;
        game.puntsActuals = game.puntsGuanyats + game.puntsActuals;
        nPoints.textContent = game.puntsActuals;
       


        mostrarParaula();
        console.log('existeix');


        if (!game.paraulaActual.includes('_')) {
            win()
        }


    }else{

        console.log('no existeix');
        game.contador++;
        game.puntsActuals-= 1;
        game.racha = false;
        game.contador_racha = 1;

        //Para que no sea negativo la puntuación
        if(game.puntsActuals > 0){
            nPoints.textContent = game.puntsActuals;
        }else{
            nPoints.textContent = 0;
            game.puntsActuals = 0;
        }
        

        //Canviar d'imatge, cada cop que fallis fins el màxim de l'ultima imatge
        if( game.contador < MAX_IMG){
            imatge.src = "imatges/penjat_" + game.contador + ".jpg";
            console.log(game.lletraJugada + game.contador)
        }

        //Si arriba al máx número d'intents, que son 10, PERDS
        if (game.contador == MAX_INTENTS_JUGADES){
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
    game.contador_wins++;
    winGames.textContent = game.contador_wins;
    millorPuntuacio();
    habilitarPlayNewGame();
    //totalPartides();
    game.setTotalPartides();
}


//QUAN PERDS
function lose(){
    adivinar.style.backgroundColor = 'red';
    //cambiar los _ por la palabra secreta completa
    adivinar.textContent = game.wordSecret.split('').join(' ');
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
    // for(let i = 1; i<27; i++){
    //     let literal = "lletra_" + i;
    //     const botoA = document.getElementById(literal);
    //     botoA.disabled = true;
    // }
}


function habilitarButton(){
    // for(let i = 1; i<27; i++){
    //     let literal = "lletra_" + i;
    //     const botoA = document.getElementById(literal);
    //     botoA.disabled = false;
    // }

    const botones = seccioButtons.querySelectorAll(".button-game");
    botones.forEach((boto) => {
        boto.disabled = false; 
    });
}

//Comenzamos con los botones del abecedario deshabilitados
deshabilitarButton();



/********************************************* ESTADÍSTIQUES ***********************************/

/*
function totalPartides(){
    game.contador_totalPartidas++;
    totalGames.textContent = game.contador_totalPartidas;
}*/


function millorPuntuacio(){
    if(game.puntsAnteriors < game.puntsActuals){
        game.puntsAnteriors = game.puntsActuals;
        game.fecha = new Date().toLocaleDateString('es-ES');
        game.hora = new Date().toLocaleTimeString('es-ES')
        gameMaxPoints.textContent = `${game.fecha} ${game.hora} - ${game.puntsAnteriors} punts`;
    }
}