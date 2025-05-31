import { app } from '@/app'
import { prisma } from '@/infra/lib/prisma'
import request from 'supertest'
import { createAccountAndAuthenticate } from '../../../../test/utils/create-account-and-authenticate'

describe('Create Class (e2e)', () => {
  beforeAll(async () => {
    await app.ready()
  })

  afterAll(async () => {
    await app.close()
  })

  test('[POST] should be able to create class', async () => {
    const { token } = await createAccountAndAuthenticate(app)

    const institution = await prisma.institutions.create({
      data: {
        name: 'institution',
        responsible: 'responsible',
        address: 'alone',
        phone: '77 8888-6666',
      },
    })

    const result = await request(app.server)
      .post(`/institutions/${institution.id}/classes`)
      .set('Authorization', `Bearer ${token}`)
      .send({
        name: 'class-1',
        teacher: 'teacher-1',
      })

    expect(result.statusCode).toEqual(201)
  })
})
