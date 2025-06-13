import App from './App'
import {
  addParams2Url
} from "./js/utils.js"
import store from "@/store/index.js"
// 全局样式
import 'assets/css/common.css'


Vue.prototype.switchTab = (url, params) => {
  let link = params ? addParams2Url(url, params) : url
  uni.switchTab({
    url: link
  })
}

Vue.prototype.toNative = (url, params) => {
  let link = params ? addParams2Url(url, params) : url
  uni.navigateTo({
    url: link
  })
}

Vue.prototype.Tips = (title) => {
  uni.showToast({
    title,
    icon: "none",
    duration: 2000,
  })
}

// #ifndef VUE3
import Vue from 'vue'
import './uni.promisify.adaptor'
Vue.config.productionTip = false
App.mpType = 'app'
const app = new Vue({
  ...App,
  store
})
app.$mount()
// #endif

// #ifdef VUE3
import { createSSRApp } from 'vue'
export function createApp() {
  const app = createSSRApp(App)
  return {
    app
  }
}
// #endif
