import { app } from '@/app'
import request from 'supertest'

describe('Register Account (e2e)', () => {
  beforeAll(async () => {
    await app.ready()
  })

  afterAll(async () => {
    await app.close()
  })

  test('[POST] should be able to register account', async () => {
    const result = await request(app.server).post('/accounts').send({
      name: 'john doe',
      email: 'johndoe@email.com',
      password: '123456789',
    })

    expect(result.statusCode).toEqual(201)
  })
})
