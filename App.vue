<script>
import store from "@/store/index.js"
import api from '@/js/api.js'
import env from "@/js/config.js"

export default {
  onShow(options) {
    if (options.path === 'pages/subpages/aboutMe/aboutMe') return;
    let wxRefereeCode = options.query.code ? "_" + options.query.code : '';
    console.log(options.query, "options.query")
    let refereeCode = options.query.refereeCode
    if (refereeCode) {
      refereeCode = "_" + refereeCode;
      uni.setStorageSync('refereeCode', refereeCode);
    }
    uni.showLoading({
      title: '自动加载中',
      mask: true
    });
    const _this = this;
    // 登录后获取配置
    const loadConfig = () => {
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

          setTimeout(() => {
            if (config.withdrawRadio == 0) {
              uni.redirectTo({url: "/pages/subpages/test/test"});
            } else {
              uni.switchTab({url: "/pages/subpages/index/index"});
            }
          }, 200);
        }
      });
    };

    // 封装登录函数
    const handleLogin = (code) => {
      console.log(code, 'code');
      let refereeCode = uni.getStorageSync('refereeCode');
      if (refereeCode) {
        code = code + refereeCode
      }
      const params = {data: code};

      // #ifdef H5
      store.dispatch("loginByH5", params).then(res => {
        if (res.code === 200) {
          uni.hideLoading();
          uni.showToast({icon: 'success', title: '自动登录成功'});
          loadConfig();
        } else {
          uni.hideLoading();
          _this.Tips(res.msg);
        }
      });
      // #endif

      // #ifdef MP-WEIXIN
      store.dispatch("login", params).then(res => {
        if (res.code === 200) {
          uni.hideLoading();
          uni.showToast({icon: 'success', title: '自动登录成功'});
          loadConfig();
        } else {
          uni.hideLoading();
          _this.Tips(res.msg);
        }
      });
      // #endif
    };


    // 已登录
    if (store.state.user.token) {
      loadConfig();
      return;
    }

    // #ifdef MP-WEIXIN
    uni.login({
      provider: 'weixin',
      success: function (loginRes) {
        const code = loginRes.code + wxRefereeCode;
        handleLogin(code);
      },
      fail: function () {
        uni.hideLoading();
        uni.showToast({icon: 'none', title: '游客模式'});
      }
    });
    // #endif

// #ifdef H5
//               uni.switchTab({url: "/pages/subpages/index/index"});
    function getQueryParam(name) {
      const reg = new RegExp(`[?&]${name}=([^&#]*)`, 'i');
      const result = window.location.href.match(reg);
      return result ? decodeURIComponent(result[1]) : null;
    }
    let h5Code = getQueryParam('code');
    console.log("完整URL:", window.location.href);
    console.log("提取到的 code:", h5Code);
    if (h5Code) {
      handleLogin(h5Code);
    } else {
      const scope = 'snsapi_userinfo';
      const state = 'STATE123';
      const wxAuthUrl = `https://open.weixin.qq.com/connect/oauth2/authorize?appid=${env.BASE_GON}&redirect_uri=${env.BASE_WEB_NRL}&response_type=code&scope=${scope}&state=${state}#wechat_redirect`;
      window.location.replace(wxAuthUrl);
      return;
    }
// #endif
  }
}
</script>

<style scoped>
/* 可加样式 */
</style>
