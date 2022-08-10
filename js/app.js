const startBtn = document.getElementById('startBtn');
const darkScreen = document.getElementById("darkScreen");

startBtn.onclick = ()=> {
    setTimeout(()=> {
        startBtn.style.zIndex = 
        darkScreen.style.opacity = "1";
        setTimeout(()=> {
            startBtn.style.display ="none";
            setTimeout(()=> {
                window.location.href = 'https://www.youtube.com/watch?v=dQw4w9WgXcQ';
            }, 100)
        }, 100)
    }, 1400)
    startBtn.src = "animations/btn-anim.gif"
}