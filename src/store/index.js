import Vuex from 'vuex';
import Vue from 'vue';

export default function createStore() {
  Vue.use(Vuex);

  new Vuex.Store({
    devtools: false,
    modules: {}
  });
}

export const store = createStore();
