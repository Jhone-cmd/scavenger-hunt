import { UniqueEntityId } from '@/core/entities/unique-entity-id'
import { Item } from '@/domain/entities/item'
import { Prisma, Items as PrismaItem } from '@prisma/client'

export class PrismaItemMapper {
  static toDomain(raw: PrismaItem): Item {
    return Item.create(
      {
        name: raw.name,
        points: raw.points,
        createdAt: raw.createdAt,
        updatedAt: raw.updatedAt,
      },
      new UniqueEntityId(raw.id)
    )
  }

  static toPrisma(item: Item): Prisma.ItemsUncheckedCreateInput {
    return {
      id: item.id.toString(),
      name: item.name,
      points: item.points,
      createdAt: item.createdAt,
      updatedAt: item.updatedAt,
    }
  }
}
