<script>
import store from "@/store/index.js"
import api from '@/js/api.js'

export default {
  onShow(options) {
    if (options.path === 'pages/subpages/aboutMe/aboutMe') return;
    // 已登录
    if (store.state.user.token) {
      loadConfig();
      return;
    } else {
      setTimeout(() => {
        uni.navigateTo({url: "/pages/subpages/login/login"});
      }, 2000)
      // uni.navigateTo({url: "/pages/subpages/login/login"});
    }
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
            uni.switchTab({url: "/pages/subpages/index/index"});
          }, 200);
        }
      });
    };

  }
}
</script>

<style scoped>
/* 可加样式 */
</style>
