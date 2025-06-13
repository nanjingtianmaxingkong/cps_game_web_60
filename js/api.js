import request from './request.js'

export default {
	// 登录
	login(params) {
		return request("/api/user/login", params, {
			showErrorMessage: false,
		})
	},
	loginByH5(params) {
		return request("/api/user/loginByH5", params, {
			showErrorMessage: false,
		})
	},
	loginByThird(params) {
		return request("/api/user/loginByThird", params, {
			showErrorMessage: false,
		})
	},
	//获取用户信息
	userInfo(params) {
		return request("/api/user/get", params, {
			method: "POST",
		})
	},

	// 获取游戏列表
	gameList(params,url) {
		return request(`/api/game/list?pageNum=${url}&pageSize=10`, params, {
			method: "POST",
		})
	},

	// 获取游戏详情
	getGameDetail(params) {
		return request(`/api/game/getGameInfo`, params, {
			method: "POST",
		})
	},

	// 释放
	release(params) {
		return request(`/api/game/reclaim/${params}`, null, {
			method: "POST",
		})
	},


	// 首页banner配置
	getBannerConfig(params) {
		return request(`/api/user/getConfig`, params, {
			method: "POST",
		})
	},

	//获取分类列表
	gameCategory(params) {
		return request(`/api/gameCategory/list?pageNum=1&pageSize=100`, params, {
			method: "GET",
		})
	},
	//获取公告
	notice(type) {
		return request(`/system/notice/list?pageNum=1&pageSize=100&noticeType=${type}`, null,{
			method: "GET",
		})
	},
	//查询游戏收益信息列表
	userGameAmountList(params,par) {
		return request(`/api/userGameAmount/list?pageNum=${params}&pageSize=10`, par, {
			method: "POST",
		})
	},
	//查询游戏收益信息列表 日期分组
	statisticsList(params,par) {
		return request(`/api/userGameAmount/statisticsList?pageNum=${params}&pageSize=10`, par, {
			method: "POST",
		})
	},
	//	"BASE_URL":"https://jianghunew.nanjingtianma.top",
	//查询游戏上级收益信息列表
	getToUserIdList(params) {
		return request(`/api/userGameAmount/getToUserIdList?pageNum=${params}&pageSize=10`, null, {
			method: "POST",
		})
	},
	//查询游戏收益统计
	statistics(params) {
		return request(`/api/userGameAmount/statistics`, params, {
			method: "POST",
		})
	},
	// 获取CPS申请订单记录列表
	cpsApplyOrderRecord(params,status = null) {
		return request(`/api/cpsApplyOrder/list?pageNum=${params}&pageSize=10&status=${status}`, null, {
			method: "GET",
		})
	},
	// 新增申请记录
	cpsApplyOrder(params) {
		return request(`/api/cpsApplyOrder/add`, params, {
			method: "GET",
		})
	},

	// 统计用户成功提现的总金额
	calculateTotalWithdrawAmount(params) {
		return request(`/api/cpsWithdraw/calculateTotalWithdrawAmount`, params, {
			method: "GET",
		})
	},

	// 获取配置信息
	getData(params) {
		return request(`/api/user/getData`, params, {
			method: "POST",
		})
	},

	// 提现
	cpsWithdraw(params) {
		return request(`/api/cpsWithdraw/add`, params, {
			method: "POST",
		})
	},

	// 修改账号
	userUpdate(params) {
		return request(`/api/user/update`, params, {
			method: "POST",
		})
	},
	// 微信商家转账
	cpsWithdrawPayouts(params) {
		return request(`/api/cpsWithdraw/payouts`, params, {
			method: "POST",
		})
	},
	// 获取h5 支付的密钥文件
	getWxconfig(params){
		return request(`/api/user/getWxconfig`, params, {
			method: "POST",
		})
	}
}
