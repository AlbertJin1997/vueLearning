<template>
  <el-dialog :model-value="visible" @update:model-value="handleModalClose">
    <el-tabs v-model="activeTabKey" type="card" @tab-click="handleTabChange">
      <el-tab-pane v-for="tab in props.tabConfig" :name="tab.key" :key="tab.key" :label="tab.title">
        <div class="video-grid">
          <div v-for="(video, index) in props.videoLists[tab.key]" :key="index" class="video-item">
            <video :ref="el => setVideoRef(tab.key, index, el)" class="plyr__video-player" controls preload="none"
              :data-poster="'../../public/test1.png'">
              <source :src="video.src" :type="video.type" />
            </video>
          </div>
        </div>
      </el-tab-pane>
    </el-tabs>
    <template #footer>
      <div class="video-dialog-footer">
        <el-checkbox v-model="dontShowAgain" label="下次不再展示" style="margin-left: 10px;" />
      </div>
    </template>
  </el-dialog>
</template>

<script setup>
import { ref, onMounted, onUnmounted, watch, h, defineProps, defineEmits } from 'vue';
import 'plyr/dist/plyr.css';
import { ElDialog, ElTabs, ElTabPane } from 'element-plus';
import { VideoPlayer } from '../utils/VideoPlayer';
import './video-player.css'
// 定义props，允许外部控制弹窗显示
const props = defineProps({
  // 控制弹窗显示/隐藏的prop
  visible: {
    type: Boolean,
    default: false
  },
  // 可选：传入默认选中的标签页
  defaultTab: {
    type: String,
    default: ''
  },
  // 可选：自定义标签页配置
  tabConfig: {
    type: Array,
    default: () => [
      { key: 'tab1', title: '视频列表1' },
      { key: 'tab2', title: '视频列表2' },
      { key: 'tab3', title: '视频列表3' }
    ]
  },
  // 可选：自定义视频数据源
  videoLists: {
    type: Object,
    default: () => ({
      tab1: Array.from({ length: 19 }, () => ({
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
    })
  }
});

// 定义emits，用于向外部通知事件
const emit = defineEmits(['update:visible', 'close', 'tab-change']);

// 激活的标签页键
const activeTabKey = ref(props.defaultTab || props.tabConfig[0].key);
const dontShowAgain = ref(false)

// 视频数据源 - 三个标签页
const videoLists = {
  tab1: Array.from({ length: 19 }, (_, i) => ({
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

// 当前正在播放的视频播放器引用
let currentPlayingPlayer = null;

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
              'seektime'
            ],
            tooltips: { seek: true },
            previewThumbnails: { enabled: true, src: '/public/thumbnails.vtt' },
            markers: { enabled: true, points: [{ time: 20, label: 'aaaa' }] },
            style: {
              '--plyr-color-main': 'grey'
            }
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
            volumeSlideBar.style.background = 'grey';
            volumeSlideBar.style.borderRadius = '2px'
            volumeSlideBar.style.padding = '6px 6px';
            volumeSlideBar.style.marginLeft = '0px'

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

            // 添加播放事件监听，实现全局只能播放一个视频
            player.on('play', () => {
              // 如果当前有正在播放的视频且不是当前视频，则暂停它
              if (currentPlayingPlayer && currentPlayingPlayer !== player) {
                currentPlayingPlayer.pause();
              }
              // 更新当前播放的视频引用
              currentPlayingPlayer = player;
            });

            // 添加暂停事件监听，清除当前播放引用
            player.on('pause', () => {
              if (currentPlayingPlayer === player) {
                currentPlayingPlayer = null;
              }
            });

            // 添加结束事件监听，清除当前播放引用
            player.on('ended', () => {
              if (currentPlayingPlayer === player) {
                currentPlayingPlayer = null;
              }
            });

            console.log('Player initialized successfully');
          }).catch(err => {
            console.error('Failed to initialize player:', err);
          });
        }
      }
    });
  }, 0);
};

// 标签页切换处理函数
const handleTabChange = (tab) => {
  // Extract the key string from the tab object
  const tabKey = props.tabConfig[tab.index].key
  activeTabKey.value = tabKey;
  // 初始化新切换到的标签页的播放器实例
  initPlayerInstances(tabKey);
  // 向外部通知标签页切换事件
  emit('tab-change', tabKey);
};

// 组件挂载时初始化当前激活标签页的播放器实例
onMounted(() => {
  // 可以在这里添加一些初始化逻辑
});

// 处理弹窗关闭事件
const handleModalClose = (value) => {
  emit('update:visible', value);
  emit('close', value);
};

// 监听visible prop变化
watch(() => props.visible, (newVal) => {
  if (newVal) {
    // 确保activeTabKey有值
    if (!activeTabKey.value) {
      activeTabKey.value = props.defaultTab || props.tabConfig[0].key;
    }
    // 等待DOM渲染完成后再初始化播放器
    setTimeout(() => {
      initPlayerInstances(activeTabKey.value);
    }, 100);
  }
});

// 监听tabConfig和defaultTab变化，更新activeTabKey
watch(() => [props.tabConfig, props.defaultTab], () => {
  if (props.defaultTab) {
    activeTabKey.value = props.defaultTab;
  }
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
  background-color: #f9f9f9;
}

/* 为tab内容区域添加滚动功能 */
:deep(.el-tabs__content) {
  flex: 1;
  max-height: 500px !important;
  height: 500px !important;
  overflow-y: auto;
  padding-top: 16px;
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
:deep(.el-tabs) {
  width: 100%;
}

:deep(.el-tabs__item) {
  font-size: 16px;
  padding: 12px 24px;
}

/* 使用更具体的选择器路径并直接设置背景色和固定高度 */
:deep(.el-dialog__wrapper .el-dialog) {
  --el-dialog-bg-color: red !important;
  --el-bg-color: red !important;
  background-color: red !important;
  min-height: 700px;
}

/* 固定对话框内容区域的高度 */
:deep(.el-dialog__body) {
  height: 600px;
  overflow: hidden;
  padding: 20px;
}

/* 固定标签页容器的高度 */
:deep(.el-tabs) {
  height: 100%;
  display: flex;
  flex-direction: column;
}


.video-item {
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  aspect-ratio: 16 / 9;
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

.video-dialog-footer {
  text-align: left;
}
</style>