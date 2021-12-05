<template>
  <div class="searchSongTop">
    <div class="back" @click="$router.go(-1)">
      <svg class="icon" aria-hidden="true">
        <use xlink:href="#icon-fanhui"></use>
      </svg>
    </div>
    <div class="input">
      <input
        type="text"
        v-model="keyWord"
        @input="updateKeyWord"
        :placeholder="placeholder"
      />
      <div class="empty" @click="empty" v-show="keyWord !== ''">
        <svg class="icon" aria-hidden="true">
          <use xlink:href="#icon-shanchu1"></use>
        </svg>
      </div>
    </div>
    <div class="search" @click="searchKeyWord">
      <svg class="icon" aria-hidden="true">
        <use xlink:href="#icon-sousuo"></use>
      </svg>
    </div>
  </div>
</template>

<script>
import { reactive, toRefs, ref } from "vue";

export default {
  name: "searchSongTop",
  props: {
    placeholder: {
      type: String,
      reqired: true,
    },
  },
  emits: ["input", "empty", "searchKeyWord"],
  setup(props, { emit }) {
    let keyWord = ref("");
    const state = reactive({
      historySearch: JSON.parse(localStorage.getItem("historySearch")),
    });
    const methods = {
      setKeyWord(name) {
        keyWord.value = name;
      },
      updateKeyWord() {
        if (keyWord.value == "") {
          methods.empty();
          return;
        }
        emit("input", keyWord.value);
      },
      empty() {
        keyWord.value = "";
        emit("empty");
      },
      searchKeyWord() {
        if (keyWord.value === "") {
          keyWord.value = props.placeholder;
        }
        emit("searchKeyWord", keyWord.value);
      },
    };

    return {
      ...toRefs(state),
      ...methods,
      keyWord,
    };
  },
};
</script>
<style lang="less" scoped>
.searchSongTop {
  position: fixed;
  top: 0;
  left: 0;
  z-index: 10;
  height: 1rem;
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 0.2rem;
  background-color: #fff;
  .back {
    color: #000;
    margin-right: 0.1rem;
    .icon {
      width: 0.8rem;
      height: 0.8rem;
    }
  }
  .input {
    height: 0.8rem;
    flex: 1;
    display: flex;
    justify-content: space-between;
    align-items: center;
    border-bottom: 1px solid #dcdfe6;
    .icon {
      width: 0.5rem;
      height: 0.5rem;
    }
    input {
      flex: 1;
      background: none;
      outline: none;
      border: none;
      font-size: 0.36rem;
    }
    input:focus {
      border: none;
    }
    input::placeholder {
      color: #909399;
    }
  }
  .search {
    color: #000;
    margin-right: 0.1rem;
    .icon {
      width: 0.6rem;
      height: 0.6rem;
    }
  }
}
</style>
