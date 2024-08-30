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
        <a href="https://www.code-nav.cn" target="_blank">脚部</a>
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
  background: linear-gradient(to right, #fefefe, #fff);
  margin-bottom: 28px;
  padding: 20px;
}

#basicLayout .footer {
  background: #f5e1e1;
  padding: 20px;
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  text-align: center;
}
</style>
