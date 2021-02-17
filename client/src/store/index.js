import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    contacts: [
      {
        _id: {
          $oid: '602d7269f7e04204b3f1fc4d',
        },
        number: '0971234585',
        first_name: 'John',
        last_name: 'Doe',
      }, {
        _id: {
          $oid: '602d727ef7e04204b3f1fc4e',
        },
        number: '1218888888',
        first_name: 'Michael',
        last_name: 'Jackson',
      }, {
        _id: {
          $oid: '602d729af7e04204b3f1fc4f',
        },
        number: '1218889928',
        first_name: 'Flash',
        last_name: 'Gordon',
      }, {
        _id: {
          $oid: '602d769af7e04204b2f1fc4f',
        },
        number: '1558449887',
        first_name: 'Clark',
        last_name: 'Kent',
      },
    ],
    preloader: false,
  },
  mutations: {
  },
  actions: {
  },
  getters: {
    contacts: (state) => state.contacts,
    preloader: (state) => state.preloader,
  },
  modules: {
  },
});
