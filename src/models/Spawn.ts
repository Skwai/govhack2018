import { firestore } from 'firebase';
import mobs, { IMobType } from '@/data/mobs';

export type SpawnProperties = Required<Spawn>;

export default class Spawn {
  id?: string;

  coordinates!: firestore.GeoPoint;
  cooldown!: firestore.Timestamp;
  type!: string;
  lat!: number;
  lng!: number;

  get mob(): IMobType {
    return mobs.get(this.type)!;
  }

  get name(): string {
    return this.mob.name;
  }

  constructor(props: SpawnProperties) {
    Object.assign(this, props);
  }
}
