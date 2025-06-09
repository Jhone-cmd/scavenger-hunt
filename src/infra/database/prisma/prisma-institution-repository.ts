import { PaginationParams } from '@/core/repositories/pagination-params'
import { Institution } from '@/domain/entities/institution'
import { InstitutionRepository } from '@/domain/repositories/institution-repository'
import { prisma } from '@/infra/lib/prisma'
import { PrismaInstitutionMapper } from '../mappers/prisma-institution-mapper'

export class PrismaInstitutionRepository implements InstitutionRepository {
  async create(institution: Institution): Promise<void> {
    const data = PrismaInstitutionMapper.toPrisma(institution)
    await prisma.institutions.create({ data })
  }

  async findById(id: string): Promise<Institution | null> {
    const institution = await prisma.institutions.findUnique({
      where: {
        id,
      },
    })

    if (!institution) return null

    return PrismaInstitutionMapper.toDomain(institution)
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

  async findManyInstitutions({
    page,
  }: PaginationParams): Promise<Institution[]> {
    const perPage = 20
    const institutions = await prisma.institutions.findMany({
      skip: (page - 1) * perPage,
      take: perPage,
    })

    return institutions.map(PrismaInstitutionMapper.toDomain)
  }

  async save(institution: Institution): Promise<void> {
    const data = PrismaInstitutionMapper.toPrisma(institution)
    await prisma.institutions.update({
      where: {
        id: data.id,
      },
      data,
    })
  }

  async delete(institution: Institution): Promise<void> {
    const data = PrismaInstitutionMapper.toPrisma(institution)
    await prisma.institutions.delete({
      where: {
        id: data.id,
      },
    })
  }
}
