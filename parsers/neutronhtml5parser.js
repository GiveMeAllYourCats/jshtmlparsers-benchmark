module.exports = () => {
	const HTMLtoDOM = require('neutron-html5parser')()
	const noop = function () {}
	return {
		name: 'NeutronHtml5Parser',
		cycle: async html => {
			return await HTMLtoDOM.Parser(html, {
				start: noop,
				end: noop,
				chars: noop,
				comment: noop,
				doctype: noop
			})
		}
	}
}
