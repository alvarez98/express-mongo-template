/* global describe, test, expect */
const request = require('supertest')
const app = require('../src/app')

describe('GET /', () => {
  test('It should home access', async (done) => {
    const response = await request(app)
      .get('/api/')
    expect(response.statusCode).toBe(200)
    done()
  })
})
