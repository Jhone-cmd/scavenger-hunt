import { Item } from '../entities/item'

export abstract class ItemRepository {
  abstract create(item: Item): Promise<void>
  abstract findByName(name: string): Promise<Item | null>
}
