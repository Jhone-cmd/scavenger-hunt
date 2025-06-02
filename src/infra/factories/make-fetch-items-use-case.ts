import { FetchItemsUseCase } from '@/domain/use-cases/fetch-items'
import { PrismaItemRepository } from '../database/prisma/prisma-item-repository'

export function makeFetchItemsUseCase() {
  const itemRepository = new PrismaItemRepository()
  const fetchItemsUseCase = new FetchItemsUseCase(itemRepository)
  return fetchItemsUseCase
}
