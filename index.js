var bpm = 100
var toque = 1000/bpm*60
var quarta = toque/4

var player = [0,0]
var actionList = []
var imgs = function(pos) {
    const parado = new Image()
    parado.src = "./cabaleiro-1.png"
    parado.onload = function() {
        ctx.drawImage(parado, pos, 140);
    };
}

const canvas = document.getElementById('canvas')
var ctx = canvas.getContext('2d')
ctx.fillStyle = "#fff"

ctx.fillRect(player[1],140,30,40)
ctx.font = "10px Arial";
ctx.fillText(actionList, 10, 214);

document.addEventListener('keydown', (event)=>{
    const keys = ["a","d","j","k","l"]
    for (i in keys) {
        if (keys[i] == event.key.toLowerCase()) {
            actionList.push(event.key)

            ctx.clearRect(0,210,8000,8000)
            ctx.fillText(actionList, 10, 214);
        }
    }
    // console.log(actionList)
})

function loop() {
    if (actionList.length > 0) {
        console.log(actionList[0])
        ctx.clearRect(0,0,8000,8000)
        move(actionList[0])
        console.log(player)
        imgs(player[1])
        // ctx.fillRect(player[1],140,30,40)
        ctx.font = "10px pixel";
        actionList = actionList.slice(1,actionList.length)
        ctx.fillText(actionList, 10, 214);
    }
    setTimeout(loop, 1000/bpm*60)
}

function move(key) {
    const moves = {
        a() {
            console.log("aaa")
            player[1] -= 30
        },
        d() {
            player[1] += 30
        },
        g() {
            canvas.width = 800
        }
    }
    
    const pleh = moves[key.toLowerCase()]
    if (pleh) {
        pleh()
    }
    if (key.toLowerCase() == "f" && player[1] < 246) {
        player[1] += 50
    }

}

function updateBPM(newBPM) {
    bpm = newBPM
    toque = 1000/bpm*60
    quarta = toque/4
}


loop()