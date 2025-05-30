import { UniqueEntityId } from '@/core/entities/unique-entity-id'
import { Institution } from '@/domain/entities/institution'
import { Prisma, Institutions as PrismaInstitution } from '@prisma/client'

export class PrismaInstitutionMapper {
  static toDomain(raw: PrismaInstitution): Institution {
    return Institution.create(
      {
        name: raw.name,
        responsible: raw.responsible,
        address: raw.address,
        phone: raw.phone,
        createdAt: raw.createdAt,
        updatedAt: raw.updatedAt,
      },
      new UniqueEntityId(raw.id)
    )
  }

  static toPrisma(
    institution: Institution
  ): Prisma.InstitutionsUncheckedCreateInput {
    return {
      name: institution.name,
      responsible: institution.responsible,
      address: institution.address,
      phone: institution.phone,
      createdAt: institution.createdAt,
      updatedAt: institution.updatedAt,
    }
  }
}
