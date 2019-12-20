import Vue from 'vue'
import App from './App.vue'
import VueRouter from 'vue-router';
import Vuetify from "vuetify";

import "vuetify/dist/vuetify.min.css";
import routes from './routes';

Vue.config.productionTip = false;
Vue.use(Vuetify);
Vue.use(VueRouter);

window.Vue = Vue;

const router = new VueRouter({routes});

new Vue({
    router,
    render: h => h(App)
}).$mount('#app');
