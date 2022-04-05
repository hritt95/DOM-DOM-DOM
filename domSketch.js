// Used parent to place the canvas
//Used createElement to create elements with P5
// Used style with elements to add styles with P5
//Used value function to get the value of the radio buttons
let backgroundColor;
function setup() {
    createCanvas(800, 500).parent("gamecanvas");
    backgroundColor = color(46, 26, 71);
    //Style the game container 
    let gameInfo = select("#gameInfo");
    gameInfo.style("width", "800px");

    // Styled the Scores Section 

    let scoreDiv = select("#scores");
    scoreDiv.style("display", "flex",);
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
    let highScoreSpan= createElement("span", "0");
    highScoreSpan.style("margin-left", "10px");
    scoreSpan.parent("score");
    highScoreSpan.parent("highScore");

    //Add event listener to the radio buttons 
    let darkInput = select("#dark");
    let lightInput = select("#light");
    darkInput.mouseClicked(changeMode);
    lightInput.mouseClicked(changeMode);

}

function changeMode(event){
//console.log(event.target.id);
let value = select("#"+event.target.id).value();
if(value == "dark"){
    backgroundColor = color(46, 26, 71)
}else{
    backgroundColor = color(189,176,208);
}
}

function draw() {
    background(backgroundColor);
}

// Javscript not on canvas 