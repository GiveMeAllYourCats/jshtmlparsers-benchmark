module.exports = () => {
	const parser = require('libxmljs')
	return {
		name: 'LibXMLJs',
		cycle: async html => {
			return await new parser.parseHtmlString(html)
		}
	}
}
