<template>
  <div class="recommendedSongList">
    <div class="title">
      <div class="left">发现好歌单</div>
      <div class="right">查看更多</div>
    </div>
    <div class="content">
      <router-link
        :to="{ path: '/songList', query: { id: item.id } }"
        class="item"
        v-for="item in recommendedSongList"
        :key="item.id"
      >
        <img :src="item.picUrl" />
        <countTag class="countTag" :count="item.playCount" />
        <div class="text">{{ item.name }}</div>
      </router-link>
    </div>
  </div>
</template>

<script>
import countTag from "@/components/common/countTag.vue";

export default {
  name: "recommendedSongList",
  components: {
    countTag,
  },
  props: {
    recommendedSongList: {
      type: Object,
      required: true,
    },
  },
};
</script>

<style lang="less" scoped>
.recommendedSongList {
  padding: 0.2rem;
  .title {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0 0 0.1rem;
    .left {
      font-size: 0.36rem;
      font-weight: 900;
      color: #303133;
    }
    .right {
      border: 1px solid #dcdfe6;
      padding: 0.08rem;
      border-radius: 0.3rem;
      font-size: 0.24rem;
      color: #909399;
    }
  }
  .content {
    display: flex;
    overflow-x: scroll;
    &::-webkit-scrollbar {
      display: none;
      /*隐藏滚动条*/
    }
    .item {
      margin: 0.1rem 0.15rem 0.1rem 0;
      position: relative;
      img {
        width: 2rem;
        height: 2rem;
        border-radius: 0.16rem;
      }
      .countTag {
        position: absolute;
        top: 1.58rem;
        right: 0;
      }
      .text {
        font-size: 0.28rem;
        color: #909399;
        // 最多显示两行文本
        word-break: break-all;
        text-overflow: ellipsis;
        display: -webkit-box;
        -webkit-box-orient: vertical;
        -webkit-line-clamp: 2;
        overflow: hidden;
      }
    }
  }
}
</style>
