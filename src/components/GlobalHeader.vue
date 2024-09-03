<template>
  <a-row id="globalHeader" align="center" wrap="false">
    <!-- 主要导航部分 -->
    <a-col flex="1">
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
    <!-- 头像和昵称部分 -->
    <!-- TODO 完成退出登录和个人信息 -->
    <a-col
      flex="none"
      :style="{ display: 'flex', alignItems: 'center', minWidth: '120px' }"
    >
      <div v-if="loginUserStore.loginUser.id" style="white-space: nowrap">
        <a-space>
          <a-popover trigger="click" style="width: 100px">
            <a-avatar
              trigger="click"
              :size="33"
              :image-url="loginUserStore.loginUser.userAvatar"
              :style="{ marginRight: '10px' }"
            />
            <template #content>
              <button>123</button>
            </template>
          </a-popover>
          {{ loginUserStore.loginUser.userName ?? "无名" }}
        </a-space>
      </div>
      <div v-else>
        <a-button type="primary" href="/user/login">登录</a-button>
      </div>
    </a-col>
  </a-row>
</template>

<script setup lang="ts">
import { computed, defineProps, ref, withDefaults } from "vue";
import { useRouter } from "vue-router";
import { routes } from "@/router/routes";
import { useLoginUserStore } from "@/store/userStore";
import checkAccess from "@/access/checkAccess";
import API from "@/api";

interface Props {
  app: API.AppVO;
}

const props = withDefaults(defineProps<Props>(), {
  app: () => {
    return {};
  },
});

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
