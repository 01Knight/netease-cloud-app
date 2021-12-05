<template>
  <div class="historySearch">
    <div class="title" v-show="historySearch.length > 0">
      <div class="title">历史记录</div>
      <div class="empty" @click="empty">
        <svg class="icon" aria-hidden="true">
          <use xlink:href="#icon-shanchu"></use>
        </svg>
      </div>
    </div>
    <div class="history">
      <tag
        v-for="text in historySearch"
        :key="text"
        :text="text"
        @clickTag="clickTag"
      />
    </div>
    <empyt
      v-show="historySearch.length === 0"
      color="#999"
      text1="您还没有搜索记录"
      text2="快去搜索吧!"
    />
  </div>
</template>

<script>
import tag from "@/components/common/tag.vue";
import empyt from "@/components/common/empyt.vue";

import { reactive, toRefs } from "vue";

export default {
  name: "historySearch",
  components: {
    tag,
    empyt,
  },
  props: {
    historySearch: {
      type: Array,
      reqired: true,
    },
  },
  emits: ["clickTag", "emptyHistorySearch"],
  setup(props, { emit }) {
    const state = reactive({});
    const methods = {
      clickTag(text) {
        emit("clickTag", text);
      },
      empty() {
        emit("emptyHistorySearch");
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
.historySearch {
  height: 0.8rem;
  margin-top: 0.4rem;
  padding: 0 0.2rem;
  .title {
    display: flex;
    justify-content: space-between;
    align-items: center;
    font-size: 0.32rem;
    font-weight: 900;
    margin-bottom: 0.2rem;
  }
  .history {
    flex: 1;
    width: auto;
    display: flex;
    flex-wrap: wrap;
    .tag {
      margin: 0.1rem;
    }
  }
  .empty {
    .icon {
      width: 0.5rem;
      height: 0.5rem;
    }
  }
}
</style>
