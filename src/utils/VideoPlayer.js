export class VideoPlayer {
  constructor(videoElement, options = {}) {
    this.videoElement = videoElement;
    this.options = {
      autoplay: false,
      volume: 1,
      preload: 'auto',
      speed: {
        selected: 1,
        options: [0.5, 1, 1.5, 2]
      },
      fullscreen: {
        enabled: true,
        fallback: true,
        iosNative: true,
      },
      captions: {
        active: true,
        update: false,
        language: 'auto'
      },
      invertTime: false,
      Storage: {
        enabled: true,
        Key: 'jpf'
      },
      i18n: {
        restart: '重播',
        play: '播放',
        pause: '暂停',
        volume: '音量',
        mute: '静音',
        pip: '画中画',
        normal: '默认',
        quality: '画质',
        download: '下载',
        enterFullscreen: '全屏',
        exitFullscreen: '关闭全屏',
        captions: 'Captions',
        settings: '设置',
        speed: '倍速',
        loop: '循环播放',
      },
      tooltips: { seek: true },
      iconUrl: './src/assets/plyr.svg',
      previewThumbnails: {
        enabled: true,
        src: '/thumbnails.vtt'
      },
      ...options
    };
    this.instance = null;
  }

  // 初始化播放器
  async init() {
    if (this.instance) {
      return this.instance;
    }

    try {
      // 动态导入Plyr，避免在不使用时加载
      const { default: Plyr } = await import('plyr');
      this.instance = new Plyr(this.videoElement, this.options);
      return this.instance;
    } catch (error) {
      console.error('Failed to load Plyr:', error);
      return null;
    }
  }

  // 销毁播放器实例
  destroy() {
    if (this.instance) {
      this.instance.destroy();
      this.instance = null;
    }
  }

  // 播放视频
  play() {
    if (this.instance) {
      this.instance.play();
    }
  }

  // 暂停视频
  pause() {
    if (this.instance) {
      this.instance.pause();
    }
  }

  // 设置视频源
  setSource(source) {
    if (this.instance) {
      this.instance.source = source;
    }
  }

  // 获取播放器实例
  getInstance() {
    return this.instance;
  }
}