<template>
  <div id="big">
    <div class="big-two"></div>
    <div id="userRegisterPage" class="login-page">
      <h2>用户注册</h2>
      <a-form
        :model="form"
        :style="{ width: '480px', margin: '0 auto' }"
        label-align="left"
        auto-label-width
        @submit="handleSubmit"
      >
        <div class="input-group">
          <icon-user-add class="icon" size="20px" />
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
        <div class="input-group">
          <icon-code class="icon" size="20px" />
          <a-form-item
            field="checkPassword"
            tooltip="确认密码不小于 8 位"
            label="确认密码"
          >
            <a-input-password
              v-model="form.checkPassword"
              class="input-field"
              placeholder="请输入确认密码"
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
              注册
            </a-button>
            <a-link class="register-link" href="/user/login" type="outline"
              >老用户登录
            </a-link>
          </div>
        </a-form-item>
        <div class="other-login-methods">
          <span
            >使用其他方法注册: （暂未实现）
            <div class="social-logins">
              <a-button shape="circle" status="warning">
                <svg
                  width="21"
                  height="26.666666666666664"
                  viewBox="0 0 18 20"
                  fill="none"
                >
                  <path
                    fill-rule="evenodd"
                    clip-rule="evenodd"
                    d="M15.882 9.285c.266.33.535.69.653.94l.024.052c.263.555.5 1.054.843 2.069.354 1.046.917 2.977 0 3.31-.867.313-2.035-1.59-2.035-1.59 0 1.147-.64 2.645-2.02 3.726.51.042 1.204.215 1.609.473.405.259.405.628.183.866-.221.238-1.562.23-3.057.217-1.283-.012-2.615-.081-3.239-.146-.656.068-2.06.15-3.368.155-1.385.006-2.467 0-2.745-.226-.277-.226-.228-.593.079-.83s.993-.445 1.53-.507c-1.382-1.083-2.02-2.58-2.02-3.729 0 0-.67 1.896-1.687 1.59-.754-.227-.57-2.271-.275-3.31.24-.839.43-1.27.647-1.758l.158-.362c.107-.25.32-.556.546-.844 1.206.828 2.701 1.109 2.701 1.109l-.15 1.149a.904.904 0 001.787.264l.19-1.15c5.005.475 8.26-.769 9.646-1.468zm-.692-1.14c.003-.115.005-.237.005-.325 0-3.601-1.835-7.22-6.35-7.22C4.327.6 2.49 4.219 2.49 7.819c0 .085.002.201.004.312.68.23 6.853 2.204 12.696.014z"
                    fill="#6FADFF"
                  />
                </svg>
              </a-button>
              <a-button shape="circle" status="warning">
                <svg width="25" height="25" viewBox="0 0 48 48" fill="none">
                  <path
                    d="M0 24C0 10.745 10.745 0 24 0s24 10.745 24 24-10.745 24-24 24S0 37.255 0 24z"
                    fill="#45B035"
                  />
                  <path
                    fill-rule="evenodd"
                    clip-rule="evenodd"
                    d="M30.723 19.296c-.159-.009-.319-.01-.48-.01-5.748 0-10.41 3.905-10.41 8.725 0 .789.129 1.553.363 2.28a13.495 13.495 0 01-4.384-.464l-.194-.056-4.132 2.104 1.104-3.458-.104-.067C9.758 26.604 8 23.853 8 20.758c0-5.279 5.116-9.558 11.428-9.558 5.717 0 10.454 3.51 11.295 8.096zm-15.272-.276c-.886 0-1.605-.697-1.605-1.554 0-.859.719-1.553 1.605-1.553.887 0 1.607.694 1.607 1.553 0 .857-.72 1.554-1.607 1.554zm7.954-3.107c.886 0 1.604.694 1.604 1.553 0 .857-.718 1.554-1.604 1.554-.887 0-1.604-.697-1.604-1.554 0-.859.717-1.553 1.604-1.553z"
                    fill="#fff"
                  />
                  <path
                    fill-rule="evenodd"
                    clip-rule="evenodd"
                    d="M30.33 36.142c-5.333 0-9.657-3.615-9.657-8.075 0-4.458 4.324-8.073 9.657-8.073 5.33 0 9.653 3.615 9.653 8.073 0 2.616-1.487 4.94-3.79 6.416l-.089.055.933 2.923-3.489-1.78s-.11.034-.165.048a11.35 11.35 0 01-3.053.413zm-4.717-10.856c0-.724.608-1.312 1.356-1.312.75 0 1.357.588 1.357 1.312 0 .726-.608 1.315-1.357 1.315-.748 0-1.356-.589-1.356-1.315zm6.72 0c0-.724.605-1.312 1.354-1.312.75 0 1.356.588 1.356 1.312 0 .726-.606 1.315-1.356 1.315-.748 0-1.355-.589-1.355-1.315z"
                    fill="#fff"
                  />
                </svg>
              </a-button>
              <a-button shape="circle" status="warning">
                <icon-github style="color: #000000; font-size: 21px" />
              </a-button>
              <a-button shape="circle" status="warning">
                <svg width="24" height="24" viewBox="0 0 48 48" fill="none">
                  <path
                    d="M0 24C0 10.745 10.745 0 24 0s24 10.745 24 24-10.745 24-24 24S0 37.255 0 24z"
                    fill="#FF6700"
                  />
                  <path
                    fill-rule="evenodd"
                    clip-rule="evenodd"
                    d="M24.684 16H11.47a.265.265 0 00-.269.261V31.91c0 .143.12.26.27.26h3.468c.149 0 .27-.117.27-.26v-12.28c0-.142.12-.26.268-.26h7.476c2.103 0 2.699 1.592 2.699 2.618v9.922c0 .143.12.26.269.26h3.466a.265.265 0 00.27-.26v-11.1c0-.917-.113-2.233-1.307-3.39C27.101 16.208 25.96 16 24.684 16zm11.847 0h-3.47a.265.265 0 00-.268.261V31.91c0 .143.12.26.269.26h3.469a.265.265 0 00.269-.26V16.26a.267.267 0 00-.269-.261zm-17.92 6.233h3.644c.149 0 .27.117.27.258v9.42a.267.267 0 01-.27.261h-3.644a.267.267 0 01-.27-.26v-9.418c0-.144.121-.261.27-.261z"
                    fill="#fff"
                  />
                </svg>
              </a-button>
            </div>
          </span>
        </div>
      </a-form>
    </div>
  </div>
</template>

<script setup lang="ts">
import { reactive } from "vue";
import API from "@/api";
import { userRegisterUsingPost } from "@/api/userController";
import message from "@arco-design/web-vue/es/message";
import { useRouter } from "vue-router";

const router = useRouter();

const form = reactive({
  userAccount: "",
  userPassword: "",
  checkPassword: "",
} as API.UserRegisterRequest);

/**
 * 提交
 */
const handleSubmit = async () => {
  const res = await userRegisterUsingPost(form);
  if (res.data.code === 0) {
    message.success("注册成功");
    router.push({
      path: "/user/login",
      replace: true,
    });
  } else {
    message.error("注册失败，" + res.data.message);
  }
};
</script>
<style scoped>
#big {
  display: flex;
  align-items: stretch;
  justify-content: center;
  width: 850px;
  height: 500px;
  margin: 0 auto;
}

.big-two {
  flex: 1;
  background-image: url("https://xinhuo-store.oss-cn-hangzhou.aliyuncs.com/%E6%97%A5%E5%B8%B8%E5%9B%BE%E7%89%87/gamer.jpg"); /* 替换为实际的图片 URL */
  background-position: center; /*图片覆盖整个背景*/
  background-size: cover; /* 居中图片 */
  border-radius: 8px 0 0 8px;
  box-shadow: 0 5px 8px rgba(0, 0, 0, 0.4);
}

#userRegisterPage {
  flex: 1;
  width: 500px;
  margin: 0 auto; /* 居中 */
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
  margin-right: 120px;
}

.register-link {
  margin-left: 20px;
  font-size: 14px;
}

.other-login-methods {
  margin-top: 20px;
  text-align: center;
}

.social-logins {
  display: flex;
  gap: 20px;
  justify-content: center;
  margin-top: 10px;
}

.social-logins a-button {
  width: 100px;
}
</style>
