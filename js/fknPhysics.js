const gravity = 0.5;
var speed = 12;
var jumpForce = 16;

var player = {
    elem: document.getElementById("player"),
    h:200,
    w:100,
    x:100,
    y:100,
    vx:0,
    vy:0
} 

var keys = {
    right: {
        pressed: false
    },
    left: {
        pressed: false
    }
}

function callback() {
requestAnimationFrame(()=>{
        player.elem.style.left = player.x + 'px'
        player.elem.style.top = player.y + 'px'

        player.x += player.vx
        player.y += player.vy

        if(player.y + player.h + player.vy <= 899) {
            player.vy += gravityd
        } else {
            player.vy = 0
        }

        if(keys.right.pressed) {
            player.vx = speed
        } else if(keys.left.pressed) {
            player.vx = speed * -1
        } else {
            player.vx = 0
        }

        callback()
    }
)}

player.elem.style.width = player.w + "px"
player.elem.style.height = player.h + "px"

callback()

document.addEventListener("keydown", ({keyCode}) => {
    switch (keyCode) {
        case 65:
            keys.left.pressed = true
            break
        
        case 83:
            console.log('down');
            break

        case 68:
            keys.right.pressed = true
            break

        case 32 || 87:
            player.vy -= jumpForce
            break
    }
})

document.addEventListener("keyup", ({keyCode}) => {
    switch (keyCode) {
        case 65:
            keys.left.pressed = false;
            break
        
        case 83:
            console.log('down');
            break

        case 68:
            keys.right.pressed = false;
            break
    }
})