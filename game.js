let coins = 0;
let level = 1;
let lastMineTime = 0;
const miningCooldown = 12 * 60 * 60 * 1000; // 12 hours

const symbols = [
    { name: "CR7 Jersey", value: 1000, image: "jersey.png" },
    { name: "Football", value: 500, image: "football.png" },
    { name: "Football Shoes", value: 300, image: "shoes.png" },
    { name: "Goal Net", value: 200, image: "goal-net.png" },
    { name: "Football Socks", value: 100, image: "socks.png" },
    { name: "Shin Guard", value: 50, image: "shin-guard.png" },
    { name: "Miss", value: 0, image: "miss.png" }
];

// Get elements
const spinButton = document.getElementById("spinButton");
const spinResult = document.getElementById("spinResult");
const coinsDisplay = document.getElementById("coins");
const levelDisplay = document.getElementById("level");
const mineButton = document.getElementById("mineButton");
const miningStatus = document.getElementById("miningStatus");
const upgradeButton = document.getElementById("upgradeButton");

const reels = [
    document.getElementById("reel1"),
    document.getElementById("reel2"),
    document.getElementById("reel3")
];

// Spin Function
spinButton.addEventListener("click", () => {
    spinButton.disabled = true;
    spinResult.innerText = "Spinning...";
    
    let results = [];
    let totalWin = 0;

    reels.forEach((reel, index) => {
        let randomIndex = Math.floor(Math.random() * symbols.length);
        results.push(symbols[randomIndex]);
        
        reel.style.backgroundImage = `url('${symbols[randomIndex].image}')`;
    });

    setTimeout(() => {
        totalWin = results.reduce((sum, item) => sum + item.value, 0);
        coins += totalWin;
        coinsDisplay.innerText = coins;
        spinResult.innerText = totalWin > 0 ? `You won ${totalWin} CR7 Coins! 🎉` : "Better luck next time!";
        spinButton.disabled = false;
    }, 1000);
});

// Mining Function
mineButton.addEventListener("click", () => {
    if (Date.now() - lastMineTime >= miningCooldown) {
        lastMineTime = Date.now();
        coins += 200;
        coinsDisplay.innerText = coins;
        miningStatus.innerText = "You mined 200 CR7 Coins!";
    } else {
        miningStatus.innerText = "⏳ Come back in 12 hours!";
    }
});

// Upgrade Function
upgradeButton.addEventListener("click", () => {
    if (coins >= 500) {
        coins -= 500;
        level++;
        coinsDisplay.innerText = coins;
        levelDisplay.innerText = level;
    }
});
