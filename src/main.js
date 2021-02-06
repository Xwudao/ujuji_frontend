import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import axios from './config/http';

Vue.config.productionTip = false

import VueDND from 'awe-dnd';


Vue.use(VueDND);//拖拽排序
Vue.prototype.$http = axios;
// css样式还是需要全部引入
import 'element-ui/lib/theme-chalk/index.css'
import element from './element/index';

// 重置样式
import "./assets/css/reset.scss";

Vue.use(element);

router.beforeEach((to, from, next) => {
    if (to.meta.title) {
        document.title = to.meta.title;
    }
    next();
});

// iconfont
import "./assets/iconfont/iconfont.css";
// global
import "./assets/css/global.scss";

new Vue({
    router,
    store,
    render: h => h(App)
}).$mount('#app')
