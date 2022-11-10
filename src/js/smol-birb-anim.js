const birb = document.getElementById('smol-birb');

let facingRight = true;

let count = 1
const callback = () => {
        requestAnimationFrame (()=> {
            if(facingRight == true) {
                if(count == 106) {
                    facingRight = false;
                    birb.style.transform = "rotate3d(0, 0, 0, 0deg)"
                    callback()
                } else {
                birb.style.translate = `calc(${count} * 10px)`
                count++
                callback()
                }
            } else if(facingRight == false) {
                if(count == -1) {
                    facingRight = true;
                    birb.style.transform = "rotate3d(0, 1, 0, 180deg)"
                    callback()
                } else {
                birb.style.translate = `calc(${count} * 10px)`
                count--
                callback()
                }
            }
            
        })
} 

callback();