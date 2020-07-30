const db = require('./db.js')
// home = 用户设置的home目录 || 系统默认的home目录
const inquirer = require('inquirer');

module.exports.add = async (tittle) => {
  const list = await db.read()
  list.push({tittle: tittle, done: false})
  await db.write(list)
}

module.exports.clear = async () => {
  await db.write([])
}

function markAsDone(list, index) {
  list[index].done = true
  db.write(list)
}

function markAsUnknown(list, index) {
  list[index].done = false
  db.write(list)
}

function updateTittle(list, index) {
  inquirer.prompt({
    type: 'input',
    name: 'tittle',
    message: "new tittle",
    default: list[index].tittle
  }).then((answers) => {
    list[index].tittle = answers.tittle
    db.write(list)
  });
}

function remove(list, index) {
  list.splice(index, 1)
  db.write(list)
}

function askForAction(list, index) {
  const actions = {
    markAsDone,
    markAsUnknown,
    updateTittle,
    remove
  }
  inquirer
    .prompt([{
      type: 'list',
      name: 'action',
      message: 'Please choose a choice',
      choices: [{name: 'exit', value: 'exit'},
        {name: 'done', value: 'markAsDone'},
        {name: 'undone', value: 'markAsUndone'},
        {name: 'chang tittle', value: 'updateTittle'},
        {name: 'remove', value: 'remove'}
      ]
    }]).then(answer2 => {
    const action = actions[answer2.action]
    action && action(list, index)
  })
}

function createTask(list) {
  inquirer.prompt({
    type: 'input',
    name: 'tittle',
    message: "new tittle",
  }).then((answer) => {
    list.push({tittle: answer.tittle, done: false})
    db.write(list)
  });
}

function printTasks(list) {
  inquirer
    .prompt([
      {
        type: 'list',
        name: 'index',
        message: 'Please choose a task',
        choices: [{name: 'exit', value: '-1'}, ...list.map((task, index) => {
          return {
            name: `${task.done ? '[✓]' : '[_]'} ${index + 1} - ${task.tittle}`,
            value: index.toString()
          }
        }), {name: '+ add a task', value: '-2'}],
      },
    ])
    .then((answer) => {
      const index = parseInt(answer.index)
      if (index >= 0) {
        askForAction(list, index)
      } else if (index === -2) {
        createTask(list)
      }
    });
}

module.exports.showAll = async () => {
  const list = await db.read()
  printTasks(list)
}