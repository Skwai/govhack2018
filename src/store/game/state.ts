import Mob from '@/models/Mob';
import Spawn from '@/models/Spawn';
import User from '@/models/User';
import Trashemon from '@/models/Trashemon';

export default class GameState {
  currentMob: Mob | null = null;
  currentTrashemon: Trashemon | null = null;
  spawns: Spawn[] = [];
  users: User[] = [];
  currentUser: User | null = null;
  trashemons: Trashemon[] = [];
}
