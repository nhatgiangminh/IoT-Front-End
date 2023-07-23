const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  devServer: {
    port: 8181
  },
  transpileDependencies: true,
  css: {
    loaderOptions: {
      scss: {
        additionalData: '@import \'@/assets/style/variable.scss\';'
      }
    }
  }
})
