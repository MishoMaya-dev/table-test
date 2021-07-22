<script src="../../vue.config.js"></script>
<template>
  <div class="table-main">
    <div class="d-flex justify-end">
      <v-btn
        class="mb-4"
        @click="$emit('openForm')"
      >
        Добавить
      </v-btn>
    </div>

    <v-simple-table>
      <template v-slot:default>
        <thead>
        <tr>
          <th class="text-left cursor-pointer" @click="sortByName">
            Имя
            <v-icon v-if="sortingName !== 'default'" size="14">mdi-chevron-{{sortingName}}</v-icon>
          </th>
          <th class="text-left cursor-pointer" @click="sortByPhone">
            Телефон
            <v-icon v-if="sortingPhone !== 'default'" size="14">mdi-chevron-{{sortingPhone}}</v-icon>
          </th>
        </tr>
        </thead>
        <tbody>
        <template
          v-for="contact in sortContacts"
        >
          <tr
            :key="contact.id"
          >
            <td>{{ contact.name }}</td>
            <td>{{ contact.phone }}</td>
          </tr>
          <tr
            v-for="worker in contact.workers"
            :key="worker.id"
            style="background: #f6f6f6"
          >
            <td style="height: 40px" class="pl-7 d-flex align-center">
              <v-icon size="14">mdi-subdirectory-arrow-right</v-icon>
              <span class="ml-2">
                {{ worker.name }}
              </span>
            </td>
            <td style="height: 40px">{{ worker.phone }}</td>
          </tr>
        </template>

        </tbody>
      </template>
    </v-simple-table>
  </div>
</template>

<script>
export default {
  name: 'UsersTable',
  props: {
    contacts: Array
  },
  data() {
    return {
      sortingName: 'default',
      sortingPhone: 'default'
    }
  },
  computed: {
    sortContacts() {
      const sortedByName = [...this.contacts].sort((a, b) => {
        if (['down', 'up'].includes(this.sortingName)) {
          if(a.name < b.name) { return this.sortingName === 'down' ?  -1 : 1; }
          if(a.name > b.name) { return this.sortingName === 'down' ?  1 : -1; }
          return 0;
        }
        return 0
      })
      return sortedByName.sort((a, b) => {
        if (['down', 'up'].includes(this.sortingPhone)) {
          if(a.phone < b.phone) { return this.sortingPhone === 'down' ?  -1 : 1; }
          if(a.phone > b.phone) { return this.sortingPhone === 'down' ?  1 : -1; }
          return 0;
        }
        return 0
      })
    }
  },
  methods: {
    sortByName() {
      this.sortingPhone = 'default'
      if (this.sortingName === 'default') {
        this.sortingName = 'down'
      } else if (this.sortingName === 'down') {
        this.sortingName = 'up'
      } else {
        this.sortingName = 'default'
      }
    },
    sortByPhone() {
      this.sortingName = 'default'
      if (this.sortingPhone === 'default') {
        this.sortingPhone = 'down'
      } else if (this.sortingPhone === 'down') {
        this.sortingPhone = 'up'
      } else {
        this.sortingPhone = 'default'
      }
    }
  }
}
</script>

<style scoped>
.table-main {
  max-width: 600px;
}
.v-data-table {
  border: 1px solid #c5c5c5!important;
  border-radius: 4px!important;
}
</style>