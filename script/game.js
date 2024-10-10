
//OBJECTES
const word = document.getElementById("word");
const start = document.getElementById("start");



function startGame(){
    let wordSecret = word.value;


    //añadir check de no poner números 

    if(wordSecret){

        if(wordSecret.length >3){
            console.log(wordSecret)
            console.log(wordSecret.split(""))

            word.disabled = true;
            start.disabled = true;
        }else{ 
            alert("Has d'introduir una paraula de minim 4 paraules");
        }
    
    }else{
       
        alert("No has introduit una paraula");
    }

}


function encriptacio(){

    if(word.type === "password"){
        word.type="text";
    }else{
        word.type="password";
    }
    console.log(word);
}