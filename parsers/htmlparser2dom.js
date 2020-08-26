module.exports = () => {
	const htmlparser2 = require('htmlparser2')
	return {
		name: 'HtmlParser2Dom',
		cycle: async html => {
			const parser = new htmlparser2.Parser(new htmlparser2.DomHandler())
			return await parser.parseComplete(html)
		}
	}
}
