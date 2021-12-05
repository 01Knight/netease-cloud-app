export function debounce(callback, time = 300) {
  //定时器变量
  let timeId = null
  // 返回值一定是个函数，否则无法触发回调
  return function (e) {
    //timeId !== null 证明已经有一个timeif在跑，先清除掉再继续跑
    if (timeId !== null) {
      clearTimeout(timeId)
    }
    //启动定时器
    timeId = setTimeout(() => {
      callback.call(this, e)
      // 重置定时器变量
      timeId = null
    }, time)
  }
}
export function throttle(callback, wait = 300) {
  // 定义开始时间
  let start = 0
  return function (e) {
    console.log(111);
    // 获取当前时间截
    let now = Date.now()
    console.log(now - start);
    if (now - start >= wait) {
      // 执行回调函数
      callback.call(this, e)
      // 修改开始时间
      start = now
    }
  }
}