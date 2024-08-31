import { RouteRecordRaw } from "vue-router";
import UserLayout from "@/layouts/userLayout.vue";
import ACCESS_ENUM from "@/access/accessEnum";
import NoAuthPath from "@/views/NoAuthPage.vue";
import userLoginPage from "@/user/userLoginPage.vue";
import userRegisterPage from "@/user/userRegisterPage.vue";
import AdminUserPage from "@/views/admin/AdminUserPage.vue";
import AdminAppPage from "@/views/admin/AdminAppPage.vue";
import AdminQuestionPage from "@/views/admin/AdminQuestionPage.vue";
import AdminScoringResultPage from "@/views/admin/AdminScoringResultPage.vue";
import AdminUserAnswerPage from "@/views/admin/AdminUserAnswerPage.vue";
import HomePage from "@/views/HomePage.vue";

export const routes: Array<RouteRecordRaw> = [
  {
    path: "/",
    name: "主页",
    component: HomePage,
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
    path: "/admin/user",
    name: "用户管理",
    component: AdminUserPage,
    meta: {
      access: ACCESS_ENUM.ADMIN,
    },
  },
  {
    path: "/admin/app",
    name: "应用管理",
    component: AdminAppPage,
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
        component: userLoginPage,
      },
      {
        path: "/user/register",
        name: "用户注册",
        component: userRegisterPage,
      },
    ],
  },
];
