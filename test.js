const axios = require('axios')
const { performance, PerformanceObserver } = require('perf_hooks')
const { Parser } = require('htmlparser2')

const obs = new PerformanceObserver((list, observer) => {
	console.log(list.getEntries()[0])
	performance.clearMarks()
	observer.disconnect()
})
obs.observe({ entryTypes: ['measure'], buffered: true })

const main = async () => {
	const html = await axios.get('https://www.google.com')

	const rawHtml = "Xyz <script language= javascript>var foo = '<<bar>>';< /  script><!--<!-- Waah! -- -->"
	const handler = new DomHandler(function (error, dom) {
		if (error) {
			// Handle error
		} else {
			// Parsing completed, do something
			console.log(dom)
		}
	})
	const parser = new Parser(handler)
	parser.write(rawHtml)
	parser.end()
	process.exit()
	performance.mark('response')
	for (var i = 0; i < 130; i++) {
		console.log(await htmlparser2.end(html))
	}
	performance.measure('response')
	// const parser = new DOMParser()

	// const start = performance.now()
	// for (let count = 130; count-- > 0; ) {
	// 	parser.parseFromString(html, 'text/html')
	// }
	// const stop = performance.now()

	// console.log(`Parsing ${url} 130 times took deno_dom: ${stop - start}ms`)
}

main()
