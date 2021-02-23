<template>
  <v-data-table
    :headers="headers"
    :items="contacts"
    class="elevation-1"
    :items-per-page="5"
    :search="search"
    :loading="preloader"
    loading-text="Loading... Please wait">

    <template v-slot:item.actions="{item}">
      <v-icon
        class="mr-2"
        :class="{active: item.is_favourite}"
        @click="favourite(item)"
      >
        mdi-account-heart-outline
      </v-icon>
      <v-icon
        class="mr-2"
        @click="editItem(item)"
      >
        mdi-account-edit-outline
      </v-icon>
      <v-icon
        @click="deleteItem(item)"
      >
        mdi-account-remove-outline
      </v-icon>
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
      {
        text: 'Actions',
        value: 'actions',
        sortable: false,
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
    search: {
      type: String,
      default: '',
    },
  },
  methods: {
    favourite(contact) {
      const newContact = contact;
      newContact.is_favourite = !newContact.is_favourite;
      this.$store.dispatch('updateContact', contact).then(() => {
        this.$store.dispatch('getContacts');
      });
    },
    editItem(contact) {
      console.log(contact);
    },
    deleteItem(contact) {
      this.$store.dispatch('deleteContact', contact).then(() => {
        this.$store.dispatch('getContacts');
      });
    },
  },
};
</script>

<style scope>
.v-icon.mdi.active {
  color: #ff9400;
}
</style>
