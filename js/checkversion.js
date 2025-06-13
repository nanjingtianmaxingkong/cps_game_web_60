import api from '@/js/api.js'
import env from "./config.js"
import autoUpdater from './autoUpdater.min.js';
import {
	compare
} from '@/js/utils.js'

var updateUseModal = (packageInfo) => {
	const {
		contents, // 升级内容
		url, // 安装包下载地址
		platform, // 安装包平台
	} = packageInfo;
	let isiOS = platform == "ios";
	let confirmText = isiOS ? '立即跳转更新' : '立即下载更新'
	autoUpdater.init({
		packageUrl: url,
		content: contents,
		contentAlign: 'left',
		confirmColor: "#0091ff",
		browser: isiOS,
		confirm: confirmText,
		windowHeight: "240"
	})
	autoUpdater.show();
}
var fCheckVersion = (cb, showTip = false) => {
	// #ifdef APP-PLUS
	plus.runtime.getProperty(plus.runtime.appid, function(widgetInfo) {
		var nVerSta = compare(plus.runtime.versionCode, widgetInfo.versionCode),
			sLaststVer = plus.runtime.versionCode;
		//热更新后本地客户端的版本号不会修改widgetInfo返回的版本是最新的
		if (widgetInfo.versionCode) {
			if (nVerSta == 1) {
				sLaststVer = plus.runtime.versionCode
			} else if (nVerSta == -1) {
				sLaststVer = widgetInfo.versionCode
			}
		}
		//发送请求进行版本匹对
		uni.request({
			method: "GET",
			url: `${env.BASE_URL}/jw.json?t=${Date.now()}`,
			success(res) {
				let data = res.data
				let isMinVersion = compare(sLaststVer, data.minVersion)
				//如果当前版本号低于app最小版本号直接强制更新
				if (isMinVersion == -1) {
					return updateUseModal({
						contents: data.contents,
						url: data.apkName,
						platform: uni.getSystemInfoSync().platform,
					})
				}
				let isUpdate = compare(sLaststVer, data.version)
				//showTip是需要检查isUpdate==0代表无新版本
				if (showTip && isUpdate == 0) {
					uni.showToast({
						icon: "none",
						title: "当前已是最新版本",
					})
				}
				//当前版本号和最新版本号对比isConstraint为true强更
				if (isUpdate == -1) {
					uni.downloadFile({
						url: data.wgtName,
						success: function(downloadFileResult) {
							if (200 === downloadFileResult.statusCode) {
								uni.saveFile({
									tempFilePath: downloadFileResult
										.tempFilePath,
									success: function(saveFileResult) {
										plus.runtime.install(
											saveFileResult
											.savedFilePath, {
												force: false
											},
											function() {
												//更新完重启app
												plus.runtime
													.restart()
											})
									}
								})
							}
						}
					})
				}
			}
		})
		cb && cb(sLaststVer)
	})
	// #endif
}

export {
	fCheckVersion
}