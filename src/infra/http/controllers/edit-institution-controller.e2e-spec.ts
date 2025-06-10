import { app } from '@/app'
import { prisma } from '@/infra/lib/prisma'
import request from 'supertest'
import { createAccountAndAuthenticate } from '../../../../test/utils/create-account-and-authenticate'

describe('Edit Institution (e2e)', () => {
  beforeAll(async () => {
    await app.ready()
  })

  afterAll(async () => {
    await app.close()
  })

  test('[DELETE] should be able to edit institution', async () => {
    const { token } = await createAccountAndAuthenticate(app)
    const institution = await prisma.institutions.create({
      data: {
        name: 'institution-1',
        responsible: 'fulano',
        address: 'alone',
        phone: '55 66 7777-2222',
      },
    })

    const institutionId = institution.id

    const result = await request(app.server)
      .delete(`/institutions/${institutionId}`)
      .set('Authorization', `Bearer ${token}`)
      .send({
        phone: '55 68 9999-8888',
      })

    expect(result.statusCode).toEqual(204)
  })
})
