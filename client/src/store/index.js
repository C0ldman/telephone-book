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
    deleteContact: (context, data) => {
      /* eslint-disable */
      const reqUrl = `http://localhost:3000/api/contacts/remove/${data._id}`;
      /* eslint-enable */
      const options = {
        method: 'delete',
        url: reqUrl,
        data,
      };
      axios(options);
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
    deleteContact: (context, data) => {
      context.commit('deleteContact', data);
    },
  },
  getters: {
    contacts: (state) => state.contacts,
    favourite:
(state) => state.contacts.filter((item) => item.is_favourite),
    preloader:
(state) => state.preloader,
  },
  modules: {
  }
  ,
});
