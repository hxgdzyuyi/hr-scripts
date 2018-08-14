#!/usr/bin/env node

require('babel-register')({
  presets: ["env"],
  ignore: /node_modules\/(?!hr-scripts)/
})

require("babel-polyfill")

require('./index')
