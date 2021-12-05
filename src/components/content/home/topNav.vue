<template>
  <div class="topNav">
    <div class="left">
      <svg class="icon" aria-hidden="true">
        <use xlink:href="#icon-list"></use>
      </svg>
    </div>
    <div class="center">
      <span>我的</span>
      <span class="active">发现</span>
      <span>云村</span>
      <span>视频</span>
    </div>
    <router-link class="right" :to="{ path: '/searchSong' }">
      <svg class="icon" aria-hidden="true">
        <use xlink:href="#icon-sousuo"></use>
      </svg>
    </router-link>
  </div>
</template>

<script>
export default {
  name: "topNav",
};
</script>

<style lang="less" scoped>
.topNav {
  padding: 0.2rem;
  color: #303133;
  display: flex;
  justify-content: space-between;
  align-items: center;
  .left,
  .right {
    .icon {
      width: 0.6rem;
      height: 0.6rem;
    }
  }
  .center {
    width: 3.8rem;
    display: flex;
    justify-content: space-between;
    align-items: center;
    .active {
      font-weight: 900;
    }
  }
}
</style>
