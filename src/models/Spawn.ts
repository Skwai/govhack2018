export type ISpawnProperties = Required<Spawn>;

export const spawnTypeMap = new Map([
  ['25lt Drop Plastic', 'Dankosaur'],
  ['120lt Doggie Bins', 'Trashosaur'],
  ['120lt Cage General Waste', 'Filthosaur'],
  ['Stainless Steel Box', 'Scumosoar']
]);

export default class Spawn {
  id?: string;

  coordinates!: firebase.firestore.GeoPoint;
  cooldown!: firebase.firestore.Timestamp;
  type!: string;

  get name(): string | undefined {
    return spawnTypeMap.get(this.type);
  }

  constructor(options: ISpawnProperties) {
    Object.assign(this, options);
  }
}
