<template>
  <div>
    <v-btn @click="openAddPopup">Add</v-btn>
    <v-dialog v-model="isAddOpened" max-width="600px" persistent>
      <v-card>
        <v-card-title>
          <span class="headline">Add new contact</span>
        </v-card-title>
        <v-card-text>
          <v-container>
            <v-row>
              <v-col
                cols="12"
                md="4"
                sm="6"
              >
                <v-text-field
                  label="First name*"
                  required
                  v-model="firstName"
                  :rules="[rules.required]"
                ></v-text-field>
              </v-col>
            </v-row>
            <v-row>
              <v-col
                cols="12"
                md="4"
                sm="6"
              >
                <v-text-field
                  label="Last name"
                  v-model="lastName"
                  :rules="[rules.required]"
                ></v-text-field>
              </v-col>
            </v-row>
            <v-row>
              <v-col cols="12" md="4"
                     sm="6">
                <v-text-field
                  label="Telephone number"
                  v-model="number"
                  type="tel"
                  :rules="[rules.required]"
                  @input="acceptNumber"
                ></v-text-field>
              </v-col>
            </v-row>
          </v-container>
          <small>*indicates required field</small>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn
            color="blue darken-1"
            text
            @click="clearFields"
          >
            Clear
          </v-btn>
          <v-btn
            color="blue darken-1"
            text
            @click="cancel"
          >
            Cancel
          </v-btn>
          <v-btn
            color="blue darken-1"
            text
            @click="saveContact"
          >
            Save
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
export default {
  name: 'add-new-user',
  data: () => ({
    isAddOpened: false,
    firstName: '',
    lastName: '',
    number: '',
    rules: {
      required: (value) => !!value || 'Required.',
    },
  }),
  methods: {
    openAddPopup() {
      this.isAddOpened = true;
    },
    clearFields() {
      this.firstName = '';
      this.lastName = '';
      this.number = '';
    },
    cancel() {
      this.clearFields();
      this.isAddOpened = false;
    },
    saveContact() {
      const contact = {
        firstName: this.firstName,
        lastName: this.lastName,
        number: this.number,
      };
      this.$store.dispatch('addNewContact', contact).then(() => {
        this.$store.dispatch('updateContacts');
      });
      this.cancel();
    },
    acceptNumber() {
      this.number = this.number.replace(/\D/g, '');
      const x = this.number.replace(/\D/g, '').match(/(\d{0,3})(\d{0,3})(\d{0,2})(\d{0,2})/);
      this.number = !x[2] ? x[1] : `(${x[1]}) ${x[2]}${x[4] ? `-${x[3]}-${x[4]}` : `-${x[3]}`}`;
    },
  },
};
</script>

<style scoped>

</style>
