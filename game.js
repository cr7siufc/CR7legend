let coins = 0;
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
const reels = [
    document.getElementById("reel1"),
    document.getElementById("reel2"),
    document.getElementById("reel3")
];

// Load initial slot images
reels.forEach(reel => {
    reel.style.backgroundImage = `url('${symbols[Math.floor(Math.random() * symbols.length)].image}')`;
});

// Function to spin reels
spinButton.addEventListener("click", () => {
    spinButton.disabled = true;
    spinResult.innerText = "Spinning...";
    
    let results = [];
    let totalWin = 0;

    reels.forEach((reel, index) => {
        let randomIndex = Math.floor(Math.random() * symbols.length);
        results.push(symbols[randomIndex]);
        
        // Animate reel spin
        reel.style.transform = `translateY(-${Math.random() * 400}px)`;

        setTimeout(() => {
            reel.style.backgroundImage = `url('${symbols[randomIndex].image}')`;
            reel.style.transform = `translateY(0)`;
        }, 1000 + (index * 200));
    });

    setTimeout(() => {
        if (results[0].name === results[1].name && results[1].name === results[2].name) {
            totalWin = results[0].value * 3; // Jackpot
        } else if (results[0].name === results[1].name || results[1].name === results[2].name) {
            totalWin = results[1].value * 2; // Partial match
        } else {
            totalWin = results[0].value;
        }

        coins += totalWin;
        coinsDisplay.innerText = coins;
        spinResult.innerText = totalWin > 0 ? `You won ${totalWin} CR7 Coins! 🎉` : "Better luck next time!";
        spinButton.disabled = false;
    }, 1500);
});
