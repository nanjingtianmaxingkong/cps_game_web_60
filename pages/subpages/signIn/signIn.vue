<template>
    <view class="container">
        <uni-forms ref="baseForm" :modelValue="baseFormData" :rules="rules" class="forms" validateTrigger="bind">
            <uni-forms-item label="设置昵称" :label-width="80" name="name">
                <uni-easyinput type="text" :input-border="false" v-model="baseFormData.name" placeholder="请输入昵称" trim/>
            </uni-forms-item>
            <uni-forms-item label="手机号码" :label-width="80" name="phone">
                <uni-easyinput type="number" :input-border="false" v-model="baseFormData.phone" placeholder="请输入手机号"/>
            </uni-forms-item>
            <uni-forms-item label="登录密码" :label-width="80" name="password">
                <uni-easyinput :input-border="false" type="password" v-model="baseFormData.password"
                               placeholder="请设置登录密码" trim/>
            </uni-forms-item>
            <uni-forms-item label="再次输入登录密码" :label-width="130" name="arginPassword">
                <uni-easyinput :input-border="false" type="password" v-model="baseFormData.arginPassword"
                               placeholder="请再次输入登录密码" trim/>
            </uni-forms-item>
            <uni-forms-item label="地址" :label-width="80">
                <uni-easyinput type="text" :input-border="false" v-model="baseFormData.address" placeholder="请输入地址"
                               trim/>
            </uni-forms-item>
            <uni-forms-item label="推荐码" :label-width="80">
                <uni-easyinput type="text" :input-border="false" v-model="baseFormData.refereeCode" placeholder="请输入推荐码"
                               trim/>
            </uni-forms-item>
        </uni-forms>
        <view class="tip">地址信息用于兑换礼物寄送地址。</view>
        <button class="submit123" @click="submit('baseForm')">注册</button>
    </view>
</template>

<script>
    import api from '@/js/api.js'
    import {
        rsa,
        deepClone,
        MD5
    } from '@/js/utils.js'

    export default {
        data() {
            return {
                text: '获取验证码',
                disabled: false,
                baseFormData: {
                    phone: null,
                    password: null,
                    arginPassword: null,
                    name: null,
                    address: null,
                    refereeCode: null
                },
                time: '',
                rules: {
                    phone: {
                        rules: [{
                            required: true,
                            errorMessage: '请输入手机号码'
                        },
                            {
                                validateFunction: function (rule, value, data, callback) {
                                    let reg = new RegExp(/^(1[3-9])\d{9}$/);
                                    if (!reg.test(value)) {
                                        callback('手机号码有误')
                                    }
                                    return true
                                }
                            }
                        ]
                    },
                    password: {
                        rules: [{
                            required: true,
                            errorMessage: '请输入登录密码'
                        },
                            {
                                validateFunction: function (rule, value, data, callback) {
                                    let reg = new RegExp(/^(?=.*[a-zA-Z])(?=.*\d)[a-zA-Z\d]{8,}$/);
                                    if (!reg.test(value)) {
                                        callback('请使用字母数字混合的方式设置密码，不低于八位数')
                                    }
                                    return true
                                }
                            }
                        ]
                    },
                    arginPassword: {
                        rules: [{
                            required: true,
                            errorMessage: '请输入登录密码'
                        },
                            {
                                validateFunction: function (rule, value, data, callback) {
                                    if (value !== data.password) {
                                        callback('两次输入密码不一致')
                                    }
                                    return true
                                }
                            }
                        ]
                    },
                    name: {
                        rules: [{
                            required: true,
                            errorMessage: '请输入昵称',
                        }]
                    },
                },
            }
        },
        onLoad() {

        },
        methods: {
            //表单提交
            submit(ref) {
                this.$refs[ref].validate().then(() => {
                    if (this.baseFormData.password != this.baseFormData.arginPassword) {
                        this.Tips("密码不一致");
                        return;
                    }
                    if (this.baseFormData.name.length > 6) {
                        this.Tips("昵称不能大于六位");
                        return;
                    }
                    let params = deepClone(this.baseFormData)
                    params.password = rsa(this.baseFormData.password)
                    //密码加密
                    api.register(params).then(res => {
                        if (res.code == 200) {
                            this.Tips("注册成功")
                            setTimeout(() => {
                                uni.navigateBack()
                            }, 2000)
                        }
                    })
                })
            },

            //获取验证码
            async get_code() {
                var pphone = /^1[3456789]\d{9}$/;
                var pkong = /^[\s\S]*.*[^\s][\s\S]*$/;
                if (this.disabled) {
                    return;
                }
                if (!pkong.test(this.baseFormData.phone) || !pphone.test(this.baseFormData.phone)) {
                    this.Tips("请输入正确的手机号");
                    return false
                }
                this.disabled = true;
                //发送验证码
                api.sendSms({
                    phone: this.baseFormData.phone,
                    source: 1
                }).then(res => {
                    if (res.code == "200") {
                        this.Tips("发送成功");
                    }
                })
                this.setInterValFunc();
            },
            setInterValFunc() {
                this.time = 60;
                this.text = '秒';
                this.setTime = setInterval(() => {
                    if (this.time - 1 == 0) {
                        this.time = '';
                        this.text = '重新获取';
                        this.code = '';
                        this.disabled = false;
                        clearInterval(this.setTime);
                    } else {
                        this.time--;
                    }
                }, 1000);
            },
        }
    }
</script>

<style>
    ::v-deep .forms {
        background: #FFFFFF;
        padding: 30rpx;
        margin-top: 40rpx;
    }

    .submit123 {
        margin-top: 100rpx;
        width: 610rpx;
        height: 88rpx;
        background: #fdcf40;
        border-radius: 18rpx;
        color: #805301;
    }

    .tip {
        font-size: 24rpx;
        font-family: PingFangSC-Regular, PingFang SC;
        font-weight: 400;
        color: #768196;
        line-height: 34rpx;
        padding-left: 20rpx;
        margin-top: 30rpx;
    }
</style>