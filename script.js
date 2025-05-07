// 初始化变量
let min = 1;
let max = 100;
let bomb = Math.floor(Math.random() * (max - min + 1)) + min;
let guessInput = document.getElementById('guessInput');
let guessButton = document.getElementById('guessButton');
let result = document.getElementById('result');
let rangeElement = document.getElementById('range');
let restartButton = document.getElementById('restartButton');
let attemptsLeftElement = document.getElementById('attemptsLeft');
let attemptsLeft;

// 根据难度设置尝试次数
function setAttemptsByDifficulty(difficulty) {
    switch (difficulty) {
        case 1:
            attemptsLeft = 15;
            break;
        case 2:
            attemptsLeft = 10;
            break;
        case 3:
            attemptsLeft = 5;
            break;
    }
    attemptsLeftElement.textContent = `剩余次数: ${attemptsLeft}`;
}

// 猜数字函数
function guessNumber() {
    if (attemptsLeft <= 0) {
        result.textContent = '次数已用完，游戏失败！数字炸弹是 ' + bomb;
        guessButton.disabled = true;
        return;
    }

    let guess = parseInt(guessInput.value);
    if (isNaN(guess)) {
        result.textContent = '请输入有效的数字！';
        return;
    }

    attemptsLeft--;
    attemptsLeftElement.textContent = `剩余次数: ${attemptsLeft}`;

    if (guess === bomb) {
        result.textContent = '恭喜你，猜对了！数字炸弹就是 ' + bomb;
        guessButton.disabled = true;
    } else if (guess < bomb) {
        min = guess + 1;
        result.textContent = '猜小了，再试试！';
    } else {
        max = guess - 1;
        result.textContent = '猜大了，再试试！';
    }

    if (attemptsLeft === 0 && guess !== bomb) {
        result.textContent = '次数已用完，游戏失败！数字炸弹是 ' + bomb;
        guessButton.disabled = true;
    }

    rangeElement.textContent = '范围: ' + min + ' - ' + max;
    guessInput.value = '';
}

// 重新开始游戏函数
function restartGame() {
    min = 1;
    max = 100;
    bomb = Math.floor(Math.random() * (max - min + 1)) + min;
    result.textContent = '';
    rangeElement.textContent = '范围: 1 - 100';
    guessButton.disabled = false;
    guessInput.value = '';
    setAttemptsByDifficulty(getDifficultyFromURL());
}

// 从 URL 获取难度
function getDifficultyFromURL() {
    const urlParams = new URLSearchParams(window.location.search);
    return parseInt(urlParams.get('difficulty')) || 1;
}

// 初始化尝试次数
if (attemptsLeftElement) {
    setAttemptsByDifficulty(getDifficultyFromURL());
}

// 绑定事件监听器
if (guessButton) {
    guessButton.addEventListener('click', guessNumber);
}
if (restartButton) {
    restartButton.addEventListener('click', restartGame);
}

// 难度选择页面逻辑
const startGameButton = document.getElementById('startGameButton');
if (startGameButton) {
    startGameButton.addEventListener('click', () => {
        const difficulty = parseInt(document.getElementById('difficulty').value);
        window.location.href = `game.html?difficulty=${difficulty}`;
    });
}
difficultySelect.addEventListener('change', restartGame);
