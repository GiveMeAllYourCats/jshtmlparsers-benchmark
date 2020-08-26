# jshtmlparsers-benchmark

[![Licensing](https://img.shields.io/github/license/givemeallyourcats/jshtmlparsers-benchmark.svg)](https://raw.githubusercontent.com/givemeallyourcats/jshtmlparsers-benchmark/master/LICENSE)
[![Repo size](https://img.shields.io/github/repo-size/givemeallyourcats/jshtmlparsers-benchmark.svg)](https://github.com/givemeallyourcats/jshtmlparsers-benchmark)
[![Node version](https://img.shields.io/node/v/jshtmlparsers-benchmark.svg)](https://www.npmjs.com/package/jshtmlparsers-benchmark)
[![Help us and star this project](https://img.shields.io/github/stars/givemeallyourcats/jshtmlparsers-benchmark.svg?style=social)](https://github.com/givemeallyourcats/jshtmlparsers-benchmark)

#### Usage:

`git clone git@github.com:GiveMeAllYourCats/jshtmlparsers-benchmark.git && cd jshtmlparsers-benchmark && npm i && node benchmark`

#### What is a operation?

A operation (or cycle) consists of 258 html files being read one by one, they can be small, they can be big, have large CSS or large SCRIPT tags. These are real life html files derived from the repository of [htmlparser-benchmark](https://github.com/AndreasMadsen/htmlparser-benchmark) have a look at [these files that are tested per cycle](https://github.com/GiveMeAllYourCats/jshtmlparsers-benchmark/tree/master/html)

#### How are results generated?

Each parser is spawned in a web worker and then it tries to create as much cycles as possible. The end results is the variable `x amount of html files parses per/sec`

#### Results:

```
    _     _     _             _
   (_)   | |   | |           | |
    _ ___| |__ | |_ _ __ ___ | |_ __   __ _ _ __ ___  ___ _ __ ___
   | / __| '_ \| __| '_ ` _ \| | '_ \ / _` | '__/ __|/ _ | '__/ __|
   | \__ | | | | |_| | | | | | | |_) | (_| | |  \__ |  __| |  \__ \
   | |___|_| |_|\__|_| |_| |_|_| .__/ \__,_|_|  |___/\___|_|  |___/
  _/ |                         | |
 |__/                          |_|


One cycle is parsing 258 html files one by one.
Found 13 parsers, spawning equally amount of workers
Each parser will try to create as much cycles possible

fasthtmlparser       x 1.53 cycles per sec   394.74 parses per sec
nodehtmlparser       x 0.81 cycles per sec   208.98 parses per sec
htmlparser2          x 0.51 cycles per sec   131.58 parses per sec
html5parser          x 0.41 cycles per sec   105.78 parses per sec
htmlparser2dom       x 0.41 cycles per sec   105.78 parses per sec
htmlparsestringify   x 0.38 cycles per sec   98.04  parses per sec
neutronhtml5parser   x 0.36 cycles per sec   92.88  parses per sec
libxmljs             x 0.15 cycles per sec   38.70  parses per sec
parse5               x 0.17 cycles per sec   43.86  parses per sec
cheerio              x 0.16 cycles per sec   41.28  parses per sec
sax                  x 0.15 cycles per sec   38.70  parses per sec
htmlparser           x 0.12 cycles per sec   30.96  parses per sec

```
