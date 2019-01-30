import Vue from "vue";
import Router from "vue-router";

Vue.use(Router);

export default new Router({
  mode: "history",
  base: process.env.BASE_URL,
  routes: [
    {
      path: "/",
      name: "login",
      component: () =>
        import(/* webpackChunkName: "about" */ "./views/Login.vue")
      // component: resolve => require(['./views/Login.vue'], resolve),
    },
    {
      path: "/manage",
      name: "",
      component: () =>
        import(/* webpackChunkName: "about" */ "./views/Home/manage.vue"),
      // component: resolve => require(['./views/Home/manage.vue'], resolve),
      children:[{
        path: "",
        meta: [],
        component: () =>
          import(/* webpackChunkName: "about" */ "./views/Home/home.vue")
        // component: resolve => require(['./views/Home/home.vue'], resolve),
      },{
        path: '/userList',
        component: () =>
          import(/* webpackChunkName: "about" */ "./views/Data/fans.vue"),
        meta: [{'title':'数据管理'},{'title':'粉丝列表'}],
      },{
        path: '/addQuestions',
        component: () =>
          import(/* webpackChunkName: "about" */ "./views/Adddata/questions.vue"),
          meta: [{'title':'添加数据'},{'title':'添加问题'}],
      },{
        path: '/addMaterial',
        component: () =>
          import(/* webpackChunkName: "about" */ "./views/Adddata/material.vue"),
          meta: [{'title':'添加数据'},{'title':'添加素材'}],
      },{
        path: '/materialList',
        component: () =>
          import(/* webpackChunkName: "about" */ "./views/Data/material.vue"),
          meta: [{'title':'数据管理'},{'title':'素材列表'}],
      },{
        path: '/addDaka',
        component: () =>
          import(/* webpackChunkName: "about" */ "./views/Adddata/daka.vue"),
          meta: [{'title':'添加数据'},{'title':'打卡设置'}],
      },{
        path: '/dakaList',
        component: () =>
          import(/* webpackChunkName: "about" */ "./views/Data/daka.vue"),
          meta: [{'title':'数据管理'},{'title':'打卡设置列表'}],
      }] 
    }
  ]
});
