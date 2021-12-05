<template>
  <div class="playControl" v-if="playList[currentPlayIndex]">
    <buttomPlayControl
      :playList="playList"
      :currentPlayIndex="currentPlayIndex"
      @play="play"
      @pause="pause"
      @showPlayPage="onShowPlayPage"
      @showPlayList="onShowPlayList"
      @switchSong="switchSong"
      v-show="showControl"
    />
    <loading :show="showLoading" v-if="showLoading" />
    <playPage
      v-show="showPlayPage"
      v-else
      :palyMode="palyMode"
      :playList="playList"
      :currentPlayIndex="currentPlayIndex"
      :currentSongTime="currentSongTime"
      :totalSongTime="totalSongTime"
      :progress="progress"
      :songLyric="songLyric"
      @play="play"
      @pause="pause"
      @prevSong="prevSong"
      @nextSong="nextSong"
      @switchSong="switchSong"
      @showControl="onShowControl"
      @showPlayList="onShowPlayList"
      @setProgress="setProgress"
      @setPlayMode="setPlayMode"
    />
    <popup
      v-model:show="showPlayList"
      position="bottom"
      round
      lazy-render
      style="height: 70vh;"
    >
      <div class="con">
        <play-list-top
          :palyMode="palyMode"
          :playListLength="playList.length"
          @setPlayMode="setPlayMode"
          @emptyPlayList="emptyPlayList"
        />
        <div class="playContent">
          <play-list-item
            v-for="(item, index) in playList"
            :key="item.id"
            :songDefault="item"
            :currentIndex="index"
            :playIndex="currentPlayIndex"
            @switchSong="switchSong"
            @deleteSong="deleteSong"
          />
        </div>
      </div>
    </popup>
  </div>
</template>

<script>
import popup from "vant/es/popup";
import "vant/es/popup/style";

import buttomPlayControl from "./buttomPlayControl";
import playPage from "./playPage";
import playListTop from "./playListTop";
import playListItem from "./playListItem";

import loading from "@/components/common/loading";

import { mapState } from "vuex";
import store from "@/store/index.js";
import { reactive, toRefs } from "vue";

import {
  setAudioSrc,
  playMusic,
  pauseMusic,
  setStoreSongLyric,
  switchSong,
  deleteSong,
} from "@/util/audio";
import { getSongLyric } from "@/API/index";

export default {
  name: "playControl",
  components: {
    buttomPlayControl,
    playPage,
    playListItem,
    playListTop,
    loading,
    popup,
  },
  computed: {
    ...mapState([
      "palyMode",
      "playList",
      "currentPlayIndex",
      "currentSongTime",
      "totalSongTime",
      "progress",
      "songLyric",
    ]),
    // ...mapState({
    //   playList: (state) => state.playList,
    //   currentPlayIndex: (state) => state.currentPlayIndex,
    //   songLyric: (state) => state.songLyric,
    // }),
  },
  setup() {
    const state = reactive({
      showControl: true,
      showPlayPage: false,
      showPlayList: false,
      showLoading: false,
    });
    const methods = {
      play() {
        playMusic();
      },
      pause() {
        pauseMusic();
      },
      prevSong(index, isUpdateSongLyric = false) {
        if (index < 0) {
          switchSong(store.state.playList.length - 1, isUpdateSongLyric);
        } else {
          switchSong(index, isUpdateSongLyric);
        }
      },
      nextSong(index, isUpdateSongLyric = false) {
        if (index > store.state.playList.length - 1) {
          switchSong(0, isUpdateSongLyric);
        } else {
          switchSong(index, isUpdateSongLyric);
        }
      },
      switchSong(index, isUpdateSongLyric = false) {
        switchSong(index, isUpdateSongLyric);
      },
      deleteSong(index) {
        deleteSong(index);
      },
      onShowControl() {
        state.showControl = true;
        state.showPlayPage = false;
      },
      onShowPlayPage() {
        state.showLoading = true;
        // 获取歌词
        getSongLyric(
          store.state.playList[store.state.currentPlayIndex].id
        ).then((res) => {
          if (!window.audio.src) {
            setAudioSrc(store.state.playList[store.state.currentPlayIndex].id);
          }
          setStoreSongLyric(res);
          state.showLoading = false;
          state.showControl = false;
          state.showPlayPage = true;
        });
      },
      onShowPlayList() {
        state.showPlayList = true;
      },
      setProgress(progress) {
        window.audio.currentTime = Math.round(
          (progress / 100) * store.state.totalSongTime
        );
        if (window.audio.paused) methods.play();
      },
      setPlayMode(mode) {
        store.commit("setPlayMode", mode);
      },
      emptyPlayList() {
        store.commit("setPlayList", []);
        store.commit("setSongList", []);
      },
    };

    return {
      ...toRefs(state),
      ...methods,
    };
  },
};
</script>

<style lang="less" scoped>
.playContent {
  height: 100%;
  overflow-y: scroll;
}
.con {
  height: 100%;
  width: 100%;
  position: relative;
  padding-top: 1.5rem;
  .playListTop {
    position: absolute;
    top: 0;
    left: 0;
  }
}
</style>
