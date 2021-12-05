import { createStore } from 'vuex'

export default createStore({
  state: {
    palyMode: 'loop', // 播放方式 (loop/random) 循环或随机
    playList: [], // 播放的列表
    songList: [], // 当前的歌单
    songListId: -1,
    currentPlayIndex: 0, // 当播放的索引
    currentSongTime: 0,
    totalSongTime: 0,
    progress: 0,
    songLyric: [{
      item: "",
      time: "",
      lyric: "",
      minute: "",
      second: "",
      millisecond: "",
    }], // 当前音乐的歌词
    isPlay: false, // 是否正在播放 
  },
  mutations: {
    setPlayMode(state, mode) {
      state.palyMode = mode
    },
    setPlayList(state, playList) {
      state.playList = playList
    },
    setSongList(state, songList) {
      state.songList = songList
    },
    setSongListId(state, songListId) {
      state.songListId = songListId
    },
    setCurrentPlayIndex(state, currentPlayIndex) {
      state.currentPlayIndex = currentPlayIndex
    },
    setCurrentSongTime(state, currentSongTime) {
      state.currentSongTime = currentSongTime
    },
    setTotalSongTime(state, totalSongTime) {
      state.totalSongTime = totalSongTime
    },
    setProgress(state, progress) {
      state.progress = progress
    },
    setSongLyric(state, songLyric) {
      state.songLyric = songLyric
    },
    setIsPlay(state, value) {
      state.isPlay = value
    }
  },
  actions: {
  },
  modules: {
  }
})
