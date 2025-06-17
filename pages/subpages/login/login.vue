<template>
  <view>
    <image class="box_1" src="@/static/game_cps/bakimage.png">
      <view style="height: 80rpx"/>
      <view class="section_1">
        <view class="box_2">
          <text lines="1" class="text_1">推广助手</text>
        </view>
      </view>
      <view class="section_2">
        <text lines="1" class="text_2">小游戏-CPS推广助手</text>
        <view class="group_2">
          <text lines="1" class="text_3">账号名称</text>
          <view class="text-wrapper_1">
            <input v-model="reqData.account" class="text_4" placeholder="请输入账号名称"/>
          </view>
        </view>
        <view class="group_4">
          <text lines="1" class="text_3">推广渠道</text>
          <view class="text-wrapper_1">
            <input v-model="reqData.source" class="text_4" placeholder="如:社区论坛，QQ微信群，公众号"/>
          </view>
        </view>
        <view class="group_4">
          <text lines="1" class="text_6">联系微信</text>
          <view class="text-wrapper_1">
            <input v-model="reqData.phone" class="text_4" placeholder="请输入联系微信"/>
          </view>
        </view>
        <view class="group_4">
          <text lines="1" class="text_8">邀请码</text>
          <view class="text-wrapper_1">
            <input v-model="reqData.ref" class="text_4" placeholder="请输入邀请码"/>
          </view>
        </view>

        <view class="list_1">
          <view @click="submit()" class="list-items_1-1">
            <image src="@/static/game_cps/ioc/weixioc1.png" class="image_5-1"></image>
            <text lines="1" class="text_11-1">微信登录</text>
          </view>
        </view>
      </view>
    </image>
  </view>
</template>

<script>
import {
  rsa,
  MD5
} from '@/js/utils.js'
import env from "@/js/config.js"
import api from '@/js/api.js'
import store from "@/store/index.js"

export default {
  data() {
    return {
      msg: null,
      reqData: {
        phone: null,
        account: null,
        ref: null,
        source: null,
      }
    }
  },
  onShow() {
    console.log("====")
  },
  methods: {
    // 登录后获取配置
    loadConfig() {
      api.getData(null).then(res => {
        if (res.code === 200) {
          let config = {
            config: res.data.withdrawMaxAmount || 0,
            withdrawRadio: res.data.withdrawRadio || 0,
            cpsRadio: res.data.cpsRadio || 0,
            comCpsRadio: res.data.comCpsRadio || 0,
            share: res.data.share || 0
          };
          store.commit('setConfig', config);
          uni.switchTab({url: "/pages/subpages/index/index"});
        }
      });
    },
    // code_推荐码_{"phone":"18361337975","source":"微信公众号"}_账号
    //表单提交
    submit() {
      if (!this.reqData.account) {
        this.Tips('账号不能为空');
      }
      if (!this.reqData.phone) {
        this.Tips('联系方式不能为空');
      }
      if (!this.reqData.ref) {
        this.Tips('邀请码不能为空');
      }
      //todo 微信登陆
      // #ifdef MP-WEIXIN
      let _this = this
      uni.login({
        provider: 'weixin',
        success: function (loginRes) {
          // 拼接 code
          console.log(_this.reqData, "==")
          let req = {phone: _this.reqData.phone, source: _this.reqData.source}
          const code = loginRes.code + "_" + _this.reqData.ref + "_" + JSON.stringify(req) + "_" + _this.reqData.account;
          _this.handleLogin(code);
        },
        fail: function () {
          uni.showToast({icon: 'none', title: '游客模式'});
        }
      });
      // #endif

      //todo 公众号登陆
      // #ifdef H5
      // uni.switchTab({url: "/pages/subpages/index/index"});
      function getQueryParam(name) {
        const reg = new RegExp(`[?&]${name}=([^&#]*)`, 'i');
        const result = window.location.href.match(reg);
        return result ? decodeURIComponent(result[1]) : null;
      }

      let h5Code = getQueryParam('code');
      console.log("完整URL:", window.location.href);
      console.log("提取到的 code:", h5Code);
      if (h5Code) {
        this.handleLogin(h5Code);
      } else {
        const scope = 'snsapi_userinfo';
        const state = 'STATE123';
        const wxAuthUrl = `https://open.weixin.qq.com/connect/oauth2/authorize?appid=${env.BASE_GON}&redirect_uri=${env.BASE_WEB_NRL}&response_type=code&scope=${scope}&state=${state}#wechat_redirect`;
        window.location.replace(wxAuthUrl);
        return;
      }
      // #endif
    },


    // 封装登录函数
    handleLogin(code) {
      console.log(code, 'code');
      const params = {data: code};
      // #ifdef H5
      store.dispatch("loginByH5", params).then(res => {
        if (res.code === 200) {
          uni.showToast({icon: 'success', title: '自动登录成功'});
          this.loadConfig();
        } else {
          this.Tips(res.msg);
        }
      });
      // #endif
      // #ifdef MP-WEIXIN
      store.dispatch("login", params).then(res => {
        if (res.code === 200) {
          uni.showToast({icon: 'success', title: '自动登录成功'});
          this.loadConfig();
        } else {
          this.Tips(res.msg);
        }
      });
      // #endif
    },


    //验证手机号
    vailPhone(phone) {
      var pphone = /^1[3456789]\d{9}$/;
      var pkong = /^[\s\S]*.*[^\s][\s\S]*$/;
      if (!pkong.test(phone) || !pphone.test(phone)) {
        this.Tips("请输入正确的手机号");
        return false;
      }
      return true;
    },
  }
}
</script>

<style lang="scss">
.page {
  position: relative;
  width: 750rpx;
  height: 1624rpx;
  overflow: hidden;
  display: flex;
  flex-direction: column;
}

.box_1 {
  width: 100%;
  height: 100%;
  display: flex;
  position: absolute;
  flex-direction: column;
}

.image_1 {
  width: 683rpx;
  height: 23rpx;
  margin: 33rpx 0 0 33rpx;
}

.section_1 {
  position: relative;
  width: 750rpx;
  height: 133rpx;
  display: flex;
  flex-direction: column;
}

.box_2 {
  width: 455rpx;
  height: 59rpx;
  flex-direction: row;
  display: flex;
  justify-content: space-between;
  margin: 41rpx 0 0 262rpx;
}

.text_1 {
  width: 226rpx;
  height: 34rpx;
  overflow-wrap: break-word;
  color: rgba(0, 0, 0, 1);
  font-size: 36rpx;
  font-family: AlibabaPuHuiTi_2_75_SemiBold;
  font-weight: normal;
  text-align: center;
  white-space: nowrap;
  line-height: 44rpx;
  margin-top: 12rpx;
}

.image_2 {
  width: 160rpx;
  height: 59rpx;
}

.section_2 {
  position: relative;
  background-color: rgba(255, 255, 255, 1.000000);
  border-radius: 33rpx;
  width: 697rpx;
  height: 1200rpx;
  display: flex;
  flex-direction: column;
  margin: -1rpx 0 0 27rpx;
}

.text_2 {
  width: 534rpx;
  height: 45rpx;
  overflow-wrap: break-word;
  color: rgba(153, 102, 255, 1);
  font-size: 48rpx;
  font-family: AlibabaPuHuiTi_2_75_SemiBold;
  font-weight: normal;
  text-align: center;
  white-space: nowrap;
  line-height: 44rpx;
  margin: 93rpx 0 0 81rpx;
}

.group_2 {
  width: 617rpx;
  height: 93rpx;
  flex-direction: row;
  display: flex;
  justify-content: space-between;
  margin: 86rpx 0 0 40rpx;
}

.text_3 {
  width: 103rpx;
  height: 25rpx;
  overflow-wrap: break-word;
  color: rgba(0, 0, 0, 1);
  font-size: 27rpx;
  font-family: AlibabaPuHuiTi_2_55_Regular;
  font-weight: normal;
  text-align: left;
  white-space: nowrap;
  line-height: 44rpx;
  margin-top: 35rpx;
}

.text-wrapper_1 {
  background-color: rgba(242, 242, 242, 1.000000);
  border-radius: 20rpx;
  height: 93rpx;
  display: flex;
  flex-direction: column;
  width: 493rpx;
}

.text_4 {
  height: 25rpx;
  overflow-wrap: break-word;
  color: rgba(153, 153, 153, 1);
  font-size: 27rpx;
  font-family: AlibabaPuHuiTi_2_55_Regular;
  font-weight: normal;
  text-align: left;
  white-space: nowrap;
  line-height: 44rpx;
  margin: 30rpx 0 0 26rpx;
}

.group_3 {
  width: 617rpx;
  height: 120rpx;
  flex-direction: row;
  display: flex;
  justify-content: space-between;
  margin: 27rpx 0 0 40rpx;
}

.text_5 {
  width: 103rpx;
  height: 25rpx;
  overflow-wrap: break-word;
  color: rgba(0, 0, 0, 1);
  font-size: 27rpx;
  font-family: AlibabaPuHuiTi_2_55_Regular;
  font-weight: normal;
  text-align: left;
  white-space: nowrap;
  line-height: 44rpx;
  margin-top: 47rpx;
}

.text-wrapper_2 {
  background-color: rgba(242, 242, 242, 1.000000);
  border-radius: 20rpx;
  height: 120rpx;
  display: flex;
  flex-direction: column;
  width: 493rpx;
}

.paragraph_1 {
  width: 401rpx;
  height: 63rpx;
  overflow-wrap: break-word;
  color: rgba(153, 153, 153, 1);
  font-size: 27rpx;
  font-family: AlibabaPuHuiTi_2_55_Regular;
  font-weight: normal;
  text-align: left;
  line-height: 32rpx;
  margin: 29rpx 0 0 26rpx;
}

.group_4 {
  width: 617rpx;
  height: 93rpx;
  flex-direction: row;
  display: flex;
  justify-content: space-between;
  margin: 27rpx 0 0 40rpx;
}

.text_6 {
  width: 103rpx;
  height: 25rpx;
  overflow-wrap: break-word;
  color: rgba(0, 0, 0, 1);
  font-size: 27rpx;
  font-family: AlibabaPuHuiTi_2_55_Regular;
  font-weight: normal;
  text-align: left;
  white-space: nowrap;
  line-height: 44rpx;
  margin-top: 35rpx;
}

.text-wrapper_3 {
  background-color: rgba(242, 242, 242, 1.000000);
  border-radius: 20rpx;
  height: 93rpx;
  display: flex;
  flex-direction: column;
  width: 493rpx;
}

.text_7 {
  width: 182rpx;
  height: 25rpx;
  overflow-wrap: break-word;
  color: rgba(153, 153, 153, 1);
  font-size: 27rpx;
  font-family: AlibabaPuHuiTi_2_55_Regular;
  font-weight: normal;
  text-align: left;
  white-space: nowrap;
  line-height: 44rpx;
  margin: 35rpx 0 0 26rpx;
}

.group_5 {
  width: 617rpx;
  height: 93rpx;
  flex-direction: row;
  display: flex;
  justify-content: space-between;
  margin: 27rpx 0 0 39rpx;
}

.text_8 {
  width: 77rpx;
  height: 25rpx;
  overflow-wrap: break-word;
  color: rgba(0, 0, 0, 1);
  font-size: 27rpx;
  font-family: AlibabaPuHuiTi_2_55_Regular;
  font-weight: normal;
  text-align: left;
  white-space: nowrap;
  line-height: 44rpx;
  margin-top: 35rpx;
}

.text-wrapper_4 {
  background-color: rgba(242, 242, 242, 1.000000);
  border-radius: 20rpx;
  height: 93rpx;
  display: flex;
  flex-direction: column;
  width: 493rpx;
}

.text_9 {
  width: 155rpx;
  height: 25rpx;
  overflow-wrap: break-word;
  color: rgba(153, 153, 153, 1);
  font-size: 27rpx;
  font-family: AlibabaPuHuiTi_2_55_Regular;
  font-weight: normal;
  text-align: left;
  white-space: nowrap;
  line-height: 44rpx;
  margin: 35rpx 0 0 26rpx;
}

.image_3 {
  width: 33rpx;
  height: 33rpx;
  margin: 15rpx 0 0 79rpx;
}

.group_6 {
  width: 538rpx;
  height: 33rpx;
  flex-direction: row;
  display: flex;
  justify-content: space-between;
  margin: 18rpx 0 0 79rpx;
}

.image_4 {
  width: 33rpx;
  height: 33rpx;
}

.text_10 {
  width: 485rpx;
  height: 23rpx;
  overflow-wrap: break-word;
  color: rgba(153, 102, 255, 1);
  font-size: 24rpx;
  font-family: AlibabaPuHuiTi_2_55_Regular;
  font-weight: normal;
  text-align: center;
  white-space: nowrap;
  line-height: 44rpx;
  margin-top: 5rpx;
}

.list_1 {
  width: 617rpx;
  height: 193rpx;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  margin: 33rpx 0 169rpx 40rpx;
}

.list-items_1-0 {
  border-radius: 27rpx;
  width: 617rpx;
  height: 80rpx;
  margin-bottom: 33rpx;
  flex-direction: row;
  display: flex;
  justify-content: space-between;
  background: rgba(51, 204, 102, 1.000000);
}

.image_5-0 {
  width: 52rpx;
  height: 52rpx;
  margin: 14rpx 0 0 195rpx;
}

.text_11-0 {
  width: 155rpx;
  height: 37rpx;
  overflow-wrap: break-word;
  font-size: 40rpx;
  font-family: AlibabaPuHuiTi_2_75_SemiBold;
  font-weight: normal;
  text-align: center;
  white-space: nowrap;
  line-height: 44rpx;
  margin: 22rpx 195rpx 0 0;
  color: rgba(255, 255, 255, 1);
}

.list-items_1-1 {
  border-radius: 27rpx;
  width: 617rpx;
  height: 80rpx;
  margin-bottom: 33rpx;
  flex-direction: row;
  display: flex;
  justify-content: space-between;
  background: #33CC66;
}

.image_5-1 {
  width: 52rpx;
  height: 52rpx;
  margin: 14rpx 0 0 195rpx;
}

.text_11-1 {
  width: 155rpx;
  height: 37rpx;
  overflow-wrap: break-word;
  font-size: 40rpx;
  font-family: AlibabaPuHuiTi_2_75_SemiBold;
  font-weight: normal;
  text-align: center;
  white-space: nowrap;
  line-height: 44rpx;
  margin: 22rpx 195rpx 0 0;
  color: #FFFFFF;
}

.section_3 {
  width: 750rpx;
  height: 235rpx;
  margin-bottom: 1rpx;
  display: flex;
  flex-direction: column;
}

.box_3 {
  background-color: rgba(51, 51, 51, 1.000000);
  border-radius: 5rpx;
  width: 267rpx;
  height: 9rpx;
  display: flex;
  flex-direction: column;
  margin: 208rpx 0 0 242rpx;
}
</style>
