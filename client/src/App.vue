<template>
  <v-app>
    <v-row>
    <v-col>

    <v-row class="mt-2" justify="space-around">
      <v-col cols="4">
    <v-text-field class="search" v-model="search"
                  prepend-icon="mdi-card-search-outline"
                  label="Search"
                  clearable></v-text-field>
      </v-col>
      <v-col cols="1">
        <add-new-user></add-new-user>
      </v-col>
    </v-row>

    <v-row justify="center">
      <v-col cols="8">
        <v-tabs>
          <v-tab key="contacts-tab">Contacts</v-tab>
          <v-tab key="favourite-tab">Favourite</v-tab>
          <v-tab-item key="c">
            <contactList :contacts="contacts" @editContact="openEditor"
                     @toggleFavourite="toggleFavourite"
                     @deleteContact="deleteContact"
                     :search="search"
                     :preloader="preloader"></contactList>
            </v-tab-item>
            <v-tab-item key="f">
              <contactList :contacts="favourite" @editContact="openEditor"
                     @toggleFavourite="toggleFavourite"
                     @deleteContact="deleteContact"
                     :search="search"
                           placeholder="No favourites contacts"
                     :preloader="preloader"></contactList>
            </v-tab-item>
        </v-tabs>
      </v-col>
    </v-row>
    </v-col>
    </v-row>
    <user-editor :isEditorOpened="editMode" :contact="editingContact"
                 @closeEditor="closeEditor"
                 @saveContact="saveContact"></user-editor>
    <notifications group="user" />
  </v-app>
</template>

<script>
import contactList from './components/contact-list.vue';
import addNewUser from './components/add-new-user.vue';
import userEditor from './components/user-editor.vue';

export default {
  name: 'App',

  components: {
    contactList,
    addNewUser,
    userEditor,
  },
  data: () => ({
    editMode: false,
    editingContact: {},
    search: '',
  }),
  methods: {
    openEditor(contact) {
      this.editingContact = contact;
      this.editMode = true;
    },
    closeEditor() {
      this.editingContact = {};
      this.editMode = false;
    },
    saveContact(contact) {
      this.$store.dispatch('updateContact', contact).then(() => {
        this.$store.dispatch('getContacts');
      });
    },
    toggleFavourite(contact) {
      const newContact = { ...contact };
      newContact.is_favourite = !newContact.is_favourite;
      this.$store.dispatch('updateContact', newContact).then(() => {
        this.$store.dispatch('getContacts');
      });
    },
    deleteContact(contact) {
      this.$store.dispatch('deleteContact', contact).then(() => {
        this.$store.dispatch('getContacts');
      });
    },
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

};
</script>

<style scoped>
*{
  font-family: Roboto, sans-serif;
}
</style>
