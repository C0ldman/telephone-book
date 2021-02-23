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
      <v-tooltip bottom open-delay="650">
        <template v-slot:activator="{ on, attrs }">
          <v-icon
            class="mr-2"
            v-bind="attrs" v-on="on"
            :class="{active: item.is_favourite}"
            @click="toggleFavourite(item)"
          >mdi-account-heart-outline
          </v-icon>
        </template>
        <span>Favourite</span>
      </v-tooltip>

      <v-tooltip bottom open-delay="650">
        <template v-slot:activator="{ on, attrs }">
          <v-icon
            class="mr-2"
            v-bind="attrs" v-on="on"
            @click="editItem(item)"
          >
            mdi-account-edit-outline
          </v-icon>
        </template>
        <span>Edit</span>
      </v-tooltip>

      <v-tooltip bottom open-delay="650">
        <template v-slot:activator="{ on, attrs }">
          <v-icon
            v-bind="attrs" v-on="on"
            @click="deleteContact(item)"
          >
            mdi-account-remove-outline
          </v-icon>
        </template>
        <span>Delete</span>
      </v-tooltip>

    </template>
    <template v-slot:no-data>
      {{placeholder}}
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
    placeholder: {
      type: String,
      default: 'No contacts avaliable',
    },
  },
  methods: {
    toggleFavourite(contact) {
      this.$emit('toggleFavourite', { ...contact });
    },
    editItem(contact) {
      this.$emit('editContact', { ...contact });
    },
    deleteContact(contact) {
      this.$emit('deleteContact', { ...contact });
    },
  },
};
</script>

<style scope>
.v-icon.mdi.active {
  color: #ff9400;
}
</style>
