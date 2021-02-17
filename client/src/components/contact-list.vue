<template>
  <v-container>
    <v-text >{{this.contacts}}</v-text>
  </v-container>
</template>

<script>
export default {
  name: 'HelloWorld',

  data: () => ({

  }),
  computed: {
    contacts() {
      return this.$store.getters.contacts;
    },
  },
};
</script>
