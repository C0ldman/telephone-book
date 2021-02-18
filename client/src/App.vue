<template>
  <v-app>
    <contactList :contacts="contacts" :preloader="preloader"></contactList>
<!--    <preloader :show="preloader"></preloader>-->
  </v-app>
</template>

<script>
import contactList from './components/contact-list.vue';

// import preloader from './components/preloader.vue';

export default {
  name: 'App',

  components: {
    contactList,
    // preloader,
  },
  computed: {
    contacts() {
      return this.$store.getters.contacts;
    },
    preloader() {
      return this.$store.getters.preloader;
    },
  },
  beforeMount() {
    return this.$store.getters.updateContacts;
  },
  data: () => ({
    //
  }),
};
</script>

<style scoped>
</style>
