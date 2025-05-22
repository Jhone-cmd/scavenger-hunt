import { Item } from '@/domain/entities/item'
import { ItemRepository } from '@/domain/repositories/item-repository'

export class InMemoryItemRepository implements ItemRepository {
  public items: Item[] = []

  async create(item: Item): Promise<void> {
    this.items.push(item)
  }

  async findByName(name: string): Promise<Item | null> {
    const item = this.items.find(item => item.name === name)

    if (!item) return null

    return item
  }

  async findById(id: string): Promise<Item | null> {
    const item = this.items.find(item => item.id.toString() === id)

    if (!item) return null

    return item
  }
}
