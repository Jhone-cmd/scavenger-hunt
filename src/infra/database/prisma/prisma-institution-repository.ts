import { Institution } from '@/domain/entities/institution'
import { InstitutionRepository } from '@/domain/repositories/institution-repository'
import { prisma } from '@/infra/lib/prisma'
import { PrismaInstitutionMapper } from '../mappers/prisma-institution-mapper'

export class PrismaInstitutionRepository implements InstitutionRepository {
  async create(institution: Institution): Promise<void> {
    const data = PrismaInstitutionMapper.toPrisma(institution)
    await prisma.institutions.create({ data })
  }

  async findByName(name: string): Promise<Institution | null> {
    const institution = await prisma.institutions.findUnique({
      where: {
        name,
      },
    })

    if (!institution) return null

    return PrismaInstitutionMapper.toDomain(institution)
  }
}
