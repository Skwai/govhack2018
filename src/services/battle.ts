import Mob from '@/models/Mob';
import { IMobAttackType } from '@/data/mobs';

export enum OutcomeType {
  MISS,
  HIT,
  CRITICAL
}
export interface IFightResult {
  outcome: OutcomeType;
  damage: number;
}
export const fight = (attacker: Mob, defender: Mob, attack: IMobAttackType): IFightResult => {
  const roll = Math.random();
  if (roll > attack.missChance) {
    const damage = calcDamage(attack.damageRange);
    const multiplier = calcMultiplier(attacker, defender);
    const critical = Math.random() < 0.2;
    if (critical) {
      return { outcome: OutcomeType.CRITICAL, damage: damage * multiplier * 2 };
    } else {
      return { outcome: OutcomeType.HIT, damage: damage * multiplier };
    }
  } else {
    return { outcome: OutcomeType.MISS, damage: 0 };
  }
};

const calcDamage = (damageRange: [number, number]): number => {
  const [min, max] = damageRange;
  return randInt(min, max);
};

const calcMultiplier = (attacker: Mob, defender: Mob): number => {
  const attackerLevel = Mob.xpToLevel(attacker.xp);
  const defenderLevel = Mob.xpToLevel(defender.xp);

  if (attackerLevel === defenderLevel) {
    return 1;
  } else if (attackerLevel > defenderLevel) {
    const diff = attackerLevel - defenderLevel;
    return randNum(1, 1 + diff);
  } else {
    const diff = defenderLevel - attackerLevel;
    return randNum(Math.max(1 / diff - 0.2), 1);
  }
};

const randInt = (min: number, max: number): number => Math.floor(min + Math.random() * (max - min + 1));
const randNum = (min: number, max: number): number => min + Math.random() * (max - min + 1);
