module.exports = () => {
	const htmlparser2 = new (require('htmlparser2').Parser)()
	return {
		name: 'HtmlParser2',
		cycle: async html => {
			return await htmlparser2.end(html)
		}
	}
}
