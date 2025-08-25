<template>
  <div class="plyr-demo-container">
    <h2>Plyr 多视频播放器演示</h2>
    <Tabs v-model:activeKey="activeTabKey" @change="handleTabChange">
      <TabPane key="tab1" tab="视频列表1">
        <div class="video-grid">
          <div v-for="(video, index) in videoLists.tab1" :key="index" class="video-item">
            <video :ref="el => setVideoRef('tab1', index, el)" class="plyr__video-player" controls preload="none">
              <source :src="video.src" :type="video.type" />
            </video>
          </div>
        </div>
      </TabPane>
      <TabPane key="tab2" tab="视频列表2">
        <div class="video-grid">
          <div v-for="(video, index) in videoLists.tab2" :key="index" class="video-item">
            <video :ref="el => setVideoRef('tab2', index, el)" class="plyr__video-player" controls preload="none">
              <source :src="video.src" :type="video.type" />
            </video>
          </div>
        </div>
      </TabPane>
      <TabPane key="tab3" tab="视频列表3">
        <div class="video-grid">
          <div v-for="(video, index) in videoLists.tab3" :key="index" class="video-item">
            <video :ref="el => setVideoRef('tab3', index, el)" class="plyr__video-player" controls preload="none">
              <source :src="video.src" :type="video.type" />
            </video>
          </div>
        </div>
      </TabPane>
    </Tabs>
    <p class="note">
      注意：请将视频文件命名为sample1.mp4至sample27.mp4并放在public目录下，每个标签页需要9个视频文件。悬停进度条预览功能需要提供缩略图VTT文件，您可以将thumbnails.vtt文件放在public目录下，或者使用在线VTT文件URL替换配置中的路径。
    </p>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted, watch } from 'vue';
import 'plyr/dist/plyr.css';
import { Tabs, TabPane } from 'ant-design-vue';
import { VideoPlayer } from '../utils/VideoPlayer';

// 激活的标签页键
const activeTabKey = ref('tab1');

// 视频数据源 - 三个标签页，每个标签页9个视频
const videoLists = {
  tab1: Array.from({ length: 9 }, (_, i) => ({
    src: `http://s2.pstatp.com/cdn/expire-1-M/byted-player-videos/1.0.0/xgplayer-demo.mp4`,
    type: 'video/mp4'
  })),
  tab2: Array.from({ length: 9 }, (_, i) => ({
    src: `/sample${i + 10}.mp4`,
    type: 'video/mp4'
  })),
  tab3: Array.from({ length: 9 }, (_, i) => ({
    src: `/sample${i + 19}.mp4`,
    type: 'video/mp4'
  }))
};

// 视频播放器引用对象，按标签页组织
const videoRefs = ref({
  tab1: [],
  tab2: [],
  tab3: []
});

// VideoPlayer 实例对象，按标签页组织
const playerInstances = ref({
  tab1: [],
  tab2: [],
  tab3: []
});

// 设置视频引用的函数
const setVideoRef = (tabKey, index, el) => {
  if (el) {
    videoRefs.value[tabKey][index] = el;
  }
};

// 初始化指定标签页的播放器实例
const initPlayerInstances = (tabKey) => {
  // 等待DOM更新完成
  setTimeout(() => {
    videoRefs.value[tabKey].forEach((videoEl, index) => {
      if (videoEl) {
        // 如果该位置还没有实例，则创建；如果已有实例，则跳过
        if (!playerInstances.value[tabKey][index]) {
          // 配置选项
          const options = {
            autoplay: false,
            controls: [
              'play-large',
              'current-time',
              'progress',
              'mute',
              'volume',
              'settings',
              'fullscreen',
            ],
            tooltips: { seek: true },
            previewThumbnails: { enabled: true, src: '/public/thumbnails.vtt' },
            markers: { enabled: true, points: [{ time: 20, label: 'aaaa' }] }
          };

          // 创建VideoPlayer实例
          playerInstances.value[tabKey][index] = new VideoPlayer(videoEl, options);
          playerInstances.value[tabKey][index].init().then((player) => {
            // 获取静音按钮
            const muteButton = player.elements.buttons.mute;
            muteButton.style.transform = 'rotate(90deg)';

            // 获取音量滑块
            const volumeSlideBar = player.elements.inputs.volume;
            volumeSlideBar.style.display = 'none';

            // 克隆静音按钮（不包含事件监听器）
            const newButton = muteButton.cloneNode(true);
            muteButton.parentNode.replaceChild(newButton, muteButton);

            // 为新按钮添加点击逻辑 - 切换静音状态
            newButton.addEventListener('click', (e) => {
              e.preventDefault();
              e.stopPropagation();
              // 切换音量滑块显示状态
              volumeSlideBar.style.display = volumeSlideBar.style.display === 'none' ? 'block' : 'none';
            });

            // 监听音量变化事件，更新按钮图标
            player.on('volumechange', () => {
              // 获取按钮中的两个图标
              const mutedIcon = newButton.querySelector('.icon--pressed');
              const volumeIcon = newButton.querySelector('.icon--not-pressed');

              if (player.muted || player.volume === 0) {
                // 静音状态 - 显示静音图标
                mutedIcon.style.display = 'block';
                volumeIcon.style.display = 'none';
                newButton.setAttribute('aria-pressed', 'true');
              } else {
                // 非静音状态 - 显示音量图标
                mutedIcon.style.display = 'none';
                volumeIcon.style.display = 'block';
                newButton.setAttribute('aria-pressed', 'false');
              }
            });



            console.log('Player initialized successfully', muteButton);
          }).catch(err => {
            console.error('Failed to initialize player:', err);
          });
        }
      }
    });
  }, 0);
};

// 标签页切换处理函数
const handleTabChange = (key) => {
  activeTabKey.value = key;
  // 初始化新切换到的标签页的播放器实例
  initPlayerInstances(key);
};

// 组件挂载时初始化当前激活标签页的播放器实例
onMounted(() => {
  initPlayerInstances(activeTabKey.value);
});

// 组件卸载时销毁所有播放器实例
onUnmounted(() => {
  Object.keys(playerInstances.value).forEach(tabKey => {
    playerInstances.value[tabKey].forEach(instance => {
      if (instance) {
        instance.destroy();
      }
    });
  });
  playerInstances.value = {
    tab1: [],
    tab2: [],
    tab3: []
  };
});
</script>

<style scoped>
.plyr-demo-container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 24px;
}

h2 {
  text-align: center;
  margin-bottom: 24px;
  color: #333;
}

.video-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 20px;
  width: 100%;
  margin-top: 20px;
}

/* 标签页样式调整 */
:deep(.ant-tabs) {
  width: 100%;
}

:deep(.ant-tabs-tab) {
  font-size: 16px;
  padding: 12px 24px;
}

:deep(.ant-tabs-content) {
  padding-top: 16px;
}

.video-item {
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
}

/* 确保 Plyr 控件样式正确 */
:deep(.plyr) {
  border-radius: 8px;
  height: 100%;
}

/* 响应式调整 */
@media (max-width: 992px) {
  .video-grid {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (max-width: 768px) {
  .video-grid {
    grid-template-columns: 1fr;
  }
}
</style>