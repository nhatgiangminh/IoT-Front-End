import axios from '@/plugins/axios'
import { message } from 'ant-design-vue'

const initialState = () => {
  return {
    listPartners: [],
    partner: {},
    listPartnersPaging: {},
    configDiscountRate: [],
    configMoneyWithdraw: null,
    configRefund: null
  }
}

const partner = {
  namespaced: true,
  state: initialState,
  getters: {
    getListPartners(state) {
      return state.listPartners
    },
    getPartner(state) {
      return state.partner
    },
    getListPartnersPaging(state) {
      return state.listPartnersPaging
    },
    getConfigDiscountRate(state) {
      return state.configDiscountRate
    },
    getConfigMoneyWithdraw(state) {
      return state.configMoneyWithdraw
    },
    getConfigRefund(state) {
      return state.configRefund
    }
  },
  actions: {
    async configDiscountRate({ context }, inputData) {
      await axios.post('/v1/cashback-config/discount-rate', inputData)
    },
    async getDiscountRate({ commit }) {
      try {
        const res = await axios.get('/v1/cashback-config/discount-rate')
        await commit('SET_CONFIG_DISCOUNT_RATE', res.data.data)
      } catch (error) {
        if (error.response?.data.error) {
          message.error(error.response?.data.error)
        } else {
          message.error('Đã có lỗi xảy ra vui lòng thử lại!')
        }
      }
    },
    async configMoneyWithdraw({ context }, inputData) {
      await axios.patch('/v1/cashback-config?type=CASHBACK', inputData)
    },
    async getConfigMoneyWithdraw({ commit }) {
      const res = await axios.get('/v1/cashback-config?type=CASHBACK')
      await commit('SET_CONFIG_MONEY_WITHDRAW', res.data.data)
    },
    async createPartner({ dispatch }, inputData) {
      await axios.post('/v1/users', inputData)
    },
    async updatePartner({ dispatch }, { id, inputData }) {
      await axios.put(`/v1/users/${id}`, inputData)
    },
    async fetchListPartners({ commit }, { page, keywords }) {
      try {
        const response = await axios.get('/v1/users/list', {
          params: {
            role: 'PARTNER',
            limit: 10,
            page,
            keywords
          }
        })
        commit('SET_LIST_PARTNERS', response.data.data)
        commit('SET_LIST_PARTNERS_PAGING', response.data.paging)
      } catch (error) {
        commit('SET_LIST_PARTNERS', [])
        if (error.response?.data.error) {
          message.error(error.response?.data.error)
        } else {
          message.error('Đã có lỗi xảy ra vui lòng thử lại!')
        }
      }
    },
    async fetchPartner({ commit }, id) {
      try {
        const response = await axios.get(`/v1/users/${id}`)
        commit('SET_PARTNER', response.data.data)
      } catch (error) {
        if (error.response?.data.error) {
          message.error(error.response?.data.error)
        } else {
          message.error('Đã có lỗi xảy ra vui lòng thử lại!')
        }
      }
    },
    async resetPartnerPassword({ context }, { id, apiData }) {
      await axios.put(`/v1/users/change-password/${id}`, apiData)
    },
    async fetchConfigRefund({ commit }) {
      try {
        const res = await axios.get('/v1/cashback-config', { params: { type: 'ORDER' } })
        commit('SET_CONFIG_REFUND', res.data.data)
      } catch (error) {
        if (error.response?.data.error) {
          message.error(error.response?.data.error)
        } else {
          message.error('Đã có lỗi xảy ra vui lòng thử lại!')
        }
      }
    },
    async updateConfigRefund({ dispatch }, apiData) {
      await axios.patch('/v1/cashback-config', apiData, { params: { type: 'ORDER' } })
      await dispatch('fetchConfigRefund')
    }
  },
  mutations: {
    SET_CONFIG_DISCOUNT_RATE(state, payload) {
      state.configDiscountRate = payload
    },
    SET_CONFIG_MONEY_WITHDRAW(state, payload) {
      state.configMoneyWithdraw = payload
    },
    SET_LIST_PARTNERS(state, payload) {
      state.listPartners = payload
    },
    SET_PARTNER(state, payload) {
      state.partner = payload
    },
    SET_LIST_PARTNERS_PAGING(state, payload) {
      state.listPartnersPaging = payload
    },
    SET_CONFIG_REFUND(state, payload) {
      state.configRefund = payload
    },
    RESET(state) {
      const init = initialState()
      Object.keys(init).forEach(key => {
        state[key] = init[key]
      })
    }
  }
}

export default partner
