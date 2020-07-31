const fs = jest.genMockFromModule('fs');

const _fs = jest.requireActual('fs')

Object.assign(fs, _fs)

const mocks = {}

fs.setMock = (pathx, error, data) => {
  mocks[pathx] = [error, data]
}

fs.readFile = (pathx, options, callback) => {
  if (callback === undefined) {
    callback = options
  }
    if (pathx in mocks){
      callback(...mocks[pathx])
    }else {
      console.log(mocks)
      console.log('111')
      console.log(pathx)
    }
}

module.exports = fs