<template>
  <div id="big">
    <div class="big-two"></div>
    <div id="userLoginPage">
      <h2 style="margin-bottom: 16px">用户登录</h2>
      <a-form
        :model="form"
        :style="{ width: '480px', margin: '0 auto' }"
        label-align="left"
        auto-label-width
        @submit="handleSubmit"
      >
        <div class="input-group">
          <icon-user class="icon" size="20px" />
          <a-form-item field="userAccount" label="账号">
            <a-input
              class="input-field"
              v-model="form.userAccount"
              placeholder="请输入账号"
            />
          </a-form-item>
        </div>
        <div class="input-group">
          <icon-code class="icon" size="20px" />
          <a-form-item
            field="userPassword"
            tooltip="密码不小于 8 位"
            label="密码"
          >
            <a-input-password
              v-model="form.userPassword"
              class="input-field"
              placeholder="请输入密码"
            />
          </a-form-item>
        </div>
        <a-form-item>
          <div class="actions">
            <a-button
              class="submit-button"
              type="primary"
              html-type="submit"
              style="width: 110px; background-color: #1386f1"
            >
              登录
            </a-button>
            <a-link class="register-link" href="/user/register" type="outline"
              >新用户注册
            </a-link>
          </div>
        </a-form-item>
        <div class="other-login-methods">
          <span
            >使用其他方法注册: （暂未实现）
            <div class="social-logins">
              <a-button shape="circle" status="warning">
                <icon-qq />
              </a-button>
              <a-button shape="circle" status="warning">
                <icon-wechat />
              </a-button>
              <a-button shape="circle" status="warning">
                <icon-lark-color />
              </a-button>
              <a-button shape="circle" status="warning">
                <icon-github />
              </a-button>
            </div>
          </span>
        </div>
      </a-form>
    </div>
  </div>
</template>

<script setup lang="ts">
// 额外引入图标库
import "@arco-design/web-vue/dist/arco.css";
import { reactive } from "vue";
import API from "@/api";
import { userLoginUsingPost } from "@/api/userController";
import { useLoginUserStore } from "@/store/userStore";
import message from "@arco-design/web-vue/es/message";
import { useRouter } from "vue-router";

const loginUserStore = useLoginUserStore();
const router = useRouter();

const form = reactive({
  userAccount: "",
  userPassword: "",
} as API.UserLoginRequest);

/**
 * 提交
 */
const handleSubmit = async () => {
  const res = await userLoginUsingPost(form);
  if (res.data.code === 0) {
    await loginUserStore.fetchLoginUser();
    message.success("登录成功");
    router.push({
      path: "/",
      replace: true,
    });
  } else {
    message.error("登录失败，" + res.data.message);
  }
};
</script>

<style scoped>
#big {
  display: flex;
  align-items: stretch;
  justify-content: center;
  width: 800px;
  height: 500px;
  margin: 0 auto;
}

.big-two {
  flex: 1;
  width: 200px;
  background-image: url("https://wbe-tilas.oss-cn-hangzhou.aliyuncs.com/ed85f5c7-53ee-4e52-b32b-e7c155066281.jpg"); /* 替换为实际的图片 URL */
  background-position: center; /*图片覆盖整个背景*/
  background-size: cover; /* 居中图片 */
  border-radius: 8px 0 0 8px;
}

#userLoginPage {
  flex: 1;
  width: 500px;
  padding: 30px;
  text-align: center;
  background-color: #fff;
  border-radius: 0 8px 8px 0;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.3);
}

.login-page h2 {
  margin-bottom: 30px;
}

.input-group {
  display: flex;
  align-items: center;
  margin-bottom: 20px;
}

.icon {
  margin-right: 10px;
  margin-bottom: 20px;
  color: #999;
}

.input-field {
  width: 100%;
  max-width: 400px;
}

.actions {
  display: flex;
  align-items: center;
  justify-content: flex-end;
  margin: auto;
}

.submit-button {
  width: 90px;
  margin-right: 170px;
}

.register-link {
}

.other-login-methods {
  margin-top: 98px;
  text-align: center;
}

.social-logins {
  display: flex;
  gap: 20px;
  justify-content: center;
  margin-top: 20px;
}

.social-logins a-button {
  width: 100px;
}
</style>
