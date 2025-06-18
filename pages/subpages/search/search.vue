<template>
  <view class="top">
    <view class="flex_between top_20 left_20">
      <view class="top-ser flex_center_not_just">
        <view class="top-icon left_20" @click="onRefresh()"></view>
        <input v-model="name" class="left_20" style="width: 596rpx" placeholder="请输入要找的游戏" @input="onRefresh"/>
      </view>
      <view class="flex_around" @click="open">
        <view class="top-classify"/>
        <view class="top-text left_10 right_20">筛选</view>
      </view>
    </view>
    <view class="body">
      <view class="box_10 top_20" @click="getDetails(item)" v-for="(item, index) in Lists" :key="index">
        <view class="flex_center right_20">
          <image v-show="index == 0" src="@/static/game_cps/ioc/top1.png" class="image_top" lazy-load></image>
          <image v-show="index == 1" src="@/static/game_cps/ioc/top2.png" class="image_top" lazy-load></image>
          <image v-show="index == 2" src="@/static/game_cps/ioc/top3.png" class="image_top" lazy-load></image>
          <view v-show="index  > 2" class="image_top_text">
            {{ index + 1 }}
          </view>
        </view>
        <image :src="item.image" class="image_12" lazy-load></image>
        <view class="text-wrapper_12">
          <view class="flex_center" style="height: 50rpx">
            <text lines="1" class="paragraph_1">{{ item.name }}</text>
            <view class="paragraph_jing_bei">
              <view class="paragraph_jing">{{ item.category2Name }}</view>
            </view>
          </view>
          <text lines="1" decode="true" class="text_23">
            剩余名额: {{ item.places }}     分成: {{ item.cpsRegisteredRatio }}%
          </text>
        </view>
        <view class="text-wrapper_37">
          <text @click="startGame(item.appId)" lines="1" class="text_24">启动</text>
        </view>
        <view class="text-wrapper_38">
          <text @click="apply(item)" lines="1" class="text_25">申请</text>
        </view>
      </view>
    </view>
    <uni-popup ref="popup" background-color="#F4F6F8">
      <view class="popup_body padding_20">
        <view class="popup_body-tie2 center_margin">筛选</view>
        <view class="xian top_20"/>
        <view class="top_20">
          <view class="popup_body-tie">
            游戏类别
          </view>
          <view class="flex_bew_wrap">
            <view @click="setCategory(index)"
                  :class="category == index ? 'text1  left_20 top_20' : 'text left_20 top_20'"
                  v-for="(item, index) in listC" :key="index">{{ item.name }}
            </view>
          </view>
        </view>
        <view class="top_20">
          <view class="popup_body-tie">
            申请状态
          </view>
          <view class="flex_bew_wrap top_20">
            <view @click="setStatus(1)" :class="status == 1 ? 'text1  left_20' : 'text  left_20'">可申请
            </view>
            <view @click="setStatus(2)" :class="status == 2 ? 'text1  left_20' : 'text  left_20'">已满
            </view>
            <view @click="setStatus(3)" :class="status == 3 ? 'text1  left_20' : 'text  left_20'">成功
            </view>
            <view @click="setStatus(4)" :class="status == 4 ? 'text1  left_20' : 'text  left_20'">申请中
            </view>
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
      if (this.name) {
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
  border: 2rpx solid #9966FF;
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
  min-width: 123rpx;
  height: 67rpx;
  background: #F2F2F2;
  border-radius: 13rpx;
  font-family: Alibaba PuHuiTi 2.0;
  font-weight: normal;
  font-size: 32rpx;
  color: #666666;
  text-align: center;
  line-height: 58rpx;
}

.text1 {
  min-width: 123rpx;
  height: 67rpx;
  background: #F5EFFF;
  border-radius: 13rpx;
  font-family: Alibaba PuHuiTi 2.0;
  font-weight: normal;
  font-size: 32rpx;
  color: #9966FF;
  text-align: center;
  line-height: 58rpx;
  //font-family: PingFangSC, PingFang SC;
  //font-weight: 400;
  //font-size: 28rpx;
  //color: #5ACF86;
  //line-height: 60rpx;
  //text-align: center;
  //font-style: normal;
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
  background: #F4F6F8;
  border-radius: 40rpx 40rpx 0rpx 0rpx;

  &-tie {
    //font-family: PingFangSC, PingFang SC;
    //font-weight: 500;
    //font-size: 30rpx;
    //color: #000000;
    //line-height: 42rpx;
    //text-align: left;
    //font-style: normal;

    font-family: Alibaba PuHuiTi 2.0;
    font-weight: normal;
    font-size: 32rpx;
    color: #000000;
    line-height: 35rpx;
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

.box_10 {
  width: 720rpx;
  height: 108rpx;
  flex-direction: row;
  display: flex;
  margin: 33rpx auto 5rpx;
}

.image_12 {
  width: 147rpx;
  height: 108rpx;
  border-radius: 20rpx;

}

.text_25 {
  width: 49rpx;
  height: 25rpx;
  overflow-wrap: break-word;
  color: rgba(153, 102, 255, 1);
  font-size: 27rpx;
  font-family: AlibabaPuHuiTi_2_75_SemiBold;
  font-weight: normal;
  text-align: left;
  white-space: nowrap;
  margin: 10rpx auto;
}

.text_24 {
  width: 51rpx;
  height: 25rpx;
  overflow-wrap: break-word;
  color: rgba(255, 255, 255, 1);
  font-size: 27rpx;
  font-family: AlibabaPuHuiTi_2_75_SemiBold;
  font-weight: normal;
  text-align: center;
  white-space: nowrap;
  margin: 10rpx auto;
}

.image_top_text {
  width: 52rpx;
  height: 52rpx;
  font-family: Alibaba PuHuiTi 2.0;
  font-weight: normal;
  text-align: center;
  font-size: 32rpx;
  color: #999999;
  line-height: 36rpx;
}

.image_top {
  width: 52rpx;
  height: 52rpx;
}

.text-wrapper_38 {
  height: 57rpx;
  background: #F5EFFF;
  background-size: 100% 100%;
  border-radius: 16rpx 30rpx 30rpx 16rpx;
  display: flex;
  flex-direction: column;
  width: 120rpx;
  margin: 25rpx 0 0 8rpx;
}

.text-wrapper_37 {
  height: 57rpx;
  background: #9966FF;
  border-radius: 30rpx 16rpx 16rpx 30rpx;
  background-size: 100% 100%;
  display: flex;
  flex-direction: column;
  width: 120rpx;
  margin: 25rpx 0 0 8rpx;
}

.text_23 {
  width: 261rpx;
  height: 67rpx;
  overflow-wrap: break-word;
  color: rgba(153, 153, 153, 1);
  font-size: 24rpx;
  font-family: AlibabaPuHuiTi_2_55_Regular;
  font-weight: normal;
  text-align: left;
  line-height: 40rpx;
}

.paragraph_jing {
  font-family: Alibaba PuHuiTi 2.0;
  font-weight: normal;
  font-size: 24rpx;
  color: #3399FF;
  line-height: 44rpx;
  margin-left: 10rpx;
  margin-right: 10rpx;
}

.paragraph_jing_bei {
  min-width: 73.33rpx;
  background: #E5F5FF;
  border-radius: 20rpx 20rpx 20rpx 0rpx;
  margin-bottom: 40rpx;
}

.paragraph_1 {
  width: 241rpx;
  height: 67rpx;
  overflow-wrap: break-word;
  color: rgba(0, 0, 0, 1);
  font-size: 32rpx;
  font-family: AlibabaPuHuiTi_2_55_Regular;
  font-weight: normal;
  text-align: left;
  line-height: 40rpx;
  text-overflow: ellipsis;
  white-space: nowrap;
  overflow: hidden;
}

.text-wrapper_12 {
  width: 400rpx;
  height: 67rpx;
  overflow-wrap: break-word;
  font-size: 0rpx;
  font-family: AlibabaPuHuiTi_2_55_Regular;
  font-weight: normal;
  text-align: left;
  line-height: 40rpx;
  margin: 19rpx 0 0 20rpx;
}

.top {
  &-ser {
    width: 567rpx;
    height: 59rpx;
    background: #F2F2F2;
    border-radius: 29rpx;
    width: 596rpx;
    height: 64rpx;

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
    background: url('@/static/game_cps/btn_primary_normal_screen.png');
    background-size: 100% 100%;
    margin-left: 20rpx;
  }

  &-text {
    font-family: Alibaba PuHuiTi 2.0;
    font-weight: normal;
    font-size: 27rpx;
    color: #9966FF;
    line-height: 36rpx;
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
