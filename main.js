let player,state 
var tempo = 0
var VR = 60/120
let Application = PIXI.Application,
loader = PIXI.loader,
resources = PIXI.loader.resources,
Sprite = PIXI.Sprite;


let app = new Application({ 
    width: 270, 
    height: 224,                       
    antialias: false, 
    transparent: false, 
    resolution: 1
}
);

document.body.appendChild(app.view);


PIXI.loader
.add("./cabaleiro-1.png")
.on("progress", loadProgressHandler)
.load(setup);



function loadProgressHandler(loader, resource) {
    console.log("loading: " + resource.url); 
    
    console.log("progress: " + loader.progress + "%"); 
}
function setup() {
    
    state = play
    player = new PIXI.Sprite(PIXI.loader.resources["./cabaleiro-1.png"].texture);
    
    app.stage.addChild(player);
    
    player.x = 0
    player.y = 140

    app.ticker.add(delta => gameLoop(delta));
}


function gameLoop(delta) {
   state(delta)
}

function play(delta) {
    tempo += delta/60
    if (tempo >= VR) {
        forBeat()
        tempo = 0
    }
}

function forBeat() {
    player.x += 30
    if (player.x > 270) {
        player.x = 0
    }
}