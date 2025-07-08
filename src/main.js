import { createApp } from "vue";
import App from "@/App.vue";

// 1. 初始化 Vue 应用
const app = createApp(App);

// 2. Pinia (状态管理)
import { createPinia } from "pinia";
app.use(createPinia());

// 3. Router (路由)
import router from "./router";
app.use(router);

// 4. Element Plus (UI 库)
import ElementPlus from "element-plus";
import "element-plus/dist/index.css";
app.use(ElementPlus);

// 5. Bootstrap (CSS 框架)
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap"; // JS 功能
import { createBootstrap } from "bootstrap-vue-next";
import "bootstrap-vue-next/dist/bootstrap-vue-next.css";
app.use(createBootstrap());

// 6. Font Awesome (图标库)
import { library } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import { fas } from "@fortawesome/free-solid-svg-icons";
library.add(fas);
app.component("font-awesome-icon", FontAwesomeIcon);

// 7. 挂载应用
app.mount("#app");
