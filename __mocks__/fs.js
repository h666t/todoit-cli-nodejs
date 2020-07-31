const fs = jest.genMockFromModule('fs');

const _fs = jest.requireActual('fs')

Object.assign(fs, _fs)

let readMocks = {}

fs.setReadFileMock = (p, error, data) => {
  readMocks[p] = [error, data]
}

fs.readFile = (p, options, callback) => {
  if (callback === undefined) {
    callback = options
  }
  console.log(p)
    callback(...readMocks[p])

}

let writeMocks = {}

fs.setWriteFileMock = (path, fn) => {
  writeMocks[path] = fn
}

fs.writeFile = (path, data, options, callback) => {
  if (path in writeMocks) {
    writeMocks[path](path, data, options, callback)
  }else {
    _fs.writeFile(path, data, options, callback)
  }
}

fs.clearMocks=()=>{
  readMocks = {}
  writeMocks = {}
}

module.exports = fs