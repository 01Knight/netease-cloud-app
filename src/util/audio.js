import store from "@/store/index.js";
import { getSongLyric } from "@/API/index.js";

const audio = window.audio
const state = store.state
// 获取指定范围的一个随机数...
export function randomNumBoth(Min = 0, Max) {
  let Range = Max - Min + 1;
  let Rand = Math.random();
  let num = Min + Math.floor(Rand * Range);
  return num;
}
// 修改音频的src
export function setAudioSrc(musicId) {
  audio.src = `https://music.163.com/song/media/outer/url?id=${musicId}.mp3`;
}
// 切换音乐
export function switchSong(index, isGetSongLyric = false) {
  store.commit("setCurrentPlayIndex", index)
  setAudioSrc(state.playList[state.currentPlayIndex].id)
  if (isGetSongLyric) {
    updateSongLyric(state.playList[state.currentPlayIndex].id)
  }
  playMusic(audio)
}
// 删除播放列表对应的歌曲
export function deleteSong(index) {
  state.playList.splice(index, 1)
  if (index === state.currentPlayIndex) {
    switchSong(index, true)
  } else if (index < state.currentPlayIndex) {
    store.commit("setCurrentPlayIndex", state.currentPlayIndex - 1)
  }
}
// 切换歌单
export function switchSongList(songList, songListId) {
  store.commit("setSongList", songList)
  store.commit("setPlayList", songList)
  store.commit("setSongListId", songListId)
}
// 更新歌词
export function updateSongLyric(musicId) {
  getSongLyric(musicId).then((res) => {
    setStoreSongLyric(res);
  });
}
// 将歌词添加到store中
export function setStoreSongLyric(res) {
  if (res.data.lrc) {
    let lyric = analysisSongLyric(res.data.lrc.lyric)
    let newLyric = lyric.filter(value => value.lyric != false && value.time != false && Object.keys(value).length > 0);
    store.commit("setSongLyric", newLyric);
  } else {
    store.commit("setSongLyric", [{ lyric: '该歌曲暂时没有歌词' }]);
  }
}
// 解析歌词
export function analysisSongLyric(lyric) {
  return lyric.split(/\n/gis).map((item) => {
    if (item == "") return {};
    const EndIndex = item.indexOf("]");
    const time = item.slice(1, EndIndex);
    const lyric = item.slice(EndIndex + 1);
    const [minute, secondAndMillisecond] = time.split(":");
    const [second, millisecond] = secondAndMillisecond.split(".");
    return {
      item,
      time,
      lyric,
      minute,
      second,
      millisecond,
    };
  });
}
// 播放音乐
export function playMusic() {
  if (!audio.src) {
    setAudioSrc(state.playList[state.currentPlayIndex].id)
  }
  audio.play()
}
// 暂停音乐
export function pauseMusic() {
  audio.pause()
}