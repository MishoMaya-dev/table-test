<template>
  <v-app>
    <v-main>
      <div class="pa-5">
        <UsersTable
          :contacts="contacts"
          @openForm="dialog = true"
        />
        <v-dialog
          v-model="dialog"
          transition="dialog-top-transition"
          max-width="570px"
          hide-overlay
          persistent
        >
          <UserForm
            :contacts="contacts"
            @closeForm="dialog = false"
            @createContact="createContact"
          />
        </v-dialog>
      </div>
    </v-main>
  </v-app>
</template>

<script>

import UsersTable from './components/UsersTable'
import UserForm from './components/UserForm'

export default {
  name: 'App',
  components: {
    UsersTable,
    UserForm
  },
  data() {
    return {
      dialog: false
    }
  },
  computed: {
    contacts() {
      return this.$store.getters.allContacts
    }
  },
  methods: {
    createContact(contact) {
      this.dialog = false
      this.$store.dispatch('createContact', contact)
    }
  }
}
</script>

<style>
.v-dialog__content {
  justify-content: flex-end!important;
  align-items: end!important;
}
.cursor-pointer {
  cursor: pointer;
}
</style>