import Vue from "vue"
import App from "./App.vue"
import router from "./router"
import store from "./store"
import "./plugins/element.js"
import moment from "moment"
import http from "./utils/http.js"
import Element from "element-ui"
import mavonEditor from "mavon-editor"
import "mavon-editor/dist/css/index.css"

import "element-ui/lib/theme-chalk/index.css"

Vue.use(Element)
Vue.use(mavonEditor)
Vue.config.productionTip = false
Vue.prototype.$http = http

// 根据路由设置标题
router.beforeEach((to, from, next) => {
    let userInfo = store.state.userInfo
    if(!userInfo){
        if(to.name !== 'Blogs'){
            next({replace:true,name:'Blogs'});
        }
        next();
    }else {
        if (to.meta.title) {
            document.title = to.meta.title;
        }
        next();
    }
})

Vue.filter('dateformat', (value, format) => {
    return moment(value).format(format || 'YYYY-MM-DD HH:mm:ss');
});
new Vue({
    router,
    store,
    render: h => h(App)
}).$mount('#app')



