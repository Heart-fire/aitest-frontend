<template>
  <a-modal v-model:visible="visible" :footer="false" @cancel="closeModal">
    <template #title>
      {{ title }}
    </template>
    <a-card :bordered="false" hoverable class="share-card">
      <template #title>
        <div class="card-title">
          <icon-share />
          <span>分享链接</span>
        </div>
      </template>
      <a-input :model-value="link" readonly class="copy-input">
        <template #suffix>
          <a-tooltip content="复制链接">
            <a-button type="text" @click="copyLink" class="copy-btn">
              <icon-copy />
            </a-button>
          </a-tooltip>
        </template>
      </a-input>
    </a-card>

    <a-card :bordered="false" hoverable class="qrcode-card">
      <template #title>
        <div class="card-title">
          <icon-qrcode />
          <span>扫码查看</span>
        </div>
      </template>
      <div class="qrcode-wrapper">
        <img :src="codeImg" class="qrcode-img" alt="分享二维码" />
      </div>
    </a-card>
  </a-modal>
</template>

<script setup lang="ts">
import { defineExpose, defineProps, ref, withDefaults } from "vue";
import { IconShare, IconCopy, IconQrcode } from "@arco-design/web-vue/es/icon";
// @ts-ignore
import QRCode from "qrcode";
import message from "@arco-design/web-vue/es/message";

/**
 * 定义组件属性类型
 */
interface Props {
  // 分享链接
  link: string;
  // 弹窗标题
  title: string;
}

/**
 * 给组件指定初始值
 */
const props = withDefaults(defineProps<Props>(), {
  link: () => "https://laoyujianli.com/share/yupi",
  title: () => "分享",
});

// 要展示的图片
const codeImg = ref();

// 是否可见
const visible = ref(false);

// 打开弹窗
const openModal = () => {
  visible.value = true;
};

// 暴露函数给父组件
defineExpose({
  openModal,
});

// 关闭弹窗
const closeModal = () => {
  visible.value = false;
};

// 二维码生成
QRCode.toDataURL(props.link)
  .then((url: any) => {
    codeImg.value = url;
  })
  .catch((err: any) => {
    console.error(err);
    message.error("生成二维码失败，" + err.message);
  });
</script>

<style scoped>
.share-card {
  margin-bottom: 20px;
  border-radius: 8px;
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.08);
}

.card-title {
  display: flex;
  gap: 8px;
  align-items: center;
  color: var(--color-text-1);
  font-weight: 500;
}

.copy-input {
  border-radius: 6px;
}

.copy-btn {
  transition: color 0.2s;
}

.copy-btn:hover {
  color: rgb(var(--primary-6));
}

.qrcode-card {
  border-radius: 8px;
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.08);
}

.qrcode-wrapper {
  display: flex;
  justify-content: center;
  padding: 12px;
  background: var(--color-fill-2);
  border-radius: 6px;
}

.qrcode-img {
  width: 160px;
  height: 160px;
  padding: 8px;
  background: white;
  border: 1px solid var(--color-border-2);
  border-radius: 4px;
}
</style>
