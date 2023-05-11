let dirtMinerCount = 0;
let dirtMinerPrice = 10;
let dirtMinerOutput = 0.5;
let dirtMinerInterval;

function buyDirtMiner() {
    if (dirtMinerCount < 10 && Inventory.Cash >= dirtMinerPrice) {
        Inventory.Cash -= dirtMinerPrice;
        dirtMinerCount++;
        dirtMinerPrice *= 1.5;
        updateUpgradeMenu();
        
        // Clear the previous interval, if any
        clearInterval(dirtMinerInterval);
        
        // Set up a new interval to add dirt every second
        dirtMinerInterval = setInterval(function() {
            Inventory.Dirt += dirtMinerOutput / 2;
            showInventory();
        }, 1000);
    }
}


function updateUpgradeMenu() {
    document.getElementById('dirtminercount').textContent = dirtMinerCount;
    document.getElementById('dirtmineroutput').textContent = dirtMinerOutput.toFixed(1);
    document.getElementById('dirtminerprice').textContent = dirtMinerPrice;
}

document.getElementById('buydirtminer').addEventListener('click', buyDirtMiner);
