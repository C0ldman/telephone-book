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
        .then((res) => Vue.notify({
          group: 'user',
          type: 'info',
          title: 'Successful!',
          text: `Contact ${res.data.first_name} ${res.data.last_name} saved!`,
        }))
        .catch((e) => {
          console.log('Fail on save: ', e);
          Vue.notify({
            group: 'user',
            type: 'error',
            title: 'Something went wrong!',
            text: 'Can\'t save contact. Please, try again later',
          });
        });
    },
    updateContact: (context, data) => {
      const options = {
        method: 'put',
        url: 'http://localhost:3000/api/contacts',
        data,
      };
      axios(options)
        .then((res) => Vue.notify({
          group: 'user',
          type: 'info',
          title: 'Successful!',
          text: `Contact ${res.data.first_name} ${res.data.last_name} updated!`,
        }))
        .catch((e) => {
          console.log('Fail on update: ', e);
          Vue.notify({
            group: 'user',
            type: 'error',
            title: 'Something went wrong!',
            text: 'Can\'t update contact. Please, try again later',
          });
        });
    },
    getContacts: (state) => {
      state.preloader = true;
      axios
        .get('http://localhost:3000/api/contacts')
        .then((response) => {
          state.contacts = response.data;
          state.preloader = false;
        })
        .catch((e) => {
          console.log('Fail on load: ', e);
          Vue.notify({
            group: 'user',
            type: 'error',
            title: 'Something went wrong!',
            text: 'Can\'t load contacts. Please, try again later',
          });
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
      axios(options)
        .then((response) => {
          const deleted = JSON.parse(response.config.data);
          Vue.notify({
            group: 'user',
            type: 'warning',
            title: 'Successful!',
            text: `Contact ${deleted.first_name} ${deleted.last_name} removed!`,
          });
        })
        .catch((e) => {
          console.log('Fail on delete: ', e);
          Vue.notify({
            group: 'user',
            type: 'error',
            title: 'Something went wrong!',
            text: 'Can\'t delete contact. Please, try again later',
          });
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
