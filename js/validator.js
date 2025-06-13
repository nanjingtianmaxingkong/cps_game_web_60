// 数量
const REG_NUMBER = /^[0-9]*$/
// 价格
const REG_PRICE = /^(([1-9]{1}\d*)|([0]{1}))(\.(\d){1,2})?$/

export function checkNumber(rule, value, data, callback, validate) {
	if (value && REG_PRICE.test(value)) {
		if (validate && (value < 0.1 || value > 9999999)) {
			callback('请输入正确的数量[0.1 - 9,999,999]')
			return false
		}
		return true;
	} else {
		callback('请输入正确的数量')
		return false;
	}
}

export function checkPrice(rule, value, data, callback, validate) {
	if (value && REG_PRICE.test(value)) {
		if (validate && (value < 0.01 || value > 99999999)) {
			callback('请输入正确的价格[0.01 - 99,999,999]')
			return false
		}
		return true;
	} else {
		callback('请输入正确的价格')
		return false;
	}
}