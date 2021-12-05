<template>
  <div v-show="!isLoading">
    <router-view />
    <playControl />
  </div>
  <loading :show="isLoading" />
</template>

<script>
import playControl from "@/components/common/playControl/index.vue";
import loading from "@/components/common/loading.vue";

import { randomNumBoth, switchSong } from "./util/audio";

import { useStore } from "vuex";
import { reactive, toRefs } from "vue";

export default {
  name: "App",
  components: {
    playControl,
    loading,
  },
  setup() {
    const audio = window.audio;
    const store = useStore();
    const state = reactive({
      isLoading: false,
    });
    // 开始播放时触发
    audio.addEventListener("play", function() {
      store.commit("setIsPlay", true);
    });
    // 暂停时会触发，当播放完一首歌曲时也会触发
    audio.addEventListener("pause", function() {
      store.commit("setIsPlay", false);
    });
    // 当浏览器开始寻找指定的音频/视频时，会发生 loadstart 事件。即当加载过程开始时
    audio.addEventListener("loadstart", function() {
      state.isLoading = true;
    });
    // 当指定的音频/视频的元数据已加载时，会发生 loadedmetadata 事件。
    audio.addEventListener("loadedmetadata", function(e) {
      store.commit("setTotalSongTime", e.target.duration);
      state.isLoading = false;
    });
    // 播放时间改变 这个会一直打印
    audio.addEventListener("timeupdate", function(e) {
      store.commit("setCurrentSongTime", e.target.currentTime);
      store.commit(
        "setProgress",
        Number(((e.target.currentTime / e.target.duration) * 100).toFixed(2))
      );
    });
    //当播放完一首歌曲时也会触发
    audio.addEventListener("ended", function() {
      switch (store.state.palyMode) {
        case "loop":
          switchSong(store.state.currentPlayIndex + 1, true);
          break;
        case "random":
          switchSong(randomNumBoth(0, store.state.playList.length), true);
          break;
        default:
          switchSong(store.state.currentPlayIndex + 1, true);
      }
    });

    if (
      JSON.parse(localStorage.getItem("historySearch")) == null ||
      !Array.isArray(JSON.parse(localStorage.getItem("historySearch")))
    ) {
      localStorage.setItem("historySearch", "[]");
    }

    return {
      ...toRefs(state),
    };
  },
};
</script>

<style lang="less">
* {
  padding: 0;
  margin: 0;
  box-sizing: border-box;
  font-family: "PingFang SC";
}
a {
  text-decoration: none; /* 去除默认的下划线 */
  outline: none; /* 去除旧版浏览器的点击后的外虚线框 */
  color: #000; /* 去除默认的颜色和点击后变化的颜色 */
}
.icon {
  width: 1em;
  height: 1em;
  vertical-align: -0.15em;
  fill: currentColor;
  overflow: hidden;
}
</style>
