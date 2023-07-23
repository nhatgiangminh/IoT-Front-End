import axios from '@/plugins/axios'
import { message } from 'ant-design-vue'
import store from '@/store/index'

const initialState = () => {
  return {
    listCategories: [],
    listCategoriesCreate: [],
    listGroupConfig: [],
    currentCategory: {},
    listCategoriesPaging: {}
  }
}

const category = {
  namespaced: true,
  state: initialState,
  getters: {
    getListCategories(state) {
      return state.listCategories
    },
    getListCategoriesCreate(state) {
      return state.listCategoriesCreate
    },
    getCurrentCategory(state) {
      return state.currentCategory
    },
    getListCategoriesPaging(state) {
      return state.listCategoriesPaging
    },
    getListGroupConfig(state) {
      return state.listGroupConfig
    }
  },
  actions: {
    async fetchListCategories({ commit }) {
      const response = await axios.get('/v1/category/list')
      await commit('SET_LIST_CATEGORIES', response.data.data)
    },
    async fetchListCategoriesWithId({ commit }, id) {
      const response = await axios.get(`/v1/category/list/${id}`)
      await commit('SET_LIST_CATEGORIES', response.data.data)
    },
    async fetchListCategoriesToFilter({ commit }) {
      const response = await axios.get('/v1/category/list')
      await commit('SET_LIST_CATEGORIES_CREATE', response.data.data)
    },
    async fetchListParentCategories({ commit }) {
      const response = await axios.get('/v1/category/list')
      await commit('SET_LIST_CATEGORIES_CREATE', response.data.data)
    },
    async fetchListChildrenCategories({ commit }, id) {
      const response = await axios.get(`/v1/category/list/${id}`)
      await commit('SET_LIST_CATEGORIES_CREATE', response.data.data)
    },
    async fetchCategory({ commit }, id) {
      try {
        const response = await axios.get(`/v1/category/${id}`)
        commit('SET_CURRENT_CATEGORY', response.data.data)
      } catch (error) {
        commit('SET_CURRENT_CATEGORY', {})
        if (error.response?.data.error) {
          message.error(error.response?.data.error)
        } else {
          message.error('Đã có lỗi xảy ra vui lòng thử lại!')
        }
      }
    },
    async createCategory({ dispatch }, inputData) {
      await axios.post('/v1/category', inputData)
      await dispatch('fetchListCategories')
    },
    async updateCategory({ state, dispatch }, inputData) {
      await axios.put(`/v1/category/${state.currentCategory._id}`, inputData)
    },
    async createGroupConfig({ dispatch }, apiData) {
      try {
        await axios.put('/v1/category/config', apiData)
        message.success('Cấu hình nhóm danh mục thành công!')
        await dispatch('fetchGroupConfig')
      } catch (error) {
        if (error?.response) {
          message.error(error.response.data.error)
        } else {
          message.error('Đã có lỗi xảy ra, vui lòng thử lại!')
        }
      }
    },
    async fetchGroupConfig({ commit }, keywords) {
      try {
        const res = await axios.get('/v1/category/config', { params: keywords })
        commit('SET_LIST_GROUP_CONFIG', res.data.data)
      } catch (error) {
        commit('SET_LIST_GROUP_CONFIG', [])
        if (error?.response) {
          message.error(error.response.data.error)
        } else {
          message.error('Đã có lỗi xảy ra, vui lòng thử lại!')
        }
      }
    },
    async fetchPartnerCategories({ commit }) {
      try {
        const response = await axios.get(`/v1/category/list/partner?partnerId=${store.getters['auth/getUserData']._id}`)
        await commit('SET_LIST_CATEGORIES_CREATE', response.data.data)
      } catch (error) {
        await commit('SET_LIST_CATEGORIES_CREATE', [])
        if (error?.response) {
          message.error(error.response.data.error)
        } else {
          message.error('Đã có lỗi xảy ra, vui lòng thử lại!')
        }
      }
    }
  },
  mutations: {
    SET_LIST_CATEGORIES(state, payload) {
      state.listCategories = payload
    },
    SET_LIST_CATEGORIES_CREATE(state, payload) {
      state.listCategoriesCreate = payload
    },
    SET_CURRENT_CATEGORY(state, payload) {
      state.currentCategory = payload
    },
    SET_LIST_GROUP_CONFIG(state, payload) {
      state.listGroupConfig = payload
    },
    SET_LIST_CATEGORIES_PAGING(state, payload) {
      state.listCategoriesPaging = payload
    },
    RESET(state) {
      const init = initialState()
      Object.keys(init).forEach(key => {
        state[key] = init[key]
      })
    }
  }
}

export default category
