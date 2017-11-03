/* eslint-disable */
'use strict'

// 实现浏览器端的EventSource，用于跟服务器双向通信
// webpack热重载客户端跟dev-server上的热重载插件之间需要进行双向通信
// 服务端webpack重新编译后，会向客户端推送信息，告诉客户端进行更新
// 支持w3c规范, 一个浏览器w3c eventsource的ployfill, 在不支持事件源的浏览器里添加填充策略支持
// 先检查浏览器是否支持某个api, 如果不支持就加载对应的polyfill
require('eventsource-polyfill')
// webpack热重载客户端
var hotClient = require('webpack-hot-middleware/client?noInfo=true&reload=true')
// 客户端收到更新动作，执行页面刷新
hotClient.subscribe(function (event) {
  if (event.action === 'reload') {
    window.location.reload()
  }
})
