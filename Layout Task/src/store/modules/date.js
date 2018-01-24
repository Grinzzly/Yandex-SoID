import moment from 'moment';

export default {
  namespaced: true,
  state: {
    date: Date.now(),
  },
  mutations: {
    GO_TO_NEXT_DAY(state) {
      state.date = moment(state.date).add(1, 'day').valueOf();
    },
    GO_TO_PREVIOUS_DAY(state) {
      state.date = moment(state.date).subtract(1, 'day').valueOf();
    },
    SET_DATE(state, date) {
      state.date = date;
    },
  },
  getters: {
    earliestMoment(state) {
      return moment(state.date).set({
        hour: 7,
        minute: 0,
        second: 0,
      });
    },
    latestMoment(state) {
      return moment(state.date).add(1, 'days').set({
        hour: 0,
        minute: 0,
        second: 0,
      });
    },
  },
};
