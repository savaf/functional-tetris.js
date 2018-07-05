/**
 * Main Clousure
 * @author Sinver Aguilo <sinveraguilo@gmail.com>
 */
import figures from './figures';
import colors from './colors';
import * as utils from './utils';

const canvas = document.getElementById('tetris');
const context = canvas.getContext('2d');
const bgColor = 'black';
const matrix = [
    [0, 1, 0],
    [0, 1, 0],
    [0, 1, 1]
];
const playerDefault = {
    position: { x: 0, y: 0},
    shape: matrix,
    speed: 1,
};
const player = {...playerDefault};
context.scale(20, 20);

function clear() {
    context.fillStyle = bgColor;
    context.fillRect(0, 0, canvas.width, canvas.height);
}

function createShape(width = 0, height = 0) {
    const shape = [];
    while (height -= 1) {
        shape.push(new Array(width).fill(bgColor));
    }
    return shape;
}

function playerMove(distance) {
    player.position.x += distance;
}

function playerDrop() {
    player.position.y += Math.abs(player.speed);
    if (colide(arena, player)) {
        player.position.y -= 1;
        merge(arena, player);
        player.position.y = 0;
    }
    dropCounter = 0;
}

function drawShape(shape, offset = {x : 0, y: 0}, color = 'red') {
    shape.forEach((row, y) => {
        row.forEach((value, x) => {
            if (value !== 0) {
                context.fillStyle = (value !== 1) ? value : color;
                context.fillRect(x + offset.x, y + offset.y, 1, 1);
            }
        });
    });
}

function colide(arena, player = playerDefault) {
    const {shape, position} = player;
    let result = false;
    for (let y = 0; y < shape.length; y += 1) {
        for (let x = 0; x < shape[y].length; x += 1) {
            const dot = shape[y][x];
            const arenaRow = arena[y + position.y];
            const arenaDot = (arenaRow && arenaRow[x + position.x]);
            if (
                (dot !== 0 || dot !== bgColor) &&
                (arenaDot !== 0 || arenaDot !== bgColor)
            ) {
                result =  true;
            }
        }
    }
    return result;
}

function merge(arena, player = playerDefault) {
    player.shape.forEach((row, y) => {
        row.forEach((value, x) => {
            if (value !== 0 && value !== bgColor) {
                arena[y + player.position.y][x + player.position.x] = value;
            }
        });
    });
}

function draw() {
    clear();
    drawShape(player.shape, player.position);
}

let dropCounter = 0;
let dropInterval = 1000; // milliseconds (ms)
let lastTime = 0;
function update (time = 0) {
    const deltaTime = time - lastTime;
    lastTime = time;

    dropCounter += deltaTime;
    if (dropCounter > dropInterval) {
        playerDrop();
    }

    draw();
    requestAnimationFrame(update);
}

const arena = createShape(12, 20);
update();

document.addEventListener('keydown', (event) => {
    const playerSpeed = Math.abs(player.speed);
    if(event.keyCode === 37) {
        playerMove(-playerSpeed);
    } else if(event.keyCode === 39) {
        playerMove(playerSpeed);
    } else if(event.keyCode === 40) {
        playerDrop()
    } else if (event.keyCode === 38) {
        // playerRotate(1);
    }
});