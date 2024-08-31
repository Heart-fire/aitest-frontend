<!--------------------------------全局初始化函数，有全局单次调用的代码，都可以写到这里-->
<template>
  <div id="app">
    <template v-if="route.path.startsWith('/user')">
      <router-view />
    </template>
    <template v-else>
      <BasicLayout />
    </template>
  </div>
</template>
<script setup lang="ts">
import BasicLayout from "@/layouts/BasicLayout.vue";
import { useRoute } from "vue-router";
import { useLoginUserStore } from "@/store/userStore";
// useRoute: 获取页面的路由信息
// useRouter: 行动->跳转页面
// 获取当前页面的路由
// const 定义的是常量
const route = useRoute();

// 可以在首次进入到页面时,尝试获取登泉用户信息
const loginUserStore = useLoginUserStore();
loginUserStore.fetchLoginUser();
</script>

<style></style>
