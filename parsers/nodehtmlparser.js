module.exports = () => {
	const parse = require('node-html-parser').parse
	return {
		name: 'NodeHtmlParser',
		cycle: async html => {
			return await parse(html)
		}
	}
}
