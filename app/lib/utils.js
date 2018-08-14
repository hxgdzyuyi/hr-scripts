#!/usr/bin/env node
// jshint esversion:6, laxbreak:true

import fs from 'fs-extra'
import path from 'path'
import colors from 'colors'
import { head, map, keys, values } from 'lodash'
import xlsx from 'node-xlsx'

module.exports = {

  fileExists: function(filePath) {

    try {
      return fs.statSync(filePath).isFile();
    } catch (error) {
      return false;
    }

  },

  dirExists: function(dirPath) {

    try {
      return fs.statSync(dirPath).isDirectory();
    } catch (error) {
      return false;
    }

  },

  title: function(string) {

    this.o('log');
    this.o('log', ` ${string.toUpperCase()} `.bold.bgBlack.white);
    this.o('log');

  },

  exitGraceful: function(exitCode = 0) {

    process.exitCode = exitCode;

  },

  done: function({
    text = 'Done!',
    before = true,
    after = false,
  } = {}) {

    if (before) this.o('log');

    this.o('log', text);

    if (after) this.o('log');

  },

  o: function(type, ... messages) {

    console[type].apply(this, messages);

  },

  output: function(items, output, filename) {

    if (output === 'json') {

      const SPACE = 2
      const REPLACER = null

      fs.writeFileSync(
        path.join( process.cwd(), `./${filename}.json`),
        JSON.stringify(items, REPLACER, SPACE),
        'utf8'
      )

      this.o('log', 'JSON file is saved.')

    } else if (output === 'xlsx') {

      const lines = map(items, (item) => {
        return values(item)
      })

      if (lines.length) {
        lines.unshift(keys(head(items)))
      }

      fs.writeFileSync(
        path.join( process.cwd(), `./${filename}.xlsx`),
        xlsx.build([{ name: filename, data: lines }]),
        'utf8'
      )

      //console.log(lines)

    } else {
      this.o('log', items)
    }
  }
};
