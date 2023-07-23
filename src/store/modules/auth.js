import axios from '@/plugins/axios'
import router from '@/router/index'
import { message } from 'ant-design-vue'

const auth = {
  namespaced: true,
  state: () => ({
    isAuthenticated: false,
    userData: null
  }),
  getters: {
    getUserData(state) {
      return state.userData
    },
    getIsAuthenticated(state) {
      return state.isAuthenticated
    }
  },
  actions: {
    async login({ dispatch, commit }, userInput) {
      try {
        commit('setLoadingState', true, { root: true })
        const response = await axios.post('/v1/users/login', userInput)
        localStorage.setItem('token', response.data.data.token)
        localStorage.setItem('refresh_token', response.data.data.refreshToken)
        await dispatch('fetchUser')
        commit('setLoadingState', false, { root: true })
      } catch (error) {
        commit('setLoadingState', false, { root: true })
        if (error.response.data?.error) {
          message.error(error.response.data.error)
        } else message.error('Đã có lỗi xảy ra vui lòng thử lại')
      }
    },
    setToken({ commit }, token) {
      localStorage.setItem('token', token)
      commit('SET_TOKEN', token)
    },
    refreshToken({ commit }) {
      commit('REFRESH_TOKEN')
    },
    logout({ commit, dispatch }) {
      router.replace('/login')
      dispatch('resetState', null, { root: true })
      commit('LOGOUT')
      localStorage.removeItem('token')
      localStorage.removeItem('refresh_token')
      sessionStorage.clear()
    },
    async fetchUser({ commit }) {
      const res = await axios.get('/v1/users')
      commit('SET_USER_DATA', res.data.data)
    },
    async changePassword({ context }, userPassword) {
      await axios.put('/v1/users/change-password', userPassword)
    },
    async updateUser({ dispatch }, { id, userData }) {
      await axios.put(`/v1/users/${id}`, userData)
      await dispatch('fetchUser')
    }
  },
  mutations: {
    SET_USER_DATA(state, userData) {
      state.userData = userData
      state.isAuthenticated = true
    },
    REFRESH_TOKEN(state) {
      state.isAuthenticated = true
      state.userData = { ...state.userData }
    },
    LOGOUT(state) {
      state.isAuthenticated = false
      state.userData = null
    }
  }
}
export default auth
