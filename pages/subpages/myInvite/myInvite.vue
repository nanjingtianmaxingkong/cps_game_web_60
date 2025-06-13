<!--<template>-->
<!--    <view class="common-container">-->
<!--        <view class="content">-->
<!--            <view class="list">-->
<!--                <view class="body" v-for="(item,index) in list" :key="index">-->
<!--                    <view class="top">-->
<!--                        <image class="box-item-image" src="@/static/wlNew/wl.png"></image>-->
<!--                    </view>-->
<!--                    <view class="item" >-->
<!--                        <view class="item-id">ID：{{ item.id }}</view>-->
<!--                        <view class="item-phone xw-mt10">手机号：{{ item.phoneNumber || "无" }}</view>-->
<!--                    </view>-->
<!--                </view>-->
<!--            </view>-->
<!--        </view>-->
<!--    </view>-->
<!--</template>-->

<!--<script>-->
<!--    import api from "@/js/api";-->
<!--    export default {-->
<!--        data() {-->
<!--            return {-->
<!--                list: [],-->
<!--                hasData: false,-->
<!--                pageNum: 1,-->
<!--                pageSize: 10,-->
<!--                noMore: false,-->
<!--            }-->
<!--        },-->
<!--        onLoad(){-->
<!--            this.getReferrerList()-->
<!--        },-->
<!--        methods: {-->
<!--            getReferrerList() {-->
<!--                api.userInviter({}).then(res => {-->
<!--                        if (res.code == 200){-->
<!--                            this.list= res.data-->
<!--                        }-->
<!--                })-->
<!--            }-->
<!--        }-->
<!--    }-->
<!--</script>-->

<!--<style lang="scss" scoped>-->
<!--    // 流水背景-->
<!--    .common{-->
<!--        &-container{-->
<!--            padding-top: 20rpx;-->
<!--            background: #F2F2F2;-->
<!--            min-height: 100vh;-->
<!--        }-->
<!--    }-->

<!--    .nav {-->
<!--        display: flex;-->
<!--        flex-direction: row;-->
<!--        height: 88rpx;-->
<!--        background-color: transparent;-->
<!--        font-weight: 700-->
<!--    }-->

<!--    .left-back {-->
<!--        margin: 22rpx-->
<!--    }-->

<!--    .nav-title {-->
<!--        font-size: 32rpx;-->
<!--        width: 594rpx;-->
<!--        line-height: 88rpx;-->
<!--        text-align: center;-->
<!--        color:  #F2F2F2-->
<!--    }-->

<!--    .body{-->
<!--        background: #FFFFFF;-->
<!--        padding-left: 32rpx;-->
<!--        height: 180rpx;-->
<!--        display: grid;-->
<!--        grid-template-columns: 20% auto;-->
<!--        align-items: center;-->
<!--        width: 90%;-->
<!--        border-radius: 12rpx;-->
<!--        margin: 0rpx auto 40rpx;-->
<!--    }-->

<!--    .top{-->
<!--        image{-->
<!--            width: 100rpx;-->
<!--            height: 100rpx;-->
<!--        }-->
<!--    }-->

<!--    .item {-->

<!--        &-id {-->
<!--            font-size: 32rpx;-->
<!--            font-family: Microsoft YaHei, Microsoft YaHei-Regular;-->
<!--            font-weight: 400;-->
<!--            color: #21232d;-->
<!--        }-->
<!--        &-phone {-->
<!--            font-size: 28rpx;-->
<!--            font-family: Microsoft YaHei, Microsoft YaHei-Regular;-->
<!--            font-weight: 400;-->
<!--            color: #797e98;-->
<!--        }-->
<!--    }-->
<!--</style>-->
