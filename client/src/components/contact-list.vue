<template>
  <div>
    <v-row justify="center">
      <v-col cols="12"
             md="8"
             sm="6">
        <v-text-field v-model="search"></v-text-field>
      </v-col>

    </v-row>

    <v-row justify="center">
      <v-col cols="12"
             md="12"
             sm="8">
  <v-data-table
    :headers="headers"
    :items="contacts"
    :items-per-page="5"
    :search="search"
    :loading="preloader"
    loading-text="Loading... Please wait"
    class="elevation-1"
  >
    <template v-slot:item.actions="{ item }">
      <v-icon
        small
        class="mr-2"
        @click="editItem(item)"
      >
        mdi-pencil
      </v-icon>
      <v-icon
        small
        @click="deleteItem(item)"
      >
        mdi-delete
      </v-icon>
    </template>
    <template v-slot:no-data>
      <v-btn
        color="primary"
        @click="initialize"
      >
        Reset
      </v-btn>
    </template>
  </v-data-table>
      </v-col>
    </v-row>
    <v-row justify="center">
      <v-col cols="10"
             md="8"
             sm="6">
      <addNewUser class="add-new-btn"></addNewUser>
      </v-col>
    </v-row>
  </div>
</template>
<script>

import addNewUser from './add-new-user.vue';

export default {
  name: 'contact-list',
  components: {
    addNewUser,
  },
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

<style scope>
v-row {
  padding-bottom: 2em;
}
</style>
