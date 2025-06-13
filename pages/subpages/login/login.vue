<!--<template>-->
<!--    <view class="content">-->
<!--        <view class="status_bar">-->
<!--        </view>-->
<!--        <view class="content-top">-->
<!--            <view class="content-top-logo">-->
<!--                <image src="@/static/mine/gee.jpg"></image>-->
<!--            </view>-->
<!--        </view>-->
<!--        <view class="content-container">-->
<!--            <uni-forms ref="baseForm" :modelValue="baseFormData" :rules="rules" class="forms">-->
<!--                <uni-forms-item name="phone">-->
<!--                    <uni-easyinput class="easyinput" type="number" :input-border="false" v-model="baseFormData.phone"-->
<!--                                   placeholder="请输入注册的手机号" />-->
<!--                </uni-forms-item>-->
<!--                <uni-forms-item name="password">-->
<!--                    <uni-easyinput class="easyinput" type="password" v-model="baseFormData.password" placeholder="请输入密码"-->
<!--                                   trim :input-border="false" />-->
<!--                </uni-forms-item>-->
<!--                <button  class="submit123" @click="submit('baseForm')">登录</button>-->
<!--                <uni-forms-item>-->
<!--                    <view class="protocol">-->
<!--                        <checkbox-group @change="setii">-->
<!--                            <label>-->
<!--                                <view style="display: flex;">-->
<!--                                    <checkbox value="sb" />-->
<!--                                    <view>已阅读并同意</view>-->
<!--                                    <view style="color: #467AFF;" @click.stop="getProtocol">-->
<!--                                        《用户协议》</view>-->
<!--&lt;!&ndash;                                    <view style="color: #467AFF;" @click.stop="getPrivacy">&ndash;&gt;-->
<!--&lt;!&ndash;                                        《隐私政策》</view>&ndash;&gt;-->
<!--                                </view>-->
<!--                            </label>-->
<!--                        </checkbox-group>-->
<!--                    </view>-->
<!--                </uni-forms-item>-->
<!--            </uni-forms>-->
<!--        </view>-->
<!--        <view class="footer">-->
<!--            还没有账号？<span @click="toNative('/pages/subpages/signIn/signIn')" style="color: #fdcf40;">去注册</span>-->
<!--        </view>-->
<!--    </view>-->
<!--</template>-->

<!--<script>-->
<!--    import {-->
<!--        rsa,-->
<!--        MD5-->
<!--    } from '@/js/utils.js'-->
<!--    import api from '@/js/api.js'-->
<!--    export default {-->
<!--        data() {-->
<!--            return {-->
<!--                msg: null,-->
<!--                wechat: 'jianwenkf',-->
<!--                url: require("@/static/mine/customerServiceQrCode@2x.png"),-->
<!--                href: "http://wenwenimgs.wenwenlianshang.com/169010495503343322.png",-->
<!--                placeholderStyle: "width: 610px;height: 88px;background: #F6F8F9;border-radius: 18px;",-->
<!--                shumatext: false,-->
<!--                text: '获取验证码',-->
<!--                time: '',-->
<!--                uuid: null,-->
<!--                disabled: false,-->
<!--                secondPwd: null,-->
<!--                phoneLogin: {-->
<!--                    phone: null,-->
<!--                    // 验证码-->
<!--                    yanzm: null,-->
<!--                },-->
<!--                baseFormData: {-->
<!--                    phone: null,-->
<!--                    password: null,-->
<!--                    value: 0,-->
<!--                },-->
<!--                rulesPhone: {-->
<!--                    phone: {-->
<!--                        rules: [{-->
<!--                            required: true,-->
<!--                            errorMessage: '手机号有误'-->
<!--                        }]-->
<!--                    },-->
<!--                    yanzm: {-->
<!--                        rules: [{-->
<!--                            required: true,-->
<!--                            errorMessage: '验证码有误'-->
<!--                        }]-->
<!--                    },-->
<!--                },-->
<!--                rules: {-->
<!--                    phone: {-->
<!--                        rules: [{-->
<!--                            required: true,-->
<!--                            errorMessage: '手机号有误'-->
<!--                        }]-->
<!--                    },-->
<!--                    password: {-->
<!--                        rules: [{-->
<!--                            required: true,-->
<!--                            errorMessage: '密码有误'-->
<!--                        }]-->
<!--                    },-->
<!--                },-->
<!--            }-->
<!--        },-->
<!--        onHide() {-->
<!--            this.cancelEvent()-->
<!--        },-->
<!--        methods: {-->
<!--            //提交手机号-->
<!--            submitPhone(ref) {-->
<!--                this.$refs[ref].validate().then(res => {-->
<!--                    if (!this.vailPhone(this.phoneLogin.phone)) {-->
<!--                        return;-->
<!--                    }-->
<!--                    if (this.baseFormData.value == 0) {-->
<!--                        this.Tips("请先阅读并同意《用户协议》");-->
<!--                        return;-->
<!--                    }-->
<!--                    //调用接口-->
<!--                    this.$store.dispatch("phoneLogin", {-->
<!--                        phone: this.phoneLogin.phone,-->
<!--                        code: this.phoneLogin.yanzm-->
<!--                    }).then(res => {-->
<!--                        if (res.code == 200) {-->
<!--                            this.Tips("登录成功！")-->
<!--                            uni.switchTab({-->
<!--                                url: "/pages/index/index"-->
<!--                            })-->
<!--                        }-->
<!--                    })-->
<!--                }).catch(err => {-->

<!--                })-->
<!--            },-->

<!--            setii(e) {-->
<!--                if (e.detail.value.length > 0) {-->
<!--                    this.baseFormData.value = 1-->
<!--                } else {-->
<!--                    this.baseFormData.value = 0-->
<!--                }-->
<!--            },-->

<!--            //表单提交-->
<!--            submit(ref) {-->
<!--                const _this = this;-->
<!--                _this.$refs[ref].validate().then((res) => {-->
<!--                    if (!this.vailPhone(_this.baseFormData.phone)) {-->
<!--                        return;-->
<!--                    }-->
<!--                    if (_this.baseFormData.value == 0) {-->
<!--                        _this.Tips("请先同意授权协议！");-->
<!--                        return;-->
<!--                    }-->
<!--                    //调用接口-->
<!--                    let params = {-->
<!--                        phone: _this.baseFormData.phone,-->
<!--                        passWord: rsa( _this.baseFormData.password),-->
<!--                    }-->
<!--                    _this.$store.dispatch("login", params).then(res => {-->
<!--                        if (res.code == 200) {-->
<!--                            _this.Tips("登录成功！")-->
<!--                            setTimeout(() => {-->
<!--                                uni.switchTab({-->
<!--                                    url: "/pages/subpages/index/index"-->
<!--                                })-->
<!--                            }, 2000)-->
<!--                        } else {-->
<!--                            _this.Tips(res.msg)-->
<!--                        }-->
<!--                    })-->
<!--                }).catch(err => {-->
<!--                })-->
<!--            },-->

<!--            getProtocol() {-->
<!--                this.toNative("/pages/subpages/protocol/protocol")-->
<!--            },-->
<!--            getPrivacy() {-->
<!--                this.toNative("/pages/subpages/privacy/privacy")-->
<!--            },-->

<!--            //验证手机号-->
<!--            vailPhone(phone) {-->
<!--                var pphone = /^1[3456789]\d{9}$/;-->
<!--                var pkong = /^[\s\S]*.*[^\s][\s\S]*$/;-->
<!--                if (!pkong.test(phone) || !pphone.test(phone)) {-->
<!--                    this.Tips("请输入正确的手机号");-->
<!--                    return false;-->
<!--                };-->
<!--                return true;-->
<!--            },-->


<!--            //获取验证码-->
<!--            async get_code() {-->
<!--                var pphone = /^1[3456789]\d{9}$/;-->
<!--                var pkong = /^[\s\S]*.*[^\s][\s\S]*$/;-->
<!--                if (this.disabled) {-->
<!--                    return;-->
<!--                }-->
<!--                if (!pkong.test(this.phoneLogin.phone) || !pphone.test(this.phoneLogin.phone)) {-->
<!--                    this.Tips("请输入正确的手机号");-->
<!--                    return false-->
<!--                };-->

<!--                this.disabled = true;-->

<!--                api.sendSms({-->
<!--                    phone: this.phoneLogin.phone-->
<!--                }).then(res => {-->
<!--                    if (res.code == "200") {-->
<!--                        this.Tips("已发送");-->
<!--                    }-->
<!--                });-->

<!--                this.setInterValFunc();-->
<!--            },-->
<!--            setInterValFunc() {-->
<!--                this.time = 60;-->
<!--                this.text = '秒';-->
<!--                this.setTime = setInterval(() => {-->
<!--                    if (this.time - 1 == 0) {-->
<!--                        this.time = '';-->
<!--                        this.text = '重新获取';-->
<!--                        this.code = '';-->
<!--                        this.disabled = false;-->
<!--                        clearInterval(this.setTime);-->
<!--                    } else {-->
<!--                        this.time&#45;&#45;;-->
<!--                    }-->
<!--                }, 1000);-->
<!--            },-->
<!--            // 验证码输入框-->
<!--            shuma(e) {-->
<!--                if (e.detail.value) {-->
<!--                    this.shumatext = true;-->
<!--                } else {-->
<!--                    this.shumatext = false;-->
<!--                }-->
<!--            },-->

<!--            inputDialogToggle() {-->
<!--            },-->
<!--            cancelEvent() {-->
<!--                this.secondPwd = null-->
<!--            },-->
<!--            loginEvent() {-->
<!--                if (!this.secondPwd) {-->
<!--                    this.Tips("请输入二级密码")-->
<!--                    return-->
<!--                }-->
<!--                let reg = new RegExp(/^[\u4E00-\u9FA5]{3,6}$/g);-->
<!--                if (!reg.test(this.secondPwd)) {-->
<!--                    this.Tips("请输入中文二级密码，长度3-6位")-->
<!--                    return-->
<!--                }-->
<!--                this.submit('baseForm')-->
<!--            },-->
<!--            forgotSecondPwd() {-->
<!--                // this.$refs.inputDialog.close()-->
<!--                // this.$refs.popup.open()-->
<!--                this.toNative("/pages/subpages/onlineCustomerService/onlineCustomerService")-->
<!--            },-->
<!--            //点击保存-->
<!--            saveImg() {-->
<!--                const _this = this-->
<!--                //#ifndef H5-->
<!--                uni.downloadFile({-->
<!--                    url: _this.href,-->
<!--                    success: (res) => {-->
<!--                        if (res.statusCode === 200) {-->
<!--                            //保存图片至相册-->
<!--                            uni.saveImageToPhotosAlbum({-->
<!--                                filePath: res.tempFilePath,-->
<!--                                success: function() {-->
<!--                                    _this.Tips("保存成功")-->
<!--                                },-->
<!--                                fail: function() {-->
<!--                                    _this.Tips("保存失败，请稍后重试")-->
<!--                                }-->
<!--                            });-->
<!--                        }-->
<!--                    }-->
<!--                })-->
<!--                // #endif-->
<!--                // #ifdef H5-->
<!--                let Url = _this.url //图片路径，也可以传值进来-->
<!--                let blob = new Blob([''], {-->
<!--                    type: 'application/octet-stream'-->
<!--                }); //二进制大型对象blob-->
<!--                let url = URL.createObjectURL(blob); //创建一个字符串路径空位-->
<!--                let a = document.createElement('a'); //创建一个 a 标签-->
<!--                a.href = Url; //把路径赋到a标签的href上-->
<!--                //正则表达式，这里是把图片文件名分离出来。拿到文件名赋到a.download,作为文件名来使用文本-->
<!--                a.download = Url.replace(/(.*\/)*([^.]+.*)/ig, "$2").split("?")[0];-->
<!--                /* var e = document.createEvent('MouseEvents');  //创建事件（MouseEvents鼠标事件）-->
<!--                e.initMouseEvent('click', true, false, window, 0, 0, 0, 0, 0, false, false, false, false, 0, null); //初始化鼠标事件（initMouseEvent已弃用）*/-->

<!--                //代替方法。创建鼠标事件并初始化（后面这些参数我也不清楚，参考文档吧 https://developer.mozilla.org/en-US/docs/Web/API/MouseEvent/MouseEvent）-->
<!--                var e = new MouseEvent('click', (true, false, window, 0, 0, 0, 0, 0, false, false, false, false, 0, null));-->
<!--                //派遣后，它将不再执行任何操作。执行保存到本地-->
<!--                a.dispatchEvent(e);-->
<!--                //释放一个已经存在的路径（有创建createObjectURL就要释放revokeObjectURL）-->
<!--                URL.revokeObjectURL(url);-->
<!--                // #endif-->
<!--            },-->
<!--            copy(val) {-->
<!--                // #ifndef H5-->
<!--                //uni.setClipboardData方法就是讲内容复制到粘贴板-->
<!--                uni.setClipboardData({-->
<!--                    data: val, //要被复制的内容-->
<!--                    success: () => { //复制成功的回调函数-->
<!--                        uni.showToast({ //提示-->
<!--                            title: '已复制'-->
<!--                        })-->
<!--                    }-->
<!--                });-->
<!--                // #endif-->

<!--                // #ifdef H5-->
<!--                let textarea = document.createElement("textarea")-->
<!--                textarea.value = val-->
<!--                textarea.readOnly = "readOnly"-->
<!--                document.body.appendChild(textarea)-->
<!--                textarea.select() // 选中文本内容-->
<!--                textarea.setSelectionRange(0, val.length)-->
<!--                document.execCommand("copy")-->
<!--                textarea.remove()-->
<!--                this.Tips("已复制")-->
<!--                // #endif-->
<!--            },-->
<!--        }-->
<!--    }-->
<!--</script>-->

<!--<style lang="scss">-->
<!--    ::v-deep .forms {-->
<!--        background: #FFFFFF;-->
<!--        padding: 28rpx 0;-->
<!--        margin-top: 10rpx;-->

<!--        .uni-forms-item {-->
<!--            padding: 0 30rpx;-->
<!--            width: calc(100vw - 60rpx);-->
<!--        }-->
<!--    }-->

<!--    .input {-->
<!--        border: none;-->
<!--        width: 610rpx;-->
<!--        height: 88rpx;-->
<!--        background: #2d8bff;-->
<!--        border-radius: 18px;-->
<!--    }-->

<!--    .lia {-->
<!--        width: 670rpx;-->
<!--        height: 60rpx;-->
<!--        margin: 0 auto;-->
<!--        display: flex;-->
<!--        flex-direction: row;-->
<!--        flex-wrap: nowrap;-->
<!--        align-items: center;-->
<!--        justify-content: space-between;-->
<!--    }-->

<!--    .shuruqian {-->
<!--        height: 50rpx;-->
<!--        width: 60%;-->
<!--        font-size: 26rpx;-->
<!--        font-family: PingFangSC-Regular, PingFang SC;-->
<!--    }-->

<!--    .shuruhou {-->
<!--        height: 50rpx;-->
<!--        width: 60%;-->
<!--        font-size: 26rpx;-->
<!--        font-family: PingFangSC-Regular, PingFang SC;-->
<!--        color: #333333;-->
<!--    }-->

<!--    .huoqu {-->
<!--        width: 170rpx;-->
<!--        margin-left: 20rpx;-->
<!--        font-size: 32rpx;-->
<!--        font-family: PingFangSC-Regular, PingFang SC;-->
<!--        font-weight: 400;-->
<!--        color: #2d8bff;-->
<!--        text-align: right;-->
<!--    }-->

<!--    .huoquzhong {-->
<!--        width: 170rpx;-->
<!--        margin-left: 20rpx;-->
<!--        font-size: 32rpx;-->
<!--        font-family: PingFangSC-Regular, PingFang SC;-->
<!--        font-weight: 400;-->
<!--        color: #999999;-->
<!--        text-align: right;-->
<!--    }-->

<!--    // ::v-deep .input{-->
<!--    // 	height: 50px;-->
<!--    // }-->

<!--    .submit123 {-->
<!--        margin: 20rpx auto 0;-->
<!--        width: 610rpx;-->
<!--        height: 88rpx;-->
<!--        background: #fdcf40;-->
<!--        color: #805301;-->
<!--        border-radius: 18rpx;-->
<!--    }-->

<!--    // .status_bar {-->
<!--    // 	height: var(&#45;&#45;status-bar-height);-->
<!--    // 	width: 100%;-->
<!--    // }-->

<!--    .content {-->
<!--        height: 100vh;-->
<!--        background: #FFFFFF;-->

<!--        &-top {-->
<!--            background: #FFFFFF;-->

<!--            &-logo {-->

<!--                display: flex;-->
<!--                justify-content: center;-->
<!--                padding-top: 250rpx;-->
<!--                padding: auto;-->

<!--                image {-->
<!--                    border-radius: 10px;-->
<!--                    width: 146rpx;-->
<!--                    height: 146rpx;-->
<!--                }-->
<!--            }-->

<!--            &-text {-->
<!--                display: flex;-->
<!--                justify-content: center;-->
<!--                padding-top: 28rpx;-->

<!--                image {-->
<!--                    width: 88rpx;-->
<!--                    height: 44rpx;-->
<!--                }-->
<!--            }-->

<!--        }-->

<!--        &-container {-->
<!--            margin: 82rpx auto 0;-->
<!--        }-->

<!--        &-body {-->
<!--            display: grid;-->
<!--            grid-template-columns: 1fr 1fr;-->
<!--            margin: 102rpx auto 0;-->

<!--            &-text {-->
<!--                display: flex;-->
<!--                justify-content: center;-->
<!--                align-items: center;-->
<!--                background: #EEF3FF;-->
<!--                font-size: 28rpx;-->
<!--                font-family: PingFangSC-Regular, PingFang SC;-->
<!--                font-weight: 400;-->
<!--                color: #467AFF;-->
<!--                line-height: 40rpx;-->
<!--                height: 64rpx;-->
<!--                border-bottom: 4rpx solid #467AFF;-->
<!--            }-->

<!--            &-text1 {-->
<!--                display: flex;-->
<!--                justify-content: center;-->
<!--                align-items: center;-->
<!--                background: #FFFFFF;-->
<!--                font-size: 28rpx;-->
<!--                font-family: PingFangSC-Regular, PingFang SC;-->
<!--                font-weight: 400;-->
<!--                color: #0D0E15;-->
<!--                line-height: 40rpx;-->
<!--                height: 64rpx;-->
<!--            }-->
<!--        }-->
<!--    }-->

<!--    ::v-deep .protocol {-->
<!--        display: flex;-->
<!--        align-items: center;-->
<!--        font-size: 28rpx;-->
<!--        width: 610rpx;-->
<!--        margin: 30rpx auto 0;-->

<!--        .uni-checkbox-input {-->
<!--            width: 28rpx;-->
<!--            height: 28rpx;-->
<!--        }-->
<!--    }-->

<!--    .footer {-->
<!--        font-size: 28rpx;-->
<!--        font-family: PingFangSC-Regular, PingFang SC;-->
<!--        font-weight: 400;-->
<!--        color: #9CA8B6;-->
<!--        line-height: 40rpx;-->
<!--        position: fixed;-->
<!--        bottom: 60rpx;-->
<!--        left: 50%;-->
<!--        transform: translateX(-50%);-->
<!--    }-->

<!--    ::v-deep .easyinput {-->
<!--        width: 610rpx !important;-->
<!--        height: 88rpx;-->
<!--        margin: auto;-->

<!--        .uni-easyinput__content {-->
<!--            height: 88rpx;-->
<!--            background: #F6F8F9 !important;-->
<!--            border-radius: 18rpx !important;-->

<!--            .uni-easyinput__content-input {-->
<!--                height: 88rpx;-->
<!--            }-->
<!--        }-->
<!--    }-->

<!--    .sms {-->
<!--        display: flex;-->
<!--        justify-content: space-between;-->
<!--        align-items: center;-->
<!--        width: 610rpx;-->
<!--        margin: auto;-->

<!--        ::v-deep .uni-easyinput {-->
<!--            width: 320rpx;-->
<!--            height: 88rpx;-->

<!--            .uni-easyinput__content {-->
<!--                width: 320rpx;-->
<!--                height: 88rpx;-->
<!--                background: #F6F8F9 !important;-->
<!--                border-radius: 18rpx !important;-->

<!--                .uni-easyinput__content-input {-->
<!--                    width: 320rpx;-->
<!--                    height: 88rpx;-->
<!--                }-->
<!--            }-->
<!--        }-->
<!--    }-->

<!--    .pwd {-->
<!--        height: 40rpx;-->
<!--        font-size: 28rpx;-->
<!--        font-family: PingFangSC-Medium, PingFang SC;-->
<!--        font-weight: 500;-->
<!--        color: #467AFF;-->
<!--        line-height: 40rpx;-->
<!--        text-align: right;-->
<!--        padding-right: 70rpx;-->
<!--    }-->

<!--    .popup {-->
<!--        width: 540rpx;-->
<!--        height: 390rpx;-->
<!--        background: #FFFFFF;-->
<!--        border-radius: 28rpx;-->

<!--        &-title {-->
<!--            padding-top: 40rpx;-->
<!--            padding-left: 32rpx;-->
<!--            padding-right: 32rpx;-->
<!--            height: 72rpx;-->
<!--            font-size: 32rpx;-->
<!--            font-family: PingFangSC-Medium, PingFang SC;-->
<!--            font-weight: 500;-->
<!--            color: #000000;-->
<!--            line-height: 36rpx;-->
<!--            text-align: center;-->

<!--        }-->

<!--        &-input {-->
<!--            margin-top: 30rpx;-->
<!--            margin-left: 32rpx;-->
<!--            margin-right: 32rpx;-->
<!--            height: 76rpx;-->
<!--            background-color: #F6F8F9;-->
<!--            border-radius: 18rpx;-->
<!--            padding-left: 30rpx;-->
<!--        }-->

<!--        &-forgot {-->
<!--            width: 476rpx;-->
<!--            height: 34rpx;-->
<!--            font-size: 24rpx;-->
<!--            font-family: PingFangSC-Regular, PingFang SC;-->
<!--            font-weight: 400;-->
<!--            color: #467AFF;-->
<!--            line-height: 34rpx;-->
<!--            text-align: center;-->
<!--            padding-top: 20rpx;-->
<!--            padding-left: 32rpx;-->
<!--            padding-right: 32rpx;-->
<!--        }-->

<!--        &-line {-->
<!--            background-color: rgba(0, 0, 80, 0.05);-->
<!--            height: 2rpx;-->
<!--            margin-top: 30rpx;-->
<!--        }-->

<!--        &-btns {-->
<!--            height: 86rpx;-->

<!--            uni-button:after {-->
<!--                border: none;-->
<!--            }-->

<!--            display: flex;-->
<!--            align-items: center;-->

<!--            &-midline {-->
<!--                background-color: rgba(0, 0, 80, 0.05);-->
<!--                width: 2rpx;-->
<!--                height: 100%;-->
<!--            }-->

<!--            &-cancel {-->
<!--                flex: 1;-->
<!--                height: 44rpx;-->
<!--                font-size: 34rpx;-->
<!--                font-family: PingFangSC-Regular, PingFang SC;-->
<!--                font-weight: 400;-->
<!--                color: #000000;-->
<!--                line-height: 44rpx;-->
<!--                text-align: center;-->
<!--            }-->

<!--            &-login {-->
<!--                flex: 1;-->
<!--                height: 44rpx;-->
<!--                font-size: 34rpx;-->
<!--                font-family: PingFangSC-Regular, PingFang SC;-->
<!--                font-weight: 400;-->
<!--                color: #007AFF;-->
<!--                line-height: 44rpx;-->
<!--                text-align: center;-->
<!--            }-->
<!--        }-->

<!--    }-->

<!--    .popupkf {-->
<!--        width: 478rpx;-->
<!--        background: #FFFFFF;-->
<!--        border-radius: 28rpx;-->
<!--        margin: auto;-->


<!--        &-title {-->
<!--            padding-top: 40rpx;-->
<!--            font-size: 32rpx;-->
<!--            font-family: PingFangSC-Medium, PingFang SC;-->
<!--            font-weight: 500;-->
<!--            color: #000000;-->
<!--            line-height: 36rpx;-->
<!--            text-align: center;-->
<!--        }-->

<!--        &-img {-->
<!--            display: block;-->
<!--            width: 300rpx;-->
<!--            height: 300rpx;-->
<!--            margin: 30rpx auto;-->
<!--        }-->

<!--        &-line {-->
<!--            height: 1rpx;-->
<!--            background: #CACADA;-->
<!--        }-->

<!--        &-btns {-->
<!--            display: flex;-->
<!--            align-items: center;-->

<!--            &-cancel {-->
<!--                flex: 1;-->
<!--                text-align: center;-->
<!--                line-height: 86rpx;-->
<!--                font-size: 34rpx;-->
<!--                font-family: PingFangSC-Regular, PingFang SC;-->
<!--                font-weight: 400;-->
<!--                color: #000000;-->
<!--                border-right: 1px #CACADA solid;-->
<!--            }-->

<!--            &-confirm {-->
<!--                flex: 1;-->
<!--                text-align: center;-->
<!--                line-height: 86rpx;-->
<!--                font-size: 34rpx;-->
<!--                font-family: PingFangSC-Regular, PingFang SC;-->
<!--                font-weight: 400;-->
<!--                color: #007AFF;-->
<!--            }-->
<!--        }-->
<!--    }-->

<!--    .uni-checkbox .uni-checkbox-input.uni-checkbox-input-checked{-->
<!--        color: #3d3d3d-->
<!--    }-->
<!--</style>-->
