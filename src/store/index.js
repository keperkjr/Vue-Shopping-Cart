import Vue from "vue";
import Vuex from "vuex";
import actions from "./actions"
import cart from "./modules/cart"
import products from "./modules/products"
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';

Vue.use(Vuex);

// npm i element-ui -S
// https://element.eleme.io/#/en-US/component/quickstart
Vue.use(ElementUI);

export default new Vuex.Store({
    state: { // data
    },

    getters: { // computed properties
    },

    actions: actions,

    mutations: { // Set and update the state
    },

    modules: {
        cart,
        products,
    }
});
