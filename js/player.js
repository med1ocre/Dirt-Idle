let playerName;

let Inventory = {
  Map: 0,
  Key: 0,
  Cash: 0,
  Dirt: 0,
  Stone: 0,
  Iron: 0,
  Coal: 0,
  Gold: 0,
  Diamond: 0,
  Emerald: 0,
  Ruby: 0,
  Sapphire: 0,
  Topaz: 0,
  Amethyst: 0,
  Aquamarine: 0,
  Opal: 0,
  Jade: 0,
  Agate: 0,
  Quartz: 0,
  Moonstone: 0,
  Onyx: 0,
  Pearl: 0,
  Amber: 0,
};



let towerAccess = 0;
let stoneMinerAccess = 0;
let coalMinerAccess = 0;
let ironMinerAccess = 0;
let goldMinerAccess = 0;
let diamondMinerAccess = 0;

let activeQuests = [];
let completedQuests = [];

let swingSpeed = 5.0;

let swingPower = function() {
  const pickaxe = pickaxeData.find(pickaxe => pickaxe.name === currentPickaxe);
  return pickaxe.power;
}


let currentOre = 'Dirt';
let currentPickaxe = 'Wooden Pickaxe';

let Stat = {

  totalDirtMined: 0,
  totalOresMined: 0,
  totalCashCollected: 0,
  totalQuestsCompleted: 0,
  highestPickaxeTier: 1,



}