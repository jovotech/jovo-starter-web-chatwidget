import JovoWebClientVue, { JovoWebClientVueConfig, Client } from 'jovo-client-web-vue';
import Vue from 'vue';
import App from './App.vue';

Vue.config.productionTip = false;

Vue.use<JovoWebClientVueConfig>(JovoWebClientVue, {
  url: `https://webhook.jovo.cloud/max-ripper`,
  client: {},
});

new Vue({
  render: (h) => h(App),
}).$mount('#app');
