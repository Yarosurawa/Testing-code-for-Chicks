const menu = document.querySelector('.menu')

let isPaused = false

menu.classList.add('hidden')
menu.style.zIndex = "0"

function menuwindow( dead ) {
    if(dead) {
        isPaused = true
        menu.classList.remove('hidden')
        menu.style.zIndex = "9999"
    } else if (!dead && !isPaused){
        isPaused = true
    } else if (!dead && isPaused){
        isPaused = false
    }
}