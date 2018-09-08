import Spawn from '@/models/Spawn';
import mobs, { IMobType, IMobAttackType } from '@/data/mobs';

export default class Mob {
  level: number = 0;
  name: string = '';
  health: number = 0;
  attacks: IMobAttackType[] = [];

  static fromSpawn(spawn: Spawn) {
    const mobType = mobs.get(spawn.type)!;
    return Mob.fromType(mobType);
  }

  static fromType(mobType: IMobType) {
    const mob = new Mob();
    const [minLevel, maxLevel] = mobType.spawnLevelRange;
    const level = minLevel + Math.floor(Math.random() * (maxLevel - minLevel));

    mob.name = mobType.name;
    mob.level = level;
    mob.name = mobType.name;
    mob.attacks = mobType.attacks;
    return mob;
  }
}
