import Mob from '@/models/Mob';
import Spawn from '@/models/Spawn';
import User from '@/models/User';

export default class GameState {
  currentMob: Mob | null = null;
  spawns: Spawn[] = [];
  currentUser: User | null = null;
}
