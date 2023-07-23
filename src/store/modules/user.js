import axios from '@/plugins/axios'
import router from '@/router'
import { message } from 'ant-design-vue'
import store from '@/store/index'

const initialState = () => {
  return {
    listUser: [],
    user: null,
    rfidData: null
    // listCuDanTrongCanHo: []
  }
}

const user = {
  namespaced: true,
  state: initialState,
  getters: {
    getUser(state) {
      return state.user
    },
    getListUser(state) {
      return state.listUser
    },
    getRfidData(state) {
      return state.rfidData
    }
    // getListCuDanTrongCanHo(state) {
    //   return state.listCuDanTrongCanHo
    // }
  },
  mutations: {
    SET_USER(state, payload) {
      state.user = payload
    },
    SET_LIST_USER(state, payload) {
      state.listUser = payload
    },
    SET_RFID_DATA(state, payload) {
      state.rfidData = payload
    },
    // SET_LIST_CUDAN_CANHO(state, payload) {
    //   state.listCuDanTrongCanHo = payload
    // },
    RESET(state) {
      const init = initialState()
      Object.keys(init).forEach(key => {
        state[key] = init[key]
      })
    }
  },
  actions: {
    async fetchListUser({ commit }) {
      try {
        const res = await axios.get('/v1/users/list')
        commit('SET_LIST_USER', res.data.data)
      } catch (error) {
        commit('SET_LIST_USER', null)
        if (error.response?.data.error) {
          message.error(error.response?.data.error)
        } else {
          message.error('Đã có lỗi xảy ra vui lòng thử lại!')
        }
      }
    },
    async createUser({ dispatch }, apiData) {
      await axios.post('/v1/users', apiData)
      await dispatch('fetchListUser')
    },
    async editUser(context, payload) {
      try {
        const { id, userData } = payload
        await axios.put(`/v1/users/${id}`, userData)
        router.push('/users')
      } catch (error) {
        message.error('Đã có lỗi xảy ra vui lòng thử lại!')
      }
    },
    async deleteUser(context, id) {
      try {
        await axios.put(`/v1/users/${id}/project/${store.getters['project/getCurrentProject']._id}`, { isDeleted: true })
      } catch (error) {
        message.error('Đã có lỗi xảy ra vui lòng thử lại!')
      }
    },
    async getUser({ commit }, id) {
      try {
        const res = await axios.get(`/v1/users/${id}`)
        commit('SET_USER', res.data.data)
      } catch (error) {
        commit('SET_USER', {})
        if (error.response?.data.error) {
          message.error(error.response?.data.error)
        } else {
          message.error('Đã có lỗi xảy ra vui lòng thử lại!')
        }
      }
    },
    async checkRfid({ commit }) {
      const res = await axios.get('/v1/users/check-rfid')
      commit('SET_RFID_DATA', res.data.data)
    },
    async updateRfid({ commit }, userId) {
      try {
        await axios.put('/v1/users/update-rfid', { userId })
        message.success('Cập nhật thẻ sinh viên thành công!')
      } catch (error) {
        if (error.response?.data.error) {
          message.error(error.response?.data.error)
        } else {
          message.error('Đã có lỗi xảy ra vui lòng thử lại!')
        }
      }
    }
  }
}

export default user
