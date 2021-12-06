import {
    createApp
} from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
const app = createApp(App)
    // 设置 rem 基准值
import 'amfe-flexible'
import './common/common.css'
import 'animate.css'
import Vant from 'vant';
import LuckDraw from 'vue-luck-draw/vue3'

import 'vant/lib/index.css';

app.use(LuckDraw)

app.use(Vant);


app
    .use(store)
    .use(router)
    .mount('#app')