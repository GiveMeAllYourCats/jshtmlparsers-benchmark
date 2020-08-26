module.exports = () => {
	const parser = require('html5parser')
	return {
		name: 'Html5Parser',
		cycle: async html => {
			return await parser.parse(html)
		}
	}
}
