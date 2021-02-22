import axios from 'axios'
import Element from 'element-ui'
import router from './router'
import store from './store'


axios.defaults.baseURL = "http://localhost:8090"

// 前置拦截
axios.interceptors.request.use(request => {
   // 可以统一设置请求头
   let token = localStorage.getItem('token');
	if (token) {
		config.headers['Authorization'] =token;
	}
  return request
})
// 后置拦截
 axios.interceptors.response.use(response => {
    let res = response.data;
     if (res.code === 200) {
      return response
    } else {
      Element.Message.error(res.message, {duration: 3 * 1000})
      return Promise.reject(res.message)
    } 
  },
  error => {
     console.log(error)
    if(error.response.data) {
      error.message = error.response.data.message
    }

    if(error.response.code === 2002) {
      Element.Message.error(error.message, {duration: 3 * 1000})
    }

    Element.Message.error(error.message, {duration: 3 * 1000})
    return Promise.reject(error) 
  }
) 