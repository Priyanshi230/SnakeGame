let inputDir = {x:0,y:0};
const foodeatingsound = new Audio('food.mp3');
const gameoversound = new Audio('gameover.mp3');
const moveingsound = new Audio('move.mp3');
const bgsound = new Audio('music.mp3');
let speed = 4;
let score = 0;
let lastPaintTime =0;
let snakeArray =[
    {x:13,y:15}
]

food = {x: 4,y:10 }; 





// Game function

function main(ctime){
    window.requestAnimationFrame(main);
    //console.log(ctime)
    if((ctime - lastPaintTime)/1000 < 1/speed){
        return;
    }
    
        lastPaintTime = ctime;
        gameEngine();
       
}

function isCollide(snakeArray){
    // if snake bump into itself
    for(let i=1;i<snakeArray.length;i++){
        if(snakeArray[i].x === snakeArray[0].x && snakeArray[i].y === snakeArray[0].y){
        return true;
        }
    }

    // If the snake bump into wall
    if(snakeArray[0].x >= 18 || snakeArray[0].x <=0 || snakeArray[0].y >=18 || snakeArray[0].y <=0 ){
        return true; 
    }

}
function gameEngine(){
    // Part 1: Updating the snake array and food
      if(isCollide(snakeArray)){
        gameoversound.play();
       // bgsound.pause();
        inputDir = {x:0,y:0};
        alert("GAME OVER.  Press any key to play again.");
        snakeArray = [{x:13,y:15}];
      // bgsound.play();
        score = 0;
      }
       

      // if you have eaten the food,increase the sore and regenerate the food
      if(snakeArray[0].y == food.y &&snakeArray[0].x == food.x ){
        score++;
        ScoreBox.innerHTML = "score:" + score;
        foodeatingsound.play(); 
        snakeArray.unshift({x: snakeArray[0].x +inputDir.x ,y: snakeArray[0].y +inputDir.y})
        let a = 2; 
        let b = 16;
        food ={x: Math.round(a+(b-a)*Math.random()), y: Math.round(a+(b-a)*Math.random())}
      }

        
       // Moving the snake
       for(let i= snakeArray.length-2; i>=0;i--){
        
        snakeArray[i+1] = {...snakeArray[i]}
       }

       snakeArray[0].x += inputDir.x;
       snakeArray[0].y += inputDir.y;

    //Part 2: display the snake
    board.innerHTML = "";
    snakeArray.forEach((e,index)=>{
        snakeElement = document.createElement('div');
       // adding css through js
        snakeElement.style.gridRowStart = e.y;
        snakeElement.style.gridColumnStart = e.x;
        snakeElement.classList.add('snake');
        if(index == 0){
            snakeElement.classList.add('head');
        }
        else{
            snakeElement.classList.add('snake');
        }
            board.appendChild(snakeElement);

    })


    // display the food

    foodElement = document.createElement('div');
    // adding css through js
     foodElement.style.gridRowStart = food.y;
     foodElement.style.gridColumnStart = food.x;
     foodElement.classList.add('food')
     board.appendChild(foodElement);
}


//Main logic starts here
 
window.requestAnimationFrame(main);
window.addEventListener('keydown',e =>{
  inputDir = {x:0,y:1} 
  moveingsound.play();
  switch(e.key){
    case "ArrowUp":
        console.log("ArrowUp")
        inputDir.x = 0;
        inputDir.y = -1;
        break;
      

    case "ArrowDown":
        console.log("ArrowDown")
        inputDir.x = 0;
        inputDir.y = +1;
        break;


    case "ArrowLeft":
        console.log("ArrowLeft")
        inputDir.x = -1;
        inputDir.y = 0;
            break;


    case "ArrowRight":
        console.log("ArrowRight")
        inputDir.x = +1;
        inputDir.y = 0;  
             break;

    default:
             break;


  } 
});
