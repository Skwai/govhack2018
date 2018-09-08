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
  name: 'Trashinator',
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

export enum MobTypes {
  TRASHOAUR = '25lt Drop Plastic',
  SCUMOSAUR = '120lt Doggie Bins',
  FILTHOSAUR = '120lt Cage General Waste',
  DANKOSAUR = '240lt Cage General Waste',
  SEEDOSAUR = 'Stainless Steel Box',
  DOGOSAUR = 'Dog Refuse Bag Dispenser',
  STANKOSAUR = 'Stainless Steel/Mod Wood'
}

const mobs: Map<string, IMobType> = new Map();
mobs.set(MobTypes.TRASHOAUR, trashasaur);
mobs.set(MobTypes.SCUMOSAUR, trashasaur);
mobs.set(MobTypes.FILTHOSAUR, trashasaur);
mobs.set(MobTypes.DANKOSAUR, trashasaur);
mobs.set(MobTypes.SEEDOSAUR, trashasaur);
mobs.set(MobTypes.DOGOSAUR, trashasaur);
mobs.set(MobTypes.STANKOSAUR, trashasaur);
export default mobs;
