let coins = 0;
let level = 1;
let spinBonus = 1;
let mineBonus = 50;
let lastMineTime = 0;

// DOM Elements
const coinsDisplay = document.getElementById("coins");
const levelDisplay = document.getElementById("level");
const spinButton = document.getElementById("spinButton");
const spinResult = document.getElementById("spinResult");
const mineButton = document.getElementById("mineButton");
const mineResult = document.getElementById("mineResult");
const upgradeSpinButton = document.getElementById("upgradeSpin");
const upgradeMineButton = document.getElementById("upgradeMine");

// Spin & Earn Function
spinButton.addEventListener("click", () => {
    let reward = Math.floor(Math.random() * (200 - 10 + 1)) + 10;
    reward *= spinBonus;
    coins += reward;
    updateGame();
    spinResult.innerText = `You won ${reward} CR7 Coins! 🎉`;
});

// Mining Function (every 12 hours)
mineButton.addEventListener("click", () => {
    let now = Date.now();
    let hoursPassed = (now - lastMineTime) / (1000 * 60 * 60);

    if (lastMineTime === 0 || hoursPassed >= 12) {
        lastMineTime = now;
        coins += mineBonus;
        updateGame();
        mineResult.innerText = `You mined ${mineBonus} CR7 Coins! ⛏️`;
    } else {
        let remainingTime = Math.ceil(12 - hoursPassed);
        mineResult.innerText = `Come back in ${remainingTime} hours to mine again! ⏳`;
    }
});

// Upgrade Spin Wheel
upgradeSpinButton.addEventListener("click", () => {
    if (coins >= 100) {
        coins -= 100;
        spinBonus += 1;
        updateGame();
        alert("Spin upgraded! 🎰 Higher rewards unlocked.");
    } else {
        alert("Not enough CR7 Coins!");
    }
});

// Upgrade Mining
upgradeMineButton.addEventListener("click", () => {
    if (coins >= 200) {
        coins -= 200;
        mineBonus += 50;
        updateGame();
        alert("Mining upgraded! ⛏️ More coins per mine.");
    } else {
        alert("Not enough CR7 Coins!");
    }
});

// Update Game State
function updateGame() {
    coinsDisplay.innerText = coins;

    // Level up every 500 coins
    let newLevel = Math.floor(coins / 500) + 1;
    if (newLevel > level) {
        level = newLevel;
        alert(`🎉 Congratulations! You've reached Level ${level}`);
    }
    levelDisplay.innerText = level;
}
