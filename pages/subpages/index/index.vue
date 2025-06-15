<template>
  <view class="content">
    <view
        class="top"
    >
      <view style="position: relative">
        <view style="height: 100rpx"/>
        <view class="top-title">推游小助手</view>
        <view class="flex_between">
          <view class="flex_center">
            <view @click="()=>{topTab = 1}" :class="topTab != 1? 'top-false':'top-true'">
              推荐
            </view>
            <view @click="()=>{topTab = 0}" :class="topTab == 1? 'top-false':'top-true'">
              热门推荐
            </view>
          </view>
          <view>
            <view class="top-ser right_20 flex_center_not_just">
              <view class="top-icon left_20" @click="onRefresh()"/>
              <input
                  v-model="name"
                  class="left_20"
                  placeholder="尝鲜最新游戏"
                  @input="onRefresh"
              />
            </view>
          </view>
        </view>
        <view style="height: 30rpx;"/>
        <view class="top-notice" style="margin-top: -30rpx;">
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
        <view v-show="topTab == 1">
          <scroll-view class="top_swiper_img" scroll-x="true" scroll-left="120">
            <view
                v-for="(item, index) in bannerList"
                :key="index"
                class="top_swiper_img1 "
            >
              <image
                  @click="goH5(item)"
                  class="top_swiper_img1 left_20"
                  :src="item.configKey"
              />
              </view>
          </scroll-view>
          <!--  todo 测试图片          https://apk.zhizuan.xyz/juimage.png-->
          <view class="top_50">
            <view class="body-top-text left_25">最新上架</view>
          </view>
          <view>
            <scroll-view class="scroll-view_H" scroll-x="true" scroll-left="120">
              <view
                  v-for="(item, index) in Listts"
                  :key="index"
                  class="scroll-view-item_H uni-bg-red"
              >
                <view v-if="item.mainImage1">
                  <view class="body1-today">
                   {{getDateFrom(item.createTime)}}
                  </view>
                  <image
                      @click="getDetails(item)"
                      class="top_swiper_img2 left_20"
                      :src="item.mainImage1"
                  />
                  <view class="body1-application">
                    申请
                  </view>
                  <view class="body1-gameName">
                    {{ item.name }}
                  </view>
                </view>
              </view>
            </scroll-view>
          </view>

          <view class="top_50">
            <view class="body-top-text left_25">热门推荐</view>
          </view>

          <image class="body-bak-image left_25 top_30" src="https://apk.zhizuan.xyz/bakimage.png">
            <scroll-view class="scroll-view_H1 left_25" scroll-x="true" scroll-left="120">
              <view
                  v-for="(item, index) in Listts"
                  :key="index"
                  class="scroll-view-item_H1 uni-bg-red"
              >
                <image
                    @click="getDetails(item)"
                    class="body_imges_img top_200 left_20"
                    :src="item.image"
                />
              </view>
            </scroll-view>

            <scroll-view class="scroll-view_H1 left_25" scroll-x="true" scroll-left="220">
              <view
                  class="scroll-view-item_H1 uni-bg-red"
              >
                <view
                    class="body_imges_img top_50 left_20"
                />
              </view>
              <view
                  v-for="(item, index) in Listts"
                  :key="index"
                  class="scroll-view-item_H1 uni-bg-red"
              >
                <image
                    @click="getDetails(item)"
                    class="body_imges_img top_50 left_20"
                    :src="item.image"
                />
              </view>
            </scroll-view>
          </image>
          <view class="index_flex_body padding_25">
            <view class="top_50">
              <view class="body-top-text left_25">榜单</view>
            </view>
          </view>
        </view>
        <view v-show="topTab != 1">
          <view class="pay_game_text left_25">
            先玩在申，发现宝藏！
          </view>
          <view class="pay_game_text1 left_25 top_10">
            先玩在申，发现宝藏！
          </view>
          <scroll-view class="scroll-view_H top_40" scroll-x="true" scroll-left="120">
            <view
                v-for="(item, index) in Listts"
                :key="index"
                class="scroll-view-item_H uni-bg-red"
            >
              <view v-if="item.mainImage2">
                <image
                    @click="getDetails(item)"
                    class="top_swiper_img3 left_20"
                    :src="item.mainImage2"
                />
            </view>
            </view>
          </scroll-view>
          <view class="pay_game_text left_25 top_50">
            几分钟，玩一局
          </view>
          <view class="pay_game_text1 left_25 top_10">
            为了胜利，一决高下！
          </view>
        </view>

        <view class="box_10"
              v-for="(item, index) in Listts"
              :key="index">
          <image :src="item.image" class="image_12"></image>
          <view class="text-wrapper_12">
            <view class="flex_center">
              <text lines="1" class="paragraph_1">{{ item.name }}</text>
              <view class="paragraph_jing_bei">
                <view class="paragraph_jing">{{item.category2Name}}</view>
              </view>
            </view>
            <text lines="1" decode="true" class="text_23">
              剩余名额:&nbsp;{{ item.places }} &nbsp;&nbsp;&nbsp; 分成:{{ item.cpsRegisteredRatio }}%
            </text>
          </view>
          <view class="text-wrapper_37">
            <text lines="1" class="text_24">启动</text>
          </view>
          <view class="text-wrapper_38">
            <text lines="1" class="text_25">申请</text>
          </view>
        </view>
      </view>
    </view>

    <uni-popup ref="alertDialog">
      <uni-popup-dialog
          type="success"
          cancelText="取消"
          confirmText="我已知晓"
          @confirm="closePo()"
      >
        <view
            v-html="notice.noticeContent"
            style="max-height: 400px; overflow-y: auto;"
        />
      </uni-popup-dialog>
    </uni-popup>
  </view>
</template>

<script>
import store from "@/store/index.js";
import api from "@/js/api.js";
import {mapState} from "vuex";
import {parseTime, copy} from "@/js/utils.js";
import env from "@/js/config.js";

export default {
  computed: {
    ...mapState({
      userInfo: (state) => state.user.userInfo,
      config: (state) => state.user.config,
      gameDet: (state) => state.order.gameDet,
    }),
  },
  data() {
    return {
      name: "",
      scrollTop: 0,
      topTab: 1,
      notice: {},
      bannerList: [],
      Listts: [],
      noMore: false,
      pageNum: 1,
      pageSize: 10,
      info: {},
    };
  },
  filters: {
    parseTime,
  },
  onLoad(options) {
    this.getList();
    api.notice(1).then((res) => {
      if (res.code === 200) this.notice = res.rows[0];
    });
    this.getBannerConfig();
    if (!options.code) {
      api.userInfo().then((res) => {
        if (res.code === 200) this.info = res.data;
      });
    }
  },
  methods: {
    getBannerConfig() {
      api.getBannerConfig().then((res) => {
        if (res.code === 200) this.bannerList = res.data;
      });
    },
    onRefresh() {
      this.pageNum = 1;
      this.noMore = false;
      this.getList(true);
    },
    getList(reload = false) {
      api.gameList({ name: this.name }, this.pageNum).then((res) => {
        if (reload) uni.stopPullDownRefresh();
        if (res.rows.length < this.pageSize) this.noMore = true;

        // 处理数据，分别提取 direction=1 和 direction=2 的第一张图片
        const processedRows = res.rows.map(item => {
          if (!item.imgList || item.imgList === '[]') {
            return {
              ...item,
              mainImage1: null,  // direction=1 的第一张图
              mainImage2: null   // direction=2 的第一张图
            };
          }

          try {
            const imgList = JSON.parse(item.imgList);

            // 找到第一个 direction=1 的图片
            const firstImage1 = imgList.find(img => img.direction === 1);

            // 找到第一个 direction=2 的图片
            const firstImage2 = imgList.find(img => img.direction === 2);

            return {
              ...item,
              mainImage1: firstImage1?.img_url || null,  // 存入 direction=1 的第一张图
              mainImage2: firstImage2?.img_url || null   // 存入 direction=2 的第一张图
            };
          } catch (e) {
            console.error('解析imgList失败:', e, '原始数据:', item.imgList);
            return {
              ...item,
              mainImage1: null,
              mainImage2: null
            };
          }
        });

        this.Listts = reload ? processedRows : [...this.Listts, ...processedRows];
        console.log('处理后的数据:', this.Listts);
      });
    },
    // 格式化创建时间
    getDateFrom(createDate) {
      if (!createDate) return '';
      // 解析传入的时间（兼容ISO格式和字符串格式）
      const inputDate = new Date(createDate);
      if (isNaN(inputDate.getTime())) return ''; // 无效日期处理
      const today = new Date();
      // 判断是否是今天（比较年月日）
      const isToday =
          inputDate.getDate() === today.getDate() &&
          inputDate.getMonth() === today.getMonth() &&
          inputDate.getFullYear() === today.getFullYear();
      if (isToday) {
        return '今天';
      } else {
        // 返回格式：几月几号（如 5月6日）
        const month = inputDate.getMonth() + 1; // 月份从0开始
        const day = inputDate.getDate();
        return `${month}月${day}日`;
      }
    },
    goH5(item) {
      if (item.configType === "1") {
        uni.navigateTo({url: `/pages/subpages/commonH5/index?url=${item.configValue}`});
      } else {
        uni.switchTab({url: item.configValue});
      }
    },
    goSer(val) {
      const url = val === 0
          ? "/pages/subpages/search/search"
          : `/pages/subpages/search/search?category2Id=${val}`;
      uni.navigateTo({url});
    },
    getDetails(item) {
      store.commit("setGameDet", item);
      uni.navigateTo({url: "/pages/subpages/common/gameBriefly"});
    },
    openPopup() {
      this.$refs.alertDialog.open();
    },
    closePo() {
      this.$refs.alertDialog.close();
    },
    onReachBottom() {
      if (this.noMore) return;
      this.pageNum++;
      this.getList();
    },
  },
};
</script>

<style scoped lang="scss">

.top {
  width: 100%;
  height: 260px;
}

.body_imges_img {
  width: 160rpx;
  height: 160rpx;
  border-radius: 30rpx;
  object-fit: contain;
  overflow: hidden;
}

.body_imges_img_con {
  width: 683.33rpx;
  height: 683.33rpx;
  overflow: hidden;

}

.body_imges_logo {
  width: 76rpx;
  height: 76rpx;
  border-radius: 16rpx 16rpx 16rpx 16rpx;
}

.body_imges_cc {
  width: 230rpx;
}

.index_flex_body {
  margin-top: 120rpx;
  padding: 15rpx;
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
  gap: 10rpx;
}

.card_images {
  background-color: white;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  margin-top: 15rpx;
  font-family: Arial, sans-serif;
}

.body_imges_text {
  width: 190rpx;
  text-overflow: ellipsis;
  white-space: nowrap;
  overflow: hidden;
  font-family: PingFang SC, PingFang SC;
  font-weight: 600;
  font-size: 28rpx;
  color: #000000;
  line-height: 33rpx;
  text-align: left;
  font-style: normal;
  text-transform: none;
}

.box_10 {
  width: 684rpx;
  height: 108rpx;
  flex-direction: row;
  display: flex;
  margin: 33rpx auto 33rpx;
}

.image_12 {
  width: 147rpx;
  height: 108rpx;
  border-radius: 20rpx;

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

.paragraph_jing_bei {
  min-width: 73.33rpx;
  background: #E5F5FF;
  border-radius: 20rpx 20rpx 20rpx 0rpx;
  margin-bottom: 40rpx;
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

.text-wrapper_37 {
  height: 57rpx;
  background: #9966FF;
  border-radius: 30rpx 16rpx 16rpx 30rpx;
  background-size: 100% 100%;
  display: flex;
  flex-direction: column;
  width: 120rpx;
  margin: 25rpx 0 0 48rpx;
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

.text-wrapper_38 {
  height: 57rpx;
  background: #F5EFFF;
  background-size: 100% 100%;
  border-radius: 16rpx 30rpx 30rpx 16rpx;
  display: flex;
  flex-direction: column;
  width: 120rpx;
  margin: 25rpx 0 0 20rpx;
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

.start {
  width: 84rpx;
  height: 34rpx;
  position: relative;
}

.start_text {
  position: absolute;
  width: 60rpx;
  height: 28rpx;
  font-family: PingFang SC, PingFang SC;
  font-weight: 400;
  font-size: 20rpx;
  color: #000000;
  line-height: 23rpx;
  text-align: left;
  font-style: normal;
  text-transform: none;
}

.left_170 {
  margin-left: 180rpx;
}

.left_150 {
  margin-left: 110rpx;
}

.top {
  &-ser {
    width: 296rpx;
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
    width: 42rpx;
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

.item_content {
  width: 100%;
  height: 30rpx;
  background-color: #F2F2F2;
}

.pay_game_text{
  height: 35rpx;
  font-family: Alibaba PuHuiTi 2.0;
  font-weight: normal;
  font-size: 36rpx;
  color: #000000;
  line-height: 44rpx;
}

.pay_game_text1{
  height: 25rpx;
  font-family: Alibaba PuHuiTi 2.0;
  font-weight: normal;
  font-size: 27rpx;
  color: #999999;
  line-height: 44rpx;
}




.container1 {
  .scroll_box {
    width: 700rpx;
    height: 120px;
    overflow: hidden;
    display: flex;
    margin: auto;

    ul {
      display: flex;
      padding: 0;
      margin: 0;
      position: relative;
      width: 1200px;
      animation: myScroll 15s linear infinite;

      li {
        list-style: none;
        width: 200px;
        height: 200px;
        text-align: center;
        line-height: 200px;
        font-size: 40px;
        color: red;
        border: 1px solid red;
        box-sizing: border-box;
        background: #1cdf27;
      }
    }

    .ul1 {
      display: flex;
      padding: 0;
      margin: 0;
      position: relative;
      width: 1200px;
      animation: myScroll 18s linear infinite;

      li {
        list-style: none;
        width: 200px;
        height: 200px;
        text-align: center;
        line-height: 200px;
        font-size: 40px;
        color: red;
        border: 1px solid red;
        box-sizing: border-box;
        background: #1cdf27;
      }
    }

    &:hover {
      ul {
        animation-play-state: paused;
      }
    }

    @keyframes myScroll {
      from {
        left: 0px;
      }

      to {
        left: -1200px;
      }
    }
  }
}

.scroll-view_H {
  white-space: nowrap;
  width: 100%;
}

.scroll-view-item_H {
  display: inline-block;
  text-align: center;
  font-size: 36rpx;
}

.scroll-view_H1 {
  white-space: nowrap;
  width: 683.33rpx;
  position: relative;
}

.scroll-view-item_H1 {
  display: inline-block;
  text-align: center;
  font-size: 36rpx;
  overflow: hidden;

}

.scroll-view-item_H1 {
  display: inline-block;
  text-align: center;
  position: relative;
  margin-left: 20rpx;
  font-size: 36rpx;
}

.body1-today {
  margin: 25rpx 0rpx 20rpx 20rpx;
  width: 187rpx;
  height: 47rpx;
  background: #F2F2F2;
  border-radius: 23rpx;
  font-family: Alibaba PuHuiTi 2.0;
  font-weight: normal;
  font-size: 24rpx;
  color: #999999;
  line-height: 44rpx;
}

.body1-application {
  margin: 10rpx 0rpx 20rpx 45rpx;
  width: 127rpx;
  height: 53rpx;
  background: #F5EFFF;
  border-radius: 27rpx;
  font-family: Alibaba PuHuiTi 2.0;
  font-weight: normal;
  font-size: 27rpx;
  color: #9966FF;
  line-height: 44rpx;
}

.body1-gameName {
  margin: 0rpx 0rpx 20rpx 45rpx;
  width: 130rpx;
  font-family: Alibaba PuHuiTi 2.0;
  font-weight: normal;
  font-size: 27rpx;
  color: #000000;
  line-height: 44rpx;
  text-overflow: ellipsis;
  white-space: nowrap;
  overflow: hidden;
}

.body-bak-image {
  width: 683.33rpx;
  height: 683.33rpx;
  position: absolute;
}

.top {
  width: 100%;
  height: 260px;
  //background-size: 100% 100%;
  background-color: #FFFFFF;
  position: absolute;

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

  &-true {
    margin-left: 25rpx;
    font-family: Alibaba PuHuiTi 2.0;
    font-weight: normal;
    font-size: 32rpx;
    color: #000000;
    line-height: 44rpx;
  }

  &-false {
    margin-left: 25rpx;
    font-family: Alibaba PuHuiTi 2.0;
    font-weight: normal;
    font-size: 24rpx;
    color: #999999;
    line-height: 44rpx;
  }

  &-body {
    display: flex;
    justify-content: space-between;
    align-items: center;

    &-text {
      display: flex;

      &-1 {
        font-family: PingFangSC, PingFang SC;
        font-weight: 400;
        text-align: right;
        font-style: normal;
        margin-left: 20rpx;
        color: #000000;
        font-size: 32rpx;

        line-height: 44rpx;

      }

      &-2 {
        font-family: PingFangSC, PingFang SC;
        font-weight: 500;
        line-height: 40rpx;
        font-size: 28rpx;
        text-align: right;
        font-style: normal;
        margin-left: 20rpx;
        color: #333333;
      }
    }

    &-active {
      display: flex;
      justify-content: center;
      width: 60rpx;
      height: 6rpx;
      background: #5ACF86;
      margin-left: 30rpx;
    }

    &-search {
      width: 260rpx;
      height: 52rpx;
      background: #FFFFFF;
      border-radius: 32rpx;
      margin-right: 20rpx;
      display: flex;
      align-items: center;
      justify-content: space-between;

      &-icon {
        width: 32rpx;
        height: 32rpx;
        background: url('@/static/game_cps/icon_search@2x.png');
        background-size: 100% 100%;
        margin-left: 20rpx;
      }

      &-chang {
        margin-right: 20rpx;
        width: 175rpx;
        height: 34rpx;
        font-family: PingFangSC, PingFang SC;
        font-weight: 400;
        font-size: 24rpx;
        color: #999999;
        line-height: 34rpx;
        text-align: left;
        font-style: normal;
      }
    }
  }

  &-notice {
    margin: 0rpx auto;
    height: 85rpx;
    width: 710rpx;
    border-radius: 24rpx;
    font-family: PingFangSC, PingFang SC;
  }
}

.top_swiper_img {
  width: 100%;
  height: 333.33rpx;
}


.top_swiper_img1 {
  width: 466.67rpx;
  height: 100%;
  border-radius: 40rpx;
}

.top_swiper_img1_body {
  height: 300rpx
}

.top_swiper_img2 {
  width: 186.67rpx;
  height: 266.67rpx;
  border-radius: 30rpx;
}

.top_swiper_img3 {
  width: 500rpx;
  height: 350rpx;
  border-radius: 40rpx;
}


.body {
  &-top {
    &-text {
      font-family: Alibaba PuHuiTi 2.0;
      font-weight: normal;
      font-size: 36rpx;
      color: #000000;
      line-height: 44rpx;
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
      width: 150rpx;
      overflow: hidden;
      margin-top: 16rpx;
      white-space: nowrap;
      text-overflow: ellipsis;
      font-family: PingFangSC, PingFang SC;
      font-weight: 500;
      font-size: 24rpx;
      color: #333333;
      line-height: 34rpx;
      font-style: normal;
    }
  }
}

.applay {
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 10rpx;
  width: 88rpx;
  height: 42rpx;
  background: #EEF7F0;
  border-radius: 22rpx;
  border: 1rpx solid #56AB6D;
  font-family: PingFangSC, PingFang SC;
  font-weight: 500;
  font-size: 24rpx;
  color: #56AB6D;
  line-height: 34rpx;
  text-align: left;
  font-style: normal;
}


.images {
  margin-left: 20rpx;
  width: 440rpx;
  height: 280rpx;
  border-radius: 24rpx;
  border: 4rpx solid #2E2646;
  background-color: #2d8bff;
  position: absolute;
}

.images-top {
  width: 160rpx;
  height: 160rpx;
  border-radius: 18rpx;
  margin-top: 10rpx;
}

.images-to-item {
  width: 280rpx;
  height: 520rpx;
  border-radius: 18rpx;
}

.images-to-mini {
  width: 56rpx;
  height: 56rpx;
  border-radius: 10rpx;
}

.images-top_red {
  width: 108rpx;
  height: 108rpx;
  border-radius: 18rpx;
}

.images-top_red_buttom {
  width: 180rpx;
  height: 180rpx;
  border-radius: 18rpx;
}

.images-to-big {
  width: 710rpx;
  border-radius: 30rpx;
  object-fit: cover;
  position: relative;
}

.images-to-big_view {
  width: 710rpx;
  height: 140rpx;
  background: rgba(0, 0, 0, 0.7);
  border-radius: 0px 0px 30rpx 30rpx;
  position: absolute;
}

.applay_grey {
  width: 116rpx;
  height: 60rpx;
  background: rgba(255, 255, 255, 0.35);
  border-radius: 30rpx;
  font-family: PingFangSC, PingFang SC;
  font-weight: 500;
  font-size: 28rpx;
  color: #FFFFFF;
  line-height: 40rpx;
  display: flex;
  justify-content: center;
  align-items: center;
  font-style: normal;
}

.images-top_red_ll {
  width: 340rpx;
  height: 350rpx;
  border-radius: 24rpx;
  position: relative;
}

.text_mao {
  font-family: PingFangSC, PingFang SC;
  font-weight: 400;
  font-size: 26rpx;
  color: #FFFFFF;
  line-height: 36rpx;
  text-align: right;
  font-style: normal;
}

.images-to-big_vie_ll {
  width: 340rpx;
  height: 56rpx;
  background: rgba(0, 0, 0, 0.7);
  border-radius: 0px 0px 24rpx 24rpx;
  position: absolute;
}

.text_24_item {
  font-family: PingFangSC, PingFang SC;
  font-weight: 500;
  font-size: 24rpx;
  color: #333333;
  line-height: 28rpx;
  text-align: left;
  font-style: normal;
}

.text_24_item_grey {
  font-family: PingFangSC, PingFang SC;
  font-weight: 300;
  font-size: 20rpx;
  color: #999999;
  line-height: 28rpx;
  text-align: left;
  font-style: normal;
}

.text-scroll {
  display: flex;
  align-items: center;
  justify-content: center;
  font-family: PingFangSC, PingFang SC;
  font-size: 24rpx;
  color: #FFFFFF;
  text-align: center;
  font-style: normal;
  width: 445rpx;
  height: 50rpx;
  margin-top: 230rpx;
  background: rgba(0, 0, 0, 0.7);
  border-radius: 0rpx 0rpx 12rpx 12rpx;
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

.bk_image_big {
  margin-left: 25rpx;
  position: absolute;
  width: 700rpx;
  height: 628rpx;
  overflow: hidden;
}

.imgList {
  overflow: hidden;
  animation: rolling 18s linear infinite;
  position: absolute;
  display: flex;
}

.imgList1 {
  overflow: hidden;
  animation: rolling 13s linear infinite;
  position: absolute;
  display: flex;
}

@keyframes rolling {
  from {
    transform: translateX(0);
  }

  to {
    transform: translateX(-50%);
  }
}

::v-deep .uni-noticebar {
  margin: 28rpx auto;
  width: 710rpx;
  height: 60rpx;
  border-radius: 12rpx;
}

.css_hui_fen {
  font-family: PingFangSC, PingFang SC;
  font-weight: 400;
  font-size: 17rpx;
  color: #999999;
  line-height: 34rpx;
  font-style: normal;
}

.css_hui_ming {
  font-family: PingFangSC, PingFang SC;
  font-weight: 400;
  font-size: 17rpx;
  color: #ff3200;
  line-height: 34rpx;
  font-style: normal;
}


</style>
