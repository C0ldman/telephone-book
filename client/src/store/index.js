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
    addNewContact: (context, data) => {
      const options = {
        method: 'post',
        url: 'http://localhost:3000/api/contacts',
        data,
      };
      axios(options)
        .then(() => {});
    },
    updateContacts: (state) => {
      axios
        .get('http://localhost:3000/api/contacts')
        .then((response) => {
          state.contacts = response.data;
        });
    },
  },
  actions: {
    addNewContact: (context, data) => {
      context.commit('addNewContact', data);
    },
    updateContacts: (context) => {
      context.commit('updateContacts');
    },
  },
  getters: {
    contacts: (state) => state.contacts,
    preloader: (state) => state.preloader,
  },
  modules: {
  },
});
