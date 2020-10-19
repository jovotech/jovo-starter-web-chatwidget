import Vue from 'vue';
import App from './App.vue';

import JovoWebClientVue, { JovoWebClientVueConfig } from 'jovo-client-web-vue';

Vue.config.productionTip = false;

Vue.use<JovoWebClientVueConfig>(JovoWebClientVue, {
  url: `https://webhook.jovo.cloud/<id>`,
  client: {},
});

new Vue({
  render: (h) => h(App),
}).$mount('#app');
