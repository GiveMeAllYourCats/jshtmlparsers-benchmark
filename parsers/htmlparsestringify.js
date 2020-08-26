module.exports = () => {
	const parser = require('html-parse-stringify')
	return {
		name: 'HtmlParseStringify',
		cycle: async html => {
			return await parser.parse(html)
		}
	}
}
