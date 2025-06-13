import Vue from 'vue'
import createPersistedState from 'vuex-persistedstate' // 引入数据持久化插件
import Vuex from 'vuex'

Vue.use(Vuex)
/**
 * 导入modules
 */
const modulesFiles = require.context('./modules', true, /\.js$/)
const modules = modulesFiles.keys().reduce((modules, modulePath) => {
	// set './app.js' => 'app'
	const moduleName = modulePath.replace(/^\.\/(.*)\.\w+$/, '$1')
	const value = modulesFiles(modulePath)
	modules[moduleName] = value.default
	return modules
}, {})
const store = new Vuex.Store({
	modules,
	// plugins 插件配置
	plugins: [
		createPersistedState({
			paths: ['user'],
			storage: { // 存储方式定义  
				getItem: (key) => uni.getStorageSync(key), // 获取  
				setItem: (key, value) => uni.setStorageSync(key, value), // 存储  
				removeItem: (key) => uni.removeStorageSync(key) // 删除  
			},
		})
	]
})
export default store