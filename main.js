var tempo = 0
var VR = 60/120
var actionList= []
let player,state 
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

const sprites = [
    "./cabaleiro-1.png",
    "./cabaleiro-2.png",
]
PIXI.loader
.add(sprites)
.on("progress", loadProgressHandler)
.load(setup);

document.addEventListener('keydown', (event)=>{
    const keys = ["a","d","j","k","l"]
    for (i in keys) {
        if (keys[i] == event.key.toLowerCase() && actionList.length == 0) {
            actionList.push(event.key)
        }
    }
})

function loadProgressHandler(loader, resource) {
    console.log("loading: " + resource.url); 
    
    console.log("progress: " + loader.progress + "%"); 
}

function setup() {
    
    state = play
    player = new PIXI.Sprite(PIXI.loader.resources["./cabaleiro-1.png"].texture);
    enemy = new PIXI.Sprite(PIXI.loader.resources["./cabaleiro-1.png"].texture);
    
    app.stage.addChild(player);
    app.stage.addChild(enemy);
    enemy.scale.x = -1;
    player.x = 0
    player.y = 140

    enemy.x = 270-30
    enemy.y = 140

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
    if (player.texture.textureCacheIds[0] == "./cabaleiro-2.png") {
        player.texture = PIXI.loader.resources["./cabaleiro-1.png"].texture
    }
    if (actionList.length > 0) {
        move(actionList[0])
        
        actionList = actionList.slice(1,actionList.length)
    }
    if (player.x > 270) {
        player.x = 0
    }
}

function move(key) {
    const moves = {
        a() {
            player.x -= 30
        },
        d() {
            player.x += 30
        },
        j() {
            // app.view.fillRect(player.x+30,140,30,40)
            player.texture = PIXI.loader.resources["./cabaleiro-2.png"].texture
            Dano(player.x)
        }
    }
    
    const pleh = moves[key.toLowerCase()]
    if (pleh) {
        pleh()
    }
}

function Dano(pos) {
    if (pos+30 == enemy.x-30) {
        enemy.x += 30
    }
}