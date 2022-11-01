const menuDed = document.querySelector('.menu-ded'); const menu = document.querySelector('.menu')

let isPaused = false

menuDed.classList.add('hidden'); menu.classList.add('hidden');
menuDed.style.zIndex = "-1231231"; menu.style.zIndex = "-1231231"
menuDed.style.display = 'none'; menu.style.display = 'none'

function menuwindow(dead, win) {
    if(dead && !win) {
        isPaused = true
        menuDed.style.zIndex = "9999"
        menuDed.style.display = 'flex'
        menuDed.classList.remove('hidden')
    } else if (!dead && !isPaused && !win){
        menu.style.display = 'flex'
        menu.style.zIndex = "9999"
        requestAnimationFrame(()=>{menu.classList.remove('hidden')}) 
        isPaused = true
    } else if (!dead && isPaused && !win){
        menu.classList.add('hidden');
        setTimeout(()=>{
            menu.style.zIndex = "-1231231"
            menu.style.display = 'none'
        }, 300)
        isPaused = false
    }
    if (win) {
        alert("good job, moi-deer. Now get the heck out of here")
        isPaused = true;
        setTimeout(()=>{window.location.href = "../html/level-chose.html"})
    }
}