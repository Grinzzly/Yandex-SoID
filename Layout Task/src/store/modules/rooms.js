import apollo from '@/common/apollo';
import gql from 'graphql-tag';

export default {
  namespaced: true,
  state: {
    data: [],
    isLoaded: false,
    isLoading: false,
  },
  mutations: {
    FETCH(state) {
      Object.assign(state, {
        isLoaded: false,
        isLoading: true,
      });
    },
    FETCH_SUCCESS(state, data) {
      Object.assign(state, {
        data: data.data.rooms,
        isLoaded: true,
        isLoading: false,
      });
    },
  },
  actions: {
    async fetch({ commit, state }, force = false) {
      if (force || (!state.isLoaded && !state.isLoading)) {
        commit('FETCH');
        const data = await apollo.query({
          query: gql`{
            rooms {
              id
              title
              capacity
              floor
            }
          }`,
        });
        commit('FETCH_SUCCESS', data);
      }
    },
  },
};
