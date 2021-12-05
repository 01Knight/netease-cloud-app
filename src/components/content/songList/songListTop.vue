<template>
  <div class="songListTop" @scroll="onScrollTop(e)">
    <div class="topBgImg" :style="{ opacity: opacity }">
      <img :src="songListInfo.coverImgUrl" />
    </div>
    <div class="left">
      <span class="back" @click="$router.go(-1)">
        <svg class="icon" aria-hidden="true">
          <use xlink:href="#icon-fanhui"></use>
        </svg>
      </span>
      <span class="text">歌单</span>
    </div>
    <div class="right">
      <router-link class="search" :to="{ path: '/searchSong' }">
        <svg class="icon" aria-hidden="true">
          <use xlink:href="#icon-sousuo"></use>
        </svg>
      </router-link>
      <span class="more">
        <svg class="icon" aria-hidden="true">
          <use xlink:href="#icon-gengduo"></use>
        </svg>
      </span>
    </div>
  </div>
</template>

<script>
export default {
  name: "songListTop",
  props: {
    songListInfo: {
      type: Object,
      reqired: true,
    },
    opacity: {
      type: Number,
      default: 0,
    },
  },
  methods: {
    onScrollTop(e) {
      console.log(e);
      let scrollTop = document.querySelector(".songListInfo").scrollTop;
      // 因为当滚动条滚动较快时监听的scrollTop取值不稳定所以取0-0.15的值因为去除了内边距10所以可能为负
      if (
        ((scrollTop - 10) / 262) % 1 <= 0.15 &&
        ((scrollTop - 10) / 262) % 1 >= 0
      ) {
        if (this.activeSidebarItem != Math.floor((scrollTop - 10) / 262)) {
          this.activeSidebarItem = Math.floor((scrollTop - 10) / 262);
        }
      }
    },
  },
  setup() {},
};
</script>

<style lang="less" scoped>
.songListTop {
  position: fixed;
  top: 0;
  left: 0;
  z-index: 1;
  width: 7.5rem;
  height: 1.2rem;
  padding: 0.2rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 0.36rem;
  font-weight: 500;
  color: #fff;
  overflow: hidden;
  .topBgImg {
    z-index: -1;
    position: absolute;
    left: 0;
    top: 0;
    width: 7.5rem;
    height: 100%;
    background-color: #ccc;
    opacity: 0;
    img {
      transform: scale(1.2);
      width: 7.5rem;
      height: 100%;
      filter: blur(40px);
    }
  }
  .icon {
    width: 0.6rem;
    height: 0.6rem;
    color: #fff;
  }
  .left,
  .right {
    display: flex;
    align-items: center;
    .back {
      margin-right: 0.2rem;
    }
    .text {
      line-height: 30px;
    }
    .search {
      margin-right: 0.2rem;
    }
  }
  .right {
    .icon {
      width: 0.55rem;
      height: 0.55rem;
    }
  }
}
</style>
