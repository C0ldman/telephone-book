<template>
  <div>
    <v-dialog v-model="isEditorOpened" max-width="600px" persistent>
      <v-card>
        <v-card-title>
          <span class="headline">Edit contact</span>
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
                  v-model="contact.first_name"
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
                  v-model="contact.last_name"
                  :rules="[rules.required]"
                ></v-text-field>
              </v-col>
            </v-row>
            <v-row>
              <v-col cols="12" md="4"
                     sm="6">
                <v-text-field
                  label="Telephone number"
                  v-model="contact.number"
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
  name: 'user-editor',
  props: {
    contact: {
      type: Object,
    },
    isEditorOpened: {
      type: Boolean,
      default: false,
    },
  },
  data: () => ({
    rules: {
      required: (value) => !!value || 'Required.',
    },
  }),
  methods: {
    cancel() {
      this.$emit('closeEditor');
    },
    saveContact() {
      this.$emit('saveContact', this.contact);
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
