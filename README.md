# jshtmlparsers-benchmark

[![Licensing](https://img.shields.io/github/license/givemeallyourcats/jshtmlparsers-benchmark.svg)](https://raw.githubusercontent.com/givemeallyourcats/jshtmlparsers-benchmark/master/LICENSE)
[![Repo size](https://img.shields.io/github/repo-size/givemeallyourcats/jshtmlparsers-benchmark.svg)](https://github.com/givemeallyourcats/jshtmlparsers-benchmark)
[![Help us and star this project](https://img.shields.io/github/stars/givemeallyourcats/jshtmlparsers-benchmark.svg?style=social)](https://github.com/givemeallyourcats/jshtmlparsers-benchmark)

#### Usage:

`git clone git@github.com:GiveMeAllYourCats/jshtmlparsers-benchmark.git && cd jshtmlparsers-benchmark && npm i && node benchmark`

#### What is a operation?

A operation (or cycle) consists of 258 html files being read one by one, they can be small, they can be big, have large CSS or large SCRIPT tags. These are real life html files derived from the repository of [htmlparser-benchmark](https://github.com/AndreasMadsen/htmlparser-benchmark) have a look at [these files that are tested per cycle](https://github.com/GiveMeAllYourCats/jshtmlparsers-benchmark/tree/master/html)

#### How are results generated?

Each parser is spawned in a web worker and then it tries to create as much cycles as possible. The end results is the variable `x amount of html files parses per/sec`

#### Results:

```
└─$ node benchmark.js                                                                                                            1 ⨯
    _     _     _             _                                    
   (_)   | |   | |           | |                                   
    _ ___| |__ | |_ _ __ ___ | |_ __   __ _ _ __ ___  ___ _ __ ___ 
   | / __| '_ \| __| '_ ` _ \| | '_ \ / _` | '__/ __|/ _ | '__/ __|
   | \__ | | | | |_| | | | | | | |_) | (_| | |  \__ |  __| |  \__ \
   | |___|_| |_|\__|_| |_| |_|_| .__/ \__,_|_|  |___/\___|_|  |___/
  _/ |                         | |                                 
 |__/                          |_|                                 


12:10:53 LOG   One cycle is parsing 258 html files one by one. (main @ benchmark.js:51)
12:10:53 LOG   Will process 13 parsers, spawning a equally amount of workers (main @ benchmark.js:95)
12:10:53 LOG   Each parser will try to create as much cycles possible (main @ benchmark.js:96)
               
12:11:01 LOG   fasthtmlparser       x 1.47 cycles per sec   379.26 parses per sec (<anonymous> @ benchmark.js:67)
12:11:05 LOG   nodehtmlparser       x 0.87 cycles per sec   224.46 parses per sec (<anonymous> @ benchmark.js:67)
12:11:09 LOG   htmlparser2          x 0.56 cycles per sec   144.48 parses per sec (<anonymous> @ benchmark.js:67)
12:11:09 LOG   html5parser          x 0.45 cycles per sec   116.10 parses per sec (<anonymous> @ benchmark.js:67)
12:11:12 LOG   htmlparser2dom       x 0.40 cycles per sec   103.20 parses per sec (<anonymous> @ benchmark.js:67)
12:11:12 LOG   htmlparsestringify   x 0.39 cycles per sec   100.62 parses per sec (<anonymous> @ benchmark.js:67)
12:11:14 LOG   neutronhtml5parser   x 0.36 cycles per sec   92.88  parses per sec (<anonymous> @ benchmark.js:67)
12:11:28 LOG   parse5               x 0.18 cycles per sec   46.44  parses per sec (<anonymous> @ benchmark.js:67)
12:11:29 LOG   libxmljs             x 0.18 cycles per sec   46.44  parses per sec (<anonymous> @ benchmark.js:67)
12:11:30 LOG   cheerio              x 0.17 cycles per sec   43.86  parses per sec (<anonymous> @ benchmark.js:67)
12:11:33 LOG   sax                  x 0.16 cycles per sec   41.28  parses per sec (<anonymous> @ benchmark.js:67)
12:11:37 LOG   htmlparser           x 0.12 cycles per sec   30.96  parses per sec (<anonymous> @ benchmark.js:67)

Received SIGINT. 

ByeBye.
```
