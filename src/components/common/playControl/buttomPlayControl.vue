<template>
  <div class="buttomPlayControl">
    <div class="left">
      <Swipe
        class="my-swipe"
        :show-indicators="false"
        :initial-swipe="currentPlayIndex"
        @change="switchSong"
      >
        <Swipe-item v-for="item in playList" :key="item.id">
          <img :src="item.al.picUrl" alt="" />
          <div class="content" @click="showPlayPage">
            <div class="name">{{ item.name }}</div>
            <div class="tips">横划切换上下首哦</div>
          </div>
        </Swipe-item>
      </Swipe>
    </div>
    <div class="right">
      <svg
        class="icon"
        aria-hidden="true"
        v-if="!$store.state.isPlay"
        @click="play"
      >
        <use xlink:href="#icon-bofang"></use>
      </svg>
      <svg class="icon" aria-hidden="true" v-else @click="pause">
        <use xlink:href="#icon-zanting"></use>
      </svg>
      <svg class="icon" aria-hidden="true" @click="showPlayList">
        <use xlink:href="#icon-bofangliebiao"></use>
      </svg>
    </div>
  </div>
</template>

<script>
import Swipe from "vant/es/swipe";
import "vant/es/swipe/style";
import SwipeItem from "vant/es/swipe-item";
import "vant/es/swipe-item/style";

export default {
  name: "buttomPlayControl",
  components: {
    Swipe,
    SwipeItem,
  },
  props: {
    playList: {
      type: Object,
      reqired: true,
    },
    currentPlayIndex: {
      type: Number,
      reqired: true,
    },
  },
  emits: ["play", "pause", "showPlayPage", "showPlayList", "switchSong"],
  setup(props, { emit }) {
    const methods = {
      play() {
        emit("play");
      },
      pause() {
        emit("pause");
      },
      showPlayPage() {
        emit("showPlayPage");
      },
      showPlayList() {
        emit("showPlayList");
      },
      switchSong(index) {
        emit("switchSong", index);
      },
    };

    return {
      ...methods,
    };
  },
};
</script>

<style lang="less" scoped>
.buttomPlayControl {
  border-top: 0.02rem solid #e4e7ed;
  box-shadow: 0px -0.04rem 0.2rem rgba(100, 100, 100, 0.2);
  position: fixed;
  left: 0;
  bottom: 0;
  height: 1rem;
  width: 100%;
  background-color: #fff;
  padding: 0.2rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  .left {
    flex: 1;
    display: flex;
    justify-content: left;
    align-items: center;
    overflow: hidden;
    .van-swipe-item {
      display: flex;
    }
    img {
      width: 0.7rem;
      height: 0.7rem;
      border-radius: 50%;
      margin-right: 0.2rem;
    }
    .content {
      flex: 1;
      overflow: hidden;
      .name {
        color: #303133;
        font-size: 0.28rem;
        // 显示一行文本
        white-space: nowrap;
        text-overflow: ellipsis;
        overflow: hidden;
        word-break: break-all;
      }
      .tips {
        color: #909399;
        font-size: 0.24rem;
        // 显示一行文本
        white-space: nowrap;
        text-overflow: ellipsis;
        overflow: hidden;
        word-break: break-all;
      }
    }
  }
  .right {
    margin-left: 0.2rem;
    min-width: 1.6rem;
    display: flex;
    justify-content: space-between;
    align-items: center;
    .icon {
      width: 0.7rem;
      height: 0.7rem;
    }
  }
}
</style>
