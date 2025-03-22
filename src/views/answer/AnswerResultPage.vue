<template>
  <div id="answerResultPage">
    <a-card class="card-a" :class="{ 'fade-in': true }">
      <a-row :gutter="24">
        <a-col flex="320px" class="image-col">
          <a-image
            width="100%"
            :src="data.resultPicture"
            class="result-image"
          />
        </a-col>
        <a-col flex="auto" class="content-wrapper">
          <div class="result-header">
            <h1 class="result-title">{{ data.resultName }}</h1>
            <a-tag :color="getScoreColor(data.resultScore)" class="score-tag">
              {{ data.resultScore }}
            </a-tag>
          </div>
          <div class="result-desc">
            <p>{{ data.resultDesc }}</p>
          </div>
          <div class="info-grid">
            <div class="info-item">
              <span class="label">应用类型</span>
              <a-tag :color="data.appType === 0 ? '#0fc6c2' : '#ffb400'">
                {{ APP_TYPE_MAP[data.appType] }}
              </a-tag>
            </div>
            <div class="info-item">
              <span class="label">评分策略</span>
              <a-tag :color="data.scoringStrategy === 0 ? 'green' : 'magenta'">
                {{ APP_SCORING_STRATEGY_MAP[data.scoringStrategy] }}
              </a-tag>
            </div>
            <div class="info-item">
              <span class="label">我的答案</span>
              <span class="value">{{ data.choices }}</span>
            </div>
          </div>
          <div class="user-info">
            <a-space>
              <a-avatar :size="32" :image-url="data.user?.userAvatar" />
              <div class="user-details">
                <span class="username">{{
                  data.user?.userName ?? "无名"
                }}</span>
                <span class="time">{{
                  dayjs(data.createTime).format("YYYY-MM-DD HH:mm:ss")
                }}</span>
              </div>
            </a-space>
          </div>
          <div class="action-buttons">
            <a-button
              type="primary"
              shape="round"
              size="large"
              :href="`/answer/do/${data.appId}`"
            >
              <template #icon>
                <icon-refresh />
              </template>
              再次答题
            </a-button>
            <a-button shape="round" size="large">
              <template #icon>
                <icon-share />
              </template>
              分享结果
            </a-button>
          </div>
        </a-col>
      </a-row>
    </a-card>
  </div>
</template>

<script setup lang="ts">
import { defineProps, ref, watchEffect, withDefaults } from "vue";
import API from "@/api";
import { getUserAnswerVoByIdUsingGet } from "@/api/userAnswerController";
import message from "@arco-design/web-vue/es/message";
import { useRouter } from "vue-router";
import { dayjs } from "@arco-design/web-vue/es/_utils/date";
import { APP_SCORING_STRATEGY_MAP, APP_TYPE_MAP } from "../../constant/app";
import { IconRefresh, IconShare } from "@arco-design/web-vue/es/icon";

const getScoreColor = (score: number) => {
  if (score >= 90) return "#00b42a";
  if (score >= 75) return "#0fc6c2";
  if (score >= 60) return "#ffb400";
  return "#f53f3f";
};

interface Props {
  id: string;
}

const props = withDefaults(defineProps<Props>(), {
  id: () => {
    return "";
  },
});

const router = useRouter();

const data = ref<API.UserAnswerVO>({});

/**
 * 加载数据
 */
const loadData = async () => {
  if (!props.id) {
    return;
  }
  const res = await getUserAnswerVoByIdUsingGet({
    id: props.id as any,
  });
  if (res.data.code === 0) {
    data.value = res.data.data as any;
  } else {
    message.error("获取数据失败，" + res.data.message);
  }
};

/**
 * 监听 searchParams 变量，改变时触发数据的重新加载
 */
watchEffect(() => {
  loadData();
});
</script>

<style scoped>
.card-a {
  max-width: 1160px;
  margin: 0 auto;
  overflow: hidden;
  border-radius: 16px;
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.08);
  transition: all 0.3s ease;
}

.fade-in {
  animation: fadeIn 0.5s ease-out;
}

@keyframes fadeIn {
  from {
    transform: translateY(20px);
    opacity: 0;
  }

  to {
    transform: translateY(0);
    opacity: 1;
  }
}

.image-col {
  padding: 24px;
}

.result-image {
  overflow: hidden;
  border-radius: 12px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

.content-wrapper {
  padding: 32px 24px;
}

.result-header {
  display: flex;
  gap: 16px;
  align-items: center;
  margin-bottom: 24px;
}

.result-title {
  margin: 0;
  color: #1d2129;
  font-weight: 600;
  font-size: 28px;
}

.score-tag {
  padding: 4px 12px;
  font-weight: 600;
  font-size: 16px;
}

.result-desc {
  margin-bottom: 32px;
  color: #4e5969;
  font-size: 16px;
  line-height: 1.6;
}

.info-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 24px;
  margin-bottom: 32px;
}

.info-item {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.label {
  color: #86909c;
  font-size: 14px;
}

.value {
  color: #1d2129;
  font-size: 15px;
}

.user-info {
  margin-bottom: 32px;
  padding: 16px;
  background: #f2f3f5;
  border-radius: 8px;
}

.user-details {
  display: flex;
  flex-direction: column;
}

.username {
  color: #1d2129;
  font-weight: 500;
  font-size: 15px;
}

.time {
  color: #86909c;
  font-size: 13px;
}

.action-buttons {
  display: flex;
  gap: 16px;
}

.action-buttons .arco-btn {
  height: 44px;
  padding: 0 24px;
  transition: transform 0.2s ease;
}

.action-buttons .arco-btn:hover {
  transform: translateY(-2px);
}
</style>
