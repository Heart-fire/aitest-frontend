import { RouteRecordRaw } from "vue-router";
import HomeView from "@/views/HomeView.vue";
import UserLayout from "@/layouts/userLayout.vue";
import ACCESS_ENUM from "@/access/accessEnum";
import NoAuthPath from "@/views/NoAuthPage.vue";

export const routes: Array<RouteRecordRaw> = [
  {
    path: "/",
    name: "home",
    component: HomeView,
  },
  {
    path: "/noAuth",
    name: "无权限",
    component: NoAuthPath,
    meta: {
      hideInMenu: true,
    },
  },
  {
    path: "/admin",
    name: "管理页面",
    component: HomeView,
    meta: {
      access: ACCESS_ENUM.ADMIN,
    },
  },
  {
    path: "/user",
    name: "用户",
    component: UserLayout,
    meta: {
      hideInMenu: true,
    },
    children: [
      {
        path: "/user/login",
        name: "用户登录",
        component: HomeView,
      },
      {
        path: "/user/register",
        name: "用户注册",
        component: HomeView,
      },
    ],
  },
  {
    path: "/about",
    name: "about",
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/AboutView.vue"),
  },
];
