import { EditPointUseCase } from '@/domain/use-cases/edit-point'
import { PrismaItemRepository } from '../database/prisma/prisma-item-repository'
import { PrismaPointRepository } from '../database/prisma/prisma-point-repository'

export function makeEditPointUseCase() {
  const pointRepository = new PrismaPointRepository()
  const itemRepository = new PrismaItemRepository()
  const editPointUseCase = new EditPointUseCase(pointRepository, itemRepository)
  return editPointUseCase
}
