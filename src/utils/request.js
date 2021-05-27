import axios from "axios"
import { Loading, Message } from "element-ui"

const service = axios.create({
    baseURL: "http://localhost:8090", // 本地做反向代理
    timeout: 5000,
    withCredentials: true // 是否允许带cookie这些
})

let loadingInstance = null

// 前置拦截
service.interceptors.request.use(
    (request) => {
        if (loadingInstance === null) {
            loadingInstance = Loading.service({
                lock: true,
                spinner: "el-icon-loading",
                background: "rgba(0, 0, 0, 0.7)", // 发起请求时加载全局loading，请求失败或有响应时会关闭
                text: "拼命加载中..."
            })
        }

        if (request.method == "post") {
            request.headers["Content-Type"] = "application/json;charset=UTF-8"
            for (var key in request.data) {
                if (request.data[key] === "") {
                    delete request.data[key]
                }
            }
            request.data = JSON.stringify(request.data)
        } else {
            request.headers["Content-Type"] =
                "application/x-www-form-urlencoded;charset=UTF-8"
            request.data = JSON.stringify(request.data)
        }
        const token = localStorage.getItem("token")
        if (token) {
            config.headers["Authorization"] = token
        }
        return request
    },
    (error) => {
        Promise.reject(error)
    }
)
// 后置拦截
service.interceptors.response.use(
    (response) => {
        if (loadingInstance !== null) {
            loadingInstance.close()
            loadingInstance = null
        }
        let res = response.data
        if (res.code === 200) {
            return Promise.resolve(res)
        } else {
            Message.error(res.message, { duration: 3 * 1000 })
            return Promise.reject(res.message)
        }
    },
    (error) => {
        if (error && error.response) {
            error.message = error.response.data.message
        } else {
            // 超时处理
            if (JSON.stringify(error).includes("timeout")) {
                Message.error("服务器响应超时，请刷新当前页")
            }
            error.message = "连接服务器失败"
        }
        if (error.response.code === 2002) {
            Element.Message.error(error.message, { duration: 3 * 1000 })
        }
        Element.Message.error(error.message, { duration: 3 * 1000 })
        return Promise.reject(error)
    }
)

export default service
