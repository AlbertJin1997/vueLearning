<template>
  <div class="external-control-demo-container">
    <h2>外部控制 PlyrDemo 弹窗演示</h2>
    
    <div class="demo-section">
      <h3>基本控制演示</h3>
      <div class="demo-controls">
        <el-button type="primary" @click="showBasicModal = true">打开基本视频弹窗</el-button>
        <el-button @click="showBasicModal = false" :disabled="!showBasicModal">关闭弹窗</el-button>
      </div>
    </div>

    <div class="demo-section">
      <h3>自定义标签页演示</h3>
      <div class="demo-controls">
        <el-button type="success" @click="showCustomTabModal = true">打开自定义标签页弹窗</el-button>
        <el-button @click="showCustomTabModal = false" :disabled="!showCustomTabModal">关闭弹窗</el-button>
        <el-select v-model="customDefaultTab" placeholder="选择默认标签页">
          <el-option label="技术教程" value="tech"></el-option>
          <el-option label="娱乐视频" value="entertainment"></el-option>
        </el-select>
      </div>
      <p v-if="lastTabChange" class="tab-change-info">上次切换的标签页: {{ lastTabChange }}</p>
    </div>

    <div class="demo-section">
      <h3>自定义视频数据演示</h3>
      <div class="demo-controls">
        <el-button type="info" @click="showCustomDataModal = true">打开自定义视频数据弹窗</el-button>
        <el-button @click="showCustomDataModal = false" :disabled="!showCustomDataModal">关闭弹窗</el-button>
      </div>
    </div>

    <!-- 基本控制的弹窗 -->
    <PlyrDemo v-model:visible="showBasicModal" />

    <!-- 自定义标签页的弹窗 -->
    <PlyrDemo 
      v-model:visible="showCustomTabModal" 
      :defaultTab="customDefaultTab"
      :tabConfig="customTabConfig"
      @tab-change="handleTabChange"
    />

    <!-- 自定义视频数据的弹窗 -->
    <PlyrDemo 
      v-model:visible="showCustomDataModal" 
      :tabConfig="customDataTabConfig"
      :videoLists="customVideoLists"
    />
  </div>
</template>

<script setup>
import { ref, reactive } from 'vue';
import { ElButton, ElSelect, ElOption } from 'element-plus';
import PlyrDemo from './PlyrDemo.vue';

// 基本控制的弹窗状态
const showBasicModal = ref(false);

// 自定义标签页的弹窗状态
const showCustomTabModal = ref(false);
const customDefaultTab = ref('tech');
const lastTabChange = ref('');

// 自定义标签页配置
const customTabConfig = [
  { key: 'tech', title: '技术教程' },
  { key: 'entertainment', title: '娱乐视频' }
];

// 自定义视频数据的弹窗状态
const showCustomDataModal = ref(false);

// 自定义视频数据配置
const customDataTabConfig = [
  { key: 'featured', title: '精选视频' },
  { key: 'newest', title: '最新上传' }
];

// 自定义视频数据源
const customVideoLists = reactive({
  featured: [
    {
      src: `http://s2.pstatp.com/cdn/expire-1-M/byted-player-videos/1.0.0/xgplayer-demo.mp4`,
      type: 'video/mp4'
    },
    {
      src: `http://s2.pstatp.com/cdn/expire-1-M/byted-player-videos/1.0.0/xgplayer-demo.mp4`,
      type: 'video/mp4'
    }
  ],
  newest: [
    {
      src: `http://s2.pstatp.com/cdn/expire-1-M/byted-player-videos/1.0.0/xgplayer-demo.mp4`,
      type: 'video/mp4'
    }
  ]
});

// 处理标签页切换事件
const handleTabChange = (tabKey) => {
  lastTabChange.value = tabKey;
  console.log('标签页切换为:', tabKey);
};
</script>

<style scoped>
.external-control-demo-container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 24px;
  background-color: #f9f9f9;
  min-height: 600px;
}

.demo-section {
  margin-bottom: 40px;
  padding: 20px;
  background-color: #fff;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

.demo-section h3 {
  margin-top: 0;
  margin-bottom: 16px;
  color: #333;
}

.demo-controls {
  display: flex;
  gap: 12px;
  flex-wrap: wrap;
  align-items: center;
}

.tab-change-info {
  margin-top: 16px;
  padding: 12px;
  background-color: #f0f9ff;
  border: 1px solid #91d5ff;
  border-radius: 4px;
  color: #096dd9;
}

/* 响应式调整 */
@media (max-width: 768px) {
  .demo-controls {
    flex-direction: column;
    align-items: stretch;
  }
  
  .demo-controls > * {
    width: 100%;
  }
}
</style>