import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import {currency} from "@/currency"
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';

Vue.config.productionTip = false;
Vue.filter('currency', currency);

// npm i element-ui -S
// https://element.eleme.io/#/en-US/component/quickstart
Vue.use(ElementUI);

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
