<template>
  <a-row id="globalHeader" align="center" wrap="false">
    <a-col flex="auto">
      <a-menu
        mode="horizontal"
        :selected-keys="selectedKeys"
        @menu-item-click="doMenuClick"
      >
        <a-menu-item
          key="0"
          :style="{ padding: 0, marginRight: '38px' }"
          disabled
        >
          <div class="title-bar">
            <img class="logo" src="../assets/logo.png" />
            <div class="title">AI答题</div>
          </div>
        </a-menu-item>
        <a-menu-item v-for="item in visibleRoutes" :key="item.path">
          {{ item.name }}
        </a-menu-item>
      </a-menu>
    </a-col>
    <a-col flex="100px">
      <div v-if="loginUserStore.loginUser.id">
        {{ loginUserStore.loginUser.userName ?? "无名" }}
      </div>
      <div v-else>
        <a-button type="primary">登录</a-button>
      </div>
    </a-col>
  </a-row>
</template>

<script setup lang="ts">
import { computed, ref } from "vue";
import { useRouter } from "vue-router";
import { routes } from "@/router/routes";
import { useLoginUserStore } from "@/store/userStore";
import checkAccess from "@/access/checkAccess";

const loginUserStore = useLoginUserStore();
// 路由跳转事件
const router = useRouter();
const doMenuClick = (key: string) => {
  router.push({
    path: key,
  });
};

// 展示在菜单的路由数组,因为[隐藏页面]的hideInMenu默认未true
// 问题：用户已经有登录管理权限，但是页面没有刷新
// 用compute封装：只要有变量改变，重新计算定义变量的值，重新触发函数计算，用route返回
const visibleRoutes = computed(() => {
  return routes.filter((item) => {
    if (item.meta?.hideInMenu) {
      return false;
    }
    // 根据权限过滤菜单
    if (!checkAccess(loginUserStore.loginUser, item.meta?.access as string)) {
      return false;
    }
    return true;
  });
});

// 同步路由的更新到菜单项高亮，使用Vue Router 的afterEach的路由钩子实现
// Tab 栏中的菜单项
const selectedKeys = ref(["/"]);
// 路由跳转后,更新选中的菜单项
router.afterEach((to) => {
  selectedKeys.value = [to.path];
});
</script>
<!--为了防止冲突，先找basicLayout下面的ID-->
<style scoped>
.title-bar {
  display: flex;
  align-items: center;
}

.title {
  margin-left: 16px;
  color: black;
}

.logo {
  height: 48px;
}

#globalHeader {
  box-sizing: border-box;
  width: 100%;
}
</style>
