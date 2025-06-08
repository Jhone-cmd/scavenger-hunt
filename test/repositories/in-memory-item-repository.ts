import { PaginationParams } from '@/core/repositories/pagination-params'
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

  async findManyItems({ page }: PaginationParams): Promise<Item[]> {
    const perPage = 20
    const items = this.items
      .sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime())
      .slice((page - 1) * perPage, page * perPage)

    return items
  }

  async save(item: Item): Promise<void> {
    const itemIndex = this.items.findIndex(element => element.id === item.id)
    this.items[itemIndex] = item
  }

  async delete(item: Item): Promise<void> {
    const itemIndex = this.items.findIndex(element => element.id === item.id)
    this.items.splice(itemIndex, 1)
  }
}
