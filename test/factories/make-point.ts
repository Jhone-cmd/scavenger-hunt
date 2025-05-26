import { UniqueEntityId } from '@/core/entities/unique-entity-id'
import { Point, PointProps } from '@/domain/entities/point'

export function makePoint(override: Partial<PointProps>, id?: UniqueEntityId) {
  const point = Point.create(
    {
      itemId: new UniqueEntityId(),
      classId: new UniqueEntityId(),
      amount: 2,
      ...override,
    },
    id
  )

  return point
}
