var backImage,backgr;
var player, player_running;
var ground,ground_img;
var score = 0;
var END =0;
var PLAY =1;
var gameState = PLAY;
var foodGroup, obstacleGroup;

function preload(){
  backImage=loadImage("jungle.jpg");
  player_running = loadAnimation("Monkey_01.png","Monkey_02.png","Monkey_03.png","Monkey_04.png","Monkey_05.png","Monkey_06.png","Monkey_07.png","Monkey_08.png","Monkey_09.png","Monkey_10.png");
  bananaImage = loadImage("banana.png");
obsImg = loadImage("stone.png");
gameoverImg = loadImage("gameOver.png");
}

function setup() {
  createCanvas(800,400);
  
  backgr=createSprite(0,0,800,400);
  backgr.addImage(backImage);
  backgr.scale=1.5;
  backgr.x=backgr.width/2;
  backgr.velocityX=-4;
  
  player = createSprite(100,340,20,50);
  player.addAnimation("Running",player_running);
  player.scale = 0.1;
  
  ground = createSprite(400,350,800,10);
  ground.x=ground.width/2;
  ground.visible=false;

  gameOver = createSprite(400,200,50,100);

  
  

  foodGroup = new Group();
  obstacleGroup = new Group();
  
  
}

function draw() { 
  background(0);
  fill("black");
  textSize(10);
  text("Score:" +score,300,30);

  if(gameState===PLAY){
  
  if(backgr.x<100){
    backgr.x=backgr.width/2;
  }
  
    if(keyDown("space") ) {
      player.velocityY = -12;
    }
    player.velocityY = player.velocityY + 0.8;
  
    player.collide(ground);
  }
  
  if(foodGroup.isTouching(player)){
    foodGroup.destroyEach();
    score = score+2;
    player.scale = player.scale+0.1;
  }
  
if(obstacleGroup.isTouching(player)){
  player.scale = player.scale-0.1
}
if(player.isTouching(obstacleGroup)){
  player.scale = 0.1 
  gameState = END;
}else if(gameState === END){
  backgr.velocityX = 0;
  player.visible = false;
  foodGroup.destroyEach();
  obstacleGroup.destroyEach();
gameOver.addImage(gameoverImg);
}
  spawnFood();
  spawnObstacles();

  drawSprites();
}
function spawnFood(){
  if(frameCount % 80 === 0){
    var banana = createSprite(600,250,40,10);
    banana.y = random(120,200);
    banana.addImage(bananaImage);
    banana.scale = 0.05;
    banana.velocityX = -5;
    banana.lifetime = 300;
    player.depth = banana.depth+1;
    foodGroup.add(banana);
  }
}
function spawnObstacles(){
  if(frameCount % 150 === 0){
    var obstacle = createSprite(600,340,10,10);
    obstacle.addImage(obsImg);
    obstacle.scale = 0.1;
    obstacle.velocityX = -7;
    obstacle.lifetime = 300;
    obstacleGroup.add(obstacle);
  }
}