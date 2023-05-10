setInterval(function(){displayQuests();},1000)

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

function updatePickaxeUI(){

  let pickaxeDataObject = pickaxeData.find(pickaxe => pickaxe.name === currentPickaxe);

  // get the tier of the pickaxe based on its weight value
  let pickaxeTier = pickaxeDataObject ? pickaxeDataObject.weight : 0;

  // update the HTML element to display the modified string with the pickaxe tier
  currentPickaxeDisplay.innerHTML = currentPickaxe.replace("Pickaxe", "") + `(Tier ${pickaxeTier})`;

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
      Inventory[currentResource] += swingPower;

      // update mined resources list
      const minedResource = minedResources.find(resource => resource.name === currentResource);
      if (minedResource) {
        minedResource.amount += swingPower;
      } else {
        minedResources.push({ name: currentResource, amount: swingPower });
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
        Inventory[itemName] = 0;
      }
      showInventory();
    });
  });
}








//QUEST STUFF!
function displayQuests() {
  const questBottomHalf = document.getElementById("questbottomhalf");
  questBottomHalf.innerHTML = "";

  quests.forEach((quest) => {
    if (!quest.completed && (quest.unlocked || Object.entries(quest.flag).some(([key, value]) => Inventory[key] >= value))) {
      const { name, requirements, rewards, started } = quest;

      const questText = `${name} | ${Object.entries(requirements).map(([key, value]) => `${value} ${key.replace('currentPickaxe', '')}`).join(", ")} | ${Object.entries(rewards).map(([key, value]) => `${value} ${key}`).join(", ")}&nbsp;`;

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
        });
      } else if (started && Object.entries(requirements).every(([key, value]) => Inventory[key] >= value)) {
        questButton.innerText = "Turn In!";
        questButton.disabled = false;
        questButton.classList.add("btn", "btn-success");
        questButton.addEventListener("click", () => {
          Object.entries(requirements).every(([key, value]) => {
            if (key === 'currentPickaxe') {

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
          completedQuests.push(quest);
          displayQuests();
          showInventory();
        });

      } else if (started) {
        questButton.innerText = "In Progress";
        questButton.classList.add("btn", "btn-warning");
      }

      questButton.style.padding = "0 10px";
      questButton.style.width = "auto";
      questButton.style.fontSize = "14px";

      questElement.appendChild(questButton);
      questBottomHalf.appendChild(questElement);
    }
  });
}










displayQuests();
showInventory();
updatePickaxeUI();
