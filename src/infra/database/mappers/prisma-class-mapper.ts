import { UniqueEntityId } from '@/core/entities/unique-entity-id'
import { Class } from '@/domain/entities/class'
import { Prisma, Classes as PrismaClass } from '@prisma/client'

export interface PrismaClassCompleted extends PrismaClass {
  institution: {
    name: string
  }
}

export class PrismaClassMapper {
  static toDomain(raw: PrismaClassCompleted): Class {
    return Class.create(
      {
        name: raw.name,
        teacher: raw.teacher,
        institutionId: new UniqueEntityId(raw.institutionId),
        institutionName: raw.institution.name,
        createdAt: raw.createdAt,
        updatedAt: raw.updatedAt,
      },
      new UniqueEntityId(raw.id)
    )
  }

  static toPrisma(classe: Class): Prisma.ClassesUncheckedCreateInput {
    return {
      id: classe.id.toString(),
      name: classe.name,
      teacher: classe.teacher,
      institutionId: classe.institutionId.toString(),
      createdAt: classe.createdAt,
      updatedAt: classe.updatedAt,
    }
  }
}
