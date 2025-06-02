import { UniqueEntityId } from '@/core/entities/unique-entity-id'
import { Point } from '@/domain/entities/point'
import { Prisma, Points as PrismaPoint } from '@prisma/client'

export class PrismaPointMapper {
  static toDomain(raw: PrismaPoint): Point {
    return Point.create(
      {
        classId: new UniqueEntityId(raw.classId),
        itemId: new UniqueEntityId(raw.itemId),
        amount: raw.amount,
        total: raw.total,
        createdAt: raw.createdAt,
        updatedAt: raw.updatedAt,
      },
      new UniqueEntityId(raw.id)
    )
  }

  static toPrisma(point: Point): Prisma.PointsUncheckedCreateInput {
    return {
      id: point.id.toString(),
      classId: point.classId.toString(),
      itemId: point.itemId.toString(),
      amount: point.amount,
      total: point.total,
      createdAt: point.createdAt,
      updatedAt: point.updatedAt,
    }
  }
}
