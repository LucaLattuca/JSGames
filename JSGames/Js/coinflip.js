'use strict'

let coin = document.getElementById("coin");
coin.addEventListener("click", clickCoin)


function clickCoin(){
    var result = Math.random();
    if (result < 0.5){
        coin.className = "flipHead";
        
    } else {
        coin.className = "flipTail";
        
    }
}







