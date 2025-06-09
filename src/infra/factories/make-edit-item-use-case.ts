import { EditItemUseCase } from '@/domain/use-cases/edit-item'
import { PrismaItemRepository } from '../database/prisma/prisma-item-repository'

export function makeEditItemUseCase() {
  const itemRepository = new PrismaItemRepository()
  const editItemUseCase = new EditItemUseCase(itemRepository)
  return editItemUseCase
}
