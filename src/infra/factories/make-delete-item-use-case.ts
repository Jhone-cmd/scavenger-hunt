import { DeleteItemUseCase } from '@/domain/use-cases/delete-item'
import { PrismaItemRepository } from '../database/prisma/prisma-item-repository'

export function makeDeleteItemUseCase() {
  const itemRepository = new PrismaItemRepository()
  const deleteItemUSeCase = new DeleteItemUseCase(itemRepository)
  return deleteItemUSeCase
}
