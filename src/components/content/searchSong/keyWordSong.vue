<template>
  <div class="keyWordSong">
    <div
      class="item"
      v-for="item in keyWordSong"
      :key="item.id"
      @click="searchKeyWord(item.keyword)"
    >
      <div class="search">
        <svg class="icon" aria-hidden="true">
          <use xlink:href="#icon-sousuo"></use>
        </svg>
      </div>
      <div class="name">
        {{ item.keyword }}
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "keyWordSong",
  props: {
    keyWordSong: {
      type: Array,
      reqired: true,
    },
  },
  emits: ["searchKeyWord"],
  setup(props, { emit }) {
    const methods = {
      searchKeyWord(keyWord) {
        emit("searchKeyWord", keyWord);
      },
    };
    return {
      ...methods,
    };
  },
};
</script>
<style lang="less" scoped>
.keyWordSong {
  .item {
    display: flex;
    justify-content: left;
    align-items: center;
    height: 1rem;
    padding: 0 0.2rem;
    border-bottom: 1px solid #e4e7ed;
    .search {
      .icon {
        width: 0.4rem;
        height: 0.4rem;
      }
    }
    .name {
      margin-left: 0.2rem;
      font-size: 0.32rem;
    }
  }
}
</style>
