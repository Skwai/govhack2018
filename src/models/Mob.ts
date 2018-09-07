import Spawn, { spawnTypeMap } from '@/models/Spawn';

export default class Mob {
  type: string = '';
  level: number = 0;
  name: string = '';
  health: number = 0;

  static fromSpawn(spawn: Spawn) {
    const mob = new Mob();
    mob.type = spawn.type;
    mob.level = Math.ceil(Math.random() * 10);
    mob.name = spawn.name!;
    mob.health = mob.level * 10;
    return mob;
  }
}
