var sanitizer, virusGroup, path, vaccineGroup, vaccine;
var PLAY=1;
var END=0;
var gameState=1;
var score=0;
var liquidImg;

function preload(){
  pathImg = loadImage("images/sky background.png");
  boyImg = loadImage("images/Sanitizer_image.png");
  carImg=loadImage("images/alive_virus.png");
  coinGif=loadImage("images/vaccine_animation.gif");
  maskImg=loadImage("images/mask.png");
  liquidImg=loadImage("images/sprayed_liquid.png");
  GameOverImg=loadImage("images/gameOver.png");
}

function setup() {
  createCanvas(600, 600);
  
  path=createSprite(width/2,height/2);
  path.addImage(pathImg);
  path.scale=4;
  path.velocityY = 0;
  
  sanitizer = createSprite(width-70,height-100,20,20);
  sanitizer.addImage("SahilRunning",boyImg);
  sanitizer.scale=0.12;

  
  
  
  virusGroup=new Group();
  vaccineGroup=new Group();
  
}

function draw() {
  background(220);
  
  
  
  if(gameState===PLAY){
  background(0);
  sanitizer.x = World.mouseX;
  
  edges= createEdgeSprites();
  sanitizer.collide(edges);
  
  //code to reset the background
  
  
  if(vaccineGroup.isTouching(sanitizer)){
    vaccineGroup.destroyEach();
    score=score+1;
  }  
    
  if(virusGroup.isTouching(sanitizer)){
    gameState=END;
  }

  path.velocityY=7;
  if(path.y>600){
    path.y=500;
  }
  
  
  

  spawnVaccine();  
  spawnVirus();
  drawSprites();
    
  stroke("white");
  fill("white");
  textSize(20);  
  text("Score:"+score, 520, 30);  
 }
  if(gameState==END){
    stroke("yellow");
    fill("yellow");
    textSize(70);
    text("GAME OVER", 100, 300);
  }
  if(keyDown("space")){
    shoot();
  }
  
}  

function spawnVirus(){
  if (frameCount%125==0 && frameCount>0){
    var virus=createSprite(300, -50, 20, 10);
   //virus.scale=0.8;
   virus.addImage(carImg);
   virus.velocityY=(5+score);
    virus.x = Math.round(random(200,400));
    var rand = Math.round(random(1,6));
    switch(rand) {
      case 1: virus.scale=0.2;
      break;
      case 2: virus.scale=0.5;
      break;
      case 3: virus.scale=0.3;
      break; 
      case 4:virus.scale=0.4;
      break; 
     case 5: virus.scale=0.1;
      break;  
      case 6:virus.scale=0.2;
      break;         
      default: break;
      }
    
    
  virusGroup.add(virus);
  }
}

function spawnVaccine(){
  if (frameCount%73==0){
    vaccine=createSprite(300, -50, 20, 10);
    vaccine.x= Math.round(random(200,400));
    vaccine.addImage("coin", coinGif); 
    vaccine.scale = 0.05;
    vaccine.velocityY= (5+score);
    vaccineGroup.add(vaccine);
  
 }
}
function shoot(){
  var liquid=createSprite(200,400);
  liquid.x=sanitizer.x;
  liquid.y=sanitizer.y;
  liquid.addImage(liquidImg);
  liquid.velocityY=2;
  
}
