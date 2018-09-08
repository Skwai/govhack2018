import Spawn from '@/models/Spawn';
import mobs, { IMobType, IMobAttackType } from '@/data/mobs';

const XP_PER_LEVEL = 10;

export default class Mob {
  xp: number = 0;
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
    mob.xp = Mob.levelToXp(level);
    mob.name = mobType.name;
    mob.attacks = mobType.attacks;
    return mob;
  }

  static xpToLevel(xp: number) {
    return Math.floor(xp / XP_PER_LEVEL);
  }

  static levelToXp(level: number) {
    return level * XP_PER_LEVEL;
  }
}
