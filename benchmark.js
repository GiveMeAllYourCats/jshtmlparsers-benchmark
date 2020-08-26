const BenchmarkJS = require('benchmark')
const glob = require('glob')
const async = require('async')
const path = require('path')
const figlet = require('figlet')
const Ora = require('ora')
const fsp = require('fs').promises
const fs = require('fs')
const { Worker, parentPort, workerData } = require('worker_threads')
const EventEmitter = require('events')

const main = async () => {
	let workersDone = 0
	let parsers
	await new Promise((resolve, reject) => {
		figlet.text(
			'jshtmlparsers',
			{
				font: 'Big',
				horizontalLayout: 'universal smushing',
				verticalLayout: 'universal smushing',
				width: 130,
				whitespaceBreak: true
			},
			function (err, data) {
				if (err) {
					return reject(new Error(err))
				}
				console.log(data + '\n\n')
				resolve()
			}
		)
	})
	let ora = Ora('Starting benchmark').start()

	ora.text = 'Loading html files'
	const htmlFiles = await async.map(glob.sync('./html/*.html'), async file => {
		return await fsp.readFile(file, 'utf-8')
	})
	ora.stop()
	console.log(`One cycle is parsing ${htmlFiles.length} html files one by one.`)

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
				.padEnd(3, ' ')} cycles per sec   ${parseFloat(parseFloat(event.hz).toFixed(2) * htmlFiles.length)
				.toFixed(2)
				.padEnd(6, ' ')} parses per sec`
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

	ora = Ora('Reading parser files').start()
	parsers = glob.sync('./parsers/*.js')
	ora.stop()
	console.log(`Found ${parsers.length} parsers, spawning equally amount of workers`)
	console.log(`Each parser will try to create as much cycles possible`)
	ora.start()
	ora.text = `Spawning ${parsers.length} workers`
	parsers.forEach(parserPath => {
		spawnWorker(parserPath)
	})
	ora.text = `Awaiting response from first worker of ${parsers.length} workers that spawned...`
}

main()
