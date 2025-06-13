import api from '@/js/api.js'

let user = uni.getStorageSync('vuex')
let token = ""
let userInfo = {
    name: "未登录",
    amount: 0,
    img: 0,
    phoneNumber: 0,
    hasPwd: false,
    id: null,
    address: null,
}
let config = {
    config: 0,
    withdrawRadio: 1,
    cpsRadio: 0.1,
    comCpsRadio: 1,
}
const state = {
    userInfo: user && user.userInfo ? user.userInfo : userInfo,
    token: user && user.token ? user.token : token,
    config: user && user.config ? user.config : config,
}
const mutations = {
    setUserInfo(state, payload) {
        state.userInfo = payload
    },
    setToken(state, token) {
        state.token = token
    },
    setConfig(state, config) {
        state.config = config
    },
    cleartUserInfo(state) {
        state.token = token;
        state.userInfo = userInfo
    },
}
const actions = {
    // 登录
    login(context, data) {
        console.log(data,"data")
        return new Promise((resolve, reject) => {
            api.login({data:data.data}).then(async (res) => {
                    if (res.code == 200) {
                        context.commit('setToken', res.data)
                    }
                    resolve(res)
                }
            ).catch(err => {
                reject(err)
            })
        })
    },
    // h5 登录
    loginByH5(context, data) {
        console.log(data,"data")
        return new Promise((resolve, reject) => {
            api.loginByH5({data:data.data}).then(async (res) => {
                    if (res.code == 200) {
                        context.commit('setToken', res.data)
                    }
                    resolve(res)
                }
            ).catch(err => {
                reject(err)
            })
        })
    },


    // 退出登录清空token
    logout(context) {
        return new Promise((resolve, reject) => {
            api.logout().then(async (res) => {
                if (res.code == 200) {
                    context.commit('cleartUserInfo')
                    resolve(res)
                }
            }).catch(err => {
                reject(err)
            })
        })
    }
}

const getters = {
    isLogin: state => {
        return !!state.token
    },
    isHasPwd: state => {
        return !!state.userInfo.hasPwd
    },
}
export default {
    state,
    mutations,
    getters,
    actions
}
