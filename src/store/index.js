import { createStore } from 'vuex'
import createPersistedState from 'vuex-persistedstate'

import auth from '@/store/modules/auth'
import user from '@/store/modules/user'
import classR from '@/store/modules/class'
import session from '@/store/modules/session'
// import { toRaw } from "vue"

const store = createStore({
  modules: {
    auth,
    user,
    classR,
    session
  },
  state () {
    return {
      collapsed: false,
      loadingState: false
    }
  },
  getters: {
    getLoadingState(state) {
      return state.loadingState
    }
  },
  actions: {
    resetState({ commit }) {
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
