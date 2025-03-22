<template>
  <div id="doAnswerPage">
    <div class="page-container">
      <a-card class="question-card">
        <div class="app-header">
          <h1 class="app-title">{{ app.appName }}</h1>
          <p class="app-desc">{{ app.appDesc }}</p>
        </div>

        <div class="progress-bar">
          <div
            class="progress-inner"
            :style="{ width: `${(current / questionContent.length) * 100}%` }"
          ></div>
        </div>

        <div class="question-container">
          <div class="question-number">
            问题 {{ current }}/{{ questionContent.length }}
          </div>
          <h2 class="question-title">{{ currentQuestion?.title }}</h2>

          <div class="options-container">
            <a-radio-group
              direction="vertical"
              v-model="currentAnswer"
              :options="questionOptions"
              @change="doRadioChange"
              class="custom-radio-group"
            />
          </div>
        </div>

        <div class="navigation-buttons">
          <a-button
            v-if="current > 1"
            class="nav-button prev-button"
            @click="current -= 1"
          >
            <template #icon>
              <icon-left />
            </template>
            上一题
          </a-button>

          <a-button
            type="primary"
            class="nav-button next-button"
            v-if="current < questionContent.length"
            :disabled="!currentAnswer"
            @click="current += 1"
          >
            下一题
            <template #icon>
              <icon-right />
            </template>
          </a-button>

          <a-button
            type="primary"
            class="nav-button submit-button"
            v-if="current === questionContent.length"
            :loading="submitting"
            :disabled="!currentAnswer"
            @click="doSubmit"
          >
            {{ submitting ? "AI评分中..." : "查看结果" }}
            <template #icon>
              <icon-check />
            </template>
          </a-button>
        </div>
      </a-card>
    </div>
  </div>
</template>

<script setup lang="ts">
import {
  computed,
  defineProps,
  reactive,
  ref,
  watchEffect,
  withDefaults,
} from "vue";
import API from "@/api";
import { useRouter } from "vue-router";
import { listQuestionVoByPageUsingPost } from "@/api/questionController";
import message from "@arco-design/web-vue/es/message";
import { getAppVoByIdUsingGet } from "@/api/appController";
import {
  addUserAnswerUsingPost,
  generateUserAnswerIdUsingGet,
} from "@/api/userAnswerController";
import { IconLeft, IconRight, IconCheck } from "@arco-design/web-vue/es/icon";

interface Props {
  appId: string;
}

const props = withDefaults(defineProps<Props>(), {
  appId: () => {
    return "";
  },
});
const router = useRouter();

const app = ref<API.AppVO>({});
// 题目内容结构（理解为题目列表）
const questionContent = ref<API.QuestionContentDTO[]>([]);

// 当前题目的序号（从 1 开始）
const current = ref(1);
// 当前题目
const currentQuestion = ref<API.QuestionContentDTO>({});
// 当前题目选项
const questionOptions = computed(() => {
  return currentQuestion.value?.options
    ? currentQuestion.value.options.map((option) => {
        return {
          label: `${option.key}. ${option.value}`,
          value: option.key,
        };
      })
    : [];
});
// 当前答案
const currentAnswer = ref<string>();
// 回答列表
const answerList = reactive<string[]>([]);
// 是否正在提交结果
const submitting = ref(false);

// 唯一 id
const id = ref<number>();

// 生成唯一 id
const generateId = async () => {
  const res = await generateUserAnswerIdUsingGet();
  if (res.data.code === 0) {
    id.value = res.data.data as any;
  } else {
    message.error("获取唯一 id 失败，" + res.data.message);
  }
};

// 进入页面时，生成唯一 id
watchEffect(() => {
  generateId();
});

/**
 * 加载数据
 */
const loadData = async () => {
  if (!props.appId) {
    return;
  }
  // 获取 app
  let res: any = await getAppVoByIdUsingGet({
    id: props.appId as any,
  });
  if (res.data.code === 0) {
    app.value = res.data.data as any;
  } else {
    message.error("获取应用失败，" + res.data.message);
  }
  // 获取题目
  res = await listQuestionVoByPageUsingPost({
    appId: props.appId as any,
    current: 1,
    pageSize: 1,
    sortField: "createTime",
    sortOrder: "descend",
  });
  if (res.data.code === 0 && res.data.data?.records) {
    questionContent.value = res.data.data.records[0].questionContent;
  } else {
    message.error("获取题目失败，" + res.data.message);
  }
};

// 获取旧数据
watchEffect(() => {
  loadData();
});

// 改变 current 题号后，会自动更新当前题目和答案
watchEffect(() => {
  currentQuestion.value = questionContent.value[current.value - 1];
  currentAnswer.value = answerList[current.value - 1];
});

/**
 * 选中选项后，保存选项记录
 * @param value
 */
const doRadioChange = (value: string) => {
  answerList[current.value - 1] = value;
};

/**
 * 提交
 */
const doSubmit = async () => {
  if (!props.appId || !answerList) {
    return;
  }
  submitting.value = true;
  const res = await addUserAnswerUsingPost({
    appId: props.appId as any,
    choices: answerList,
    id: id.value as any,
  });
  if (res.data.code === 0 && res.data.data) {
    router.push(`/answer/result/${res.data.data}`);
  } else {
    message.error("提交答案失败，" + res.data.message);
  }
  submitting.value = false;
};
</script>
<style scoped>
.page-container {
  max-width: 1100px;
  margin: 0 auto;
}

.question-card {
  padding: 10px;
  background-color: #ffffff;
  border-radius: 16px;
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.08);
  transition: all 0.3s ease;
}

.app-header {
  margin-bottom: 30px;
  padding-bottom: 20px;
  text-align: center;
  border-bottom: 1px solid #f0f2f5;
}

.app-title {
  margin-bottom: 8px;
  color: #1d2129;
  font-weight: 600;
  font-size: 28px;
}

.app-desc {
  margin-bottom: 0;
  color: #86909c;
  font-size: 16px;
}

.progress-bar {
  height: 6px;
  margin-bottom: 30px;
  overflow: hidden;
  background-color: #f2f3f5;
  border-radius: 3px;
}

.progress-inner {
  height: 100%;
  background: linear-gradient(90deg, #165dff, #722ed1);
  border-radius: 3px;
  transition: width 0.3s ease;
}

.question-container {
  margin-bottom: 30px;
  padding: 20px 40px;
}

.question-number {
  margin-bottom: 12px;
  color: #86909c;
  font-size: 16px;
}

.question-title {
  margin-bottom: 30px;
  color: #1d2129;
  font-weight: 600;
  font-size: 24px;
  line-height: 1.5;
  letter-spacing: 0.5px;
}

.options-container {
  margin-bottom: 35px;
}

.custom-radio-group :deep(.arco-radio) {
  margin-right: 12px;
}

.custom-radio-group
  :deep(.arco-radio-group-direction-vertical .arco-radio-group-item) {
  margin-bottom: 16px;
  padding: 16px 20px;
  color: #4e5969;
  font-weight: 400;
  font-size: 16px;
  line-height: 1.5;
  background-color: #f7f8fa;
  border: 2px solid #e5e6eb;
  border-radius: 12px;
  transition: all 0.3s ease;
}

.custom-radio-group
  :deep(.arco-radio-group-direction-vertical .arco-radio-group-item:hover) {
  color: #1d2129;
  background-color: #f2f3ff;
  border-color: #4080ff;
  box-shadow: 0 4px 12px rgba(64, 128, 255, 0.1);
  transform: translateY(-2px);
}

.custom-radio-group :deep(.arco-radio-checked .arco-radio-group-item) {
  color: #1d2129;
  font-weight: 500;
  background-color: #f2f3ff;
  border-color: #4080ff;
}

.custom-radio-group
  :deep(.arco-radio-group-direction-vertical .arco-radio-group-item:hover) {
  background-color: #f2f3ff;
  border-color: #165dff;
}

.custom-radio-group :deep(.arco-radio-checked .arco-radio-group-item) {
  background-color: #f2f3ff;
  border-color: #165dff;
}

.navigation-buttons {
  display: flex;
  justify-content: space-between;
  padding: 0 40px 20px;
}

.nav-button {
  min-width: 120px;
  height: 40px;
  font-size: 16px;
  border-radius: 20px;
  transition: all 0.3s ease;
}

.prev-button {
  margin-right: auto;
}

.next-button,
.submit-button {
  margin-left: auto;
}

.nav-button:hover:not([disabled]) {
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
  transform: translateY(-2px);
}

.nav-button:active:not([disabled]) {
  transform: translateY(0);
}

@media (max-width: 768px) {
  .page-container {
    padding: 0 16px;
  }

  .question-container {
    padding: 16px;
  }

  .navigation-buttons {
    padding: 0 16px 16px;
  }

  .nav-button {
    min-width: 100px;
  }
}
</style>
