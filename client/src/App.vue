<template>
  <v-app>
    <v-tabs>
      <v-tab key="contacts-tab">Contacts</v-tab>
      <v-tab key="favourite-tab">Favourite</v-tab>
      <v-tab-item key="c">
        <contactList :contacts="contacts" :preloader="preloader"></contactList>
      </v-tab-item>
      <v-tab-item key="f">
        <contactList :contacts="favourite" :preloader="preloader"></contactList>
      </v-tab-item>
    </v-tabs>
    <addNewUser></addNewUser>
    <notifications group="user" />
  </v-app>
</template>

<script>
import contactList from './components/contact-list.vue';
import addNewUser from './components/add-new-user.vue';

export default {
  name: 'App',

  components: {
    contactList,
    addNewUser,
  },
  computed: {
    contacts() {
      return this.$store.getters.contacts;
    },
    favourite() {
      return this.$store.getters.favourite;
    },
    preloader() {
      return this.$store.getters.preloader;
    },
  },
  beforeMount() {
    return this.$store.dispatch('getContacts');
  },
  data: () => ({
    //
  }),
};
</script>

<style scoped>
*{
  font-family: Roboto, sans-serif;
}
</style>
