<template>
  <div class="playMusic">
    <div class="bg">
      <div class="overlay"></div>
      <img :src="playList[currentPlayIndex].al.picUrl" alt="" />
    </div>
    <div class="top">
      <svg class="icon" aria-hidden="true" @click="showControl">
        <use xlink:href="#icon-fanhui"></use>
      </svg>
      <div class="content">
        <div class="title">
          <span>{{ playList[currentPlayIndex].name }}</span>
        </div>
        <div class="name">
          <span
            v-for="(text, index) in playList[currentPlayIndex].ar"
            :key="text.id"
          >
            <span v-if="playList[currentPlayIndex].ar.length !== index + 1">
              {{ text.name }}/
            </span>
            <span v-if="playList[currentPlayIndex].ar.length === index + 1">
              {{ text.name + " - " }}{{ playList[currentPlayIndex].al.name }}
            </span>
          </span>
        </div>
      </div>
      <svg class="icon" aria-hidden="true" @click="showShareSheet">
        <use xlink:href="#icon-fenxiang"></use>
      </svg>
    </div>
    <!-- 磁条图片和功能icon -->
    <div
      class="discAndFunctionIcon"
      v-show="showDiscAndFunctionIcon"
      @click="hideDiscAndFunctionIcon"
    >
      <img class="disc" src="@/assets/disc.png" />
      <img class="picUrl" :src="playList[currentPlayIndex].al.picUrl" />
      <!-- 功能图标 -->
      <div class="functionIcon">
        <svg class="icon" aria-hidden="true">
          <use xlink:href="#icon-xihuan"></use>
        </svg>
        <!-- <svg class="icon" aria-hidden="true">
        <use xlink:href="#icon-icon-"></use>
      </svg> -->
        <svg class="icon" aria-hidden="true">
          <use xlink:href="#icon-iconset0425"></use>
        </svg>
        <svg class="icon" aria-hidden="true">
          <use xlink:href="#icon-changpian"></use>
        </svg>
        <svg class="icon" aria-hidden="true">
          <use xlink:href="#icon-xiaoxiduihuaxinxi"></use>
        </svg>
        <svg class="icon" aria-hidden="true">
          <use xlink:href="#icon-gengduo1"></use>
        </svg>
      </div>
    </div>
    <!-- 歌词 -->
    <div class="songLyric" v-show="showSongLyric" @click="hideshowSongLyric">
      <div v-for="(item, index) in songLyric" :key="index">
        <!-- 没有歌词时 -->
        <p class="active" v-if="item.lyric === '该歌曲暂时没有歌词'">
          {{ item.lyric }}
        </p>
        <p v-else-if="songLyric.length != index + 1">
          <span
            :class="{
              active:
                currentSongTime > getSeconds(item.time) &&
                currentSongTime < getSeconds(songLyric[index + 1].time) &&
                currentSongTime != -1,
            }"
            >{{ item.lyric }}
          </span>
        </p>
        <!-- 最后一句 -->
        <p v-else>
          <span
            :class="{
              active:
                currentSongTime >= getSeconds(item.time) &&
                currentSongTime < totalSongTime,
            }"
            >{{ item.lyric }}
          </span>
        </p>
      </div>
    </div>
    <!-- 进度条 -->
    <div class="progressReat">
      <span class="currentTime">{{ format(currentSongTime) || "00:00" }}</span>
      <slider
        v-model="$store.state.progress"
        active-color="#DCDFE6"
        inactive-color="#999999"
        button-size="0.2rem"
        bar-height="0.02rem"
        @change="change"
      />
      <span class="endTime">{{ format(totalSongTime) }}</span>
    </div>
    <!-- 控制器 -->
    <div class="playController">
      <svg
        class="icon"
        aria-hidden="true"
        @click="setPlayMode('loop')"
        v-show="palyMode === 'loop'"
      >
        <use xlink:href="#icon-xunhuan"></use>
      </svg>
      <svg
        class="icon"
        aria-hidden="true"
        @click="setPlayMode('random')"
        v-show="palyMode === 'random'"
      >
        <use xlink:href="#icon-suijibofang"></use>
      </svg>
      <svg class="icon" aria-hidden="true" @click="prevSong">
        <use xlink:href="#icon-shangyishoushangyige"></use>
      </svg>
      <svg
        class="icon play"
        aria-hidden="true"
        v-if="!$store.state.isPlay"
        @click="play"
      >
        <use xlink:href="#icon-bofang"></use>
      </svg>
      <svg class="icon play" aria-hidden="true" v-else @click="pause">
        <use xlink:href="#icon-zanting"></use>
      </svg>
      <svg class="icon" aria-hidden="true" @click="nextSong">
        <use xlink:href="#icon-xiayigexiayishou"></use>
      </svg>
      <svg class="icon" aria-hidden="true" @click="showPlayList">
        <use xlink:href="#icon-bofangliebiao"></use>
      </svg>
    </div>
    <!-- 分享列表 -->
    <share-sheet
      v-model:show="showShare"
      title="立即分享给好友"
      :options="options"
      @cancel="hideShareSheet"
      @click-overlay="hideShareSheet"
    />
  </div>
</template>

<script>
import slider from "vant/es/slider";
import "vant/es/slider/style";
import shareSheet from "vant/es/share-sheet";
import "vant/es/share-sheet/style";

import { reactive, toRefs } from "vue";

export default {
  name: "playMusic",
  components: {
    slider,
    shareSheet,
  },
  props: {
    palyMode: {
      type: String,
      reqired: true,
    },
    playList: {
      type: Object,
      reqired: true,
    },
    currentPlayIndex: {
      type: Number,
      reqired: true,
    },
    currentSongTime: {
      type: Number,
      reqired: true,
    },
    totalSongTime: {
      type: Number,
      reqired: true,
    },
    progress: {
      type: Number,
      reqired: true,
    },
    songLyric: {
      type: Object,
      reqired: true,
    },
  },
  emits: [
    "play",
    "pause",
    "showControl",
    "showPlayList",
    "prevSong",
    "nextSong",
    "switchSong",
    "setProgress",
    "setPlayMode",
  ],
  setup(props, { emit }) {
    const state = reactive({
      showDiscAndFunctionIcon: true,
      showSongLyric: false,
      showShare: false,
      options: [
        [
          { name: "微信", icon: "wechat" },
          { name: "朋友圈", icon: "wechat-moments" },
          { name: "微博", icon: "weibo" },
          { name: "QQ", icon: "qq" },
          { name: "复制链接", icon: "link" },
          { name: "分享海报", icon: "poster" },
          { name: "二维码", icon: "qrcode" },
          { name: "小程序码", icon: "weapp-qrcode" },
        ],
      ],
    });
    const methods = {
      showShareSheet() {
        state.showShare = true;
      },
      showPlayList() {
        emit("showPlayList");
      },
      hideShareSheet() {
        state.showShare = false;
      },
      showControl() {
        emit("showControl");
      },
      hideDiscAndFunctionIcon() {
        state.showDiscAndFunctionIcon = false;
        state.showSongLyric = true;
      },
      hideshowSongLyric() {
        state.showDiscAndFunctionIcon = true;
        state.showSongLyric = false;
      },
      play() {
        emit("play");
      },
      pause() {
        emit("pause");
      },
      prevSong() {
        emit("prevSong", props.currentPlayIndex - 1, true);
      },
      nextSong() {
        emit("nextSong", props.currentPlayIndex + 1, true);
      },
      switchSong(index) {
        emit("switchSong", index, true);
      },
      change(progress) {
        emit("setProgress", progress);
      },
      setPlayMode(mode) {
        switch (mode) {
          case "loop":
            emit("setPlayMode", "random");
            break;
          case "random":
            emit("setPlayMode", "loop");
            break;
        }
      },
    };
    // 将时间戳转换为时间
    function format(value) {
      if (!value) return "";
      let interval = Math.floor(value);
      let minute = Math.floor(interval / 60)
        .toString()
        .padStart(2, "0");
      let second = (interval % 60).toString().padStart(2, "0");
      return `${minute}:${second}`;
    }
    // 将格式为01:12的时间转换为秒数
    function getSeconds(time) {
      if (time == "") return;
      let splitTime = time.split(":");
      let [, millisecond] = splitTime[1].split(".");
      if (isNaN(parseInt(splitTime[0] * 60) + parseInt(splitTime[1]))) {
        return 0;
      } else {
        return (
          parseInt(splitTime[0] * 60) +
          parseInt(splitTime[1]) +
          "." +
          millisecond
        );
      }
    }

    return {
      ...toRefs(state),
      ...methods,
      getSeconds,
      format,
    };
  },
};
</script>

<style lang="less" scoped>
.playMusic {
  z-index: 10;
  position: fixed;
  left: 0;
  top: 0;
  width: 100vw;
  height: 100vh;
  background-color: #666;
  .icon {
    color: #fff;
    width: 0.6rem;
    height: 0.6rem;
  }
  .bg {
    position: absolute;
    left: 0;
    top: 0;
    width: 100vw;
    height: 100vh;
    z-index: -1;
    .overlay {
      position: absolute;
      left: 0;
      top: 0;
      width: 100%;
      height: 100%;
      background-color: rgba(0, 0, 0, 0.5);
      z-index: 1;
    }
    img {
      width: 100vw;
      height: 100vh;
      filter: blur(40px);
    }
  }
  .top {
    padding: 0.2rem;
    display: flex;
    justify-content: space-between;
    align-items: center;
    font-size: 0.36rem;
    font-weight: 500;
    color: #fff;
    .content {
      margin: 0 0.3rem;
      flex: 1;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      overflow: hidden;
      .title {
        height: 0.48rem;
        white-space: nowrap;
        word-break: break-all;
        text-overflow: ellipsis;
        display: -webkit-box;
        -webkit-box-orient: vertical;
        -webkit-line-clamp: 1;
        color: #fff;
        animation: textTransForm 5s linear infinite;
      }
      .name {
        color: #c0c4cc;
        font-size: 0.28rem;
        word-break: break-all;
        text-overflow: ellipsis;
        display: -webkit-box;
        -webkit-box-orient: vertical;
        -webkit-line-clamp: 1;
        overflow: hidden;
      }
    }
  }
  .discAndFunctionIcon {
    position: relative;
    width: 7.5rem;
    height: 9.6rem;
    .disc {
      width: 5.5rem;
      height: 5.5rem;
      position: relative;
      left: calc(50% - 2.75rem);
      top: calc(50% - 3rem);
    }
    .picUrl {
      width: 3.5rem;
      height: 3.5rem;
      position: absolute;
      left: calc(50% - 1.75rem);
      top: calc(50% - 2rem);
      border-radius: 50%;
    }
    .functionIcon {
      margin-top: 3.2rem;
      padding: 0 0.8rem;
      display: flex;
      justify-content: space-around;
      align-items: center;
      .icon {
        width: 0.6rem;
        height: 0.6rem;
      }
    }
  }
  .songLyric {
    overflow-y: auto;
    color: #ccc;
    padding: 0.4rem 0.2rem;
    height: 9.6rem;
    p {
      color: rgb(182, 181, 181);
      font-size: 0.28rem;
      padding: 0.2rem 1rem;
      text-align: center;
    }
    .active {
      color: #fff;
      font-size: 0.32rem;
      transition: all 0.5s;
    }
  }
  .progressReat {
    padding: 0.2rem;
    color: #ccc;
    font-size: 0.24rem;
    display: flex;
    justify-content: space-between;
    align-items: center;
    span {
      flex: 1;
      margin: 0 0.2rem;
    }
  }
  .playController {
    padding: 0 0.8rem;
    display: flex;
    justify-content: space-around;
    align-items: center;
    .icon {
      width: 0.6rem;
      height: 0.6rem;
    }
    .play {
      width: 1rem;
      height: 1rem;
    }
  }
  @keyframes textTransForm {
    0% {
      transform: translate(100%, 0);
    }
    100% {
      transform: translate(-50%, 0);
    }
  }
}
</style>
