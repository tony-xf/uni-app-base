const VERSION = '0.0.1'
const isProd = process.env.NODE_ENV === 'production'
const isDebug = process.env.NODE_ENV !== 'production'
export default{
	VERSION,
	isProd,
	isDebug
}