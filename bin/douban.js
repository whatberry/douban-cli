#!/usr/bin/env node

const colors = require('colors')
const yargs = require('yargs')


yargs
  .command(require('./bookCmd'))
  .command(require('./movieCmd'))

  .usage('Usage: $0 <command> [options]')
  .alias('h', 'help')
  .argv