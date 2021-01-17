// ============================================================================
//    Author: Kenneth Perkins
//    Date:   Oct 13, 2020
//    Taken From: http://programmingnotes.org/
//    File:  index.js
//    Description: Router index file which sets up the routes for the project
// ============================================================================ 
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
        path: "/register",
        name: "Register",
        props: true,
        component: () => import(/* webpackChunkName: "Register" */ "../views/Register.vue"),
    },  
    {
        path: "/checkout",
        name: "Checkout",
        props: true,
        component: () => import(/* webpackChunkName: "Checkout" */ "../views/Checkout.vue"),
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
