<template>
    <view class="common-container">
        <view class="content">
            <view class="list">
                <view class="body" v-for="(item,index) in list" :key="index">
                    <view class="item" >
                        <view style="display: flex;justify-content: space-between">
                            <view class="item-id">类型：{{ source(item.source)  }}</view>
                            <view style="margin-right: 20rpx" :class="item.type?'color':'color1'">+{{ item.transactionAmount }}</view>
                        </view>
                        <view class="item-phone xw-mt10" style="margin-top: 20rpx">交易时间：{{ item.transactionDate|parseTime }}</view>
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
                list: [],
                hasData: false,
                pageNum: 1,
                pageSize: 10,
                noMore: false,
            }
        },
        filters: {
            parseTime,
        },
        onLoad(){
            this.getReferrerList()
        },
        methods: {
            source(type){
              switch (type) {
                 case 1: return "签到收入"
                  case 2:
                      return "商品兑换"
                  case 3:
                      return "视频获得"
                  case 4:
                      return "推荐用户获取"
              }
            },
            getReferrerList() {
                api.userListRecord({}).then(res => {
                    if (res.code == 200){
                        this.list= res.data
                    }
                })
            }
        }
    }
</script>

<style lang="scss" scoped>
    .color{
        color: red;
    }
    .color1{
        color: lawngreen;
    }

    // 流水背景
    .common{
        &-container{
            padding-top: 20rpx;
            background: #F2F2F2;
            min-height: 100vh;
        }
    }

    .nav {
        display: flex;
        flex-direction: row;
        height: 88rpx;
        background-color: transparent;
        font-weight: 700
    }

    .left-back {
        margin: 22rpx
    }

    .nav-title {
        font-size: 32rpx;
        width: 594rpx;
        line-height: 88rpx;
        text-align: center;
        color:  #F2F2F2
    }

    .body{
        background: #FFFFFF;
        padding-left: 32rpx;
        height: 180rpx;
        display: grid;
        align-items: center;
        width: 90%;
        border-radius: 12rpx;
        margin: 0rpx auto 40rpx;
    }

    .top{
        image{
            width: 100rpx;
            height: 100rpx;
        }
    }

    .item {

        &-id {
            font-size: 32rpx;
            font-family: Microsoft YaHei, Microsoft YaHei-Regular;
            font-weight: 400;
            color: #21232d;
        }
        &-phone {
            font-size: 28rpx;
            font-family: Microsoft YaHei, Microsoft YaHei-Regular;
            font-weight: 400;
            color: #797e98;
        }
    }
</style>
