import { CreateItemUseCase } from '@/domain/use-cases/create-item'
import { PrismaItemRepository } from '../database/prisma/prisma-item-repository'

export function makeCreateItemUseCase() {
  const itemRepository = new PrismaItemRepository()
  const createItemUseCase = new CreateItemUseCase(itemRepository)
  return createItemUseCase
}
