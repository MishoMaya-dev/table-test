<template>
  <v-card class="pa-6">
    <v-form
      ref="form"
      v-model="valid"
      lazy-validation
    >
      <div class="mb-4 d-flex justify-space-between align-center">
        <div>
          Добавление пользователя
        </div>
        <v-btn icon @click="$emit('closeForm')">
          <v-icon>
            mdi-close
          </v-icon>
        </v-btn>
      </div>
      <div class="d-flex">
        <div class="pt-3 pb-9 d-flex flex-column justify-space-between form-labels">
          <div>Имя</div>
          <div>Телефон</div>
          <div>Начальник</div>
        </div>
        <div class="d-flex flex-column form-inputs">
          <v-text-field
            v-model="contact.name"
            :rules="[v => !!v || 'Поле имя не должно быть пустым']"
            placeholder="Введите имя"
            required
            outlined
            dense
          />
          <vue-tel-input-vuetify
            v-model="contact.phone"
            placeholder="+7 999 999-99-99"
            :rules="numberRules"
            :onlyCountries="['RU']"
            :maxLen="12"
            label=""
            required
            outlined
            dense
          />
          <v-select
            v-model="contact.bossId"
            :items="contacts"
            placeholder="Выберите руководителя"
            clearable
            item-text="name"
            item-value="id"
            outlined
            dense
          />
        </div>
      </div>
      <v-btn @click="createContact">
        Сохранить
      </v-btn>

    </v-form>
  </v-card>
</template>

<script>

const regPhone = /(\+7|8)[- _]*\(?[- _]*(\d{3}[- _]*\)?([- _]*\d){7}|\d\d[- _]*\d\d[- _]*\)?([- _]*\d){6})/

export default {
  name: 'UserForm',
  props: {
    contacts: Array
  },
  data() {
    return {
      contact: {
        name: '',
        phone: '',
        bossId: null
      },
      valid: true,
      numberRules: [
        v => !!v || 'Введите номер телефона',
        v => (v && regPhone.test(v)) || 'Введите номер в корректном формате',
      ],
    }
  },
  methods: {
    createContact() {
      if (this.$refs.form.validate()) {
        this.$emit('createContact', this.contact)
        this.contact = {
          name: '',
          phone: '',
          bossId: null
        }
      }
    },
  }
}
</script>

<style scoped>
.form-labels {
  width: 150px;
}
.form-inputs {
  width: 300px;
}
</style>