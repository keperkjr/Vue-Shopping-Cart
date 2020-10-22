import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home
  },
  {
    path: "/category/:slug",
    name: "Content",
    props: true,
    component: () => import(/* webpackChunkName: "Content" */ "../views/Content.vue"),
  },
  {
    path: "/login",
    name: "Login",
    props: true,
    component: () => import(/* webpackChunkName: "Login" */ "../views/Login.vue"),
  },  
  {
    path: "/404",
    alias: "*",
    name: "notFound",
    component: () => import(/* webpackChunkName: "NotFound" */ "../views/NotFound.vue")       
  }   
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes
});

export default router;
