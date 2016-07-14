// the Game object used by the phaser.io library
var stateActions = { preload: preload, create: create, update: update };
// Phaser parameters:
// - game width
// - game height
// - renderer (go for Phaser.AUTO)
// - element where the game will be drawn ('game')
// - actions on the game state (or null for nothing)
var game = new Phaser.Game(790, 400, Phaser.AUTO, 'game', stateActions);
var score = -3;
var showscore;
var player;
var pipes = [];
var q;
var phasing = 0;
var phased = 0;
var thing = [];
var thiing = [];
var xoy = 0;
var weirding = 0;
var po = 0;
var pvi = 1.5;
var pne = 1;
var pnh = 0;
var pn = 0;
/*
 * Loads all resources for the game and gives them names.
 */
function preload() {
  game.load.image("playerImg","../assets/flappy.png");
  game.load.audio("score","../assets/point.ogg");
  game.load.image("pipeblock","../assets/pipe2-body.png");
  game.load.image("pipeend","../assets/pipe2-end.png");
  game.load.image("star","../assets/star.png");
  game.load.image("easy","../assets/easy.png");
  game.load.image("Vortexbg","../images-2.png");
}
function start () {
  game.input.onDown.add(playerjump);
  game.input.keyboard.addKey(Phaser.Keyboard.Q).onDown.add(spaced);
  game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR).onDown.add(playerjump);
  game.input.keyboard.addKey(Phaser.Keyboard.DOWN).onDown.add(mu);
  game.input.keyboard.addKey(Phaser.Keyboard.P).onDown.add(mu);
  game.input.keyboard.addKey(Phaser.Keyboard.RIGHT).onDown.add(phasethru);
  game.input.keyboard.addKey(Phaser.Keyboard.LEFT).onDown.add(mu);
  game.physics.startSystem(Phaser.Physics.ARCADE);
  game.physics.arcade.enable(player);
  player.body.velocity.x = 0;
  player.body.velocity.y = -100;
  player.body.gravity.y = 300;
  po = pn/100;
  generatepipe();
  var pipeInterval = 1.5 * Phaser.Timer.SECOND;
    game.time.events.loop(pipeInterval, generatepipe);
  var phaseInterval = 6 * Phaser.Timer.SECOND;
    game.time.events.loop(phaseInterval, generatephase);
  splashDisplay.destroy();
  thingy.destroy();
  showweird.destroy();
  game.input.keyboard.addKey(Phaser.Keyboard.ENTER).onDown.remove(start);
  game.input.keyboard.addKey(Phaser.Keyboard.DOWN).onDown.remove(start);
}
/*
 * Initialises the game. This function is only called once.
 */
function create(){
  game.stage.setBackgroundColor("#000000");
  game.add.text(60,20,"Score",{font: "30px Arial", fill: "#ffffff"});
  showscore=game.add.text(60,60,"0",{font: "30px comic sans ms", fill: "#ffffff"});
  thingy=game.add.text(60,120,"Weirdness (WASD to modify)",{font: "30px Arial", fill: "#ffffff"});
  showweird=game.add.text(60,160,"0",{font: "30px comic sans ms", fill: "#ffffff"});
  showweird.setText(pn.toString());
  player=game.add.sprite(100,200,"playerImg");
  splashDisplay = game.add.text(100,50, "Press ENTER to start, SPACEBAR to jump and RIGHT to activate the star powerup",
  {font: "20px Ariel", fill: "#ffffff"});
  game.input.keyboard.addKey(Phaser.Keyboard.W).onDown.add(incweird10);
  game.input.keyboard.addKey(Phaser.Keyboard.S).onDown.add(decweird10);
  game.input.keyboard.addKey(Phaser.Keyboard.D).onDown.add(incweird1);
  game.input.keyboard.addKey(Phaser.Keyboard.A).onDown.add(decweird1);
  game.input.keyboard.addKey(Phaser.Keyboard.ENTER).onDown.add(start);
    // set the background colour of the scene
}
function decweird10(){
  pn = pn - 10;
  po = pn/100;
  showweird.setText(pn.toString());
}
function incweird10(){
  pn = pn + 10;
  po = pn/100;
  showweird.setText(pn.toString());
}
function incweird1(){
  pn = pn + 1;
  po = pn/100;
  showweird.setText(pn.toString());
}
function decweird1(){
  pn = pn - 1;
  po = pn/100;
  showweird.setText(pn.toString());
}
function start2() {
  po = 1;
  var pvi = 1.5;
  pne = 15;
  game.input.keyboard.addKey(Phaser.Keyboard.DOWN).onDown.remove(start2);
  start();
}

/*
 * This function updates the scene. It is called for every new frame.
 */
function update() {
  game.physics.arcade.overlap(player,pipes,GameOver);
  if (player.y<0 || player.y>350) {
    phasing = 0;
    score = -3;
    phased = 0;
    po = 0;
    pne = 0;
    game.state.restart();
  }
  if (phasing===0) {
    game.physics.arcade.overlap(player,thing,phasepower);
  }
}
function GameOver() {
  if (phased===0) {
    phasing = 0;
    score = -3;
    po = 0;
    pne = 0;
    game.state.restart();
  }
}
function clicked(event) {
  game.add.text(event.x-45,event.y-20,"T",{font: "30px comic sans ms", fill: "#ff3300"});
  game.add.text(event.x-30,event.y-20,"e",{font: "30px comic sans ms", fill: "#ff9933"});
  game.add.text(event.x-15,event.y-20,"s",{font: "30px comic sans ms", fill: "#ffff00"});
  game.add.text(event.x,event.y-20,"t",{font: "30px comic sans ms", fill: "#99ff33"});
  game.add.text(event.x+15,event.y-20,"i",{font: "30px comic sans ms", fill: "#00ffff"});
  game.add.text(event.x+25,event.y-20,"n",{font: "30px comic sans ms", fill: "#9933ff"});
  game.add.text(event.x+40,event.y-20,"g",{font: "30px comic sans ms", fill: "#6600cc"});
}
function spaced(event) {
  game.play.sound("score");
}
function incscore() {
  score=score+1;
  if (score>0) {
    showscore.setText(score.toString());
  }
}
function phasepower() {
  if (phasing===0, phased != 1){
  phasing = 1;
  powerstar=game.add.sprite(10,10,"star");
  powerstar.width=50;
  powerstar.height=50;
}
}
function phasethru() {
  if (phasing == 1){
    phased = 1;
    phasing = 0;
    game.add.tween(powerstar).to( { alpha: 0 }, 3000, Phaser.Easing.Linear.None, true);
    phasevar = setTimeout(unphase,3000);
  }
}
function unphase() {
  phased = 0;
}
function generatephase() {
    var randgen = game.rnd.integerInRange(1,4-phasing);
    if(randgen==4){
      var randx = game.rnd.integerInRange(50,200);
      var randy = game.rnd.integerInRange(100,300);
      addphase(1000+randx,randy);
    }
}
function addphase(x,y) {
  var phase = game.add.sprite(x,y,"star");
  thing.push(phase);
  game.physics.arcade.enable(phase);
  phase.body.velocity.x=-200;
}
function decscore() {
  score=score-1;
  showscore.setText(score.toString());
}
function killed() {
  player.kill();
}
function mr() {
  player.x=player.x+10;
}
function ml() {
  player.x=player.x-10;
}
function mu() {
}
function md() {
  player.y=player.y+10;
}
function generatepipe() {
    var randadd = game.rnd.integerInRange(-50,50);
    var randgap = game.rnd.integerInRange(3,6);
    for(var count = 0; count < 10; count++) {
      if(count != randgap && count != randgap-1 && count != randgap+1) {
        addpipe(1000,count*50+randadd-50);
    }
    else if (count == randgap-1) {
      addend(998,count*50+randadd-50);
    }
    else if (count == randgap+1) {
      addend(998,count*50 + 38+randadd-50);
    }
  }
  incscore();
}
function addpipe(x,y) {
  var randudd = game.rnd.integerInRange(-100,100)*po;
  var randudd2 = game.rnd.integerInRange(-100,100)*po;
  var block = game.add.sprite(x,y,"pipeblock");
  pipes.push(block);
  game.physics.arcade.enable(block);
  block.body.velocity.x=-200+randudd;
  block.body.velocity.y=randudd2;
}
function playerjump() {
    player.body.velocity.y=-175;
  }
function addend(x,y) {
  var randedd = game.rnd.integerInRange(-100,100)*po;
  var randedd2 = game.rnd.integerInRange(-100,100)*po;
  var pipeend = game.add.sprite(x,y,"pipeend");
  pipes.push(pipeend);
  game.physics.arcade.enable(pipeend);
  pipeend.body.velocity.x=-200+randedd;
  pipeend.body.velocity.y=randedd2;
}
