import { Item } from '@/domain/entities/item'

export class ItemPresente {
  static toHttp(item: Item) {
    return {
      id: item.id.toString(),
      name: item.name,
      points: item.points,
    }
  }
}
