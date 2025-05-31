import { UniqueEntityId } from '@/core/entities/unique-entity-id'
import { Class } from '@/domain/entities/class'
import { Prisma, Classes as PrismaClass } from '@prisma/client'

export class PrismaClassMapper {
  static toDomain(raw: PrismaClass): Class {
    return Class.create(
      {
        name: raw.name,
        teacher: raw.teacher,
        institutionId: new UniqueEntityId(raw.institutionId),
        createdAt: raw.createdAt,
        updatedAt: raw.updatedAt,
      },
      new UniqueEntityId(raw.id)
    )
  }

  static toPrisma(classe: Class): Prisma.ClassesUncheckedCreateInput {
    return {
      name: classe.name,
      teacher: classe.teacher,
      createdAt: classe.createdAt,
      institutionId: classe.institutionId.toString(),
      updatedAt: classe.updatedAt,
    }
  }
}
