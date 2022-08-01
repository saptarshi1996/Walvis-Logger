import Vue from 'vue';
import Vuex from 'vuex';

import dockerStore from './docker';

Vue.use(Vuex);

export default () => {
  return new Vuex.Store({
    state: {
      error: {},
      isLoading: false
    },

    getters: {
      getIsLoading(state) {
        return state.isLoading;
      }
    },

    mutations: {
      SET_ERROR(state, value) {
        state.error = value;
      }
    },

    modules: {
      dockerStore,
    },
  });
};
