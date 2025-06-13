<template>
  <view class="strategy-container">
    <!-- 顶部 Banner 可选 -->
    <image class="strategy-top-banner" src="@/static/game_cps/home_bg_header@2x.png"></image>

    <!-- 标题 -->
    <view class="strategy-title">{{ detail.title }}</view>

    <!-- 发布信息 -->
    <view class="strategy-meta">
      <text>{{ detail.categoryName }}</text>
      <text class="dot">·</text>
      <text>{{ detail.date }}</text>
      <text class="dot">·</text>
      <text>作者：{{ detail.author }}</text>
    </view>

    <!-- 🔥 游戏基础信息区块 -->
    <view class="strategy-gameinfo">
      <text>适用平台：{{ detail.platform }}</text>
      <text class="dot">·</text>
      <text>评分：{{ detail.score }}</text>
      <text class="dot">·</text>
      <text>标签：{{ detail.tags }}</text>
    </view>

    <!-- 🔥 操作栏：点赞 / 收藏 / 分享 -->
    <view class="strategy-actions">
      <button class="action-btn" @click="like">👍 点赞</button>
      <button class="action-btn" @click="collect">⭐ 收藏</button>
      <button class="action-btn" open-type="share">🔗 分享</button>
    </view>

    <!-- 攻略正文 -->
    <view class="strategy-content" v-html="detail.content" />

    <!-- 🔥 评论提示 -->
    <view class="comment-entry" @click="toComment">
      <text>💬 点击查看管理员留言</text>
    </view>

    <!-- 推荐攻略 -->
    <view class="strategy-recommend">
      <view class="section-title">🎯 推荐攻略</view>
      <view v-for="(item, index) in recommends" :key="index" class="strategy-card" @click="goToDetail(item.id)">
        <image :src="item.cover" class="card-img"></image>
        <view class="card-info">
          <text class="card-title">{{ item.title }}</text>
          <text class="card-sub">{{ item.categoryName }}</text>
        </view>
      </view>
    </view>
  </view>
</template>

<script>
export default {
  data() {
    return {
      detail: {
        title: '【实用技巧】三分钟教你上手新游《幻塔》',
        date: '2025-04-12',
        author: '游戏菌',
        categoryName: '角色扮演',
        platform: '安卓 / iOS',
        score: '9.1',
        tags: '科幻、冒险、开放世界',
        content: `
          <p>欢迎来到《幻塔》新手攻略，这篇文章将从入门到实战，手把手教你快速上手！</p>
          <h3>一、角色推荐</h3>
          <p>建议新手优先选择远程职业，更容易掌控。</p>
          <h3>二、资源获取</h3>
          <p>每天的日常任务务必完成，累计资源快速提升。</p>
        `
      },
      recommends: [
        { id: 1, title: '《王者荣耀》高端局打法解析', cover: '/static/strategy/1.jpg', categoryName: 'MOBA' },
        { id: 2, title: '新手必看：如何玩转《原神》', cover: '/static/strategy/2.jpg', categoryName: '开放世界' }
      ]
    }
  },
  methods: {
    goToDetail(id) {
      this.Tips("管理员还未留言请等待！")
    },
    like() {
      this.Tips("感谢点赞！")
    },
    collect() {
      this.Tips("已收藏攻略")
    },
    toComment() {
      this.Tips("管理员还未留言，请等待")
    }
  }
}
</script>

<style scoped lang="scss">
.strategy-container {
  padding: 30rpx;
  background-color: #fff;
}

.strategy-top-banner {
  width: 100%;
  height: 260rpx;
  object-fit: cover;
  border-radius: 16rpx;
  margin-bottom: 30rpx;
}

.strategy-title {
  font-size: 36rpx;
  font-weight: bold;
  color: #333;
  margin-bottom: 10rpx;
}

.strategy-meta,
.strategy-gameinfo {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  font-size: 24rpx;
  color: #999;
  margin-bottom: 10rpx;

  .dot {
    margin: 0 10rpx;
  }
}

.strategy-actions {
  display: flex;
  justify-content: space-around;
  margin: 30rpx 0;

  .action-btn {
    padding: 16rpx 24rpx;
    border-radius: 24rpx;
    background-color: #f0f0f0;
    font-size: 26rpx;
    color: #333;
  }
}

.strategy-content {
  font-size: 28rpx;
  color: #444;
  line-height: 1.8;
  margin: 40rpx 0;
}

.comment-entry {
  background: #ebf6f3;
  padding: 20rpx;
  border-radius: 12rpx;
  text-align: center;
  font-size: 26rpx;
  color: #27c089;
  margin-bottom: 30rpx;
}

.strategy-recommend {
  margin-top: 40rpx;

  .section-title {
    font-size: 30rpx;
    font-weight: 600;
    margin-bottom: 20rpx;
  }

  .strategy-card {
    display: flex;
    align-items: center;
    margin-bottom: 20rpx;
    background: #f9f9f9;
    border-radius: 16rpx;
    overflow: hidden;

    .card-img {
      width: 160rpx;
      height: 100rpx;
      object-fit: cover;
    }

    .card-info {
      padding: 0 20rpx;

      .card-title {
        font-size: 28rpx;
        color: #333;
      }

      .card-sub {
        font-size: 24rpx;
        color: #888;
      }
    }
  }
}
</style>
