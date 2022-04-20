import axios from 'axios'
import { Message } from 'ant-design-vue'
// import { Store } from 'vuex'
const service = axios.create({
        timeout: 8000,
        baseURL: 'http://127.0.0.1:3000/api',
        headers: {
            'Content-Type': 'application/json',
        }
    })
    //添加请求拦截器
service.interceptors.request.use(
    config => {
        const token = window.localStorage.getItem('token')
        config.headers.Authorization = token || ''; //请求添加token
        return config;
    },
    error => {
        return Promise.reject(error);
    }
)

// 响应拦截器
service.interceptors.response.use(
    response => {
        //如果接口返回token，替换本地旧token
        if (response.headers.token) {
            localStorage.setItem("token", response.headers.token);
        }
        //自定义设置后台返回code对应的响应方式
        if (response.data.code == 500) { // 未登录或登录超时
            return Promise.reject(new Error('登录超时'));
        } else { //接口正常，返回数据
            return response;
        }
    },
    error => {
        if (error) {
            //错误响应
            Message.warning('登录过期 请重新登录！')
        }
        return Promise.reject(error);
    }
);


/**
 * @param {String} url 接口地址
 * @param {Object} data 请求携带的数据
 * @param {Object} options.headers 请求头
 * @param {String} options.method 请求方法
 */
export default async function axioRequest(url, data = {}, options = {}) {
    const { method = 'GET', headers = {} } = options
    return await service({
            url,
            method,
            headers,
            [method.toUpperCase() === 'GET' ? 'params' : 'data']: data
        })
        .then(response => response)
}