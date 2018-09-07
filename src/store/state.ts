import Mob from '@/models/Mob';
import Spawn from '@/models/Spawn';

export interface ILatLng {
  lat: number;
  lng: number;
}

export default class State {
  currentMob: Mob | null = null;
  spawns: Spawn[] = [];
  coords?: ILatLng = { lat: -42.87936, lng: 147.32941 };
}
