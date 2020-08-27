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

function keyboard(value) {
        let key = {};
        key.value = value;
        key.isDown = false;
        key.isUp = true;
        key.press = undefined;
        key.release = undefined;
        //The `downHandler`
        key.downHandler = event => {
            if (event.key === key.value) {
            if (key.isUp && key.press) key.press();
            key.isDown = true;
            key.isUp = false;
            event.preventDefault();
            }
        };

        //The `upHandler`
        key.upHandler = event => {
            if (event.key === key.value) {
            if (key.isDown && key.release) key.release();
            key.isDown = false;
            key.isUp = true;
            event.preventDefault();
            }
        };

        //Attach event listeners
        const downListener = key.downHandler.bind(key);
        const upListener = key.upHandler.bind(key);
        
        window.addEventListener(
            "keydown", downListener, false
        );
        window.addEventListener(
            "keyup", upListener, false
        );
        
        // Detach event listeners
        key.unsubscribe = () => {
            window.removeEventListener("keydown", downListener);
            window.removeEventListener("keyup", upListener);
        };
        
        return key;
}

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
    // tempo += Math.round(delta)
    // VR += delta/60
    
        // setInterval(()=>{
            //     console.log(Math.round(delta))
            // }, 1000)
    tempo += delta/60
    if (tempo >= VR) {
        player.x += 30
        tempo = 0
    }
    if (player.x > 270) {
        player.x = 0
    }
}