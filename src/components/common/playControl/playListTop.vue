<template>
  <div class="playListTop">
    <div class="playListLength">
      当前播放<span>({{ playListLength }})</span>
    </div>
    <div class="topIcon">
      <div class="playMode">
        <div v-show="palyMode === 'loop'" @click="setPlayMode('loop')">
          <svg class="icon" aria-hidden="true">
            <use xlink:href="#icon-xunhuan"></use>
          </svg>
          <span>循环播放</span>
        </div>
        <div v-show="palyMode === 'random'" @click="setPlayMode('random')">
          <svg class="icon" aria-hidden="true">
            <use xlink:href="#icon-suijibofang"></use>
          </svg>
          <span>随机播放</span>
        </div>
      </div>
      <svg class="icon" aria-hidden="true" @click="emptyPlayList">
        <use xlink:href="#icon-shanchu"></use>
      </svg>
    </div>
  </div>
</template>

<script>
export default {
  name: "playListTop",
  props: {
    palyMode: {
      type: String,
      reqired: true,
    },
    playListLength: {
      type: Number,
      reqired: true,
    },
  },
  emits: ["setPlayMode", "emptyPlayList"],
  setup(props, { emit }) {
    const methods = {
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
      emptyPlayList() {
        emit("emptyPlayList");
      },
    };
    return {
      ...methods,
    };
  },
};
</script>

<style lang="less" scoped>
.playListTop {
  height: 1.5rem;
  width: 100%;
  padding: 0.3rem 0.3rem 0.2rem;
  .playListLength {
    font-size: 0.36rem;
    font-weight: 900;
    span {
      margin-left: 0.1rem;
      font-weight: 400;
      font-size: 0.24rem;
      color: #909399;
    }
  }
  .topIcon {
    height: 0.6rem;
    display: flex;
    justify-content: space-between;
    align-items: center;
    .icon {
      width: 0.5rem;
      height: 0.5rem;
      color: #909399;
    }
    .playMode {
      div {
        display: flex;
        justify-content: space-between;
        align-items: center;
        span {
          margin-left: 0.1rem;
          font-size: 0.3rem;
        }
      }
    }
  }
}
</style>
