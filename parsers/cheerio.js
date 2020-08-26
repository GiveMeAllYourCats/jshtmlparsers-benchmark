module.exports = () => {
	const cheerio = require('cheerio')
	return {
		name: 'Cheerio',
		cycle: async html => {
			return await cheerio.load(html)
		}
	}
}
