<template>
  <view>
    <view class="flex_center_not_just padding_20 top_20 flex_between">
      <view class="flex_between">
        <span class="body-text left_10">一级收益</span>
      </view>
      <view>
      </view>
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
    <view class="item center_margin top_20" v-for="(item,index) in Lists" :key="index">
      <view class="padding_20">
        <view class="text5">
          {{ item.createTime | parseTime }}
        </view>
        <view class="flex_between top_20">
          <view class="text6">
            子渠道
          </view>
          <view class="text7">
            {{ item.remark }}
          </view>
        </view>
        <view class="flex_between top_20">
          <view class="text6">
            子收益
          </view>
          <view class="text7">
            {{ item.amount }}
          </view>
        </view>
        <view class="flex_between top_20">
          <view class="text6">
            我的提成
          </view>
          <view class="text8">
            {{ item.toAmount }}
          </view>
        </view>
      </view>
    </view>
  </view>
</template>


<script>
import {
  parseTime
} from '@/js/utils.js'
import api from "@/js/api";

export default {
  data() {
    return {
      Lists: [],
      noMore: false,
      pageNum: 1,
      hasData: true,
      detail: {}
    }
  },
  filters: {
    parseTime,
  },
  onReachBottom() {
    if (this.noMore) return
    this.pageNum++
    this.getList()
  },
  onPullDownRefresh() {
    this.onRefresh()
  },
  onLoad() {
  },
  onShow() {
    this.getList()
    let par = {}
    par['userSource'] = 1
    api.statistics({params: par}).then(res => {
      if (res.code == 200) {
        this.detail = res.data
      }
    })
  },
  methods: {
    onRefresh() {
      this.pageNum = 1
      this.noMore = false
      this.getList(true)
    },
    getList(reload = false) {
      // 查询游戏上级收益信息列表
      api.getToUserIdList(this.pageNum).then(res => {
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
  }
}
</script>

<style lang="scss" scoped>
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

  &-moreImg {
    height: 160rpx;
    width: 710rpx;
    background-size: 100% 100%;
    position: absolute;
  }


  &-moreImg3 {
    height: 140rpx;
    width: 710rpx;
    position: absolute;
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
.text1 {
  font-family: Alibaba PuHuiTi 2.0;
  font-weight: normal;
  font-size: 27rpx;
  color: #FFFFFF;
  line-height: 44rpx;
  opacity: 0.6;
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
.text2 {
  font-family: Alibaba PuHuiTi 2.0;
  font-weight: normal;
  font-size: 32rpx;
  color: #FFFFFF;
  line-height: 44rpx;
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
  background: #F2F2F2;
  border-radius: 12rpx;
}


</style>
