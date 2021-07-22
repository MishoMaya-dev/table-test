import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const CONTACTS = 'CONTACTS'
const defaultContacts = [
  {
    id: 1,
    name: 'Маргарита',
    phone: '+7 995 227-99-82',
    workers: []
  },
  {
    id: 2,
    name: 'Алексей',
    phone: '+7 964 825-69-48',
    workers: [
      {
        id: 3,
        name: 'Иван',
        phone: '+7 935 462-15-89'
      }
    ]
  },
]

export default new Vuex.Store({
  state: {
    contacts: JSON.parse(localStorage.getItem(CONTACTS)) || defaultContacts
  },
  mutations: {
    createContact(state, contact) {
      state.contacts.push(contact)
    },
    createSubContact(state, contact) {
      const boss = state.contacts.find(c => c.id === contact.bossId)
      delete contact.bossId
      boss.workers.push(contact)
    }
  },
  actions: {
    createContact({ commit, dispatch }, contact) {
      try {
        contact.id = +Date.now()
        if (contact.bossId) {
          commit('createSubContact', contact)
        } else {
          delete contact.bossId
          contact.workers = []
          commit('createContact', contact)
        }
        dispatch('saveInLocalStorage')
      } catch (e) {
        throw e
      }
    },
    saveInLocalStorage({ state }) {
      localStorage.setItem(CONTACTS, JSON.stringify(state.contacts))
    }
  },
  getters: {
    allContacts(state) {
      return state.contacts
    }
  }
})
