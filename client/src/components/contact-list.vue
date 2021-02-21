<template>

  <v-data-table
    :headers="headers"
    :items="contacts"
    :items-per-page="5"
    :search="search"
    :loading="preloader"
    loading-text="Loading... Please wait"
    class="elevation-1"
  >
    <template v-slot:items="props">
      <td>{{ props.item.first_name }}</td>
      <td>{{ props.item.last_name }}</td>
      <td>{{ props.item.number }}</td>
      <td class="justify-center layout px-0">
        <v-icon
          small
          class="mr-2"
          @click="favourite(props.item)"
        >
          favourite
        </v-icon>
        <v-icon
          small
          class="mr-2"
          @click="editItem(props.item)"
        >
          edit
        </v-icon>
        <v-icon
          small
          @click="deleteItem(props.item)"
        >
          delete
        </v-icon>
      </td>
    </template>
    <template v-slot:no-data>
      No contscts avaliable
    </template>
  </v-data-table>

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
        sortable: true,
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
      { text: 'Actions', value: 'name', sortable: false },
    ],
  }),
  props: {
    contacts: {
      type: Array,
    },
    preloader: {
      type: Boolean,
    },
    search: {
      type: String,
      default: '',
    },
  },

};
</script>

<style scope>
v-row {
  padding-bottom: 2em;
}
</style>
