// 项目的全局入口文件,一些逻辑仅在进入页面中执行一次,可写在main中
import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import { createPinia } from "pinia";
import ArcoVue from "@arco-design/web-vue";
import "@arco-design/web-vue/dist/arco.css";
import "@/access";

// 全局状态管理，引入Pinia
const pinia = createPinia();

createApp(App).use(pinia).use(ArcoVue).use(router).mount("#app");
