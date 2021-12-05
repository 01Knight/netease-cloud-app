import axios from "axios";

const RequestHeader = 'http://localhost:3000/'

// 获取轮播图 type:资源类型0: pc 1: android 2: iphone 3: ipad
export function getBanner(type = 0) {
  return axios.get(`${RequestHeader}banner?type=${type}`)
}

// 获取推荐歌单 limit: 取出数量 , 默认为 30 (不支持 offset)
export function getRecommendedSongList(limit = 30) {
  return axios.get(`${RequestHeader}personalized?limit=${limit}`)
}

// 获取歌单详情 必选参数 : id : 歌单 id 可选参数 : s : 歌单最近的 s 个收藏者,默认为8
export function getSongListDetail(id) {
  return axios.get(`${RequestHeader}playlist/detail?id=${id}`)
}

// 获取对应id的音乐(多个加,) 必选参数 : ids: 音乐 id, 如 ids=347230 ids=347230,347231
export function getSongDetail(ids) {
  return axios.get(`${RequestHeader}song/detail?ids=${ids}`)
}

// 获取音乐歌词 必选参数 : id: 音乐 id
export function getSongLyric(id) {
  return axios.get(`${RequestHeader}lyric?id=${id}`)
}

// 默认搜索关键词 说明 : 调用此接口 , 可获取默认搜索关键词11111
export function getDefaultKeyword() {
  return axios.get(`${RequestHeader}search/default`)
}

// 传入搜索关键词可获得搜索建议 必选参数 : keywords : 关键词 可选参数 : type : 如果传 'mobile' 则返回移动端数据
export function getSuggestSearch(keywords, type = 'mobile') {
  return axios.get(`${RequestHeader}search/suggest?keywords=${keywords}&type=${type}`)
}

// 搜索 说明 : 传入搜索关键词可以搜索该音乐 / 专辑 / 歌手 / 歌单 / 用户 
// 必选参数 : keywords : 关键词 
// 可选参数 : limit : 返回数量 , 默认为 30 offset : 偏移数量，用于分页 , 如 : 如 :( 页数 -1)*30, 其中 30 为 limit 的值 , 默认为 0
// type: 搜索类型；默认为 1 即单曲 , 取值意义 : 1: 单曲, 10: 专辑, 100: 歌手, 1000: 歌单, 1002: 用户, 1004: MV, 1006: 歌词, 1009: 电台, 1014: 视频, 1018:综合
export function getSearch(keywords, offset, limit = 20, type = 1) {
  return axios.get(`${RequestHeader}cloudsearch/url?keywords=${keywords}&limit=${limit}&offset=${offset}&type=${type}`)
}
