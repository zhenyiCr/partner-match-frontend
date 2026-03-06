import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import 'vant/es/nav-bar/style';
import 'vant/es/button/style';
import 'vant/es/toast/style';
import router from "./config/route.ts";

const app = createApp(App);
app.use(router)
app.mount('#app');




