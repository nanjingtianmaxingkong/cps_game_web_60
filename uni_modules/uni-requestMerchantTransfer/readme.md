# uni-requestMerchantTransfer

微信小程序平台参考：[微信小程序API规范](https://developers.weixin.qq.com/miniprogram/dev/api/payment/wx.requestMerchantTransfer.html)

## uni.requestMerchantTransfer(options: RequestMerchantTransferOption)

商家转账用户确认模式下，在移动端应用APP中集成开放SDK调起微信请求用户确认收款。

### RequestMerchantTransferOption参数：

| 名称      | 类型     | 必备 | 描述                                                         |
|-----------|:---------:|:---------:|--------------------------------------------------------------|
| mchId     | string   | 是   | 商户号                                                       |
| subMchId  | string   | 否   | 子商户号，服务商模式下必填                                   |
| package   | string   | 是   | 商家转账付款单跳转收款页 pkg 信息,商家转账付款单受理成功时返回给商户 |
| appId     | string   | 否   | 商户 appId（微信平台appid），普通模式下必填，服务商模式下，appId 和 subAppId 二选一填写 |
| subAppId  | string   | 否   | 子商户 appId（微信平台子appid)，服务商模式下，appId 和 subAppId 二选一填写      |
| openId    | string   | 否   | 收款用户 openId， 对应传入的商户 appId 下，某用户的 openId    |
| success   | function | 否   | 接口调用成功的回调函数                                        |
| fail      | function | 否   | 接口调用失败的回调函数                                        |
| complete  | function | 否   | 接口调用结束的回调函数（调用成功、失败都会执行）              |

### 示例：

```javascript
uni.requestMerchantTransfer({
	"mchId": "mchId",
	"appId": "微信开发者平台对应app的APPID",
	"package": "package",
	success: (res) => {
		console.log(res)
	},
	fail: (res) => {
		console.log(res.errMsg)
	},
	complete: (res) => {
		console.log(res.errMsg)
	}
})
```

## 注意事项

iOS平台必须在项目根目录下的 [Info.plist](https://uniapp.dcloud.net.cn/tutorial/app-nativeresource-ios.html#infoplist) 文件中配置微信开发者平台的APPID和通用链接，配置后需提交云端打包生效。

1. 在 `WeChat` 节点下配置 `appid` 和 `universalLink`
2. 在 `CFBundleURLTypes` 节点下配置 scheme 数据

示例如下：
```xml
<?xml version="1.0" encoding="UTF-8"?>
<!DOCTYPE plist PUBLIC "-//Apple//DTD PLIST 1.0//EN" "http://www.apple.com/DTDs/PropertyList-1.0.dtd">
<plist version="1.0">
	<dict>
		<key>WeChat</key>
		<dict>
			<key>appid</key>
			<string>请填写微信开发者平台对应app的APPID</string>
			<key>universalLink</key>
			<string>请填写能唤起当前应用的Universal Links路径</string>
		</dict>

		<key>CFBundleURLTypes</key>
		<array>
			<dict>
				<key>CFBundleTypeRole</key>
				<string>Editor</string>
				<key>CFBundleURLName</key>
				<string>WeChat</string>
				<key>CFBundleURLSchemes</key>
				<array>
					<string>请填写微信开发者平台对应app的APPID</string>
				</array>
			</dict>
		</array>
	</dict>
</plist>
```

> 如果同时使用了微信支付、微信登录、微信分享模块时，appid 和 universalLink 的值需与 manifest.json 中配置的值保持一致。

