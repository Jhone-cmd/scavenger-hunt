import { InsertionPointsUseCase } from '@/domain/use-cases/insertion-points'
import { PrismaClassRepository } from '../database/prisma/prisma-class-repository'
import { PrismaItemRepository } from '../database/prisma/prisma-item-repository'
import { PrismaPointRepository } from '../database/prisma/prisma-point-repository'

export function makeInsertionPointUseCase() {
  const pointsRepository = new PrismaPointRepository()
  const classRepository = new PrismaClassRepository()
  const itemRepository = new PrismaItemRepository()
  const insertionPointsUseCase = new InsertionPointsUseCase(
    pointsRepository,
    classRepository,
    itemRepository
  )
  return insertionPointsUseCase
}
