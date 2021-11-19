import Vue from 'vue';
import App from './App';
import router from './router';
import { store } from './store';
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';

import AmapVue from '@amap/amap-vue';

AmapVue.config.version = '2.0'; // 默认2.0，这里可以不修改
AmapVue.config.key = '421fba86e65921ca44ee5b4254d39f7d';
AmapVue.config.plugins = [
  'AMap.ToolBar',
  'AMap.MoveAnimation',
  'AMap.SatelliteLayer'
  // 在此配置你需要预加载的插件，如果不配置，在使用到的时候会自动异步加载
];

// Vue.use(AmapVue);
Vue.use(ElementUI);

Vue.config.productionTip = false;

new Vue({
  store,
  router,
  render: (h) => h(App)
}).$mount('#app');
