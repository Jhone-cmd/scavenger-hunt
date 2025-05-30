import { app } from '@/app'
import request from 'supertest'
import { createAccountAndAuthenticate } from '../../../../test/utils/create-account-and-authenticate'

describe('Create Institution (e2e)', () => {
  beforeAll(async () => {
    await app.ready()
  })

  afterAll(async () => {
    await app.close()
  })

  test('[POST] should be able to create institution', async () => {
    const { token } = await createAccountAndAuthenticate(app)

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
