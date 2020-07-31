const db = require('../src/db.js')
const fs = require('fs')
jest.mock('fs')

describe('db',  () => {
  afterEach(()=>{
    fs.clearMocks()
  })
  it('can read', async (done) => {
    let data = [{tittle: "hi", done: true}]
    fs.setReadFileMock('/fuck', null, JSON.stringify(data))
    const list = await db.read('/fuck')
    expect(list).toStrictEqual(data)
    done()
  });
  it('can write', async (done) => {
    let fakeFile
    fs.setWriteFileMock('/yyy', (path, data,callback) => {
      fakeFile = data
      callback(null)
    })
    const list = [{tittle: 'bye', done: true}]
    await db.write(list, '/yyy')
    expect(fakeFile).toBe(JSON.stringify(list) + '\n')
    done()
  });
})