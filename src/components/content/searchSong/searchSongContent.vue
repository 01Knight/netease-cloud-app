<template>
  <div
    :class="{
      searchSongContent: true,
      paddingBottom: $store.state.playList.length,
    }"
  >
    <tabs v-model:active="active" :sticky="true" offset-top="1rem">
      <tab title="单曲">
        <slot name="songList"></slot>
      </tab>
      <tab title="歌单">歌单</tab>
      <tab title="视频">视频</tab>
      <tab title="歌手">歌手</tab>
      <tab title="歌词">歌词</tab>
    </tabs>
  </div>
</template>

<script>
import { ref } from "vue";

import tabs from "vant/es/tabs";
import "vant/es/tabs/style";
import tab from "vant/es/tab";
import "vant/es/tab/style";

export default {
  name: "searchSongContent",
  components: { tabs, tab },
  setup() {
    const active = ref(0);

    return {
      active,
    };
  },
};
</script>

<style lang="less" scoped>
.searchSongContent {
  padding: 0 0.2rem;
  .songItem {
    padding: 0.2rem 0.3rem;
  }
}
.paddingBottom {
  padding-bottom: 1rem;
}
</style>
