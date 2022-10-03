const gravity = 0.5;
const speed = 12;
const jumpForce = 16;
const impulse = 0.5;
const ctrlelem = document.getElementById('controls')
var ctrlShown = false
var attacking = false;

//--------------------------------ENTT------------------------------

var player = {
    elem: document.getElementById("player"),
    h:200,
    w:100,
    x:100,
    y:690,
    vx:0,
    vy:0,
    facingRight:true,
    invincible:false,
    atk: {
        w: 300,
        h: 100
    },
    hp: 100,
    hpElem: document.getElementById('player-hp')
} 

player.elem.style.width = player.w + "px"
player.elem.style.height = player.h + "px"

var enemy = {
    elem: document.getElementById("enemy"),
    h:200,
    w:100,
    x: 900,
    y: 690,
    vx: 0,
    vy: 0,
    ix: 0,
    facingRight: false,
    invincible:false,
    impres:true,
    hp: 100,
    hpElem: document.getElementById('enemy-hp')
}

enemy.elem.style.width = enemy.w + "px"
enemy.elem.style.height = enemy.h + "px"

function callback() {
requestAnimationFrame(()=>{
        if (attacking == true && player.x + player.atk.w >= enemy.x && player.x + player.atk.w <= enemy.x + 401 && player.y >= enemy.y - 100 && enemy.invincible == false && player.facingRight == true || attacking == true && player.x + player.atk.w >= enemy.x + 200 && player.x + player.atk.w <= enemy.x + 600&& player.y >= enemy.y - 100 && enemy.invincible == false && player.facingRight == false) {
            attacking = false
            enemy.hp -= 20;
        }

        if (enemy.hp == 0) {
            enemy.elem.remove()
        }

        player.hpElem.style.width = player.hp + "%"
        enemy.hpElem.style.width = enemy.hp + "%"

        player.elem.style.left = player.x + 'px'
        player.elem.style.top = player.y + 'px'

        player.x += player.vx
        player.y += player.vy

        if(player.y + player.h + player.vy <= 899) {
            player.vy += gravity
        } else {
            player.vy = 0
        }

        enemy.elem.style.left = enemy.x + 'px'
        enemy.elem.style.top = enemy.y + 'px'

        enemy.x += enemy.vx
        enemy.y += enemy.vy

        if(enemy.y + enemy.h + enemy.vy <= 899) {
            enemy.vy += gravity
            enemy.impres = true;
        } else {
            enemy.vy = 0
        }

        if(keys.right.pressed) {
            player.vx = speed
        } else if(keys.left.pressed) {
            player.vx = speed * -1
        } else if (keys.right.pressed == true && keys.left.pressed == true || keys.right.pressed == false && keys.left.pressed == false){
            player.vx = 0
        }

        callback()
    }
)}

//--------------------------------PLAYER----------------------------

var keys = {
    right: {
        pressed: false
    },
    left: {
        pressed: false
    }
}

callback()

document.addEventListener("keydown", ({keyCode}) => {
    switch (keyCode) {
        case 72:
            if(ctrlShown == false) {
                ctrlShown = true
                ctrlelem.style.display = "block"
            } else {
                ctrlShown = false
                ctrlelem.style.display = "none"
            }
            break
        case 90:
            attacking = true
            player.elem.innerHTML = "<div class='atk'></div>"
            if (player.facingRight == false) {
                document.querySelector('.atk').style.left = "-200px"
            }
            document.querySelector(".atk").style.width = player.atk.w + "px"
            document.querySelector(".atk").style.height = player.atk.h + "px"
            setTimeout(()=>{
                attacking = false
                player.elem.innerHTML = ""
            }, 150)
            break
        case 65:
            keys.left.pressed = true
            player.facingRight = false
            break
        
        case 83:
            console.log('down');
            break

        case 68:
            keys.right.pressed = true
            player.facingRight = true
            break

        case 32:
        case 87:
            if (player.y + player.h + player.vy >= 899) {
                player.vy -= jumpForce
            }
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

//--------------------------------ENEMY----------------------------