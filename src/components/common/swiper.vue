<template>
  <div class="swipe">
    <Swipe class="my-swipe" :autoplay="3000" indicator-color="#df4f36">
      <Swipe-item v-for="item in banner" :key="item.targetId">
        <img :src="item.pic" alt="" />
      </Swipe-item>
    </Swipe>
  </div>
</template>

<script>
import Swipe from "vant/es/swipe";
import "vant/es/swipe/style";
import SwipeItem from "vant/es/swipe-item";
import "vant/es/swipe-item/style";

export default {
  name: "swipe",
  components: {
    Swipe,
    SwipeItem,
  },
  props: {
    banner: {
      type: Object,
      required: true,
    },
  },
};
</script>

<style lang="less" scoped>
.swipe {
  padding: 0 0.2rem;
}
.my-swipe .van-swipe-item {
  width: 7.5rem;
  height: 3rem;
}
.my-swipe .van-swipe-item img {
  width: 100%;
  height: 100%;
  border-radius: 8px;
}
</style>
