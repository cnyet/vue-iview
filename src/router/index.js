import Vue from 'vue';
import Router from 'vue-router';
import Home from '@/components/Home';
import Login from '@/components/Login';
import Error404 from '@/components/404';
import UserInfo from "@/components/UserInfo";

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
    }, {
      path: "/userInfo",
      name: "user",
      meta: { requiresAuth: true },
      component: UserInfo
    }
  ]
});
