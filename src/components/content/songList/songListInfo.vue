<template>
  <div class="songListInfo">
    <div class="bg">
      <div class="overlay"></div>
      <img :src="songListInfo.coverImgUrl" />
    </div>
    <div class="content">
      <div class="left">
        <img :src="songListInfo.coverImgUrl" alt="" />
        <countTag class="countTag" :count="songListInfo.playCount" />
      </div>
      <div class="right">
        <div class="name">{{ songListInfo.name }}</div>
        <div class="author">
          <img :src="songListInfo.creator.avatarUrl" alt="" />
          <span>
            {{ songListInfo.creator.nickname }}
          </span>
          <svg class="icon" aria-hidden="true">
            <use xlink:href="#icon-arrow-right-copy-copy"></use>
          </svg>
        </div>
        <div class="description">
          <span>{{ songListInfo.description }}</span>
          <svg class="icon" aria-hidden="true">
            <use xlink:href="#icon-arrow-right-copy-copy"></use>
          </svg>
        </div>
      </div>
    </div>
    <!-- tabbar -->
    <div class="tabbar">
      <div class="item">
        <svg class="icon" aria-hidden="true">
          <use xlink:href="#icon-message"></use>
        </svg>
        <span>{{ songListInfo.commentCount }}</span>
      </div>
      <div class="item" @click="showShareSheet">
        <svg class="icon" aria-hidden="true">
          <use xlink:href="#icon-fenxiang"></use>
        </svg>
        <span>{{ songListInfo.shareCount }}</span>
      </div>
      <div class="item">
        <svg class="icon" aria-hidden="true">
          <use xlink:href="#icon-iconset0425"></use>
        </svg>
        <span>下载</span>
      </div>
      <div class="item">
        <svg class="icon" aria-hidden="true">
          <use xlink:href="#icon-duoxuan"></use>
        </svg>
        <span>多选</span>
      </div>
    </div>
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
import countTag from "@/components/common/countTag";

import shareSheet from "vant/es/share-sheet";
import "vant/es/share-sheet/style";

import { reactive, toRefs } from "vue";

export default {
  name: "songListInfo",
  components: {
    countTag,
    shareSheet,
  },
  props: {
    songListInfo: {
      type: Object,
      reqired: true,
    },
  },
  setup() {
    const state = reactive({
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
      hideShareSheet() {
        state.showShare = false;
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
.songListInfo {
  padding: 1.3rem 0.2rem 0;
  width: 7.5rem;
  height: 5.8rem;
  position: relative;
  .bg {
    position: absolute;
    left: 0;
    top: 0;
    width: 7.5rem;
    height: 7.6rem;
    z-index: -1;
    .overlay {
      position: absolute;
      left: 0;
      top: 0;
      width: 100%;
      height: 100%;
      background-color: rgba(0, 0, 0, 0.2);
      z-index: 1;
    }
    img {
      width: 7.5rem;
      height: 100%;
      background-size: auto 100%;
      background-position: center;
      filter: blur(40px);
    }
  }
  .content {
    padding: 0 0 0.3rem;
    display: flex;
    justify-content: space-between;
    align-items: center;
    .left {
      position: relative;
      flex: 1;
      img {
        width: 2.5rem;
        height: 2.5rem;
        border-radius: 0.1rem;
      }
      .countTag {
        position: absolute;
        right: 0;
        bottom: 0.05rem;
      }
    }
    .right {
      padding-left: 0.4rem;
      flex: 2;
      .name {
        color: #fff;
        font-size: 0.36rem;
        font-weight: 600;
      }
      .author {
        padding: 0.13rem 0;
        color: #cecbcb;
        font-size: 0.28rem;
        display: flex;
        align-items: center;
        img {
          width: 0.6rem;
          height: 0.6rem;
          border-radius: 50%;
          margin-right: 0.2rem;
        }
        span {
          word-break: break-all;
          text-overflow: ellipsis;
          display: -webkit-box;
          -webkit-box-orient: vertical;
          -webkit-line-clamp: 1;
          overflow: hidden;
        }
      }
      .description {
        font-size: 0.26rem;
        color: #cecbcb;
        display: flex;
        justify-content: space-between;
        align-items: center;
        span {
          width: 3.6rem;
          margin-left: 0.1rem;
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
  .tabbar {
    display: flex;
    justify-content: center;
    align-items: center;
    .item {
      flex: 1;
      height: 1.2rem;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      color: #fff;
      .icon {
        width: 0.5rem;
        height: 0.5rem;
      }
      span {
        color: #f3f3f3;
        font-size: 0.28rem;
        margin-top: 0.08rem;
      }
    }
  }
}
</style>
