import service from "./request"

const http = {
    /**
     * methods: 请求
     * @param url 请求地址
     * @param params 是即将与请求一起发送的 URL 参数
     */
    get(url, params) {
        const config = {
            method: "get",
            url: url
        }
        if (params) config.params = params
        return service(config)
    },
    post(url, params) {
        const config = {
            method: "post",
            url: url
        }
        //data 是作为请求主体被发送的数据 只适用于这些请求方法 'PUT', 'POST', 和 'PATCH'
        if (params) config.data = params
        return service(config)
    },
    put(url, params) {
        const config = {
            method: "put",
            url: url
        }
        if (params) config.data = params
        return service(config)
    },
    delete(url, params) {
        const config = {
            method: "delete",
            url: url
        }
        if (params) config.params = params
        return service(config)
    }
}

export default http
