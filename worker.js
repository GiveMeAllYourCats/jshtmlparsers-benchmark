const { Worker, parentPort, workerData } = require('worker_threads')
const BenchmarkJS = require('benchmark')
const path = require('path')

const main = async () => {
	const parser = require(workerData.parserPath)()
	const name = path.basename(workerData.parserPath, '.js')
	const suite = new BenchmarkJS.Suite({
		defer: true
	})

	suite.on('cycle', event => {
		parentPort.postMessage({
			name,
			hz: event.target.hz,
			times: event.target.times,
			stats: event.target.stats
		})
		process.exit()
	})

	suite.add(name, {
		defer: true,
		fn: async deferred => {
			for (let html of workerData.htmlFiles) {
				await parser.cycle(html)
			}
			deferred.resolve()
		}
	})
	suite.run()
}

main()
