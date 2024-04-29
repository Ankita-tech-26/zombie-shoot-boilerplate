
// Iteration 1: Declare variables required for this game
const gameBody = document.getElementById("game-body");
const livesDisplay = document.getElementById("lives");
const timerDisplay = document.getElementById("timer");
let remainingTime = parseInt(timerDisplay.textContent); // Parse initial time as integer
let zombieCount = 0;
const zombieImages = [
    "zombie-1.png",
    "zombie-2.png",
    "zombie-3.png",
    "zombie-4.png",
    "zombie-5.png",
    "zombie-6.png"
];
const maxLives = 4;
let lives = maxLives;
let escapedZombies = 0;

// Iteration 1.2: Add shotgun sound
const shotgunSound = new Audio("./assets/shotgun.wav");
shotgunSound.volume = 0.2;
gameBody.onclick = () => {
    shotgunSound.pause();
    shotgunSound.currentTime = 0;
    shotgunSound.play();
};

// Iteration 1.3: Add background sound
const backgroundMusic = new Audio("./assets/bgm.mp3");
backgroundMusic.play();
backgroundMusic.loop = true;

// Iteration 2: Write a function to make a zombie
function createZombie() {
    const randomImage = zombieImages[getRandomInt(0, zombieImages.length)];
    gameBody.innerHTML += `<img src="./assets/${randomImage}" class="zombie-image" id="zombie${zombieCount}">`;
    const zombie = document.getElementById("zombie" + zombieCount);
    zombie.style.transform = `translateX(${getRandomInt(20, 80)}vw)`;
    zombie.style.animationDuration = `${getRandomInt(2, 6)}s`;
    zombie.onclick = () => {
        destroyZombie(zombie);
    };
}
// Iteration 3: Write a function to check if the player missed a zombie
function checkCollision(zombie) {
    if (zombie.getBoundingClientRect().top < 0) {
        lives--;
        escapedZombies++;
        livesDisplay.textContent = lives;
        if (lives === 0 || escapedZombies >= maxLives) {
            endGame(false);
        }
        return true;
    }
    return false;
}
// Iteration 4: Write a function to destroy a zombie when it is shot or missed

function destroyZombie(zombie) {
    zombie.style.display = "none";
    zombieCount++;
    createZombie();
}

// Iteration 5: Creating timer
const gameTimer = setInterval(function (){
    remainingTime--; 
    timerDisplay.textContent = remainingTime;
    if (remainingTime === 0) {
        endGame(true);
    }
}, 1000);

// Iteration 6: Write a code to start the game by calling the first zombie
createZombie();


function endGame(isWin) {
    clearInterval(gameTimer);
    if (isWin) {
        location.href = "./win.html";
    } else {
        location.href = "./game-over.html";
    }
}

// Iteration 7: Write the helper function to get random integer
function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min)) + min;
}
