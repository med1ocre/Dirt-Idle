let quests = [
  {
    name: "The Digger",
    flag: { Dirt: 1 },
    requirements: { Dirt: 5 },
    rewards: { Cash: 10 },
    started: false,
    completed: false,
    unlocked: false,
  },
  {
    name: "More Dirt",
    flag: { Dirt: 10, Cash: 15 },
    requirements: { Dirt: 25 },
    rewards: { Cash: 35 },
    started: false,
    completed: false,
    unlocked: false,
  },
  {
    name: "Time to Upgrade",
    flag: { Dirt: 50 },
    requirements: { currentPickaxe: 'Stone Pickaxe' },
    rewards: { "Stone Miner": 1 },
    started: false,
    completed: false,
    unlocked: false,
    unlockStoneMiner: function(){

      stoneMinerAccess = 1;

      updateWorkerMenu();

    }
  },
  {
    name: "Coal Please",
    flag: { Stone: 50 },
    requirements: { currentPickaxe: 'Bronze Pickaxe' },
    rewards: { "Coal Miner": 1 },
    started: false,
    completed: false,
    unlocked: false,
    unlockCoalMiner: function(){

      coalMinerAccess = 1;
      updateWorkerMenu();

    }
  },
  {
    name: "We need Iron",
    flag: { Coal: 50 },
    requirements: { currentPickaxe: 'Iron Pickaxe' },
    rewards: { "Iron Miner": 1 },
    started: false,
    completed: false,
    unlocked: false,
    unlockIronMiner: function(){

      ironMinerAccess = 1;
      updateWorkerMenu();

    }
  },
  {
    name: "Gold Rush",
    flag: { Iron: 50 },
    requirements: { currentPickaxe: 'Steel Pickaxe' },
    rewards: { "Gold Miner": 1 },
    started: false,
    completed: false,
    unlocked: false,
    unlockGoldMiner: function(){

      goldMinerAccess = 1;
      updateWorkerMenu();

    }
  },
  {
    name: "Diamond Farm",
    flag: { Iron: 50 },
    requirements: { currentPickaxe: 'Silver Pickaxe' },
    rewards: { "Diamond Miner": 1 },
    started: false,
    completed: false,
    unlocked: false,
    unlockDiamondMiner: function(){

      diamondMinerAccess = 1;
      updateWorkerMenu();

    }
  },
  {
    name: "Stone Age",
    flag: { Stone: 1 },
    requirements: { Stone: 25 },
    rewards: { Cash: 100 },
    started: false,
    completed: false,
    unlocked: false,
  },
  {
    name: "Iron Hunter",
    flag: { Stone: 25 },
    requirements: { Iron: 25 },
    rewards: { Dirt: 250 },
    started: false,
    completed: false,
    unlocked: false,
},
{
  name: "Diamonds in the Rough",
  flag: { Gold: 15 },
  requirements: { Diamond: 1 },
  rewards: { Cash: 5000 },
  started: false,
  completed: false,
  unlocked: false,
},
{
  name: "The Big Score",
  flag: { Coal: 50 },
  requirements: {Diamond: 1},
  rewards: { Cash: 1000 },
  started: false,
  completed: false,
  unlocked: false,
},

{
  name: "The Navigator",
  flag: { Diamond: 1 },
  requirements: { Dirt: 75 },
  rewards: { Map: 1 },
  started: false,
  completed: false,
  unlocked: false,
  activateMap: function() {
    //Fill this out when you get this part of the game
    
  }
},

{
  name: "The Wizard",
  flag: { Cash: 75 },
  requirements: { Stone: 1 },
  rewards: { Key: 1 },
  started: false,
  completed: false,
  unlocked: false,
  openTower: function() {
    
    towerAccess = 1;
    document.getElementById("towermenu").style.visibility = "visible";



    
  }


},




];

