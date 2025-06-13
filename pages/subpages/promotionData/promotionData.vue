<template>
  <view>
    <view  class="top flex_center_not_just">
      <view @click="change(1)" :class="type == 1?'active':'active-text'" style="width: 50%">
        <view class="flex_center">
          每日数据
        </view>
        <view style="height: 15rpx"></view>
        <view :class="type == 1?'active1':''"/>
      </view>
      <view @click="change(2)" :class="type == 2?'active':'active-text'" style="width: 50%">
        <view class="flex_center">
          每月数据
        </view>
        <view style="height: 15rpx"></view>
        <view :class="type == 2?'active1':''"/>
      </view>
    </view>
    <view class="top-notice">
      <uni-notice-bar @click="openPopup()" moreColor="#999999" background-color="#EBFAEE" color="#27C089" show-get-more
                      show-icon :text="notice.noticeTitle"/>
    </view>
    <view class="container" >
      <view style="height: 20rpx"/>
      <view class="body center_margin">
        <view class="flex_center_not_just padding_20">
          <span class="body-lv"/>
          <span class="body-text left_10">合计</span>
        </view>
        <view class="flex_between" style="padding: 0rpx 20rpx 20rpx 20rpx">
          <image src="@/static/game_cps/bg_huoyue_01@2x.png" class="image1">
            <view style="position: absolute">
              <view class="padding_20">
                <view class="text_pro_1">
                  广告注册数据
                </view>
                <view class="text_pro_2">
                  ￥{{ detail.sourceStatistics['1'] || 0 }}
                </view>
              </view>
            </view>
          </image>
          <image src="@/static/game_cps/bg_shouyi_02@2x.png" class="image">
            <view style="position: absolute;margin-left: 50%">
              <view class="padding_20">
                <view class="text_pro_1">
                  广告回流数据
                </view>
                <view class="text_pro_2">
                  ￥{{ detail.sourceStatistics['2'] || 0 }}
                </view>
              </view>
            </view>
          </image>
        </view>
        <view class="flex_between" style="padding: 0rpx 20rpx 20rpx 20rpx">
          <image src="@/static/game_cps/bg_huoyue_01@2x.png" class="image1">
            <view style="position: absolute;">
              <view class="padding_20">
                <view class="text_pro_1">
                  内购注册数据
                </view>
                <view class="text_pro_2">
                  ￥{{ detail.sourceStatistics['3'] || 0 }}
                </view>
              </view>
            </view>
          </image>
          <image src="@/static/game_cps/bg_shouyi_02@2x.png" class="image">
            <view style="position: absolute;margin-left: 50%">
              <view class="padding_20">
                <view class="text_pro_1">
                  内购回流数据
                </view>
                <view class="text_pro_2">
                  ￥{{ detail.sourceStatistics['4'] || 0 }}
                </view>
              </view>
            </view>
          </image>
        </view>
      </view>

      <view style="margin-top: 20rpx;margin-left: 20rpx;margin-right: 20rpx">
        <uni-table border stripe emptyText="暂无更多数据">
          <!-- 表头行 -->
          <uni-tr>
            <uni-th width="80" align="center">日期</uni-th>
            <uni-th width="80" align="center">推广游戏</uni-th>
            <uni-th width="80" align="center">活跃</uni-th>
            <uni-th width="80" align="center">收益</uni-th>
          </uni-tr>
          <!-- 表格数据行 -->
          <uni-tr v-for="(item,index) in Lists" :key="index">
            <uni-td>{{ item.cycle}}</uni-td>
            <uni-td>{{ item.gameName }}</uni-td>
            <uni-td> {{ item.activeNum }}</uni-td>
            <uni-td> {{ item.amount }}</uni-td>
          </uni-tr>
        </uni-table>
      </view>
    </view>

    <uni-popup ref="alertDialog">
      <uni-popup-dialog type="success" cancelText="取消" confirmText="我已知晓"
                        @confirm="closePo()">
        <view v-html="notice.noticeContent"></view>
      </uni-popup-dialog>
    </uni-popup>
  </view>
</template>

<script>
import store from "@/store/index.js"
import api from '@/js/api.js'
import {
  parseTime,
} from '@/js/utils.js'

export default {
  name: "promotionData",

  data() {
    return {
      popupText: '—\\8月15-9月15号将上架以下数款热',
      List: [],
      type: 1,
      notice: {},
      Lists: [],
      noMore: false,
      pageNum: 1,
      hasData: true,
      startCycle: null,
      endCycle: null,
      detail: {},
      info: {}
    };
  },
  computed: {},
  filters: {
    parseTime,
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
    wx.showShareMenu({
      withShareTicket: true,
      menus: ["shareAppMessage"]
    })
    // 拉取公告
    api.notice(3).then(res => {
      if (res.code == 200) {
        this.notice = res.rows[0]
      }
    })
    api.userInfo().then(res => {
      if (res.code == 200) {
        this.info = res.data
      }
    })
    // 统计
    let par = {}
    par['userSource'] = 2
    api.statistics({params: par}).then(res => {
      if (res.code == 200) {
        this.detail = res.data
      }
    })
    this.change(1)
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
    getSource(val) {
      switch (val) {
        case 1:
          return "广告注册数据";
        case 2:
          return "广告回流数据";
        case 3:
          return "内购注册数据";
        case 4:
          return "内购回流数据";
      }
    },
    onRefresh() {
      this.pageNum = 1
      this.noMore = false
      this.getList(true)
    },
    getList(reload = false) {
      // 查询游戏上级收益信息列表
      let par = {}
      par['startCycle'] = this.startCycle
      par['endCycle'] = this.endCycle
      api.statisticsList(this.pageNum, {params: par}).then(res => {
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
    change(val) {
      const yesterday = new Date();
      yesterday.setDate(yesterday.getDate() - 1);
      if (val == 1) {
        // Daily cycle - set to yesterday's full day
        this.startCycle = new Date(yesterday);
        this.startCycle.setHours(0, 0, 0, 0);
        this.endCycle = new Date(yesterday);
        this.endCycle.setHours(23, 59, 59, 999);
      } else {
        // Monthly cycle - set to yesterday's month
        this.startCycle = new Date(yesterday.getFullYear(), yesterday.getMonth(), 1);
        this.endCycle = new Date(yesterday.getFullYear(), yesterday.getMonth() + 1, 0);
      }
      this.Lists = []
      this.type = val
      this.getList()
    },
    openPopup() {
      this.$refs.alertDialog.open()
    },
    closePo() {
      this.$refs.alertDialog.close()
    },
  }
};
</script>

<style lang="scss" scoped>
.top {
  margin-top: 20rpx;
  background: #FFFFFF;

  &-notice {
    height: 55rpx;
    border-radius: 24rpx;
    font-family: PingFangSC, PingFang SC;
  }
}

.active {
  font-family: PingFangSC, PingFang SC;
  font-weight: 500;
  font-size: 28rpx;
  color: #000000;
  line-height: 40rpx;
  text-align: right;
  font-style: normal;
}

.active-text {
  font-family: PingFangSC, PingFang SC;
  font-weight: 400;
  font-size: 28rpx;
  color: #333333;
  line-height: 40rpx;
  text-align: right;
  font-style: normal;
}

.text_pro_1 {
  font-family: PingFangSC, PingFang SC;
  font-weight: 400;
  font-size: 24rpx;
  color: #666666;
  line-height: 34rpx;
  font-style: normal;
}

.text_pro_2 {
  font-family: PingFangSC, PingFang SC;
  font-weight: 600;
  font-size: 32rpx;
  color: #000000;
  line-height: 44rpx;
  font-style: normal;
}

.item_body {
  width: 710rpx;
  background: #FFFFFF;
  border-radius: 12rpx;
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


.body {
  width: 710rpx;
  background: #FFFFFF;
  border-radius: 12rpx;

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
}

.container {
  width: 100%;
  background-color: #F2F2F2;
  min-height: 90vh;
}

.active1 {
  width: 376rpx;
  height: 6rpx;
  background: #5ACF86;
}

::v-deep .uni-noticebar {
  height: 60rpx;
}

.image {
  width: 310rpx;
  height: 100rpx;
  position: relative;
}

.image1 {
  width: 310rpx;
  height: 100rpx;
  position: relative;
}

::v-deep .uni-noticebar {
  margin-bottom: 0rpx;
}
</style>
