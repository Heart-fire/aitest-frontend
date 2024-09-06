<!-- 写法: 最外层先定义一个ID与页面的名称一致-->
<template>
  <div id="appStatisticPage">
    <a-tooltip content="例如输入 1 " position="right">
      <h2 style="width: 130px; margin-bottom: 15px">应用结果统计</h2>
    </a-tooltip>
    <div class="search-bar">
      <a-input-search
        :style="{ width: '330px' }"
        button-text="搜索"
        placeholder="请输入 appID"
        search-button
        size="large"
        @search="(value) => loadAppAnswerResultCountData(value)"
      />
    </div>
    <v-chart
      :option="appAnswerResultCountOptions"
      style="height: 350px; margin-left: 250px"
    />
    <h2>热门应用统计</h2>
    <v-chart :option="appAnswerCountOptions" style="height: 320px" />
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
 */
const appAnswerCountList = ref<API.AppAnswerCountDTO[]>([]);
const appAnswerResultCountList = ref<API.AppAnswerResultCountDTO>([]);

/**
 * 加载数据的函数
 */
const loadAppAnswerCountData = async () => {
  const res = await getAppAnswerCountUsingGet();
  if (res.data.code === 0) {
    appAnswerCountList.value = res.data.data || [];
  } else {
    message.error("获取数据失败，" + res.data.message);
  }
};

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
 */
const appAnswerCountOptions = computed(() => {
  return {
    xAxis: {
      type: "category",
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
