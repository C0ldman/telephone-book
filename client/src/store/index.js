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
      axios(options);
    },
    updateContact: (context, data) => {
      const options = {
        method: 'put',
        url: 'http://localhost:3000/api/contacts',
        data,
      };
      axios(options);
    },
    getContacts: (state) => {
      state.preloader = true;
      axios
        .get('http://localhost:3000/api/contacts')
        .then((response) => {
          state.contacts = response.data;
          state.preloader = false;
        });
    },
  },
  actions: {
    addNewContact: (context, data) => {
      context.commit('addNewContact', data);
    },
    getContacts: (context) => {
      context.commit('getContacts');
    },
    updateContact: (context, data) => {
      context.commit('updateContact', data);
    },
  },
  getters: {
    contacts: (state) => state.contacts,
    favourite:
(state) => state.contacts.filter((item) => item.isFavourite),
    preloader:
(state) => state.preloader,
  },
  modules: {
  }
  ,
});
