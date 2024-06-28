score = 0;
cross = true;

audio = new Audio("music.mp3");
audiogo = new Audio("gameover.mp3");
setTimeout(() => {
    audio.play();  
}, 1000);
document.onkeydown = function(e) {
    console.log("Key is pressed: ", e.key);

    let dino = document.querySelector(".dino");
    if (!dino) {
        console.log("Dino element not found");
        return;
    }

    if (e.key === "ArrowUp") {
        console.log("Dino element: ", dino);
        dino.classList.add("animateDino");
        console.log("Dino is animating");

        setTimeout(() => {
            dino.classList.remove("animateDino");
            console.log("Dino animation removed");
        }, 700);
    }

    if (e.key === "ArrowRight") {
        let dinoX = parseInt(window.getComputedStyle(dino, null).getPropertyValue("left"));
        dino.style.left = (dinoX + 150) + "px";
        console.log("Dino moved right");
    }
    if (e.key === "ArrowLeft") {
        let dinoX = parseInt(window.getComputedStyle(dino, null).getPropertyValue("left"));
        dino.style.left = (dinoX - 150) + "px";
        console.log("Dino moved left");
    }
};


setInterval(()=> {
    dino = document.querySelector(".dino")
    gameOver = document.querySelector(".gameOver");
    obstacle = document.querySelector(".obstacle");

    dx = parseInt(window.getComputedStyle(dino,null).getPropertyValue("left"));
    dy = parseInt(window.getComputedStyle(dino,null).getPropertyValue("top"));

    ox = parseInt(window.getComputedStyle(obstacle,null).getPropertyValue("left"));
    oy = parseInt(window.getComputedStyle(obstacle,null).getPropertyValue("top"));

    offsetX = Math.abs(dx-ox);
    offsetY = Math.abs(dy-oy);
    //console.log(offsetX,offsetY);
    if(offsetX<113 && offsetY<52){
        gameOver.innerHTML = "Game Over - Reload to start over";
        obstacle.classList.remove("obstacleAni");
        audiogo.play();
        setTimeout(() => {
            audiogo.pause();
            audio.pause(); 
        }, 1500);
    }
    else if(offsetX < 145 && cross){
        score+=1;
        updateScore(score);
        cross = false;
        setTimeout(() =>{
            cross = true;
        },1000);
        setTimeout(() => {
            aniDur = parseFloat(window.getComputedStyle(obstacle,null).getPropertyValue("animation-duration"));
            newDur = aniDur - 0.1;
            obstacle.style.animationDuration = newDur + 's';       
            console.log("New animation Duration", newDur)  
        }, 500);
    }
}, 10);

function updateScore(score){
    scoreCont.innerHTML = "Your score: " + score;
} 