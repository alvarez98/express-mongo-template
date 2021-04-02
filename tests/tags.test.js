const request = require('supertest')
const app = require('../src/app')
const removeAll = require('../src/db/controllers/delete')
const dbConnection = require('../src/db/config')
const models = require('../src/db/keys')

let tagId = ''

beforeAll(async () => {
  await dbConnection().catch(err => console.log(err))
})

describe('POST /tags', () => {
  test('It should create a new Tag', async (done) => {
    await removeAll(models.TAG)
    const response = await request(app)
      .post('/api/tags')
      .send({
        name: 'Social'
      })
    expect(response.statusCode).toBe(201)
    tagId = response.body.id
    done()
  })
  test("You shouldn't create a new tag for invalid body", async (done) => {
    const response = await request(app)
      .post('/api/tags')
      .send({
        other: 'Value'
      })
    expect(response.statusCode).toBe(400)
    done()
  })
})

describe('GET /tags', () => {
  test('It should get Tags', async (done) => {
    const response = await request(app)
      .get('/api/tags?offset=0&limit=20')
    expect(response.statusCode).toBe(200)
    done()
  })
  test("It shouldn't get Tags for invalid offset", async (done) => {
    const response = await request(app)
      .get('/api/tags?offset=')
    expect(response.statusCode).toBe(400)
    done()
  })
  test("It shouldn't get Tags for invalid query", async (done) => {
    const response = await request(app)
      .get('/api/tags?offset=0&limit=20&rol=admin')
    expect(response.statusCode).toBe(400)
    done()
  })
})

describe('GET /tags/:id', () => {
  test('You must return a tag when the tag_id is sent to you', async (done) => {
    const response = await request(app)
      .get(`/api/tags/${tagId}`)
      //   .set('Authorization', `Token ${TOKEN}`)
    expect(response.statusCode).toBe(200)
    done()
  })
  test("It should return a message 'the tag does not exist' because the tag_id is wrong", async (done) => {
    const response = await request(app)
      .get('/api/tags/995f46e9-f2cc-4c8e-9e1e-db5aec60c073')
      //   .set('Authorization', `Token ${TOKEN}`)
    expect(response.statusCode).toBe(400)
    done()
  })
})

describe('PUT /tags/:id', () => {
  test('You must update a tag', async (done) => {
    const response = await request(app)
      .put(`/api/tags/${tagId}`)
      .send({
        name: 'Nuevo nombre'
      })
      //   .set('Authorization', `Token ${TOKEN}`)
    expect(response.statusCode).toBe(200)
    done()
  })
  test("It should return error 'the tag does not exist' because the tag_id is wrong", async (done) => {
    const response = await request(app)
      .put('/api/tags/995f46e9-f2cc-4c8e-9e1e-db5aec60c073')
      .send({
        name: 'Nuevo nombre'
      })
      //   .set('Authorization', `Token ${TOKEN}`)
    expect(response.statusCode).toBe(400)
    done()
  })
  test('It should return error for invalid body', async (done) => {
    const response = await request(app)
      .put(`/api/tags/${tagId}`)
      .send({
        badProperty: 'Nuevo nombre'
      })
      //   .set('Authorization', `Token ${TOKEN}`)
    expect(response.statusCode).toBe(400)
    done()
  })
})
