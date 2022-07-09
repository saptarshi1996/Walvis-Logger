import Vue from "vue";
import Vuex from "vuex";

import containerStore from './container';

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
      containerStore,
    },
  });
};
