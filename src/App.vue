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
import { getLoginUserUsingGet } from "@/api/userController";
// useRoute: 获取页面的路由信息
// useRouter: 行动->跳转页面
// 获取当前页面的路由
const route = useRoute();

getLoginUserUsingGet().then((res) => {
  console.log(res);
});
</script>

<style></style>
