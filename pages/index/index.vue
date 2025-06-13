<template>
  <view class="content">

  </view>
</template>

<script>
import store from "@/store/index.js"
import api from '@/js/api.js'

export default {
  data() {
    return {
      title: 'Hello',
      reply: "",
      msg: "",
    }
  },
  onLoad(options) {
    // let code = ''
    // if (options.code){
    //   code = "_"+options.code
    // }
    // uni.showLoading({
    //   title: '自动加载中',
    //   mask: true
    // });
    // let _this = this
    // // todo 解析小程序二维码
    // // 自动登录
    // if (!store.state.user.token) {
    //   uni.login({
    //     provider: 'weixin',
    //     success: function (loginRes) {
    //       let params = {
    //         data: loginRes.code+code
    //       }
    //       store.dispatch("login", params).then(res => {
    //         if (res.code == 200) {
    //           uni.hideLoading();
    //           uni.showToast({
    //             icon: 'success',
    //             title: '自动登录成功'
    //           });
    //           api.getData(null).then(res => {
    //             if (res.code == 200) {
    //               let config1 = res.data.withdrawMaxAmount ? res.data.withdrawMaxAmount : 0;
    //               let withdrawRadio = res.data.withdrawRadio ? res.data.withdrawRadio : 0;
    //               let cpsRadio = res.data.cpsRadio ? res.data.cpsRadio : 0;
    //               let comCpsRadio = res.data.comCpsRadio ? res.data.comCpsRadio : 0;
    //               let share = res.data.share ? res.data.share : 0;
    //
    //               let config = {
    //                 config: config1,
    //                 withdrawRadio: withdrawRadio,
    //                 cpsRadio: cpsRadio,
    //                 comCpsRadio: comCpsRadio,
    //                 share: share
    //               }
    //               store.commit('setConfig', config)
    //               setTimeout(() => {
    //                 uni.switchTab({
    //                   url: "/pages/subpages/index/index"
    //                 })
    //               }, 200)
    //             }
    //           })
    //         } else {
    //           _this.Tips(res.msg)
    //         }
    //       })
    //     },
    //     fail: function (err) {
    //       // 登录授权失败
    //       uni.hideLoading();
    //       uni.showToast({
    //         icon: 'success',
    //         title: '自动登录失败，请重新进入'
    //       });
    //     }
    //   });
    // } else {
    //   api.getData(null).then(res => {
    //     if (res.code == 200) {
    //       let config1 = res.data.withdrawMaxAmount ? res.data.withdrawMaxAmount : 0;
    //       let withdrawRadio = res.data.withdrawRadio ? res.data.withdrawRadio : 0;
    //       let cpsRadio = res.data.cpsRadio ? res.data.cpsRadio : 0;
    //       let comCpsRadio = res.data.comCpsRadio ? res.data.comCpsRadio : 0;
    //       let share = res.data.share ? res.data.share : 0;
    //       let config = {
    //         config: config1,
    //         withdrawRadio: withdrawRadio,
    //         cpsRadio: cpsRadio,
    //         comCpsRadio: comCpsRadio,
    //         share: share
    //       }
    //       store.commit('setConfig', config)
    //       uni.switchTab({
    //         url: "/pages/subpages/index/index"
    //       })
    //     }
    //   })
    // }
  },
  methods: {}
}
</script>

<style>
.content {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

.logo {
  height: 200rpx;
  width: 200rpx;
  margin-top: 200rpx;
  margin-left: auto;
  margin-right: auto;
  margin-bottom: 50rpx;
}

.text-area {
  display: flex;
  justify-content: center;
}

.title {
  font-size: 36rpx;
  color: #8f8f94;
}
</style>
