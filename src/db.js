const fs = require('fs')
const home = process.env.HOME || require('os').homedir()
const p = require('path')
const dbPath = p.join(home, '.todo')
// nodejs 拼接目录 因为不同系统的目录斜杠是不同的

const db = {
  read(path=dbPath) {
    return new Promise((resolve, reject) => {
      fs.readFile(path, {flags: 'a+'}, (error1, data) => {
        if (error1) {
          console.log(error1)
          return reject(error1)
        }
        let list
        try {
          list = JSON.parse(data.toString())
        } catch (error2) {
          list = []
        }
        resolve(list)
      })
    })
  },
  write(list, path = dbPath) {
    return new Promise((resolve, reject) => {
      const string = JSON.stringify(list)
      fs.writeFile(path, string + '\n', (error) => {
        if (error) {
          return reject(error)
        }
        resolve()
      })
    })

  }
}

module.exports = db