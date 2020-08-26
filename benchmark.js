const BenchmarkJS = require('benchmark')
const glob = require('glob')
const async = require('async')
const path = require('path')
const Ora = require('ora')
const fsp = require('fs').promises
const fs = require('fs')
const { Worker, parentPort, workerData } = require('worker_threads')
const EventEmitter = require('events')

const main = async () => {
	let workersDone = 0
	let parsers
	let ora = Ora('Starting benchmark').start()

	ora.text = 'Loading html files'
	const htmlFiles = await async.map(glob.sync('./html/*.html'), async file => {
		return await fsp.readFile(file, 'utf-8')
	})

	const spawnWorker = parserPath => {
		const worker = new Worker('./worker.js', {
			workerData: {
				parserPath,
				htmlFiles
			}
		})
		worker.on('message', event => {
			const text = `${event.name.padEnd(20, ' ')} x ${parseFloat(event.hz)
				.toFixed(2)
				.padEnd(7, ' ')} ops/sec       ${parseFloat(parseFloat(event.hz).toFixed(2) * 258)
				.toFixed(2)
				.padEnd(8, ' ')} .html/sec`
			ora.stop()
			console.log(text)
			ora = Ora(`Waiting for ${parsers.length - workersDone - 1} more workers to finish responding...`).start()
			if (parsers.length - workersDone - 1 === 0) {
				process.exit()
			}
		})
		worker.on('error', err => {
			throw err
		})
		worker.on('exit', code => {
			workersDone++
			if (code !== 0) reject(new Error(`Worker stopped with exit code ${code}`))
		})

		return worker
	}

	ora.text = 'Reading parser files'
	parsers = glob.sync('./parsers/*.js')
	ora.text = `Spawning ${parsers.length} workers`
	parsers.forEach(parserPath => {
		spawnWorker(parserPath)
	})
	ora.text = `Awaiting response from first worker of ${parsers.length} worker that spawned...`
}

main()
