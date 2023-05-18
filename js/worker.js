let DirtMiner = {
    Count: 0,
    Price: 10,
    CapPrice: 100,
    Output: 0.5,
    Eff: 1,
    EffCost: 50,
    Cap: 5
}

let StoneMiner = {
    Count: 0,
    Price: 50,
    CapPrice: 1000,
    Output: 0.5,
    Eff: 1,
    EffCost: 50,
    Cap: 5
}


let CoalMiner = {
    Count: 0,
    Price: 100,
    CapPrice: 2000,
    Output: 0.5,
    Eff: 1,
    EffCost: 50,
    Cap: 5
}

let IronMiner = {
    Count: 0,
    Price: 500,
    CapPrice: 5000,
    Output: 0.5,
    Eff: 1,
    EffCost: 50,
    Cap: 5
}

let GoldMiner = {
    Count: 0,
    Price: 1000,
    CapPrice: 10000,
    Output: 0.5,
    Eff: 1,
    EffCost: 50,
    Cap: 5
}

let DiamondMiner = {
    Count: 0,
    Price: 5000,
    CapPrice: 50000,
    Output: 0.5,
    Eff: 1,
    EffCost: 50,
    Cap: 5
}

let minerInterval;

function buyMiner(miner) {

  console.log("TESsssT")
  if (miner.Count < miner.Cap && Inventory.Cash >= miner.Price) {
    console.log("bought:");
    Inventory.Cash -= miner.Price;
    miner.Count++;
    miner.Price *= 2.2;
    updateWorkerMenu();
    updateCash();
    saveGame();

    localStorage.setItem('minerInterval', minerInterval);

    // Clear the previous interval, if any
    clearInterval(minerInterval);

    // Set up a new interval to add resources every second
    minerInterval = setInterval(function() {
      Inventory.Dirt += (DirtMiner.Output / 2) * DirtMiner.Count;
      if (StoneMiner.Count > 0) {
        Inventory.Stone += (StoneMiner.Output / 2) * StoneMiner.Count;
      }
      if (CoalMiner.Count > 0) {
        Inventory.Coal += (CoalMiner.Output / 2) * CoalMiner.Count;
      }
      if (IronMiner.Count > 0) {
        Inventory.Iron += (IronMiner.Output / 2) * IronMiner.Count;
      }
      if (GoldMiner.Count > 0) {
        Inventory.Gold += (GoldMiner.Output / 2) * GoldMiner.Count;
      }
      if (DiamondMiner.Count > 0) {
        Inventory.Diamond += (DiamondMiner.Output / 2) * DiamondMiner.Count;
      }
      showInventory();
    }, 1000);
  }
}



function buyMinerCap(miner) {
  if (Inventory.Cash >= miner.CapPrice) {
    Inventory.Cash -= miner.CapPrice;
    miner.Cap++;
    miner.CapPrice *= 2.5;
    updateWorkerMenu();
    updateCash();
    saveGame();
  }
}


function buyDirtMinerEfficiency(){

    if(Inventory.Cash < DirtMiner.EffCost || DirtMiner.Eff >= 5){
        console.log("you dont have enough cash")
        return;
    }

    DirtMiner.Eff += 1;
    Inventory.Cash -= DirtMiner.EffCost;

    DirtMiner.EffCost = DirtMiner.EffCost * 3;
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
    if(coalMinerAccess == 1){
        for(var i = 0; i < stoneminer.length; i++) {
          coalminer[i].style.visibility = "visible";
        }

        document.getElementById('coalminercount').textContent = formatNumberLetter(CoalMiner.Count);
        document.getElementById('coalmineroutput').textContent = formatNumberLetter(CoalMiner.Output.toFixed(1));
        document.getElementById('coalminerprice').textContent = formatNumberLetter(CoalMiner.Price.toFixed(2));
        upgradeCapCoalMinerPrice.textContent = formatNumberLetter(CoalMiner.CapPrice.toFixed(2));
        coalMinerCapDisplay.innerHTML = formatNumberLetter(CoalMiner.Cap);
    }
    if(ironMinerAccess == 1){
        for(var i = 0; i < ironminer.length; i++) {
          ironminer[i].style.visibility = "visible";
        }

        document.getElementById('ironminercount').textContent = formatNumberLetter(IronMiner.Count);
        document.getElementById('ironmineroutput').textContent = formatNumberLetter(IronMiner.Output.toFixed(1));
        document.getElementById('ironminerprice').textContent = formatNumberLetter(IronMiner.Price.toFixed(2));
        upgradeCapIronMinerPrice.textContent = formatNumberLetter(IronMiner.CapPrice.toFixed(2));
        ironMinerCapDisplay.innerHTML = formatNumberLetter(IronMiner.Cap);
    }
    if(goldMinerAccess == 1){
        for(var i = 0; i < goldminer.length; i++) {
          goldminer[i].style.visibility = "visible";
        }

        document.getElementById('goldminercount').textContent = formatNumberLetter(GoldMiner.Count);
        document.getElementById('goldmineroutput').textContent = formatNumberLetter(GoldMiner.Output.toFixed(1));
        document.getElementById('goldminerprice').textContent = formatNumberLetter(GoldMiner.Price.toFixed(2));
        upgradeCapGoldMinerPrice.textContent = formatNumberLetter(GoldMiner.CapPrice.toFixed(2));
        goldMinerCapDisplay.innerHTML = formatNumberLetter(GoldMiner.Cap);
    }
    if(diamondMinerAccess == 1){
        for(var i = 0; i < diamondminer.length; i++) {
          diamondminer[i].style.visibility = "visible";
        }

        document.getElementById('diamondminercount').textContent = formatNumberLetter(DiamondMiner.Count);
        document.getElementById('diamondmineroutput').textContent = formatNumberLetter(DiamondMiner.Output.toFixed(1));
        document.getElementById('diamondminerprice').textContent = formatNumberLetter(DiamondMiner.Price.toFixed(2));
        upgradeCapDiamondMinerPrice.textContent = formatNumberLetter(DiamondMiner.CapPrice.toFixed(2));
        diamondMinerCapDisplay.innerHTML = formatNumberLetter(DiamondMiner.Cap);
    }
    
}
