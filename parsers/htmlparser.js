module.exports = () => {
	const htmlparser = require('htmlparser')
	const parser = new htmlparser.Parser(new htmlparser.DefaultHandler())
	return {
		name: 'htmlparser',
		cycle: async html => {
			return await parser.parseComplete(html)
		}
	}
}
