module.exports = {
    css: {
        loaderOptions: {
            less: {
                javascriptEnabled: true,
            }
        }
    },
    devServer: {
        port:8081,
        proxy: {
            
            '/server': {
                target: 'http://127.0.0.1:3000', //目标代理服务器地址
                changeOrigin: true, // 是否允许跨域
            },
        },
    }

};

