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
            <div class="title">
              AI智汇答题
              <b>[体验版]</b>
            </div>
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
          <a href="https://github.com/Heart-fire" target="_blank">
            <icon-github class="github" />
          </a>
          <!-- ---------------------------------------------WIFI-->
          <icon-wifi class="wifi" />
          <!-- ----------------------------------------------提示-->
          <a-popover position="bottom" style="width: 300px">
            <a-space :size="40" style="margin-right: 15px">
              <a-badge :count="0" dot :offset="[2, -2]">
                <icon-notification
                  :style="{
                    color: '#3b3838',
                    fontSize: '21px',
                    verticalAlign: '-3px',
                  }"
                />
              </a-badge>
            </a-space>
            <template #content>
              <p style="color: #2d2d2d">简单介绍:</p>
              <hr style="color: #566170" />
              <p>管理员已将<b>应用统计</b>界面开放</p>
              <hr style="color: #566170" />
              <p>
                SpringBoot+Redis+ChatGLM+RxJava+SSE(+Vue3+Arco
                Design+Pinia)的Al答题应用平台。<br />
                用户可基于AI快速生成题目并制作应用,经管理员审核后，可在线答题并基于多种评分算法或AI得到回答总结；管理员还可集中管理整站内容，并进行统计分析。
              </p>
            </template>
          </a-popover>
          <a-popover trigger="hover" style="width: 120px">
            <!-- ------------------------------------------头像部分-->
            <a-avatar
              :size="33"
              :image-url="loginUserStore.loginUser.userAvatar"
              :style="{ marginRight: '1px' }"
            />
            <template #content>
              <!--              <div class="menu-item">-->
              <!--                <a-link class="Tou">-->
              <!--                  <icon-user class="icon" />-->
              <!--                  个人信息-->
              <!--                </a-link>-->
              <!--              </div>-->
              <!--              <div class="menu-item">-->
              <!--                <a-link class="Tou">-->
              <!--                  <icon-home class="icon" />-->
              <!--                  个人信息-->
              <!--                </a-link>-->
              <!--              </div>-->
              <!--              <div class="menu-item">-->
              <!--                <a-link class="Tou">-->
              <!--                  <icon-home class="icon" />-->
              <!--                  个人信息-->
              <!--                </a-link>-->
              <!--              </div>-->
              <a-popconfirm
                content="是否登出"
                position="bottom"
                type="warning"
                @ok="logout"
              >
                <div class="menu-item">
                  <a-link status="danger">
                    <icon-export class="icon" />
                    退出登录
                  </a-link>
                </div>
              </a-popconfirm>
            </template>
          </a-popover>
          <!-- ----------------------------------------------------名字太长隐藏显示-->
          <a-tooltip :content="loginUserStore.loginUser.userName ?? '无名'">
            <a-tag
              checkable
              color="cyan"
              :default-checked="false"
              style="
                font-size: 15px;
                max-width: 100px;
                white-space: nowrap;
                overflow: hidden;
                text-overflow: ellipsis;
              "
            >
              {{ loginUserStore.loginUser.userName ?? "无名" }}
            </a-tag>
          </a-tooltip>
        </a-space>
      </div>

      <div v-else>
        <a-popover
          class="title-two"
          title="登录后您可以:"
          position="br"
          style="width: 290px; height: 150px"
        >
          <a-button type="primary" href="/user/login"> 登录</a-button>
          <template #content>
            <div class="tooltip">
              <div class="text">
                <div class="item">
                  <icon-home class="icon" size="15px" />
                  <div class="line">创建答题应用</div>
                </div>
                <div class="item">
                  <icon-user class="icon" size="15px" />
                  <div class="line">享受优先服务</div>
                </div>
                <div class="item">
                  <icon-thumb-up class="icon" size="15px" />
                  <div class="line">自定义评分规则</div>
                </div>
                <div class="item">
                  <icon-robot-add class="icon" size="15px" />
                  <div class="line">AI快速生成题目</div>
                </div>
              </div>
            </div>
            <div>
              <p>由于是体验版，管理员账号已开放🤓</p>
              <hr />
              <p>管理员账号：xinhuo 密码：12345678</p>
              <p>普通账号：daitu 密码：12345678</p>
              <hr />
              <p>遵守规则，请勿删除❗❗❗</p>
            </div>
            <a-button type="primary" href="/user/login" class="button-one">
              立即登录
            </a-button>
          </template>
        </a-popover>
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
import { userLogoutUsingPost } from "@/api/userController";
import message from "@arco-design/web-vue/es/message";

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

const logout = async () => {
  const res = await userLogoutUsingPost();
  if (res.data.code === 0) {
    message.success("退出成功");
  } else {
    message.error("退出失败，" + res.data.message);
  }
  //刷新页面的函数
  window.location.reload();
};
</script>
<!--为了防止冲突，先找basicLayout下面的ID-->
<style scoped>
.title-two {
  display: flex;
  align-items: center;
}

.title-bar {
  display: flex;
  align-items: center;
}

.title {
  margin-left: 20px;
  color: black;
}

.logo {
  height: 48px;
}

#globalHeader {
  box-sizing: border-box;
  width: 100%;
}

.tooltip {
  display: flex;
  align-items: center;
}

.text .item {
  display: flex;
  align-items: center; /* 垂直居中对齐图标和文本 */
}

.tooltip .icon {
  margin-right: 5px;
}

.tooltip .text {
  display: grid;
  grid-template-columns: 1fr 1fr; /* 两列布局 */
  gap: 15px; /* 控制列间距 */
}

.text .line {
  margin-bottom: 2px; /* 控制行间距 */
}

.button-one {
  width: 250px;
  margin: 10px auto 0;
  background-color: #1890ff;
}

.menu-item {
  display: flex;
  align-items: center;
  margin: 0; /* 去掉外边距 */
  padding: 0; /* 去掉内边距 */
}

.menu-item .icon {
  margin-right: 6px; /* 控制图标和文字之间的间距 */
}

.Tou {
  display: block;
  box-sizing: border-box;
  padding: 5px 0;
  color: inherit;
}

.Tou:hover {
  background-color: #f0f0f0; /* 鼠标滑过时的背景色 */
}

.github {
  margin-right: 18px;
  color: #3b3838;
  font-size: 18px;
}

.wifi {
  margin-right: 18px;
  color: #3b3838;
  font-size: 22px;
}

.github:hover {
  color: #3b63e5;
}

.wifi:hover {
  color: #3b63e5;
}
</style>
