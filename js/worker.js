let DirtMiner = {
    Count: 0,
    Price: 10,
    Output: 0.5,
    Eff: 1,
    EffCost: 50
}


let dirtMinerInterval;

function buyDirtMiner() {
    if (DirtMiner.Count < 10 && Inventory.Cash >= DirtMiner.Price) {
        Inventory.Cash -= DirtMiner.Price;
        DirtMiner.Count++;
        DirtMiner.Price *= 1.5;
        updateWorkerMenu();
        saveGame();
        
        // Clear the previous interval, if any
        clearInterval(dirtMinerInterval);
        
        // Set up a new interval to add dirt every second
        dirtMinerInterval = setInterval(function() {
            Inventory.Dirt += (DirtMiner.Output / 2) * DirtMiner.Count;
            showInventory();
        }, 1000);
    }
}

function buyDirtMinerEfficiency(){

    if(Inventory.Cash < DirtMiner.EffCost){
        console.log("you dont have enough cash")
        return;
    }

    DirtMiner.Eff += 1;
    Inventory.Cash -= DirtMiner.EffCost;

    DirtMiner.EffCost = DirtMiner.EffCost * 1.25;
    DirtMiner.Output = DirtMiner.Output * 2;

    updateUpgradeUI();
    updateWorkerMenu();
}


function updateWorkerMenu() {
    document.getElementById('dirtminercount').textContent = DirtMiner.Count;
    document.getElementById('dirtmineroutput').textContent = DirtMiner.Output.toFixed(1);
    document.getElementById('dirtminerprice').textContent = DirtMiner.Price.toFixed(2);

    dirtMinerCapDisplay.innerHTML = dirtMinerCap;
}

document.getElementById('buydirtminer').addEventListener('click', buyDirtMiner);
