import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";

import './assets/css/reset.css'
// 공통 스타일
import './assets/scss/common.scss'

import { library } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import { fas } from "@fortawesome/free-solid-svg-icons";
library.add(fas);

createApp(App)
  .component("font-awesome-icon", FontAwesomeIcon)
  .use(store)
  .use(router)
  .mount("#app");
