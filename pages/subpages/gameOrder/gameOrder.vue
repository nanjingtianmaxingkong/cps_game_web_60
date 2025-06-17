<template>
  <view>
    <view class="page">
        <view class="box_2">
          <view class="group_1 top_50">
            <view class="group_2">
              <image @click="goBack()" class="label_1" src="@/static/game_cps/ioc/zuoioc.png"/>
              <text lines="1" class="text_1">排行榜</text>
              <view class="image_2"></view>
            </view>
          </view>
          <view class="group_3">
            <view class="block_1">
              <text lines="1" class="text_2">总排行</text>
              <view class="text-wrapper_1">
                <text lines="1" class="text_3">本月排行</text>
              </view>
            </view>
            <view class="block_2">
              <view class="section_1">
                <image src="https://apk.zhizuan.xyz/top2.png" class="image_3"></image>
                <image src="@/static/game_cps/goodslist/moimage.png" class="image_4"></image>
                <view class="text-group_1">
                  <text lines="1" class="text_4">推广达人</text>
                  <text lines="1" decode="true" class="text_5">收益:&nbsp;15.80</text>
                </view>
              </view>
              <view class="section_2">
                <image src="https://apk.zhizuan.xyz/top1.png" class="image_5"></image>
                <image src="@/static/game_cps/goodslist/moimage.png" class="image_4"></image>
                <view class="text-group_2">
                  <text lines="1" class="text_6">推广达人</text>
                  <text lines="1" decode="true" class="text_7">收益:&nbsp;15.80</text>
                </view>
              </view>
              <view class="section_3">
                <image src="https://apk.zhizuan.xyz/top3.png" class="image_6"></image>
                <image src="@/static/game_cps/goodslist/moimage.png" class="image_4"></image>
                <view class="text-group_3">
                  <text lines="1" class="text_8">推广达人</text>
                  <text lines="1" decode="true" class="text_9">收益:&nbsp;15.80</text>
                </view>
              </view>
            </view>
            <view class="block_3">
              <text lines="1" class="text_10">4</text>
              <image src="@/static/game_cps/goodslist/moimage.png" class="image_7"></image>
              <view class="text-group_4">
                <text lines="1" class="text_11">玩咖收藏屋</text>
                <text lines="1" class="text_12">186****7788</text>
              </view>
              <view class="text-wrapper_2">
                <text lines="1" class="text_13">收益：</text>
                <text lines="1" class="text_14">7.41</text>
              </view>
            </view>
            <view class="block_4"></view>
            <view class="block_5">
              <text lines="1" class="text_15">5</text>
              <image src="@/static/game_cps/goodslist/moimage.png" class="image_8"></image>
              <view class="text-group_5">
                <text lines="1" class="text_16">玩咖收藏屋</text>
                <text lines="1" class="text_17">186****7788</text>
              </view>
              <view class="text-wrapper_3">
                <text lines="1" class="text_18">收益：</text>
                <text lines="1" class="text_19">7.41</text>
              </view>
            </view>
            <view class="block_6"></view>
            <view class="block_7">
              <text lines="1" class="text_20">6</text>
              <image src="@/static/game_cps/goodslist/moimage.png" class="image_9"></image>
              <view class="text-group_6">
                <text lines="1" class="text_21">玩咖收藏屋</text>
                <text lines="1" class="text_22">186****7788</text>
              </view>
              <view class="text-wrapper_4">
                <text lines="1" class="text_23">收益：</text>
                <text lines="1" class="text_24">7.41</text>
              </view>
            </view>
            <view class="block_8"></view>
            <view class="block_9">
              <text lines="1" class="text_25">7</text>
              <image src="@/static/game_cps/goodslist/moimage.png" class="image_10"></image>
              <view class="text-group_7">
                <text lines="1" class="text_26">玩咖收藏屋</text>
                <text lines="1" class="text_27">186****7788</text>
              </view>
              <view class="text-wrapper_5">
                <text lines="1" class="text_28">收益：</text>
                <text lines="1" class="text_29">7.41</text>
              </view>
            </view>
            <view class="block_10"></view>
            <view class="block_11">
              <view class="block_12">
                <text lines="1" class="text_30">11</text>
                <image src="@/static/game_cps/goodslist/moimage.png" class="image_11"></image>
                <view class="text-group_8">
                  <text lines="1" class="text_31">玩咖收藏屋</text>
                  <text lines="1" class="text_32">186****7788</text>
                </view>
                <view class="text-wrapper_6">
                  <text lines="1" class="text_33">收益：</text>
                  <text lines="1" class="text_34">7.41</text>
                </view>
              </view>
              <view class="block_13"></view>
            </view>
          </view>
        </view>
      </view>
  </view>
</template>

<script>
import {
  mapState,
  mapGetters
} from "vuex"
import env from "@/js/config.js"
const url = `${env.BASE_URL}`
const name = `${url}/file/upload`
export default {
  components: {

  },
  data() {
    return {

    };
  },
  onShow() {

  },
  watch: {

  },
  computed: {
    ...mapState({
      userInfo: state => state.user.userInfo
    }),
  },
  onReachBottom() {
  },
  onPullDownRefresh() {
  },
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
.page {
  position: relative;
  width: 750rpx;
  height: 1624rpx;
  overflow: hidden;
  display: flex;
  flex-direction: column;
}
.box_2 {
  position: relative;
  width: 750rpx;
  height: 1624rpx;
  background: url(https://apk.zhizuan.xyz/bakImage.png) 100% no-repeat;
  background-size: 100% 100%;
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
  height: 153rpx;
  margin-bottom: 1414rpx;
  display: flex;
  flex-direction: column;
}
.group_2 {
  width: 691rpx;
  height: 59rpx;
  flex-direction: row;
  display: flex;
  margin: 41rpx 0 0 25rpx;
}
.label_1 {
  width: 32rpx;
  height: 32rpx;
  margin-top: 13rpx;
}
.text_1 {
  width: 104rpx;
  height: 34rpx;
  overflow-wrap: break-word;
  color: rgba(255,255,255,1);
  font-size: 36rpx;
  font-family: AlibabaPuHuiTi_2_75_SemiBold;
  font-weight: normal;
  text-align: center;
  white-space: nowrap;
  line-height: 44rpx;
  margin: 12rpx 0 0 266rpx;
}
.image_2 {
  width: 160rpx;
  height: 59rpx;
  margin-left: 129rpx;
}
.group_3 {
  background-color: rgba(245,239,255,1.000000);
  border-radius: NaNrpx;
  position: absolute;
  left: 27rpx;
  top: 209rpx;
  width: 697rpx;
  height: 1415rpx;
  display: flex;
  flex-direction: column;
}
.block_1 {
  background-color: rgba(229,215,253,1.000000);
  border-radius: NaNrpx;
  height: 87rpx;
  display: flex;
  flex-direction: column;
  width: 697rpx;
  position: relative;
}
.text_2 {
  width: 93rpx;
  height: 30rpx;
  overflow-wrap: break-word;
  color: rgba(153,102,255,1);
  font-size: 32rpx;
  font-family: AlibabaPuHuiTi_2_55_Regular;
  font-weight: normal;
  text-align: justifyLeft;
  white-space: nowrap;
  line-height: 44rpx;
  margin: 28rpx 0 0 474rpx;
}
.text-wrapper_1 {
  height: 107rpx;
  background: url(https://apk.zhizuan.xyz/top-zuo.png) 100% no-repeat;
  background-size: 100% 100%;
  display: flex;
  flex-direction: column;
  width: 389rpx;
  position: absolute;
  left: 0rpx;
  top: -20rpx;
}
.text_3 {
  width: 124rpx;
  height: 30rpx;
  overflow-wrap: break-word;
  color: rgba(153,102,255,1);
  font-size: 32rpx;
  font-family: AlibabaPuHuiTi_2_75_SemiBold;
  font-weight: normal;
  text-align: justifyLeft;
  white-space: nowrap;
  line-height: 44rpx;
  margin: 49rpx 0 0 112rpx;
}
.block_2 {
  width: 630rpx;
  height: 413rpx;
  flex-direction: row;
  display: flex;
  justify-content: space-between;
  margin: 27rpx 0 0 33rpx;
}
.section_1 {
  width: 197rpx;
  height: 360rpx;
  background: url(https://apk.zhizuan.xyz/top-lan.png) 100% no-repeat;
  background-size: 100% 100%;
  margin-top: 53rpx;
  display: flex;
  flex-direction: column;
}
.image_3 {
  width: 96rpx;
  height: 96rpx;
  margin: 27rpx 0 0 51rpx;
}
.image_4 {
  width: 100rpx;
  height: 100rpx;
  margin: 20rpx 0 0 49rpx;
}
.text-group_1 {
  width: 103rpx;
  height: 56rpx;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  margin: 22rpx 0 39rpx 47rpx;
}
.text_4 {
  width: 103rpx;
  height: 25rpx;
  overflow-wrap: break-word;
  color: rgba(0,0,0,1);
  font-size: 27rpx;
  font-family: AlibabaPuHuiTi_2_75_SemiBold;
  font-weight: normal;
  text-align: center;
  white-space: nowrap;
  line-height: 44rpx;
}
.text_5 {
  width: 98rpx;
  height: 19rpx;
  overflow-wrap: break-word;
  color: rgba(102,102,102,1);
  font-size: 20rpx;
  font-family: AlibabaPuHuiTi_2_55_Regular;
  font-weight: normal;
  text-align: center;
  white-space: nowrap;
  line-height: 44rpx;
  margin: 13rpx 0 0 3rpx;
}
.section_2 {
  width: 197rpx;
  height: 360rpx;
  background: url(https://apk.zhizuan.xyz/top-qian-huang.png) 100% no-repeat;
  background-size: 100% 100%;
  margin-left: 20rpx;
  display: flex;
  flex-direction: column;
}
.image_5 {
  width: 96rpx;
  height: 96rpx;
  margin: 27rpx 0 0 51rpx;
}
.box_3 {
  background-color: rgba(255,255,255,1.000000);
  border-radius: 33%;
  width: 100rpx;
  height: 100rpx;
  border: 8px solid rgba(255,255,255,1);
  display: flex;
  flex-direction: column;
  margin: 20rpx 0 0 49rpx;
}
.text-group_2 {
  width: 103rpx;
  height: 56rpx;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  margin: 22rpx 0 39rpx 47rpx;
}
.text_6 {
  width: 103rpx;
  height: 25rpx;
  overflow-wrap: break-word;
  color: rgba(0,0,0,1);
  font-size: 27rpx;
  font-family: AlibabaPuHuiTi_2_75_SemiBold;
  font-weight: normal;
  text-align: center;
  white-space: nowrap;
  line-height: 44rpx;
}
.text_7 {
  width: 98rpx;
  height: 19rpx;
  overflow-wrap: break-word;
  color: rgba(102,102,102,1);
  font-size: 20rpx;
  font-family: AlibabaPuHuiTi_2_55_Regular;
  font-weight: normal;
  text-align: center;
  white-space: nowrap;
  line-height: 44rpx;
  margin: 13rpx 0 0 3rpx;
}
.section_3 {
  width: 197rpx;
  height: 360rpx;
  background: url(https://apk.zhizuan.xyz/top-huang.png) 100% no-repeat;
  background-size: 100% 100%;
  display: flex;
  flex-direction: column;
  margin: 53rpx 0 0 20rpx;
}
.image_6 {
  width: 96rpx;
  height: 96rpx;
  margin: 27rpx 0 0 51rpx;
}
.group_4 {
  background-color: rgba(255,255,255,1.000000);
  border-radius: 33%;
  width: 100rpx;
  height: 100rpx;
  border: 8px solid rgba(255,255,255,1);
  display: flex;
  flex-direction: column;
  margin: 20rpx 0 0 49rpx;
}
.text-group_3 {
  width: 103rpx;
  height: 56rpx;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  margin: 22rpx 0 39rpx 47rpx;
}
.text_8 {
  width: 103rpx;
  height: 25rpx;
  overflow-wrap: break-word;
  color: rgba(0,0,0,1);
  font-size: 27rpx;
  font-family: AlibabaPuHuiTi_2_75_SemiBold;
  font-weight: normal;
  text-align: center;
  white-space: nowrap;
  line-height: 44rpx;
}
.text_9 {
  width: 98rpx;
  height: 19rpx;
  overflow-wrap: break-word;
  color: rgba(102,102,102,1);
  font-size: 20rpx;
  font-family: AlibabaPuHuiTi_2_55_Regular;
  font-weight: normal;
  text-align: center;
  white-space: nowrap;
  line-height: 44rpx;
  margin: 13rpx 0 0 3rpx;
}
.block_3 {
  width: 610rpx;
  height: 100rpx;
  flex-direction: row;
  display: flex;
  margin: 40rpx 0 0 33rpx;
}
.text_10 {
  width: 21rpx;
  height: 29rpx;
  overflow-wrap: break-word;
  color: rgba(153,153,153,1);
  font-size: 40rpx;
  font-family: AlibabaPuHuiTi_2_75_SemiBold;
  font-weight: normal;
  text-align: center;
  white-space: nowrap;
  line-height: 44rpx;
  margin-top: 35rpx;
}
.image_7 {
  width: 100rpx;
  height: 100rpx;
  margin-left: 22rpx;
}
.text-group_4 {
  width: 155rpx;
  height: 62rpx;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  margin: 19rpx 0 0 20rpx;
}
.text_11 {
  width: 155rpx;
  height: 30rpx;
  overflow-wrap: break-word;
  color: rgba(0,0,0,1);
  font-size: 32rpx;
  font-family: AlibabaPuHuiTi_2_55_Regular;
  font-weight: normal;
  text-align: left;
  white-space: nowrap;
  line-height: 44rpx;
}
.text_12 {
  width: 128rpx;
  height: 19rpx;
  overflow-wrap: break-word;
  color: rgba(153,102,255,1);
  font-size: 24rpx;
  font-family: AlibabaPuHuiTi_2_55_Regular;
  font-weight: normal;
  text-align: left;
  white-space: nowrap;
  line-height: 44rpx;
  margin-top: 13rpx;
}
.text-wrapper_2 {
  width: 148rpx;
  height: 30rpx;
  overflow-wrap: break-word;
  font-size: 0rpx;
  font-family: AlibabaPuHuiTi_2_55_Regular;
  font-weight: normal;
  text-align: left;
  white-space: nowrap;
  line-height: 44rpx;
  margin: 35rpx 0 0 145rpx;
}
.text_13 {
  width: 148rpx;
  height: 30rpx;
  overflow-wrap: break-word;
  color: rgba(153, 153, 153, 1);
  font-size: 32rpx;
  font-family: AlibabaPuHuiTi_2_55_Regular;
  font-weight: normal;
  text-align: left;
  white-space: nowrap;
  line-height: 44rpx;
}
.text_14 {
  width: 148rpx;
  height: 30rpx;
  overflow-wrap: break-word;
  color: rgba(255, 102, 0, 1);
  font-size: 32rpx;
  font-family: AlibabaPuHuiTi_2_75_SemiBold;
  font-weight: normal;
  text-align: left;
  white-space: nowrap;
  line-height: 44rpx;
}
.block_4 {
  background-color: rgba(228,214,255,1.000000);
  border-radius: 1rpx;
  width: 630rpx;
  height: 1rpx;
  display: flex;
  flex-direction: column;
  margin: 27rpx 0 0 33rpx;
}
.block_5 {
  width: 608rpx;
  height: 100rpx;
  flex-direction: row;
  display: flex;
  margin: 27rpx 0 0 35rpx;
}
.text_15 {
  width: 18rpx;
  height: 29rpx;
  overflow-wrap: break-word;
  color: rgba(153,153,153,1);
  font-size: 40rpx;
  font-family: AlibabaPuHuiTi_2_75_SemiBold;
  font-weight: normal;
  text-align: center;
  white-space: nowrap;
  line-height: 44rpx;
  margin-top: 35rpx;
}
.image_8 {
  width: 100rpx;
  height: 100rpx;
  margin-left: 23rpx;
}
.text-group_5 {
  width: 155rpx;
  height: 62rpx;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  margin: 19rpx 0 0 20rpx;
}
.text_16 {
  width: 155rpx;
  height: 30rpx;
  overflow-wrap: break-word;
  color: rgba(0,0,0,1);
  font-size: 32rpx;
  font-family: AlibabaPuHuiTi_2_55_Regular;
  font-weight: normal;
  text-align: left;
  white-space: nowrap;
  line-height: 44rpx;
}
.text_17 {
  width: 128rpx;
  height: 19rpx;
  overflow-wrap: break-word;
  color: rgba(153,102,255,1);
  font-size: 24rpx;
  font-family: AlibabaPuHuiTi_2_55_Regular;
  font-weight: normal;
  text-align: left;
  white-space: nowrap;
  line-height: 44rpx;
  margin-top: 13rpx;
}
.text-wrapper_3 {
  width: 148rpx;
  height: 30rpx;
  overflow-wrap: break-word;
  font-size: 0rpx;
  font-family: AlibabaPuHuiTi_2_55_Regular;
  font-weight: normal;
  text-align: left;
  white-space: nowrap;
  line-height: 44rpx;
  margin: 35rpx 0 0 145rpx;
}
.text_18 {
  width: 148rpx;
  height: 30rpx;
  overflow-wrap: break-word;
  color: rgba(153, 153, 153, 1);
  font-size: 32rpx;
  font-family: AlibabaPuHuiTi_2_55_Regular;
  font-weight: normal;
  text-align: left;
  white-space: nowrap;
  line-height: 44rpx;
}
.text_19 {
  width: 148rpx;
  height: 30rpx;
  overflow-wrap: break-word;
  color: rgba(255, 102, 0, 1);
  font-size: 32rpx;
  font-family: AlibabaPuHuiTi_2_75_SemiBold;
  font-weight: normal;
  text-align: left;
  white-space: nowrap;
  line-height: 44rpx;
}
.block_6 {
  background-color: rgba(228,214,255,1.000000);
  border-radius: 1rpx;
  width: 630rpx;
  height: 1rpx;
  display: flex;
  flex-direction: column;
  margin: 27rpx 0 0 33rpx;
}
.block_7 {
  width: 609rpx;
  height: 100rpx;
  flex-direction: row;
  display: flex;
  margin: 27rpx 0 0 34rpx;
}
.text_20 {
  width: 20rpx;
  height: 29rpx;
  overflow-wrap: break-word;
  color: rgba(153,153,153,1);
  font-size: 40rpx;
  font-family: AlibabaPuHuiTi_2_75_SemiBold;
  font-weight: normal;
  text-align: center;
  white-space: nowrap;
  line-height: 44rpx;
  margin-top: 35rpx;
}
.image_9 {
  width: 100rpx;
  height: 100rpx;
  margin-left: 22rpx;
}
.text-group_6 {
  width: 155rpx;
  height: 62rpx;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  margin: 19rpx 0 0 20rpx;
}
.text_21 {
  width: 155rpx;
  height: 30rpx;
  overflow-wrap: break-word;
  color: rgba(0,0,0,1);
  font-size: 32rpx;
  font-family: AlibabaPuHuiTi_2_55_Regular;
  font-weight: normal;
  text-align: left;
  white-space: nowrap;
  line-height: 44rpx;
}
.text_22 {
  width: 128rpx;
  height: 19rpx;
  overflow-wrap: break-word;
  color: rgba(153,102,255,1);
  font-size: 24rpx;
  font-family: AlibabaPuHuiTi_2_55_Regular;
  font-weight: normal;
  text-align: left;
  white-space: nowrap;
  line-height: 44rpx;
  margin-top: 13rpx;
}
.text-wrapper_4 {
  width: 148rpx;
  height: 30rpx;
  overflow-wrap: break-word;
  font-size: 0rpx;
  font-family: AlibabaPuHuiTi_2_55_Regular;
  font-weight: normal;
  text-align: left;
  white-space: nowrap;
  line-height: 44rpx;
  margin: 35rpx 0 0 145rpx;
}
.text_23 {
  width: 148rpx;
  height: 30rpx;
  overflow-wrap: break-word;
  color: rgba(153, 153, 153, 1);
  font-size: 32rpx;
  font-family: AlibabaPuHuiTi_2_55_Regular;
  font-weight: normal;
  text-align: left;
  white-space: nowrap;
  line-height: 44rpx;
}
.text_24 {
  width: 148rpx;
  height: 30rpx;
  overflow-wrap: break-word;
  color: rgba(255, 102, 0, 1);
  font-size: 32rpx;
  font-family: AlibabaPuHuiTi_2_75_SemiBold;
  font-weight: normal;
  text-align: left;
  white-space: nowrap;
  line-height: 44rpx;
}
.block_8 {
  background-color: rgba(228,214,255,1.000000);
  border-radius: 1rpx;
  width: 630rpx;
  height: 1rpx;
  display: flex;
  flex-direction: column;
  margin: 27rpx 0 0 33rpx;
}
.block_9 {
  width: 609rpx;
  height: 100rpx;
  flex-direction: row;
  display: flex;
  margin: 27rpx 0 0 34rpx;
}
.text_25 {
  width: 19rpx;
  height: 29rpx;
  overflow-wrap: break-word;
  color: rgba(153,153,153,1);
  font-size: 40rpx;
  font-family: AlibabaPuHuiTi_2_75_SemiBold;
  font-weight: normal;
  text-align: center;
  white-space: nowrap;
  line-height: 44rpx;
  margin-top: 35rpx;
}
.image_10 {
  width: 100rpx;
  height: 100rpx;
  margin-left: 23rpx;
}
.text-group_7 {
  width: 155rpx;
  height: 62rpx;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  margin: 19rpx 0 0 20rpx;
}
.text_26 {
  width: 155rpx;
  height: 30rpx;
  overflow-wrap: break-word;
  color: rgba(0,0,0,1);
  font-size: 32rpx;
  font-family: AlibabaPuHuiTi_2_55_Regular;
  font-weight: normal;
  text-align: left;
  white-space: nowrap;
  line-height: 44rpx;
}
.text_27 {
  width: 128rpx;
  height: 19rpx;
  overflow-wrap: break-word;
  color: rgba(153,102,255,1);
  font-size: 24rpx;
  font-family: AlibabaPuHuiTi_2_55_Regular;
  font-weight: normal;
  text-align: left;
  white-space: nowrap;
  line-height: 44rpx;
  margin-top: 13rpx;
}
.text-wrapper_5 {
  width: 148rpx;
  height: 30rpx;
  overflow-wrap: break-word;
  font-size: 0rpx;
  font-family: AlibabaPuHuiTi_2_55_Regular;
  font-weight: normal;
  text-align: left;
  white-space: nowrap;
  line-height: 44rpx;
  margin: 35rpx 0 0 145rpx;
}
.text_28 {
  width: 148rpx;
  height: 30rpx;
  overflow-wrap: break-word;
  color: rgba(153, 153, 153, 1);
  font-size: 32rpx;
  font-family: AlibabaPuHuiTi_2_55_Regular;
  font-weight: normal;
  text-align: left;
  white-space: nowrap;
  line-height: 44rpx;
}
.text_29 {
  width: 148rpx;
  height: 30rpx;
  overflow-wrap: break-word;
  color: rgba(255, 102, 0, 1);
  font-size: 32rpx;
  font-family: AlibabaPuHuiTi_2_75_SemiBold;
  font-weight: normal;
  text-align: left;
  white-space: nowrap;
  line-height: 44rpx;
}
.block_10 {
  background-color: rgba(228,214,255,1.000000);
  border-radius: 1rpx;
  width: 630rpx;
  height: 1rpx;
  display: flex;
  flex-direction: column;
  margin: 27rpx 0 256rpx 33rpx;
}
.block_11 {
  background-color: rgba(255,255,255,1.000000);
  position: absolute;
  left: -27rpx;
  top: 1181rpx;
  width: 750rpx;
  height: 233rpx;
  display: flex;
  flex-direction: column;
}
.block_12 {
  width: 697rpx;
  height: 153rpx;
  background: linear-gradient(90deg, #AB78FD, #8167FC);
  border-radius: 77rpx;
  background-size: 100% 100%;
  flex-direction: row;
  display: flex;
  margin: 27rpx 0 0 27rpx;
}
.text_30 {
  width: 29rpx;
  height: 29rpx;
  overflow-wrap: break-word;
  color: rgba(255,255,255,1);
  font-size: 40rpx;
  font-family: AlibabaPuHuiTi_2_75_SemiBold;
  font-weight: normal;
  text-align: center;
  white-space: nowrap;
  line-height: 44rpx;
  margin: 62rpx 0 0 27rpx;
}
.image_11 {
  width: 100rpx;
  height: 100rpx;
  margin: 27rpx 0 0 19rpx;
}
.text-group_8 {
  width: 155rpx;
  height: 62rpx;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  margin: 46rpx 0 0 20rpx;
}
.text_31 {
  width: 155rpx;
  height: 30rpx;
  overflow-wrap: break-word;
  color: rgba(255,255,255,1);
  font-size: 32rpx;
  font-family: AlibabaPuHuiTi_2_55_Regular;
  font-weight: normal;
  text-align: left;
  white-space: nowrap;
  line-height: 44rpx;
}
.text_32 {
  width: 128rpx;
  height: 19rpx;
  overflow-wrap: break-word;
  color: rgba(255,255,255,1);
  font-size: 24rpx;
  font-family: AlibabaPuHuiTi_2_55_Regular;
  font-weight: normal;
  text-align: left;
  white-space: nowrap;
  line-height: 44rpx;
  margin-top: 13rpx;
}
.text-wrapper_6 {
  width: 148rpx;
  height: 30rpx;
  overflow-wrap: break-word;
  font-size: 0rpx;
  font-family: AlibabaPuHuiTi_2_55_Regular;
  font-weight: normal;
  text-align: left;
  white-space: nowrap;
  line-height: 44rpx;
  margin: 62rpx 53rpx 0 145rpx;
}
.text_33 {
  width: 148rpx;
  height: 30rpx;
  overflow-wrap: break-word;
  color: rgba(255, 255, 255, 1);
  font-size: 32rpx;
  font-family: AlibabaPuHuiTi_2_55_Regular;
  font-weight: normal;
  text-align: left;
  white-space: nowrap;
  line-height: 44rpx;
}
.text_34 {
  width: 148rpx;
  height: 30rpx;
  overflow-wrap: break-word;
  color: rgba(255, 255, 255, 1);
  font-size: 32rpx;
  font-family: AlibabaPuHuiTi_2_75_SemiBold;
  font-weight: normal;
  text-align: left;
  white-space: nowrap;
  line-height: 44rpx;
}
.block_13 {
  background-color: rgba(51,51,51,1.000000);
  border-radius: 5rpx;
  width: 267rpx;
  height: 9rpx;
  display: flex;
  flex-direction: column;
  margin: 27rpx 0 17rpx 242rpx;
}
</style>
