//Snake Game


//Step 1 - Select DOM
const snakeCanvas = document.querySelector('#canvas');
const endGame = document.querySelector("#gameover");
const image = document.querySelector('#cloud');
const imageFlip = document.querySelector ('#cloud1');
const score = document.querySelector('#score');
const myhighscore = document.querySelector('#highscore');

//Step 2 - Create Canvas for Snake Game
const snakeCanvasStyle = snakeCanvas.getContext('2d');

snakeCanvas.width = 400;
snakeCanvas.height = 400;

//Step 3 - Define Variables

    //Grid Variables
        let tileCount = 20;
        let tileSize = snakeCanvas.width / tileCount - 2;

    //Player Score Variable
        let playerScore = 0;

    //Snake Variables
        let snakeCoordinateX = 10; //Initial x-coordinate of snake 
        let snakeCoordinateY = 10; //Initial y-coordinate of snake 
        let moveX = 0;// How many spaces snake will move at starting position 10x. Set to 0 so snake will not move until button is pressed
        let moveY = 0; 
        let snakeTrail=[];
        let trailLength = 0;
        class SnakeBody {
            constructor(x, y) {
              this.x = x;
              this.y = y;
            };
          };

    //Apple Variables
        let appleCoordinateX = Math.floor(Math.random() * (19 - 1 + 1) + 1); //Randomizes tile between 1-19
        let appleCoordinateY = Math.floor(Math.random() * (19 - 1 + 1) + 1); //Randomizes tile between 1-19
        let moveAppleX = 0;
        let moveAppleY = 0;

    //Gameover Variables
        let gameoverCoordinateX = 4;
        let gameoverCoordinateY = 11;
        let gameoverText = 'GAMEOVER';

    //Restart Variables
        let restartCoordinateX = 5;
        let restartCoordinateY = 12;
        let restartGame = 'PRESS ENTER TO PLAY AGAIN';

    //Highscore Variable
        let highScore = localStorage.getItem('highScore');
        if(highScore == null){
            myhighscore.innerText = 'HIGHSCORE: ' + 0;
        }else{
            myhighscore.innerText = 'HIGHSCORE: ' + highScore;
        };

    //Cloud Variables
        //Cloud One
        let cloudOneCoordX = 4;
        let cloudOneCoordY = 0;
        let moveCloudOneX = 0;
        let moveCloudOneY = 7;

        //Cloud Two
        let cloudTwoCoordX = -4;
        let cloudTwoCoordY = 0;
        let moveCloudTwoX = 20;
        let moveCloudTwoY = 12;

//Step 4 - Create Snake using Canvas
//Step 5 - Move Snake (up,down,left, right)
let moveSnake = setInterval(function(){
    
    snakeCanvasStyle.clearRect(0,0,400,400); // If you dont clearRect it will show a straight line of the snake
    snakeCoordinateX += moveX; 
    snakeCoordinateY += moveY;

    //Step 6 - Make Snake
    snakeCanvasStyle.strokeStyle = 'white'; //Snake Head
    snakeCanvasStyle.strokeRect(snakeCoordinateX * tileCount,snakeCoordinateY * tileCount,tileSize, tileSize); 

    snakeCanvasStyle.fillStyle = 'black';
    snakeCanvasStyle.fillRect(snakeCoordinateX * tileCount,snakeCoordinateY * tileCount,tileSize, tileSize); 

    //Step 7 - Create Snake Body and Make snake grow when it hits apple
    for(let i = 0; i < snakeTrail.length; i++){
        let snakeBody = snakeTrail[i];

        snakeCanvasStyle.strokeStyle = '#white'; //Snake Body
        snakeCanvasStyle.strokeRect(snakeBody.x * tileCount, snakeBody.y * tileCount, tileSize, tileSize);

        snakeCanvasStyle.fillStyle = '#c99290';
        snakeCanvasStyle.fillRect(snakeBody.x * tileCount, snakeBody.y * tileCount, tileSize, tileSize);

        // 8 - Snake Body Hit - When snake's body hits itself - Gameover
        if(snakeBody.x === snakeCoordinateX && snakeBody.y === snakeCoordinateY){

            clearInterval(moveSnake);
            
            //MP3 Sound - Gameover Sound
            let audio = new Audio('heavyrain.wav');
                audio.volume = 0.05;
                audio.play();
                
            snakeCanvasStyle.font = '40px Arial';
            snakeCanvasStyle.fillStyle = 'black';
            snakeCanvasStyle.fillText(gameoverText, gameoverCoordinateX * tileCount, gameoverCoordinateY * tileCount);

            snakeCanvasStyle.font = '13px Arial';
            snakeCanvasStyle.fillStyle = 'black';
            snakeCanvasStyle.fillText(restartGame, restartCoordinateX * tileCount, restartCoordinateY * tileCount);

            };

        };

        //Creates body for snake and adds to the snake head
        snakeTrail.push(new SnakeBody(snakeCoordinateX,snakeCoordinateY));
            if(snakeTrail.length>trailLength){
                snakeTrail.shift();
            };

    //Step 9 - Border Hit - When you hit the border - Gameover
    if(snakeCoordinateX === 20 || snakeCoordinateX === -1 || snakeCoordinateY === 20 || snakeCoordinateY === -1){

        clearInterval(moveSnake);

        //MP3 Sound - Gameover Sound
        let audio = new Audio('heavyrain.wav');
        audio.volume = 0.05;
        audio.play();

        snakeCanvasStyle.font = '40px Arial';
        snakeCanvasStyle.fillStyle = 'black';
        snakeCanvasStyle.fillText(gameoverText, gameoverCoordinateX * tileCount, gameoverCoordinateY * tileCount);

        snakeCanvasStyle.font = '13px Arial';
        snakeCanvasStyle.fillStyle = 'black';
        snakeCanvasStyle.fillText(restartGame, restartCoordinateX * tileCount, restartCoordinateY * tileCount);
    };

}, 150);//milliseconds, how fast snake will move

//Step 10 - Keydown Events (Up, Down, Left, Right)
document.addEventListener('keydown', function(event){

    let keyDirection = event.key
        if(keyDirection === 'ArrowDown'){
            if(moveY === -1) //Does not allow snake to move back into the direction it was in previously
                return;
            moveX = 0;
            moveY = 1;
        };
        if(keyDirection === 'ArrowUp'){ 
            if(moveY === 1)
                return;
            moveX = 0;
            moveY = -1;
        };
        if(keyDirection === 'ArrowRight'){ 
            if(moveX === -1)
                return;
            moveX = 1;
            moveY = 0;
        };
        if(keyDirection === 'ArrowLeft'){
            if(moveX === 1)
                return;
            moveX = -1;
            moveY = 0;
        };
        if(keyDirection === 'Enter'){
            location.reload()
        };
        event.preventDefault(); //stops page from scrolling when using direction keys for snake
});


//Step 11 - Create Apple
function moveApple(){

    snakeCanvasStyle.fillStyle = 'white';
    snakeCanvasStyle.fillRect(appleCoordinateX * tileCount, appleCoordinateY * tileCount, tileSize, tileSize); 

    snakeCanvasStyle.strokeStyle = 'black';
    snakeCanvasStyle.strokeRect(appleCoordinateX * tileCount, appleCoordinateY * tileCount, tileSize, tileSize); 

    appleCoordinateX += moveAppleX;
    appleCoordinateY += moveAppleY;

    //Step 12 - Make Apple Disappear and Randomize when snake hits
    if(appleCoordinateX === snakeCoordinateX && appleCoordinateY === snakeCoordinateY){

    //MP3 Sound - Cloud Hit
    const audio = new Audio('cloudsound.mp3');
        audio.volume = 0.1;
        audio.play();
    
    
    appleCoordinateX = Math.floor(Math.random() * (19 - 1 + 1) + 1);
    appleCoordinateY = Math.floor(Math.random() * (19 - 1 + 1) + 1);        

    //Grow snake when it hits apple
    trailLength += 3 

    //Step 13 - Add Score when snake hits apple
    score.innerText = 'SCORE: ' + ++playerScore

    //Step 14 - Highscore - Local Storage
    
        if (playerScore > highScore) {
            localStorage.setItem('highScore', playerScore);
            myhighscore.innerText = 'HIGHSCORE: ' + playerScore;
            };    
        };
};
setInterval(moveApple,0);

//Step 15 - Cloud Animation
function moveCloud(){
    
    snakeCanvasStyle.drawImage(image, moveCloudOneX* tileCount, moveCloudOneY * tileCount);

    moveCloudOneX += cloudOneCoordX    
    moveCloudOneY += cloudOneCoordY

    snakeCanvasStyle.drawImage(imageFlip, moveCloudTwoX * tileCount,moveCloudTwoY * tileCount);

    moveCloudTwoX += cloudTwoCoordX
    moveCloudTwoY += cloudTwoCoordY 

};
setInterval(moveCloud,150);