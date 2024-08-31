<!-- 写法: 最外层先定义一个ID与页面的名称一致-->
<template>
  <div id="homePage">
    <a-form
      :model="formSearchParams"
      :style="{ marginBottom: '20px' }"
      style="align-items: center"
      @submit="doSearch"
    >
      <a-input-search
        v-model="formSearchParams.appName"
        :style="{ width: '320px' }"
        button-text="搜索"
        placeholder="快速发现答题应用"
        search-button
        size="large"
        @click="doSearch"
      >
        <template #button-icon>
          <icon-search />
        </template>
      </a-input-search>
    </a-form>
    <a-list
      class="list-demo-action-layout"
      :grid-props="{ gutter: [20, 20], sm: 24, md: 12, lg: 8, xl: 6 }"
      :bordered="false"
      :data="dataList"
      :pagination-props="{
        pageSize: searchParams.pageSize,
        current: searchParams.current,
        total,
      }"
      @page-change="onPageChange"
    >
      <template #item="{ item }">
        <AppCard :app="item" />
      </template>
    </a-list>
  </div>
</template>

<!--定义setup 就可以用编程式写法(JS)-->
<script setup lang="ts">
import { ref, watchEffect } from "vue";
import AppCard from "@/components/AppCard.vue";
import API from "@/api";
import { listAppVoByPageUsingPost } from "@/api/appController";
import message from "@arco-design/web-vue/es/message";
import { REVIEW_STATUS_ENUM } from "@/constant/app";

// 初始化搜索条件（不应该被修改）
const initSearchParams = {
  current: 1,
  pageSize: 8,
};
// 将 initSearchParams 对象中的所有属性展开并复制到 searchParams 对象中
const searchParams = ref<API.UserQueryRequest>({
  ...initSearchParams,
});
const dataList = ref<API.AppVO[]>([]);
const total = ref<number>(0);

/**
 * 加载数据
 */
const loadData = async () => {
  const params = {
    reviewStatus: REVIEW_STATUS_ENUM.PASS,
    ...searchParams.value,
  };
  const res = await listAppVoByPageUsingPost(params);
  if (res.data.code === 0) {
    dataList.value = res.data.data?.records || [];
    total.value = res.data.data?.total || 0;
  } else {
    message.error("获取数据失败，" + res.data.message);
  }
};

/**
 * 当分页变化时，改变搜索条件，触发数据加载
 * @param page
 */
const onPageChange = (page: number) => {
  searchParams.value = {
    ...searchParams.value,
    current: page,
  };
};
/**
 * 处理搜索事件
 * @param value
 */
const formSearchParams = ref<API.AppQueryRequest>({});
const doSearch = () => {
  searchParams.value = {
    ...initSearchParams,
    ...formSearchParams.value,
  };
};

/**
 * 监听 searchParams 变量，改变时触发数据的重新加载
 * 如果watchEffect中写的函数中有变量发生变化，就会触发重新
 */
watchEffect(() => {
  loadData();
});
</script>

<!-- 每个Vue页面有三部分{内容,行为,样式}[样式加scoped的作用就是把样式局限在页面里,不会污染全局的样式]-->
<style scoped>
#homePage {
}

.searchBar {
  margin-bottom: 29px;
  text-align: center;
}

.list-demo-action-layout .image-area {
  width: 183px;
  height: 119px;
  overflow: hidden;
  border-radius: 2px;
}

.list-demo-action-layout .list-demo-item {
  padding: 20px 0;
  border-bottom: 1px solid var(--color-fill-3);
}

.list-demo-action-layout .image-area img {
  width: 100%;
}

.list-demo-action-layout .arco-list-item-action .arco-icon {
  margin: 0 4px;
}
</style>
