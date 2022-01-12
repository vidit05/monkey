     var PLAY=1;
var END=0;
var gameState=PLAY;
var monkey , monkey_running
var banana ,bananaImage, obstacle, obstacleImage
var foodGroup, obstacleGroup
var score
var ground,invisibleGround,groundImage
function preload(){
  
  
  monkey_running =            loadAnimation("sprite_0.png","sprite_1.png","sprite_2.png","sprite_3.png","sprite_4.png","sprite_5.png","sprite_6.png","sprite_7.png","sprite_8.png")
  
  bananaImage = loadImage("banana.png");
  obstacleImage = loadImage("obstacle.png");
  groundImage=loadImage("jungle.jpg");
 
}



function setup() {
 createCanvas(600, 200);

  ground = createSprite(600,105,600,10)
  ground.shapeColor = "brown"
  ground.x = ground.width /2; 
  ground.addImage(groundImage)
  ground.scale=0.5;
    invisibleGround = createSprite(600,195,1200,10)
  invisibleGround.visible=false;
  monkey = createSprite(50,160,20,50);
  monkey.addAnimation("running", monkey_running);
 
  score = 0

  monkey.scale = 0.1;


  foodGroup = new Group()
  obstacleGroup = new Group()
}


function draw() {  
  background("green")
 
  
  if(gameState===PLAY){
      ground.velocityX = -4
    //scoring
    //score=Math.ceil(frameCount/frameRate())

     if (ground.x < 0){
      ground.x = ground.width/2;
    }
    
    //jump when the space key is pressed
    if(keyDown("space")&& monkey.y >= 150) {
        monkey.velocityY = -12;
        
    }
    
    //add gravity
    monkey.velocityY = monkey.velocityY + 0.8
  
    //spawn the clouds
    spawnBananas();
  
    //spawn obstacles on the ground
    spawnObstacle();
    if(monkey.isTouching(foodGroup))
      {
        score=score+1;
        foodGroup.destroyEach()
      }
  if(monkey.isTouching(obstacleGroup))
      {
        obstacleGroup.setLifetimeEach(-1);
        foodGroup.setLifetimeEach(-1);
      }
     }
  else
    if(gameState===END)
       {
       obstacleGroup.setVelocityXEach(0);
        bananaGroup.setVelocityXEach(0);
         
       }
    monkey.collide(invisibleGround)  
drawSprites()
   textSize(25)
  fill("black")
  text("Score: "+ score, 400,50);
}
function spawnBananas() {
  //write code here to spawn the clouds
  if (frameCount % 80 === 0) {
    var banana = createSprite(600,120,40,10);
    banana.y = Math.round(random(80,120));
    banana.addImage(bananaImage);
    banana.scale = 0.1;
    banana.velocityX = -3 
    
     //assign lifetime to the variable
    banana.lifetime = 200;
    
   
    
    //add each cloud to the group
    foodGroup.add(banana);
  }
}
function spawnObstacle() {
  //write code here to spawn the clouds
  if (frameCount % 300 === 0) {
     obstacle = createSprite(600,170,40,10);
    
    obstacle.addImage(obstacleImage);
    obstacle.scale = 0.1;
    obstacle.velocityX = -3;
    
     //assign lifetime to the variable
    obstacle.lifetime = 200;
    
   
    
    //add each cloud to the group
    obstacleGroup.add(obstacle);
  }
}




