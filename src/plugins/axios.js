import axios from 'axios'

const axiosInstance = axios.create({
  baseURL: process.env.VUE_APP_AXIOS_ADMIN,
  headers: {
    'Content-Type': 'application/json'
  }
})

export const setup = (store) => {
  axiosInstance.interceptors.request.use(
    (config) => {
      const token = localStorage.getItem('token')
      if (token) {
        config.headers['Authorization'] = `Bearer ${token}`
        config.params = {
          ...config.params
        }
      }
      return config
    },
    (error) => {
      return Promise.reject(error)
    }
  )
  axiosInstance.interceptors.response.use(
    (res) => res,
    async (error) => {
      const originalConfig = error.config
      if (originalConfig.url !== '/v1/users/login' && error.response) {
        // Access token het han (expired)
        if (error.response.status === 401 && !originalConfig._retry) {
          originalConfig._retry = true

          try {
            const res = await axiosInstance.post('/v1/auth/refresh-token', {
              refreshToken: localStorage.getItem('refresh_token')
            })
            const { token } = res.data.data
            store.dispatch('auth/refreshToken')
            // update new token
            localStorage.setItem('token', token)
            return axiosInstance(originalConfig)
          } catch (e) {
            store.dispatch('auth/logout')
            return Promise.reject(e)
          }
        }
      }
      if (error.response.data.error === 'Tài khoản của bạn đã bị khóa!' && !originalConfig._retry) {
        originalConfig._retry = true
        store.dispatch('auth/logout')
        return axiosInstance(originalConfig)
      }
      return Promise.reject(error)
    }
  )
}

export default axiosInstance
