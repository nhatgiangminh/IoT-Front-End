import { createStore } from 'vuex'
import createPersistedState from 'vuex-persistedstate'

import auth from '@/store/modules/auth'
import user from '@/store/modules/user'
import category from '@/store/modules/category'
import partner from '@/store/modules/partner'
import product from '@/store/modules/product'
import classR from '@/store/modules/class'
import session from '@/store/modules/session'
// import { toRaw } from "vue"

const store = createStore({
  modules: {
    auth,
    user,
    category,
    partner,
    product,
    classR,
    session
  },
  state () {
    return {
      collapsed: false,
      loadingState: false,
      resetFilter: false,
      isDarkTheme: false,
      language: 'vi'
    }
  },
  getters: {
    getLoadingState(state) {
      return state.loadingState
    },
    getResetFilter(state) {
      return state.resetFilter
    },
    getLanguage(state) {
      return state.language
    },
    getDarkTheme(state) {
      return state.isDarkTheme
    }
  },
  actions: {
    resetState({ commit }) {
      // commit('project/RESET')
      // commit('user/RESET')
      commit('user/RESET')
      commit('session/RESET')
      commit('classR/RESET')
    }
  },
  mutations: {
    setCollapse(state) {
      state.collapsed = !state.collapsed
    },
    setLoadingState(state, payload) {
      state.loadingState = payload
    },
    setResetFilter(state, payload) {
      state.resetFilter = payload
    },
    setLanguage(state, payload) {
      state.language = payload
    },
    setDarkTheme(state, payload) {
      state.isDarkTheme = payload
    }
  },
  plugins: [createPersistedState({
    reducer(value) {
      // value.library.currentHoSo = {}
      return value
    },
    rehydrated(store) {
      store.commit('setLoadingState', false)
    }
  })]
})
export default store
