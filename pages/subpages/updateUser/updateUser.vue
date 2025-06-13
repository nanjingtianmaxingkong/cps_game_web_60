<!--<template>-->
<!--	<view class="container">-->
<!--		<uni-notice-bar single show-icon color="#805301" background-color="#fdcf40" :text="text" />-->
<!--		<uni-forms ref="form" :modelValue="formData" :rules="rules" class="forms">-->
<!--			<view class="forms-type">-->
<!--				<view class="forms-type-label">修改信息：</view>-->
<!--				<view class="forms-type-content">-->
<!--					<view class="forms-type-content-item" :class="{type:type==1}" @click="type=1">基本信息</view>-->
<!--					<view class="forms-type-content-item" :class="{type:type==2}" @click="type=2">密码</view>-->
<!--				</view>-->
<!--			</view>-->
<!--			<uni-forms-item v-show="type == 1"  label="用户名：" name="name" :label-width="85">-->
<!--				<uni-easyinput type="name"  v-model="formData.name" placeholder="请输入" trim />-->
<!--			</uni-forms-item>-->
<!--			<uni-forms-item v-show="type == 1"  label="手机号：" name="phoneNumber" :label-width="85">-->
<!--				<uni-easyinput type="phoneNumber" v-model="formData.phoneNumber" placeholder="请输入" trim />-->
<!--			</uni-forms-item>-->
<!--			<uni-forms-item v-show="type == 1"  label="收件地址：" name="address" :label-width="85">-->
<!--				<uni-easyinput type="address" v-model="formData.address" placeholder="请输入" trim />-->
<!--			</uni-forms-item>-->
<!--			<uni-forms-item v-show="type == 2" label="原密码：" :label-width="85">-->
<!--				<uni-easyinput  type="password"  v-model="formData.password" placeholder="请输入旧密码" trim />-->
<!--			</uni-forms-item>-->
<!--			<uni-forms-item v-show="type == 2" label="新密码："  :label-width="85">-->
<!--				<uni-easyinput type="password"  v-model="formData.newPassword" placeholder="请输入新密码" trim />-->
<!--			</uni-forms-item>-->
<!--		</uni-forms>-->
<!--		<button @click="submit" class="btn">确认修改</button>-->
<!--	</view>-->
<!--</template>-->

<!--<script>-->
<!--	import {-->
<!--		mapState,-->
<!--	} from "vuex"-->
<!--	import {-->
<!--		rsa,-->
<!--		parseTime,-->
<!--		randomn,-->
<!--		deepClone-->
<!--	} from '@/js/utils.js'-->
<!--	import api from '@/js/api.js'-->
<!--	export default {-->
<!--		data() {-->
<!--			return {-->
<!--				files: [],-->
<!--				avatarUrl: null,-->
<!--				// 表单数据-->
<!--				formData: {-->
<!--					name: '',-->
<!--					phoneNumber: '',-->
<!--					password: '',-->
<!--					address: '',-->
<!--					newPassword: ''-->
<!--				},-->
<!--				rules: {-->
<!--					name: {-->
<!--						rules: [{-->
<!--							required: true,-->
<!--							errorMessage: '请输入昵称',-->
<!--						}]-->
<!--					},-->
<!--					phoneNumber: {-->
<!--						rules: [{-->
<!--							required: true,-->
<!--							errorMessage: '请输入手机号码'-->
<!--						},-->
<!--							{-->
<!--								validateFunction: function (rule, value, data, callback) {-->
<!--									let reg = new RegExp(/^(1[3-9])\d{9}$/);-->
<!--									if (!reg.test(value)) {-->
<!--										callback('手机号码有误')-->
<!--									}-->
<!--									return true-->
<!--								}-->
<!--							}-->
<!--						]-->
<!--					},-->
<!--					address: {-->
<!--						rules: [{-->
<!--							required: true,-->
<!--							errorMessage: '请输入收件地址',-->
<!--						}]-->
<!--					},-->
<!--				},-->
<!--				type: 1,-->
<!--			}-->
<!--		},-->
<!--		computed: {-->
<!--			...mapState({-->
<!--				userInfo: state => state.user.userInfo-->
<!--			}),-->
<!--			text() {-->
<!--				if (this.type == 1) {-->
<!--					return `请确认要修改的密码`-->
<!--				}-->
<!--				if (this.type == 2) {-->
<!--					return `请确认要修改的信息`-->
<!--				}-->
<!--			},-->
<!--		},-->
<!--		onShow() {-->
<!--			this.formData.address = this.userInfo.address;-->
<!--			this.formData.phoneNumber = this.userInfo.phoneNumber;-->
<!--			this.formData.name = this.userInfo.name;-->
<!--		},-->
<!--		methods: {-->
<!--			success(res){-->
<!--				let fileReader = new FileReader();-->
<!--				fileReader.onload = () => {-->
<!--					// 获取生成的 base64 数据-->
<!--					let base64Data = fileReader.result.split(',')[1]; // 去除 data:image/png;base64, 这部分-->
<!--					this.avatarUrl = base64Data; // 将 base64 数据赋值给页面的 avatarUrl 变量-->
<!--				};-->
<!--				fileReader.readAsDataURL(res.tempFilePaths[0]); // 读取文件内容，触发 onload 事件-->
<!--			},-->
<!--			// 触发提交表单-->
<!--		 submit() {-->
<!--				const _this = this-->
<!--				_this.$refs.form.validate().then(res => {-->
<!--					if (this.type == 1){-->
<!--						let par = {-->
<!--							address: this.formData.address,-->
<!--							phoneNumber: this.formData.phoneNumber,-->
<!--							name:this.formData.name,-->
<!--						}-->
<!--					 	api.updateUserInfo(par).then(res => {-->
<!--							if (res.code == 200){-->
<!--								this.Tips("修改成功")-->
<!--								setTimeout(() => {-->
<!--									uni.navigateBack()-->
<!--								}, 2000)-->
<!--								// 重新加载userInfo-->
<!--								api.userInfo().then(user =>{-->
<!--									if (user.code == 200) {-->
<!--										this.$store.commit('setUserInfo', user.data)-->
<!--									}-->
<!--								})-->
<!--							}-->
<!--						})-->
<!--					}else {-->
<!--						if(!this.formData.password){-->
<!--							this.Tips("原密码不能为空")-->
<!--							return-->
<!--						}-->
<!--						if(!this.formData.newPassword){-->
<!--							this.Tips("新密码不能为空")-->
<!--							return-->
<!--						}-->
<!--						let par = {-->
<!--							password: rsa(this.formData.password),-->
<!--							newPassword: rsa(this.formData.newPassword),-->
<!--						}-->
<!--						api.updatePwd(par).then(res => {-->
<!--							if (res.code == 200){-->
<!--								this.Tips("修改成功")-->
<!--								setTimeout(() => {-->
<!--									uni.navigateBack()-->
<!--								}, 2000)-->
<!--							}-->
<!--						})-->
<!--					}-->

<!--				}).catch(err => {-->

<!--				})-->
<!--			},-->
<!--		}-->
<!--	}-->
<!--</script>-->

<!--<style lang="scss" scoped>-->
<!--	.container {-->
<!--		padding-bottom: 60rpx;-->

<!--		::v-deep .forms {-->
<!--			background: #FFFFFF;-->
<!--			padding: 28rpx 0;-->
<!--			margin-top: 10rpx;-->

<!--			&-type {-->
<!--				padding: 0 30rpx;-->
<!--				display: flex;-->
<!--				align-items: center;-->
<!--				margin-bottom: 36rpx;-->

<!--				&-label {-->
<!--					font-weight: 500;-->
<!--					color: #0D0E15;-->
<!--					flex: 0 0 85px;-->
<!--				}-->

<!--				&-content {-->
<!--					flex: 1 1 auto;-->
<!--					display: flex;-->
<!--					align-items: center;-->

<!--					&-item {-->
<!--						margin-right: 50rpx;-->
<!--						padding: 12rpx 30rpx;-->
<!--						background: #EBEDF0;-->
<!--						border-radius: 18rpx;-->
<!--						font-size: 24rpx;-->
<!--						font-family: PingFangSC-Medium, PingFang SC;-->
<!--						font-weight: 500;-->
<!--						color: #768196;-->
<!--						line-height: 34rpx;-->
<!--					}-->

<!--					.type {-->
<!--						background: #EEF2FF;-->
<!--						color: #fdcf40;-->
<!--					}-->
<!--				}-->
<!--			}-->

<!--			.uni-forms-item {-->
<!--				padding: 0 30rpx;-->
<!--				width: calc(100vw - 60rpx);-->

<!--				.uni-forms-item__label {-->
<!--					font-weight: 500;-->
<!--					color: #0D0E15;-->
<!--				}-->

<!--				.value {-->
<!--					line-height: 72rpx;-->
<!--				}-->
<!--			}-->
<!--		}-->

<!--		.tip {-->
<!--			margin-top: 30rpx;-->
<!--			padding:0 30rpx;-->
<!--			font-size: 24rpx;-->
<!--			font-family: PingFangSC-Regular, PingFang SC;-->
<!--			font-weight: 400;-->
<!--			color: #FE4430;-->
<!--			line-height: 32rpx-->
<!--		}-->

<!--		.btn {-->
<!--			margin: 100rpx auto 0;-->
<!--			width: 610rpx;-->
<!--			height: 88rpx;-->
<!--			background: #fdcf40;-->
<!--			border-radius: 18rpx;-->
<!--			line-height: 88rpx;-->
<!--			text-align: center;-->
<!--			padding: 0;-->
<!--			border: none;-->
<!--			font-size: 32rpx;-->
<!--			font-family: PingFangSC-Regular, PingFang SC;-->
<!--			font-weight: 400;-->
<!--			color: #805301;-->
<!--		}-->

<!--		.limit {-->
<!--			margin-top: 20rpx;-->
<!--			background: #FFFFFF;-->

<!--			&-row {-->
<!--				line-height: 96rpx;-->
<!--				padding: 0 30rpx;-->
<!--				font-size: 28rpx;-->
<!--				font-family: PingFangSC-Medium, PingFang SC;-->
<!--				font-weight: 500;-->
<!--				color: #0D0E15;-->
<!--				display: flex;-->
<!--				align-items: center;-->

<!--				&-icon {-->

<!--					width: 32rpx;-->
<!--					height: 32rpx;-->
<!--					margin: 0 10rpx;-->
<!--					background: url("../../../static/mine/limit_icon@2x.png") no-repeat;-->
<!--					background-size: 100% 100%;-->
<!--				}-->
<!--			}-->
<!--		}-->
<!--	}-->
<!--</style>-->
