module.exports = () => {
	const Html5 = require('html5').SAXParser
	const parser = new Html5()
	const noop = function () {}
	parser.contentHandler = {
		startDocument: noop,
		endDocument: noop,
		startElement: noop,
		endElement: noop,
		characters: noop
	}
	return {
		name: 'Html5',
		cycle: async html => {
			return await parser.parse(html)
		}
	}
}
