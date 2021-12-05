<template>
  <div class="box">
    <span class="bf"></span>
    <span class="count">{{ changeCount(count) }}</span>
  </div>
</template>

<script>
export default {
  name: "countTag",
  props: {
    count: {
      type: Number,
      default: 0,
    },
  },
  setup() {
    const changeCount = (count) => {
      if (count > 100000000) {
        return (count / 100000000).toFixed(2) + "亿";
      }
      if (count > 100000) {
        return (count / 10000).toFixed(2) + "万";
      }
      return count;
    };

    return {
      changeCount,
    };
  },
};
</script>

<style lang="less" scoped>
.box {
  display: inline-block;
  padding: 0.08rem 0.16rem;
  background-color: rgba(0, 0, 0, 0.2);
  border-radius: 0.2rem;
  overflow: hidden;
  .bf {
    float: left;
    height: 0;
    width: 0;
    font-size: 0;
    border-color: transparent transparent transparent #ffffff;
    border-radius: 30%;
    border-style: solid;
    border-width: 0.12rem;
  }
  .count {
    letter-spacing: 0px;
    float: left;
    font-size: 0.24rem;
    line-height: 0.26rem;
    color: #ffffff;
  }
}
</style>
