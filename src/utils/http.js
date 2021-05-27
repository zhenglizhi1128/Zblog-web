import service from "./request"

const http = {
  /**
   * methods: 请求
   * @param url 请求地址
   * @param params 请求参数
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
    if (params) config.data = params
    return service(config)
  },
  put(url, params) {
    const config = {
      method: "put",
      url: url
    }
    if (params) config.params = params
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
