const db = require('../src/db.js')
const fs = require('fs')
jest.mock('fs')

describe('db',  () => {
  it('can read',  async ()=> {
    const data = [{tittle: "hi", done: true}]
    fs.setMock('/fuck', null, JSON.stringify(data))
    const list = await db.read('/fuck')
    expect(list).toStrictEqual(data)
  });
})