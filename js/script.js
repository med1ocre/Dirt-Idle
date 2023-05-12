window.onload = function() {
  loadGame();

  if (window.location.pathname.includes("/main.html")) {
  setInterval(function(){displayQuests();},1000);

  showInventory();
  updatePickaxeUI();
  displayQuests();
  updateUpgradeUI();
  updateWorkerMenu();

  if(Inventory.Map == 1){
    document.getElementById("minebackarrow").style.visibility = "visible";
    document.getElementById("mineforwardarrow").style.visibility = "visible";
  }
  }

  if (window.location.pathname.includes("/stats.html")) {
    updateStatsUI();
  }

};


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
    DirtMiner: DirtMiner
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


function showInventory() {
  let inventoryList = '';
  let totalValue = 0;

  for (const [itemName, itemQuantity] of Object.entries(Inventory)) {
    if (itemQuantity > 0) {
      if (itemName !== 'Map') { // exclude the Map item from being added to the inventory list
        const itemData = oreData.find(item => item.name === itemName);
        if (itemData) {
          const value = (itemQuantity * itemData.value);
          inventoryList += `<div style="display:flex;align-items:center;justify-content:space-between;">`;
          inventoryList += `<div>${itemQuantity.toFixed(1)}x ${itemName} ($${value.toFixed(2)})</div>`;
          inventoryList += `<div style="display:flex;align-items:center;">`;
          inventoryList += `<input type="number" min="1" max="${itemQuantity}" step="1" value="${itemQuantity}" id="${itemName}-sell-qty" style="width: 50px; font-size:11px;margin-right:5px">`;
          inventoryList += `<button class="btn btn-sm btn-warning sell-btn" data-ore="${itemName}" style="margin-right:5px">Sell</button>`;
          inventoryList += `<button class="btn btn-sm btn-danger sell-all-btn" data-ore="${itemName}">Sell All</button>`;
          inventoryList += `</div></div>`;
          totalValue += parseFloat(value.toFixed(2));
        } else if (itemName !== 'Cash') {
          inventoryList += `${itemQuantity}x ${itemName}<br>`;
        }
      }
    }
  }

  inventoryList += `Total value: $${totalValue.toFixed(2)}`;

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
      }
      showInventory();
    });
  });
}


function updateUpgradeUI() {
  
  let nextPickaxePrice = getNextPickaxePrice();

  dirtMinerEffTierDisplay.innerHTML = toRoman(DirtMiner.Eff);
  upgradeDirtMinerEffButton.innerHTML = "Upgrade ($" + DirtMiner.EffCost.toFixed(2) + ")";

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




//QUEST STUFF!
function displayQuests() {
  const questBottomHalf = document.getElementById("questbottomhalf");
  questBottomHalf.innerHTML = "";

  quests.forEach((quest) => {
    if (
      !quest.completed &&
      (quest.unlocked ||
        Object.entries(quest.flag).some(
          ([key, value]) => Inventory[key] >= value
        ))
    ) {
      const { name, requirements, rewards, started } = quest;

      const questText = `${name} | ${Object.entries(requirements)
        .map(([key, value]) =>
          `${value} ${key.replace("currentPickaxe", "")}`
        )
        .join(", ")} | ${Object.entries(rewards)
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
      } else if (
        started &&
        Object.entries(requirements).every(
          ([key, value]) => Inventory[key] >= value
        )
      ) {
        questButton.innerText = "Turn In!";
        questButton.disabled = false;
        questButton.classList.add("btn", "btn-success");
        questButton.addEventListener("click", () => {
          Object.entries(requirements).every(([key, value]) => {
            if (key === "currentPickaxe") {
              return currentPickaxe === value;
            } else {
              return Inventory[key] >= value;
            }
          });

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
          }
          completedQuests.push(quest);
          displayQuests();
          showInventory();
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

      // Filter out completed quests from the list
      if (!completedQuests.includes(quest)) {
        questBottomHalf.appendChild(questElement);
      }
    }
  });
}







