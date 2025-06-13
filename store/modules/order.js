
let gameDet = ""
const state = {
	gameDet: gameDet,
}
const mutations = {
	setGameDet(state, payload) {
		console.log("payload",payload)
		state.gameDet = payload
	}
}
const getters = {

}
export default {
	state,
	mutations,
	getters,
}
