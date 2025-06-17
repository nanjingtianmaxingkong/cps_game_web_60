<template>
  <view>
    <view class="box_2">
      <view class="group_2">
        <text lines="1" class="text_2">账户余额</text>
        <view @click="openAlert()" class="image-text_1">
          <image src="@/static/game_cps/ioc/gantan.png" class="image_3 top_10"></image>
          <text lines="1" class="text-group_1">提现说明</text>
        </view>
      </view>
      <view class="group_3">
        <text lines="1" class="text_3">0.00</text>
        <view  @click="getMoney()" class="text-wrapper_1">
          <text lines="1" class="text_4">立即提现</text>
        </view>
      </view>
      <view class="group_4">
        <view class="text-wrapper_2">
          <text lines="1" class="text_5">提现中</text>
          <text lines="1" class="text_6">0.00</text>
        </view>
        <view class="box_3"></view>
        <view class="text-wrapper_3">
          <text lines="1" class="text_7">提现成功</text>
          <text lines="1" class="text_8">0.00</text>
        </view>
      </view>
    </view>

    <view class="text-wrapper_4">
      <text lines="1" class="text_9">全部</text>
      <text lines="1" class="text_11">提现中</text>
      <text lines="1" class="text_11">待收款</text>
      <text lines="1" class="text_12">提现成功</text>
      <text lines="1" class="text_13">提现失败</text>
    </view>
    <view class="text-wrapper_5">
      <text lines="1" class="text_14">提现</text>
      <text lines="1" class="text_15">300.90</text>
    </view>
    <text lines="1" decode="true" class="text_16">今天&nbsp;11:30</text>
    <view class="box_4"></view>
    <view class="text-wrapper_6">
      <text lines="1" class="text_17">提现</text>
      <text lines="1" class="text_18">300.90</text>
    </view>
    <text lines="1" decode="true" class="text_19">今天&nbsp;11:30</text>
    <view class="box_5"></view>
    <view class="text-wrapper_7">
      <text lines="1" class="text_20">提现</text>
      <text lines="1" class="text_21">300.90</text>
    </view>

    <uni-popup ref="alertDialog5" :is-mask-click="true" background-color="transparent">
      <view class="page">
        <view class="section_10">
          <view class="about_us_text top_40">
            关于我们
          </view>
          <view v-html="notice5.noticeContent" class="about_body">
          </view>
          <view @click="alertDialog5Close" class="text-wrapper_10 ">
            <text lines="1" class="text_10">确定</text>
          </view>
        </view>
      </view>
    </uni-popup>
  </view>
</template>


<script>
import api from '@/js/api.js'
export default {
  data() {
    return {
      notice5: {},
    }
  },
  filters: {

  },
  onReachBottom() {

  },
  onPullDownRefresh() {
  },
  onLoad() {
  },
  onShow() {
    // 关于我们
    api.notice(5).then((res) => {
      if (res.code === 200) this.notice5 = res.rows[0];
    });
  },
  methods: {
    openAlert(){
      this.$refs.alertDialog5.open();
    },
    alertDialog5Close() {
      this.$refs.alertDialog5.close();
    },
    getMoney() {
      uni.navigateTo({url: '/pages/subpages/withdraw/withdraw'})
    },
  }
}
</script>

<style lang="scss" scoped>
.page {
  position: relative;
  width: 750rpx;
  height: 1624rpx;
  overflow: hidden;
  display: flex;
  flex-direction: column;
}

.image_1 {
  width: 683rpx;
  height: 23rpx;
  margin: 33rpx 0 0 33rpx;
}
.group_1 {
  width: 750rpx;
  height: 1568rpx;
  margin-bottom: 1rpx;
  display: flex;
  flex-direction: column;
}
.section_10 {
  width: 657rpx;
  height: 1000rpx;
  background: #FFFFFF;
  border-radius: 33rpx;
}

.text-wrapper_10 {
  width: 267rpx;
  height: 67rpx;
  background: linear-gradient(90deg, #AB78FD, #8167FC);
  border-radius: 33rpx;
  display: flex;
  margin: 50rpx auto 0rpx;
}
.box_1 {
  width: 691rpx;
  height: 59rpx;
  flex-direction: row;
  display: flex;
  margin: 41rpx 0 0 25rpx;
}
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
.label_1 {
  width: 32rpx;
  height: 32rpx;
  margin-top: 13rpx;
}
.text_1 {
  width: 71rpx;
  height: 33rpx;
  overflow-wrap: break-word;
  color: rgba(0,0,0,1);
  font-size: 36rpx;
  font-family: AlibabaPuHuiTi_2_75_SemiBold;
  font-weight: normal;
  text-align: center;
  white-space: nowrap;
  line-height: 44rpx;
  margin: 13rpx 0 0 283rpx;
}
.page {
  //position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
}
.image_2 {
  width: 160rpx;
  height: 59rpx;
  margin-left: 146rpx;
}
.box_2 {
  width: 697rpx;
  height: 360rpx;
  background: linear-gradient(90deg, #AB78FD, #8167FC);
  border-radius: 33rpx;
  display: flex;
  flex-direction: column;
  margin: 27rpx 0 0 27rpx;
}
.group_2 {
  width: 632rpx;
  height: 36rpx;
  flex-direction: row;
  display: flex;
  justify-content: space-between;
  margin: 25rpx 0 0 32rpx;
}
.text_2 {
  width: 103rpx;
  height: 25rpx;
  overflow-wrap: break-word;
  color: rgba(255,255,255,1);
  font-size: 27rpx;
  font-family: AlibabaPuHuiTi_2_55_Regular;
  font-weight: normal;
  text-align: left;
  white-space: nowrap;
  line-height: 44rpx;
  margin-top: 5rpx;
}
.image-text_1 {
  width: 147rpx;
  height: 36rpx;
  flex-direction: row;
  display: flex;
  justify-content: space-between;
}
.image_3 {
  width: 36rpx;
  height: 36rpx;
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

.text-group_1 {
  width: 102rpx;
  height: 25rpx;
  overflow-wrap: break-word;
  color: rgba(255,255,255,1);
  font-size: 27rpx;
  font-family: AlibabaPuHuiTi_2_55_Regular;
  font-weight: normal;
  text-align: left;
  white-space: nowrap;
  line-height: 44rpx;
  margin-top: 6rpx;
}
.group_3 {
  width: 631rpx;
  height: 67rpx;
  flex-direction: row;
  display: flex;
  justify-content: space-between;
  margin: 32rpx 0 0 33rpx;
}
.text_3 {
  width: 106rpx;
  height: 38rpx;
  overflow-wrap: break-word;
  color: rgba(255,255,255,1);
  font-size: 53rpx;
  font-family: AlibabaPuHuiTi_2_75_SemiBold;
  font-weight: normal;
  text-align: left;
  white-space: nowrap;
  line-height: 44rpx;
  margin-top: 15rpx;
}
.text-wrapper_1 {
  background-color: rgba(255,255,255,1.000000);
  border-radius: 33rpx;
  height: 67rpx;
  display: flex;
  flex-direction: column;
  width: 180rpx;
}
.text_4 {
  width: 123rpx;
  height: 30rpx;
  overflow-wrap: break-word;
  color: rgba(153,102,255,1);
  font-size: 32rpx;
  font-family: AlibabaPuHuiTi_2_55_Regular;
  font-weight: normal;
  text-align: center;
  white-space: nowrap;
  line-height: 35rpx;
  margin: 18rpx auto;
}
.group_4 {
  background-color: rgba(255,255,255,0.200000);
  border-radius: 40rpx;
  width: 630rpx;
  height: 133rpx;
  flex-direction: row;
  display: flex;
  justify-content: center;
  margin: 33rpx 0 33rpx 33rpx;
}
.text-wrapper_2 {
  width: 77rpx;
  height: 74rpx;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  margin: 29rpx 0 0 115rpx;
}
.text_5 {
  width: 75rpx;
  height: 25rpx;
  overflow-wrap: break-word;
  color: rgba(255,255,255,1);
  font-size: 27rpx;
  font-family: AlibabaPuHuiTi_2_55_Regular;
  font-weight: normal;
  text-align: center;
  white-space: nowrap;
  line-height: 44rpx;
  margin-left: 1rpx;
}
.text_6 {
  width: 77rpx;
  height: 29rpx;
  overflow-wrap: break-word;
  color: rgba(255,255,255,1);
  font-size: 40rpx;
  font-family: AlibabaPuHuiTi_2_55_Regular;
  font-weight: normal;
  text-align: center;
  white-space: nowrap;
  line-height: 44rpx;
  margin-top: 20rpx;
}
.box_3 {
  background-color: rgba(255,255,255,0.300000);
  border-radius: 1rpx;
  width: 2rpx;
  height: 73rpx;
  display: flex;
  flex-direction: column;
  margin: 30rpx 0 0 122rpx;
}
.text-wrapper_3 {
  width: 102rpx;
  height: 74rpx;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  margin: 29rpx 115rpx 0 97rpx;
}
.text_7 {
  width: 102rpx;
  height: 25rpx;
  overflow-wrap: break-word;
  color: rgba(255,255,255,1);
  font-size: 27rpx;
  font-family: AlibabaPuHuiTi_2_55_Regular;
  font-weight: normal;
  text-align: center;
  white-space: nowrap;
  line-height: 44rpx;
}
.text_8 {
  width: 77rpx;
  height: 29rpx;
  overflow-wrap: break-word;
  color: rgba(255,255,255,1);
  font-size: 40rpx;
  font-family: AlibabaPuHuiTi_2_55_Regular;
  font-weight: normal;
  text-align: center;
  white-space: nowrap;
  line-height: 44rpx;
  margin: 20rpx 0 0 13rpx;
}
.text-wrapper_4 {
  width: 643rpx;
  height: 29rpx;
  flex-direction: row;
  display: flex;
  justify-content: space-between;
  margin: 40rpx 0 0 53rpx;
}
.text_9 {
  width: 61rpx;
  height: 29rpx;
  overflow-wrap: break-word;
  color: rgba(0,0,0,1);
  font-size: 32rpx;
  font-family: AlibabaPuHuiTi_2_75_SemiBold;
  font-weight: normal;
  text-align: left;
  white-space: nowrap;
  line-height: 44rpx;
}

.text_11 {
  width: 85rpx;
  height: 27rpx;
  overflow-wrap: break-word;
  color: rgba(153,153,153,1);
  font-size: 29rpx;
  font-family: AlibabaPuHuiTi_2_55_Regular;
  font-weight: normal;
  text-align: left;
  white-space: nowrap;
  line-height: 44rpx;
  margin: 1rpx 0 0 47rpx;
}
.text_12 {
  width: 112rpx;
  height: 27rpx;
  overflow-wrap: break-word;
  color: rgba(153,153,153,1);
  font-size: 29rpx;
  font-family: AlibabaPuHuiTi_2_55_Regular;
  font-weight: normal;
  text-align: left;
  white-space: nowrap;
  line-height: 44rpx;
  margin: 1rpx 0 0 47rpx;
}
.text_13 {
  width: 114rpx;
  height: 27rpx;
  overflow-wrap: break-word;
  color: rgba(153,153,153,1);
  font-size: 29rpx;
  font-family: AlibabaPuHuiTi_2_55_Regular;
  font-weight: normal;
  text-align: left;
  white-space: nowrap;
  line-height: 44rpx;
  margin: 1rpx 0 0 47rpx;
}
.text-wrapper_5 {
  width: 698rpx;
  height: 29rpx;
  flex-direction: row;
  display: flex;
  justify-content: space-between;
  margin: 46rpx 0 0 26rpx;
}
.text_14 {
  width: 61rpx;
  height: 29rpx;
  overflow-wrap: break-word;
  color: rgba(0,0,0,1);
  font-size: 32rpx;
  font-family: AlibabaPuHuiTi_2_55_Regular;
  font-weight: normal;
  text-align: left;
  white-space: nowrap;
  line-height: 44rpx;
}
.text_15 {
  width: 100rpx;
  height: 23rpx;
  overflow-wrap: break-word;
  color: rgba(0,0,0,1);
  font-size: 32rpx;
  font-family: AlibabaPuHuiTi_2_75_SemiBold;
  font-weight: normal;
  text-align: left;
  white-space: nowrap;
  line-height: 44rpx;
  margin-top: 3rpx;
}
.text_16 {
  width: 107rpx;
  height: 23rpx;
  overflow-wrap: break-word;
  color: rgba(153,153,153,1);
  font-size: 24rpx;
  font-family: AlibabaPuHuiTi_2_55_Regular;
  font-weight: normal;
  text-align: left;
  white-space: nowrap;
  line-height: 44rpx;
  margin: 19rpx 0 0 26rpx;
}
.box_4 {
  background-color: rgba(238,238,239,1.000000);
  width: 697rpx;
  height: 1rpx;
  display: flex;
  flex-direction: column;
  margin: 26rpx 0 0 27rpx;
}
.text-wrapper_6 {
  width: 698rpx;
  height: 29rpx;
  flex-direction: row;
  display: flex;
  justify-content: space-between;
  margin: 26rpx 0 0 26rpx;
}
.text_17 {
  width: 61rpx;
  height: 29rpx;
  overflow-wrap: break-word;
  color: rgba(0,0,0,1);
  font-size: 32rpx;
  font-family: AlibabaPuHuiTi_2_55_Regular;
  font-weight: normal;
  text-align: left;
  white-space: nowrap;
  line-height: 44rpx;
}
.text_18 {
  width: 100rpx;
  height: 23rpx;
  overflow-wrap: break-word;
  color: rgba(0,0,0,1);
  font-size: 32rpx;
  font-family: AlibabaPuHuiTi_2_75_SemiBold;
  font-weight: normal;
  text-align: left;
  white-space: nowrap;
  line-height: 44rpx;
  margin-top: 3rpx;
}
.text_19 {
  width: 107rpx;
  height: 23rpx;
  overflow-wrap: break-word;
  color: rgba(153,153,153,1);
  font-size: 24rpx;
  font-family: AlibabaPuHuiTi_2_55_Regular;
  font-weight: normal;
  text-align: left;
  white-space: nowrap;
  line-height: 44rpx;
  margin: 19rpx 0 0 26rpx;
}
.box_5 {
  background-color: rgba(238,238,239,1.000000);
  width: 697rpx;
  height: 1rpx;
  display: flex;
  flex-direction: column;
  margin: 26rpx 0 0 27rpx;
}
.text-wrapper_7 {
  width: 698rpx;
  height: 29rpx;
  flex-direction: row;
  display: flex;
  justify-content: space-between;
  margin: 26rpx 0 0 26rpx;
}
.text_20 {
  width: 61rpx;
  height: 29rpx;
  overflow-wrap: break-word;
  color: rgba(0,0,0,1);
  font-size: 32rpx;
  font-family: AlibabaPuHuiTi_2_55_Regular;
  font-weight: normal;
  text-align: left;
  white-space: nowrap;
  line-height: 44rpx;
}
.text_21 {
  width: 100rpx;
  height: 23rpx;
  overflow-wrap: break-word;
  color: rgba(0,0,0,1);
  font-size: 32rpx;
  font-family: AlibabaPuHuiTi_2_75_SemiBold;
  font-weight: normal;
  text-align: left;
  white-space: nowrap;
  line-height: 44rpx;
  margin-top: 3rpx;
}
.text_22 {
  width: 107rpx;
  height: 23rpx;
  overflow-wrap: break-word;
  color: rgba(153,153,153,1);
  font-size: 24rpx;
  font-family: AlibabaPuHuiTi_2_55_Regular;
  font-weight: normal;
  text-align: left;
  white-space: nowrap;
  line-height: 44rpx;
  margin: 19rpx 0 0 26rpx;
}
.box_6 {
  background-color: rgba(238,238,239,1.000000);
  width: 697rpx;
  height: 1rpx;
  display: flex;
  flex-direction: column;
  margin: 26rpx 0 0 27rpx;
}
.box_7 {
  background-color: rgba(51,51,51,1.000000);
  border-radius: 5rpx;
  width: 267rpx;
  height: 9rpx;
  display: flex;
  flex-direction: column;
  margin: 591rpx 0 18rpx 242rpx;
}

</style>
