<template>
  <div class="dplayer-view">
    <h1>DPlayer 播放器演示</h1>
    <DPlayerDemo />
  </div>
</template>

<script>
import { defineComponent } from 'vue';
import DPlayerDemo from '../components/DPlayerDemo.vue';

export default defineComponent({
  components: {
    DPlayerDemo
  }
});
</script>

<style scoped>
.dplayer-view {
  max-width: 800px;
  margin: 0 auto;
  padding: 2rem;
}

h1 {
  text-align: center;
  margin-bottom: 2rem;
  color: #333;
}
</style>