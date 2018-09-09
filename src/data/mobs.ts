export interface IMobType {
  type: string;
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

export enum MobTypes {
  TRASHOSAUR = '25lt Drop Plastic',
  SCUMOSAUR = '120lt Doggie Bins',
  FILTHOSAUR = '120lt Cage General Waste',
  DANKOSAUR = '240lt Cage General Waste',
  SEEDOSAUR = 'Stainless Steel Box',
  DOGOSAUR = 'Dog Refuse Bag Dispenser',
  STANKOSAUR = 'Stainless Steel/Mod Wood',
  WINDOSAUR = 'Escaped Trashemon'
}

export const trashosaur: IMobType = {
  name: 'Trashosaur',
  type: MobTypes.TRASHOSAUR,
  spawnLevelRange: [1, 4],
  baseHealth: 10,
  healthMultiplier: 2,
  attackMultiplier: 2,
  attacks: [
    {
      name: 'Spill',
      damageRange: [1, 2],
      missChance: 0.25
    },
    {
      name: 'Overflow',
      damageRange: [2, 5],
      missChance: 0.50
    },
    {
      name: 'Combust',
      damageRange: [2, 4],
      missChance: 0.75
    }
  ]
};

const mobs: Map<string, IMobType> = new Map();
mobs.set(MobTypes.TRASHOSAUR, trashosaur);
mobs.set(MobTypes.SCUMOSAUR, trashosaur);
mobs.set(MobTypes.FILTHOSAUR, trashosaur);
mobs.set(MobTypes.DANKOSAUR, trashosaur);
mobs.set(MobTypes.SEEDOSAUR, trashosaur);
mobs.set(MobTypes.DOGOSAUR, trashosaur);
mobs.set(MobTypes.STANKOSAUR, trashosaur);
mobs.set(MobTypes.WINDOSAUR, trashosaur);
export default mobs;
