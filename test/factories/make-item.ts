import { UniqueEntityId } from '@/core/entities/unique-entity-id'
import { Item, ItemProps } from '@/domain/entities/item'

export function makeItem(override: Partial<ItemProps>, id?: UniqueEntityId) {
  const item = Item.create(
    {
      name: 'açúcar',
      points: 200,
      ...override,
    },
    id
  )
  return item
}
