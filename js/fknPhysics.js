const gravity = 0.6;
const speed = 12;
const jumpForce = 16;
const impulse = 0.5;
const ctrlelem = document.getElementById('controls')
var ctrlShown = false
var attacking = false;
var moveLock = false;

//--------------------------------ENTT------------------------------

var player = {
    elem: document.getElementById("player"),
    h:225,
    w:100,
    x:100,
    y:590,
    vx:0,
    vy:0,
    rolling:false,
    facingRight:true,
    invincible:false,
    atk: {
        w: 200,
        h: 100,
        dmg: 2
    },
    hp: 100,
    hpElem: document.getElementById('player-hp')
} 

player.elem.style.width = player.w + "px"
player.elem.style.height = player.h + "px"

var enemy = {
    elem: document.getElementById("enemy"),
    type: document.getElementById("enemy").getAttribute('enemy'),
    vx: 0,
    vy: 0,
    atk : {
        dmg: 0
    },
    facingRight: false,
    invincible:false,
    impres:true,
    hp: 100,
    hpElem: document.getElementById('enemy-hp')
}

//------------------------ENEMIES--------------------------------------

if (enemy.type == 'dummy') {
    enemy.h = 225;
    enemy.w = 100;
    enemy.x = 900;
    enemy.y = 590;
    enemy.hurtMultiplayer = 5;
    enemy.atk.dmg = 1;
}

if (enemy.type == 'first') {
    enemy.h = 225;
    enemy.w = 100;
    enemy.x = 1700;
    enemy.y = 590;
    enemy.hurtMultiplayer = 5;
    enemy.atk.dmg = 15;
}

//----------------------not enemies---------------------------

enemy.elem.style.width = enemy.w + "px"
enemy.elem.style.height = enemy.h + "px"

function callback() {
requestAnimationFrame(()=>{
        if (attacking == true && player.x + player.atk.w >= enemy.x && player.x + player.atk.w <= enemy.x + enemy.w + player.atk.w && player.y >= enemy.y - player.w && enemy.invincible == false && player.facingRight == true || attacking == true && player.x + player.atk.w >= enemy.x + player.atk.w - enemy.w && player.x + player.atk.w <= enemy.x + player.atk.w *2&& player.y >= enemy.y - 100 && enemy.invincible == false && player.facingRight == false) {
            attacking = false
            enemy.hp -= player.atk.dmg * enemy.hurtMultiplayer;
            enemy.invincible = true;
            enemy.elem.classList.add("inv")
            setTimeout(()=>{
                enemy.invincible = false
                enemy.elem.classList.remove('inv')
            }, 500)
        }

        if (player.x + player.w >= enemy.x && enemy.x + enemy.w >= player.x && player.y >= enemy.y - enemy.h && player.invincible == false && player.rolling == false) {
            moveLock = true;
            player.hp -= enemy.atk.dmg;
            player.vy = -15;
            if (player.facingRight) {
                player.vx = -10;
            } else {
                player.vx = 10;
            }
            player.invincible = true;
            player.elem.classList.add("inv")
            setTimeout(()=>{
                moveLock = false;
                player.invincible = false
                player.elem.classList.remove('inv')
            }, 500)
        }

        if (enemy.hp == 0) {
            alert("Poor guy")
            enemy.elem.remove()
        }
        
        if (player.hp == 0) {
            alert("Lol You're dead")
            player.elem.remove();
        }

        player.hpElem.style.width = player.hp + "%"
        enemy.hpElem.style.width = enemy.hp + "%"

        player.elem.style.left = player.x + 'px'
        player.elem.style.top = player.y + 'px'

        player.x += player.vx
        player.y += player.vy

        if(player.y + player.h + player.vy <= 889) {
            player.vy += gravity
        } else {
            player.vy = 0
        }

        enemy.elem.style.left = enemy.x + 'px'
        enemy.elem.style.top = enemy.y + 'px'

        enemy.x += enemy.vx
        enemy.y += enemy.vy

        if(enemy.y + enemy.h + enemy.vy <= 889) {
            enemy.vy += gravity
            enemy.impres = true;
        } else {
            enemy.vy = 0
        }

        if(keys.right.pressed && moveLock == false) {
            player.vx = speed
            player.elem.classList.remove('facingLeft')
        } else if(keys.left.pressed && moveLock == false) {
            player.vx = speed * -1
            player.elem.classList.add('facingLeft')
        } else if (keys.right.pressed == false && keys.left.pressed == false && moveLock == false){
            player.vx = 0
        }

        callback()
    }
)}

//------------------------------------------------------------

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
            case 69:
                if(moveLock == false) {
                    attacking = true
                    player.elem.innerHTML = "<div class='atk'></div>"
                    document.querySelector(".atk").style.width = player.atk.w + "px"
                    document.querySelector(".atk").style.height = player.atk.h + "px"
                    setTimeout(()=>{
                        attacking = false
                        player.elem.innerHTML = ""
                    }, 150)
                }
                break
            case 37:
            case 65:
                keys.left.pressed = true
                player.facingRight = false
                break
            
            case 39:
            case 68:
                keys.right.pressed = true
                player.facingRight = true
                break

            case 38:
            case 32:
            case 87:
                if (player.y + player.h + player.vy >= 889) {
                    player.vy -= jumpForce
                }
                break
            
            case 16:
                if(player.rolling == false && moveLock == false) {
                    player.invincible = true;
                    player.rolling = true;
                    moveLock = true;
                    player.elem.classList.add('rolling')
                    if (player.facingRight) { 
                        player.vx = 20
                    } else if (player.facingRight == false) {
                        player.vx = -20
                    }
                    setTimeout(()=>{
                        player.elem.classList.remove('rolling')
                        moveLock = false;
                        player.rolling = false
                        player.invincible = false;
                    }, 600) 
                }
                break
        }
})

document.addEventListener("keyup", ({keyCode}) => {
    switch (keyCode) {
        case 37:
        case 65:
            keys.left.pressed = false;
            break

        case 39:
        case 68:
            keys.right.pressed = false;
            break
    }
})

//-------------------Artificial-Intelegence------------------
//How do am I going to make artificial intelegence, when I'm to unintelegent to spell intelegance

