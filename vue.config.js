const {defineConfig} = require('@vue/cli-service')

const url = 'http://localhost:7700'

module.exports = defineConfig({
    lintOnSave: false,

    transpileDependencies: true,

    // 配置转发代理
    devServer: {
        port: 8080,
        proxy: {
            '/': {
                target: url,
                ws: false,
                changeOrigin: true,
                pathRewrite: {
                    '^/': '/'
                }
            }
        }
    }
})
