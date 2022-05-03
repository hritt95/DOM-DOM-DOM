// Used parent to place the canvas
//Used createElement to create elements with P5
// Used style with elements to add styles with P5
//Used value function to get the value of the radio buttons
let backgroundColor;
let playerXpos;
let lasers;
let enemies;
let round;
let gameIsLive;
let playerScore;
let enemiesRemaining;
let lastFired;
let livesLeft;
let fade;

function setup() {
    createCanvas(800, 500).parent("gamecanvas");
    backgroundColor = color(46, 26, 71);
    gameIsLive = false;
    round = 1;
    playerXpos = 370;

    lasers = [];

    enemies = [];

    playerScore = 0;

    enemiesRemaining = 0;

    lastFired = second();

    livesLeft = 3;

    fade = 0

    //Style the game container
    let gameInfo = select("#gameInfo");
    gameInfo.style("width", "800px");

    // Styled the Scores Section 

    let scoreDiv = select("#scores");
    scoreDiv.style("display", "flex", );
    scoreDiv.style("padding", "10px")
    scoreDiv.style("justify-content", "space-between");

    //Create a div for the score & livesLeft

    let scoreAndLives = createElement("div");
    let livesLeftDiv = createElement("div", "Lives Left: " + livesLeft);
    livesLeftDiv.id("livesLeft");
    scoreAndLives.id("livesScore");



    //Create H3 for the score and highscore and append using parent

    let score = createElement("h3", "Score:");
    score.id("score");
    score.parent("livesScore");
    livesLeftDiv.parent("livesScore");
    scoreAndLives.parent("scores");
    let highScore = createElement("h3", "High Score:");
    highScore.id("highScore");
    highScore.parent("scores");

    //Create and style span elements for the scores
    let scoreSpan = createElement("span", playerScore);
    scoreSpan.id("playerScore");
    scoreSpan.style("margin-left", "10px");
    let highScoreSpan = createElement("span", loadHighScore());
    highScoreSpan.style("margin-left", "10px");
    scoreSpan.parent("score");
    highScoreSpan.parent("highScore");

    //Add event listener to the radio buttons 
    let darkInput = select("#dark");
    let lightInput = select("#light");
    darkInput.mouseClicked(changeMode);
    lightInput.mouseClicked(changeMode);

}

function changeMode(event) {
    //console.log(event.target.id);
    let value = select("#" + event.target.id).value();
    if (value == "dark") {
        backgroundColor = color(46, 26, 71)
        select("#container").style("background-color", "#282C2F");
        select("#container").style("color", "white");

    } else {
        backgroundColor = color(189, 176, 208);
        select("#container").style("background-color", "#D6D6D7");
        select("#container").style("color", "black");
    }
}

function defineCharacter(x_pos) {
    push()
    fill(214, 214, 215);
    stroke(40, 44, 47);

    beginShape(TRIANGLE_STRIP);
    vertex(x_pos, height);
    vertex(x_pos + 10, 480);
    vertex(x_pos + 20, height);
    vertex(x_pos + 30, 440);
    vertex(x_pos + 40, height);
    vertex(x_pos + 50, 480);
    vertex(x_pos + 60, height);
    endShape();
    pop()
}

function keyPressed() {
    console.log('keyPressed')
    if (keyCode === LEFT_ARROW) {
        playerXpos = playerXpos >= 30 ? playerXpos - 30 : playerXpos
    } else if (keyCode === RIGHT_ARROW) {
        playerXpos = playerXpos <= 720 ? playerXpos + 30 : playerXpos

    } else if (keyCode == "32") {
        console.log("spacePressed");
        if (gameIsLive) {
            console.log("gamesIsLive")
            lasers.push({
                x: playerXpos + 30,
                y: 440,
                hit: false
            })
        }
    } else if (keyCode == ENTER && gameIsLive == false) {
        console.log("enterPressed")
        startRound()
        gameIsLive = true;

    }

}

function saveHighScore() {
    //check the current high score
    let currentHighScore = localStorage.getItem("starShooterScore");
    if (currentHighScore != null) {
        console.log("score", playerScore)
        console.log("currentHighScore", currentHighScore)
        if (playerScore > Number(currentHighScore)){
            localStorage.setItem("starShooterScore", playerScore)
            alert("Congrat you got the high score!")
        }
    } else {
        localStorage.setItem("starShooterScore", playerScore)
        alert("Congrat you got the high score!")
    }
}

function loadHighScore(){
    let currentHighScore = localStorage.getItem("starShooterScore");
    if( currentHighScore != null){
        return currentHighScore;
    }
    return 0

}
function drawPlayerLasers() {
    for (i = 0; i < lasers.length; i++) {
        if (lasers[i].hit == false) {
            push()
            stroke(139, 0, 0);
            strokeWeight(5);
            line(lasers[i].x, lasers[i].y - 20, lasers[i].x, lasers[i].y);
            pop()
        }

        lasers[i].y -= 2;
    }
}

function startGame() {
    startRound();
    drawPlayerLasers();
    addEnemyLasers();
    drawEnemies();
}

function startRound() {
    enemiesRemaining = round;
    for (let i = 0; i < round; i++) {
        enemies.push({
            x: 30 + (i * 100),
            y: 50,
            hit: false,
            movingRight: true,
            movingLeft: false,
            leftLimit: (i * 100) - 70,
            rightLimit: (i * 100) + 130,
            lasers: [],
        })
    }
}

function endRound() {
    if (enemiesRemaining == 0) {
        round += 1;
        startRound();

    }
}

function drawEnemies() {
    for (i = 0; i < enemies.length; i++) {
        if (enemies[i].hit == false) {
            push()
            fill(0);
            circle(enemies[i].x, enemies[i].y, 30);
            pop()
            let enemy = enemies[i];
            for (let j = 0; j < enemy.lasers.length; j++) {
                let enemyLaser = enemy.lasers[j];
                if (enemyLaser.hit == false) {
                    push()
                    stroke(0, 255, 0);
                    strokeWeight(5);
                    line(enemyLaser.x, enemyLaser.y, enemyLaser.x, enemyLaser.y + 20);
                    pop()
                    enemyLaser.y += 2;
                }
            }
        }
        if (enemies[i].movingRight == true) {
            enemies[i].x += 3
        } else {
            enemies[i].x -= 3
        }
        if (enemies[i].x < enemies[i].leftLimit) {
            enemies[i].movingRight = true
            enemies[i].movingLeft = false
        }
        if (enemies[i].x > enemies[i].rightLimit) {
            enemies[i].movingRight = false
            enemies[i].movingLeft = true
        }
    }
}

function checkEnemiesHit() {
    const unhitEnemies = enemies.filter(function (enemy) {
        return enemy.hit == false
    })
    const unhitLasers = lasers.filter(function (laser) {
        return laser.hit == false
    })
    for (let i = 0; i < unhitLasers.length; i++) {
        const laser = unhitLasers[i]
        const laserTop = laser.y - 20
        for (let j = 0; j < unhitEnemies.length; j++) {
            const enemy = unhitEnemies[j]
            const enemyLeft = enemy.x - 15
            const enemyRight = enemy.x + 15
            const enemyTop = enemy.y - 15
            const enemyBottom = enemy.y + 15
            if ((laser.x > enemyLeft && laser.x < enemyRight) && (laserTop > enemyTop && laserTop < enemyBottom)) {
                enemy.hit = true
                laser.hit = true
                playerScore += 1
                select("#playerScore").html(playerScore)
                enemiesRemaining -= 1

            }
        }

    }




}

function checkPlayerHit() {
    for (i = 0; i < enemies.length; i++) {
        let enemy = enemies[i];
        for (j = 0; j < enemy.lasers.length; j++) {
            let enemyLaser = enemy.lasers[j];
            if ((enemyLaser.x > playerXpos && enemyLaser.x < playerXpos + 60) && (enemyLaser.y + 20 > 440 && enemyLaser.y < height) && enemyLaser.hit == false) {
                livesLeft -= 1
                select("#livesLeft").html("Lives Left: " + livesLeft);
                enemyLaser.hit = true
                console.log("livesLeft", livesLeft);
            }
        }

    }
}

function checkGameOver() {
    if (livesLeft < 1) {
        console.log("gameover")
        if (fade < 255) {
            push()
            textSize(60);
            fill(255, 0, 0, fade);
            text("GAME OVER", 200, 200);
            pop()
            fade += 10
        } else {
            push()
            textSize(60);
            fill(255, 0, 0, fade);
            text("GAME OVER", 200, 200);
            pop()
            saveHighScore()
            let playAgain = confirm("Do you want to play again?");
            if (playAgain == true){
                location.reload();
            }
            noLoop();
        }
        

    }
}

function addEnemyLasers() {
    for (let i = 0; i < enemies.length; i++) {
        let enemy = enemies[i];
        if (enemy.hit == false) {
            enemy.lasers.push({
                x: enemy.x,
                y: enemy.y + 15,
                hit: false
            })

        }


    }
}


function draw() {
    background(backgroundColor);
    defineCharacter(playerXpos);
    if (gameIsLive === true) {

        drawEnemies();
        drawPlayerLasers();
        checkEnemiesHit();
        checkPlayerHit();
        checkGameOver();
        endRound();
        if (second() - lastFired >= 2) {
            addEnemyLasers();
            lastFired = second();
        }

    }

}




// Javscript not on canvas 


// add sound effects 

// add High Score
// Display prompt for initals for aftergame over 
// When the game loads grab the high scores form local storage 
// Show the hgighest score