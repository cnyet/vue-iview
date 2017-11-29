import Vue from 'vue';
import Router from 'vue-router';
import Home from '@/components/Home';
import Login from '@/components/Login';

Vue.use(Router);

export default new Router({
  routes: [
    {
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
    }
  ]
});
