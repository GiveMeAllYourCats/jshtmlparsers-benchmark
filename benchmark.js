const BenchmarkJS = require('benchmark')
const glob = require('glob')
const async = require('async')
const path = require('path')
const ora = require('ora')
const fsp = require('fs').promises
const fs = require('fs')
const { Command } = require('commander')
const program = new Command()

class Benchmark {
	constructor() {
		program
			.option('-p, --parser <parser>', 'test only a specific parser')
			.option('-n, --new <new>', 'creates a new parser file with chosen name')

		program.parse(process.argv)

		this.opts = program.opts()
		return new Promise(this.start.bind(this))
	}
	async start() {
		if (this.opts.new) {
			if (fs.existsSync(`./parsers/${this.opts.new.toLowerCase()}.js`)) {
				throw new Error(`./parsers/${this.opts.new.toLowerCase()}.js Already exists!`)
			}
			await fsp.writeFile(
				`./parsers/${this.opts.new.toLowerCase()}.js`,
				`module.exports = () => {
	const parser = require('parser')
	return {
		name: '${this.opts.new}',
		cycle: async html => {
			return await parser.parse(html)
		}
	}
}
`
			)
			process.exit()
		}
		await this.getParsers()
		await this.initBenchmark()
		await this.runBenchmark()
	}

	async initBenchmark() {
		this.suite = new BenchmarkJS.Suite({
			defer: true
		})

		const htmlFiles = await async.map(glob.sync('./html/*.html'), async file => {
			return await fsp.readFile(file, 'utf-8')
		})
		const that = this // yup. javascript
		if (!this.opts.parser)
			console.log(`${Object.keys(this.parsers).length} parsers will try to execute as much cycles as possible`)
		if (this.opts.parser) console.log(`${this.opts.parser} will try to execute as much cycles as possible`)
		console.log(`Each cycle consists of reading ${htmlFiles.length} html files`)
		this.spinner = ora('Running benchmark').start()
		let found = false
		for (let parse in this.parsers) {
			const parser = this.parsers[parse]
			if (this.opts.parser) {
				if (parser.name.toLowerCase() !== this.opts.parser.toLowerCase()) {
					continue
				}
			}
			found = true
			this.suite.add(parser.name, {
				defer: true,
				fn: async deferred => {
					this.spinner.text = `Testing ${parser.name}`
					let i = 0
					for (let html of htmlFiles) {
						await parser.cycle(html)
						i++
					}
					deferred.resolve()
				}
			})
		}
		if (!found) {
			console.log('Did not found', this.opts.parser, 'between our parsers', this.parsers)
			process.exit()
		}

		/*

  target: Benchmark {
    name: 'Cheerio',
    options: {
      async: false,
      defer: true,
      delay: 0.005,
      id: undefined,
      initCount: 1,
      maxTime: 5,
      minSamples: 5,
      minTime: 0.05,
      name: undefined,
      onAbort: undefined,
      onComplete: undefined,
      onCycle: undefined,
      onError: undefined,
      onReset: undefined,
      onStart: undefined,
      fn: [AsyncFunction: fn]
    },
    async: false,
    defer: true,
    delay: 0.005,
    initCount: 1,
    maxTime: 5,
    minSamples: 5,
    minTime: 0.05,
    fn: [AsyncFunction: fn],
    id: 1,
    stats: {
      moe: 0.1909143738835402,
      rme: 5.515492802119838,
      sem: 0.07425685487496701,
      deviation: 0.1818914043475707,
      mean: 3.4614200531666675,
      sample: [Array],
      variance: 0.03308448297553146
    },
    times: {
      cycle: 3.4614200531666675,
      elapsed: 20.889,
      period: 3.4614200531666675,
      timeStamp: 1598460994583
    },
    _timerId: Timeout {
      _idleTimeout: 5,
      _idlePrev: null,
      _idleNext: null,
      _idleStart: 504,
      _onTimeout: [Function (anonymous)],
      _timerArgs: undefined,
      _repeat: null,
      _destroyed: true,
      [Symbol(refed)]: true,
      [Symbol(asyncId)]: 2949,
      [Symbol(triggerId)]: 0
    },
    events: { complete: [] },
    running: false,
    count: 1,
    compiled: [Function: anonymous],
    cycles: 1,
    hz: 0.28889877120956575
  }

		*/

		this.suite.on('cycle', event => {
			this.spinner.stop()
			const text = `${event.target.name.padEnd(20, ' ')} x ${parseFloat(event.target.hz)
				.toFixed(2)
				.padEnd(7, ' ')} ops/sec       ${parseFloat(parseFloat(event.target.hz).toFixed(2) * 258)
				.toFixed(2)
				.padEnd(8, ' ')} files/sec       ±${parseFloat(event.target.stats.rme).toFixed(2)}%`
			console.log(text)
			this.spinner = ora('Loading..').start()
		})

		this.suite.on('complete', function () {
			that.spinner.stop()
			if (!that.opts.parser) {
				console.log('\nFastest is ' + this.filter('fastest').map('name'))
			}
		})
	}

	async runBenchmark() {
		await this.suite.run({ async: true })
	}

	async getParsers() {
		this.parsers = {}
		const files = glob.sync('./parsers/*.js')
		for (let file of files) {
			this.parsers[path.basename(file, '.js')] = require(file)()
		}
	}
}

new Benchmark()
