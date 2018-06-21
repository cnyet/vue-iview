import Vue from 'vue';
import Router from 'vue-router';
import { adminRouter } from "./admin";
import Home from '@/views/Home';
import Login from '@/views/Login';
import Error404 from '@/views/404';

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: "*",
      component: Error404
    }, {
      path: '/',
      name: 'home',
      component: Home
    }, {
      path: "/login",
      name: "login",
      props: {status: true},
      component: Login
    }, {
      path: "/registe",
      name: "registe",
      props: {status: false},
      component: Login
    }, ...adminRouter
  ]
});
