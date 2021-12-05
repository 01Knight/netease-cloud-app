<template>
  <div class="empyt">
    <div class="img">
      <svg class="icon" aria-hidden="true">
        <use xlink:href="#icon-yanjing-copy"></use>
      </svg>
    </div>
    <div class="text1">{{ text1 }}</div>
    <div class="text2">{{ text2 }}</div>
  </div>
</template>

<script>
export default {
  name: "empyt",
  props: {
    color: {
      type: String,
      default: "#ff6700",
    },
    text1: {
      type: String,
      default: "您还没有相关的订单",
    },
    text2: {
      type: String,
      default: "可以去看看您有那些想买的",
    },
  },
};
</script>

<style lang="less" scoped>
.empyt {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  .img {
    .icon {
      width: 1rem;
      height: 1rem;
    }
  }
  .text1 {
    padding: 5px 0;
    color: #666;
    font-size: 17px;
  }
  .text2 {
    color: #999;
    font-size: 17px;
  }
}
</style>
