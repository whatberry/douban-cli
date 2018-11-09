#!/usr/bin/env node

import {
  command
} from 'yargs';

command(require('./bookCmd'))
  .command(require('./movieCmd'))

  .usage('Usage: $0 <command> [options]')
  .alias('h', 'help')
  .argv