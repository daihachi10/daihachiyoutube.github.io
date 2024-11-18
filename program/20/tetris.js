const canvas = document.getElementById('tetris');
const context = canvas.getContext('2d');

// ゲーム設定を管理するオブジェクト
const gameConfig = {
    blockSize: 20, // ブロックのサイズ
    speed: 1000,   // 初期スピード（ms）
    backgroundColor: 'rgb(40, 40, 40)', // 背景色
    gridColor: '#333', // グリッド線の色
    lineWidth: 0.1,  // グリッド線の太さ
    colors: [
        null,
        '#dc2171',  // 1番目
        '#ff708f',  // 2番目
        '#ffb5cf',  // 3番目
        '#a6c7ff',  // 4番目
        '#7397e6',  // 5番目
        '#3e69b3',  // 6番目
        '#003f83',  // 7番目
    ],
    dropInterval: 1000, // ドロップ間隔（ms）
    restartButtonText: 'Restart', // リスタートボタンのテキスト
    gameOverText: 'Game Over! Score: ', // ゲームオーバーのメッセージ
};

context.scale(gameConfig.blockSize, gameConfig.blockSize);

const arena = createMatrix(12, 20);

const player = {
    pos: { x: 0, y: 0 },
    matrix: null,
    score: 0,
};

const restartButton = document.createElement('button');
restartButton.innerText = gameConfig.restartButtonText;
restartButton.style.display = 'none';
restartButton.onclick = restartGame;
document.body.appendChild(restartButton);

function createMatrix(width, height) {
    const matrix = [];
    while (height--) {
        matrix.push(new Array(width).fill(0));
    }
    return matrix;
}

function createPiece(type) {
    if (type === 'T') {
        return [
            [0, 1, 0],
            [1, 1, 1],
            [0, 0, 0],
        ];
    } else if (type === 'O') {
        return [
            [2, 2],
            [2, 2],
        ];
    } else if (type === 'L') {
        return [
            [0, 3, 0],
            [0, 3, 0],
            [0, 3, 3],
        ];
    } else if (type === 'J') {
        return [
            [0, 4, 0],
            [0, 4, 0],
            [4, 4, 0],
        ];
    } else if (type === 'I') {
        return [
            [0, 5, 0, 0],
            [0, 5, 0, 0],
            [0, 5, 0, 0],
            [0, 5, 0, 0],
        ];
    } else if (type === 'S') {
        return [
            [0, 6, 6],
            [6, 6, 0],
            [0, 0, 0],
        ];
    } else if (type === 'Z') {
        return [
            [7, 7, 0],
            [0, 7, 7],
            [0, 0, 0],
        ];
    }
}

function drawMatrix(matrix, offset) {
    matrix.forEach((row, y) => {
        row.forEach((value, x) => {
            if (value !== 0) {
                context.fillStyle = gameConfig.colors[value];
                context.fillRect(x + offset.x, y + offset.y, 1, 1);
            }
        });
    });
}

function drawGrid() {
    context.strokeStyle = gameConfig.gridColor;
    context.lineWidth = gameConfig.lineWidth;

    for (let x = 0; x < canvas.width / gameConfig.blockSize; x++) {
        for (let y = 0; y < canvas.height / gameConfig.blockSize; y++) {
            context.strokeRect(x, y, 1, 1);
        }
    }
}

function draw() {
    context.fillStyle = gameConfig.backgroundColor;
    context.fillRect(0, 0, canvas.width, canvas.height);

    drawGrid();
    drawMatrix(arena, { x: 0, y: 0 });
    drawMatrix(player.matrix, player.pos);

    // ゲームオーバー時にスコアを表示
    if (player.pos.y === 0 && collide(arena, player)) {
        context.fillStyle = 'white';
        context.font = '1.5em Arial';
        context.fillText(`${gameConfig.gameOverText} ${player.score}`, 2, 10);

        restartButton.style.display = 'block'; // リスタートボタンを表示
    }
}

function merge(arena, player) {
    player.matrix.forEach((row, y) => {
        row.forEach((value, x) => {
            if (value !== 0) {
                arena[y + player.pos.y][x + player.pos.x] = value;
            }
        });
    });
}

function playerMove(dir) {
    player.pos.x += dir;
    if (collide(arena, player)) {
        player.pos.x -= dir;
    }
}

function playerDrop() {
    player.pos.y++;
    if (collide(arena, player)) {
        player.pos.y--;
        merge(arena, player);
        playerReset();
        arenaSweep();
    }
    dropCounter = 0;
}

function playerDropInstant() {
    while (!collide(arena, player)) {
        player.pos.y++;
    }
    player.pos.y--;
    merge(arena, player);
    playerReset();
    arenaSweep();
    dropCounter = 0;
}

function playerReset() {
    const pieces = 'ILJOTSZ';
    player.matrix = createPiece(pieces[pieces.length * Math.random() | 0]);
    player.pos.y = 0;
    player.pos.x = (arena[0].length / 2 | 0) -
        (player.matrix[0].length / 2 | 0);

    // ゲームオーバー判定（ブロックが上に到達した場合）
    if (collide(arena, player)) {
        arena.forEach(row => row.fill(0));  // ゲームオーバー
        player.score = 0; // スコアをリセット
    }
}

function playerRotate(dir) {
    const pos = player.pos.x;
    let offset = 1;
    rotate(player.matrix, dir);
    while (collide(arena, player)) {
        player.pos.x += offset;
        offset = -(offset + (offset > 0 ? 1 : -1));
        if (offset > player.matrix[0].length) {
            rotate(player.matrix, -dir);
            player.pos.x = pos;
            return;
        }
    }
}

function rotate(matrix, dir) {
    for (let y = 0; y < matrix.length; ++y) {
        for (let x = 0; x < y; ++x) {
            [
                matrix[x][y],
                matrix[y][x],
            ] = [
                    matrix[y][x],
                    matrix[x][y],
                ];
        }
    }

    if (dir > 0) {
        matrix.forEach(row => row.reverse());
    } else {
        matrix.reverse();
    }
}

function collide(arena, player) {
    const [m, o] = [player.matrix, player.pos];
    for (let y = 0; y < m.length; ++y) {
        for (let x = 0; x < m[y].length; ++x) {
            if (m[y][x] !== 0 &&
                (arena[y + o.y] &&
                    arena[y + o.y][x + o.x]) !== 0) {
                return true;
            }
        }
    }
    return false;
}

function arenaSweep() {
    let rowCount = 1;
    outer: for (let y = arena.length - 1; y > 0; --y) {
        for (let x = 0; x < arena[y].length; ++x) {
            if (arena[y][x] === 0) {
                continue outer;
            }
        }

        const row = arena.splice(y, 1)[0].fill(0);
        arena.unshift(row);
        ++y;
    }
}

let dropCounter = 0;
let dropInterval = gameConfig.dropInterval;

let lastTime = 0;

function update(time = 0) {
    const deltaTime = time - lastTime;
    lastTime = time;

    dropCounter += deltaTime;
    if (dropCounter > dropInterval) {
        playerDrop();
    }

    draw();
    requestAnimationFrame(update);
}

document.addEventListener('keydown', event => {
    if (event.key === 'ArrowLeft') {
        playerMove(-1);
    } else if (event.key === 'ArrowRight') {
        playerMove(1);
    } else if (event.key === 'ArrowDown') {
        playerDrop();
    } else if (event.key === ' ') {
        playerDropInstant();
    } else if (event.key === 'ArrowUp') {
        playerRotate(1);
    }
});

function restartGame() {
    player.score = 0; // スコアをリセット
    restartButton.style.display = 'none'; // リスタートボタンを非表示にする
    arena.forEach(row => row.fill(0)); // フィールドをリセット
    playerReset();
    update();
}

playerReset();
update();
