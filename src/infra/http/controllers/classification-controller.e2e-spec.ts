import { app } from '@/app'
import request from 'supertest'
import { createAccountAndAuthenticate } from '../../../../test/utils/create-account-and-authenticate'
import { createInstitutionClassItem } from '../../../../test/utils/create-institution-class-item'

describe('Classification (e2e)', () => {
  beforeAll(async () => {
    await app.ready()
  })

  afterAll(async () => {
    await app.close()
  })

  test('[GET] should be able to view the classification', async () => {
    const { token } = await createAccountAndAuthenticate(app)

    const { classId, itemId } = await createInstitutionClassItem()
    await request(app.server)
      .post(`/classes/${classId}/points`)
      .set('Authorization', `Bearer ${token}`)
      .send({
        itemId,
        amount: 5,
      })
    const result = await request(app.server).get('/classification').send()

    expect(result.statusCode).toEqual(200)
    expect(result.body).toEqual({
      classification: expect.arrayContaining([
        expect.objectContaining({ name: '1º C', total: 750 }),
      ]),
    })
  })
})
