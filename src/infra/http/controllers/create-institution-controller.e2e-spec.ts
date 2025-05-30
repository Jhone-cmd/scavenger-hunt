import { app } from '@/app'
import request from 'supertest'

describe('Create Institution (e2e)', () => {
  beforeAll(async () => {
    await app.ready()
  })

  afterAll(async () => {
    await app.close()
  })

  test('[POST] should be able to create institution', async () => {
    await request(app.server).post('/accounts').send({
      name: 'john doe',
      email: 'johndoe@email.com',
      password: '123456789',
    })

    const response = await request(app.server).post('/sessions').send({
      email: 'johndoe@email.com',
      password: '123456789',
    })

    const token = response.body.access_token

    const result = await request(app.server)
      .post('/institutions')
      .set('Authorization', `Bearer ${token}`)
      .send({
        name: 'institution-1',
        responsible: 'responsible-1',
        address: 'alone',
        phone: '77 8888-6666',
      })

    expect(result.statusCode).toEqual(201)
  })
})
