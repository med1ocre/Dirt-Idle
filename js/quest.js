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
    flag: { Dirt: 10 },
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
    rewards: { Cash: 50 },
    started: false,
    completed: false,
    unlocked: false,
  },
  {
    name: "Stone Age",
    flag: { Dirt: 25 },
    requirements: { Stone: 10 },
    rewards: { Cash: 75 },
    started: false,
    completed: false,
    unlocked: false,
  },
  {
    name: "Iron Hunter",
    flag: { Stone: 1 },
    requirements: { Iron: 5 },
    rewards: { Dirt: 250 },
    started: false,
    completed: false,
    unlocked: false,
},
{
  name: "Gold Rush",
  flag: { Coal: 1 },
  requirements: { Gold: 10 },
  rewards: { Cash: 1000 },
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
  requirements: { Gold: 1, Diamond: 1, Emerald: 1},
  rewards: { Cash: 1000 },
  started: false,
  completed: false,
  unlocked: false,
},

{
  name: "The Navigator",
  flag: { Dirt: 50 },
  requirements: { Cash: 50 },
  rewards: { Map: 1 },
  started: false,
  completed: false,
  unlocked: false,
  activateMap: function() {
    if(currentOre == 'Dirt'){
      document.getElementById("mineforwardarrow").style.visibility = "visible";
      return;
    }
    document.getElementById("minebackarrow").style.visibility = "visible";
    
  }
}


];

