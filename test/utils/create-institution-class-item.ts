import { prisma } from '@/infra/lib/prisma'

export async function createInstitutionClassItem() {
  const institution = await prisma.institutions.create({
    data: {
      name: 'institution',
      responsible: 'fulano',
      address: 'alone',
      phone: '55 66 7777-2222',
    },
  })

  const classe = await prisma.classes.create({
    data: {
      name: '1º C',
      institutionId: institution.id,
      teacher: 'teacher-1',
    },
  })

  const classId = classe.id

  const item = await prisma.items.create({
    data: {
      name: 'item-1',
      points: 150,
    },
  })

  const itemId = item.id

  return { classId, itemId }
}
