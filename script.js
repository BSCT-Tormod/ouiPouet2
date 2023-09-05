var cpt = 100000;
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

console.log("hello world le programme");
document.querySelector(".game").onclick = function(){
    if(this.style.cursor != "wait"){
        increment()
    }
};
document.querySelector("#achat-picks-up").onclick = function(){achatPicksUp()};
document.querySelector("#tab-shop-0").onclick = function(){tabShop(0)};
document.querySelector("#tab-shop-1").onclick = function(){tabShop(1)};
document.querySelector("#tab-shop-2").onclick = function(){tabShop(2)};
document.querySelector("#shop-close").onclick = function () {fermerShop();};
document.querySelector("#ok-shop").onclick = function () {fermerShop();};
document.querySelector(".btn-achat").onclick = function(){tirage()};
document.querySelector(".picked-card-container").onclick = function(){pickACard()};
// document.querySelector("#collection").onclick = function(){collection()};
document.querySelector("#shop-button").onclick = function(){afficherShop()};
document.querySelector(".collection-partir").onclick = function(){fermerCollection()};


////// rompiche
function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

////// Change la couleur de l'ombre tout seul (comme un grand)
window.i = 0;
setInterval(() => {
    window.i += 1;
    document.querySelector(".game").style.boxShadow = "0 0 75px "+autoHue();
    document.querySelector(".btn-achat").style.boxShadow = "0 0 75px "+autoHue();
}, 200);
//////

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
    autoStyleTirage();
    autoStyleImage();
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

// gère automatiquement l'aspect de la bare de progression et du bouton d'achat
function autoStyleTirage(){
    if(cpt<25){
        progressBarLength += 4;
        resetBtnAchat();
        document.querySelector("#normal").innerHTML = "Communes : 0%";
        document.querySelector("#secret").innerHTML = "Secrètes : 0%";
        document.querySelector("#superSecret").innerHTML = "Super Secrètes : 0%";
    }else if(cpt >= 25 && cpt < 50){ // Tirage
        if(cpt==25){resetProgressBar();}
        document.querySelector("#normal").innerHTML = "Communes : 100%";
        document.querySelector("#secret").innerHTML = "Secrètes : 0%";
        document.querySelector("#superSecret").innerHTML = "Super Secrètes : 0%";
        btnAchat.innerHTML = "&#62&#62&#62 Tirage &#60&#60&#60";
        btnAchat.style.backgroundColor = "#B87333";
        btnAchat.style.color = "#FFF";
        btnAchat.style.border = "5px solid #fff";
        progressBar.style.backgroundColor = "#C0C0C0";
        progressBarLength += 4;
        
    } else if(cpt >= 50 && cpt < 100){ // Super Tirage
        if(cpt==50){resetProgressBar();}
        document.querySelector("#normal").innerHTML = "Communes : 95%";
        document.querySelector("#secret").innerHTML = "Secrètes : 5%";
        document.querySelector("#superSecret").innerHTML = "Super Secrètes : 0%";
        btnAchat.style.backgroundColor = "#C0C0C0";
        progressBar.style.backgroundColor = "#FFD700";
        btnAchat.innerHTML = "&#62&#62&#62 Super Tirage &#60&#60&#60";
        btnAchat.style.color = "#FFF";
        btnAchat.style.border = "5px solid #fff";
        progressBarLength += 100/(100-50);
        
    } else if(cpt >= 100 && cpt < 200){ // Méga Super Tirage
        if(cpt==100){resetProgressBar();}
        document.querySelector("#normal").innerHTML = "Communes : 88%";
        document.querySelector("#secret").innerHTML = "Secrètes : 10%";
        document.querySelector("#superSecret").innerHTML = "Super Secrètes : 2%";
        btnAchat.style.backgroundColor = "#FFD700";
        progressBar.style.backgroundColor = "#00b3ff";
        btnAchat.innerHTML = "&#62&#62&#62 Méga Super Tirage &#60&#60&#60";
        btnAchat.style.color = "#FFF";
        btnAchat.style.border = "5px solid #fff";
        progressBarLength += 100/(200-100);
        
    } else if(cpt >=200 && cpt < 400){ // Wati Tirage
        if(cpt==200){resetProgressBar();}
        document.querySelector("#normal").innerHTML = "Communes : 73%";
        document.querySelector("#secret").innerHTML = "Secrètes : 20%";
        document.querySelector("#superSecret").innerHTML = "Super Secrètes : 7%";
        btnAchat.style.backgroundColor = "#00b3ff";
        progressBar.style.backgroundColor = "#870b0b";
        btnAchat.innerHTML = "&#62&#62&#62 Wati Tirage &#60&#60&#60";
        btnAchat.style.color = "#FFF";
        btnAchat.style.border = "5px solid #fff";
        progressBarLength += 100/(400-200);
        
    } else if(cpt >= 400 && cpt < 800){ // Tirage de fou malade
        if(cpt==400){resetProgressBar();}
        document.querySelector("#normal").innerHTML = "Communes : 55%";
        document.querySelector("#secret").innerHTML = "Secrètes : 35%";
        document.querySelector("#superSecret").innerHTML = "Super Secrètes : 10%";
        btnAchat.style.backgroundColor = "#870b0b";
        progressBar.style.backgroundColor = "#fff";
        btnAchat.innerHTML = "&#62&#62&#62 Tirage de fou malade &#60&#60&#60";
        btnAchat.style.color = "#FFF";
        btnAchat.style.border = "5px solid #fff";
        progressBarLength += 100/(800-400);
        
    } else if(cpt >= 800){ // Tirage de la mort qui tue
        document.querySelector("#normal").innerHTML = "Communes : 30%";
        document.querySelector("#secret").innerHTML = "Secrètes : 50%";
        document.querySelector("#superSecret").innerHTML = "Super Secrètes : 20%";
        btnAchat.style.color = "#fff";
        btnAchat.style.backgroundColor = autoHue();
        progressBar.style.backgroundColor = autoHue();
        btnAchat.style.color = "#FFF";
        btnAchat.style.border = "5px solid #fff";
        btnAchat.innerHTML = "&#62&#62&#62 Tirage de la mort qui tue &#60&#60&#60";        
    }
}

// rénitialise les paramètres de la bare de progression
function resetProgressBar(){
    progressBar.style.width = "0%";
    progressBarLength = 0;
    btnAchat.style.color = "#fff";
    btnAchat.style.border = "5px solid #fff";
}

function resizeProgressBar(){
    if(cpt < 25){
        progressBarLength = (cpt*4);
        progressBar.style.width = progressBarLength+"%";
        progressBarLength += 4;
    } else if(cpt < 50){
        cpt -=25;
        progressBarLength = (cpt*4);
        progressBar.style.width = progressBarLength+"%";
        progressBarLength += 4;
        cpt += 25;
    } else if(cpt < 100){
        progressBarLength = (cpt*8);
        progressBar.style.width = progressBarLength+"%";
        progressBarLength += 8;
    } else if(cpt < 200){
        progressBarLength = (cpt*16);
        progressBar.style.width = progressBarLength+"%";
        progressBarLength += 16;
    } else if(cpt < 400){
        progressBarLength = (cpt*32);
        progressBar.style.width = progressBarLength+"%";
        progressBarLength += 32;
    }
}

// rénitialise les paramètres du bouton d'achat
function resetBtnAchat(){
    progressBar.style.backgroundColor = "#B87333";
    btnAchat.style.backgroundColor = "#fff";
    btnAchat.style.color = "#969696";
    btnAchat.style.border = "5px solid #969696";
    btnAchat.innerHTML = "Pas assez de Pouets";
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
async function pickACard(){
    if (isPicked == 0){ // La carte est piochée face cachée
        document.querySelector(".radial-light").style.visibility = "hidden";
        document.querySelector(".picked-card").src = "./images/cards/back.png";
        document.querySelector(".picked-card-container").style.visibility = "visible";
        document.querySelector(".picked-card").style.visibility = "visible";
        isPicked = 1;        
    } else if(isPicked == 1){ // La carte est retournée
        
        var randomInt = getRandomIntInclusive(0, 15);

        numberToCollectable(randomInt)
            .then(async collectable => {            
              
              var img = "./images/collectables/"+collectable.img;    //////// Nombre de cartes super secretes
                document.querySelector(".picked-card").src = img;
                document.querySelector(".picked-card").style.visibility = "visible";
                document.querySelector(".radial-light").style.visibility = "visible";
                if(nbTirages > 1){
                    nbTirages--;
                    isPicked = 2;
                } else {
                    isPicked = 100;
                }
            })
            .catch(error => {
              console.error('Erreur lors de l appel à numberToCollectable :', error);
            });
    } else if(isPicked == 2) { // la carte est cachée
        isPicked = 0;           
        pickACard();
    } else { // la carte est cachée
        document.querySelector(".picked-card-container").style.visibility = "hidden";
        document.querySelector(".picked-card").style.visibility = "hidden";
        document.querySelector(".radial-light").style.visibility = "hidden";
        isPicked = 0;        
        save();
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

////// Partie sauvegarde
document.querySelector("#sauvegarde").onclick = function () { 
    save();
    alert("Les données sont dans le presse papier");
};

function save(){
    var data = "Pouets:"+cpt+";Cartes:"+cardsOwned+";Cartes_s:"+sCardsOwned+";Cartes_ss:"+ssCardsOwned+";";
    data = btoa(data);
    if(checkCookie("Cokie")){document.cookie ="Data ="+data+" ; expires=Thu, 01 jan 2030 12:12:12 UTC";}
    navigator.clipboard.writeText(data);
}

// cette fonction permet de charger les données de sauvegardes depuis le cookie
document.querySelector("#charger").onclick = function (){
    load();
}
addEventListener("load",function(){load();});
function load(){
    if(document.querySelector("#load-input").value !== ""){
        var data = atob(document.querySelector("#load-input").value).split(";");
    } else {
    var data = atob(getCookie("Data")).split(";");
    }
    console.log(data)
    data.forEach(element => recup(element));
    document.querySelector("#load-input").value = "";
}
document.querySelector("#load-input").addEventListener("keypress",function (event){
    if (event.key==='Enter'){
        event.preventDefault();
        if(document.querySelector("#load-input").value !== ""){
            var data = atob(document.querySelector("#load-input").value).split(";");
        } else {
        var data = atob(getCookie("Data")).split(";");
        }
        console.log(data)
        data.forEach(element => recup(element));
        document.querySelector("#load-input").value = "";
    }
});

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

//recupere les données de sauvegarde pour les mettre dans la partie
function recup(element){
    if(element.split(":")[0]=="Pouets"){
        cpt = element.split(":")[1] -1;
        cpt+=1;
        document.querySelector(".pouet-display").innerHTML = cpt + " Pouets !";
        resizeProgressBar();
        resetBtnAchat();
        autoStyleTirage();
    } else if(element.split(":")[0]=="Cartes" &&  element.split(":")[1] !== ""){
        cardsOwned = [];
        element.split(":")[1].split(",").forEach((element) => {if(!cardsOwned.includes(element)){cardsOwned.push(element);}});
    } else if(element.split(":")[0]=="Cartes_s" &&  element.split(":")[1] !== ""){
        sCardsOwned = [];
        element.split(":")[1].split(",").forEach((element) => {if(!sCardsOwned.includes(element)){sCardsOwned.push(element);}});
    } else if(element.split(":")[0]=="Cartes_ss" &&  element.split(":")[1] !== ""){
        ssCardsOwned = [];
        element.split(":")[1].split(",").forEach((element) => {if(!ssCardsOwned.includes(element)){ssCardsOwned.push(element);}});
    }
}

// affichage pop up cokie
if(!checkCookie("Cokie")){
    document.querySelector(".cookie-pop-up").style.visibility = "visible";
}
document.querySelector("#cokie-non").onclick = function(){document.querySelector(".cookie-pop-up").style.visibility = "hidden";};
document.querySelector("#cokie-oui").onclick = function(){document.querySelector(".cookie-pop-up").style.visibility = "hidden"; document.cookie="Cokie = casse toi de la ! ; expires=Thu, 01 jan 2030 12:12:12 UTC"};




//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////


////// Partie shop
function afficherShop() {
    // window.alert("Le shop n'est pas encore disponible");
    const shopElement = document.querySelector("#shop");
    shopElement.style.visibility = "visible";
  
    // Appliquer un curseur en attente lorsque vous ne survolez pas #shop
    const elements = document.querySelectorAll(":not(#shop)");
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
    console.log("shop");
}

// Fermer le shop
function fermerShop() {
    const shopElement = document.querySelector("#shop");
    shopElement.style.visibility = "hidden";
  
    // Réinitialiser le curseur
    const elements = document.querySelectorAll("*");
    elements.forEach(function (element) {
      element.style.cursor = "default";
    });
}

// Onglets de la boutique
function tabShop(tab) {
    for(let i=0; i<3; i++){
        if (i!=tab){
            document.querySelector("#tab-shop-"+i).ariaSelected = false;
            document.querySelector("#content-shop-"+i).hidden = true;
        } else {
            document.querySelector("#tab-shop-"+i).ariaSelected = true;
            document.querySelector("#content-shop-"+i).hidden = false;
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
        let tirage = data.split("/")[0];
        let prix = data.split("/")[1];
        if(cpt < prix){
            window.alert("Nombre de Pouets insuffisant");
        } else {
            cpt -= prix;
            document.querySelector(".btn-achat").innerHTML = cpt + " Pouets !";
            isPicked = 1;
            pickACard();
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