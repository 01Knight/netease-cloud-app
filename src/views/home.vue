<template>
  <div class="home">
    <loading :show="isShowLoading" v-if="isShowLoading" />
    <div v-else>
      <topNav />
      <swiper :banner="banner" />
      <iconList />
      <recommendedSongList :recommendedSongList="recommendedSongList" />
    </div>
  </div>
</template>

<script>
import swiper from "@/components/common/swiper";
import loading from "@/components/common/loading";

import topNav from "@/components/content/home/topNav";
import iconList from "@/components/content/home/iconList";
import recommendedSongList from "@/components/content/home/recommendedSongList";

import { getBanner, getRecommendedSongList } from "@/API/index.js";

import { reactive, toRefs } from "vue";

export default {
  name: "home",
  components: {
    swiper,
    loading,
    topNav,
    iconList,
    recommendedSongList,
  },
  setup() {
    const state = reactive({
      // 是否显示loading
      isShowLoading: true,
      // 轮播图
      banner: [],
      // 推荐歌单列表
      recommendedSongList: [],
    });
    Promise.all([getBanner(1), getRecommendedSongList()]).then((res) => {
      state.banner = res[0].data.banners;
      state.recommendedSongList.push(...res[1].data.result);
      state.isShowLoading = false;
    });

    return {
      ...toRefs(state),
    };
  },
};
</script>

<style lang="less" scoped></style>
