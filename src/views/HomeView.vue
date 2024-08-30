<template>
  <!-- 写法: 最外层先定义一个ID与页面的名称一致-->
  <div class="home">
    {{ msg }}
  </div>
</template>

<!--定义setup 就可以用编程式写法(JS)-->
<script setup lang="ts">
const msg = "This is an Home page";
</script>

<!-- 每个Vue页面有三部分{内容,行为,样式}[样式加scoped的作用就是把样式局限在页面里,不会污染全局的样式]-->
<style scoped></style>
