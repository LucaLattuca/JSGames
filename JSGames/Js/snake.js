const canvas = document.getElementById('game');
//ask canvas for 2d context
const ctx = canvas.getContext('2d');


class SnakePart{
    constructor(x,y){
        this.x = x;
        this.y = y;
    }
}

let speed = 10;

let tileCount = 20;
let tileSize = canvas.width / tileCount - 2;

//snake head position
let headX = 10;
let headY = 10;
const snakeParts = [];
let tailLength = 2;


//apple position
let appleX = 5;
let appleY = 5;


let xVelocity = 0;
let yVelocity = 0;

let score = 0;


const bruh = document.getElementById('bruh');
const eat = document.getElementById('eat');


//gameloop
function drawGame(){
    changeSnakePosition();

    let result = isGameOver();
    if(result){
        return;
    }

    clearScreen();


    checkAppleCollision();;
    drawApple();
    drawSnake();
    drawScore();
    if(checkAppleCollision() ){
        speed++;
    }
        
    

    setTimeout(drawGame, 1000/speed);
}


function isGameOver(){
    let gameOver = false;
    
    if(yVelocity ===0 && xVelocity ===0)
    return false;
    //walls
    if(headX < 0){
        gameOver = true;
    }
    if(headX > 20){
        gameOver = true;
    }
    if(headY < 0){
        gameOver = true;
    }
    if(headY > 20){
        gameOver = true;
    }
    
    
    //body if snakepart has same coordinates as one of the parts
    for(let i = 0; i < snakeParts.length; i++){
        let part = snakeParts[i];
        if(part.x === headX && part.y === headY){
            gameOver = true;
            break;
        }
    }
    
    //gameoverscreen
    if(gameOver){
        
        ctx.fillStyle = "red";
        ctx.font = "50px Verdana";
        
        
        ctx.fillText("You Died" , canvas.width/4.5, canvas.height / 2);    
        
        bruh.play();
    }
    return gameOver;

}

function drawScore(){
    ctx.fillStyle = "white";
    ctx.font = "10px Verdana";
    ctx.fillText("Score : " + score, canvas.width-50, 10);
}



function clearScreen(){
    ctx.fillStyle = 'rgb(25, 25, 25)';
    ctx.fillRect(0,0, canvas.width,canvas.height);

}

function drawSnake(){
    

    ctx.fillStyle = 'green';
    for(let i = 0; i < snakeParts.length; i++){
        let part = snakeParts[i];
        ctx.fillRect(part.x * tileCount, part.y * tileCount, tileSize, tileSize);
    }

    //put item at end of the list 
    snakeParts.push(new SnakePart(headX, headY));
    while(snakeParts.length > tailLength){
        snakeParts.shift(); //removes the furthest item from snakepart
    }

    ctx.fillStyle = 'goldenrod';
    ctx.fillRect(headX * tileCount, headY * tileCount, tileSize, tileSize);

}

function changeSnakePosition(){
    headX = headX + xVelocity;
    headY = headY + yVelocity;
}

function drawApple(){
    ctx.fillStyle = 'red';
    ctx.fillRect(appleX * tileCount, appleY * tileCount, tileSize, tileSize)
}

// if apple overlaps with x and y positions
function checkAppleCollision(){
    if(appleX == headX && appleY == headY){
        appleX = Math.floor(Math.random() * tileCount);
        appleY = Math.floor(Math.random() * tileCount);
        tailLength++;
        score++;
        speed = speed + 0.2;
        eat.play();
        
        
    }

   
     for(let i = 0; i < snakeParts.length; i++){
         let part = snakeParts[i];
         if(part.x === appleX && part.y === appleY){
             eat.play();
             
        appleX = Math.floor(Math.random() * tileCount);
        appleY = Math.floor(Math.random() * tileCount);
        tailLength++;
        score++;
        speed = speed + 0.2;

         }
     }



}



document.body.addEventListener('keydown', keyDown);

function keyDown(event){
    //up
    if(event.keyCode == 38){
        if(yVelocity == 1)
            return;
        yVelocity = -1;
        xVelocity = 0;
    }
    //down
    if(event.keyCode == 40){
        if(yVelocity == -1)
        return;
        yVelocity = 1;
        xVelocity = 0;
    }
    //left
    if(event.keyCode == 37){
        if(xVelocity == 1)
        return;
        yVelocity = 0;
        xVelocity = -1;
    }
    //right
    if(event.keyCode == 39){
        if(xVelocity ==-1)
        return;
        yVelocity = 0;
        xVelocity = 1;
    }
}


  
drawGame();
