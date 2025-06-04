import { app } from '@/app'
import { prisma } from '@/infra/lib/prisma'
import request from 'supertest'
import { createInstitutionClassItem } from '../../../../test/utils/create-institution-class-item'

describe('Fetch Classe (e2e)', () => {
  beforeAll(async () => {
    await app.ready()
  })

  afterAll(async () => {
    await app.close()
  })

  test('[GET] should be able to fetch classes', async () => {
    const { institutionId } = await createInstitutionClassItem()
    await prisma.classes.createMany({
      data: [
        { name: 'classe-1', teacher: 'teacher-1', institutionId },
        { name: 'classe-2', teacher: 'teacher-2', institutionId },
        { name: 'classe-3', teacher: 'teacher-3', institutionId },
      ],
    })

    const result = await request(app.server).get('/classes').send()

    expect(result.statusCode).toEqual(200)
    expect(result.body).toEqual({
      classes: expect.arrayContaining([
        expect.objectContaining({
          props: expect.objectContaining({ name: 'classe-1' }),
        }),
        expect.objectContaining({
          props: expect.objectContaining({ name: 'classe-2' }),
        }),
        expect.objectContaining({
          props: expect.objectContaining({ name: 'classe-3' }),
        }),
      ]),
    })
  })
})
