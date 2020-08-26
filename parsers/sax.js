module.exports = () => {
	const sax = require('sax')
	const parser = sax.parser()

	return {
		name: 'Sax',
		cycle: async html => {
			return await parser.write(html).close()
		}
	}
}
