<template>
  <view>
    <view class="container">
      <image class="top" src="@/static/game_cps/bakimage.png">
        <view style="height: 100rpx"/>
        <view style="position: relative">
          <view class="top-title">推游小助手</view>
          <view  @click="withdrawRecord()" class="top_title_top top_20">
            <view  class="bang_body left_20">
              <image class="fu_image top_30" src="@/static/game_cps/goodslist/dibuioc.png">
                <view class="body-text6">
                  提现记录
                </view>
              </image>
            </view>
            <image src="@/static/game_cps/money/zuo.png" class="label_1 right_20"></image>
          </view>
          <view class="body center_margin top_20">
            <view class="flex_center_not_just padding_20">
              <view class="bang_body">
                  <image class="fu_image top_30" src="@/static/game_cps/goodslist/dibuioc.png">
                    <view class="body-text6">
                    我的收益
                    </view>
                  </image>
              </view>
            </view>
            <view class="flex_between left_20">
              <view class="text6 left_10">
                累计总收入
                <span class="body-text left_10">  {{ (+detail.totalToAmount + +detail2.totalAmount).toFixed(1) }}</span>
              </view>
              <view  class="right_20">
                <button class="button-ti" @click="getMoney()">
                  提现
                </button>
              </view>
            </view>
            <view class="heng center_margin top_30"/>
            <view class="top_30 flex_between">
              <view class="center_margin">
                <view class="center_margin body-text1">
                  ¥ {{ (+calculateTotalWithdrawAmount).toFixed(1) }}
                </view>
                <view class="center_margin text6">
                  累计已提现收入
                </view>
              </view>
              <view class="center_margin ">
                <view class="center_margin body-text1">
                  ¥ {{ (+detail.totalToAmount + +detail2.totalAmount - +calculateTotalWithdrawAmount).toFixed(1) }}
                </view>
                <view class="center_margin text6">
                  累计未结算收入
                </view>
              </view>
            </view>

            <view class="text10 center_margin top_30 bottom_20">
              <span class="left_20">
                注：提现满{{ config }}即可，提现后收款后立即到账。
              </span>
            </view>
          </view>
        </view>

        <view class="item center_margin top_20">
          <view class="flex_center_not_just padding_20">
            <view class="bang_body">
              <image class="fu_image top_30" src="@/static/game_cps/goodslist/dibuioc.png">
                <view class="body-text6">推广链接</view>
              </image>
            </view>
          </view>
        </view>

        <view class="item center_margin top_30" v-for="(item, index) in Lists" :key="index">
          <view class="padding_20">
            <view class="flex_between top_20">
              <view class="text6">
                游戏名称
              </view>
              <view class="text71 flex_between">
                {{ item.gameName }}
              </view>
            </view>
            <view class="flex_between top_20">
              <view class="text6">
                推广链接
              </view>
              <view class="text7">
                {{ item.cpsLink }}
              </view>
            </view>
            <view class="flex_between top_20">
              <button class="button-1" @click="() => { creatQrCode(item) }">
                查看二维码
              </button>
              <button class="button-1" @click="() => { copyDuan(item) }">
                复制短链
              </button>
              <button class="button-2" @click="() => { card(item) }">
                分享卡片
              </button>
<!--              <button class="button-2" @click="() => { haibao(item) }">-->
<!--                海报-->
<!--              </button>-->
<!--              <button class="button-3" @click="() => { cancel(item) }">-->
<!--                释放-->
<!--              </button>-->
            </view>
          </view>
        </view>
      </image>

    </view>


    <uni-popup ref="alertDialoghaibao">
      <view class="box_2">
        <view class="box_3">
          <image src="@/static/game_cps/goodslist/feiqq.png" class="image_1"></image>
          <text lines="1" class="text_1">分享给好友赚佣金</text>
        </view>
        <text lines="1" decode="true" class="paragraph_1">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;给自己一个灿烂的阳光，一片自<br/>由的海洋。还有一个好玩的游戏
        </text>
        <view class="image-text_1">
          <image src="@/static/game_cps/goodslist/moimage.png" class="image_2"></image>
          <text lines="1" class="text-group_1">玩咖收藏屋</text>
        </view>
        <view class="box_4">
          <text lines="1" class="paragraph_2">1.保存图片<br/>2.打开微信扫一扫<br/>3.打开相册识别</text>
          <uQrcode ref="code" canvas-id="code" :value="haibaoDetail.imgUrl" :size="size" :options="{
                // foregroundImageSrc: '/static/game_cps/logo.png',//logo
                foregroundImageWidth: size / 3,//logo宽
                foregroundImageHeight: size / 3,//logo高
                foregroundImageBorderRadius: 35,//logo圆角
                backgroundImageSrc: '/static/game_cps/wei.png',//背景图片
                margin: 35,//二维码外边距
                areaColor: '#000000',//二维码绘制区域颜色、底部背景色
                foregroundColor: '#000000',//二维码前景色
              }" @click="remake" @complete="complete($event)">
          </uQrcode>
<!--          <image :src="haibaoDetail.imgUrl" class="image_3"></image>-->
        </view>
        <image src="@/static/game_cps/goodslist/yinhao.png" class="image_4"></image>
        <image src="@/static/game_cps/goodslist/yinhaozuo.png" class="image_5"></image>
      </view>
      <view class="box_5">
        <view class="box_6">
          <view class="image-wrapper_1">
            <image src="@/static/game_cps/goodslist/weixi.png" class="image_6"></image>
          </view>
          <view class="image-wrapper_2">
            <image src="@/static/game_cps/goodslist/pengyou.png" class="image_7"></image>
          </view>
          <view class="image-wrapper_3">
            <image src="@/static/game_cps/goodslist/qqioc.png" class="image_8"></image>
          </view>
          <view class="image-wrapper_4">
            <image src="@/static/game_cps/goodslist/qqpeng.png" class="image_9"></image>
          </view>
        </view>
        <view class="text-wrapper_1">
          <text lines="1" class="text_2">微信好友</text>
          <text lines="1" class="text_3">朋友圈</text>
          <text lines="1" class="text_4">QQ</text>
          <text lines="1" class="text_5">QQ空间</text>
        </view>
        <view class="box_7">
          <view @click="closeAler()" class="text-wrapper_2">
            <text lines="1" class="text_6">取消</text>
          </view>
          <view class="text-wrapper_3">
            <text lines="1" class="text_7">保存图片</text>
          </view>
        </view>
      </view>

      <!--      <l-painter ref="painter"-->
      <!--                 css="width: 750rpx; padding-bottom: 40rpx; background: linear-gradient(,#ff971b 0%, #ff5000 100%)">-->
      <!--        <l-painter-image :src="haibaoDetail.imgUrl"-->
      <!--                         css="margin-left: 40rpx; margin-top: 40rpx; width: 84rpx;  height: 84rpx; border-radius: 50%;"/>-->
      <!--        <l-painter-view css="margin-top: 40rpx; padding-left: 20rpx; display: inline-block">-->
      <!--          <l-painter-text :text="haibaoDetail.title"-->
      <!--                          css="display: block; padding-bottom: 10rpx; color: #fff; font-size: 32rpx; fontWeight: bold"/>-->
      <!--          <l-painter-text text="无需下载即可开玩" css="color: rgba(255,255,255,.7); font-size: 24rpx"/>-->
      <!--        </l-painter-view>-->
      <!--        <l-painter-view-->
      <!--            css="margin-left: 40rpx; margin-top: 30rpx; padding: 32rpx; box-sizing: border-box; background: #fff; border-radius: 16rpx; width: 670rpx; box-shadow: 0 20rpx 58rpx rgba(0,0,0,.15)">-->
      <!--          <l-painter-image :src="haibaoDetail.imgUrl"-->
      <!--                           css="object-fit: cover; object-position: 50% 50%; width: 606rpx; height: 606rpx; border-radius: 12rpx;"/>-->
      <!--          <l-painter-view css="margin-top: 32rpx; font-size: 26rpx; color: #8c5400">-->
      <!--            <l-painter-text text="推游小助手" css="color: #212121; background: #ffb400;"/>-->
      <!--            <l-painter-text text="超多游戏福利" css="margin-left: 16rpx; background: #fff4d9"/>-->
      <!--            <l-painter-text text="分享有礼" css="margin-left: 16rpx; background: #fff4d9"/>-->
      <!--          </l-painter-view>-->
      <!--          <l-painter-view css="margin-top: 30rpx">-->
      <!--            <l-painter-text-->
      <!--                css="line-clamp: 2; color: #333333; line-height: 1.8em; font-size: 36rpx; width: 478rpx; padding-right:32rpx; box-sizing: border-box"-->
      <!--                :text="haibaoDetail.desc"></l-painter-text>-->
      <!--            <l-painter-qrcode css="width: 128rpx; height: 128rpx;" :text="haibaoDetail.linkurl"></l-painter-qrcode>-->
      <!--          </l-painter-view>-->
      <!--        </l-painter-view>-->
      <!--      </l-painter>-->
      <!--      <view class="top_20">-->
      <!--        <button class="button-3" @click="saveClick()">-->
      <!--          保存海报-->
      <!--        </button>-->
      <!--      </view>-->
    </uni-popup>

    <uni-popup ref="alertDialog">
      <view class="popup">
        <view class="flex_center padding_top_20">
          <uQrcode ref="code" canvas-id="code" :value="text" :size="size" :options="{
                // foregroundImageSrc: '/static/game_cps/logo.png',//logo
                foregroundImageWidth: size / 3,//logo宽
                foregroundImageHeight: size / 3,//logo高
                foregroundImageBorderRadius: 35,//logo圆角
                backgroundImageSrc: '/static/game_cps/wei.png',//背景图片
                margin: 35,//二维码外边距
                backgroundPadding: 10,//二维码内边距
                areaColor: '#000000',//二维码绘制区域颜色、底部背景色
                foregroundColor: '#000000',//二维码前景色
              }" @click="remake" @complete="complete($event)">
          </uQrcode>
        </view>
        <button class="button-3 top_20" style="width: 300rpx" @click="save('code')">
          保存二维码
        </button>
      </view>
    </uni-popup>

    <!-- 卡片 -->
    <uni-popup ref="alertDialogCard">
      <view class="popup">
        <view class="flex_center padding_top_20">
          <uQrcode ref="code" canvas-id="code" :value="text" :size="size" :options="{
            // foregroundImageSrc: '/static/game_cps/logo.png',//logo
            foregroundImageWidth: size / 3,//logo宽
            foregroundImageHeight: size / 3,//logo高
            foregroundImageBorderRadius: 35,//logo圆角
            backgroundImageSrc: '/static/game_cps/wei.png',//背景图片
            margin: 35,//二维码外边距
            backgroundPadding: 10,//二维码内边距
            areaColor: '#000000',//二维码绘制区域颜色、底部背景色
            foregroundColor: '#000000',//二维码前景色
          }" @click="remake" @complete="complete($event)">
          </uQrcode>
        </view>
        <button class="button-3 top_20" style="width: 300rpx" @click="save('code')">
          扫码分享游戏
        </button>
      </view>
    </uni-popup>

  </view>
</template>

<script>
import {
  mapState,
  mapGetters
} from "vuex"
import store from "@/store/index.js"
import api from '@/js/api.js'
import wx from 'weixin-js-sdk';
import uQrcode from '@/uni_modules/Sansnn-uQRCode/components/u-qrcode/u-qrcode.vue';
import LPainterText from "@/uni_modules/lime-painter/components/l-painter-text/l-painter-text.vue"
import LPainterView from "@/uni_modules/lime-painter/components/l-painter-view/l-painter-view.vue"
import LPainterImage from "@/uni_modules/lime-painter/components/l-painter-image/l-painter-image.vue"
import LPainterQrcode from "@/uni_modules/lime-painter/components/l-painter-qrcode/l-painter-qrcode.vue"
import LPainter from "@/uni_modules/lime-painter/components/l-painter/l-painter.vue"
import env from "@/js/config.js"
const url = `${env.BASE_URL}`
const name = `${url}/file/upload`
export default {
  components: {
    LPainterText,
    LPainterView,
    LPainterImage,
    LPainterQrcode,
    LPainter,
    uQrcode
  },
  data() {
    return {
      haibaoDetail: '',
      path: '',
      withdrawRadio: 0,
      range: [
        {value: 0, text: "银行卡"},
        {value: 1, text: "支付宝"},
        {value: 2, text: "微信"},
        // {value: 3, text: "打款当前微信"},
      ],
      req: {
        type: 3,
        realName: '',
        alipayAccount: '', // 支付宝账号
        alipayName: '',
        amount: 0,
        wpay: '',
        memo: '',
        phone: '',
        card: '',
        money: 0,
        bankBranch: '',
        idCardFrontImage: '',
        idCardBackImage: '',
        redioAmount: 0
      },
      text: 'uQRCode',//二维码的值
      size: 100,//二维码尺寸
      popupText: '—\\8月15-9月15号将上架以下数款热',
      List: [],
      type: 1,
      Lists: [],
      noMore: false,
      pageNum: 1,
      hasData: true,
      config: 0,
      baseFormData: {},
      rules: {
        phone: {
          rules: [{
            required: true,
            errorMessage: '手机号有误'
          }]
        },
        password: {
          rules: [{
            required: true,
            errorMessage: '密码有误'
          }]
        },
      },
      detail: {},
      detail2: {},
      calculateTotalWithdrawAmount: 0,
      imageValue: [],
      info: {}
    };
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
    this.onRefresh()
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
    api.userInfo().then(res => {
      if (res.code == 200) {
        this.info = res.data
      }
    })
    // 统计用户成功提现的总金额
    api.calculateTotalWithdrawAmount(null).then(res => {
      if (res.code == 200) {
        this.calculateTotalWithdrawAmount = res.data
      }
    })
    // 配置信息
    api.getData(null).then(res => {
      if (res.code == 200) {
        this.config = res.data.withdrawMaxAmount ? res.data.withdrawMaxAmount : 0;
        this.withdrawRadio = res.data.withdrawRadio ? res.data.withdrawRadio : 0;
      }
    })

  },
  watch: {
    'req.amount': {
      handler(val) {
        this.req.redioAmount = (Math.round(this.req.amount * this.withdrawRadio));
      },
      immediate: true,
    }
  },
  computed: {
    ...mapState({
      userInfo: state => state.user.userInfo
    }),
  },
  onReachBottom() {
    if (this.noMore) return
    this.pageNum++
    this.getList()
  },
  onPullDownRefresh() {
    this.onRefresh()
  },
  methods: {
    saveClick() {
      console.log('saveClick')
      // 生成图片
      this.$refs.painter.canvasToTempFilePathSync({
        fileType: "jpg",
        // 如果返回的是base64是无法使用 saveImageToPhotosAlbum，需要设置 pathType为url
        pathType: 'url',
        quality: 0.9,
        success: (res) => {
          console.log(res.tempFilePath);
          // 非H5 保存到相册
          uni.saveImageToPhotosAlbum({
            filePath: res.tempFilePath,
            success: function () {
              uni.showToast({
                title: '图片已保存'
              })
            },
            fail: function () {
              uni.showToast({
                icon: 'error',
                title: '图片保存失败'
              })
            }
          });
        },
      });
    },
    cancel(val) {
      uni.showModal({
        title: '提示',
        content: '释放后将失去这个游戏推广资格！',
        success: function (res) {
          if (res.confirm) {
            api.release(val.id).then(res => {
              if (res.code == 200) {
                this.Tips("释放成功")
                setTimeout(() => {
                  this.onRefresh()
                }, 1000)
              }
            })
          } else if (res.cancel) {
            console.log('用户点击取消');
          }
        }
      });
      console.log(val, "val");
    },
    async getPayouts() {
      // 立即打款
      if (this.req.type == 3) {
        // 微信直接打款
        api.cpsWithdrawPayouts(this.req).then(async res => {
          console.log(res.data);
          if (res.code == 200) {
            // #ifdef MP-WEIXIN
            uni.requestMerchantTransfer({
              "mchId": "1612941426",
              "appId": "wx52cfdac6317629b1",
              "package": res.data.packageInfo,
              success: (res) => {
                console.log(res)
              },
              fail: (res) => {
                console.log(res.errMsg)
              },
              complete: (res) => {
                console.log(res.errMsg)
              }
            })
            // #endif


            // #ifdef H5
            let {data} = await api.getWxconfig({url: env.BASE_WEB_NRL})
            wx.config({
              debug: false,
              appId: data.appId,
              timestamp: data.timestamp,
              nonceStr: data.nonceStr,
              signature: data.signature,
              jsApiList: ['chooseImage', 'previewImage']  // 使用标准API测试
            });
            wx.ready(function () {
              wx.checkJsApi({
                jsApiList: ['requestMerchantTransfer'],
                success: function (res1) {
                  if (res1.checkResult['requestMerchantTransfer']) {
                    WeixinJSBridge.invoke('requestMerchantTransfer', {
                          mchId: '1705531751',
                          appId: 'wx03a3adb2f2a5debe',
                          package: res.data.packageInfo,
                        },
                        function (res1) {
                          if (res1.err_msg === 'requestMerchantTransfer:ok') {
                            // res.err_msg将在页面展示成功后返回应用时返回success，并不代表付款成功
                            alert('你的微信版本过低，请更新至最新版本。11');
                          }
                          alert(res1);
                        }
                    );
                  } else {
                    alert('你的微信版本过低，请更新至最新版本。');
                  }
                },
              });
            });
            // #endif
          }
        })
        return;
      }
      if (!this.req.amount) {
        this.Tips("请输入金额！")
        return;
      }
      if (!this.req.phone) {
        this.Tips("请输入手机号！")
        return;
      }
      if (this.req.type == 0) {
        if (!this.req.realName) {
          this.Tips("请输入真实姓名！")
          return;
        }
        if (!this.req.card) {
          this.Tips("请输入卡号！")
          return;
        }
        if (!this.req.bankBranch) {
          this.Tips("请输入开户行信息！")
          return;
        }
      }
      if (this.req.type == 1) {
        if (!this.req.alipayName) {
          this.Tips("请输入支付宝真实姓名！")
          return;
        }
        if (!this.req.alipayAccount) {
          this.Tips("请输入支付宝账号！")
          return;
        }
      }
      api.cpsWithdraw(this.req).then(res => {
        if (res.code == 200) {
          this.Tips("申请成功，请等待一会会~")
        }
      })
      this.req = {
        type: 0,
        realName: '',
        alipayAccount: '', // 支付宝账号
        alipayName: '',
        amount: 0,
        wpay: '',
        memo: '',
        phone: '',
        card: '',
        money: 0
      }
    },
    // 获取上传状态
    select(e) {
      uni.uploadFile({
        header: {Authorization: store.state.user.token},
        url: name,
        filePath: e.tempFilePaths[0],
        name: 'file',
        success: (uploadFileRes) => {
          var parse = JSON.parse(uploadFileRes.data);
          this.req.wpay = url + parse.fileName;
        },
        fail: (err) => {
          console.log(err);
        }
      })
    },
    select1(e) {
      uni.uploadFile({
        header: {Authorization: store.state.user.token},
        url: name,
        filePath: e.tempFilePaths[0],
        name: 'file',
        success: (uploadFileRes) => {
          var parse = JSON.parse(uploadFileRes.data);
          this.req.idCardFrontImage = url + parse.fileName
        },
        fail: (err) => {
          console.log(err);
        }
      })
    },
    select2(e) {
      uni.uploadFile({
        header: {Authorization: store.state.user.token},
        url: name,
        filePath: e.tempFilePaths[0],
        name: 'file',
        success: (uploadFileRes) => {
          var parse = JSON.parse(uploadFileRes.data);
          this.req.idCardBackImage = url + parse.fileName
        },
        fail: (err) => {
          console.log(err);
        }
      })
    },
    // 获取上传进度
    progress(e) {
      console.log('上传进度：', e)
    },
    // 上传成功
    success(e) {
      console.log('上传成功')
    },
    // 上传失败
    fail(e) {
      console.log('上传失败：', e)
    },
    change(e) {
      this.req.type = e;
    },
    withdrawRecord(){
      uni.navigateTo({url: '/pages/subpages/withdrawRecord/withdrawRecord'})
    },
    getMoney() {
      uni.navigateTo({url: '/pages/subpages/withdraw/withdraw'})
    },
    complete(e) {
      if (e.success) {
        console.log('生成成功');
      } else {
        console.log('生成失败');
      }
    },
    //刷新二维码
    remake() {
      const ref = this.$refs['code'];
      ref.remake();
    },
    //保存到手机
    save() {
      uni.showLoading({
        title: '保存中',
        mask: true
      });
      const ref = this.$refs['code'];
      ref.save({
        success: res => {
          uni.hideLoading();
          uni.showToast({
            icon: 'success',
            title: '保存成功'
          });
        },
        fail: err => {
          uni.showToast({
            icon: 'none',
            title: '保存失败'
          });
        }
      });
    },
    creatQrCode(val) {
      console.log(val, "val");
      if (val.remark) {
        this.text = val.remark
        this.$refs.alertDialog.open()
      } else {
        this.text = val.cpsLink
        this.$refs.alertDialog.open()
      }
    },
    // 复制短链
    copyDuan(val) {
      console.log(val.remark, "==")
      if (val.remark) {
        this.copy(val.remark)
        return;
      }
      // uni.showLoading({
      //   title: '申请中请稍等',
      //   mask: true
      // });
      // uni.request({
      //   url: "https://www.tainma.wyntf.cn/api/v1/generate",
      //   method: "POST",
      //   data: {"url": val.cpsLink, "valid": -1},
      //   success: (res) => {
      //     uni.hideLoading();
      //     console.log(res.data, "res.data.shortUrl")
      //     console.log(res.data.data.shortUrl, "res.data.shortUrl")
      //     this.copy(res.data.data.shortUrl)
      //   },
      //   fail: (err) => {
      //     this.Tips('短链异常请稍后重试！');
      //   }
      // })
    },
    card(val) {
      console.log(val, "val");
      this.text = `${env.CARD_ADDRESS}?gameId=${val.id}&url=${env.BASE_URL}`
      console.log(this.text)
      this.$refs.alertDialogCard.open()
    },
    // 复制海报
    haibao(val) {
      api.getGameDetail({id: val.id}).then(res => {
        if (res.code == 200) {
          this.haibaoDetail = res.data
          this.$refs.alertDialoghaibao.open()
        }
      })
    },
    closeAler() {
      this.$refs.alertDialoghaibao.close()
    },

    copy(val) {
      console.log(val, "====")
      // #ifndef H5
      //uni.setClipboardData方法就是讲内容复制到粘贴板
      uni.setClipboardData({
        data: val, //要被复制的内容
        success: () => { //复制成功的回调函数
          uni.showToast({ //提示
            title: '已复制'
          })
        }
      });
      // #endif

      // #ifdef H5
      let textarea = document.createElement("textarea")
      textarea.value = val
      textarea.readOnly = "readOnly"
      document.body.appendChild(textarea)
      textarea.select() // 选中文本内容
      textarea.setSelectionRange(0, val.length)
      document.execCommand("copy")
      textarea.remove()
      this.Tips("已复制")
      // #endif
    },
    onRefresh() {
      this.pageNum = 1
      this.noMore = false
      this.getList(true)
    },
    getList(reload = false) {
      // 查询游戏上级收益信息列表
      api.cpsApplyOrderRecord(this.pageNum, 2).then(res => {
        reload && uni.stopPullDownRefresh()
        if (res.rows.length == 0 && this.pageNum == 1) {
          this.hasData = false
        } else {
          this.hasData = true
          if (res.rows.length < this.pageSize) {
            this.noMore = true
          }
        }
        if (reload) {
          this.Lists = res.rows
        } else {
          this.Lists = [...this.Lists, ...res.rows]
        }
      })
    },
    formSubmit() {

    },
    openPopup() {
      this.$refs.alertDialog.open()
    },
    closePo() {
      this.$refs.alertDialog.close()
    },
  }
}
</script>

<style lang="scss" scoped>
.popup {
  width: 450rpx;
  height: 500rpx;
  background: #FFFFFF;
  border-radius: 18rpx;
}

.popup1 {
  width: 450rpx;
  padding: 20rpx;
  background: #FFFFFF;
  border-radius: 18rpx;
  height: 800rpx;
  overflow-y: auto;
}

.top_title_top {
  width: 697rpx;
  height: 93rpx;
  background: #FFFFFF;
  border-radius: 33rpx;
  margin: 0px auto;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.bang_body {
  display: flex;
  flex-direction: column;
}

.body-text6 {
  position: relative;
  font-family: Alibaba PuHuiTi 2.0;
  font-weight: normal;
  font-size: 32rpx;
  color: #000000;
  line-height: 44rpx;
}

.button-1 {
  width: 193rpx;
  height: 53rpx;
  background: #F2F2F2;
  border-radius: 27rpx;
  border: 2rpx solid #DDDDDD;
  line-height: 50rpx;
  text-align: center;
  font-style: normal;
  font-family: Alibaba PuHuiTi 2.0;
  font-weight: normal;
  font-size: 29rpx;
  color: #666666;
}

.button-2 {
  width: 180rpx;
  height: 53rpx;
  background: linear-gradient(90deg, #AB78FD, #8167FC);
  border-radius: 27rpx;
  text-align: center;
  line-height: 50rpx;
  font-style: normal;
  font-family: Alibaba PuHuiTi 2.0;
  font-weight: normal;
  font-size: 29rpx;
  color: #FFFFFF;
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

.top {
  position: absolute;
  width: 100%;
  height: 100%;
  background-size: 100% 100%;

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

.heng {
  width: 670rpx;
  height: 2rpx;
  background-color: #E9E9E9;
}

.text10 {
  width: 670rpx;
  height: 54rpx;
  background: #FFF9EA;
  border-radius: 12rpx;
  font-family: PingFangSC, PingFang SC;
  font-weight: 400;
  font-size: 24rpx;
  color: #FF9C46;
  line-height: 50rpx;
  font-style: normal;
}

.button-ti {
  width: 180rpx;
  height: 67rpx;
  background: linear-gradient(90deg, #AB78FD, #8167FC);
  border-radius: 33rpx;
  font-family: PingFangSC, PingFang SC;
  font-weight: 500;
  font-size: 30rpx;
  color: #FFFFFF;
  font-style: normal;
  line-height: 70rpx;
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
  line-height: 34rpx;
  text-align: center;
  font-style: normal;
}


.text1 {
  font-family: PingFangSC, PingFang SC;
  font-weight: 400;
  font-size: 24rpx;
  color: rgba(255, 255, 255, 0.8);
  line-height: 34rpx;
  text-align: left;
  font-style: normal;
}

.text2 {
  font-family: PingFangSC, PingFang SC;
  font-weight: 500;
  font-size: 32rpx;
  color: #FFFFFF;
  line-height: 44rpx;
  text-align: left;
  font-style: normal;
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
  width: 400rpx;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  font-family: PingFangSC, PingFang SC;
  font-weight: 500;
  font-size: 28rpx;
  color: #000000;
  line-height: 40rpx;
  text-align: center;
  font-style: normal;
}

.text71 {
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
  position: relative;
  width: 697rpx;
  background: #FFFFFF;
  border-radius: 33rpx;
}


.container {
  width: 100%;
  background-color: #F2F2F2;
  min-height: 100vh;
}

.active1 {
  width: 376rpx;
  height: 6rpx;
  background: #5ACF86;
}

.image {
  width: 310rpx;
  height: 100rpx;
  background: url('@/static/game_cps/bg_huoyue_01@2x.png');
  background-size: 100% 100%;
}

.image1 {
  width: 310rpx;
  height: 100rpx;
  background: url('@/static/game_cps/bg_shouyi_02@2x.png');
  background-size: 100% 100%;
}

.fu_image {
  position: absolute;
  width: 156.67rpx;
  height: 6rpx;
}

.label_1 {
  width: 32rpx;
  height: 32rpx;
}

.body {
  width: 697rpx;
  height: 413rpx;
  border-radius: 33rpx;
  background: #FFFFFF;

  &-text {
    font-family: Alibaba PuHuiTi 2.0;
    font-weight: normal;
    font-size: 40rpx;
    color: #000000;
    line-height: 44rpx;
    height: 10rpx;
  }

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

  &-lv {
    width: 6rpx;
    height: 20rpx;
    background: #5ACF86;
    border-radius: 37rpx;
  }

  &-text {
    font-family: PingFangSC, PingFang SC;
    font-weight: 500;
    font-size: 28rpx;
    color: #000000;
    line-height: 40rpx;
    text-align: right;
    font-style: normal;
  }

  &-text1 {
    font-family: PingFangSC, PingFang SC;
    font-weight: 500;
    font-size: 28rpx;
    color: #000000;
    line-height: 40rpx;
    text-align: center;
    font-style: normal;
  }
}

::v-deep .uni-section .uni-section-header__decoration {
  background-color: #5ACF86
}


.box_2 {
  position: relative;
  width: 648rpx;
  height: 814rpx;
  background: url('https://apk.zhizuan.xyz/qqimage1.png');
  background-size: 100% 100%;
  display: flex;
  flex-direction: column;
  margin: 213rpx 0 0 51rpx;
}

.box_3 {
  width: 451rpx;
  height: 56rpx;
  flex-direction: row;
  display: flex;
  justify-content: space-between;
  margin: 99rpx 0 0 99rpx;
}

.image_1 {
  width: 56rpx;
  height: 56rpx;
}

.text_1 {
  width: 375rpx;
  height: 46rpx;
  overflow-wrap: break-word;
  color: rgba(102, 51, 204, 1);
  font-size: 48rpx;
  font-family: AlibabaPuHuiTi_2_75_SemiBold;
  font-weight: normal;
  text-align: left;
  white-space: nowrap;
  line-height: 44rpx;
  margin-top: 5rpx;
}

.paragraph_1 {
  width: 481rpx;
  height: 80rpx;
  overflow-wrap: break-word;
  color: rgba(102, 51, 204, 1);
  font-size: 32rpx;
  font-family: AlibabaPuHuiTi_2_55_Regular;
  font-weight: normal;
  text-align: center;
  line-height: 44rpx;
  margin: 77rpx auto 84rpx;
}

.image-text_1 {
  width: 282rpx;
  height: 120rpx;
  flex-direction: row;
  display: flex;
  justify-content: space-between;
  margin: 53rpx 0 0 98rpx;
}

.image_2 {
  width: 120rpx;
  height: 120rpx;
}

.text-group_1 {
  width: 154rpx;
  height: 31rpx;
  overflow-wrap: break-word;
  color: rgba(0, 0, 0, 1);
  font-size: 32rpx;
  font-family: AlibabaPuHuiTi_2_75_SemiBold;
  font-weight: normal;
  text-align: justifyLeft;
  white-space: nowrap;
  line-height: 44rpx;
  margin-top: 73rpx;
}

.box_4 {
  width: 467rpx;
  height: 200rpx;
  flex-direction: row;
  display: flex;
  justify-content: space-between;
  margin: 13rpx 0 115rpx 98rpx;
}

.paragraph_2 {
  width: 224rpx;
  height: 126rpx;
  overflow-wrap: break-word;
  color: rgba(102, 51, 204, 1);
  font-size: 29rpx;
  font-family: AlibabaPuHuiTi_2_55_Regular;
  font-weight: normal;
  text-align: left;
  line-height: 44rpx;
  margin-top: 37rpx;
}

.image_3 {
  width: 200rpx;
  height: 200rpx;
}

.image_4 {
  position: absolute;
  left: 71rpx;
  top: 219rpx;
  width: 37rpx;
  height: 31rpx;
}

.image_5 {
  position: absolute;
  left: 542rpx;
  top: 294rpx;
  width: 37rpx;
  height: 31rpx;
}

.box_5 {
  width: 750rpx;
  height: 597rpx;
  margin-bottom: 1rpx;
  display: flex;
  flex-direction: column;
}

.box_6 {
  width: 597rpx;
  height: 107rpx;
  flex-direction: row;
  display: flex;
  margin: 47rpx 0 0 79rpx;
}

.image-wrapper_1 {
  background-color: rgba(255, 255, 255, 0.300000);
  border-radius: 33%;
  height: 107rpx;
  display: flex;
  flex-direction: column;
  width: 107rpx;
}

.image_6 {
  width: 72rpx;
  height: 72rpx;
  margin: 17rpx 0 0 17rpx;
}

.image-wrapper_2 {
  background-color: rgba(255, 255, 255, 0.300000);
  border-radius: 33%;
  height: 107rpx;
  margin-left: 59rpx;
  display: flex;
  flex-direction: column;
  width: 107rpx;
}

.image_7 {
  width: 72rpx;
  height: 72rpx;
  margin: 18rpx 0 0 18rpx;
}

.image-wrapper_3 {
  background-color: rgba(255, 255, 255, 0.300000);
  border-radius: 33%;
  height: 107rpx;
  margin-left: 56rpx;
  display: flex;
  flex-direction: column;
  width: 107rpx;
}

.image_8 {
  width: 72rpx;
  height: 72rpx;
  margin: 18rpx 0 0 17rpx;
}

.image-wrapper_4 {
  background-color: rgba(255, 255, 255, 0.300000);
  border-radius: 33%;
  height: 107rpx;
  margin-left: 55rpx;
  display: flex;
  flex-direction: column;
  width: 107rpx;
}

.image_9 {
  width: 72rpx;
  height: 72rpx;
  margin: 17rpx 0 0 18rpx;
}

.text-wrapper_1 {
  width: 597rpx;
  height: 29rpx;
  flex-direction: row;
  display: flex;
  margin: 19rpx 0 0 75rpx;
}

.text_2 {
  width: 114rpx;
  height: 27rpx;
  overflow-wrap: break-word;
  color: rgba(255, 255, 255, 1);
  font-size: 29rpx;
  font-family: AlibabaPuHuiTi_2_55_Regular;
  font-weight: normal;
  text-align: center;
  white-space: nowrap;
  line-height: 44rpx;
  margin-top: 1rpx;
}

.text_3 {
  width: 83rpx;
  height: 27rpx;
  overflow-wrap: break-word;
  color: rgba(255, 255, 255, 1);
  font-size: 29rpx;
  font-family: AlibabaPuHuiTi_2_55_Regular;
  font-weight: normal;
  text-align: center;
  white-space: nowrap;
  line-height: 44rpx;
  margin: 1rpx 0 0 67rpx;
}

.text_4 {
  width: 41rpx;
  height: 25rpx;
  overflow-wrap: break-word;
  color: rgba(255, 255, 255, 1);
  font-size: 29rpx;
  font-family: AlibabaPuHuiTi_2_55_Regular;
  font-weight: normal;
  text-align: center;
  white-space: nowrap;
  line-height: 44rpx;
  margin: 3rpx 0 0 102rpx;
}

.text_5 {
  width: 99rpx;
  height: 29rpx;
  overflow-wrap: break-word;
  color: rgba(255, 255, 255, 1);
  font-size: 29rpx;
  font-family: AlibabaPuHuiTi_2_55_Regular;
  font-weight: normal;
  text-align: center;
  white-space: nowrap;
  line-height: 44rpx;
  margin-left: 92rpx;
}

.box_7 {
  width: 600rpx;
  height: 93rpx;
  flex-direction: row;
  display: flex;
  justify-content: space-between;
  margin: 88rpx 0 215rpx 75rpx;
}

.text-wrapper_2 {
  background-color: rgba(255, 255, 255, 0.300000);
  border-radius: 47rpx;
  height: 93rpx;
  display: flex;
  flex-direction: column;
  width: 227rpx;
}

.text_6 {
  width: 74rpx;
  height: 37rpx;
  overflow-wrap: break-word;
  color: rgba(255, 255, 255, 1);
  font-size: 40rpx;
  font-family: AlibabaPuHuiTi_2_75_SemiBold;
  font-weight: normal;
  text-align: center;
  white-space: nowrap;
  line-height: 44rpx;
  margin: 29rpx 0 0 76rpx;
}

.text-wrapper_3 {
  width: 333rpx;
  height: 93rpx;
  background: linear-gradient(90deg, #AB78FD, #8167FC);
  border-radius: 47rpx;
  display: flex;
  flex-direction: column;
  width: 333rpx;
}

.text_7 {
  width: 155rpx;
  height: 38rpx;
  overflow-wrap: break-word;
  color: rgba(255, 255, 255, 1);
  font-size: 40rpx;
  font-family: AlibabaPuHuiTi_2_75_SemiBold;
  font-weight: normal;
  text-align: center;
  white-space: nowrap;
  line-height: 44rpx;
  margin: 28rpx 0 0 89rpx;
}
</style>
