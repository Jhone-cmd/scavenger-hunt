import { PaginationParams } from '@/core/repositories/pagination-params'
import { Item } from '../entities/item'

export abstract class ItemRepository {
  abstract create(item: Item): Promise<void>
  abstract findByName(name: string): Promise<Item | null>
  abstract findById(id: string): Promise<Item | null>
  abstract findManyItems(params: PaginationParams): Promise<Item[]>
}
