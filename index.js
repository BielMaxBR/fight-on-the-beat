const canvas = document.getElementById('canvas')
var ctx = canvas.getContext('2d')

ctx.fillStyle = "#fff"
var player = [0,0]

var actionList = []

document.addEventListener('keydown', (event)=>{
    actionList.push(event.key)
    // console.log(actionList)
})

function loop() {
    if (actionList.length > 0) {
        console.log(actionList[0])
        ctx.clearRect(0,0,8000,8000)
        move(actionList[0])
        console.log(player)
        ctx.fillRect(player[1],player[0],10,10)
        actionList = actionList.slice(1,actionList.length)
    }
    setTimeout(loop, 1000/120*60)
}

function move(key) {
    if (key.toLowerCase() == "w" && player[0] > 0) {
        player[0] -= 10
    }
    if (key.toLowerCase() == "a" && player[1] > 0) {
        player[1] -= 10
    }
    if (key.toLowerCase() == "s" && player[0] < 214) {
        player[0] += 10
    }
    if (key.toLowerCase() == "d" && player[1] < 246) {
        player[1] += 10
    }
}
loop()