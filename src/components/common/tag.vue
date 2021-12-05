<template>
  <span class="tag" @click="clickTag">
    {{ text }}
  </span>
</template>

<script>
export default {
  name: "historySearch",
  props: {
    text: {
      type: String,
      reqired: true,
    },
  },
  emits: ["clickTag"],
  setup(props, { emit }) {
    const methods = {
      clickTag() {
        emit("clickTag", props.text);
      },
    };

    return {
      ...methods,
    };
  },
};
</script>
<style lang="less" scoped>
.tag {
  max-height: 0.6rem;
  font-size: 0.32rem;
  background-color: #ebeef5;
  padding: 0.1rem 0.2rem;
  border-radius: 0.4rem;
}
</style>
