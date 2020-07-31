const fs = jest.genMockFromModule('fs');

const _fs = jest.requireActual('fs')

Object.assign(fs, _fs)

let readMocks = {}

fs.setReadFileMock = (pathx, error, data) => {
  readMocks[pathx] = [error, data]
}

fs.readFile = (pathx, options, callback) => {
  if (callback === undefined) {
    callback = options
  }
  if (pathx in readMocks) {
    callback(...readMocks[pathx])
  } else {
    console.log(readMocks)
    console.log('111')
    console.log(pathx)
  }
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