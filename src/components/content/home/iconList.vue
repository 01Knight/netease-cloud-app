<template>
  <div class="iconList">
    <div class="item" v-for="item in iconList" :key="item.text">
      <div class="iconBox">
        <svg class="icon" aria-hidden="true">
          <use :xlink:href="item.icon"></use>
        </svg>
      </div>
      <span>{{ item.text }}</span>
    </div>
  </div>
</template>

<script>
export default {
  name: "iconList",
  setup() {
    const iconList = [
      {
        icon: "#icon-rili",
        text: "每日推荐",
      },
      {
        icon: "#icon-shouyinji",
        text: "私人FM",
      },
      {
        icon: "#icon-gedan",
        text: "歌单",
      },
      {
        icon: "#icon-paihangbang",
        text: "排行榜",
      },
      {
        icon: "#icon-zhiboguanli",
        text: "直播",
      },
      {
        icon: "#icon-diantai",
        text: "电台",
      },
    ];
    return {
      iconList,
    };
  },
};
</script>

<style lang="less" scoped>
.iconList {
  color: #303133;
  padding: 0.2rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  // 移动端水平滑动
  overflow-x: scroll;
  &::-webkit-scrollbar {
    display: none;
    /*隐藏滚动条*/
  }
  .item {
    padding: 0.1rem 0.2rem;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;
    .iconBox {
      display: flex;
      justify-content: center;
      align-items: center;
      width: 1rem;
      height: 1rem;
      background: linear-gradient(-40deg, red, #f78809);
      border-radius: 50%;
      .icon {
        width: 0.6rem;
        height: 0.6rem;
      }
    }
    span {
      text-align: center;
      font-size: 0.28rem;
      margin-top: 0.1rem;
      color: #909399;
      // 显示一行文本
      white-space: nowrap;
      text-overflow: ellipsis;
      overflow: hidden;
      word-break: break-all;
    }
  }
}
</style>
