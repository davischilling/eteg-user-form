import request from 'supertest'
import { app } from '#/app'

describe('App e2e tests', () => {
  beforeAll(async () => {
    await app.ready()
  })

  afterAll(async () => {
    await app.close()
  })

  it('should return 200 on GET /', async () => {
    const response = await request(app.server).get('/').expect(200)

    expect(response.body).toEqual({
      message: 'hello from Eteg - John Doe user form request challenge',
    })
  })
})
