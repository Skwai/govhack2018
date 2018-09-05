import { MutationTree } from 'vuex';
import State from './state';

const mutations: MutationTree<State> = {
  setExample(state, value: string) {
    state.example = value;
  }
};

export default mutations;
