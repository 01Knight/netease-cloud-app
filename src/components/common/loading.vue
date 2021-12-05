<template>
  <div class="loading">
    <overlay :show="show" :z-index="zindex">
      <loading :size="size" :color="color" vertical>加载中...</loading>
    </overlay>
  </div>
</template>

<script>
import loading from "vant/es/loading";
import "vant/es/loading/style";
import overlay from "vant/es/overlay";
import "vant/es/overlay/style";

export default {
  // name: "loading",
  components: {
    loading,
    overlay,
  },
  props: {
    show: {
      type: Boolean,
      default: false,
    },
    zindex: {
      type: Number,
      default: 999,
    },
    color: {
      type: String,
      default: "#DCDFE6",
    },
    size: {
      type: String,
      default: "24px",
    },
  },
};
</script>

<style lang="less" scoped>
.loading {
  .van-overlay {
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .van-loading {
  }
}
</style>
