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
  // Create a lookup object for the oreData keyed by the ore name
  const oreDataLookup = {};
  for (const ore of oreData) {
    oreDataLookup[ore.name] = ore;
  }

  let inventoryList = '';
  let totalValue = 0;

  for (const resource of minedResources) {
    const value = resource.amount * oreDataLookup[resource.name].value;
    inventoryList += `${resource.amount}x ${resource.name} ($${value})<br>`;
    totalValue += value;
  }

  inventoryList += `Total: $${totalValue}`;

  document.getElementById('orebottomhalf').innerHTML = inventoryList;
}


//QUEST STUFF!
function displayQuests() {
  const questBottomHalf = document.getElementById("questbottomhalf");
  questBottomHalf.innerHTML = "";

  quests.forEach((quest) => {
    if (!quest.completed) {
      const { name, flag, requirements, rewards, started } = quest;

      if (!started && Object.entries(flag).some(([key, value]) => Inventory[key] >= value)) {
        const questText = `${name} | ${Object.entries(requirements).map(([key, value]) => `${value} ${key}`).join(", ")} | ${Object.entries(rewards).map(([key, value]) => `${value} ${key}`).join(", ")}&nbsp;`;
        const questElement = document.createElement("p");
        questElement.innerHTML = questText;
        const questButton = document.createElement("button");
        questButton.innerText = "Start";
        questButton.classList.add("btn", "btn-secondary");
        questButton.style.padding = "0 10px";
        questButton.style.width = "auto";
        questButton.style.fontSize = "14px";
        questButton.addEventListener("click", () => {
          quest.started = true;
          questButton.innerText = "In Progress";
          questButton.classList.remove("btn-secondary");
          questButton.classList.add("btn-warning");
        });
        questElement.appendChild(questButton);
        questBottomHalf.appendChild(questElement);
      } else if (started) {
        const questText = `${name} | ${Object.entries(requirements).map(([key, value]) => `${value} ${key}`).join(", ")} | ${Object.entries(rewards).map(([key, value]) => `${value} ${key}`).join(", ")}&nbsp;`;
        const questElement = document.createElement("p");
        questElement.innerHTML = questText;
        const questButton = document.createElement("button");
        if (Object.entries(Inventory).every(([key, value]) => value >= quest.requirements[key])) {

          questButton.innerText = "Turn In!";
          questButton.classList.add("btn", "btn-success");
        } else {
          questButton.innerText = "In Progress";
          questButton.classList.add("btn", "btn-warning");
        }
        questButton.style.padding = "0 10px";
        questButton.style.width = "auto";
        questButton.style.fontSize = "14px";
        questButton.disabled = !Object.entries(Inventory).every(([key, value]) => value >= requirements[key]);
        questElement.appendChild(questButton);
        questBottomHalf.appendChild(questElement);
      }
    }
  });
}










showInventory();
updatePickaxeUI();
