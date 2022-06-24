// const { defineConfig } = require('@vue/cli-service')
// module.exports = defineConfig({
//   transpileDependencies: true
// })
const path = require(`path`);

module.exports = {
  pages:{
    'index': {
      entry: './src/pages/home/main.js',
      template: 'public/index.html',
      title: "Home",
      chunks: ['chunk-vendors', 'chunk-common', 'index']
    }
  },
  devServer: {
    proxy: {
      '^/api': {
        target: 'http://localhost:3080',
        changeOrigin: false
      },
      
    }
  },
  configureWebpack: {
    resolve: {
        symlinks: false,
        alias: {
            vue: path.resolve(`./node_modules/vue`)
        }
    }
  }
}