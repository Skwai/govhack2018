import { ActionContext } from 'vuex';
import StoreState from '@/store/state';

type Context = ActionContext<StoreState, StoreState>;

export const updateExample = ({ commit }: Context, value: string) => {
  commit('setExample', value);
};
