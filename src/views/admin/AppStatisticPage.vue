<!-- 写法: 最外层先定义一个ID与页面的名称一致-->
<template>
  <div id="appStatisticPage">
    <a-tooltip content="友好提示: 例如输入 1、2 " position="right">
      <h2 style="width: 130px; margin-bottom: 15px">应用结果统计</h2>
    </a-tooltip>
    <div class="search-bar">
      <a-input-search
        :style="{ width: '330px' }"
        button-text="搜索"
        placeholder="请输入应用 ID"
        search-button
        size="large"
        @search="(value) => loadAppAnswerResultCountData(value)"
      />
    </div>
    <v-chart
      :option="appAnswerResultCountOptions"
      style="height: 350px; margin-left: 240px"
    />
    <h2>热门应用统计</h2>
    <v-chart
      :option="appAnswerCountOptions"
      style="height: 500px; width: 1260px"
    />
  </div>
</template>

<!--定义setup 就可以用编程式写法(JS)-->
<script setup lang="ts">
import { computed, ref, watchEffect } from "vue";
import "echarts";
import API from "@/api";
import VChart from "vue-echarts";
import message from "@arco-design/web-vue/es/message";
import {
  getAppAnswerCountUsingGet,
  getAppAnswerResultCountUsingGet,
} from "@/api/appStatisticController";

/**
 * 定义两个列表
 * appAnswerCountList 是一个由 Vue 的 ref 函数定义的响应式变量，用于存储从后端接口返回的列表数据。
 */
const appAnswerCountList = ref<API.AppAnswerCountDTO[]>([]);
const appAnswerResultCountList = ref<API.AppAnswerResultCountDTO>([]);

/**
 * 加载数据的函数
 * 作用是通过调用 getAppAnswerCountUsingGet 函数获取答题统计数据，
 * 并将成功获取到的数据存入 appAnswerCountList 中。
 */
const loadAppAnswerCountData = async () => {
  const res = await getAppAnswerCountUsingGet();
  if (res.data.code === 0) {
    appAnswerCountList.value = res.data.data || [];
  } else {
    message.error("获取数据失败，" + res.data.message);
  }
};
// await 是用于处理 Promise 的关键字，
// 它只能在 async 函数内部使用。它的主要作用是暂停代码的执行，直到 Promise 被解析（resolved）或拒绝（rejected）。
const loadAppAnswerResultCountData = async (appId: string) => {
  if (!appId) {
    return;
  }
  const res = await getAppAnswerResultCountUsingGet({
    appId: appId as any,
  });
  if (res.data.code === 0) {
    appAnswerResultCountList.value = res.data.data || [];
  } else {
    message.error("获取数据失败，" + res.data.message);
  }
};
/**
 * 热门应用柱状图展示
 * computed 可以根据其他响应式数据计算出一个新值，这个新值会自动更新，
 */
const appAnswerCountOptions = computed(() => {
  return {
    tooltip: {
      trigger: "axis",
      axisPointer: {
        type: "shadow",
      },
    },
    grid: {
      left: "3%",
      right: "4%",
      bottom: "3%",
      containLabel: true,
    },
    xAxis: {
      type: "category",
      axisLabel: { interval: 0, rotate: 30 }, //将应用ID横向展示
      data: appAnswerCountList.value.map((item) => item.appId),
      name: "应用 ID",
    },
    yAxis: {
      type: "value",
      name: "用户答案数",
    },
    series: [
      {
        data: appAnswerCountList.value.map((item) => item.answerCount),
        type: "bar",
        showBackground: true,
        backgroundStyle: {
          color: "rgba(180, 180, 180, 0.2)",
        },
      },
    ],
  };
});

/**
 * 用户回答饼图统计
 */
const appAnswerResultCountOptions = computed(() => {
  return {
    title: {
      text: "应用答案结果分布",
      left: "center",
    },
    tooltip: {
      trigger: "item",
      formatter: "{a} <br/>{b} : {c} ({d}%)",
    },
    legend: {
      left: "left",
      orient: "vertical",
      data: appAnswerResultCountList.value.map((item) => item.resultName),
    },
    series: [
      {
        type: "pie",
        radius: "65%",
        center: ["50%", "50%"],
        selectedMode: "single",
        data: appAnswerResultCountList.value.map((item) => {
          return { value: item.resultCount, name: item.resultName };
        }),
        emphasis: {
          itemStyle: {
            shadowBlur: 10,
            shadowOffsetX: 0,
            shadowColor: "rgba(0, 0, 0, 0.5)",
          },
        },
      },
    ],
  };
});

/**
 * 监听 load 变量，改变时触发数据的重新加载
 * 如果watchEffect中写的函数中有变量发生变化，就会触发重新加载
 */
watchEffect(() => {
  loadAppAnswerCountData();
  loadAppAnswerResultCountData("");
});
</script>

<!-- 每个Vue页面有三部分{内容,行为,样式}[样式加scoped的作用就是把样式局限在页面里,不会污染全局的样式]-->
<style scoped>
#appStatisticPage {
}

.search-bar {
  margin-bottom: 30px;
}
</style>
