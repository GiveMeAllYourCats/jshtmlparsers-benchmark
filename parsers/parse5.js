module.exports = () => {
	const parser = require('parse5')
	return {
		name: 'Parse5',
		cycle: async html => {
			return await parser.parse(html)
		}
	}
}
