const quests = [
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
    flag: { Dirt: 100 },
    requirements: { Stone: 10 },
    rewards: { Cash: 75 },
    started: false,
    completed: false,
    unlocked: false,
  },
];

