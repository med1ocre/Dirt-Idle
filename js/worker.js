let DirtMiner = {
    Count: 0,
    Price: 10,
    CapPrice: 50,
    Output: 0.5,
    Eff: 1,
    EffCost: 50,
    Cap: 10
}

let StoneMiner = {
    Count: 0,
    Price: 50,
    CapPrice: 500,
    Output: 0.5,
    Eff: 1,
    EffCost: 50,
    Cap: 10
}

let dirtMinerInterval;

function buyDirtMiner() {
    if (DirtMiner.Count < DirtMiner.Cap && Inventory.Cash >= DirtMiner.Price) {
        Inventory.Cash -= DirtMiner.Price;
        DirtMiner.Count++;
        DirtMiner.Price *= 1.5;
        updateWorkerMenu();
        updateCash();
        saveGame();
        
        localStorage.setItem('dirtMinerInterval', dirtMinerInterval);

        // Clear the previous interval, if any
        clearInterval(dirtMinerInterval);
        
        // Set up a new interval to add dirt every second
        dirtMinerInterval = setInterval(function() {
            Inventory.Dirt += (DirtMiner.Output / 2) * DirtMiner.Count;
            showInventory();
        }, 1000);
    }
}

function buyDirtMinerCap() {
    if (Inventory.Cash >= DirtMiner.CapPrice) {
        Inventory.Cash -= DirtMiner.CapPrice;
        DirtMiner.Cap++;
        DirtMiner.CapPrice *= 1.5;
        updateWorkerMenu();
        updateCash();
        saveGame();
    }
}

let stoneMinerInterval;

function buyStoneMiner() {
    if (StoneMiner.Count < StoneMiner.Cap && Inventory.Cash >= StoneMiner.Price) {
        Inventory.Cash -= StoneMiner.Price;
        StoneMiner.Count++;
        StoneMiner.Price *= 1.5;
        updateWorkerMenu();
        updateCash();
        saveGame();
        
        localStorage.setItem('stoneMinerInterval', stoneMinerInterval);

        // Clear the previous interval, if any
        clearInterval(stoneMinerInterval);
        
        // Set up a new interval to add dirt every second
        stoneMinerInterval = setInterval(function() {
            Inventory.Stone += (StoneMiner.Output / 2) * StoneMiner.Count;
            showInventory();
        }, 1000);
    }
}

function buyStoneMinerCap() {
    if (Inventory.Cash >= StoneMiner.CapPrice) {
        Inventory.Cash -= StoneMiner.CapPrice;
        StoneMiner.Cap++;
        StoneMiner.CapPrice *= 1.5;
        updateWorkerMenu();
        updateCash();
        saveGame();
    }
}

function buyDirtMinerEfficiency(){

    if(Inventory.Cash < DirtMiner.EffCost){
        console.log("you dont have enough cash")
        return;
    }

    DirtMiner.Eff += 1;
    Inventory.Cash -= DirtMiner.EffCost;

    DirtMiner.EffCost = DirtMiner.EffCost * 2;
    DirtMiner.Output = DirtMiner.Output * 2;
    updateCash();
    updateUpgradeUI();
    updateWorkerMenu();
}


function updateWorkerMenu() {
    document.getElementById('dirtminercount').textContent = formatNumberLetter(DirtMiner.Count);
    document.getElementById('dirtmineroutput').textContent = formatNumberLetter(DirtMiner.Output.toFixed(1));
    document.getElementById('dirtminerprice').textContent = formatNumberLetter(DirtMiner.Price.toFixed(2));
    upgradeCapDirtMinerPrice.textContent = formatNumberLetter(DirtMiner.CapPrice.toFixed(2));
    dirtMinerCapDisplay.innerHTML = DirtMiner.Cap;

    if(stoneMinerAccess == 1){
        for(var i = 0; i < stoneminer.length; i++) {
          stoneminer[i].style.visibility = "visible";
        }

        document.getElementById('stoneminercount').textContent = formatNumberLetter(StoneMiner.Count);
        document.getElementById('stonemineroutput').textContent = formatNumberLetter(StoneMiner.Output.toFixed(1));
        document.getElementById('stoneminerprice').textContent = formatNumberLetter(StoneMiner.Price.toFixed(2));
        upgradeCapStoneMinerPrice.textContent = formatNumberLetter(StoneMiner.CapPrice.toFixed(2));
        stoneMinerCapDisplay.innerHTML = formatNumberLetter(StoneMiner.Cap);
    }
    
}

document.getElementById('buydirtminer').addEventListener('click', buyDirtMiner);
document.getElementById('buystoneminer').addEventListener('click', buyStoneMiner);

