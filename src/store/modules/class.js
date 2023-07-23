import axios from '@/plugins/axios'
import { message } from 'ant-design-vue'

const initialState = () => {
  return {
    listClass: [],
    listFile: [],
    classR: null
    // listCuDanTrongCanHo: []
  }
}
const classR = {
  namespaced: true,
  state: initialState,
  getters: {
    getListClass(state) {
      return state.listClass
    },
    getClass(state) {
      return state.classR
    },
    getListFile(state) {
      return state.listFile
    }
  },
  mutations: {
    SET_LIST_CLASS(state, payload) {
      state.listClass = payload
    },
    SET_CLASS(state, payload) {
      state.classR = payload
    },
    SET_LIST_FILE(state, payload) {
      state.listFile = payload
    },
    RESET(state) {
      const init = initialState()
      Object.keys(init).forEach(key => {
        state[key] = init[key]
      })
    }
  },
  actions: {
    async fetchListClass({ commit }) {
      try {
        const res = await axios.get('/v1/classes')
        commit('SET_LIST_CLASS', res.data.data)
      } catch (error) {
        commit('SET_LIST_CLASS', [])
        if (error.response?.data.error) {
          message.error(error.response?.data.error)
        } else {
          message.error('Đã có lỗi xảy ra vui lòng thử lại!')
        }
      }
    },
    async createClass({ dispatch }, apiData) {
      try {
        await axios.post('/v1/classes', apiData)
        message.success('Đã tạo lớp học thành công!')
        await dispatch('fetchListClass')
      } catch (error) {
        if (error.response?.data.error) {
          message.error(error.response?.data.error)
        } else {
          message.error('Đã có lỗi xảy ra vui lòng thử lại!')
        }
      }
    },
    async getClass({ commit }, payload) {
      try {
        const res = await axios.get(`/v1/classes/${payload.classId}`)
        commit('SET_CLASS', res.data.data)
      } catch (error) {
        if (error.response?.data.error) {
          message.error(error.response?.data.error)
        } else {
          message.error('Đã có lỗi xảy ra vui lòng thử lại!')
        }
      }
    },
    async addSinhVien({ dispatch, getters }, apiData) {
      try {
        const classId = getters['getClass']._id
        await axios.put(`/v1/classes/${classId}/add`, apiData)
        message.success('Thêm sinh viên thành công!')
        await dispatch('getClass', { classId })
      } catch (error) {
        if (error.response?.data.error) {
          message.error(error.response?.data.error)
        } else {
          message.error('Đã có lỗi xảy ra vui lòng thử lại!')
        }
      }
    },
    async fetchAllFile({ commit, getters }) {
      try {
        const classId = getters['getClass']._id
        const res = await axios.get(`/v1/file/${classId}`)
        commit('SET_LIST_FILE', res.data.data)
      } catch (error) {
        commit('SET_LIST_FILE', [])
        if (error.response?.data.error) {
          message.error(error.response?.data.error)
        } else {
          message.error('Đã có lỗi xảy ra vui lòng thử lại!')
        }
      }
    },
    async removeFile({ dispatch, getters }, fileName) {
      try {
        const classId = getters['getClass']._id
        console.log(fileName)
        await axios.post(`/v1/file/${classId}`, { fileName })
        await dispatch('fetchAllFile')
        message.success('Đã xóa file thành công!')
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

export default classR
