<template>
  <div class="searchSong">
    <search-song-top
      ref="searchSongTopElem"
      :placeholder="placeholder"
      @input="input"
      @empty="empty"
      @searchKeyWord="searchKeyWord"
    />
    <history-search
      v-show="showHistorySearch && songCount !== 0"
      :historySearch="historySearch"
      @clickTag="clickTag"
      @emptyHistorySearch="emptyHistorySearch"
    />
    <key-word-song
      v-show="showKeyWordSong && songCount !== 0"
      :keyWordSong="keyWordSong"
      @searchKeyWord="searchKeyWord"
    />
    <search-song-content
      v-show="showSearchSongContent && songCount !== 0"
      :songList="searchSong"
    >
      <template v-slot:songList>
        <pull-refresh v-model="refreshing" @refresh="onRefresh">
          <list
            v-model:loading="loading"
            :finished="finished"
            finished-text="没有更多了"
            :offset="0"
            @load="onLoad"
          >
            <song-item
              v-for="(item, index) in searchSong"
              :key="item.id"
              :song="item"
              :index="index"
              :showIndex="false"
              @clickSongItem="playSingle(index)"
            />
          </list>
        </pull-refresh>
      </template>
    </search-song-content>
    <div class="noContent" v-show="songCount === 0">
      没有与"{{ keyWord }}"相关的内容
    </div>
    <loading color="#d81e06" v-show="showLoadSong" vertical>加载中...</loading>
  </div>
</template>

<script>
import pullRefresh from "vant/es/pull-refresh";
import "vant/es/pull-refresh/style";
import list from "vant/es/list";
import "vant/es/list/style";
import loading from "vant/es/loading";
import "vant/es/loading/style";

import searchSongTop from "@/components/content/searchSong/searchSongTop";
import historySearch from "@/components/content/searchSong/historySearch";
import keyWordSong from "@/components/content/searchSong/keyWordSong";
import searchSongContent from "@/components/content/searchSong/searchSongContent";

import songItem from "@/components/common/songItem.vue";

import { getDefaultKeyword, getSearch, getSuggestSearch } from "@/API/index";
import { switchSong } from "@/util/audio";

import { useStore } from "vuex";
import { reactive, toRefs, ref } from "vue";

export default {
  name: "searchSong",
  components: {
    pullRefresh,
    list,
    loading,
    searchSongTop,
    historySearch,
    keyWordSong,
    searchSongContent,
    songItem,
  },
  setup() {
    const store = useStore();
    const searchSongTopElem = ref(null);
    const songLoadingState = reactive({
      loading: false,
      finished: false,
      refreshing: false,
      loadPage: 1,
    });
    const state = reactive({
      showLoadSong: false,
      placeholder: "",
      keyWord: "",
      keyWordSong: [],
      searchSong: [],
      searchSongId: [],
      songCount: -1,
      historySearch: JSON.parse(localStorage.getItem("historySearch")),
      showHistorySearch: true,
      showKeyWordSong: false,
      showSearchSongContent: false,
    });
    const methods = {
      onLoad() {
        methods.loadMore(state.keyWord, songLoadingState.loadPage * 20);
      },
      onRefresh() {
        songLoadingState.finished = false;
        songLoadingState.loading = true;
        songLoadingState.loadPage = 0;
        methods.onLoad();
      },
      loadMore(keyWord, offset = 0) {
        getSearch(keyWord, offset).then((res) => {
          if (res.data.code === 400) {
            state.searchSong = [];
            state.keyWordSong = [];
            songLoadingState.loading = false;
            return;
          }
          if (res.data.result.songCount === 0) {
            songLoadingState.loading = false;
            return;
          }
          songLoadingState.loadPage++;
          if (songLoadingState.refreshing) {
            state.searchSong = [];
            songLoadingState.refreshing = false;
          }
          state.searchSong.push(...res.data.result.songs);
          songLoadingState.loading = false;
          if (state.searchSong.length >= state.songCount) {
            songLoadingState.finished = true;
          }
        });
      },
      showPage(historySearch, keyWordSong, searchSongContent) {
        state.showHistorySearch = historySearch;
        state.showKeyWordSong = keyWordSong;
        state.showSearchSongContent = searchSongContent;
      },
      getKeyWordSongDetail(keyWord, offset = 0) {
        state.showLoadSong = true;
        getSearch(keyWord, offset).then((res) => {
          if (res.data.code === 400) {
            state.searchSong = [];
            state.keyWordSong = [];
            state.showLoadSong = false;
            return;
          }
          if (res.data.result.songCount === 0) {
            state.songCount = 0;
            state.showLoadSong = false;
            return;
          }
          state.songCount = res.data.result.songCount;
          state.searchSong = res.data.result.songs;
          state.showLoadSong = false;
        });
      },
      input(keyWord) {
        state.keyWord = keyWord;
        getSuggestSearch(keyWord).then((res) => {
          if (!res.data.result.allMatch) {
            state.keyWordSong = [{ keyword: `搜索"${keyWord}"` }];
          } else {
            state.keyWordSong = res.data.result.allMatch;
          }
          methods.showPage(false, true, false);
        });
      },
      empty() {
        state.keyWord = "";
        state.keyWordSong = [];
        state.searchSong = [];
        state.searchSongIds = [];
        state.songCount = -1;
        methods.showPage(true, false, false);
      },
      searchKeyWord(keyWord) {
        searchSongTopElem.value.setKeyWord(keyWord);
        state.historySearch.unshift(keyWord);
        if (state.historySearch.length > 10) {
          state.historySearch.pop();
        }
        const newArr = new Set(state.historySearch);
        state.historySearch = [...newArr];
        localStorage.setItem("historySearch", JSON.stringify([...newArr]));
        methods.getKeyWordSongDetail(keyWord);
        methods.showPage(false, false, true);
        state.showLoadSong = false;
      },
      clickTag(keyWord) {
        state.keyWord = keyWord;
        searchSongTopElem.value.setKeyWord(keyWord);
        methods.getKeyWordSongDetail(keyWord);
        methods.showPage(false, false, true);
      },
      emptyHistorySearch() {
        localStorage.setItem("historySearch", JSON.stringify([]));
        state.historySearch = [];
      },
      playSingle(index) {
        if (store.state.playList.length === 0) {
          store.state.playList.push(state.searchSong[index]);
          switchSong(store.state.currentPlayIndex);
        } else {
          const equalIndex = store.state.playList.findIndex(
            (item) => item.id === state.searchSong[index].id
          );
          if (equalIndex !== -1) {
            store.state.playList.splice(equalIndex, 1);
          }
          store.state.playList.splice(
            store.state.currentPlayIndex,
            0,
            state.searchSong[index]
          );
          switchSong(store.state.currentPlayIndex, true);
        }
      },
    };
    getDefaultKeyword().then((res) => {
      state.placeholder = res.data.data.realkeyword;
    });

    return {
      searchSongTopElem,
      ...toRefs(state),
      ...toRefs(songLoadingState),
      ...methods,
    };
  },
};
</script>
<style lang="less" scoped>
.searchSong {
  padding-top: 1rem;
  .noContent {
    text-align: center;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  }
  .van-loading {
    margin-top: 2rem;
  }
}
</style>
