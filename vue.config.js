const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  devServer: {
    proxy: {
      '/api': { 
        target: 'https://localhost:8080',
        changeOrigin: true,
        ws:false
      }, 
    },
  },
})
