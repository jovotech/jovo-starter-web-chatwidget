import JovoWebClientVue, { JovoWebClientVueConfig } from '@jovotech/client-web-vue2';
import Vue from 'vue';
import App from './App.vue';

Vue.config.productionTip = false;

Vue.use<JovoWebClientVueConfig>(JovoWebClientVue, {
  endpointUrl: process.env.VUE_APP_CLIENT_ENDPOINT_URL || 'http://localhost:3000/webhook',
  config: {
    output: {
      audioPlayer: {
        enabled: false,
      },
      speechSynthesizer: {
        enabled: false,
      },
      reprompts: {
        enabled: false,
      },
    },
  },
});

new Vue({
  render: (h) => h(App),
}).$mount('#app');
