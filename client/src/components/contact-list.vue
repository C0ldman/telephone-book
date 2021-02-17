<template>
  <div>
  <v-text-field v-model="search"></v-text-field>
  <v-data-table
    :headers="headers"
    :items="contacts"
    :items-per-page="5"
    :search="search"
    :loading="preloader"
    loading-text="Loading... Please wait"
    class="elevation-1"
  ></v-data-table>
  </div>
</template>
<script>

export default {
  name: 'contact-list',
  data: () => ({
    search: '',
    headers: [
      {
        text: 'First name',
        align: 'start',
        sortable: false,
        value: 'first_name',
      },
      {
        text: 'Last name',
        align: 'start',
        sortable: false,
        value: 'last_name',
      },
      {
        text: 'Number',
        sortable: false,
        value: 'number',
      },
    ],
  }),
  props: {
    contacts: {
      type: Array,
    },
    preloader: {
      type: Boolean,
    },
  },
};
</script>
