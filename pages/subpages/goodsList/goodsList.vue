<template>
  <view>
    <image class="top" src="@/static/game_cps/home_bg_header@2x.png">
      <view style="height: 100rpx"/>
      <view style="position: relative">
        <view class="top-title">推游小助手</view>
        <view v-if="notice" class="top-notice">
          <uni-notice-bar
              @click="openPopup()"
              moreColor="#F5EFFF"
              background-color="#F5EFFF"
              color="#9966FF"
              show-get-more
              show-icon
              :text="notice.noticeTitle"
          />
        </view>
        <view class="body">
          <view class="flex_center_not_just padding_20">
            <span class="body-text left_10">推广邀请码</span>
          </view>


          <view style="padding: 0rpx 20rpx 0rpx 20rpx">
            <image class="body-moreImg" src="@/static/game_cps/goodslist/zugame3.png"></image>
            <view style="position: relative">
              <view class="padding_20" style="display: flex">
                <view>
                  <view class="text1 top_15 left_25">
                    我的渠道名称
                  </view>
                  <view class="text2 top_10  left_25">
                    <!--                  <view class="text2 top_10" @click="showInputDialog()">-->
                    <view class="text2">
                      {{ info.account }}
                    </view>
                  </view>
                </view>

                <view>
                  <view class="text1 top_15 left_60">
                    推广奖励金
                  </view>
                  <view class="text2 top_10 left_60">
                    <view class="text2">
                      ￥ {{ detail.totalToAmount }}
                    </view>
                  </view>
                </view>
              </view>
            </view>
            <view class="top_30">
              <image class="body-moreImg" src="@/static/game_cps/goodslist/zugame2.png"></image>
              <view style="position: relative">
                <view class="padding_20" style="display: flex">
                  <view>
                    <view class="text1 top_15 left_25">
                      累计发展子渠道
                    </view>
                    <view class="text2 top_10  left_25">
                      <view class="text2">
                        {{ info.recommendedUser }} 个
                      </view>
                    </view>
                  </view>
                </view>
              </view>
            </view>
            <view class="top_30">
              <image class="body-moreImg" src="@/static/game_cps/goodslist/zugame1.png"></image>
              <view style="position: relative">
                <view class="padding_20" style="display: flex">
                  <view>
                    <view class="text1 top_15 left_25">
                      推广邀请码
                    </view>
                    <view class="text2 top_10  left_25">
                      <view class="text2">
                        {{ info.refereeCode }}
                      </view>
                    </view>
                  </view>
                </view>
              </view>
            </view>
          </view>
<!--          uni.navigateTo({url: '/pages/subpages/orderList/orderList'-->
          <view  @click="getDetail" class="flex_between padding_20 top_50">
            <span class="body-text left_10">一级收益</span>
            <image src="@/static/game_cps/money/zuo.png" class="label_1"></image>
          </view>
          <view class="top_30 left_20">
            <image class="body-moreImg" src="@/static/game_cps/goodslist/zugame.png"></image>
            <view style="position: relative">
              <view class="padding_20" style="display: flex">
                <view>
                  <view class="text1 top_15 left_25">
                    子渠道收益
                  </view>
                  <view class="text2 top_10  left_25">
                    <view class="text2">
                      {{ detail.totalAmount }}
                    </view>
                  </view>
                </view>
                <view>
                  <view class="text1 top_15 left_60">
                    我的提成
                  </view>
                  <view class="text2 top_10 left_60">
                    <view class="text2">
                      {{ detail.totalToAmount }}
                    </view>
                  </view>
                </view>
              </view>
            </view>
          </view>


          <view class="flex_between padding_20 top_50">
            <span class="body-text left_10">二级收益</span>
            <image src="@/static/game_cps/money/zuo.png" class="label_1"></image>
          </view>
          <view class="top_30 left_20">
            <image class="body-moreImg" src="@/static/game_cps/goodslist/zugame.png"></image>
            <view style="position: relative">
              <view class="padding_20" style="display: flex">
                <view>
                  <view class="text1 top_15 left_25">
                    子渠道收益
                  </view>
                  <view class="text2 top_10  left_25">
                    <view class="text2">
                      {{ detail.totalAmount }}
                    </view>
                  </view>
                </view>
                <view>
                  <view class="text1 top_15 left_60">
                    我的提成
                  </view>
                  <view class="text2 top_10 left_60">
                    <view class="text2">
                      {{ detail.totalToAmount }}
                    </view>
                  </view>
                </view>
              </view>
            </view>
          </view>
        </view>
        <uni-popup ref="alertDialog">
          <uni-popup-dialog v-if="notice" type="success" cancelText="取消" confirmText="我已知晓"
                            @confirm="closePo()">
            <view v-html="notice.noticeContent"></view>
          </uni-popup-dialog>
        </uni-popup>
      </view>
    </image>
  </view>
</template>

<script>
import {mapState} from "vuex"
import api from "@/js/api.js"
import {parseTime} from '@/js/utils.js'
import myProcess from '@/pages/subpages/common/myProcess'
import LPainterText from "@/uni_modules/lime-painter/components/l-painter-text/l-painter-text.vue"
import LPainterView from "@/uni_modules/lime-painter/components/l-painter-view/l-painter-view.vue"
import LPainterImage from "@/uni_modules/lime-painter/components/l-painter-image/l-painter-image.vue"
import LPainterQrcode from "@/uni_modules/lime-painter/components/l-painter-qrcode/l-painter-qrcode.vue"
import LPainter from "@/uni_modules/lime-painter/components/l-painter/l-painter.vue"
import uQrcode from '@/uni_modules/Sansnn-uQRCode/components/u-qrcode/u-qrcode.vue';

export default {
  data() {
    return {
      img: '',
      info: {},
      infoNew: {},
      notice: {},
      lists: [],
      detail2: {},
      detail: {},
      activeNumber: null,
      imgs: 1,
      type: 1,
      url: '',
      account: '',
      isChoose: true
    }
  },
  filters: {
    parseTime,
  },
  components: {
    myProcess,
    LPainterText,
    LPainterView,
    LPainterImage,
    LPainterQrcode,
    LPainter,
    uQrcode
  },
  computed: {
    ...mapState({
      config: state => state.user.config
    }),
  },
  onShareAppMessage(res) {
    if (res.from === 'button') {// 来自页面内分享按钮
      console.log(res.target)
    }
    return {
      title: '推游小助手',
      path: `/pages/index/index?code=${this.info.refereeCode}`,
      imageUrl: 'https://image.wyntf.cn/wl/zhu/shike.png',
    }
  },
  onShow() {
    // #ifdef MP-WEIXIN
    wx.showShareMenu({
      withShareTicket: true,
      menus: ["shareAppMessage"]
    })
    this.img = __wxConfig.accountInfo.icon
    // #endif

    // 拉取公告
    api.notice(2).then(res => {
      if (res.code == 200) {
        this.notice = res.rows[0]
      }
    })
    api.userInfo().then(res => {
      if (res.code == 200) {
        this.info = res.data
      }
    })
    let par = {}
    par['userSource'] = 1
    api.statistics({params: par}).then(res => {
      if (res.code == 200) {
        this.detail = res.data
      }
    })
    let par2 = {}
    par2['userSource'] = 2
    api.statistics({params: par2}).then(res => {
      if (res.code == 200) {
        this.detail2 = res.data
      }
    })
    // 查询游戏上级收益信息列表
    api.getToUserIdList(1).then(res => {
      if (res.code == 200) {
        this.lists = res.rows
      }
    })
    api.getData(null).then(res => {
      if (res.code == 200) {
        this.activeNumber = res.data.activeNumber ? res.data.activeNumber : 0;
      }
    })
  },
  methods: {
    getDetail(){
      uni.navigateTo({url: '/pages/subpages/orderList/orderList'})
    },
    choose(val) {
      this.isChoose = val
    },
    saveClick() {
      console.log('saveClick')
      this.$refs.painter.canvasToTempFilePathSync({
        fileType: "jpg",
        pathType: 'url',
        quality: 0.9,
        success: (res) => {
          console.log(res.tempFilePath);

          // H5 平台
          // #ifdef H5
          const link = document.createElement('a');
          link.href = res.tempFilePath;
          link.download = 'share.jpg'; // 自定义文件名
          document.body.appendChild(link);
          link.click();
          document.body.removeChild(link);
          uni.showToast({
            title: '图片已保存',
            icon: 'success',
            duration: 1500
          });
          // #endif

          // 微信小程序平台
          // #ifdef MP-WEIXIN
          uni.saveImageToPhotosAlbum({
            filePath: res.tempFilePath,
            success: function () {
              uni.showToast({
                title: '图片已保存'
              });
            },
            fail: function () {
              uni.showToast({
                icon: 'error',
                title: '图片保存失败'
              });
            }
          });
          // #endif
        },
        fail: (err) => {
          console.error('生成图片失败：', err);
          uni.showToast({
            icon: 'error',
            title: '生成图片失败'
          });
        }
      });
    },
    change(val) {
      this.imgs = val
    },
    saveImageToPhotosAlbum() {
      var imgSrc = this.info.refereeImg//base64编码
      var number = Math.random()
      // #ifdef MP-WEIXIN
      wx.getFileSystemManager().writeFile({
        filePath: wx.env.USER_DATA_PATH + '/pic' + number + '.png',
        data: imgSrc,
        encoding: 'base64',
        success: res => {
          wx.saveImageToPhotosAlbum({
            filePath: wx.env.USER_DATA_PATH + '/pic' + number + '.png',
            success: function (res) {
              wx.showToast({title: '保存成功',})
            },
            fail: function (err) {
              console.log(err)
            }
          })
          console.log(res)
        }, fail: err => {
          console.log(err)
        }
      })
      // #endif
    },
    closePo() {
      this.$refs.alertDialog.close()
    },
    openPopup() {
      this.$refs.alertDialog.open()
    },
    downloadFile() {
      // #ifdef MP-WEIXIN
      // 下载图片
      wx.downloadFile({
        url: this.url,//图片地址
        success: function (res) {
          //图片保存到本地
          wx.saveImageToPhotosAlbum({
            filePath: res.tempFilePath,
            success: function (data) {
              wx.hideLoading()
              wx.showModal({
                title: '提示',
                content: '您的二维码已保存到相册，赶快识别二维码添加我们进行咨询吧',
                showCancel: false,
              })
            },
            fail: function (err) {
              if (err.errMsg === "saveImageToPhotosAlbum:fail:auth denied" || err.errMsg === "saveImageToPhotosAlbum:fail auth deny" || err.errMsg === "saveImageToPhotosAlbum:fail authorize no response") {
                // 这边微信做过调整，必须要在按钮中触发，因此需要在弹框回调中进行调用
                wx.showModal({
                  title: '提示',
                  content: '需要您授权保存相册',
                  showCancel: false,
                  success: modalSuccess => {
                    wx.openSetting({
                      success(settingdata) {
                        console.log("settingdata", settingdata)
                        if (settingdata.authSetting['scope.writePhotosAlbum']) {
                          wx.showModal({
                            title: '提示',
                            content: '获取权限成功,再次点击图片即可保存',
                            showCancel: false,
                          })
                        } else {
                          wx.showModal({
                            title: '提示',
                            content: '获取权限失败，将无法保存到相册哦~',
                            showCancel: false,
                          })
                        }
                      },
                      fail(failData) {
                        console.log("failData", failData)
                      },
                      complete(finishData) {
                        console.log("finishData", finishData)
                      }
                    })
                  }
                })
              }
            },
            complete(res) {
              wx.hideLoading()
            }
          })
        }
      })
      // #endif
    },
  }
}
</script>

<style scoped lang="scss">
.top {
  background: #FFFFFF;
  height: 20rpx;
}

.button-3 {
  height: 52rpx;
  background: linear-gradient(90deg, #6FD785 0%, #28C089 100%);
  border-radius: 26rpx;
  font-family: PingFangSC, PingFang SC;
  font-weight: 400;
  font-size: 28rpx;
  color: #FFFFFF;
  line-height: 50rpx;
  text-align: center;
  font-style: normal;
}

.copy {
  width: 68rpx;
  height: 38rpx;
  background: rgba(0, 0, 0, 0.2);
  border-radius: 12rpx;
  font-family: PingFangSC, PingFang SC;
  font-weight: 400;
  font-size: 24rpx;
  color: #FFFFFF;
  line-height: 37rpx;
  text-align: center;
  font-style: normal;

}

.active {
  font-family: PingFangSC, PingFang SC;
  font-weight: 500;
  font-size: 28rpx;
  color: #000000;
  line-height: 40rpx;
  text-align: right;
  font-style: normal;
}

.active-text {
  font-family: PingFangSC, PingFang SC;
  font-weight: 400;
  font-size: 28rpx;
  color: #333333;
  line-height: 40rpx;
  text-align: right;
  font-style: normal;
}

.active1 {
  margin: 0rpx auto;
  width: 200rpx;
  height: 6rpx;
  background: #5ACF86;
}

.label_1 {
  width: 32rpx;
  height: 32rpx;
}

/* 绿色按钮样式 */
.btn-green {
  background-color: green;
  border-color: black;
  color: white;
}

.body {
  background: #FFFFFF;
  border-radius: 30rpx 30rpx 0rpx 0rpx;

  &-top {
    &-text_hui {
      font-family: PingFangSC, PingFang SC;
      font-weight: 400;
      font-size: 24rpx;
      color: #999999;
      line-height: 34rpx;
      font-style: normal;
    }
  }

  &-moreImg3 {
    height: 140rpx;
    width: 710rpx;
    position: absolute;
    margin-left: 20rpx;
  }

  &-moreImg {
    height: 160rpx;
    width: 710rpx;
    background-size: 100% 100%;
    position: absolute;
  }

  &-moreImg1 {
    height: 136rpx;
    width: 344rpx;
    background: url('@/static/game_cps/bg_yqm_03@2x.png');
    background-size: 100% 100%;
  }

  &-moreImg2 {
    height: 136rpx;
    width: 344rpx;
    background: url('@/static/game_cps/bg_lj_02@2x.png');
    background-size: 100% 100%;
  }

  &-lv {
    width: 6rpx;
    height: 20rpx;
    background: #5ACF86;
    border-radius: 37rpx;
  }

  &-text {
    font-family: Alibaba PuHuiTi 2.0;
    font-weight: normal;
    font-size: 36rpx;
    color: #000000;
    line-height: 44rpx;
  }
}

.top {
  width: 100%;
  height: 260px;
  position: absolute;

  &-notice {
    margin: 28rpx auto;
    width: 710rpx;
    height: 50rpx;
    border-radius: 12rpx;
    font-family: PingFangSC, PingFang SC;
  }

  &-title {
    padding-top: 20rpx;
    padding-bottom: 20rpx;
    display: flex;
    justify-content: center;
    font-family: PingFangSC, PingFang SC;
    font-weight: 600;
    font-size: 32rpx;
    color: #000000;
    line-height: 48rpx;
    text-align: right;
    font-style: normal;
    text-transform: none;
  }

}

.tui_G {
  width: 500rpx;
  height: 100rpx;
  background-color: #EBFAEE;
  border-radius: 20rpx;
  display: flex;
  justify-content: space-between;
  margin: 0 auto;
  padding-left: 20rpx;
  padding-right: 20rpx;
}

.tui_G_i_1 {
  width: 200rpx;
  height: 80rpx;
  display: flex;
  justify-items: center;
  border-radius: 20rpx;
  line-height: 70rpx;
  margin: 10rpx;
  padding-left: 30rpx;
}

.tui_G_i {
  background-color: #49c869;
  width: 200rpx;
  height: 80rpx;
  display: flex;
  justify-items: center;
  border-radius: 20rpx;
  line-height: 70rpx;
  margin: 10rpx;
  padding-left: 30rpx;
}

.text1 {
  font-family: Alibaba PuHuiTi 2.0;
  font-weight: normal;
  font-size: 27rpx;
  color: #FFFFFF;
  line-height: 44rpx;
  opacity: 0.6;
}

.text2 {
  font-family: Alibaba PuHuiTi 2.0;
  font-weight: normal;
  font-size: 32rpx;
  color: #FFFFFF;
  line-height: 44rpx;
}

.text3 {
  font-family: PingFangSC, PingFang SC;
  font-weight: 400;
  font-size: 24rpx;
  color: #353433;
  line-height: 34rpx;
  text-align: left;
  font-style: normal;
}

.text4 {
  font-family: PingFangSC, PingFang SC;
  font-weight: 600;
  font-size: 32rpx;
  color: #2A2D32;
  line-height: 44rpx;
  text-align: left;
  font-style: normal;
}


.text5 {
  font-family: PingFangSC, PingFang SC;
  font-weight: 400;
  font-size: 24rpx;
  color: #999999;
  line-height: 34rpx;
  text-align: left;
  font-style: normal;
}

.text6 {
  font-family: PingFangSC, PingFang SC;
  font-weight: 400;
  font-size: 24rpx;
  color: #999999;
  line-height: 34rpx;
  text-align: left;
  font-style: normal;
}

.text7 {
  font-family: PingFangSC, PingFang SC;
  font-weight: 500;
  font-size: 28rpx;
  color: #000000;
  line-height: 40rpx;
  text-align: center;
  font-style: normal;
}

.text8 {
  font-family: PingFangSC, PingFang SC;
  font-weight: 500;
  font-size: 28rpx;
  color: #5ACF86;
  line-height: 40rpx;
  text-align: center;
  font-style: normal;
}

.item {
  width: 710rpx;
  height: 300rpx;
  background: #F8F9FA;
  border-radius: 12rpx;
}

::v-deep .uni-noticebar {
  margin: 28rpx auto;
  width: 710rpx;
  height: 60rpx;
  border-radius: 12rpx;
}

</style>
