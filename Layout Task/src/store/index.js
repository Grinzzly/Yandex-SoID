import Vue from 'vue';
import Vuex from 'vuex';
import date from './modules/date';
import rooms from './modules/rooms';
import events from './modules/events';
import users from './modules/users';

Vue.use(Vuex);

const store = new Vuex.Store({
  modules: {
    date,
    rooms,
    events,
    users,
  },
});

export default store;
