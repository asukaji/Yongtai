import Vuex from 'vuex';
import Vue from 'vue';

import control from './control';

Vue.use(Vuex);

export default new Vuex.Store({
  devtools: false,
  
  modules: {
    control
  }
});
