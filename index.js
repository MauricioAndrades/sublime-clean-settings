'use strict';
const commander = require('commander');
const strip = require('strip-json-comments');
const path = require('path');
const fs = require('fs');
var through2 = require('through2');
var split = require('split');
const StringDecoder = require('string_decoder').StringDecoder;
const decoder = new StringDecoder('utf8');
var tc = require('through2-concat');
const f = {
  readstream: (path) => {
    fs.createReadStream(path, {
      flags: 'r',
      defaultEncoding: 'utf8',
      fd: null,
      mode: 0o666,
      autoClose: true
    })
  },
  writestream: (path) => {
    fs.createWriteStream(path, {
      flags: 'w',
      defaultEncoding: 'utf8',
      fd: null,
      mode: 0o666,
      autoClose: true
    })
  },
  readSync: (path) => {
    fs.readFileSync(path, {
      defaultEncoding: 'utf8'
    })
  },
  writeSync: (path, data) => {
    fs.writeFileSync(path, data, 'utf8')
  }
};

function cleanConcat(options) {
  if(!options.input) {
    throw new Error('missing input');
  }
  var fileinput = path.resolve(options.input);
  fs.createReadStream(fileinput)
    .pipe(through2({objectMode: true, allowHalfOpen: false},
      function(chunk, enc, cb) {
      // var obj = require('/Volumes/ramdisk/iron-node.js');
      var obj = JSON.parse(strip(chunk.toString()));
      var count = 0;
      var len = 0;
      var isArray = false;
      if (Array.isArray(obj)) {
        isArray = true;
        len = obj.length;
        this.push('[\n')
        for (var i = 0; i < len; i++) {
          count += 1
          this.push('  ');
          this.push(JSON.stringify(obj[i]));
          if (count !== len) {
            this.push(',\n');
          }
        }
        if (isArray) {
          this.push('\n]\n')
        }
      } else {
        if (typeof(obj) === 'object') {
          len = Object.keys(obj).length;
          this.push('{\n');
          for (var key in obj) {
            count += 1;
            this.push('  ');
            this.push(JSON.stringify(key));
            this.push(':');
            this.push(JSON.stringify(obj[key]));
            if (count !== len) {
              this.push(',\n');
            }
          }
          this.push('\n}\n');
        }
      }
      cb();
    })).pipe(process.stdout) /*.pipe(fs.createWriteStream(fileoutput=path.reolve(options)))*/
}

commander
  .version('1.0.0')
  .option('-i --input [value]', 'A filename or filepath to uglify')
  .option('-o --output [value]', 'The location of the output file')
  .parse(process.argv);
cleanConcat(commander);
