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

function setup() {
    createCanvas(800, 500).parent("gamecanvas");
    backgroundColor = color(46, 26, 71);
    gameIsLive = false;
    round = 1;
    playerXpos = 370;

    lasers = [];

    enemies = [];

    //Style the game container
    let gameInfo = select("#gameInfo");
    gameInfo.style("width", "800px");

    // Styled the Scores Section 

    let scoreDiv = select("#scores");
    scoreDiv.style("display", "flex", );
    scoreDiv.style("padding", "10px")
    scoreDiv.style("justify-content", "space-between");

    //Create H3 for the score and highscore and append using parent

    let score = createElement("h3", "Score:");
    score.id("score");
    score.parent("scores");
    let highScore = createElement("h3", "High Score:");
    highScore.id("highScore");
    highScore.parent("scores");

    //Create and style span elements for the scores
    let scoreSpan = createElement("span", "0");
    scoreSpan.style("margin-left", "10px");
    let highScoreSpan = createElement("span", "0");
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
                y: 440
            })
        }

    }

}

function drawPlayerLasers() {
    for (i = 0; i < lasers.length; i++) {
        push()
        stroke(139, 0, 0);
        strokeWeight(5);
        line(lasers[i].x, lasers[i].y - 20, lasers[i].x, lasers[i].y);
        pop()
        lasers[i].y -= 2;
    }
}

function startGame() {
    startRound();
    drawPlayerLasers();
    drawEnemies();
}

function startRound() {
    for (let i = 0; i < round; i++) {
        enemies.push({
            x: 30 + (i * 100),
            y: 50,
            hit: false
        })
    }
}

function drawEnemies() {
    for (i = 0; i < enemies.length; i++) {
        if (enemies[i].hit == false) {
            push()
            fill(0);
            circle(enemies[i].x, enemies[i].y, 30);
            pop()
        }
    }
}

function checkEnemiesHit(){
//make arrays of unhit enemeies and unhit lasers
    //loop through the laser array
        //loop through the enemie's array 
        // check if the x and y pos of current enemey is the same  as x and y pos of current laser 
            // if yes then you hit the enemey so update it to be hit true and laser both should be true 
             // increae score on hit 
}

function draw() {
    background(backgroundColor);
    defineCharacter(playerXpos);
    if (gameIsLive === false) {
        startGame();
        gameIsLive = true;
    } else {
        drawEnemies();
        drawPlayerLasers();
    }

}



// Javscript not on canvas 


//track the user lives left 
// track the score 
// when the enemy his a user they lose a life 
// after every enemy hit check if there are no lives left 
//if no lives are let game is over 
//when user hist an enemy a point is given to a user 
// after every enemy is hit have to check how many points there are 
// If target points are reached win or go to next level 


//Need to think about make a function for the enemy lasers 
//