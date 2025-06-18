<template>
  <view>
    <view class="top">
      <view class="padding_20 flex_between padding_top_60">
        <view class="return_ioc" @click="goBack()"/>
        <view class="center_margin text_top">简介</view>
        <view style="width: 48rpx"/>
      </view>
      <view class="top_50" style="display: flex">
        <image class="images left_20" :src="gameDet.image"/>
        <view class="left_20">
          <view class="text_body_top">
            {{ gameDet.name }}
          </view>
          <view class="text_body_top_2 top_10">
            {{ gameDet.describes }}
          </view>
          <view style="display: flex" class="top_15">
            <view class="text_body_top_1 ">
              {{ gameDet.category2Name }}
            </view>
            <view class="text_body_top_1 left_20">
              {{ gameDet.category3Name }}
            </view>
          </view>
        </view>
      </view>
      <view class="body center_margin flex_around top_30">
        <view class="body-item text_cc flex_around">
          新用户注册比例
          <view class="text_tt left_20"> {{ getRadioGuang(gameDet.cpsRegisteredRatio)}}%</view>
        </view>
        <view class="lie"/>
        <view class="body-item text_cc flex_around left_30">
          回归用户注册比例
          <view class="text_tc left_20"> {{ getRadioGuang(gameDet.cpsRefluxRatio) }}%</view>
        </view>
      </view>
      <view class="top_20">
        <scroll-view class="scroll-view_H" scroll-x="true" @scroll="scroll" scroll-left="120" v-if="ImgList.length > 0">
          <view style="display: flex">
            <view v-for="item in ImgList" :key="item.index">
              <image :class="item.direction == 1? 'newImgHeng left_20':'newImgShu left_20'" :src="item.img_url">
              </image>
            </view>
          </view>
        </scroll-view>
      </view>
      <view class="body_con top_20">
        <view class="padding_20">
          <view class="body-text left_10">福利</view>
          <image class="fu_image left_10" src="@/static/game_cps/goodslist/dibuioc.png">
          </image>
        </view>
        <view class="flex_center">
          <image class="fu_gamebal left_10" src="@/static/game_cps/goodslist/gamebal.png">
          </image>
        </view>
        <view class="flex_between top_20">
          <button class="button_css1" @click="apply(gameDet)">启动</button>
          <button class="button_css2" @click="apply(gameDet)">{{ getStatus(gameDet.status) }}</button>
        </view>
        <view style="height: 20rpx"/>
      </view>
    </view>
  </view>
</template>
<script>
import api from "@/js/api.js"
import {
  mapState,
  mapGetters
} from "vuex"

export default {
  data() {
    return {
      ImgList: [],
      scrollTop: 0,
      old: {
        scrollTop: 0
      },
    }
  },

  onLoad() {

  },
  computed: {
    ...mapState({
      gameDet: state => state.order.gameDet
    }),
    ...mapState({
      config: state => state.user.config
    }),
  },
  onShow() {
    setTimeout(() => {
      this.ImgList = JSON.parse(this.gameDet.imgList);
    }, 2000)
  },
  methods: {
    getStatus(val) {
      if (val == 1) {
        return "申请"
      } else if (val == 2) {
        return "已满"
      } else if (val == 3) {
        return "已申请"
      } else {
        return "申请中"
      }
    },
    getRadio(ratio){
      console.log(Number(ratio),"Number(ratio)")
      console.log(Number(this.config.cpsRadio),"Number(this.config.cpsRadio)")
      let ret = Number(ratio) * Number(this.config.cpsRadio)
      return ret.toFixed(0)
    },
    getRadioGuang(ratio){
      let ret = Number(ratio) * Number(this.config.comCpsRadio)
      return ret.toFixed(0)
    },
    apply(val) {
      let par = {
        gameId: val.id,
      }
      api.cpsApplyOrder(par).then(res => {
        if (res.code == 200) {
          this.Tips("申请成功！")
        }
      })
    },
    scroll: function (e) {
      this.old.scrollTop = e.detail.scrollTop
    },
    goBack() {
      uni.switchTab({
        url: "/pages/subpages/index/index"
      })
    },
  }
}
</script>

<style scoped lang="scss">


.top {
  width: 750rpx;
  background: #333366;
}

.body_con {
  width: 100%;
  background: #FFFFFF;
  border-radius: 30rpx 30rpx 0rpx 0rpx;
}

.bak {
  width: 480rpx;
  height: 480rpx;
}

.button_css1 {
  width: 293rpx;
  height: 80rpx;
  background: #F5EFFF;
  border-radius: 40rpx;
  font-family: Alibaba PuHuiTi 2.0;
  font-weight: normal;
  font-size: 40rpx;
  color: #9966FF;
  line-height: 70rpx;
  text-align: center;
}

.button_css2 {
  width: 293rpx;
  height: 80rpx;
  background: linear-gradient(90deg, #AB78FD, #8167FC);
  border-radius: 40rpx;
  line-height: 70rpx;
  font-family: Alibaba PuHuiTi 2.0;
  font-weight: normal;
  font-size: 40rpx;
  text-align: center;
  color: #FFFFFF;
}

.body {
  &-lv {
    width: 6rpx;
    height: 20rpx;
    background: #5ACF86;
    border-radius: 37rpx;
    font-family: PingFangSC, PingFang SC;
    font-weight: 500;
    font-size: 32rpx;
    color: #56AB6D;
    line-height: 44rpx;
    text-align: left;
    font-style: normal;
  }

  &-text {
    font-family: Alibaba PuHuiTi 2.0;
    font-weight: normal;
    font-size: 40rpx;
    color: #000000;
    line-height: 44rpx;
    height: 10rpx;
  }
}
.fu_image{
  width: 106.67rpx;
  height: 6.67rpx;
}
.fu_gamebal{
  width: 360rpx;
  height: 360rpx;
}
.memo{
  padding: 20rpx;
  width: 680rpx;
  background: #F2F2F2;
  border-radius: 12rpx;
  font-family: PingFangSC, PingFang SC;
  font-weight: 500;
}

.scroll-view_H {
  white-space: nowrap;
  width: 100%;
}

.newImgHeng {
  width: 300rpx;
  height: 500rpx;
  border-radius: 18rpx;
}

.newImgShu {
  width: 410rpx;
  height: 260rpx;
  border-radius: 18rpx;
}

.lie {
  width: 2rpx;
  height: 24rpx;
  background-color: #666666;
}

.text_cc {
  font-family: PingFangSC, PingFang SC;
  font-weight: 400;
  font-size: 26rpx;
  color: #FFFFFF;
  line-height: 36rpx;
  text-align: center;
  font-style: normal;
}

.text_tt {
  font-family: PingFangSC, PingFang SC;
  font-weight: 400;
  font-size: 26rpx;
  color: #6CD991;
  line-height: 36rpx;
  text-align: center;
  font-style: normal;
}

.text_tc {
  font-family: PingFangSC, PingFang SC;
  font-weight: 400;
  font-size: 26rpx;
  color: #292953;
  line-height: 36rpx;
  text-align: center;
  font-style: normal;
}

.text_top {
  font-family: PingFangSC, PingFang SC;
  font-weight: 600;
  font-size: 32rpx;
  color: #FFFFFF;
  line-height: 48rpx;
  text-align: right;
  font-style: normal;
  text-transform: none;
}

.text_body_top {
  font-family: PingFangSC, PingFang SC;
  font-weight: 600;
  font-size: 32rpx;
  color: #FFFFFF;
  line-height: 44rpx;
  text-align: left;
  font-style: normal;
}

.text_body_top_1 {
  //width: 64rpx;
  padding-left: 10rpx;
  padding-right: 10rpx;
  background: #6666CC;
  border-radius: 13rpx;
  text-align: center;
  font-style: normal;
  font-family: Alibaba PuHuiTi 2.0;
  font-weight: normal;
  font-size: 27rpx;
  color: #FFFFFF;
  line-height: 44rpx;
}

.text_body_top_2 {
  font-family: PingFangSC, PingFang SC;
  font-weight: 400;
  font-size: 22rpx;
  color: #C1C1C7;
  line-height: 32rpx;
  text-align: left;
  font-style: normal;
  width: 400rpx;
  word-wrap: break-word;
  word-break: break-all;
  overflow: hidden; /*这个参数根据需求来决定要不要*/
}

.images {
  width: 132rpx;
  height: 132rpx;
  border-radius: 30rpx;
  border: 3rpx solid rgba(255, 255, 255, 0.65);
}

.body {
  width: 710rpx;
  height: 84rpx;
  background: rgba(0, 0, 0, 0.2);
  border-radius: 12rpx;


  //&-item {
  //  width: 160rpx;
  //  height: 100rpx;
  //  background: rgba(0, 0, 0, 0.2);
  //  border-radius: 12rpx;
  //}

}


</style>
