import Vue from 'vue';
import Notifications from 'vue-notification';
import App from './App.vue';
import store from './store';
import vuetify from './plugins/vuetify';

Vue.use(Notifications);
Vue.config.productionTip = false;
new Vue({
  store,
  vuetify,
  render: (h) => h(App),
}).$mount('#app');
