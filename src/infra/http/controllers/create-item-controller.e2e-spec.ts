import { app } from '@/app'
import request from 'supertest'
import { createAccountAndAuthenticate } from '../../../../test/utils/create-account-and-authenticate'

describe('Create Item (e2e)', () => {
  beforeAll(async () => {
    await app.ready()
  })

  afterAll(async () => {
    await app.close()
  })

  test('[POST] should be able to create item', async () => {
    const { token } = await createAccountAndAuthenticate(app)

    const result = await request(app.server)
      .post('/items')
      .set('Authorization', `Bearer ${token}`)
      .send({
        name: 'item-1',
        points: 100,
      })

    expect(result.statusCode).toEqual(201)
  })
})
