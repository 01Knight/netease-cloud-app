<template>
  <div class="songListContent">
    <div class="bg"></div>
    <div class="vip">
      <div class="left">
        <svg class="icon" aria-hidden="true">
          <use xlink:href="#icon-yinle"></use>
        </svg>
        <span>含N收vip播放歌曲</span>
      </div>
      <div class="right">
        <span>首开vip仅5元</span>
        <svg class="icon" aria-hidden="true">
          <use xlink:href="#icon-arrow-right-copy-copy"></use>
        </svg>
      </div>
    </div>
    <div class="list">
      <div class="listTop">
        <div class="left">
          <svg class="icon" aria-hidden="true">
            <use xlink:href="#icon-bofang"></use>
          </svg>
          <span>
            播放全部<span>(共{{ songList.length }}首)</span>
          </span>
        </div>
        <div class="right">
          <div class="button">
            + 收藏({{ changeCount(songListInfo.subscribedCount) }})
          </div>
        </div>
      </div>
      <div
        :class="{
          listContent: true,
          paddingBottom: $store.state.playList.length,
        }"
      >
        <song-item
          v-for="(item, index) in songList"
          :key="item.id"
          :song="item"
          :index="index"
          @clickSongItem="switchSong(index)"
        />
      </div>
    </div>
  </div>
</template>

<script>
import store from "@/store/index.js";
import songItem from "@/components/common/songItem.vue";

export default {
  name: "songListContent",
  components: { songItem },
  props: {
    songListInfo: {
      type: Object,
      reqired: true,
    },
    songList: {
      type: Object,
      reqired: true,
    },
  },
  emits: ["switchSong"],
  setup(props, { emit }) {
    // 判断当前是否有歌单没有将当前歌单添加vuex
    if (store.state.playList.length === 0) {
      store.commit("setPlayList", JSON.parse(JSON.stringify(props.songList)));
    }
    const methods = {
      switchSong(index) {
        emit("switchSong", index);
      },
      changeCount(count) {
        if (count > 100000000) {
          return (count / 100000000).toFixed(2) + "亿";
        }
        if (count > 100000) {
          return (count / 10000).toFixed(2) + "万";
        }
        return count;
      },
    };

    return {
      ...methods,
    };
  },
};
</script>

<style lang="less" scoped>
.songListContent {
  width: 7.5rem;
  position: relative;
  .bg {
    z-index: -1;
    background-color: #ccc;
    opacity: 0.5;
    position: absolute;
    top: 0;
    left: 0;
    height: 1.8rem;
    width: 7.5rem;
    border-radius: 0.6rem 0.6rem 0 0;
  }
  .vip {
    border-radius: 0.6rem 0.6rem 0 0;
    color: #000;
    padding: 0.3rem 0.1rem 1rem;
    display: flex;
    justify-content: space-between;
    align-items: center;
    .left {
      display: flex;
      justify-content: space-between;
      align-items: center;
      height: 0.5rem;
      .icon {
        margin: 0 0.2rem;
        width: 0.5rem;
        height: 0.5rem;
      }
      span {
        display: inline-block;
        height: 0.5rem;
        line-height: 0.5rem;
        color: #303133;
        font-size: 0.32rem;
        font-weight: 500;
      }
    }
    .right {
      color: #606266;
    }
  }
  .list {
    position: relative;
    top: -0.65rem;
    left: 0;
    font-size: 0.28rem;
    padding: 0.15rem 0.2rem;
    background: #fff;
    border-radius: 0.6rem 0.6rem 0 0;
    .listTop {
      padding: 0 0.2rem;
      display: flex;
      justify-content: space-between;
      align-items: center;
      .left {
        color: #303133;
        display: flex;
        align-items: center;
        .icon {
          width: 0.5rem;
          height: 0.5rem;
        }
        span {
          display: flex;
          align-items: center;
          margin-left: 0.2rem;
          font-size: 0.32rem;
          span {
            margin-left: 0;
            font-size: 0.24rem;
            color: #909399;
          }
        }
      }
      .right {
        .button {
          font-size: 0.24rem;
          color: #f1f1f1;
          background-color: red;
          height: 0.9rem;
          line-height: 0.9rem;
          padding: 0 0.2rem;
          text-align: center;
          border-radius: 0.5rem;
        }
      }
    }
    .listContent {
      padding: 0.1rem 0.2rem;
      .item {
        padding: 0.2rem 0;
        display: flex;
        justify-content: space-between;
        align-items: center;
        color: #909399;
        .index {
          font-size: 0.32rem;
          max-width: 0.8rem;
          min-width: 0.8rem;
        }
        .content {
          flex: 1;
          .musicName {
            font-weight: bolder;
            font-size: 0.32rem;
            color: #303133;
            margin-bottom: 0.08rem;
            max-width: 4rem;
            white-space: nowrap;
            text-overflow: ellipsis;
            overflow: hidden;
            word-break: break-all;
          }
          .musicDetails {
            font-size: 0.24rem;
            max-width: 4rem;
            white-space: nowrap;
            text-overflow: ellipsis;
            overflow: hidden;
            word-break: break-all;
          }
        }
        .more {
          .icon {
            width: 0.5rem;
            height: 0.5rem;
            margin-left: 0.4rem;
          }
        }
      }
    }
  }
}
.paddingBottom {
  padding-bottom: 1rem;
}
</style>
