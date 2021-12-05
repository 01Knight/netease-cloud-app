function remSize() {
  // 获取移动设备的宽度 
  var deviceWidth = document.documentElement.clientWidth || window.innerWidth
  // // 设置最大宽度
  // if (deviceWidth >= 750) {
  //   deviceWidth = 750
  // }
  // // 设置最小宽度
  // if (deviceWidth <= 320) {
  //   deviceWidth = 320
  // }
  // console.log(deviceWidth);
  document.documentElement.style.fontSize = (deviceWidth / 7.5) + 'px'
  document.querySelector('body').style.fontSize = 0.32 + 'rem'
  // console.log(document.documentElement.style.fontSize);
}

remSize()
// 窗口发生变化时调用
window.onresize = () => { remSize() }