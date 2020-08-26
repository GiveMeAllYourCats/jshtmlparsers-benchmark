const BenchmarkJS = require('benchmark')
const glob = require('glob')
const async = require('async')
const path = require('path')
const Ora = require('ora')
const fsp = require('fs').promises
const fs = require('fs')
const { Command } = require('commander')
const { Worker, parentPort, workerData } = require('worker_threads')
const program = new Command()
const EventEmitter = require('events')

const main = async () => {
	let workersDone = 0
	let parsers
	let ora = Ora('Starting benchmark').start()

	program
		.option('-p, --parser <parser>', 'test only a specific parser')
		.option('-n, --new <new>', 'creates a new parser file with chosen name')
	program.parse(process.argv)

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
			ora.text = text
			ora.stop()
			console.log(text)
			ora = Ora('Waiting for responses..').start()
		})
		worker.on('error', err => {
			throw err
		})
		worker.on('exit', code => {
			workersDone++
			if (code !== 0) reject(new Error(`Worker stopped with exit code ${code}`))

			if (workersDone >= parsers.length - 1) {
				process.exit()
			}
		})

		return worker
	}

	ora.text = 'Reading parser files'
	parsers = glob.sync('./parsers/*.js')
	ora.text = `Spawning workers`
	parsers.forEach(parserPath => {
		spawnWorker(parserPath)
	})
}

main()
