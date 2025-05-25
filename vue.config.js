const { defineConfig } = require('@vue/cli-service')
const webpack = require('webpack')
const path = require('path')

module.exports = defineConfig({
  publicPath: '/v3/',
  transpileDependencies: true,
  devServer: {
    port: 3007,
    headers: {
      'Cross-Origin-Embedder-Policy': 'require-corp',
      'Cross-Origin-Opener-Policy': 'same-origin',
    }
  },
  pages: {
    index: {
      entry: 'src/main.js',
      title: 'Digital Citizenship'
    }
  },
  configureWebpack: {
    experiments: {
      asyncWebAssembly: true, // ADD this for wllama
      topLevelAwait: true,    // (some versions of wllama need this)
    },
    plugins: [
      new webpack.DefinePlugin({
        __VUE_PROD_HYDRATION_MISMATCH_DETAILS__: JSON.stringify(true)
      })
    ],
    resolve: {
      fallback: {
        fs: false,
        path: false,
        crypto: false
      }
    },
    module: {
      rules: [
        {
          test: /\.wasm$/,
          type: "webassembly/async", // <-- CHANGE this
        },
        {
          test: /\.worker\.js$/,
          use: { loader: 'worker-loader' } // <-- ADD worker-loader for .worker.js
        }
      ]
    }
  }
})
