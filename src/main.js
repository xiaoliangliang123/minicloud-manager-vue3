import { createApp } from 'vue'
import App from './App.vue'
import Avue from '@smallwei/avue';
import '@smallwei/avue/lib/index.css';


import router from "./router/router";
import store from "./store";
import ElementPlus from "element-plus";
import 'element-plus/theme-chalk/index.css';

createApp(App).use(Avue).use(ElementPlus).use(store).use(router).mount('#app')

