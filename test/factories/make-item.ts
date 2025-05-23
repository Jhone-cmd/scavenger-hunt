import { UniqueEntityId } from '@/core/entities/unique-entity-id'
import { Item, ItemProps } from '@/domain/entities/item'
import { faker } from '@faker-js/faker'
export function makeItem(override: Partial<ItemProps>, id?: UniqueEntityId) {
  const item = Item.create(
    {
      name: faker.lorem.slug(),
      points: 200,
      ...override,
    },
    id
  )
  return item
}
