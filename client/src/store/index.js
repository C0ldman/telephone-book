import Vue from 'vue';
import Vuex from 'vuex';
import axios from 'axios';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    contacts: [],
    preloader: false,
  },
  mutations: {
  },
  actions: {
  },
  getters: {
    updateContacts: (state) => {
      axios
        .get('http://localhost:3000/api/contacts')
        .then((response) => {
          state.contacts = response.data;
        });
    },
    contacts: (state) => state.contacts,
    preloader: (state) => state.preloader,
  },
  modules: {
  },
});
