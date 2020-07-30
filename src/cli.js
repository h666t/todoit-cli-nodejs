#!/usr/bin/env node
const program = require('commander');
const api = require('./index.js')
const pkg = require('../package.json')
program
  .version(pkg.version)

program
  .command('add')
  .description('add a task')
  .action((...args) => {
    let words = ''
    args[1].map(item => words = words + ' ' + item)
    api.add(words).then(() => {
      console.log('add success')
    }, () => {
      console.log('add failed')
    })
  });

program
  .command('clear')
  .description('clear all tasks')
  .action(() => {
    api.clear().then(() => {
      console.log('clear success')
    }, () => {
      console.log('clear failed')
    })
  })

if (process.argv.length === 2) {
  api.showAll().then(
    () => {
      console.log(`\n ------------------------------------------------`)
    },
    () => {
      console.log('showAll failed')
    })
  return undefined
}

program.parse();

