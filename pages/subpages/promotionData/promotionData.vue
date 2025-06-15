<template>
  <view>
    <view style="height: 100rpx"/>
    <view style="position: relative">
      <view class="top-title">推游小助手</view>
    </view>

    <view class="box_3">
      <view @click="change(1)" :class="type == 1?'text-wrapper_1 flex_center':'text-wrapper_2 flex_center'">
        <text @click="change(1)" :class="type == 1?'text_2':'text_3'">每日数据</text>
      </view>
      <view @click="change(2)" :class="type == 2?'text-wrapper_1 flex_center':'text-wrapper_2 flex_center'">
        <text  @click="change(2)" :class="type == 2?'text_2':'text_3'" >每月数据</text>
      </view>
    </view>
    <view class="top-notice" style="margin-top: 20rpx;">
    <uni-notice-bar
        @click="openPopup()"
        moreColor="#F5EFFF"
        background-color="#F5EFFF"
        color="#9966FF"
        show-get-more
        show-icon
        :text="notice.noticeTitle"
    />
    </view>
    <view class="body_order">
      <view class="left_30 flex_center">
        <image src="@/static/game_cps/ioc/wangguan.png" class="body_order_wang " />
        <view class="body_order_text left_20">
          排行榜
        </view>
      </view>
      <image src="@/static/game_cps/ioc/zuohuang.png" class="body_order_wang_zuo right_20" />
    </view>

    <view class="body_order_text left_30 top_30">
     合计
    </view>


    <view class="flex_between" style="padding: 30rpx 30rpx 30rpx 30rpx">
      <image src="@/static/game_cps/bg_huoyue_01@2x.png" class="image1">
        <view style="position: absolute">
          <view class="padding_20">
            <view class="text_pro_1">
              活跃
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
              收益
            </view>
            <view class="text_pro_2">
              ￥{{ detail.sourceStatistics['2'] || 0 }}
            </view>
          </view>
        </view>
      </image>
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
<!--      <view style="margin-top: 20rpx;margin-left: 20rpx;margin-right: 20rpx">-->
<!--        <uni-table border stripe emptyText="暂无更多数据">-->
<!--          &lt;!&ndash; 表头行 &ndash;&gt;-->
<!--          <uni-tr>-->
<!--            <uni-th width="80" align="center">日期</uni-th>-->
<!--            <uni-th width="80" align="center">推广游戏</uni-th>-->
<!--            <uni-th width="80" align="center">活跃</uni-th>-->
<!--            <uni-th width="80" align="center">收益</uni-th>-->
<!--          </uni-tr>-->
<!--          &lt;!&ndash; 表格数据行 &ndash;&gt;-->
<!--          <uni-tr v-for="(item,index) in Lists" :key="index">-->
<!--            <uni-td>{{ item.cycle }}</uni-td>-->
<!--            <uni-td>{{ item.gameName }}</uni-td>-->
<!--            <uni-td> {{ item.activeNum }}</uni-td>-->
<!--            <uni-td> {{ item.amount }}</uni-td>-->
<!--          </uni-tr>-->
<!--        </uni-table>-->
<!--      </view>-->

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
  &-notice {
    margin: 0rpx auto;
    height: 85rpx;
    width: 710rpx;
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

.body_order{
  width: 697rpx;
  height: 80rpx;
  background: #FFF5E3;
  border-radius: 27rpx;
  margin: 10rpx auto 0px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.body_order_text{
  font-family: Alibaba PuHuiTi 2.0;
  font-weight: normal;
  font-size: 32rpx;
  color: #000000;
  line-height: 36rpx;
}
.body_order_wang{
  width: 44rpx;
  height: 44rpx;
}
.body_order_wang_zuo{
  width:  32rpx;
  height:  32rpx

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

.box_3 {
  width: 697rpx;
  height: 67rpx;
  flex-direction: row;
  display: flex;
  justify-content: space-between;
  margin: 27rpx 0 0 27rpx;
}

.text-wrapper_1 {
  height: 67rpx;
  background: linear-gradient(90deg, #AB78FD, #8167FC);
  border-radius: 33rpx;
  display: flex;
  flex-direction: column;
  width: 337rpx;
}

.text_2 {
  overflow-wrap: break-word;
  color: rgba(255, 255, 255, 1);
  font-size: 27rpx;
  font-family: AlibabaPuHuiTi_2_75_SemiBold;
  font-weight: normal;
  text-align: center;
  white-space: nowrap;
  line-height: 36rpx;
}

.text-wrapper_2 {
  background-color: rgba(242, 242, 242, 1.000000);
  border-radius: 33rpx;
  height: 67rpx;
  display: flex;
  flex-direction: column;
  width: 337rpx;
}

.text_3 {
  overflow-wrap: break-word;
  color: rgba(153, 102, 255, 1);
  font-size: 27rpx;
  font-family: AlibabaPuHuiTi_2_55_Regular;
  font-weight: normal;
  text-align: center;
  white-space: nowrap;
  line-height: 36rpx;
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
  margin: 28rpx auto;
  width: 710rpx;
  height: 60rpx;
  border-radius: 12rpx;
}
</style>
