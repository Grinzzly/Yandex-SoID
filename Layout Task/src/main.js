import Vue from 'vue';

import App from './App';
import router from './router';
import registerComponents from './common/registerComponents';
import configureMoment from './common/configureMoment';
import apolloProvider from './common/apollo';
import store from './store';

configureMoment();
registerComponents();

Vue.config.productionTip = false;

/* eslint-disable no-new */
new Vue({
  el: '#app',
  apolloProvider,
  store,
  router,
  render: h => h(App),
});
