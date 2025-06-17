import store from "@/store/index.js"
import env from "@/js/config.js"

const Tips = (title) => {
    uni.showToast({
        title,
        icon: "none",
        duration: 2000,
    })
}
console.log(env.BASE_URL)
const base = env.BASE_URL


export default async function request(url, data = {}, {
    loading = true,
    showErrorMessage = true,
    method = "POST",
} = {}, params = null) {
    return new Promise((reslove, reject) => {
        loading && uni.showLoading();
        let header = {
            'Content-Type': 'application/json',
            'Device-Id': uni.getSystemInfoSync().deviceId
        }
        if (store.state.user.token) {
            header["Authorization"] = store.state.user.token
        }
        // header["Authorization"] = "eyJhbGciOiJIUzUxMiJ9.eyJsb2dpbl91c2VyX2tleSI6IjE5MTIxNTQ1OTM3MjczODE1MDUifQ.uhNznAUOeb8xdEH4EutcWjYCuIicTXWDtF5dNppO6n9RGWE4IrYO1PYbZCMQSC-WV2gk5RG58uPq2iO2zI_KEQ"
        uni.request({
            url: base + url,
            method,
            header,
            data,
            params,
            success: (res) => {
                loading && uni.hideLoading();
                if (res.data.code == 401){
                    uni.navigateTo({url: "/pages/subpages/login/login"});
                    return;
                }else if (res.data.code == 200) {
                    reslove(res.data);
                }else {
                    showErrorMessage && Tips(res.data.msg);
                }
            },
            fail: (err) => {
                Tips('您的网络异常，请稍后再试！');
                loading && uni.hideLoading();
                reject(err);
            }
        })
    })
}
