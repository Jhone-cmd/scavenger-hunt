import { PaginationParams } from '@/core/repositories/pagination-params'
import { Item } from '@/domain/entities/item'
import { ItemRepository } from '@/domain/repositories/item-repository'
import { prisma } from '@/infra/lib/prisma'
import { PrismaItemMapper } from '../mappers/prisma-item-mapper'

export class PrismaItemRepository implements ItemRepository {
  async create(item: Item): Promise<void> {
    const data = PrismaItemMapper.toPrisma(item)
    await prisma.items.create({
      data,
    })
  }

  async findByName(name: string): Promise<Item | null> {
    const item = await prisma.items.findUnique({
      where: {
        name,
      },
    })

    if (!item) return null

    return PrismaItemMapper.toDomain(item)
  }

  async findById(id: string): Promise<Item | null> {
    const item = await prisma.items.findUnique({
      where: {
        id,
      },
    })

    if (!item) return null

    return PrismaItemMapper.toDomain(item)
  }

  async findManyItems({ page }: PaginationParams): Promise<Item[]> {
    const perPage = 20
    const items = await prisma.items.findMany({
      take: perPage,
      skip: (page - 1) * perPage,
    })

    return items.map(PrismaItemMapper.toDomain)
  }
}
