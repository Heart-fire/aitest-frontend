// 定义状态。在store目录下定义user模块，定义了用户的存储、远程获取、修改逻辑
import { ref } from "vue";
import { defineStore } from "pinia";
import { getLoginUserUsingGet } from "@/api/userController";
import ACCESS_ENUM from "@/access/accessEnum";

export const useLoginUserStore = defineStore("loginUser", () => {
  const loginUser = ref<API.LoginUserVO>({
    userName: "未登录",
  });

  // 远程获取，响应成功的参数是0---[SUCCESS(0, "ok"),]---
  async function fetchLoginUser() {
    const res = await getLoginUserUsingGet();
    if (res.data.code === 0 && res.data.data) {
      loginUser.value = res.data.data;
    } else {
      loginUser.value = { userRole: ACCESS_ENUM.ADMIN };
    }
  }

  function setLoginUser(newLoginUser: API.LoginUserVO) {
    loginUser.value = newLoginUser;
  }

  return { loginUser, setLoginUser, fetchLoginUser };
});
