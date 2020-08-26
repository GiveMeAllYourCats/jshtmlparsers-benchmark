# jshtmlparsers-benchmark

#### Usage:

`git clone git@github.com:GiveMeAllYourCats/jshtmlparsers-benchmark.git && cd jshtmlparsers-benchmark && npm i && node benchmark`

#### What is a operation?

A operation (or cycle) consists of 258 html files being read one by one, they can be small, they can be big, have large CSS or large SCRIPT tags. These are real life html files derived from the repository of [htmlparser-benchmark](https://github.com/AndreasMadsen/htmlparser-benchmark) have a look at [these files that are tested per cycle](https://github.com/GiveMeAllYourCats/jshtmlparsers-benchmark/tree/master/html)

#### How are results generated?

Each parsers are spawned in a web worker and then it tries to create as much cycles as possible. The end results is the variable `x amount of html files parses per/sec`

#### Results:

```
fasthtmlparser       x 327.66   html file parses/sec
nodehtmlparser       x 242.52   html file parses/sec
htmlparser2          x 144.48   html file parses/sec
html5parser          x 113.52   html file parses/sec
htmlparser2dom       x 108.36   html file parses/sec
htmlparsestringify   x 103.20   html file parses/sec
neutronhtml5parser   x 100.62   html file parses/sec
libxmljs             x 59.34    html file parses/sec
parse5               x 46.44    html file parses/sec
cheerio              x 43.86    html file parses/sec
sax                  x 41.28    html file parses/sec
htmlparser           x 30.96    html file parses/sec
html5                x 7.74     html file parses/sec
```
