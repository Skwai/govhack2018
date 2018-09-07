import State from '@/store/state';

export const spawns = ({ spawns }: State) => spawns;
export const coords = ({ coords }: State) => coords;
export const currentMob = ({ currentMob }: State) => currentMob;

export const spawnById = ({ spawns }: State) => (spawnId: string) => spawns.find(({ id }) => id === spawnId);
