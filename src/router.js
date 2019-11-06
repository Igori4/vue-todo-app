import Vue from "vue";
import VueRouter from "vue-router";
import Home from "./components/Home";
import Login from "./components/Login";
import SingUp from "./components/SingUp";

Vue.use(VueRouter);

const routes = [
  { path: "/", component: Home, exact: true },
  { path: "/login", component: Login },
  { path: "/singUp", component: SingUp }
];

export default new VueRouter({
  routes
});
