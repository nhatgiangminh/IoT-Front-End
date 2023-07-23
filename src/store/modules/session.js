import axios from '@/plugins/axios'
import { message } from 'ant-design-vue'

const initialState = () => {
  return {
    session: null,
    rfidData: null
    // listCuDanTrongCanHo: []
  }
}
const session = {
  namespaced: true,
  state: initialState,
  getters: {
    getSession(state) {
      return state.session
    }
  },
  actions: {
    async fetchSession({ commit }, sessionId) {
      try {
        const res = await axios.get(`/v1/session/${sessionId}`)
        commit('SET_SESSION', res.data.data)
      } catch (error) {
        commit('SET_SESSION', null)
        if (error.response?.data.error) {
          message.error(error.response?.data.error)
        } else {
          message.error('Đã có lỗi xảy ra vui lòng thử lại!')
        }
      }
    },
    async createSession({ rootGetters, commit }) {
      try {
        const classId = rootGetters['classR/getClass']._id
        const res = await axios.post('/v1/session', { classId })
        commit('SET_SESSION', res.data.data)
        message.success('Đã tạo buổi học mới!')
      } catch (error) {
        if (error.response?.data.error) {
          message.error(error.response?.data.error)
        } else {
          message.error('Đã có lỗi xảy ra vui lòng thử lại!')
        }
      }
    },
    async joinSession({ commit, dispatch }, payload) {
      const res = await axios.get(`/v1/session/check-in/${payload}`)
      message.success('Lấy thông tin RFID thành công!')
      await dispatch('fetchSession', payload)
      commit('SET_RFID_DATA', res.data.data)
    },
    async endSession({ getters }) {
      try {
        const sessionId = getters['getSession']._id
        await axios.put(`/v1/session/${sessionId}`, { isActive: false })
      } catch (error) {
        if (error.response?.data.error) {
          message.error(error.response?.data.error)
        } else {
          message.error('Đã có lỗi xảy ra vui lòng thử lại!')
        }
      }
    }
  },
  mutations: {
    SET_SESSION(state, payload) {
      state.session = payload
    },
    SET_RFID_DATA(state, payload) {
      state.rfidData = payload
    },
    RESET(state) {
      const init = initialState()
      Object.keys(init).forEach(key => {
        state[key] = init[key]
      })
    }
  }
}
export default session
