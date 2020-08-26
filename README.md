# jshtmlparsers-benchmark

#### Usage:

`git clone git@github.com:GiveMeAllYourCats/jshtmlparsers-benchmark.git && cd jshtmlparsers-benchmark && npm i && node benchmark`

#### What is a operation?
A operation (or cycle) consists of 258 html files being read one by one, they can be small, they can be big, have large CSS or large SCRIPT tags. These are real life html files derived from the repository of [htmlparser-benchmark](https://github.com/AndreasMadsen/htmlparser-benchmark)

#### Results:

```
fasthtmlparser       x 1.39    ops/sec       358.62   .html/sec
nodehtmlparser       x 0.83    ops/sec       214.14   .html/sec
htmlparser2          x 0.55    ops/sec       141.90   .html/sec
html5parser          x 0.43    ops/sec       110.94   .html/sec
htmlparser2dom       x 0.35    ops/sec       90.30    .html/sec
htmlparsestringify   x 0.35    ops/sec       90.30    .html/sec
neutronhtml5parser   x 0.33    ops/sec       85.14    .html/sec
libxmljs             x 0.14    ops/sec       36.12    .html/sec
parse5               x 0.14    ops/sec       36.12    .html/sec
cheerio              x 0.15    ops/sec       38.70    .html/sec
sax                  x 0.15    ops/sec       38.70    .html/sec
htmlparser           x 0.11    ops/sec       28.38    .html/sec
```
