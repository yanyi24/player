import Vue from 'vue'
import App from './App.vue'
import './registerServiceWorker'
import router from './router'
import store from './store'
// import Antd from 'ant-design-vue';
import 'ant-design-vue/dist/antd.css';
Vue.config.productionTip = false;
import { Button, Drawer, List, Select } from 'ant-design-vue';
Vue.use(Button);
Vue.use(Drawer);
Vue.use(List);
Vue.use(Select);
// Vue.use(Antd);
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
