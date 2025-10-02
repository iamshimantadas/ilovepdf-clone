# ilovepdf project clone
```
This project based on the webisite ilovepdf.com. This project aims works of:
1. pdf merge
2. split pdf pages
3. pdf compress
```

## Packages use for pdf works.

### pdf-merger-js: https://www.npmjs.com/package/pdf-merger-js/v/5.0.0
```
This package helps to merge multiple pdfs at one time into single pdf.
```
### pdf split: https://www.npmjs.com/package/pdf-lib
```
This will help to split every individual pages into single pdfs.
```

## Compress Pdf: Ghostscript CLI tool & [compress-pdf npm](https://www.npmjs.com/package/compress-pdf)
Installation
```
# OSX
brew install ghostscript

# Debian/ubuntu
apt-get update
apt-get install ghostscript

# windows 11/10 or any.
https://www.ghostscript.com/releases/gsdnld.html
```
Note: when ghostscript will installed in your system, then you can run this simple command in cmd/terminal: 'gswin64c'

## Naming Rules
```
This naming rule followed accross over this application. for backend(node/express app): Note: N => number

1. Merge Pdf: merge-N-new.pdf
2. Split Pdf: pdf_N.pdf
```