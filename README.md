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

## How to start this project in locally or in server.
```
1. First mention your CORS policy inside your node server.js
2. Make sure to install GHOSTSCRIPT tool inside your os/server.
3. Install all the necessary node packages inside node/express and react app.
4. For running react app try: npm install && npm run dev.
5. For running express app try: npm install && node server.js/nodemon server.js
```