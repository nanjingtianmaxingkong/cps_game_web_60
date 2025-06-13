<template>
  <view>
    <view class="container" >
      <image class="top" src="@/static/game_cps/bakimage.png">
        <view style="height: 100rpx"/>
        <view style="position: relative" >
          <view class="padding_20 flex_between padding_top_60">
            <view class="return_ioc1" @click="goBack()"/>
            <view class="center_margin text_top">推游小助手</view>
            <view style="width: 48rpx"/>
          </view>

          <view class="body center_margin flex_center_not_just">
            <view>
              <view class="text-wrapper_2">
                <text lines="1" class="text_4">姓名</text>
                <input type="text" class="text_5" value="龙*友" placeholder="请输入姓名" />
              </view>
              <view class="block_3"></view>
              <view class="text-wrapper_2">
                <text lines="1" class="text_4">手机号</text>
                <input type="number" class="text_5" value="155****8890" placeholder="请输入手机号" />
              </view>
              <view class="block_4"></view>
              <view class="text-wrapper_2">
                <text lines="1" class="text_4">身份证</text>
                <input type="idcard" class="text_5" value="4312**********1419" placeholder="请输入身份证号" />
              </view>
            </view>
            </view>
          <view class="box_2">
            <view class="section_3"></view>
            <view class="text-wrapper_4">
              <text lines="1" class="text_8">提交</text>
            </view>
          </view>
        </view>
      </image>
    </view>
  </view>
</template>

<script>
export default {
  data() {
    return {

    };
  },
  onShow() {

  },
  watch: {

  },
  computed: {

  },

  methods: {
    goBack() {
      uni.switchTab({
        url: "/pages/subpages/getMoney/index"
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
.body{
  width: 697rpx;
  background: #FFFFFF;
  border-radius: 33rpx;
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
.section_3 {
  background-color: rgba(238,238,239,1.000000);
  width: 750rpx;
  height: 1rpx;
  display: flex;
  flex-direction: column;
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
  line-height: 44rpx;
  margin: 22rpx 0 0 269rpx;
}
.section_4 {
  background-color: rgba(51,51,51,1.000000);
  border-radius: 5rpx;
  width: 267rpx;
  height: 9rpx;
  display: flex;
  flex-direction: column;
  margin: 27rpx 0 17rpx 242rpx;
}
.group_2 {
  background-color: rgba(255,255,255,1.000000);
  border-radius: 33rpx;
  width: 697rpx;
  height: 333rpx;
  display: flex;
  flex-direction: column;
  justify-content: flex-center;
  margin: 27rpx 0 0 27rpx;
}
.text-wrapper_1 {
  width: 183rpx;
  height: 25rpx;
  flex-direction: row;
  display: flex;
  justify-content: space-between;
  margin: 48rpx 0 0 33rpx;
}
.text_2 {
  width: 48rpx;
  height: 25rpx;
  overflow-wrap: break-word;
  color: rgba(0,0,0,1);
  font-size: 27rpx;
  font-family: AlibabaPuHuiTi_2_55_Regular;
  font-weight: normal;
  text-align: left;
  white-space: nowrap;
  line-height: 44rpx;
}
.text_3 {
  margin-left: 30rpx;
  width: 200rpx;
  height: 25rpx;
  //overflow-wrap: break-word;
  color: rgba(0,0,0,1);
  font-size: 27rpx;
  font-family: AlibabaPuHuiTi_2_55_Regular;
  font-weight: normal;
  text-align: left;
  white-space: nowrap;
  line-height: 44rpx;
  margin-top: 1rpx;
}
.block_3 {
  background-color: rgba(238,238,239,1.000000);
  width: 630rpx;
  height: 1rpx;
  display: flex;
  flex-direction: column;
  margin: 40rpx 0 0 30rpx;
}


.text_4 {
  margin-left: 30rpx;
  width: 200rpx;
  height: 25rpx;
  //overflow-wrap: break-word;
  color: rgba(0,0,0,1);
  font-size: 27rpx;
  font-family: AlibabaPuHuiTi_2_55_Regular;
  font-weight: normal;
  text-align: left;
  white-space: nowrap;
  line-height: 44rpx;
}

.block_4 {
  background-color: rgba(238,238,239,1.000000);
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
.text_6 {
  margin-left: 30rpx;
  width: 200rpx;
  height: 25rpx;
  overflow-wrap: break-word;
  color: rgba(0,0,0,1);
  font-size: 27rpx;
  font-family: AlibabaPuHuiTi_2_55_Regular;
  font-weight: normal;
  text-align: left;
  white-space: nowrap;
  line-height: 44rpx;
}
.text_7 {
  height: 21rpx;
  //overflow-wrap: break-word;
  color: rgba(0,0,0,1);
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

.group_2 {
  background-color: rgba(255,255,255,1.000000);
  border-radius: 33rpx;
  width: 697rpx;
  height: 333rpx;
  display: flex;
  flex-direction: column;
  justify-content: flex-center;
  margin: 27rpx 0 0 27rpx;
}
.text-wrapper_1 {
  width: 183rpx;
  height: 25rpx;
  flex-direction: row;
  display: flex;
  justify-content: space-between;
  margin: 48rpx 0 0 33rpx;
}
.text_2 {
  width: 48rpx;
  height: 25rpx;
  overflow-wrap: break-word;
  color: rgba(0,0,0,1);
  font-size: 27rpx;
  font-family: AlibabaPuHuiTi_2_55_Regular;
  font-weight: normal;
  text-align: left;
  white-space: nowrap;
  line-height: 44rpx;
}


.block_3 {
  background-color: rgba(238,238,239,1.000000);
  width: 630rpx;
  height: 1rpx;
  display: flex;
  flex-direction: column;
  margin: 40rpx 0 0 30rpx;
}
.text-wrapper_2 {
  width: 265rpx;
  height: 25rpx;
  flex-direction: row;
  display: flex;
  justify-content: space-between;
  margin: 40rpx 0 40rpx 33rpx;
}

.text_5 {
  margin-left: 30rpx;
  width: 400rpx;
  height: 21rpx;
  overflow-wrap: break-word;
  color: rgba(0,0,0,1);
  font-size: 27rpx;
  font-family: AlibabaPuHuiTi_2_55_Regular;
  font-weight: normal;
  text-align: left;
  white-space: nowrap;
  line-height: 44rpx;
  margin-top: 1rpx;
}
.block_4 {
  background-color: rgba(238,238,239,1.000000);
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
  color: rgba(0,0,0,1);
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
</style>
