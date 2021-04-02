const request = require('supertest')
const app = require('../src/app')
const removeAll = require('../src/db/controllers/delete')
const dbConnection = require('../src/db/config')
const models = require('../src/db/keys')

let notificationId = ''

beforeAll(async () => {
  await dbConnection().catch((err) => console.log(err))
})

describe('POST /notifications', () => {
  test('It should be create a new Notification', async (done) => {
    await removeAll(models.NOTIFICATION)
    const response = await request(app).post('/api/notifications').send({
      user: '6bdf63e7-14e5-40ff-955d-1ea1bf054a02',
      message: 'Success',
      subject: 'Sign in',
      date: new Date(),
    })
    expect(response.statusCode).toBe(201)
    notificationId = response.body.id
    done()
  })
  test("You shouldn't create a new notification for invalid body", async (done) => {
    const response = await request(app).post('/api/notifications').send({
      user: '6bdf63e7-14e5-40ff-955d-1ea1bf054a02',
      invalidProperty: 'Error',
      subject: 'Sign in',
      date: new Date(),
    })
    expect(response.statusCode).toBe(400)
    done()
  })
})

// describe('GET /notifications', () => {
//   test('It should get Notifications', async (done) => {
//     const response = await request(app).get(
//       '/api/notifications?offset=0&limit=20'
//     )
//     expect(response.statusCode).toBe(200)
//     done()
//   })
//   test("It shouldn't get Notifications for invalid offset", async (done) => {
//     const response = await request(app).get('/api/notifications?offset=')
//     expect(response.statusCode).toBe(400)
//     done()
//   })
//   test("It shouldn't get Notifications for invalid query", async (done) => {
//     const response = await request(app).get(
//       '/api/notifications?offset=0&limit=20&invalidQuery=error'
//     )
//     expect(response.statusCode).toBe(400)
//     done()
//   })
// })

// describe('GET /notifications/:_id', () => {
//   test('You must return a notification when the notification_id is sent to you', async (done) => {
//     const response = await request(app).get(
//       `/api/notifications/${notificationId}`
//     )
//     //   .set('Authorization', `Token ${TOKEN}`)
//     expect(response.statusCode).toBe(200)
//     done()
//   })
//   test("It should return a message 'the notification does not exist' because the notification_id is wrong", async (done) => {
//     const response = await request(app).get(
//       '/api/notifications/995f46e9-f2cc-4c8e-9e1e-db5aec60c073'
//     )
//     //   .set('Authorization', `Token ${TOKEN}`)
//     expect(response.statusCode).toBe(400)
//     done()
//   })
// })

// describe('PUT /notifications/:_id', () => {
//   test('You must update a notification', async (done) => {
//     const response = await request(app)
//       .put(`/api/notifications/${notificationId}`)
//       .send({
//         message: 'Successful',
//       })
//     //   .set('Authorization', `Token ${TOKEN}`)
//     expect(response.statusCode).toBe(200)
//     done()
//   })
//   test("It should return error 'the notification does not exist' because the notification_id is wrong", async (done) => {
//     const response = await request(app)
//       .put('/api/notifications/995f46e9-f2cc-4c8e-9e1e-db5aec60c073')
//       .send({
//         name: 'Nuevo nombre',
//       })
//     //   .set('Authorization', `Token ${TOKEN}`)
//     expect(response.statusCode).toBe(400)
//     done()
//   })
//   test('It should return error for invalid body', async (done) => {
//     const response = await request(app)
//       .put(`/api/notifications/${notificationId}`)
//       .send({
//         badProperty: 'Nuevo nombre',
//       })
//     //   .set('Authorization', `Token ${TOKEN}`)
//     expect(response.statusCode).toBe(400)
//     done()
//   })
// })
