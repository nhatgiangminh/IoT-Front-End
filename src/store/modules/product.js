import axios from '@/plugins/axios'
import { message } from 'ant-design-vue'

const initialState = () => {
  return {
    product: null,
    productCrawl: null,
    listProducts: [],
    fullListProduct: []
  }
}

const product = {
  namespaced: true,
  state: initialState,
  getters: {
    getProduct(state) {
      return state.product
    },
    getProductCrawl(state) {
      return state.productCrawl
    },
    getListProducts(state) {
      return state.listProducts
    },
    getListProductsPaging(state) {
      return state.listProductsPaging
    },
    getFullListProduct(state) {
      return state.fullListProduct
    }
  },
  actions: {
    async fetchListProducts({ commit }, { categoryId, partnerId, status, keywords, page }) {
      try {
        const response = await axios.get('/v1/product', {
          params: {
            limit: 10,
            categoryId,
            partnerId,
            status,
            keywords,
            page
          }
        })
        commit('SET_LIST_PRODUCTS', response.data.data)
        commit('SET_LIST_PRODUCTS_PAGING', response.data.paging)
      } catch (error) {
        commit('SET_LIST_PRODUCTS', [])
        commit('SET_LIST_PRODUCTS_PAGING', {})
        if (error.response?.data.error) {
          message.error(error.response?.data.error)
        } else {
          message.error('Đã có lỗi xảy ra vui lòng thử lại!')
        }
      }
    },
    async createProduct({ dispatch }, apiData) {
      await axios.post('/v1/product', apiData)
    },
    async updateProduct({ dispatch }, { id, apiData }) {
      await axios.put(`/v1/product/${id}`, apiData)
    },
    async crawlProductData({ commit }, url) {
      const response = await axios.get(`/v1/product/meta-data?url=${url}`)
      await commit('SET_PRODUCT_CRAWL', response.data.data)
    },
    async fetchProduct({ commit }, id) {
      try {
        const response = await axios.get(`/v1/product/${id}`)
        await commit('SET_PRODUCT', response.data.data)
      } catch (error) {
        await commit('SET_PRODUCT', {})
        if (error.response?.data.error) {
          message.error(error.response?.data.error)
        } else {
          message.error('Đã có lỗi xảy ra vui lòng thử lại!')
        }
      }
    },
    async fetchFullListProduct({ commit, rootGetters }) {
      const partnerId = rootGetters['auth/getUserData']._id
      try {
        const res = await axios.get('/v1/product/partner', { params: { partnerId } })
        commit('SET_FULL_LIST_PRODUCT', res.data.data)
      } catch (error) {
        if (error.response?.data.error) {
          message.error(error.response?.data.error)
        } else {
          message.error('Đã có lỗi xảy ra vui lòng thử lại!')
        }
      }
    },
    async parterAddProduct({ dispatch }, apiData) {
      try {
        await axios.post('/v1/category/config/add-product', apiData)
        message.success('Thêm sản phẩm thành công!')
        await dispatch('category/fetchGroupConfig', null, { root: true })
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
    SET_PRODUCT (state, payload) {
      state.product = payload
    },
    SET_PRODUCT_CRAWL (state, payload) {
      state.productCrawl = payload
    },
    SET_LIST_PRODUCTS (state, payload) {
      state.listProducts = payload
    },
    SET_LIST_PRODUCTS_PAGING (state, payload) {
      state.listProductsPaging = payload
    },
    SET_FULL_LIST_PRODUCT(state, payload) {
      state.fullListProduct = payload
    },
    RESET(state) {
      const init = initialState()
      Object.keys(init).forEach(key => {
        state[key] = init[key]
      })
    }
  }
}

export default product
