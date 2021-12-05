<template>
  <div class="playListItem">
    <div class="songDefault aLine" @click="switchSong">
      <div v-if="playIndex === currentIndex">
        <svg class="icon icon-shanchu1" aria-hidden="true">
          <use xlink:href="#icon-shengyin"></use>
        </svg>
      </div>
      <div
        :class="{
          musicName: true,
          aLine: true,
          active: playIndex === currentIndex,
        }"
      >
        {{ songDefault.name }}
      </div>
      <span
        v-for="(text, index) in songDefault.ar"
        :key="text.id"
        :class="{
          musicDetails: true,
          aLine: true,
          active: playIndex === currentIndex,
        }"
      >
        <span v-if="index === 0">&nbsp;-&nbsp;</span>
        <span v-if="songDefault.ar.length !== index + 1">
          {{ text.name }}/
        </span>
        <span v-if="songDefault.ar.length === index + 1">
          {{ text.name + " - " }}{{ songDefault.al.name }}
        </span>
      </span>
    </div>
    <svg class="icon icon-shanchu1" aria-hidden="true" @click="deleteSong">
      <use xlink:href="#icon-shanchu1"></use>
    </svg>
  </div>
</template>

<script>
export default {
  name: "playListItem",
  props: {
    songDefault: {
      type: Object,
      reqired: true,
    },
    playIndex: {
      type: Number,
      reqired: true,
    },
    currentIndex: {
      type: Number,
      reqired: true,
    },
  },
  emits: ["switchSong", "deleteSong"],
  setup(props, { emit }) {
    const methods = {
      switchSong() {
        emit("switchSong", props.currentIndex, true);
      },
      deleteSong() {
        emit("deleteSong", props.currentIndex);
      },
    };

    return {
      ...methods,
    };
  },
};
</script>
<style lang="less" scoped>
.playListItem {
  padding: 0.2rem 0.3rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  .songDefault {
    width: 6rem;
    display: flex;
    justify-content: left;
    align-items: center;
    .icon {
      margin-right: 0.1rem;
      width: 0.5rem;
      height: 0.5rem;
    }
    .musicName {
      letter-spacing: 1px;
    }
    .musicDetails {
      color: #909399;
      font-size: 0.24rem;
    }
  }
  .icon-shanchu1 {
    width: 0.5rem;
    height: 0.5rem;
    color: #ccc;
  }
}
.active {
  color: #d81e06 !important;
}
.aLine {
  word-break: break-all;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 1;
  overflow: hidden;
}
</style>
