module.exports = () => {
	const parser = require('fast-html-parser')
	return {
		name: 'FastHtmlParser',
		cycle: async html => {
			return await parser.parse(html)
		}
	}
}
