const oreData = [
  { name: 'Dirt', requiredWeight: 1, value: 1 },
  { name: 'Stone', requiredWeight: 2, value: 5 },
  { name: 'Coal', requiredWeight: 3, value: 10 },
  { name: 'Iron', requiredWeight: 4, value: 20 },
  { name: 'Gold', requiredWeight: 5, value: 50 },
  { name: 'Diamond', requiredWeight: 6, value: 100 },
  { name: 'Emerald', requiredWeight: 7, value: 200 },
  { name: 'Ruby', requiredWeight: 8, value: 300 },
  { name: 'Sapphire', requiredWeight: 9, value: 400 },
  { name: 'Topaz', requiredWeight: 10, value: 500 },
  { name: 'Amethyst', requiredWeight: 11, value: 600 },
  { name: 'Aquamarine', requiredWeight: 12, value: 700 },
  { name: 'Opal', requiredWeight: 13, value: 800 },
  { name: 'Jade', requiredWeight: 14, value: 900 },
  { name: 'Agate', requiredWeight: 15, value: 1000 },
  { name: 'Quartz', requiredWeight: 16, value: 1500 },
  { name: 'Moonstone', requiredWeight: 17, value: 2000 },
  { name: 'Onyx', requiredWeight: 18, value: 3000 },
  { name: 'Pearl', requiredWeight: 19, value: 4000 },
  { name: 'Amber', requiredWeight: 20, value: 5000 },
];

const pickaxeData = [
  { name: 'Wooden Pickaxe', weight: 1, power: 1 },
  { name: 'Stone Pickaxe', weight: 2, power: 2, price: { Dirt: 100 } },
  { name: 'Iron Pickaxe', weight: 3, power: 5, price: { Stone: 100 } },
  { name: 'Steel Pickaxe', weight: 4, power: 10, price: { Iron: 100 } },
  { name: 'Bronze Pickaxe', weight: 5, power: 15, price: { Coal: 100 } },
  { name: 'Silver Pickaxe', weight: 6, power: 20, price: { Gold: 100 } },
  { name: 'Gold Pickaxe', weight: 7, power: 30, price: { Diamond: 100 } },
  { name: 'Platinum Pickaxe', weight: 8, power: 40, price: { Emerald: 100 } },
  { name: 'Ruby Pickaxe', weight: 9, power: 50, price: { Ruby: 100 } },
  { name: 'Sapphire Pickaxe', weight: 10, power: 60, price: { Sapphire: 100 } },
  { name: 'Topaz Pickaxe', weight: 11, power: 70, price: { Topaz: 100 } },
  { name: 'Amethyst Pickaxe', weight: 12, power: 80, price: { Amethyst: 100 } },
  { name: 'Aquamarine Pickaxe', weight: 13, power: 90, price: { Aquamarine: 100 } },
  { name: 'Opal Pickaxe', weight: 14, power: 100, price: { Opal: 100 } },
  { name: 'Jade Pickaxe', weight: 15, power: 110, price: { Jade: 100 } },
  { name: 'Agate Pickaxe', weight: 16, power: 120, price: { Agate: 100 } },
  { name: 'Quartz Pickaxe', weight: 17, power: 130, price: { Quartz: 100 } },
  { name: 'Moonstone Pickaxe', weight: 18, power: 140, price: { Moonstone: 100 } },
  { name: 'Onyx Pickaxe', weight: 19, power: 150, price: { Onyx: 100 } },
  { name: 'Pearl Pickaxe', weight: 20, power: 200, price: { Pearl: 100 } },
];


let currentPickaxeDisplay = document.getElementById("currentpickaxe");
let swingPowerDisplay = document.getElementById("swingpower");
let totalDirtElement = document.getElementById('totalDirt');
let totalCashElement = document.getElementById('totalCash');
let totalQuestsElement = document.getElementById('totalQuests');
let highestPickaxeElement = document.getElementById('highestPickaxe');
let dirtMinerCapDisplay = document.getElementById('dirtminercap');
let stoneMinerCapDisplay = document.getElementById('stoneminercap');
let upgradeCapDirtMinerPrice = document.getElementById('upgradecapdirtminerprice');
let upgradeCapStoneMinerPrice = document.getElementById('upgradecapstoneminerprice');
let pickaxeTierDisplay = document.getElementById('pickaxetier');
let upgradePickaxeButton = document.getElementById("upgradepickaxe");
let dirtMinerEffTierDisplay = document.getElementById("dirtminerefftier");
let upgradeDirtMinerEffButton = document.getElementById("upgradedirtminereff");
let playerCurrencyDisplay = document.getElementById("playercurrency");

let convertOneToStoneButton = document.getElementById("converttoonestone");
let convertMaxToStoneButton = document.getElementById("converttomaxstone");


let stoneminer = document.getElementsByClassName("stoneminer");


upgradecapdirtminerprice