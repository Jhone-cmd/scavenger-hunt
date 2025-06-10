import { app } from '@/app'
import { prisma } from '@/infra/lib/prisma'
import request from 'supertest'
import { createAccountAndAuthenticate } from '../../../../test/utils/create-account-and-authenticate'
import { createInstitutionClassItem } from '../../../../test/utils/create-institution-class-item'

describe('Delete Class (e2e)', () => {
  beforeAll(async () => {
    await app.ready()
  })

  afterAll(async () => {
    await app.close()
  })

  test('[DELETE] should be able to delete class', async () => {
    const { token } = await createAccountAndAuthenticate(app)
    const { institutionId } = await createInstitutionClassItem()
    const classe = await prisma.classes.create({
      data: {
        name: 'class',
        teacher: 'teacher',
        institutionId,
      },
    })

    const classId = classe.id

    const result = await request(app.server)
      .delete(`/classes/${classId}`)
      .set('Authorization', `Bearer ${token}`)
      .send()

    expect(result.statusCode).toEqual(204)
  })
})
