import { app } from '@/app'
import request from 'supertest'

describe('Authenticate (e2e)', () => {
  beforeAll(async () => {
    await app.ready()
  })

  afterAll(async () => {
    await app.close()
  })

  test('[POST] should be able to authenticate an account', async () => {
    await request(app.server).post('/accounts').send({
      name: 'john doe',
      email: 'johndoe@email.com',
      password: '123456789',
    })

    const result = await request(app.server).post('/sessions').send({
      email: 'johndoe@email.com',
      password: '123456789',
    })

    expect(result.statusCode).toEqual(200)
    expect(result.body).toEqual({
      access_token: expect.any(String),
    })
  })
})
