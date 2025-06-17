<template>
    <view>
      <image class="top" src="@/static/game_cps/bakimage.png">
        <view style="height: 100rpx"/>
        <view style="position: relative">
          <view class="padding_20 flex_between padding_top_60">
            <view class="return_ioc1" @click="goBack()"/>
            <view class="center_margin text_top">提现</view>
            <view style="width: 48rpx"/>
          </view>

          <view class="body center_margin">
            <view lines="1" class="text_2 left_30 padding_top_20">提现金额</view>
            <view class="section_3">
              <text lines="1" class="text_3">¥</text>
              <text lines="1" class="text_4">请输入提现金额</text>
              <view class="text-wrapper_1">
                <text lines="1" class="text_5">全部提现</text>
              </view>
            </view>
            <view class="section_4"></view>
            <view style="height: 20rpx"></view>
            <text lines="1" class="text_6">当前余额：0.00元</text>
          </view>

          <view class="item center_margin top_30">
            <view class="padding_20">
              <view class="flex_between top_10">
                <view class="body-text6 left_20">推广链接</view>
                <view class="flex_center">
                  <image class="body_image_ioc right_20" src="@/static/game_cps/ioc/xuanzhong.png"/>
                  <view class="body-text6 right_20">
                    微信
                  </view>
                </view>
              </view>
            </view>
          </view>

          <view class="body_item_tishi center_margin top_20">
            <view class="padding_top_20 left_20 right_20">
              提现注意事项:
              1、金额较大时，建议通过银行卡提现。
              2、银行卡提现前，需在京灵平台完成实名认证，并绑定结算卡(扫下方二维码操作)，佣金1-3个工作日到账。
              3、提现金额需满10元，银行卡单笔上限2万，微信单笔上限200元单日上限2000元。
              4、微信提现申请审核通过后，记得在微信服务通知里主动收钱，超过24小时未领取，钱会退回账户
              5、遇到问题，随时联系客服
            </view>
          </view>

          <view class="box_2">
            <view class="section_3"></view>
            <view class="text-wrapper_4">
              <text lines="1" class="text_8">确定</text>
            </view>
          </view>
        </view>
      </image>
  </view>
</template>

<script>
export default {
  data() {
    return {};
  },
  onShow() {

  },
  watch: {},
  computed: {},

  methods: {
    goBack() {
      uni.switchTab({
        url: "/pages/subpages/aboutMe/aboutMe"
      })
    },
  }
}
</script>
<style lang="scss" scoped>
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
.text_8 {
  width: 79rpx;
  height: 37rpx;
  overflow-wrap: break-word;
  color: rgba(255,255,255,1);
  font-size: 40rpx;
  font-family: AlibabaPuHuiTi_2_75_SemiBold;
  font-weight: normal;
  text-align: center;
  white-space: nowrap;
  line-height: 40rpx;
  margin: 22rpx auto;
}
.text-wrapper_4 {
  height: 80rpx;
  width: 617rpx;
  background: linear-gradient(90deg, #AB78FD, #8167FC);
  border-radius: 40rpx;
  background-size: 100% 100%;
  display: flex;
  flex-direction: column;
  margin: 25rpx 0 0 67rpx;
}
.body{
  width: 697rpx;
  height: 300rpx;
  background: #FFFFFF;
  border-radius: 33rpx;
}
.block_4 {
  background-color: rgba(238, 238, 239, 1.000000);
  width: 630rpx;
  height: 1rpx;
  display: flex;
  flex-direction: column;
  margin: 40rpx 0 0 30rpx;
}

.text-wrapper_3 {
  width: 340rpx;
  height: 25rpx;
  flex-direction: row;
  display: flex;
  justify-content: space-between;
  margin: 39rpx 0 48rpx 32rpx;
}

.text_7 {
  width: 219rpx;
  height: 21rpx;
  overflow-wrap: break-word;
  color: rgba(0, 0, 0, 1);
  font-size: 27rpx;
  font-family: AlibabaPuHuiTi_2_55_Regular;
  font-weight: normal;
  text-align: left;
  white-space: nowrap;
  line-height: 44rpx;
  margin-top: 1rpx;
}

/* 新增的输入框样式（保持原样） */
.input-field {
  border: none;
  outline: none;
  background: transparent;
  padding: 0;
  -webkit-appearance: none;
  appearance: none;
  font: inherit;
  color: inherit;
  line-height: inherit;
}

.section_3 {
  width: 631rpx;
  height: 67rpx;
  flex-direction: row;
  display: flex;
  margin: 37rpx 0 0 32rpx;
}
.box_2 {
  background-color: rgba(255,255,255,1.000000);
  position: absolute;
  left: 0rpx;
  top: 1264rpx;
  width: 750rpx;
  height: 160rpx;
  display: flex;
  flex-direction: column;
}
.body_item_tishi{
  width: 697rpx;
  height: 533rpx;
  background: #FFFFFF;
  border-radius: 33rpx;
  font-family: Alibaba PuHuiTi 2.0;
  font-weight: normal;
  font-size: 24rpx;
  color: #999999;
  line-height: 36rpx;
}
.body-text6{
  font-family: Alibaba PuHuiTi 2.0;
  font-weight: normal;
  font-size: 27rpx;
  color: #000000;
  line-height: 44rpx;
}
.body_image_ioc{
  width: 33rpx;
  height: 33rpx;
}
.body_image_ioc—text{

}
.text_3 {
  width: 30rpx;
  height: 38rpx;
  overflow-wrap: break-word;
  color: rgba(51, 51, 51, 1);
  font-size: 53rpx;
  font-family: AlibabaPuHuiTi_2_75_SemiBold;
  font-weight: normal;
  text-align: left;
  white-space: nowrap;
  line-height: 44rpx;
  margin-top: 15rpx;
}

.text_4 {
  width: 218rpx;
  height: 30rpx;
  overflow-wrap: break-word;
  color: rgba(153, 153, 153, 1);
  font-size: 32rpx;
  font-family: AlibabaPuHuiTi_2_55_Regular;
  font-weight: normal;
  text-align: left;
  white-space: nowrap;
  line-height: 44rpx;
  margin: 19rpx 0 0 30rpx;
}

.text-wrapper_1 {
  height: 67rpx;
  background: linear-gradient(90deg, #AB78FD, #8167FC);
  border-radius: 33rpx;
  margin-left: 173rpx;
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 180rpx;
}
.item {
  width: 697rpx;
  background: #FFFFFF;
  position: relative;
  border-radius: 33rpx;
}

.text_5 {
  overflow-wrap: break-word;
  color: rgba(255, 255, 255, 1);
  font-size: 32rpx;
  font-family: AlibabaPuHuiTi_2_55_Regular;
  font-weight: normal;
  text-align: center;
  white-space: nowrap;
  line-height: 54rpx;
}

.section_4 {
  background-color: rgba(238, 238, 239, 1.000000);
  width: 630rpx;
  height: 1rpx;
  display: flex;
  flex-direction: column;
  margin: 33rpx 0 0 30rpx;
}

.text_6 {
  width: 209rpx;
  height: 25rpx;
  overflow-wrap: break-word;
  color: rgba(153, 153, 153, 1);
  font-size: 27rpx;
  font-family: AlibabaPuHuiTi_2_55_Regular;
  font-weight: normal;
  text-align: left;
  white-space: nowrap;
  line-height: 44rpx;
  margin: 33rpx 0 47rpx 29rpx;
}

.image-text_2 {
  width: 124rpx;
  height: 33rpx;
  flex-direction: row;
  display: flex;
  justify-content: space-between;
  margin: 43rpx 73rpx 0 47rpx;
}
</style>
