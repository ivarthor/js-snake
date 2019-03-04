// næ í elemntið og contextið
const cvs = document.getElementById("game");
const ctx = cvs.getContext("2d");

// constant sem ég nota sem stærð
const box = 32;

// bý til snákinn
let snake = []
snake[0] = {
    x : 9 * box,
    y : 10 * box
}
// bý til stigin
let point = {
    x : Math.floor(Math.random()*17+1) * box,
    y : Math.floor(Math.random()*15+3) * box
}
// bý til stigatalninguna
let score = 0;

let d;

// læt forritið fylgjast með tökkunum
document.addEventListener("keydown",direction);

// finn út stefnuna sem notandinn vill
function direction(e) {
    if (e.keyCode == 37 && d != "RIGHT") {
        d = "LEFT";
    }else if (e.keyCode == 38 && d != "DOWN") {
        d = "UP";
    }else if (e.keyCode == 39 && d != "LEFT") {
        d = "RIGHT";
    }else if (e.keyCode == 40 && d != "UP") {
        d = "DOWN";
    }
}

// fall sem kíkjir hvort snákurinn er búinn að klessa á sjálfan sig
function collision(head,array) {
    for (let i = 0; i < array.length; i++) {
        if (head.x == array[i].x && head.y == array[i].y){
            return true;
        }
    }
    return false;
}
// aðal fallið sem teiknar allt á skjáinn
function draw() {
    // bakgrunnurinn
    ctx.fillStyle = "yellow";
    ctx.strokeStyle = "black";
    ctx.fillRect( box, box, 17 * box, 17 * box);
    ctx.strokeRect( box, box, 17 * box, 17 * box);
    
    // teikna snákinn
    for (let i = 0; i < snake.length; i++) {
        ctx.fillStyle = "green";
        ctx.fillRect(snake[i].x,snake[i].y,box,box);
        ctx.strokestyle = "blue";
        ctx.strokeRect(snake[i].x,snake[i].y,box,box); 
    }
    // teikna stigin
    ctx.fillStyle = "rgb(255,0,0)";
    ctx.strokeStyle = "rgb(255,20,0)";
    ctx.fillRect(point.x, point.y, box, box);
    
    // bý til breytur fyrir x og y af snáka hausinum
    let snakeX = snake[0].x;
    let snakeY = snake[0].y;
    
    // færi snákinn eftir því hvaða takka var ýtt á
    if(d == "LEFT") snakeX -= box;
    if(d == "UP") snakeY -= box;
    if(d == "RIGHT") snakeX += box;
    if(d == "DOWN") snakeY += box;

    // ef snákurinn nær stigi þá er ekki tekið part af honum
    if (snakeX == point.x && snakeY == point.y){
        // hækkað stigatalninguna
        score++;
        // búið til nýtt stig
        point = {
            x : Math.floor(Math.random()*17+1) * box,
            y : Math.floor(Math.random()*15+3) * box
        }
    // ef snákurinn nær ekki stigi þá er tekið part af honum
    }else {
        snake.pop();
    }
    // bý til nýjan haus
    let newHead = {
        x : snakeX,
        y : snakeY
    }
    // leikurinn endar ef snákurinn fer í vegginna eða fer í sig sjálfann
    if (snakeX < box || snakeX > 17*box || snakeY < 3/box|| snakeY > 17*box || collision(newHead,snake)) {
        clearInterval(game);
    }

    // sett nýja hausinn í snake array-ið hvert interval
    snake.unshift(newHead);

    // stiga taflan
    ctx.fillStyle = "black";
    ctx.font = "45px changa one";
    ctx.fillText(score,2*box,1.6*box);
}

// bý til interval sem draw function-ið refresh-ast á
let game = setInterval(draw,100);