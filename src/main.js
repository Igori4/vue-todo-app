import Vue from "vue";
import App from "./App.vue";
import store from "./store";
import router from "./router";
import firebaseConfig from "./config/firebase";
import firebase from "firebase";
import ElementUI from "element-ui";
import "element-ui/lib/theme-chalk/index.css";
require("@/assets/main.css");

Vue.config.productionTip = false;

firebase.initializeApp(firebaseConfig);
Vue.use(ElementUI);

new Vue({
  store,
  router,
  render: h => h(App)
}).$mount("#app");
