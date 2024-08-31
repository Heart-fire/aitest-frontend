<template>
  <div id="basicLayout">
    <!-- vh:不管屏幕有多高,总是占屏幕的100% -->
    <a-layout style="height: 100vh">
      <a-layout-header class="Header">
        <GlobalHeader />
      </a-layout-header>
      <!-- 中间的内容需要复用这个布局,需要动态替换的-->
      <a-layout-content class="Content">
        <router-view />
      </a-layout-content>
      <a-layout-footer class="footer">
        <a href="https://github.com/Heart-fire" target="_blank"
          >✅✅✅用户可以基于AI快速制作并发布多种答题应用</a
        >
      </a-layout-footer>
    </a-layout>
  </div>
</template>

<script setup lang="ts">
import GlobalHeader from "@/components/GlobalHeader.vue";
</script>
<!--为了防止冲突，先找basicLayout下面的ID-->
<style scoped>
#basicLayout .Header {
  margin-bottom: 16px;
  box-shadow: #eee 1px 1px 5px;
}

#basicLayout .Content {
  box-sizing: border-box;
  width: 100%;
  max-width: 1300px;
  margin: 0 auto 28px;
  padding: 20px;
  background: linear-gradient(to right, #fefefe, #fff);
}

#basicLayout .footer {
  padding: 30px;
  text-align: center;
  background: #ffffff;
  box-shadow: 0 -1px 3px rgba(0, 0, 0, 0.1); /* 添加阴影线 */
}

a {
  color: #2d2d2d;
  font-size: 15px;
  text-decoration: none;
}

a:hover {
  color: #1a58b0; /* 设置鼠标悬停时的链接颜色 */
}
</style>
