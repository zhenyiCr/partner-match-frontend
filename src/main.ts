import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import 'vant/es/nav-bar/style';
import 'vant/es/button/style';
import 'vant/es/toast/style';
import { createRouter, createWebHashHistory } from 'vue-router';
import routes from "./config/route.ts";

const app = createApp(App);

const router = createRouter({
    history: createWebHashHistory(),
    routes,
})
app.use(router)
app.mount('#app');




