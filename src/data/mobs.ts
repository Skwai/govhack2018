export interface IMobType {
  name: string;
  spawnLevelRange: [number, number];
  baseHealth: number;
  healthMultiplier: number;
  attackMultiplier: number;
  attacks: IMobAttackType[];
}

export interface IMobAttackType {
  name: string;
  damageRange: [number, number];
  missChance: number;
}

export const trashasaur: IMobType = {
  name: 'Trashasaur',
  spawnLevelRange: [1, 4],
  baseHealth: 10,
  healthMultiplier: 2,
  attackMultiplier: 2,
  attacks: [
    {
      name: 'Spill',
      damageRange: [1, 3],
      missChance: 0.5
    }
  ]
};

const mobs: Map<string, IMobType> = new Map();
mobs.set('25lt Drop Plastic', trashasaur);
mobs.set('120lt Doggie Bins', trashasaur);
mobs.set('120lt Cage General Waste', trashasaur);
mobs.set('240lt Cage General Waste', trashasaur);
mobs.set('Stainless Steel Box', trashasaur);
mobs.set('Dog Refuse Bag Dispenser', trashasaur);
mobs.set('Stainless Steel/Mod Wood', trashasaur);
export default mobs;
