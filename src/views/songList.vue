<template>
  <div class="song-list" ref="songListElem" @scroll="setOpacity">
    <loading :show="isShowLoading" v-if="isShowLoading" />
    <div v-else>
      <songListTop :songListInfo="songListInfo" :opacity="opacity" />
      <songListInfo :songListInfo="songListInfo" />
      <songListContent
        :songListInfo="songListInfo"
        :songList="songList"
        @switchSong="switchSong"
      />
    </div>
  </div>
</template>

<script>
import loading from "@/components/common/loading";

import songListTop from "@/components/content/songList/songListTop";
import songListInfo from "@/components/content/songList/songListInfo";
import songListContent from "@/components/content/songList/songListContent";

import { getSongListDetail, getSongDetail } from "@/API/index";
import { switchSongList, switchSong } from "@/util/audio";

import { reactive, toRefs, ref } from "vue";
import { useStore } from "vuex";
import { useRoute } from "vue-router";

export default {
  name: "songList",
  components: {
    loading,
    songListTop,
    songListInfo,
    songListContent,
  },
  methods: {},
  setup() {
    // 使用ref获取页面元素
    const songListElem = ref(null);
    const route = useRoute();
    const store = useStore();
    let state = reactive({
      // 歌单列表
      songList: [],
      // 播放列表信息
      songListInfo: {},
      // 是否显示loading
      isShowLoading: true,
      // songListTop背景的透明度
      opacity: 0,
    });
    const methods = {
      setOpacity() {
        // 350 290
        if (!songListElem.value) return;
        let scrollTop = songListElem.value.scrollTop;
        if (scrollTop >= 290) scrollTop = 290;
        state.opacity = scrollTop / 290;
      },
      switchSong(index) {
        console.log(state.songList);
        if (
          store.state.songListId !== route.query.id ||
          state.songList.length !== store.state.playList.length
        ) {
          switchSongList(state.songList, route.query.id);
          switchSong(index);
          return;
        }
        if (
          store.state.playList[store.state.currentPlayIndex].id !==
          store.state.playList[index].id
        ) {
          switchSong(index);
          return;
        }
      },
    };

    // 歌单的详情
    getSongListDetail(route.query.id).then((res) => {
      state.songListInfo = res.data.playlist;
      // 歌单所有音乐的id
      const songIds = [];
      state.songListInfo.trackIds.forEach((elem) => {
        songIds.push(elem.id);
      });
      // 歌单的音乐
      getSongDetail(songIds.join(",")).then((res) => {
        state.songList = res.data.songs;
        state.isShowLoading = false;
      });
    });

    return {
      ...toRefs(state),
      ...methods,
      songListElem,
    };
  },
};
</script>

<style lang="less" scoped>
.song-list {
  height: 100vh;
  overflow-y: scroll;
  &::-webkit-scrollbar {
    display: none;
    /*隐藏滚动条*/
  }
}
</style>
