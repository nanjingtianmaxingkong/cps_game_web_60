import env from '@/env.js'
const url = require(`@/env/${env}.json`);
export default {
	"ENV_NAME": env,
	...url,
}