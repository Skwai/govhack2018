import Mob from '@/models/Mob';
import Spawn from '@/models/Spawn';

export default class GameState {
  currentMob: Mob | null = null;
  spawns: Spawn[] = [];
}
