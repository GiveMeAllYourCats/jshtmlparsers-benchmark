# jshtmlparsers-benchmark

#### Usage:

`node benchmark` to test all parsers

or 

`node benchmark -p <parsername>` to test one parser


#### Results:

```
13 parsers will try to execute as much cycles as possible
Each cycle consists of reading 258 html files
Cheerio              x 0.29    ops/sec       74.82    files/sec       ±5.54%
FastHtmlParser       x 4.50    ops/sec       1161.00  files/sec       ±0.96%
Html5                x 0.03    ops/sec       7.74     files/sec       ±1.50%
Html5Parser          x 1.68    ops/sec       433.44   files/sec       ±3.92%
htmlparser           x 0.19    ops/sec       49.02    files/sec       ±2.91%
HtmlParser2          x 1.77    ops/sec       456.66   files/sec       ±5.00%
HtmlParser2Dom       x 1.38    ops/sec       356.04   files/sec       ±3.09%
HtmlParseStringify   x 1.26    ops/sec       325.08   files/sec       ±1.91%
LibXMLJs             x 0.75    ops/sec       193.50   files/sec       ±3.28%
NeutronHtml5Parser   x 1.08    ops/sec       278.64   files/sec       ±1.17%
NodeHtmlParser       x 3.34    ops/sec       861.72   files/sec       ±1.41%
Parse5               x 0.39    ops/sec       100.62   files/sec       ±6.61%
Sax                  x 0.32    ops/sec       82.56    files/sec       ±12.18%

Fastest is FastHtmlParser
```
