<template>
  <!--  "BASE_URL":"https://lxx.nanjingtianma.top",-->
  <view>
    <view class="container">
      <image class="top" src="@/static/game_cps/bakimage.png">
        <view style="height: 100rpx"/>
        <view style="position: relative">
          <view class="top-title">推游小助手</view>
          <view class="body center_margin">
            <view class="section_2">
              <view @click="goRealName" class="group_1">
                <image src="@/static/game_cps/money/card.png" class="image_3 top_10"></image>
                <text lines="1" class="text_2">实名认证</text>
                <image src="@/static/game_cps/money/zuo.png" class="label_1"></image>
              </view>
              <view class="group_2"></view>
              <view @click="alertDialog6" class="group_3">
                <image  src="@/static/game_cps/money/jishiben.png" class="image_4 top_10"></image>
                <text lines="1" class="text_3">提现规则</text>
                <image src="@/static/game_cps/money/zuo.png" class="label_2"></image>
              </view>
              <view class="group_4"></view>
              <view @click="openPopup4" class="group_5">
                <image src="@/static/game_cps/money/shanzi.png" class="image_5 top_10"></image>
                <text lines="1" class="text_4">发展渠道</text>
                <image src="@/static/game_cps/money/zuo.png" class="label_3"></image>
              </view>
              <view class="group_6"></view>
              <view @click="alertDialog2" class="group_7">
                <image src="@/static/game_cps/money/kefufu.png" class="image_6 top_10"></image>
                <text lines="1" class="text_5">加入群聊</text>
                <image src="@/static/game_cps/money/zuo.png" class="label_4"></image>
              </view>
              <view class="group_8"></view>
              <view @click="alertDialog3" class="group_9">
                <image src="@/static/game_cps/money/kefu.png" class="image_7 top_10"></image>
                <text lines="1" class="text_6">在线客服</text>
                <image src="@/static/game_cps/money/zuo.png" class="label_5"></image>
              </view>
              <view class="group_10"></view>
              <view @click="alertDialog5" class="group_11">
                <image src="@/static/game_cps/money/gantan.png" class="image_8 top_10"></image>
                <text lines="1" class="text_7">关于我们</text>
                <image src="@/static/game_cps/money/zuo.png" class="label_6"></image>
              </view>
            </view>
          </view>
        </view>
      </image>
    </view>


    <uni-popup ref="alertDialog4" background-color="transparent">
      <view class="page">
        <view class="section_8">
          <view class="section_4">
            <view class="section_3 padding_10">
              <text lines="1" class="text_1">提示</text>
              <text lines="1" class="text_9 top_50">您确定要申请发展渠道功能吗?</text>
              <view class="group_16">
                <view @click="openPopup4Close" class="text-wrapper_1">
                  <text lines="1" class="text_16">取消</text>
                </view>
                <view @click="openPopup4Close" class="text-wrapper_2">
                  <text lines="1" class="text_8">确定</text>
                </view>
              </view>
            </view>
          </view>
        </view>
      </view>
    </uni-popup>


    <uni-popup ref="alertDialog2" :is-mask-click="true" background-color="transparent">
      <view class="page">
        <view class="section_9">
          <image show-menu-by-longpress class="er_image" src="https://apk.zhizuan.xyz/image.png">
          </image>
          <view class="er_image_text top_20">
            长按识别二维码，联系群聊。
          </view>
        </view>
      </view>
    </uni-popup>

    <uni-popup ref="alertDialog3" :is-mask-click="true" background-color="transparent">
      <view class="page">
        <view class="section_9">
          <image show-menu-by-longpress class="er_image" src="https://apk.zhizuan.xyz/image.png">
          </image>
          <view class="er_image_text top_20">
            长按识别二维码，加入客服。
          </view>
        </view>
      </view>
    </uni-popup>

    <uni-popup ref="alertDialog5" :is-mask-click="true" background-color="transparent">
      <view class="page">
        <view class="section_10">
          <view class="about_us_text top_40">
            关于我们
          </view>
          <view v-html="notice4.noticeContent" class="about_body">
          </view>
          <view @click="alertDialog5Close" class="text-wrapper_4 ">
            <text lines="1" class="text_10">确定</text>
          </view>
        </view>
      </view>
    </uni-popup>


    <uni-popup ref="alertDialog6" :is-mask-click="true" background-color="transparent">
      <view class="page">
        <view class="section_10">
          <view class="about_us_text top_40">
            提现规则
          </view>
          <view v-html="notice2.noticeContent" class="about_body">
          </view>
          <view @click="alertDialog6Close" class="text-wrapper_4 ">
            <text lines="1" class="text_10">确定</text>
          </view>
        </view>
      </view>
    </uni-popup>
  </view>
</template>

<script>
import api from "@/js/api.js";

export default {
  data() {
    return {
      notice4: {},
      notice2: {},
    };
  },
  onShow() {
    // 关于我们
    api.notice(4).then((res) => {
      if (res.code === 200) this.notice4 = res.rows[0];
    });
    // 提现规则
    api.notice(3).then((res) => {
      if (res.code === 200) this.notice2 = res.rows[0];
    });
  },
  watch: {},
  computed: {},
  methods: {
    alertDialog6() {
      this.$refs.alertDialog6.open();
    },
    alertDialog6Close() {
      this.$refs.alertDialog6.close();
    },
    alertDialog5() {
      this.$refs.alertDialog5.open();
    },
    alertDialog5Close() {
      this.$refs.alertDialog5.close();
    },
    alertDialog3() {
      this.$refs.alertDialog3.open();
    },
    alertDialog2() {
      this.$refs.alertDialog2.open();
    },
    alertDialog1() {
      this.$refs.alertDialog1.open();
    },
    alertDialog1Close() {
      this.$refs.alertDialog1.close();
    },
    openPopup4() {
      this.$refs.alertDialog4.open();
    },
    openPopup4Close() {
      this.$refs.alertDialog4.close();
    },
    goRealName() {
      uni.navigateTo({url: '/pages/subpages/realName/realName'})
    },
  }
}
</script>

<style lang="scss" scoped>
.about_us_text {
  height: 30rpx;
  font-family: Alibaba PuHuiTi 2.0;
  font-weight: normal;
  font-size: 32rpx;
  color: #000000;
  line-height: 36rpx;
  display: flex;
  justify-content: center;
}

.text-wrapper_4 {
  width: 267rpx;
  height: 67rpx;
  background: linear-gradient(90deg, #AB78FD, #8167FC);
  border-radius: 33rpx;
  display: flex;
  margin: 50rpx auto 0rpx;
}

.about_body {
  width: 573rpx;
  font-family: Alibaba PuHuiTi 2.0;
  font-weight: normal;
  font-size: 24rpx;
  color: #666666;
  line-height: 36rpx;
  display: flex;
  justify-content: center;
  max-height: 400px;
  overflow-y: auto;
  margin: 40rpx auto 0rpx;
}


.er_image {
  margin: 80rpx 120rpx 0rpx;
  width: 294rpx;
  height: 294rpx;
}

.er_image_text {
  margin: 30rpx 115rpx 0rpx;
  font-family: Alibaba PuHuiTi 2.0;
  font-weight: normal;
  font-size: 27rpx;
  color: #000000;
  line-height: 36rpx;
}

.section_9 {
  width: 533rpx;
  height: 533rpx;
  background: #FFFFFF;
  border-radius: 33rpx;
}

.section_10 {
  width: 657rpx;
  height: 1000rpx;
  background: #FFFFFF;
  border-radius: 33rpx;
}

.page {
  //position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
}

.section_8 {
  height: 1624rpx;
  background: url(https://lanhu-oss-2537-2.lanhuapp.com/psaw1tbbm36zdygfdnjfactgomqpzqwe7d015b0b3-9557-48b7-8ba0-06b78cbdd7cb) 100% no-repeat;
  background-size: 100% 100%;
  display: flex;
  flex-direction: column;
  width: 750rpx;
}

.section_4 {
  height: 1624rpx;
  background: url(https://lanhu-oss-2537-2.lanhuapp.com/ps47fooj9vokq5plgz8yaqw6l366tttp6wif27cbade-12c1-4a14-b785-607859e3a47d) 100% no-repeat;
  background-size: 100% 100%;
  display: flex;
  flex-direction: column;
  width: 750rpx;
}

.section_3 {
  background-color: rgba(255, 255, 255, 1.000000);
  border-radius: 33rpx;
  width: 533rpx;
  height: 373rpx;
  display: flex;
  flex-direction: column;
  margin: 625rpx 0 0 109rpx;
}

.text_1 {
  width: 77rpx;
  height: 37rpx;
  overflow-wrap: break-word;
  color: rgba(0, 0, 0, 1);
  font-size: 40rpx;
  font-family: AlibabaPuHuiTi_2_75_SemiBold;
  font-weight: normal;
  text-align: left;
  white-space: nowrap;
  line-height: 44rpx;
  margin: 53rpx 0 0 227rpx;
}

.text_8 {
  width: 76rpx;
  height: 37rpx;
  overflow-wrap: break-word;
  color: #FFFFFF;
  font-size: 40rpx;
  font-family: AlibabaPuHuiTi_2_75_SemiBold;
  font-weight: normal;
  text-align: center;
  white-space: nowrap;
  line-height: 44rpx;
  margin: 22rpx 0 0 76rpx;
}

.text_10 {
  color: #FFFFFF;
  font-size: 40rpx;
  font-family: AlibabaPuHuiTi_2_75_SemiBold;
  font-weight: normal;
  text-align: center;
  white-space: nowrap;
  line-height: 44rpx;
  margin: 15rpx 0 0 90rpx;
}

.group_16 {
  width: 480rpx;
  height: 80rpx;
  flex-direction: row;
  display: flex;
  justify-content: space-between;
  margin: 74rpx 0 40rpx 27rpx;
}

.text-wrapper_1 {
  background-color: rgba(245, 239, 255, 1.000000);
  border-radius: 40rpx;
  height: 80rpx;
  display: flex;
  flex-direction: column;
  width: 227rpx;
}

.text_16 {
  width: 76rpx;
  height: 37rpx;
  overflow-wrap: break-word;
  color: rgba(153, 102, 255, 1);
  font-size: 40rpx;
  font-family: AlibabaPuHuiTi_2_75_SemiBold;
  font-weight: normal;
  text-align: center;
  white-space: nowrap;
  line-height: 44rpx;
  margin: 22rpx 0 0 76rpx;
}

.text-wrapper_2 {
  background: linear-gradient(90deg, #AB78FD, #8167FC);
  border-radius: 40rpx;
  height: 80rpx;
  display: flex;
  flex-direction: column;
  width: 227rpx;
}

.text_9 {
  height: 26rpx;
  font-family: Alibaba PuHuiTi 2.0;
  font-weight: normal;
  font-size: 27rpx;
  text-align: center;
  color: #000000;
  line-height: 44rpx;
}

.text_4 {
  width: 79rpx;
  height: 38rpx;
  overflow-wrap: break-word;
  color: rgba(255, 255, 255, 1);
  font-size: 40rpx;
  font-family: AlibabaPuHuiTi_2_75_SemiBold;
  font-weight: normal;
  text-align: center;
  white-space: nowrap;
  line-height: 44rpx;
  margin: 21rpx 0 0 73rpx;
}

.section_2 {
  background-color: rgba(255, 255, 255, 1.000000);
  border-radius: 33rpx;
  width: 697rpx;
  height: 733rpx;
  display: flex;
  flex-direction: column;
}

.group_1 {
  width: 641rpx;
  height: 52rpx;
  flex-direction: row;
  display: flex;
  margin: 61rpx 0 0 31rpx;
}

.image_3 {
  width: 52rpx;
  height: 52rpx;
}

.text_2 {
  width: 123rpx;
  height: 30rpx;
  overflow-wrap: break-word;
  color: rgba(0, 0, 0, 1);
  font-size: 32rpx;
  font-family: AlibabaPuHuiTi_2_55_Regular;
  font-weight: normal;
  text-align: left;
  white-space: nowrap;
  line-height: 44rpx;
  margin: 11rpx 0 0 23rpx;
}

.label_1 {
  width: 32rpx;
  height: 32rpx;
  margin: 11rpx 0 0 411rpx;
}

.group_2 {
  background-color: rgba(238, 238, 239, 1.000000);
  width: 630rpx;
  height: 1rpx;
  display: flex;
  flex-direction: column;
  margin: 27rpx 0 0 33rpx;
}

.group_3 {
  width: 641rpx;
  height: 52rpx;
  flex-direction: row;
  display: flex;
  margin: 28rpx 0 0 31rpx;
}

.image_4 {
  width: 52rpx;
  height: 52rpx;
}

.text_3 {
  width: 122rpx;
  height: 29rpx;
  overflow-wrap: break-word;
  color: rgba(0, 0, 0, 1);
  font-size: 32rpx;
  font-family: AlibabaPuHuiTi_2_55_Regular;
  font-weight: normal;
  text-align: left;
  white-space: nowrap;
  line-height: 44rpx;
  margin: 11rpx 0 0 23rpx;
}

.label_2 {
  width: 32rpx;
  height: 32rpx;
  margin: 11rpx 0 0 413rpx;
}

.group_4 {
  background-color: rgba(238, 238, 239, 1.000000);
  width: 630rpx;
  height: 1rpx;
  display: flex;
  flex-direction: column;
  margin: 27rpx 0 0 33rpx;
}

.group_5 {
  width: 641rpx;
  height: 52rpx;
  flex-direction: row;
  display: flex;
  margin: 27rpx 0 0 31rpx;
}

.image_5 {
  width: 52rpx;
  height: 52rpx;
}

.text_4 {
  width: 125rpx;
  height: 31rpx;
  overflow-wrap: break-word;
  color: rgba(0, 0, 0, 1);
  font-size: 32rpx;
  font-family: AlibabaPuHuiTi_2_55_Regular;
  font-weight: normal;
  text-align: left;
  white-space: nowrap;
  line-height: 44rpx;
  margin: 11rpx 0 0 23rpx;
}

.label_3 {
  width: 32rpx;
  height: 32rpx;
  margin: 11rpx 0 0 410rpx;
}

.group_6 {
  background-color: rgba(238, 238, 239, 1.000000);
  width: 630rpx;
  height: 1rpx;
  display: flex;
  flex-direction: column;
  margin: 28rpx 0 0 33rpx;
}

.group_7 {
  width: 642rpx;
  height: 52rpx;
  flex-direction: row;
  display: flex;
  margin: 29rpx 0 0 30rpx;
}

.image_6 {
  width: 52rpx;
  height: 52rpx;
}

.text_5 {
  width: 123rpx;
  height: 30rpx;
  overflow-wrap: break-word;
  color: rgba(0, 0, 0, 1);
  font-size: 32rpx;
  font-family: AlibabaPuHuiTi_2_55_Regular;
  font-weight: normal;
  text-align: left;
  white-space: nowrap;
  line-height: 44rpx;
  margin: 10rpx 0 0 23rpx;
}

.label_4 {
  width: 32rpx;
  height: 32rpx;
  margin: 10rpx 0 0 412rpx;
}

.group_8 {
  background-color: rgba(238, 238, 239, 1.000000);
  width: 630rpx;
  height: 1rpx;
  display: flex;
  flex-direction: column;
  margin: 27rpx 0 0 33rpx;
}

.group_9 {
  width: 641rpx;
  height: 52rpx;
  flex-direction: row;
  display: flex;
  margin: 29rpx 0 0 31rpx;
}

.image_7 {
  width: 52rpx;
  height: 52rpx;
}

.text_6 {
  width: 124rpx;
  height: 31rpx;
  overflow-wrap: break-word;
  color: rgba(0, 0, 0, 1);
  font-size: 32rpx;
  font-family: AlibabaPuHuiTi_2_55_Regular;
  font-weight: normal;
  text-align: left;
  white-space: nowrap;
  line-height: 44rpx;
  margin: 10rpx 0 0 22rpx;
}

.label_5 {
  width: 32rpx;
  height: 32rpx;
  margin: 11rpx 0 0 411rpx;
}

.group_10 {
  background-color: rgba(238, 238, 239, 1.000000);
  width: 630rpx;
  height: 1rpx;
  display: flex;
  flex-direction: column;
  margin: 27rpx 0 0 33rpx;
}

.group_11 {
  width: 641rpx;
  height: 52rpx;
  flex-direction: row;
  display: flex;
  margin: 28rpx 0 76rpx 31rpx;
}

.image_8 {
  width: 52rpx;
  height: 52rpx;
}

.text_7 {
  width: 122rpx;
  height: 30rpx;
  overflow-wrap: break-word;
  color: rgba(0, 0, 0, 1);
  font-size: 32rpx;
  font-family: AlibabaPuHuiTi_2_55_Regular;
  font-weight: normal;
  text-align: left;
  white-space: nowrap;
  line-height: 44rpx;
  margin: 11rpx 0 0 23rpx;
}

.label_6 {
  width: 32rpx;
  height: 32rpx;
  margin: 11rpx 0 0 412rpx;
}

.top {
  position: absolute;
  width: 100%;
  height: 80%;
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

.body {
  width: 697rpx;
  height: 733rpx;
  background: #FFFFFF;
  border-radius: 33rpx;
}
</style>
