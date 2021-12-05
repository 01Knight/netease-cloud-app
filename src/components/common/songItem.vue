<template>
  <div class="songItem">
    <div class="index" v-if="showIndex">{{ index + 1 }}</div>
    <div class="content" @click="clickSongItem">
      <div class="musicName">{{ song.name }}</div>
      <div class="musicDetails">
        <span v-for="(text, index) in song.ar" :key="text.id">
          <span v-if="song.ar.length !== index + 1"> {{ text.name }}/ </span>
          <span v-if="song.ar.length === index + 1">
            {{ text.name + " - " }}{{ song.al.name }}
          </span>
        </span>
      </div>
    </div>
    <div class="more">
      <svg class="icon" aria-hidden="true">
        <use xlink:href="#icon-bofang1"></use>
      </svg>
      <svg class="icon" aria-hidden="true">
        <use xlink:href="#icon-gengduo"></use>
      </svg>
    </div>
  </div>
</template>

<script>
export default {
  name: "songItem",
  props: {
    song: {
      type: Object,
      reqired: true,
    },
    index: {
      type: Number,
      reqired: true,
    },
    showIndex: {
      type: Boolean,
      default: true,
    },
  },
  setup(props, { emit }) {
    const clickSongItem = () => {
      emit("clickSongItem");
    };

    return {
      clickSongItem,
    };
  },
};
</script>

<style lang="less" scoped>
.songItem {
  padding: 0.2rem 0;
  display: flex;
  justify-content: space-between;
  align-items: center;
  color: #909399;
  .index {
    font-size: 0.32rem;
    max-width: 0.8rem;
    min-width: 0.8rem;
  }
  .content {
    flex: 1;
    .musicName {
      font-weight: bolder;
      font-size: 0.32rem;
      color: #303133;
      margin-bottom: 0.08rem;
      max-width: 4rem;
      white-space: nowrap;
      text-overflow: ellipsis;
      overflow: hidden;
      word-break: break-all;
    }
    .musicDetails {
      font-size: 0.24rem;
      max-width: 4rem;
      white-space: nowrap;
      text-overflow: ellipsis;
      overflow: hidden;
      word-break: break-all;
    }
  }
  .more {
    .icon {
      width: 0.5rem;
      height: 0.5rem;
      margin-left: 0.4rem;
    }
  }
}
</style>
