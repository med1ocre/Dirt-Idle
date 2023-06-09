window.onload = function() {
  loadGame();


  // Retrieve the interval ID from localStorage
  const savedInterval1 = localStorage.getItem('minerInterval');

  // If the saved interval exists, start the interval again
  if (savedInterval1) {
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

  if (window.location.pathname.includes("/main.html")) {
    setInterval(function(){displayQuests();},1000);

    showInventory();
    updatePickaxeUI();
    displayQuests();
    updateUpgradeUI();
    updateWorkerMenu();
    updateCash();

    if(stoneMinerAccess == 1){
      document.getElementById("mineforwardarrow").style.visibility = "visible";
      if(currentOre != 'Dirt'){
        document.getElementById("minebackarrow").style.visibility = "visible";
      }

    }
     if(towerAccess == 1){
      document.getElementById("towermenu").style.visibility = "visible";
    }
    return;
  }

  if (window.location.pathname.includes("/stats.html")) {
    updateStatsUI();
  }

}

function formatNumberLetter(num) {
  if(num >= 1000000000000000000000000000000000){
    return (num / 1000000000000000000000000000000000).toFixed(1) + 'd';
  }  else if(num >= 1000000000000000000000000000000) {
    return (num / 1000000000000000000000000000000).toFixed(1) + 'n';
  } else if(num >= 1000000000000000000000000000) {
    return (num / 1000000000000000000000000000).toFixed(1) + 'o';
  } else if(num >= 1000000000000000000000000) {
    return (num / 1000000000000000000000000).toFixed(1) + 'S';
  }  else if(num >= 1000000000000000000000) {
    return (num / 1000000000000000000000).toFixed(1) + 's';
  } else if(num >= 1000000000000000000) {
    return (num / 1000000000000000000).toFixed(1) + 'Q';
  } else if (num >= 1000000000000000) {
    return (num / 1000000000000000).toFixed(1) + 'q';
  } else if (num >= 1000000000000) {
    return (num / 1000000000000).toFixed(1) + 't';
  } else if (num >= 1000000000) {
    return (num / 1000000000).toFixed(1) + 'b';
  } else if (num >= 1000000) {
    return (num / 1000000).toFixed(1) + 'm';
  } else if (num >= 1000) {
    return (num / 1000).toFixed(1) + 'k';
  } else {
    return num;
  }
}


function toRoman(num) {
  const romanNumerals = {
    M: 1000,
    CM: 900,
    D: 500,
    CD: 400,
    C: 100,
    XC: 90,
    L: 50,
    XL: 40,
    X: 10,
    IX: 9,
    V: 5,
    IV: 4,
    I: 1
  };

  let result = '';

  for (let key in romanNumerals) {
    while (num >= romanNumerals[key]) {
      result += key;
      num -= romanNumerals[key];
    }
  }

  return result;
}


//Setting player name at start
function setName(){
  if(nameInput.value == ''){
        return
      }
  playerName = document.getElementById("nameInput").value;
  console.log(`Player name set to ${playerName}`);
  saveGame();
  window.location.href = "main.html";
}


function saveGame() {
  const gameSave = {
    playerName: playerName,
    completedQuests: completedQuests,
    activeQuests: activeQuests,
    Inventory: Inventory,
    currentPickaxe: currentPickaxe,
    Stat: Stat,
    quests: quests,
    DirtMiner: DirtMiner,
    towerAccess: towerAccess,
    StoneMiner: StoneMiner,
    CoalMiner: CoalMiner,
    IronMiner: IronMiner,
    GoldMiner: GoldMiner,
    DiamondMiner: DiamondMiner,
    stoneMinerAccess: stoneMinerAccess,
    coalMinerAccess: coalMinerAccess,
    ironMinerAccess: ironMinerAccess,
    goldMinerAccess: goldMinerAccess,
    diamondMinerAccess: diamondMinerAccess,
  };

  // Save the gameSave object to localStorage
  localStorage.setItem('gameSave', JSON.stringify(gameSave));
  
  console.log('Game saved.');
}

function loadGame() {
  const savedData = JSON.parse(localStorage.getItem("gameSave"));
  
  if (savedData) {
    console.log("TEST");
    playerName = savedData.playerName;
    Inventory = savedData.Inventory;
    completedQuests = savedData.completedQuests;
    currentPickaxe = savedData.currentPickaxe;
    Stat = savedData.Stat;
    activeQuests = savedData.activeQuests;
    quests = savedData.quests;
    DirtMiner = savedData.DirtMiner;
    towerAccess = savedData.towerAccess;
    StoneMiner = savedData.StoneMiner;
    CoalMiner = savedData.CoalMiner;
    IronMiner = savedData.IronMiner;
    GoldMiner = savedData.GoldMiner;
    DiamondMiner = savedData.DiamondMiner;
    stoneMinerAccess = savedData.stoneMinerAccess;
    coalMinerAccess = savedData.coalMinerAccess;
    ironMinerAccess = savedData.ironMinerAccess;
    goldMinerAccess = savedData.goldMinerAccess;
    diamondMinerAccess = savedData.diamondMinerAccess;
    
  }
}


//Function for going left/right between the ores
function changeOre(direction) {
  const currentIndex = oreData.findIndex(ore => ore.name === currentOre);
  let nextIndex = direction === 'forward' ? currentIndex + 1 : currentIndex - 1;

  if (nextIndex < 0) {
    nextIndex = oreData.length - 1;
  } else if (nextIndex >= oreData.length) {
    nextIndex = 0;
  }

  const nextOre = oreData[nextIndex];

  if (nextOre.requiredWeight <= pickaxeData.find(pickaxe => pickaxe.name === currentPickaxe).weight) {
    currentOre = nextOre.name;
    document.getElementById('orename').textContent = currentOre;
  }

  // Show/hide left arrow based on current ore
  const leftArrow = document.getElementById('minebackarrow');
  if (currentOre === 'Dirt') {
    leftArrow.style.visibility = 'hidden';
  } else {
    leftArrow.style.visibility = 'visible';
  }
}

function updateStatsUI() {

  Stat.totalQuestsCompleted = completedQuests.length;

  // Fill out the values for each element
  totalDirtElement.innerHTML = Stat.totalDirtMined;
  totalCashElement.innerHTML = Stat.totalCashCollected;
  totalQuestsElement.innerHTML = Stat.totalQuestsCompleted;
  highestPickaxeElement.innerHTML = Stat.highestPickaxeTier;

}


function updatePickaxeUI(){

  let pickaxeDataObject = pickaxeData.find(pickaxe => pickaxe.name === currentPickaxe);

  // get the tier of the pickaxe based on its weight value
  let pickaxeTier = pickaxeDataObject ? pickaxeDataObject.weight : 0;

  // update the HTML element to display the modified string with the pickaxe tier
  currentPickaxeDisplay.innerHTML = currentPickaxe.replace("Pickaxe", "") + `(Tier ${pickaxeTier})`;
  pickaxeTierDisplay.innerHTML = toRoman(pickaxeTier);
  swingPowerDisplay.innerHTML = swingPower();


}

//Temp variable to tell whether or not we are mining
let currentResource = '';
// List to track mined resources
let minedResources = [];

function startMining() {
  if (currentResource !== '') {
    return; // mining in progress
  }
  
  const currentOreData = oreData.find(ore => ore.name === currentOre);
  
  if (currentOreData.requiredWeight > pickaxeData.find(pickaxe => pickaxe.name === currentPickaxe).weight) {
    return; // pickaxe too weak
  }
  
  currentResource = currentOreData.name;
  const countdownDisplay = document.getElementById('countdown-display');
  


  let remainingTime = swingSpeed;
  const intervalId = setInterval(() => {
    remainingTime -= 0.01;
    countdownDisplay.textContent = remainingTime.toFixed(1) + 's';
    
    if (remainingTime <= 0) {
      clearInterval(intervalId);
      countdownDisplay.textContent = swingSpeed.toFixed(1) + 's';
      Inventory[currentResource] += swingPower();

      // update mined resources list
      const minedResource = minedResources.find(resource => resource.name === currentResource);
      if (minedResource) {
        minedResource.amount += swingPower();
      } else {
        minedResources.push({ name: currentResource, amount: swingPower() });
      }

      if (currentResource === 'Dirt') {
        Stat.totalDirtMined += swingPower();
      }

      showInventory();
      currentResource = '';
    }
  }, 10);
}

function updateCash(){
  playerCurrencyDisplay.innerHTML = '<h4>$' + formatNumberLetter(Inventory.Cash.toFixed(2)) + '</h4>';
}

const excludedItems = ['Cash', 'Key', 'Map'];

function showInventory() {
  let inventoryList = '';
  let totalValue = 0;

  for (const [itemName, itemQuantity] of Object.entries(Inventory)) {
    if (itemQuantity > 0 && !excludedItems.includes(itemName)) {
      const itemData = oreData.find(item => item.name === itemName);
      if (itemData) {
        const value = (itemQuantity * itemData.value);
        inventoryList += `<div style="display:flex;align-items:center;justify-content:space-between;">`;
        inventoryList += `<div>${formatNumberLetter(itemQuantity.toFixed(1))} ${itemName} ($${formatNumberLetter(value.toFixed(2))})</div>`;
        inventoryList += `<div style="display:flex;align-items:center;">`;
        inventoryList += `<input type="number" min="1" max="${itemQuantity}" step="1" id="${itemName}-sell-qty" style="width: 50px; font-size:11px;margin-right:5px">`;
        inventoryList += `<button class="btn btn-sm btn-warning sell-btn" data-ore="${itemName}" style="margin-right:5px">Sell</button>`;
        inventoryList += `<button class="btn btn-sm btn-danger sell-all-btn" data-ore="${itemName}">Sell All</button>`;
        inventoryList += `</div></div>`;
        totalValue += parseFloat(value.toFixed(2));
      } else {
        inventoryList += `${itemQuantity}x ${itemName}<br>`;
      }
    }
  }

  inventoryList += `Total value: $${formatNumberLetter(totalValue.toFixed(2))}`;

  document.getElementById('orebottomhalf').innerHTML = inventoryList;

  const sellButtons = document.querySelectorAll('.sell-btn');
  sellButtons.forEach(button => {
    button.style.padding = '0 10px';
    button.style.width = 'auto';
    button.style.fontSize = '14px';
    button.addEventListener('click', (event) => {
      const itemName = event.target.getAttribute('data-ore');
      const itemData = oreData.find(item => item.name === itemName);
      const value = itemData.value;
      const qtyInput = document.getElementById(`${itemName}-sell-qty`);
      const qty = qtyInput.value;
      if (Inventory[itemName] >= qty) {
        Inventory.Cash += qty * value;
        Stat.totalCashCollected += qty * value;
        Inventory[itemName] -= qty;
        updateCash();
      }
      showInventory();
    });
  });

  const sellAllButtons = document.querySelectorAll('.sell-all-btn');
  sellAllButtons.forEach(button => {
    button.style.padding = '0 10px';
    button.style.width = 'auto';
    button.style.fontSize = '14px';
    button.addEventListener('click', (event) => {
      const itemName = event.target.getAttribute('data-ore');
      const itemData = oreData.find(item => item.name === itemName);
      const value = itemData.value;
      if (Inventory[itemName] > 0) {
        Inventory.Cash += Inventory[itemName] * value;
        Stat.totalCashCollected += Inventory[itemName] * value;
        Inventory[itemName] = 0;
        updateCash();
      }
      showInventory();
    });
  });
}



function updateUpgradeUI() {
  
  let nextPickaxePrice = getNextPickaxePrice();

  dirtMinerEffTierDisplay.innerHTML = toRoman(DirtMiner.Eff);
  upgradeDirtMinerEffButton.innerHTML = "Upgrade ($" + formatNumberLetter(DirtMiner.EffCost.toFixed(2)) + ")";

  if (nextPickaxePrice === null) {
    upgradePickaxeButton.innerText = "Upgrade (Maxed out)";
  } else {
    upgradePickaxeButton.innerText = `Upgrade (${formatPrice(nextPickaxePrice)})`;
  }
}

function getNextPickaxePrice() {
  const currentTier = pickaxeData.findIndex(pickaxe => pickaxe.name === currentPickaxe);
  const nextTier = currentTier + 1;

  if (nextTier >= pickaxeData.length) {
    // If the current pickaxe is the last one, there is no next pickaxe
    return null;
  }

  return pickaxeData[nextTier].price;
}

function formatPrice(price) {
  if (price === null) {
    return '';
  }
  
  let priceString = '';
  for (const [key, value] of Object.entries(price)) {
    priceString += `${value} ${key}, `;
  }
  return priceString.slice(0, -2); // remove the trailing comma and space
}


function upgradePickaxe() {
  const currentTier = pickaxeData.findIndex(pickaxe => pickaxe.name === currentPickaxe);
  const nextTier = currentTier + 1;

  if (nextTier >= pickaxeData.length) {
    alert("You already have the best pickaxe!");
    return;
  }

  const requiredResources = pickaxeData[nextTier].price;

  for (const resource in requiredResources) {
    if (Inventory[resource] < requiredResources[resource]) {
      alert(`You need ${requiredResources[resource]} ${resource} to upgrade your pickaxe.`);
      return;
    }
  }

  for (const resource in requiredResources) {
    Inventory[resource] -= requiredResources[resource];
  }

  currentPickaxe = pickaxeData[nextTier].name;
  showInventory();
  updatePickaxeUI();
  saveGame();

  const pickaxeTierElement = document.getElementById("pickaxetier");

  const upgradePickaxeButton = document.getElementById("upgradepickaxe");
  const requiredResource = Object.keys(requiredResources)[0];
  const requiredAmount = Object.values(requiredResources)[0];
  upgradePickaxeButton.innerText = `Upgrade (${formatPrice(getNextPickaxePrice())})`;

  updateUpgradeUI();
}


//tower stuff


function convertDirt(amount) {
  if (Inventory.Dirt < 50) {
    return;
  }

  let numDirtToConvert;
  if (amount === 'one') {
    numDirtToConvert = 50;
  } else if (amount === 'max') {
    numDirtToConvert = Math.floor(Inventory.Dirt / 50) * 50;
  }

  if (numDirtToConvert) {
    const numStoneToAdd = Math.floor(numDirtToConvert / 50);
    Inventory.Stone += numStoneToAdd;
    Inventory.Dirt -= numDirtToConvert;
  }

  showInventory();
}



//quest stuff

function displayQuests() {
  const questBottomHalf = document.getElementById("questbottomhalf");
  questBottomHalf.innerHTML = "";

  quests.forEach((quest) => {
    if (
      (quest.unlocked || Object.entries(quest.flag).every(([key, value]) => Inventory[key] >= value)) &&
      (!quest.completed || quest.unlocked)
    ) {
      const { name, requirements, rewards, started } = quest;

      const questText = `${name} | ${
        Object.entries(requirements).length > 0
          ? Object.entries(requirements)
              .map(([key, value]) =>
                `${value} ${key.replace("currentPickaxe", "")}`
              )
              .join(", ")
          : "No requirements"
      } | ${Object.entries(rewards)
        .map(([key, value]) => `${value} ${key}`)
        .join(", ")}&nbsp;`;

      const questElement = document.createElement("p");
      questElement.innerHTML = questText;
      const questButton = document.createElement("button");

      if (!quest.unlocked && Object.entries(quest.flag).every(([key, value]) => Inventory[key] >= value)) {
        quest.unlocked = true;
      }

      if (!started) {
        questButton.innerText = "Start";
        questButton.classList.add("btn", "btn-secondary");
        questButton.addEventListener("click", () => {
          quest.started = true;
          questButton.innerText = "In Progress";
          questButton.classList.remove("btn-secondary");
          questButton.classList.add("btn-warning");
          activeQuests.push(quest);
        });
      } else if (started && Object.entries(requirements).every(([key, value]) => {
          if (key === "currentPickaxe") {
            const pickaxeTiers = ["Bronze Pickaxe", "Iron Pickaxe", "Steel Pickaxe", "Silver Pickaxe"];
            return pickaxeTiers.indexOf(currentPickaxe) >= pickaxeTiers.indexOf(value);
          } else {
            return Inventory[key] >= value;
          }
        })) {
        questButton.innerText = "Turn In!";
        questButton.disabled = false;
        questButton.classList.add("btn", "btn-success");
        questButton.addEventListener("click", () => {
          Object.entries(requirements).forEach(([key, value]) => {
            Inventory[key] -= value;
          });
          Object.entries(rewards).forEach(([key, value]) => {
            Inventory[key] += value;
          });
          quest.completed = true;
          const index = activeQuests.indexOf(quest);
          if (index !== -1) {
            activeQuests.splice(index, 1);
          }
          if (quest.name === "The Navigator") {
            quest.activateMap();
          } else if (quest.name === "The Wizard") {
            quest.openTower();
            towerAccess = 1;
          }else if(quest.name === "Time to Upgrade"){
            stoneMinerAccess = 1;

            updateWorkerMenu();
          }
          else if(quest.name === "Coal Please"){
            
            coalMinerAccess = 1;
            updateWorkerMenu();
          }
          else if(quest.name === "We need Iron"){
            
            ironMinerAccess = 1;
            updateWorkerMenu();
          }
          else if(quest.name === "Gold Rush"){
            
            goldMinerAccess = 1;
            updateWorkerMenu();
          }
          else if(quest.name === "Diamond Farm"){
           
            diamondMinerAccess = 1;
            updateWorkerMenu();
          }
          completedQuests.push(quest);
          displayQuests();
          showInventory();
          updateCash()
          saveGame();
        });
      } else if (started) {
        questButton.innerText = "In Progress";
        questButton.classList.add("btn", "btn-warning");
      }

      questButton.style.padding = "0 10px";
      questButton.style.width = "auto";
      questButton.style.fontSize = "14px";

      questElement.appendChild(questButton);

      // Filter out completed quests from the
      if (!completedQuests.includes(quest)) {
        questBottomHalf.appendChild(questElement);
      }
    }
  });
}
