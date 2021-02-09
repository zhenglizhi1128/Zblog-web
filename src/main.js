import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import './plugins/element.js'
import moment from 'moment'
import axios from 'axios'
import Element from 'element-ui'
import './axios.js'
import mavonEditor from 'mavon-editor'
import 'mavon-editor/dist/css/index.css'


import "element-ui/lib/theme-chalk/index.css"

Vue.use(Element)
Vue.use(mavonEditor)
Vue.config.productionTip = false
Vue.prototype.$axios = axios
// 根据路由设置标题
router.beforeEach((to, from, next) => {
  if(to.meta.title) {
    document.title = to.meta.title;
  }
  next();
})

Vue.filter('dateformat',(value,format)=>{
  return moment(value).format(format || 'YYYY-MM-DD HH:mm:ss');
});
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')



