<template>
  <div class="xgplayer-demo">
    <h2>西瓜视频播放器演示</h2>
    <div ref="playerContainer" class="player-container"></div>
    <div class="player-controls">
      <button @click="play">播放</button>
      <button @click="pause">暂停</button>
      <button @click="toggleMute">{{ player && player.muted ? '取消静音' : '静音' }}</button>
      <button @click="toggleFullscreen">全屏</button>

      <div class="control-group">
        <label>音量:</label>
        <input type="range" min="0" max="1" step="0.01" :value="volume" @input="setVolume($event.target.value)" />
      </div>

      <div class="control-group">
        <label>播放速度:</label>
        <select @change="setPlaybackRate($event.target.value)">
          <option value="0.5">0.5x</option>
          <option value="0.75">0.75x</option>
          <option value="1" selected>1x</option>
          <option value="1.25">1.25x</option>
          <option value="1.5">1.5x</option>
          <option value="2">2x</option>
        </select>
      </div>
    </div>

    <div class="player-info">
      <p>当前时间: {{ currentTime.toFixed(2) }}s</p>
      <p>总时长: {{ duration.toFixed(2) }}s</p>
      <p>播放状态: {{ isPlaying ? '播放中' : '已暂停' }}</p>
    </div>
  </div>
</template>

<script>
import { ref, onMounted, onUnmounted } from 'vue';
import Player from 'xgplayer';
import 'xgplayer/dist/index.min.css';

export default {
  name: 'XgplayerDemo',
  setup() {
    const playerContainer = ref(null);
    let player = null;
    const volume = ref(1);
    const currentTime = ref(0);
    const duration = ref(0);
    const isPlaying = ref(false);

    const initPlayer = () => {
      // 销毁已存在的播放器实例
      if (player) {
        player.destroy();
      }

      // 确保DOM元素存在
      if (!playerContainer.value) {
        console.error('Player container element not found');
        return;
      }

      // 初始化播放器
      player = new Player({
        el: playerContainer.value,
        url: 'http://s2.pstatp.com/cdn/expire-1-M/byted-player-videos/1.0.0/xgplayer-demo.mp4',
        poster: '/src/assets/aaa.png',
        fluid: true,
        width: '100%',
        height: '100%',
        playbackRate: [0.5, 0.75, 1, 1.25, 1.5, 2],
        videoInit: true,
        autoplay: false,
        playsinline: true,
        // 确保控件可见
        controls: {
          mode: 'flex',
          initShow: true
        },
        progressDot: [
          {
            time: 10, //展示标记的时间
            text: '标记文字', //鼠标hover在标记时展示的文字
            duration: 1, //标记段长度（以时长计算）
          }, {
            time: 22,
            text: '标记文字'
          }, {
            time: 56,
            duration: 1,
            text: '标记文字'

          }, {
            time: 76,
            text: '标记文字'
          }
        ],
        // 启用所有控件
        volume: true,
        loop: true,
        fullscreen: true,
        play: true,
        pause: true,
        seek: true,
        time: true,
        progress: true,
        ignores: ['cssFullscreen', 'playbackrate'],
        thumbnail: {
          src: '../../public/thumbnails.vtt', // 步骤2创建的VTT文件URL
          width: 160,  // 缩略图宽度（可选，默认自适应）
          height: 90
        },
      });

      // 监听音量变化
      player.on('volumechange', () => {
        volume.value = player.volume;
      });

      // 监听时间更新
      player.on('timeupdate', () => {
        currentTime.value = player.currentTime;
      });

      // 监听播放状态变化
      player.on('play', () => {
        isPlaying.value = true;
      });

      player.on('pause', () => {
        isPlaying.value = false;
      });

      // 监听视频加载完成
      player.on('loadeddata', () => {
        duration.value = player.duration;
      });
    };

    onMounted(() => {
      initPlayer();

      // 监听窗口大小变化，重新初始化播放器
      window.addEventListener('resize', initPlayer);
    });

    onUnmounted(() => {
      // 销毁播放器
      if (player) {
        player.destroy();
      }

      // 移除事件监听器
      window.removeEventListener('resize', initPlayer);
    });

    // 播放
    const play = () => {
      if (player) {
        player.play();
      }
    };

    // 暂停
    const pause = () => {
      if (player) {
        player.pause();
      }
    };

    // 静音/取消静音
    const toggleMute = () => {
      if (player) {
        player.muted = !player.muted;
      }
    };

    // 全屏/退出全屏
    const toggleFullscreen = () => {
      if (player) {
        if (player.fullscreen.isFullScreen) {
          player.fullscreen.exit();
        } else {
          player.fullscreen.request();
        }
      }
    };

    // 设置音量
    const setVolume = (value) => {
      if (player) {
        player.volume = parseFloat(value);
      }
    };

    // 设置播放速度
    const setPlaybackRate = (value) => {
      if (player) {
        player.playbackRate = parseFloat(value);
      }
    };

    return {
      playerContainer,
      volume,
      currentTime,
      duration,
      isPlaying,
      play,
      pause,
      toggleMute,
      toggleFullscreen,
      setVolume,
      setPlaybackRate
    };
  }
};
</script>

<style scoped>
.player-container {
  width: 100%;
  height: 400px;
  background: #000;
  margin-bottom: 20px;
  position: relative;
}

.player-controls {
  display: flex;
  align-items: center;
  gap: 10px;
  flex-wrap: wrap;
  margin-bottom: 20px;
}

.player-controls button {
  padding: 8px 16px;
  background-color: #42b883;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.3s;
}

.player-controls button:hover {
  background-color: #3aa876;
}

.control-group {
  display: flex;
  align-items: center;
  gap: 10px;
}

.player-info {
  display: flex;
  gap: 20px;
  flex-wrap: wrap;
}

.player-info p {
  margin: 0;
  padding: 0;
}

/* Ensure the player fits properly in its container */
:deep(.xgplayer) {
  width: 100% !important;
  height: 100% !important;
}

:deep(.xgplayer-video) {
  width: 100% !important;
  height: 100% !important;
}
</style>