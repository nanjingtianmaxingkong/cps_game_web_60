<template>
  <view class="top">
    <view class="flex_between top_20 left_20">
      <view class="top-ser flex_center_not_just">
        <view class="top-icon left_20" @click="onRefresh()"></view>
        <input v-model="name" class="left_20" style="width: 596rpx" placeholder="请输入要找的游戏" @input="onRefresh" />
      </view>
      <view class="flex_around" @click="open">
        <view class="top-classify" />
        <view class="top-text left_10 right_20">筛选</view>
      </view>
    </view>

    <view class="body">
      <view v-if="Lists.length > 8 && Lists[oc].banner">
        <image class="bak center_margin top_20 left_20" :src="Lists[oc].banner" />
      </view>
      <view class="padding_20 flex_between" v-for="(item, index) in Lists" :key="index">
        <image class="images-top_red top_10" :src="item.image"></image>
        <view class="left_20" @click="getDetails(item)">
          <view class="flex_center_not_just"><span class="body_item" style="overflow: hidden;width: 180rpx">{{ item.name
              }}</span><span class="css_button_cyan left_20">{{ item.category2Name }}</span> <span
              class="css_button_grey left_20">{{
                item.category3Name
              }}</span>
          </view>
          <!--        todo 世纪特供一  -->
          <view>
            <span class="text_24_grey">CPS+M 佣金结算</span><span class="text_24_grey left_40"
              v-show="item.places <= 1">名额：</span>
            <span class="text_24_green left_10">{{ item.places > 0 ? "名额充足" : item.places }}</span>
          </view>
        </view>
        <view class="flex_around">
<!--          <button class="css_button_gre_yuan_green_small left_20" @click="startGame(item.appId)">测评</button>-->
          <button class="css_button_gre_yuan_green_more left_20"
            @click="apply(item)">{{ getStatus(item.status) }}</button>
        </view>
      </view>
    </view>
    <uni-popup ref="popup" background-color="#F4F6F8">
      <view class="popup_body padding_20">
        <view class="popup_body-tie2 center_margin">筛选</view>
        <view class="xian top_20" />
        <view class="top_20">
          <view class="popup_body-tie">
            游戏类别
          </view>
          <view class="flex_bew_wrap">
            <view @click="setCategory(index)"
              :class="category == index ? 'text1 active left_20 top_20' : 'text quanBu left_20 top_20'"
              v-for="(item, index) in listC" :key="index">{{ item.name }}
            </view>
          </view>
        </view>
        <view class="top_20">
          <view class="popup_body-tie">
            申请状态
          </view>
          <view class="flex_bew_wrap top_20">
            <view @click="setStatus(1)" :class="status == 1 ? 'text1 active left_20' : 'text quanBu left_20'">可申请</view>
            <view @click="setStatus(2)" :class="status == 2 ? 'text1 active left_20' : 'text quanBu left_20'">已满</view>
            <view @click="setStatus(3)" :class="status == 3 ? 'text1 active left_20' : 'text quanBu left_20'">成功</view>
            <view @click="setStatus(4)" :class="status == 4 ? 'text1 active left_20' : 'text quanBu left_20'">申请中</view>
          </view>
        </view>
      </view>
    </uni-popup>
  </view>
</template>
<script>
import store from "@/store/index.js"
import api from "@/js/api.js"
import env from "@/js/config.js"

export default {
  data() {
    return {
      Lists: [],
      oc: 1,
      noMore: false,
      pageNum: 1,
      hasData: true,
      listC: [],
      status: null,
      category: null,
      category2Id: null,
      name: null,
    }
  },
  onLoad(options) {
    // 随机拉取图片
    this.oc = Math.floor(Math.random() * 5) + 1;
    console.log(options.category2Id);
    if (options.category2Id && options.category2Id != 'null' && options.category2Id != 'undefined') {
      this.category2Id = options.category2Id
    }
    this.getList()
    api.gameCategory().then(res => {
      this.listC = res.rows
    })
  },
  computed: {},
  onReachBottom() {
    if (this.noMore) return
    this.pageNum++
    this.getList()
  },
  onPullDownRefresh() {
    this.onRefresh()
  },
  methods: {
    startGame(val) {
      wx.navigateToMiniProgram({
        appId: val,
        path: `/?wxgamepro=${env.BASE_CHANNEL}`,
        //develop开发版；trial体验版；release正式版
        envVersion: 'release',
        success(res) {
          // 打开成功
          console.log("跳转小程序成功！", res);
        }
      })
    },
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
    clear() {
      this.status = null;
      this.category = null;
      this.category2Id = null;
      this.name = null;
    },
    setStatus(val) {
      this.status = val
      this.pageNum = 1
      this.noMore = false
      this.getList(true)
    },
    setCategory(val) {
      console.log(val)
      this.category = val
      console.log(this.listC[val])
      this.category2Id = this.listC[val].id
      this.pageNum = 1
      this.noMore = false
      this.getList(true)
    },

    open() {
      this.$refs.popup.open('bottom')
    },
    onRefresh() {
      this.pageNum = 1
      this.noMore = false
      this.getList(true)
    },
    getList(reload = false) {
      if(this.name){
        this.category2Id = null
      }
      api.gameList({
        status: this.status,
        category2Id: this.category2Id,
        name: this.name
      }, this.pageNum).then(res => {
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
    getDetails(val) {
      console.log("val", val)
      store.commit('setGameDet', val)
      // 跳转详情
      uni.navigateTo({
        url: "/pages/subpages/common/gameBriefly"
      })
    },
  }
}
</script>

<style scoped lang="scss">
.active {
  min-width: 100rpx;
  height: 60rpx;
  background: #FFFFFF;
  border-radius: 10rpx;
  border: 2rpx solid #5ACF86;
  z-index: 10;
}

.quanBu {
  min-width: 108rpx;
  height: 60rpx;
  background: #FFFFFF;
  border-radius: 10rpx;
  border: 2rpx solid #E4E4E4;
}

.text {
  font-family: PingFangSC, PingFang SC;
  font-weight: 400;
  font-size: 28rpx;
  color: #000000;
  line-height: 60rpx;
  text-align: center;
  font-style: normal;
}

.text1 {
  font-family: PingFangSC, PingFang SC;
  font-weight: 400;
  font-size: 28rpx;
  color: #5ACF86;
  line-height: 60rpx;
  text-align: center;
  font-style: normal;
}

.bak {
  width: 710rpx;
  height: 280rpx;
  border-radius: 24rpx;
  border: 4rpx solid #2E2646;
}

.images-top_red {
  width: 108rpx;
  height: 108rpx;
  border-radius: 18rpx;
}

.xian {
  height: 2rpx;
  background-color: #E9E9E9;
}

.body_item {
  ont-family: PingFangSC, PingFang SC;
  font-weight: 400;
  font-size: 28rpx;
  color: #000000;
  line-height: 40rpx;
  text-align: left;
  font-style: normal;
}

.popup_body {
  height: 500rpx;
  background: #F4F6F8;
  border-radius: 40rpx 40rpx 0rpx 0rpx;

  &-tie {
    font-family: PingFangSC, PingFang SC;
    font-weight: 500;
    font-size: 30rpx;
    color: #000000;
    line-height: 42rpx;
    text-align: left;
    font-style: normal;
  }

  &-tie2 {
    font-family: PingFangSC, PingFang SC;
    font-weight: 500;
    font-size: 30rpx;
    color: #000000;
    line-height: 42rpx;
    text-align: center;
    font-style: normal;
  }

  &-tie1 {
    font-family: PingFangSC, PingFang SC;
    font-weight: 400;
    font-size: 28rpx;
    color: #000000;
    line-height: 40rpx;
    text-align: center;
    font-style: normal;
  }
}

.top {
  &-ser {
    width: 596rpx;
    height: 64rpx;
    background: #F4F6F8;
    border-radius: 32rpx;

    font-family: PingFangSC, PingFang SC;
    font-weight: 400;
    font-size: 28rpx;
    color: #999999;
    line-height: 40rpx;
    text-align: left;
    font-style: normal;
  }

  &-icon {
    width: 32rpx;
    height: 32rpx;
    background: url('@/static/game_cps/icon_search@2x.png');
    background-size: 100% 100%;
    margin-left: 20rpx;
  }

  &-classify {
    width: 32rpx;
    height: 32rpx;
    background: url('@/static/game_cps/btn_primary_normal_screen@2x.png');
    background-size: 100% 100%;
    margin-left: 20rpx;
  }

  &-text {
    font-family: PingFangSC, PingFang SC;
    font-weight: 500;
    font-size: 28rpx;
    color: #333333;
    line-height: 40rpx;
    text-align: center;
    font-style: normal;
  }

}


.body {
  &-top {
    &-text {
      font-family: PingFangSC, PingFang SC;
      font-weight: 500;
      font-size: 30rpx;
      color: #000000;
      line-height: 42rpx;
      font-style: normal;
    }

    &-text_hui {
      font-family: PingFangSC, PingFang SC;
      font-weight: 400;
      font-size: 24rpx;
      color: #999999;
      line-height: 34rpx;
      font-style: normal;
    }

    &-text_but {
      margin-top: 16rpx;
      font-family: PingFangSC, PingFang SC;
      font-weight: 500;
      font-size: 24rpx;
      color: #333333;
      line-height: 34rpx;
      font-style: normal;
    }
  }
}
</style>
