var cpt = 0;
var progressBarLength = 4;
var progressBar = document.querySelector(".progress-bar");
var btnAchat = document.querySelector(".btn-achat");
var red = 255;
var blue = 0;
var green = 0;
var isPicked = 0;
var nbTirages = 0;
var logPseudo = "";
var logPwd = "";
var logPwdConfirmation ="";
var sDrop = 0;
var ssDrop = 0;
var cardsOwned = [];
var sCardsOwned = [];
var ssCardsOwned = [];

var itemsCollection = {};
var reveal = false;

console.log("hello world le programme");
////// Change la couleur de l'ombre tout seul (comme un grand)
window.i = 0;
setInterval(() => {
    window.i += 1;
    document.querySelector(".game").style.boxShadow = "0 0 75px "+autoHue();
    document.querySelector(".btn-achat").style.boxShadow = "0 0 75px "+autoHue();
    document.querySelector(".collectable-text").style.WebkitTextStrokeColor = autoHue();
    document.querySelector(".collectable-desc").style.WebkitTextStrokeColor = autoHue();
}, 200);
//////
document.querySelector(".game").onclick = function(){
    if(this.style.cursor != "wait"){
        increment()
    }
};
document.querySelector("body").onclick = function(){
    if (reveal == true){
        pickACard(1);
    }
};
document.querySelectorAll(".inventaire-item").forEach(element => {
    element.addEventListener("mouseover", function () {
        if (document.querySelector("#tab-inventaire-0").ariaSelected == "true"){
            displayInfos(element.id.split("-")[1]);
        } else if (document.querySelector("#tab-inventaire-1").ariaSelected == "true"){
            displayInfos(parseInt(element.id.split("-")[1])+24);
        }
    });
});
document.querySelector("#achat-picks-up").onclick = function(){achatPicksUp()};
document.querySelector("#tab-shop-0").onclick = function(){tabFenetre(0,"shop")};
document.querySelector("#tab-shop-1").onclick = function(){tabFenetre(1,"shop")};
document.querySelector("#tab-shop-2").onclick = function(){tabFenetre(2,"shop")};
document.querySelector("#tab-inventaire-0").onclick = function(){tabFenetre(0,"inventaire"); afficherItems(1)};
document.querySelector("#tab-inventaire-1").onclick = function(){tabFenetre(1,"inventaire"); afficherItems(2);};
document.querySelector("#tab-inventaire-2").onclick = function(){tabFenetre(2,"inventaire")};
document.querySelector("#shop-close").onclick = function () {fermerFenetre("shop");};
document.querySelector("#ok-shop").onclick = function () {fermerFenetre("shop");};
document.querySelector("#inventaire-close").onclick = function () {fermerFenetre("inventaire");};
document.querySelector("#ok-inventaire").onclick = function () {fermerFenetre("inventaire");};
document.querySelector(".btn-achat").onclick = function(){tirage()};
document.querySelector(".picked-card-container").onclick = function(){pickACard()};
// document.querySelector("#collection").onclick = function(){collection()};
document.querySelector("#shop-button").onclick = function(){afficherFenetre("shop")};
document.querySelector("#inventaire-button").onclick = function(){afficherFenetre("inventaire"); tabFenetre(0, "inventaire"); afficherItems(1)};


////// rompiche
function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}


async function increment(){
    cpt+=1;
    if(cpt == 1){
        document.querySelector(".btn-achat").innerHTML = cpt + " Pouet";
    } else {
        document.querySelector(".btn-achat").innerHTML = cpt + " Pouets";
    }
    document.querySelector(".btn-achat").style.transition = "0s";
    document.querySelector(".btn-achat").style.fontSize = "50px";
    await sleep(100);
    document.querySelector(".btn-achat").style.transition = "0.3s";
    document.querySelector(".btn-achat").style.fontSize = "30px";
    savePouet();
}

(function( d ) {
    'use strict';
     var count = 0,
         audio = d.getElementById( 'audioP' ).getElementsByTagName( 'audio' );
     d.querySelector( '.game' ).addEventListener( 'click',
        function() {
            audio[ count].play();
            count ++;
       if ( count > 14 ) {
            count = 0; 
           }          
          }, false );
 }( document ));

async function autoStyleImage(){
    var heightImg = 60;
    document.querySelector(".clicker").style.height = heightImg+"%";
    await sleep(20);
    document.querySelector(".clicker").style.height = "70%";
}

// change la couleur d'un element en suivant un cycle rgb complet
function autoHue(){
    if(red == 255 && green < 255 && blue == 0){
        green += 17;
    } else if(red > 0 && green >= 255 && blue == 0){
        red -= 17;
    } else if(red == 0 && green == 255 && blue < 255){
        blue += 17;
    } else if(red == 0 && green > 0 && blue == 255){
        green -= 17;
    } else if(red < 255 && green == 0 && blue == 255){
        red += 17;
    } else if (red == 255 && green == 0 && blue > 0){
        blue -= 17;
    }
    return "rgb("+red+','+green+','+blue+")";
}




// enlève des pouets et tire une carte
function tirage(){
    document.querySelector(".pouet-display");
    if(cpt<10){
        
    }else if(cpt >= 25  && cpt < 50){ // Tirage
        if(cpt==25){resetProgressBar();}
        cpt -= 25;
        document.querySelector(".pouet-display").innerHTML = cpt + " Pouets !";
        resizeProgressBar();
        resetBtnAchat();
        nbTirages = 1;
        sDrop = 0;
        ssDrop = 0;
        pickACard();
        
    } else if(cpt >= 50 && cpt < 100){ // Super Tirage
        if(cpt==50){resetProgressBar();}
        cpt -= 50;
        document.querySelector(".pouet-display").innerHTML = cpt + " Pouets !";
        resizeProgressBar();
        resetBtnAchat();
        nbTirages = 3;
        sDrop = 5;
        ssDrop = 0;
        pickACard();
        
    } else if(cpt >= 100 && cpt < 200){ // Méga Super Tirage
        if(cpt==100){resetProgressBar();}
        cpt -= 100;
        document.querySelector(".pouet-display").innerHTML = cpt + " Pouets !";
        resizeProgressBar();
        resetBtnAchat();
        nbTirages = 5;
        sDrop = 10;
        ssDrop = 2;
        pickACard();
        
    } else if(cpt >= 200 && cpt < 400){ // Wati Tirage
        if(cpt==200){resetProgressBar();}
        cpt -= 200;
        document.querySelector(".pouet-display").innerHTML = cpt + " Pouets !";
        resizeProgressBar();
        resetBtnAchat();
        nbTirages = 7;
        sDrop = 20;
        ssDrop = 7;
        pickACard();
        
    } else if(cpt >= 400 && cpt < 800){ // Tirage de fou malade
        if(cpt==400){resetProgressBar();}
        cpt -= 400;
        document.querySelector(".pouet-display").innerHTML = cpt + " Pouets !";
        resizeProgressBar();
        resetBtnAchat();
        nbTirages = 7;
        sDrop = 35;
        ssDrop = 10;
        pickACard();
        
    } else if(cpt >= 800){ // Tirage de la mort qui tue
        cpt -= 801;
        document.querySelector(".pouet-display").innerHTML = cpt + " Pouets !";
        if (cpt < 800){
            resizeProgressBar();
        }
        increment();
        nbTirages = 7;
        sDrop = 50;
        ssDrop = 20;
        pickACard();
    }
    
}

// appellée dans tirage() permet de lancer l'interface de piochage
async function pickACard(param){
    if (param == 0){ // Un item est tiré puis affiché
        var randomInt = getRandomIntInclusive(0, 47); // Total des collectables dans le 2eme paramètre
        numberToCollectable(randomInt)
            .then(async collectable => {
                ajoutCollection(randomInt);
                saveCollection();
                var img = "./images/collectables/"+collectable.img;
                document.querySelector(".radial-light").style.visibility = "hidden";
                document.querySelector(".picked-card").src = img;
                document.querySelector(".picked-card").style.top = "50%";
                document.querySelector(".picked-card").style.visibility = "visible";
                await sleep(700);
                document.querySelector(".picked-card").style.filter = "brightness(100%)";
                document.querySelector(".radial-light").style.visibility = "visible";
                document.querySelector(".radial-light").style.filter = "opacity(100%)";
                document.querySelector(".picked-card-container").style.cursor = "pointer";
                document.querySelectorAll(".picked-card-container > *").forEach(element => {
                    element.style.cursor = "pointer";
                });
                document.querySelector(".picked-card-container").style.visibility = "visible";
                await sleep(300);
                document.querySelector(".collectable-text").innerHTML = collectable.name;
                document.querySelector(".collectable-text").style.top = "10%";
                await sleep(100);
                document.querySelector(".collectable-desc").innerHTML = collectable.description;
                document.querySelector(".collectable-desc").style.bottom = "10%";
                reveal = true;
                nbTirages -= 1;
            })
            .catch(error => {
                console.error('Erreur lors de l appel à numberToCollectable :', error);
            });
    } else if(param == 1){ // l'item est recaché
        document.querySelector(".collectable-text").style.top = "-10%";
        document.querySelector(".collectable-desc").style.bottom = "-10%";
        document.querySelector(".radial-light").style.filter = "opacity(0%)";
        document.querySelector(".radial-light").style.visibility = "hidden";
        await sleep(500);
        document.querySelector(".picked-card").style.top = "-50%";
        document.querySelector(".picked-card").style.visibility = "hidden";
        document.querySelector(".picked-card").style.filter = "brightness(0%)";
        document.querySelector(".picked-card-container").style.visibility = "hidden";
        await sleep(500);
        document.querySelector(".picked-card").style.top = "100%";
        reveal = false;
        if(nbTirages > 0){
            await sleep(500);
            pickACard(0);
        }
    }
}


// donne un entier aléatoire
function getRandomIntInclusive(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min +1)) + min;
  }

function delay(milliseconds){
    return new Promise(resolve => {
        setTimeout(resolve, milliseconds);
    });
}

//Gère toute la partie collection.
function collection(){
    document.querySelector(".collection-frame").style.visibility = "visible";
    document.querySelector(".affichage-collection").innerHTML = "";
    cardsOwned.forEach(element => {
        document.querySelector(".affichage-collection").innerHTML += "<div class=\"card\" style=\"order:"+element+";\"><br><img src=\"./images/cards/"+element+".png\" alt=\"c'est l'image\"></div>";
    });
    sCardsOwned.forEach(element => {
        document.querySelector(".affichage-collection").innerHTML += "<div class=\"card\" style=\"order:"+element*100+";\"><br><img src=\"./images/cards/secrets/"+element+".png\" alt=\"c'est l'image\"></div>";
    });
    ssCardsOwned.forEach(element => {
        document.querySelector(".affichage-collection").innerHTML += "<div class=\"card\" style=\"order:"+element*10000+";\"><br><img src=\"./images/cards/superSecrets/"+element+".png\" alt=\"c'est l'image\"></div>";
    });
}

function fermerCollection(){
    document.querySelector(".collection-frame").style.visibility = "hidden";
}





// Fonction permettant de recupérer la valeur d'un cookie
function getCookie(cname) {
    let name = cname + "=";
    let decodedCookie = decodeURIComponent(document.cookie);
    let ca = decodedCookie.split(';');
    for(let i = 0; i <ca.length; i++) {
        let c = ca[i];
        while (c.charAt(0) == ' ') {
            c = c.substring(1);
        }
        if (c.indexOf(name) == 0) {
            return c.substring(name.length, c.length);
        }
    }
    return "";
}
//verifie si un cokie existe
function checkCookie(cookieName) {
    var cookies = document.cookie.split(";");
    for (var i = 0; i < cookies.length; i++) {
      var cookie = cookies[i];
      var cookieArray = cookie.split("=");
      var name = cookieArray[0];
      var value = cookieArray[1];
      if (name.trim() === cookieName) {
        return true;
      }
    }
    return false;
  }





//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////


////// Partie shop
function afficherFenetre(param) {
    // window.alert("Le shop n'est pas encore disponible");
    const shopElement = document.querySelector("#"+param);
    shopElement.style.visibility = "visible";
  
    // Appliquer un curseur en attente lorsque vous ne survolez pas #shop
    const elements = document.querySelectorAll(":not(#"+param+")");
    elements.forEach(function (element) {
      element.style.cursor = "wait";
    });
  
    // Définir un curseur spécifique lorsque vous survolez #shop
    const shopAndChildren = shopElement.querySelectorAll("*");
    shopAndChildren.forEach(function (element) {
      element.addEventListener("mouseover", function () {
        element.style.cursor = "default";
      });
    });
}

// Fermer le shop
function fermerFenetre(param) {
    const shopElement = document.querySelector("#"+param);
    shopElement.style.visibility = "hidden";
  
    // Réinitialiser le curseur
    const elements = document.querySelectorAll("*");
    elements.forEach(function (element) {
      element.style.cursor = "default";
    });
}

// Onglets de la boutique
function tabFenetre(tab, fenetre) {
    for(let i=0; i<3; i++){
        if (i!=tab){
            document.querySelector("#tab-"+fenetre+"-"+i).ariaSelected = false;
            if(fenetre == "shop"){
                document.querySelector("#content-"+fenetre+"-"+i).hidden = true;
            }
        } else {
            document.querySelector("#tab-"+fenetre+"-"+i).ariaSelected = true;
            if(fenetre == "shop"){
                document.querySelector("#content-"+fenetre+"-"+i).hidden = false;
            }
        }
    }
}

// Achat de tirages
function achatPicksUp() {
    // Sélectionnez tous les boutons radio du groupe par leur nom (name)
const radioButtons = document.querySelectorAll('input[name="achat-picks-up"]');

// Parcourez tous les boutons radio
radioButtons.forEach((radioButton) => {
    // Vérifiez si le bouton radio est sélectionné
    if (radioButton.checked) {
        let data = radioButton.id.split("-")[1];
        nbTirages = data.split("/")[0];
        let prix = data.split("/")[1];
        if(cpt < prix){
            window.alert("Nombre de Pouets insuffisant");
        } else {
            cpt -= prix;
            savePouet();
            document.querySelector(".btn-achat").innerHTML = cpt + " Pouets !";
            isPicked = 0;
            pickACard(0);
                  }
              }
          });
}
////// Fin partie shop

function numberToCollectable(number) {
    return fetch('./db.json')
      .then(response => {
        if (!response.ok) {
          throw new Error('Erreur de chargement du fichier JSON');
        }
        return response.json();
      })
      .then(data => {
        return data.collectables[number]; // Retourne l'objet collectable correspondant au nombre
      });
}

function afficherItems(page) {
    for (var i = 0 + 24 * (page - 1); i < 24 * page; i++) {
        (function (index) { // Utilisez une IIFE pour capturer la valeur actuelle de i
            numberToCollectable(index)
                .then(collectable => {
                    document.querySelector("#item-" + index%24).innerHTML = "<div style=\"display: flex; justify-content: center; align-items: center; height: 95px;\"><img src=\"./images/collectables/" + collectable.img + "\" style=\"max-width: 95px; max-height: 95px; filter: brightness(0);\"></div>";
                    if(itemsCollection.hasOwnProperty(index)){
                        document.querySelector("#item-" + index%24).firstElementChild.firstElementChild.style.filter = "brightness(100%)";
                    }
                })
                .catch(error => {
                    console.error('Erreur lors de l appel à numberToCollectable :', error);
                });
        })(i); // Passez la valeur actuelle de i à l'IIFE
    }
}

function ajoutCollection(item) {
    if (!itemsCollection.hasOwnProperty(item)) {
      itemsCollection[item] = 0;
    }
    itemsCollection[item] += 1;
    console.log(itemsCollection);
}

function displayInfos(itemNumber){
    if(itemsCollection.hasOwnProperty(itemNumber)){
        numberToCollectable(itemNumber)
        .then(collectable => {
            document.querySelector("#inventaire-nom").innerHTML = "Nom : <strong>"+collectable.name+"</strong>";
            document.querySelector("#inventaire-description").innerHTML = "Description : <strong>"+collectable.description+"</strong>";
            document.querySelector("#inventaire-collection").innerHTML = "Dans la collection : <strong>"+itemsCollection[itemNumber]+"</strong>";
        })
        .catch(error => {
            console.error('Erreur lors de l appel à numberToCollectable :', error);
        });
    } else {
        document.querySelector("#inventaire-nom").innerHTML = "Nom : <strong>???</strong>";
        document.querySelector("#inventaire-description").innerHTML = "Description : <strong>???</strong>";
        document.querySelector("#inventaire-collection").innerHTML = "Dans la collection : <strong>0</strong>";
    }
}

function savePouet(){
    var data = btoa(cpt);
    document.cookie = "Pouets ="+data+" ; expires=Thu, 01 jan 2030 12:12:12 UTC";
}

function saveCollection(){
    const data = JSON.stringify(itemsCollection);
    const dataB64 = btoa(data);
    document.cookie = "Collection ="+encodeURIComponent(dataB64)+" ; expires=Thu, 01 jan 2030 12:12:12 UTC";
}

document.addEventListener("DOMContentLoaded", function(event) {
    if(checkCookie("Pouets")){
        cpt = parseInt(atob(getCookie("Pouets")));
        document.querySelector(".btn-achat").innerHTML = cpt + " Pouets !";
    }
    if(checkCookie("Collection")){
        const data = atob(decodeURIComponent(getCookie("Collection")));
        itemsCollection = JSON.parse(data);
    }
});