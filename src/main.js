import Vue from "vue";
import App from "./App.vue";
import VueRouter from "vue-router"; // Import Vue Router
import router from "./router"; // Import your router configuration

Vue.config.productionTip = false;

Vue.use(VueRouter); // Use Vue Router

new Vue({
  render: (h) => h(App),
  router, // Add router instance to Vue instance
}).$mount("#app");
